"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaCopy, FaEye, FaEyeSlash, FaGripVertical, FaTrash } from "react-icons/fa6";

import { BlockRenderer } from "@/components/blocks/block-renderer";
import { EditorModeProvider } from "@/lib/editor/editor-mode-context";
import type { EditorBlock } from "@/lib/editor/types";

export function BlockFrame({
  block,
  selected,
  onSelect,
  onFieldChange,
  onDuplicate,
  onDelete,
  onToggleHidden,
}: {
  block: EditorBlock;
  selected: boolean;
  onSelect: () => void;
  onFieldChange: (path: string, value: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleHidden: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`group relative outline outline-2 -outline-offset-2 ${
        selected ? "outline-blue-500" : "outline-transparent hover:outline-blue-200"
      } ${block.settings.hidden ? "opacity-40" : ""} ${isDragging ? "z-10 opacity-50" : ""}`}
    >
      <div
        className={`absolute -top-8 left-0 z-20 flex items-center gap-1 rounded-t-md bg-blue-500 px-1.5 py-1 text-white transition ${
          selected ? "opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
        }`}
      >
        <button type="button" aria-label="Drag to reorder" className="cursor-grab p-1" {...attributes} {...listeners}>
          <FaGripVertical size={12} />
        </button>
        <button
          type="button"
          aria-label={block.settings.hidden ? "Show block" : "Hide block"}
          className="p-1 hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            onToggleHidden();
          }}
        >
          {block.settings.hidden ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
        </button>
        <button
          type="button"
          aria-label="Duplicate block"
          className="p-1 hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <FaCopy size={12} />
        </button>
        <button
          type="button"
          aria-label="Delete block"
          className="p-1 hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrash size={12} />
        </button>
      </div>

      <EditorModeProvider value={{ onFieldChange }}>
        <BlockRenderer content={block.content} settings={block.settings} />
      </EditorModeProvider>
    </div>
  );
}
