import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { verifyTransaction } from "@/lib/billing/paystack";
import { activateSubscription } from "@/lib/billing/sync-subscription";

export default async function BillingCallbackPage({ searchParams }: PageProps<"/dashboard/billing/callback">) {
  const { reference } = await searchParams;
  const session = await auth();

  if (typeof reference === "string" && session?.user?.id) {
    try {
      const data = await verifyTransaction(reference);
      if (data.status === "success") {
        await activateSubscription({
          userId: session.user.id,
          planCode: data.plan,
          customerCode: data.customer.customer_code,
        });
      }
    } catch {
      // The webhook is the source of truth and will reconcile this if verification fails here.
    }
  }

  redirect("/dashboard/billing");
}
