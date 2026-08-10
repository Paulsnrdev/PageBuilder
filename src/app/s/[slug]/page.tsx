import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PublicSite } from "@/components/public/public-site";
import { prisma } from "@/lib/prisma";
import { publishedSnapshotSchema } from "@/lib/sites/snapshot";
import { getUserPlan, PLAN_LIMITS } from "@/lib/billing/plan";

async function getPublishedSite(slug: string) {
  const site = await prisma.site.findUnique({ where: { slug } });
  if (!site || !site.isPublished || !site.publishedSnapshot) return null;

  return { site, snapshot: publishedSnapshotSchema.parse(site.publishedSnapshot) };
}

export async function generateMetadata({ params }: PageProps<"/s/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublishedSite(slug);
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

export default async function PublicSitePage({
  params,
  searchParams,
}: PageProps<"/s/[slug]">) {
  const { slug } = await params;
  const { submitted } = await searchParams;
  const result = await getPublishedSite(slug);
  if (!result) notFound();

  const plan = await getUserPlan(result.site.userId);

  return (
    <PublicSite
      snapshot={result.snapshot}
      siteId={result.site.id}
      basePath={`/s/${slug}`}
      submittedBlockId={typeof submitted === "string" ? submitted : undefined}
      branded={PLAN_LIMITS[plan].branding}
    />
  );
}
