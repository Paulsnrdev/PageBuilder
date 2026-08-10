"use client";

import type { HeroContent } from "@/lib/blocks/schema";
import { CtaButton } from "@/components/blocks/cta-button";
import { EditableText } from "@/components/blocks/editable-text";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

export function Hero({ content }: { content: HeroContent }) {
  const editor = useEditorMode();

  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[content.alignment];

  const text = (
    <div className={`flex flex-col ${alignClass} gap-6`}>
      <EditableText
        as="h1"
        path="headline"
        value={content.headline}
        className="block font-(family-name:--theme-font-heading) text-4xl font-semibold tracking-tight sm:text-5xl"
      />
      {(content.subheadline || editor) && (
        <EditableText
          as="p"
          path="subheadline"
          value={content.subheadline ?? ""}
          className="block max-w-xl text-lg text-(--theme-color-muted)"
        />
      )}
      {(content.primaryCta || content.secondaryCta) && (
        <div className="mt-2 flex flex-wrap gap-4">
          {content.primaryCta && <CtaButton cta={content.primaryCta} variant="primary" />}
          {content.secondaryCta && <CtaButton cta={content.secondaryCta} variant="secondary" />}
        </div>
      )}
    </div>
  );

  if (!content.image) {
    return <div className="mx-auto max-w-3xl py-8">{text}</div>;
  }

  return (
    <div className="grid grid-cols-1 items-center gap-12 py-8 lg:grid-cols-2">
      {text}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.image.url}
        alt={content.image.alt}
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />
    </div>
  );
}
