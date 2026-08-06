import type { FeaturesContent } from "@/lib/blocks/schema";
import { SectionHeading } from "@/components/blocks/section-heading";

const columnsClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Features({ content }: { content: FeaturesContent }) {
  return (
    <div>
      <SectionHeading heading={content.heading} subheading={content.subheading} />
      <div className={`grid grid-cols-1 gap-8 ${columnsClass[content.columns]}`}>
        {content.items.map((item, i) => (
          <div key={i} className="flex flex-col gap-3">
            {item.icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--theme-color-secondary)/10 text-2xl">
                {item.icon}
              </div>
            )}
            <h3 className="font-(family-name:--theme-font-heading) text-lg font-semibold">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-(--theme-color-muted)">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
