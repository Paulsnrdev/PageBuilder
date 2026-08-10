import { blockContentSchema, blockSettingsSchema } from "@/lib/blocks/schema";
import type { TemplateBlock } from "@/lib/templates/types";

/** Validates a template's raw content/settings the same way user-authored blocks are validated. */
export function block(content: Record<string, unknown>, settings?: Record<string, unknown>): TemplateBlock {
  return {
    content: blockContentSchema.parse(content),
    settings: blockSettingsSchema.parse(settings ?? {}),
  };
}

export const image = (seed: string, w = 1200, h = 900, alt = "") => ({
  url: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  alt,
});

export const tinted = { backgroundColor: "#f8fafc" };
