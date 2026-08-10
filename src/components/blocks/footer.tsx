"use client";

import type { FooterContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";
import { socialIconByPlatform } from "@/lib/blocks/social-icons";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

export function Footer({ content }: { content: FooterContent }) {
  const editor = useEditorMode();

  return (
    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <EditableText
          as="p"
          path="businessName"
          value={content.businessName}
          className="block font-(family-name:--theme-font-heading) text-lg font-semibold"
        />
        {(content.tagline || editor) && (
          <EditableText as="p" path="tagline" value={content.tagline ?? ""} className="mt-1 block text-sm text-(--theme-color-muted)" />
        )}
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

      {(content.copyrightText || editor) && (
        <EditableText
          as="p"
          path="copyrightText"
          value={content.copyrightText ?? ""}
          className="block w-full text-xs text-(--theme-color-muted) sm:text-right"
        />
      )}
    </div>
  );
}
