"use client";

import type { FeaturesContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";
import { SectionHeading } from "@/components/blocks/section-heading";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

const columnsClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Features({ content }: { content: FeaturesContent }) {
  const editor = useEditorMode();

  return (
    <div>
      <SectionHeading heading={content.heading} subheading={content.subheading} showSubheading />
      <div className={`grid grid-cols-1 gap-8 ${columnsClass[content.columns]}`}>
        {content.items.map((item, i) => (
          <div key={i} className="flex flex-col gap-3">
            {item.icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--theme-color-secondary)/10 text-2xl">
                {item.icon}
              </div>
            )}
            <EditableText
              as="h3"
              path={`items.${i}.title`}
              value={item.title}
              className="block font-(family-name:--theme-font-heading) text-lg font-semibold"
            />
            {(item.description || editor) && (
              <EditableText
                as="p"
                path={`items.${i}.description`}
                value={item.description ?? ""}
                className="block text-(--theme-color-muted)"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
