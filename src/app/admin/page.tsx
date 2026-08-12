import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin/is-admin";
import { PLAN_PRICING } from "@/lib/billing/plan";
import type { SubscriptionPlan } from "@/generated/prisma/enums";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdminEmail(session.user.email)) redirect("/dashboard/sites");

  const [userCount, siteCount, publishedSiteCount, leadCount, users, activeSubscriptions] = await Promise.all([
    prisma.user.count(),
    prisma.site.count(),
    prisma.site.count({ where: { isPublished: true } }),
    prisma.lead.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: { select: { sites: true } },
        subscription: { select: { plan: true, status: true } },
      },
    }),
    prisma.subscription.groupBy({ by: ["plan"], where: { status: "ACTIVE" }, _count: true }),
  ]);

  const planCounts: Record<SubscriptionPlan, number> = { FREE: 0, PRO: 0, BUSINESS: 0 };
  for (const row of activeSubscriptions) planCounts[row.plan] = row._count;
  planCounts.FREE = userCount - planCounts.PRO - planCounts.BUSINESS;

  const stats = [
    { label: "Users", value: userCount },
    { label: "Sites", value: siteCount },
    { label: "Published sites", value: publishedSiteCount },
    { label: "Leads", value: leadCount },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="mt-1 text-sm text-zinc-500">Signed in as {session.user.email}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-zinc-200 p-4">
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-4 rounded-xl border border-zinc-200 p-4 text-sm">
        {(["FREE", "PRO", "BUSINESS"] as const).map((plan) => (
          <span key={plan}>
            {PLAN_PRICING[plan].label}: <span className="font-medium">{planCounts[plan]}</span>
          </span>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Users</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 text-zinc-500">
            <tr>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Plan</th>
              <th className="px-4 py-2 font-medium">Sites</th>
              <th className="px-4 py-2 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => {
              const plan = user.subscription?.status === "ACTIVE" ? user.subscription.plan : "FREE";
              return (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{PLAN_PRICING[plan].label}</td>
                  <td className="px-4 py-2">{user._count.sites}</td>
                  <td className="px-4 py-2 text-zinc-500">{user.createdAt.toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
