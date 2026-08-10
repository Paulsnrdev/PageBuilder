import type { TextContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";

export function Text({ content }: { content: TextContent }) {
  const alignClass = { left: "text-left", center: "text-center mx-auto", right: "text-right ml-auto" }[
    content.alignment
  ];

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {content.heading && (
        <EditableText
          as="h2"
          path="heading"
          value={content.heading}
          className="mb-4 block font-(family-name:--theme-font-heading) text-3xl font-semibold tracking-tight"
        />
      )}
      {/* Multi-paragraph text doesn't survive contentEditable reliably, so body is edited via the settings panel instead. */}
      <p className="whitespace-pre-line text-lg leading-relaxed text-(--theme-color-foreground)">
        {content.body}
      </p>
    </div>
  );
}
