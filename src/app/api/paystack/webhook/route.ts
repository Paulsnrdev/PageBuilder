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

// This Paystack business is shared with another app (storehike.site), which can only
// register one webhook URL. Page Builder receives everything and forwards on whatever
// isn't tagged with one of its own plan codes.
const PAGE_BUILDER_PLAN_CODES = [
  process.env.PAYSTACK_PRO_MONTHLY_PLAN_CODE,
  process.env.PAYSTACK_PRO_YEARLY_PLAN_CODE,
  process.env.PAYSTACK_BUSINESS_MONTHLY_PLAN_CODE,
  process.env.PAYSTACK_BUSINESS_YEARLY_PLAN_CODE,
].filter((code): code is string => Boolean(code));

function isPageBuilderEvent(event: PaystackEvent) {
  const planCode = event.data.plan?.plan_code ?? event.data.plan_code ?? null;
  return planCode !== null && PAGE_BUILDER_PLAN_CODES.includes(planCode);
}

async function forwardToOtherApp(rawBody: string, signature: string) {
  const forwardUrl = process.env.PAYSTACK_WEBHOOK_FORWARD_URL;
  if (!forwardUrl) return;

  try {
    await fetch(forwardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-paystack-signature": signature },
      body: rawBody,
    });
  } catch {
    // Best-effort forward. Paystack considers delivery to us successful either way.
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const expected = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY ?? "").update(rawBody).digest("hex");
  if (!signature || signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as PaystackEvent;

  if (!isPageBuilderEvent(event)) {
    await forwardToOtherApp(rawBody, signature);
    return NextResponse.json({ received: true });
  }

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
