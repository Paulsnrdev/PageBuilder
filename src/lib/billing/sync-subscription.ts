import { prisma } from "@/lib/prisma";
import type { SubscriptionPlan } from "@/generated/prisma/enums";

function planFromCode(planCode: string | null): SubscriptionPlan | null {
  if (!planCode) return null;
  if (planCode === process.env.PAYSTACK_PRO_PLAN_CODE) return "PRO";
  if (planCode === process.env.PAYSTACK_BUSINESS_PLAN_CODE) return "BUSINESS";
  return null;
}

export async function activateSubscription({
  userId,
  planCode,
  customerCode,
  subscriptionCode,
}: {
  userId: string;
  planCode: string | null;
  customerCode: string;
  subscriptionCode?: string;
}) {
  const plan = planFromCode(planCode);
  if (!plan) return;

  await prisma.subscription.upsert({
    where: { userId },
    create: { userId, plan, status: "ACTIVE", paystackCustomerCode: customerCode, paystackSubscriptionCode: subscriptionCode },
    update: { plan, status: "ACTIVE", paystackCustomerCode: customerCode, paystackSubscriptionCode: subscriptionCode },
  });
}

export async function deactivateSubscriptionByCode(subscriptionCode: string) {
  await prisma.subscription.updateMany({
    where: { paystackSubscriptionCode: subscriptionCode },
    data: { status: "CANCELED" },
  });
}

export async function markPastDueByCustomerCode(customerCode: string) {
  await prisma.subscription.updateMany({
    where: { paystackCustomerCode: customerCode },
    data: { status: "PAST_DUE" },
  });
}
