"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { initializeTransaction } from "@/lib/billing/paystack";

const PLAN_CODES: Record<"PRO" | "BUSINESS", string | undefined> = {
  PRO: process.env.PAYSTACK_PRO_PLAN_CODE,
  BUSINESS: process.env.PAYSTACK_BUSINESS_PLAN_CODE,
};

export async function startCheckout(plan: "PRO" | "BUSINESS") {
  const session = await auth();
  if (!session?.user?.email || !session.user.id) throw new Error("Not signed in");

  const planCode = PLAN_CODES[plan];
  if (!planCode) throw new Error("Billing isn't configured yet for this plan.");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { authorization_url } = await initializeTransaction({
    email: session.user.email,
    planCode,
    callbackUrl: `${appUrl}/dashboard/billing/callback`,
    metadata: { userId: session.user.id, plan },
  });

  redirect(authorization_url);
}
