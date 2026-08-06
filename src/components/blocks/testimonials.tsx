import { FaStar } from "react-icons/fa6";

import type { TestimonialsContent } from "@/lib/blocks/schema";
import { SectionHeading } from "@/components/blocks/section-heading";

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <div>
      <SectionHeading heading={content.heading} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-2xl border border-black/10 p-6">
            {item.rating && (
              <div className="flex gap-1 text-(--theme-color-secondary)">
                {Array.from({ length: item.rating }).map((_, star) => (
                  <FaStar key={star} size={14} />
                ))}
              </div>
            )}
            <p className="text-(--theme-color-foreground)">&ldquo;{item.quote}&rdquo;</p>
            <div className="mt-auto flex items-center gap-3">
              {item.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.avatar.url} alt={item.avatar.alt} className="h-10 w-10 rounded-full object-cover" />
              )}
              <div>
                <p className="text-sm font-semibold">{item.authorName}</p>
                {item.authorRole && (
                  <p className="text-sm text-(--theme-color-muted)">{item.authorRole}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
