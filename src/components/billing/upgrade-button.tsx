"use client";

import { useState } from "react";

import { startCheckout } from "@/lib/billing/actions";

function isRedirectError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT");
}

export function UpgradeButton({
  plan,
  monthlyPriceNaira,
  yearlyPriceNaira,
}: {
  plan: "PRO" | "BUSINESS";
  monthlyPriceNaira: number;
  yearlyPriceNaira: number;
}) {
  const [billingInterval, setBillingInterval] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      await startCheckout(plan, billingInterval);
    } catch (err) {
      if (isRedirectError(err)) throw err;
      setError(err instanceof Error ? err.message : "Could not start checkout");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex overflow-hidden rounded-full border border-zinc-200 text-xs font-medium">
        <button
          type="button"
          onClick={() => setBillingInterval("MONTHLY")}
          className={`flex-1 px-3 py-1.5 ${billingInterval === "MONTHLY" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-50"}`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setBillingInterval("YEARLY")}
          className={`flex-1 px-3 py-1.5 ${billingInterval === "YEARLY" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-50"}`}
        >
          Yearly
        </button>
      </div>
      <p className="text-center text-xs text-zinc-500">
        {billingInterval === "MONTHLY" ? `₦${monthlyPriceNaira.toLocaleString()}/month` : `₦${yearlyPriceNaira.toLocaleString()}/year`}
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Upgrade"}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
