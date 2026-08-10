"use client";

import { EditableText } from "@/components/blocks/editable-text";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

export function SectionHeading({
  heading,
  subheading,
  showSubheading = false,
  align = "center",
}: {
  heading?: string;
  subheading?: string;
  /** Set true only when the block's content schema actually has a subheading field. */
  showSubheading?: boolean;
  align?: "left" | "center";
}) {
  const editor = useEditorMode();

  if (!heading && !subheading && !editor) return null;

  return (
    <div className={`mb-12 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {(heading || editor) && (
        <EditableText
          as="h2"
          path="heading"
          value={heading ?? ""}
          className="block font-(family-name:--theme-font-heading) text-3xl font-semibold tracking-tight sm:text-4xl"
        />
      )}
      {(subheading || (editor && showSubheading)) && (
        <EditableText
          as="p"
          path="subheading"
          value={subheading ?? ""}
          className="mt-4 block text-lg text-(--theme-color-muted)"
        />
      )}
    </div>
  );
}
