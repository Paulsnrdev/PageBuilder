"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email/resend";

export async function submitLead(siteId: string, blockId: string, basePath: string, formData: FormData) {
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    // Next.js encodes the bound server action's identity and args as hidden
    // $ACTION_* fields on forms like this one; only keep real form input.
    if (key.startsWith("$ACTION")) continue;
    if (typeof value === "string" && value.trim()) data[key] = value.trim();
  }

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { name: true, isPublished: true, user: { select: { email: true } } },
  });
  if (!site || !site.isPublished) throw new Error("Site not found");

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  await prisma.lead.create({ data: { siteId, blockId, data, ipHash } });

  await sendLeadNotification({ to: site.user.email, siteName: site.name, data }).catch(() => {});

  redirect(`${basePath}?submitted=${blockId}`);
}
