import type { BlockContent, BlockSettings } from "@/lib/blocks/schema";

export type TemplateBlock = {
  content: BlockContent;
  settings?: Partial<BlockSettings>;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  previewImageUrl: string;
  blocks: TemplateBlock[];
};
