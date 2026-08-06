import type { HeroContent } from "@/lib/blocks/schema";
import { CtaButton } from "@/components/blocks/cta-button";

export function Hero({ content }: { content: HeroContent }) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[content.alignment];

  const text = (
    <div className={`flex flex-col ${alignClass} gap-6`}>
      <h1 className="font-(family-name:--theme-font-heading) text-4xl font-semibold tracking-tight sm:text-5xl">
        {content.headline}
      </h1>
      {content.subheadline && (
        <p className="max-w-xl text-lg text-(--theme-color-muted)">{content.subheadline}</p>
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
