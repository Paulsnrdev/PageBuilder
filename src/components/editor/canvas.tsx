"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { BlockFrame } from "@/components/editor/block-frame";
import type { Device, EditorBlock } from "@/lib/editor/types";
import type { Theme } from "@/lib/theme/schema";
import { ThemeProvider } from "@/lib/theme/theme-provider";

const deviceWidth: Record<Device, string> = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
};

export function Canvas({
  theme,
  blocks,
  device,
  selectedBlockId,
  onSelectBlock,
  onFieldChange,
  onDuplicate,
  onDelete,
  onToggleHidden,
}: {
  theme: Theme;
  blocks: EditorBlock[];
  device: Device;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onFieldChange: (blockId: string, path: string, value: string) => void;
  onDuplicate: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  onToggleHidden: (blockId: string) => void;
}) {
  const { setNodeRef: setEmptyDropRef } = useDroppable({ id: "canvas-empty" });

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-100 px-6 py-10" onClick={() => onSelectBlock(null)}>
      <div
        className="mx-auto overflow-hidden rounded-lg bg-white shadow-sm transition-[width] duration-200"
        style={{ width: deviceWidth[device], maxWidth: "100%" }}
        onClick={(event) => event.stopPropagation()}
      >
        <ThemeProvider theme={theme}>
          {blocks.length === 0 ? (
            <div ref={setEmptyDropRef} className="flex h-64 items-center justify-center text-sm text-zinc-400">
              Click or drag a block from the left to get started.
            </div>
          ) : (
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block) => (
                <BlockFrame
                  key={block.id}
                  block={block}
                  selected={block.id === selectedBlockId}
                  onSelect={() => onSelectBlock(block.id)}
                  onFieldChange={(path, value) => onFieldChange(block.id, path, value)}
                  onDuplicate={() => onDuplicate(block.id)}
                  onDelete={() => onDelete(block.id)}
                  onToggleHidden={() => onToggleHidden(block.id)}
                />
              ))}
            </SortableContext>
          )}
        </ThemeProvider>
      </div>
    </div>
  );
}
