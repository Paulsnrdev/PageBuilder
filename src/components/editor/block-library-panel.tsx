"use client";

import { useDraggable } from "@dnd-kit/core";
import { FaGripVertical } from "react-icons/fa6";

import type { BlockType } from "@/generated/prisma/enums";
import { blockLibrary } from "@/lib/blocks/library";

function LibraryItem({ type, label, onAdd }: { type: BlockType; label: string; onAdd: (type: BlockType) => void }) {
  // Drag listeners live on a dedicated handle, not the button itself: dnd-kit's
  // pointerdown handler calls preventDefault(), which per the Pointer Events
  // spec suppresses the browser's synthetic click that would otherwise follow.
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `library-${type}` });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center overflow-hidden rounded-lg border border-zinc-200 transition hover:border-zinc-300 hover:bg-zinc-50 ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <button type="button" onClick={() => onAdd(type)} className="flex-1 px-3 py-2.5 text-left text-sm">
        {label}
      </button>
      <button
        type="button"
        aria-label={`Drag to add ${label}`}
        className="cursor-grab px-2 text-zinc-300 hover:text-zinc-500"
        {...attributes}
        {...listeners}
      >
        <FaGripVertical size={12} />
      </button>
    </div>
  );
}

export function BlockLibraryPanel({ onAdd }: { onAdd: (type: BlockType) => void }) {
  return (
    <aside className="w-64 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white p-3">
      <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wide text-zinc-400">Blocks</p>
      <div className="flex flex-col gap-1.5">
        {blockLibrary.map(({ type, label }) => (
          <LibraryItem key={type} type={type} label={label} onAdd={onAdd} />
        ))}
      </div>
    </aside>
  );
}
