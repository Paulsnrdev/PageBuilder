"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { initializeTransaction } from "@/lib/billing/paystack";

const PLAN_CODES: Record<"PRO" | "BUSINESS", Record<"MONTHLY" | "YEARLY", string | undefined>> = {
  PRO: { MONTHLY: process.env.PAYSTACK_PRO_MONTHLY_PLAN_CODE, YEARLY: process.env.PAYSTACK_PRO_YEARLY_PLAN_CODE },
  BUSINESS: { MONTHLY: process.env.PAYSTACK_BUSINESS_MONTHLY_PLAN_CODE, YEARLY: process.env.PAYSTACK_BUSINESS_YEARLY_PLAN_CODE },
};

export async function startCheckout(plan: "PRO" | "BUSINESS", interval: "MONTHLY" | "YEARLY") {
  const session = await auth();
  if (!session?.user?.email || !session.user.id) throw new Error("Not signed in");

  const planCode = PLAN_CODES[plan][interval];
  if (!planCode) throw new Error("Billing isn't configured yet for this plan.");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { authorization_url } = await initializeTransaction({
    email: session.user.email,
    planCode,
    callbackUrl: `${appUrl}/dashboard/billing/callback`,
    metadata: { userId: session.user.id, plan, interval },
  });

  redirect(authorization_url);
}
