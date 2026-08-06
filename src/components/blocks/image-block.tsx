import type { ImageContent } from "@/lib/blocks/schema";

export function ImageBlock({ content }: { content: ImageContent }) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={content.image.url} alt={content.image.alt} className="w-full rounded-2xl object-cover" />
  );

  return (
    <figure className="mx-auto max-w-3xl">
      {content.link ? (
        <a href={content.link.href} target={content.link.external ? "_blank" : undefined} rel="noopener noreferrer">
          {image}
        </a>
      ) : (
        image
      )}
      {content.caption && (
        <figcaption className="mt-3 text-center text-sm text-(--theme-color-muted)">
          {content.caption}
        </figcaption>
      )}
    </figure>
  );
}
