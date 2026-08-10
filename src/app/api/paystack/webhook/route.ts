import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { activateSubscription, deactivateSubscriptionByCode, markPastDueByCustomerCode } from "@/lib/billing/sync-subscription";

type PaystackEvent = {
  event: string;
  data: {
    metadata?: { userId?: string };
    plan?: { plan_code?: string };
    plan_code?: string;
    customer?: { customer_code?: string };
    subscription_code?: string;
  };
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const expected = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY ?? "").update(rawBody).digest("hex");
  if (!signature || signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as PaystackEvent;

  switch (event.event) {
    case "subscription.create":
    case "charge.success": {
      const { data } = event;
      const userId = data.metadata?.userId;
      const customerCode = data.customer?.customer_code;
      const planCode = data.plan?.plan_code ?? data.plan_code ?? null;
      if (userId && customerCode) {
        await activateSubscription({ userId, planCode, customerCode, subscriptionCode: data.subscription_code });
      }
      break;
    }
    case "subscription.disable":
      if (event.data.subscription_code) await deactivateSubscriptionByCode(event.data.subscription_code);
      break;
    case "invoice.payment_failed":
      if (event.data.customer?.customer_code) await markPastDueByCustomerCode(event.data.customer.customer_code);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
