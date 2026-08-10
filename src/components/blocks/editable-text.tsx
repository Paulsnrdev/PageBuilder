"use client";

import type { FocusEvent } from "react";

import { useEditorMode } from "@/lib/editor/editor-mode-context";

type EditableTag = "span" | "p" | "h1" | "h2" | "h3" | "figcaption";

/**
 * Renders plain text on the public site. Inside the editor canvas (when an
 * EditorModeProvider is present), the same text becomes click-to-edit:
 * contentEditable, committing on blur so React never fights the DOM mid-edit.
 */
export function EditableText({
  as: Tag = "span",
  path,
  value,
  className,
}: {
  as?: EditableTag;
  path: string;
  value: string;
  className?: string;
}) {
  const editor = useEditorMode();

  if (!editor) {
    return <Tag className={className}>{value}</Tag>;
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    editor.onFieldChange(path, event.currentTarget.textContent ?? "");
  };

  return (
    <Tag
      className={`${className ?? ""} rounded outline-none focus:ring-2 focus:ring-blue-500`}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
    >
      {value}
    </Tag>
  );
}
