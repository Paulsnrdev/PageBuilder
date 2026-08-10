import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PublicSite } from "@/components/public/public-site";
import { prisma } from "@/lib/prisma";
import { publishedSnapshotSchema } from "@/lib/sites/snapshot";
import { getUserPlan, PLAN_LIMITS } from "@/lib/billing/plan";

// Custom domains are comparatively low-traffic and can change (re-verification,
// unpublish) outside the usual revalidatePath calls, so render fresh each time
// rather than relying on static caching here.
export const dynamic = "force-dynamic";

async function getSiteForHost(host: string) {
  const hostname = host.split(":")[0];
  const site = await prisma.site.findUnique({ where: { customDomain: hostname } });
  if (!site || !site.isPublished || !site.publishedSnapshot || !site.customDomainVerifiedAt) return null;

  return { site, snapshot: publishedSnapshotSchema.parse(site.publishedSnapshot) };
}

export async function generateMetadata({ params }: PageProps<"/domain/[host]">): Promise<Metadata> {
  const { host } = await params;
  const result = await getSiteForHost(host);
  if (!result) return {};

  const { snapshot } = result;

  return {
    title: snapshot.metaTitle || snapshot.name,
    description: snapshot.metaDescription,
    icons: snapshot.faviconUrl ? { icon: snapshot.faviconUrl } : undefined,
    openGraph: {
      title: snapshot.metaTitle || snapshot.name,
      description: snapshot.metaDescription,
      images: snapshot.ogImageUrl ? [snapshot.ogImageUrl] : undefined,
    },
  };
}

export default async function CustomDomainSitePage({ params, searchParams }: PageProps<"/domain/[host]">) {
  const { host } = await params;
  const { submitted } = await searchParams;
  const result = await getSiteForHost(host);
  if (!result) notFound();

  const plan = await getUserPlan(result.site.userId);

  return (
    <PublicSite
      snapshot={result.snapshot}
      siteId={result.site.id}
      basePath="/"
      submittedBlockId={typeof submitted === "string" ? submitted : undefined}
      branded={PLAN_LIMITS[plan].branding}
    />
  );
}
