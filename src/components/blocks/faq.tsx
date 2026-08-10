import { FaChevronDown } from "react-icons/fa6";

import type { FaqContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";
import { SectionHeading } from "@/components/blocks/section-heading";

export function Faq({ content }: { content: FaqContent }) {
  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading heading={content.heading} />
      <div className="divide-y divide-black/10 border-t border-b border-black/10">
        {content.items.map((item, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              <EditableText as="span" path={`items.${i}.question`} value={item.question} />
              <FaChevronDown className="shrink-0 transition-transform group-open:rotate-180" size={14} />
            </summary>
            <EditableText
              as="p"
              path={`items.${i}.answer`}
              value={item.answer}
              className="mt-3 block text-(--theme-color-muted)"
            />
          </details>
        ))}
      </div>
    </div>
  );
}
