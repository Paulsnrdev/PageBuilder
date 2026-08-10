const PAYSTACK_API = "https://api.paystack.co";

function headers() {
  return {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function initializeTransaction(input: { email: string; planCode: string; callbackUrl: string; metadata: Record<string, unknown> }) {
  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      email: input.email,
      plan: input.planCode,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
  });

  const body = await response.json();
  if (!response.ok || !body.status) throw new Error(body.message ?? "Could not start checkout");

  return body.data as { authorization_url: string; reference: string };
}

export async function verifyTransaction(reference: string) {
  const response = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: headers(),
  });

  const body = await response.json();
  if (!response.ok || !body.status) throw new Error(body.message ?? "Could not verify transaction");

  return body.data as {
    status: string;
    customer: { customer_code: string; email: string };
    plan: string | null;
    metadata: Record<string, unknown>;
  };
}
