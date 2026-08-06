import type { TextContent } from "@/lib/blocks/schema";

export function Text({ content }: { content: TextContent }) {
  const alignClass = { left: "text-left", center: "text-center mx-auto", right: "text-right ml-auto" }[
    content.alignment
  ];

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {content.heading && (
        <h2 className="font-(family-name:--theme-font-heading) mb-4 text-3xl font-semibold tracking-tight">
          {content.heading}
        </h2>
      )}
      <p className="whitespace-pre-line text-lg leading-relaxed text-(--theme-color-foreground)">
        {content.body}
      </p>
    </div>
  );
}
