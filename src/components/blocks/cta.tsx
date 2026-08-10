"use client";

import type { CtaContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

export function Cta({ content }: { content: CtaContent }) {
  const editor = useEditorMode();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl bg-(--theme-color-primary) px-8 py-16 text-center text-white">
      <EditableText
        as="h2"
        path="heading"
        value={content.heading}
        className="block font-(family-name:--theme-font-heading) text-3xl font-semibold tracking-tight sm:text-4xl"
      />
      {(content.subheading || editor) && (
        <EditableText as="p" path="subheading" value={content.subheading ?? ""} className="block max-w-xl text-white/80" />
      )}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={content.primaryCta.href}
          target={content.primaryCta.external ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-(--theme-color-primary) transition hover:opacity-90"
        >
          {content.primaryCta.label}
        </a>
        {content.secondaryCta && (
          <a
            href={content.secondaryCta.href}
            target={content.secondaryCta.external ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {content.secondaryCta.label}
          </a>
        )}
      </div>
    </div>
  );
}
