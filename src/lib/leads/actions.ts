"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email/resend";
import type { ContactFormContent } from "@/lib/blocks/schema";

const MAX_FIELD_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

export async function submitLead(siteId: string, blockId: string, basePath: string, formData: FormData) {
  const block = await prisma.block.findUnique({ where: { id: blockId }, select: { siteId: true, type: true, content: true } });
  if (!block || block.siteId !== siteId || block.type !== "CONTACT_FORM") throw new Error("Form not found");

  const content = block.content as unknown as ContactFormContent;
  const allowedKeys = new Set<string>();
  if (content.fields.name) allowedKeys.add("name");
  if (content.fields.email) allowedKeys.add("email");
  if (content.fields.phone) allowedKeys.add("phone");
  if (content.fields.message) allowedKeys.add("message");
  for (const field of content.customFields) allowedKeys.add(field.label);

  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (!allowedKeys.has(key)) continue;
    if (typeof value === "string" && value.trim()) data[key] = value.trim().slice(0, MAX_FIELD_LENGTH);
  }

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { name: true, isPublished: true, user: { select: { email: true } } },
  });
  if (!site || !site.isPublished) throw new Error("Site not found");

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  const recentSubmissions = await prisma.lead.count({
    where: { siteId, ipHash, submittedAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000) } },
  });
  if (recentSubmissions >= RATE_LIMIT_MAX_SUBMISSIONS) throw new Error("Too many submissions. Please try again later.");

  await prisma.lead.create({ data: { siteId, blockId, data, ipHash } });

  await sendLeadNotification({ to: site.user.email, siteName: site.name, data }).catch(() => {});

  redirect(`${basePath}?submitted=${blockId}`);
}
