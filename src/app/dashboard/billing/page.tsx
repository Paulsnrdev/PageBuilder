import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserPlan, PLAN_LIMITS, PLAN_PRICING } from "@/lib/billing/plan";
import { UpgradeButton } from "@/components/billing/upgrade-button";

const PLAN_ORDER = ["FREE", "PRO", "BUSINESS"] as const;

const PLAN_FEATURES: Record<(typeof PLAN_ORDER)[number], string[]> = {
  FREE: ["1 site", "Subdomain only", "Page Builder branding in footer"],
  PRO: ["5 sites", "Custom domain", "No branding", "Lead export"],
  BUSINESS: ["Unlimited sites", "Custom domain", "No branding", "Lead export", "Priority support"],
};

export default async function BillingPage() {
  const session = await auth();
  const userId = session!.user!.id;
  const [plan, siteCount] = await Promise.all([
    getUserPlan(userId),
    prisma.site.count({ where: { userId } }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/dashboard/sites" className="text-sm text-zinc-500 hover:text-zinc-900">
        ← Sites
      </Link>
      <h1 className="mt-1 text-2xl font-semibold">Billing</h1>
      <p className="mt-1 text-sm text-zinc-500">
        You&apos;re on the {PLAN_PRICING[plan].label} plan, using {siteCount} of{" "}
        {Number.isFinite(PLAN_LIMITS[plan].maxSites) ? PLAN_LIMITS[plan].maxSites : "unlimited"} sites.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PLAN_ORDER.map((planId) => {
          const isCurrent = planId === plan;
          return (
            <div
              key={planId}
              className={`flex flex-col gap-4 rounded-xl border p-6 ${isCurrent ? "border-zinc-900" : "border-zinc-200"}`}
            >
              <div>
                <p className="text-sm font-medium text-zinc-500">{PLAN_PRICING[planId].label}</p>
                <p className="mt-1 text-2xl font-semibold">
                  {PLAN_PRICING[planId].priceNaira === 0 ? "Free" : `₦${PLAN_PRICING[planId].priceNaira.toLocaleString()}`}
                  {PLAN_PRICING[planId].priceNaira > 0 && <span className="text-sm font-normal text-zinc-500">/month</span>}
                </p>
              </div>
              <ul className="flex flex-1 flex-col gap-2 text-sm text-zinc-600">
                {PLAN_FEATURES[planId].map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {isCurrent ? (
                <span className="rounded-full border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-400">
                  Current plan
                </span>
              ) : planId === "FREE" ? (
                <span className="rounded-full border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-400">
                  Downgrade by cancelling
                </span>
              ) : (
                <UpgradeButton plan={planId} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
