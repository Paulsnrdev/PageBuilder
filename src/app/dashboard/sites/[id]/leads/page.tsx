import { notFound } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserPlan, PLAN_LIMITS } from "@/lib/billing/plan";

export default async function LeadsPage({ params }: PageProps<"/dashboard/sites/[id]/leads">) {
  const { id } = await params;
  const session = await auth();
  const site = await prisma.site.findUnique({ where: { id } });
  if (!site || site.userId !== session?.user?.id) notFound();

  const [leads, plan] = await Promise.all([
    prisma.lead.findMany({ where: { siteId: id }, orderBy: { submittedAt: "desc" } }),
    getUserPlan(site.userId),
  ]);
  const canExport = PLAN_LIMITS[plan].leadExport;

  const columns = Array.from(
    new Set(leads.flatMap((lead) => Object.keys(lead.data as Record<string, string>))),
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/dashboard/sites" className="text-sm text-zinc-500 hover:text-zinc-900">
            ← Sites
          </Link>
          <h1 className="mt-1 text-2xl font-semibold">{site.name} leads</h1>
        </div>
        {leads.length > 0 &&
          (canExport ? (
            <a
              href={`/dashboard/sites/${id}/leads/export`}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
            >
              Export CSV
            </a>
          ) : (
            <a
              href="/dashboard/billing"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50"
            >
              Export CSV (Pro)
            </a>
          ))}
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-zinc-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 capitalize">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {leads.map((lead) => {
                const data = lead.data as Record<string, string>;
                return (
                  <tr key={lead.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                      {lead.submittedAt.toLocaleString()}
                    </td>
                    {columns.map((column) => (
                      <td key={column} className="px-4 py-3">
                        {data[column] ?? ""}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
