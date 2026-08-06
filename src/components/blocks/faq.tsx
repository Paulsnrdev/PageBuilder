import { FaChevronDown } from "react-icons/fa6";

import type { FaqContent } from "@/lib/blocks/schema";
import { SectionHeading } from "@/components/blocks/section-heading";

export function Faq({ content }: { content: FaqContent }) {
  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading heading={content.heading} />
      <div className="divide-y divide-black/10 border-t border-b border-black/10">
        {content.items.map((item, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {item.question}
              <FaChevronDown className="shrink-0 transition-transform group-open:rotate-180" size={14} />
            </summary>
            <p className="mt-3 text-(--theme-color-muted)">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
