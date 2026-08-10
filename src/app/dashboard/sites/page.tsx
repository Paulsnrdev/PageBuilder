import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserPlan, PLAN_LIMITS, PLAN_PRICING } from "@/lib/billing/plan";

export default async function SitesPage() {
  const session = await auth();
  const userId = session!.user!.id;
  const [sites, plan] = await Promise.all([
    prisma.site.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } }),
    getUserPlan(userId),
  ]);
  const { maxSites } = PLAN_LIMITS[plan];
  const atLimit = sites.length >= maxSites;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your sites</h1>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/billing" className="text-sm text-zinc-500 hover:text-zinc-900">
            {PLAN_PRICING[plan].label} plan · {sites.length}/{Number.isFinite(maxSites) ? maxSites : "∞"} sites
          </Link>
          {atLimit ? (
            <Link
              href="/dashboard/billing"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Upgrade to add more
            </Link>
          ) : (
            <Link
              href="/dashboard/sites/new"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              New site
            </Link>
          )}
        </div>
      </div>

      <ul className="mt-8 divide-y divide-zinc-200 border-t border-zinc-200">
        {sites.map((site) => (
          <li key={site.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">{site.name}</p>
              <p className="text-sm text-zinc-500">
                /{site.slug} · {site.isPublished ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/sites/${site.id}/leads`}
                className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium transition hover:bg-zinc-50"
              >
                Leads
              </Link>
              <Link
                href={`/dashboard/sites/${site.id}/settings`}
                className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium transition hover:bg-zinc-50"
              >
                Settings
              </Link>
              <Link
                href={`/dashboard/sites/${site.id}/edit`}
                className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium transition hover:bg-zinc-50"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
        {sites.length === 0 && <li className="py-8 text-center text-sm text-zinc-500">No sites yet.</li>}
      </ul>
    </div>
  );
}
