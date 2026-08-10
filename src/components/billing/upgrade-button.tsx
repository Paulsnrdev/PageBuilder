"use client";

import { useState } from "react";

import { startCheckout } from "@/lib/billing/actions";

function isRedirectError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT");
}

export function UpgradeButton({ plan }: { plan: "PRO" | "BUSINESS" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      await startCheckout(plan);
    } catch (err) {
      if (isRedirectError(err)) throw err;
      setError(err instanceof Error ? err.message : "Could not start checkout");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
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
