import { z } from "zod";

import { blockContentSchema, blockSettingsSchema } from "@/lib/blocks/schema";
import { themeSchema } from "@/lib/theme/schema";

/**
 * Everything the public site needs to render, captured as one object at
 * publish time. The draft (live Site columns + Block rows) keeps changing
 * as the owner edits; this snapshot only changes when they publish.
 */
export const publishedSnapshotSchema = z.object({
  name: z.string(),
  theme: themeSchema,
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImageUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  blocks: z.array(
    z.object({
      id: z.string(),
      content: blockContentSchema,
      settings: blockSettingsSchema,
    }),
  ),
});

export type PublishedSnapshot = z.infer<typeof publishedSnapshotSchema>;
