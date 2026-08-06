import type { SocialLinksContent } from "@/lib/blocks/schema";
import { socialIconByPlatform } from "@/lib/blocks/social-icons";
import { SectionHeading } from "@/components/blocks/section-heading";

export function SocialLinks({ content }: { content: SocialLinksContent }) {
  return (
    <div className="text-center">
      <SectionHeading heading={content.heading} />
      <div className="flex flex-wrap justify-center gap-4">
        {content.links.map((link, i) => {
          const Icon = socialIconByPlatform[link.platform];
          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:bg-black/5"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
