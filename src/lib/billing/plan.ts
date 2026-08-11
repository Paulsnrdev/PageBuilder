import { prisma } from "@/lib/prisma";
import type { SubscriptionPlan } from "@/generated/prisma/enums";

export const PLAN_LIMITS: Record<SubscriptionPlan, { maxSites: number; customDomain: boolean; branding: boolean; leadExport: boolean }> = {
  FREE: { maxSites: 1, customDomain: false, branding: true, leadExport: false },
  PRO: { maxSites: 5, customDomain: true, branding: false, leadExport: true },
  BUSINESS: { maxSites: Infinity, customDomain: true, branding: false, leadExport: true },
};

export const PLAN_PRICING: Record<SubscriptionPlan, { label: string; priceNaira: number; yearlyPriceNaira: number }> = {
  FREE: { label: "Free", priceNaira: 0, yearlyPriceNaira: 0 },
  PRO: { label: "Pro", priceNaira: 6000, yearlyPriceNaira: 60000 },
  BUSINESS: { label: "Business", priceNaira: 15000, yearlyPriceNaira: 150000 },
};

/** A subscription only exists once someone has gone through checkout; no row means Free. */
export async function getUserPlan(userId: string): Promise<SubscriptionPlan> {
  const subscription = await prisma.subscription.findUnique({ where: { userId } });
  if (!subscription || subscription.status !== "ACTIVE") return "FREE";
  return subscription.plan;
}
