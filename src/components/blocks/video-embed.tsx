import type { VideoEmbedContent } from "@/lib/blocks/schema";
import { toEmbedUrl } from "@/lib/blocks/video-embed-url";

const aspectClass = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

export function VideoEmbed({ content }: { content: VideoEmbedContent }) {
  return (
    <figure className="mx-auto max-w-3xl">
      <div className={`w-full overflow-hidden rounded-2xl ${aspectClass[content.aspectRatio]}`}>
        <iframe
          src={toEmbedUrl(content.url)}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {content.caption && (
        <figcaption className="mt-3 text-center text-sm text-(--theme-color-muted)">
          {content.caption}
        </figcaption>
      )}
    </figure>
  );
}
