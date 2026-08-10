import { notFound } from "next/navigation";

import { Editor } from "@/components/editor/editor";
import { auth } from "@/lib/auth";
import { blockContentSchema, blockSettingsSchema } from "@/lib/blocks/schema";
import { prisma } from "@/lib/prisma";
import type { EditorState } from "@/lib/editor/types";
import { themeSchema } from "@/lib/theme/schema";

export default async function EditSitePage({ params }: PageProps<"/dashboard/sites/[id]/edit">) {
  const { id } = await params;
  const session = await auth();

  const site = await prisma.site.findUnique({
    where: { id },
    include: { blocks: { orderBy: { sortOrder: "asc" } } },
  });

  if (!site || site.userId !== session?.user?.id) notFound();

  const initialState: EditorState = {
    theme: themeSchema.parse(site.theme),
    blocks: site.blocks.map((block) => ({
      id: block.id,
      content: blockContentSchema.parse(block.content),
      settings: blockSettingsSchema.parse(block.settings),
    })),
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2 px-6 text-center lg:hidden">
        <p className="text-lg font-medium">Use a larger screen</p>
        <p className="max-w-xs text-sm text-zinc-500">
          The editor needs more room to work. Open this page on a tablet or desktop to keep editing {site.name}.
        </p>
      </div>
      <div className="hidden lg:block">
        <Editor siteId={site.id} siteName={site.name} initialState={initialState} />
      </div>
    </>
  );
}
