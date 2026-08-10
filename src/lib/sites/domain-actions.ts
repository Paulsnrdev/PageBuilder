"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireSiteOwner } from "@/lib/sites/require-owner";
import { getUserPlan, PLAN_LIMITS } from "@/lib/billing/plan";

const VERCEL_API = "https://api.vercel.com";

function vercelHeaders() {
  return {
    Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
    "Content-Type": "application/json",
  };
}

function teamQuery() {
  return process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : "";
}

export async function addCustomDomain(siteId: string, domain: string) {
  const site = await requireSiteOwner(siteId);

  const plan = await getUserPlan(site.userId);
  if (!PLAN_LIMITS[plan].customDomain) {
    throw new Error("Custom domains need a Pro or Business plan.");
  }

  const clean = domain.trim().toLowerCase();

  const response = await fetch(`${VERCEL_API}/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains${teamQuery()}`, {
    method: "POST",
    headers: vercelHeaders(),
    body: JSON.stringify({ name: clean }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error?.message ?? "Could not add domain");
  }

  await prisma.site.update({ where: { id: siteId }, data: { customDomain: clean, customDomainVerifiedAt: null } });
  revalidatePath(`/dashboard/sites/${siteId}/settings`);
}

export async function removeCustomDomain(siteId: string) {
  const site = await requireSiteOwner(siteId);
  if (!site.customDomain) return;

  await fetch(`${VERCEL_API}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.customDomain}${teamQuery()}`, {
    method: "DELETE",
    headers: vercelHeaders(),
  }).catch(() => {});

  await prisma.site.update({ where: { id: siteId }, data: { customDomain: null, customDomainVerifiedAt: null } });
  revalidatePath(`/dashboard/sites/${siteId}/settings`);
}

export async function verifyCustomDomain(siteId: string) {
  const site = await requireSiteOwner(siteId);
  if (!site.customDomain) throw new Error("No domain to verify");

  const response = await fetch(`${VERCEL_API}/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${site.customDomain}${teamQuery()}`, {
    headers: vercelHeaders(),
  });

  if (!response.ok) throw new Error("Could not check domain status");

  const body = await response.json();
  const verified = Boolean(body.verified);

  await prisma.site.update({
    where: { id: siteId },
    data: { customDomainVerifiedAt: verified ? new Date() : null },
  });

  revalidatePath(`/dashboard/sites/${siteId}/settings`);

  return { verified };
}
