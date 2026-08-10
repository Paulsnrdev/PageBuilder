import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserPlan, PLAN_LIMITS } from "@/lib/billing/plan";

function csvCell(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET(_request: Request, { params }: RouteContext<"/dashboard/sites/[id]/leads/export">) {
  const { id } = await params;
  const session = await auth();

  const site = await prisma.site.findUnique({ where: { id }, select: { userId: true, name: true } });
  if (!site || site.userId !== session?.user?.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const plan = await getUserPlan(site.userId);
  if (!PLAN_LIMITS[plan].leadExport) {
    return NextResponse.json({ error: "Lead export needs a Pro or Business plan" }, { status: 403 });
  }

  const leads = await prisma.lead.findMany({ where: { siteId: id }, orderBy: { submittedAt: "desc" } });
  const columns = Array.from(new Set(leads.flatMap((lead) => Object.keys(lead.data as Record<string, string>))));

  const header = ["Submitted", ...columns].map(csvCell).join(",");
  const rows = leads.map((lead) => {
    const data = lead.data as Record<string, string>;
    return [lead.submittedAt.toISOString(), ...columns.map((column) => data[column] ?? "")].map(csvCell).join(",");
  });

  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${site.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-leads.csv"`,
    },
  });
}
