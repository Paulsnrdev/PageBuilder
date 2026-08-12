"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";
import { AuthError } from "next-auth";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { devLoginEnabled } from "@/lib/auth/dev-login";
import { loginSchema, signUpSchema } from "@/lib/auth/credentials-schema";
import { hashPassword } from "@/lib/auth/password";

const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

async function ipHash() {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? "unknown";
  return crypto.createHash("sha256").update(ip).digest("hex");
}

async function isRateLimited(type: "LOGIN" | "SIGNUP", email: string, hash: string) {
  const recent = await prisma.authAttempt.count({
    where: {
      type,
      OR: [{ email }, { ipHash: hash }],
      createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000) },
    },
  });
  return recent >= RATE_LIMIT_MAX_ATTEMPTS;
}

export async function googleLogin() {
  await signIn("google", { redirectTo: "/dashboard/sites" });
}

export async function devLogin(formData: FormData) {
  if (!devLoginEnabled) return;
  await signIn("dev-login", { email: formData.get("email"), redirectTo: "/dashboard/sites" });
}

export async function credentialsLogin(formData: FormData) {
  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) redirect("/login?error=invalid");

  const hash = await ipHash();
  if (await isRateLimited("LOGIN", parsed.data.email, hash)) redirect("/login?error=rate-limited");
  await prisma.authAttempt.create({ data: { type: "LOGIN", email: parsed.data.email, ipHash: hash } });

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard/sites",
    });
  } catch (error) {
    if (error instanceof AuthError) redirect("/login?error=invalid");
    throw error;
  }
}

export async function signUp(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) redirect("/signup?error=invalid");

  const hash = await ipHash();
  if (await isRateLimited("SIGNUP", parsed.data.email, hash)) redirect("/signup?error=rate-limited");
  await prisma.authAttempt.create({ data: { type: "SIGNUP", email: parsed.data.email, ipHash: hash } });

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
  if (existing) redirect("/signup?error=exists");

  const passwordHash = await hashPassword(parsed.data.password);
  try {
    await prisma.user.create({
      data: { name: parsed.data.name, email: parsed.data.email, password: passwordHash },
    });
  } catch {
    // Unique constraint race: two sign-ups for the same email at once.
    redirect("/signup?error=exists");
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard/sites",
    });
  } catch (error) {
    if (error instanceof AuthError) redirect("/login?error=invalid");
    throw error;
  }
}
