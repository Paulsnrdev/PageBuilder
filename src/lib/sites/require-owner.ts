import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Loads a site and throws unless the signed-in user owns it. */
export async function requireSiteOwner(siteId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not signed in");

  const site = await prisma.site.findUnique({ where: { id: siteId } });
  if (!site || site.userId !== session.user.id) throw new Error("Site not found");

  return site;
}
