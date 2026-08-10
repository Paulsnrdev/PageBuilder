import type { BlockContent, BlockSettings } from "@/lib/blocks/schema";
import type { Theme } from "@/lib/theme/schema";

export type EditorBlock = {
  id: string;
  content: BlockContent;
  settings: BlockSettings;
};

export type EditorState = {
  theme: Theme;
  blocks: EditorBlock[];
};

export type Device = "mobile" | "tablet" | "desktop";
