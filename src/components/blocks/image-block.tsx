"use client";

import type { ImageContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

export function ImageBlock({ content }: { content: ImageContent }) {
  const editor = useEditorMode();

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={content.image.url} alt={content.image.alt} className="w-full rounded-2xl object-cover" />
  );

  return (
    <figure className="mx-auto max-w-3xl">
      {content.link ? (
        <a href={content.link.href} target={content.link.external ? "_blank" : undefined} rel="noopener noreferrer">
          {image}
        </a>
      ) : (
        image
      )}
      {(content.caption || editor) && (
        <EditableText
          as="figcaption"
          path="caption"
          value={content.caption ?? ""}
          className="mt-3 block text-center text-sm text-(--theme-color-muted)"
        />
      )}
    </figure>
  );
}
