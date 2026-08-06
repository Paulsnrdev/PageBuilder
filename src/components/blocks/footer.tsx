import type { FooterContent } from "@/lib/blocks/schema";
import { socialIconByPlatform } from "@/lib/blocks/social-icons";

export function Footer({ content }: { content: FooterContent }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="font-(family-name:--theme-font-heading) text-lg font-semibold">
          {content.businessName}
        </p>
        {content.tagline && <p className="mt-1 text-sm text-(--theme-color-muted)">{content.tagline}</p>}
      </div>

      {content.links.length > 0 && (
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          {content.links.map((link, i) => (
            <a key={i} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {content.socialLinks.length > 0 && (
        <div className="flex gap-4">
          {content.socialLinks.map((link, i) => {
            const Icon = socialIconByPlatform[link.platform];
            return (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      )}

      {content.copyrightText && (
        <p className="w-full text-xs text-(--theme-color-muted) sm:text-right">{content.copyrightText}</p>
      )}
    </div>
  );
}
