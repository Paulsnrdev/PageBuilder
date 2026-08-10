"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blockContentSchema, blockSettingsSchema } from "@/lib/blocks/schema";
import { themeSchema, defaultTheme } from "@/lib/theme/schema";
import { slugify } from "@/lib/sites/slug";
import { requireSiteOwner } from "@/lib/sites/require-owner";
import { publishedSnapshotSchema } from "@/lib/sites/snapshot";
import { getTemplate } from "@/lib/templates";
import { getUserPlan, PLAN_LIMITS, PLAN_PRICING } from "@/lib/billing/plan";

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

export async function createSite(name: string, templateId?: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not signed in");

  const plan = await getUserPlan(session.user.id);
  const { maxSites } = PLAN_LIMITS[plan];
  const siteCount = await prisma.site.count({ where: { userId: session.user.id } });
  if (siteCount >= maxSites) {
    throw new Error(
      `Your ${PLAN_PRICING[plan].label} plan allows up to ${maxSites} site${maxSites === 1 ? "" : "s"}. Upgrade to add more.`,
    );
  }

  const template = templateId ? getTemplate(templateId) : undefined;
  const base = slugify(name) || "site";
  let siteId: string | undefined;

  for (let attempt = 0; attempt < 5 && !siteId; attempt++) {
    const slug = attempt === 0 ? base : `${base}-${Math.random().toString(36).slice(2, 6)}`;
    try {
      const site = await prisma.site.create({
        data: { userId: session.user.id, name, slug, theme: defaultTheme },
        select: { id: true },
      });
      siteId = site.id;
    } catch (error) {
      if (!isUniqueConstraintError(error)) throw error;
    }
  }

  if (!siteId) throw new Error("Could not create a unique site slug");

  if (template) {
    await prisma.block.createMany({
      data: template.blocks.map((templateBlock, index) => ({
        id: crypto.randomUUID(),
        siteId: siteId!,
        type: templateBlock.content.type,
        content: templateBlock.content,
        settings: templateBlock.settings ?? blockSettingsSchema.parse({}),
        sortOrder: index,
      })),
    });
  }

  redirect(`/dashboard/sites/${siteId}/edit`);
}

const saveSitePayloadSchema = z.object({
  theme: themeSchema,
  blocks: z.array(
    z.object({
      id: z.string().min(1),
      content: blockContentSchema,
      settings: blockSettingsSchema,
    }),
  ),
});

export type SaveSitePayload = z.infer<typeof saveSitePayloadSchema>;

export async function saveSite(siteId: string, payload: SaveSitePayload) {
  await requireSiteOwner(siteId);

  const { theme, blocks } = saveSitePayloadSchema.parse(payload);

  const incomingIds = blocks.map((block) => block.id);

  // A block id that already exists but belongs to a different site would let
  // one site's autosave overwrite another user's block. Reject that up front.
  const conflicting = await prisma.block.findMany({
    where: { id: { in: incomingIds }, siteId: { not: siteId } },
    select: { id: true },
  });
  if (conflicting.length > 0) throw new Error("Invalid block id");

  await prisma.$transaction([
    prisma.site.update({ where: { id: siteId }, data: { theme } }),
    prisma.block.deleteMany({ where: { siteId, id: { notIn: incomingIds } } }),
    ...blocks.map((block, index) =>
      prisma.block.upsert({
        where: { id: block.id },
        create: {
          id: block.id,
          siteId,
          type: block.content.type,
          content: block.content,
          settings: block.settings,
          sortOrder: index,
        },
        update: {
          type: block.content.type,
          content: block.content,
          settings: block.settings,
          sortOrder: index,
        },
      }),
    ),
  ]);

  revalidatePath(`/dashboard/sites/${siteId}/edit`);

  return { savedAt: new Date().toISOString() };
}

function revalidateSite(site: { slug: string; customDomain: string | null }) {
  revalidatePath(`/s/${site.slug}`);
  if (site.customDomain) revalidatePath(`/domain/${site.customDomain}`);
}

export async function publishSite(siteId: string) {
  const site = await requireSiteOwner(siteId);
  const blocks = await prisma.block.findMany({ where: { siteId }, orderBy: { sortOrder: "asc" } });

  const snapshot = publishedSnapshotSchema.parse({
    name: site.name,
    theme: site.theme,
    metaTitle: site.metaTitle ?? undefined,
    metaDescription: site.metaDescription ?? undefined,
    ogImageUrl: site.ogImageUrl ?? undefined,
    faviconUrl: site.faviconUrl ?? undefined,
    blocks: blocks.map((block) => ({ id: block.id, content: block.content, settings: block.settings })),
  });

  await prisma.site.update({
    where: { id: siteId },
    data: { isPublished: true, publishedAt: new Date(), publishedSnapshot: snapshot },
  });

  revalidateSite(site);
  revalidatePath(`/dashboard/sites/${siteId}/settings`);

  return { publishedAt: new Date().toISOString() };
}

export async function unpublishSite(siteId: string) {
  const site = await requireSiteOwner(siteId);

  await prisma.site.update({ where: { id: siteId }, data: { isPublished: false } });

  revalidateSite(site);
  revalidatePath(`/dashboard/sites/${siteId}/settings`);
}

const siteSettingsSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImageUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;

export async function updateSiteSettings(siteId: string, input: SiteSettingsInput) {
  const site = await requireSiteOwner(siteId);
  const data = siteSettingsSchema.parse(input);
  const slug = slugify(data.slug) || site.slug;

  try {
    await prisma.site.update({
      where: { id: siteId },
      data: {
        name: data.name,
        slug,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        ogImageUrl: data.ogImageUrl || null,
        faviconUrl: data.faviconUrl || null,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) throw new Error("That URL is already taken");
    throw error;
  }

  revalidatePath(`/dashboard/sites/${siteId}/settings`);
  revalidateSite(site);

  return { ok: true };
}
