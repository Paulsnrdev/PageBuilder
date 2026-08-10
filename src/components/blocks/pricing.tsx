import { FaCheck, FaXmark } from "react-icons/fa6";

import type { PricingContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";
import { SectionHeading } from "@/components/blocks/section-heading";

export function Pricing({ content }: { content: PricingContent }) {
  return (
    <div>
      <SectionHeading heading={content.heading} subheading={content.subheading} showSubheading />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.tiers.map((tier, i) => (
          <div
            key={i}
            className={`flex flex-col gap-6 rounded-2xl border p-8 ${
              tier.highlighted
                ? "border-(--theme-color-primary) shadow-lg"
                : "border-black/10"
            }`}
          >
            <div>
              <EditableText
                as="h3"
                path={`tiers.${i}.name`}
                value={tier.name}
                className="block font-(family-name:--theme-font-heading) text-lg font-semibold"
              />
              <p className="mt-2 flex items-baseline gap-1">
                <EditableText as="span" path={`tiers.${i}.price`} value={tier.price} className="block text-3xl font-semibold tracking-tight" />
                {tier.period && (
                  <span className="text-sm text-(--theme-color-muted)">/{tier.period}</span>
                )}
              </p>
            </div>
            <ul className="flex flex-1 flex-col gap-3">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  {feature.included ? (
                    <FaCheck className="mt-0.5 shrink-0 text-(--theme-color-secondary)" size={14} />
                  ) : (
                    <FaXmark className="mt-0.5 shrink-0 text-(--theme-color-muted)" size={14} />
                  )}
                  <EditableText
                    as="span"
                    path={`tiers.${i}.features.${j}.text`}
                    value={feature.text}
                    className={feature.included ? "" : "text-(--theme-color-muted) line-through"}
                  />
                </li>
              ))}
            </ul>
            {tier.ctaLabel && tier.ctaHref && (
              <a
                href={tier.ctaHref}
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                  tier.highlighted
                    ? "bg-(--theme-color-primary) text-white hover:opacity-90"
                    : "border border-(--theme-color-muted) hover:bg-black/5"
                }`}
              >
                {tier.ctaLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
