import { notFound } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SiteSettingsForm } from "@/components/settings/site-settings-form";
import { getUserPlan, PLAN_LIMITS } from "@/lib/billing/plan";

export default async function SiteSettingsPage({ params }: PageProps<"/dashboard/sites/[id]/settings">) {
  const { id } = await params;
  const session = await auth();
  const site = await prisma.site.findUnique({ where: { id } });
  if (!site || site.userId !== session?.user?.id) notFound();

  const plan = await getUserPlan(site.userId);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/dashboard/sites" className="text-sm text-zinc-500 hover:text-zinc-900">
            ← Sites
          </Link>
          <h1 className="mt-1 text-2xl font-semibold">{site.name} settings</h1>
        </div>
        <Link
          href={`/dashboard/sites/${site.id}/edit`}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
        >
          Open editor
        </Link>
      </div>

      <SiteSettingsForm
        canUseCustomDomain={PLAN_LIMITS[plan].customDomain}
        site={{
          id: site.id,
          name: site.name,
          slug: site.slug,
          metaTitle: site.metaTitle,
          metaDescription: site.metaDescription,
          ogImageUrl: site.ogImageUrl,
          faviconUrl: site.faviconUrl,
          isPublished: site.isPublished,
          publishedAt: site.publishedAt?.toISOString() ?? null,
          customDomain: site.customDomain,
          customDomainVerifiedAt: site.customDomainVerifiedAt?.toISOString() ?? null,
        }}
      />
    </div>
  );
}
