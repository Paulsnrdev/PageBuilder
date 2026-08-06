import type { GalleryContent } from "@/lib/blocks/schema";
import { SectionHeading } from "@/components/blocks/section-heading";

const columnsClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Gallery({ content }: { content: GalleryContent }) {
  return (
    <div>
      <SectionHeading heading={content.heading} />
      <div className={`grid grid-cols-1 gap-4 ${columnsClass[content.columns]}`}>
        {content.images.map((image, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={image.url}
            alt={image.alt}
            className="aspect-square w-full rounded-xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}
