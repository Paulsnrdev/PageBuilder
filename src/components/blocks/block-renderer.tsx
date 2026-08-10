"use client";

import type { BlockContent, BlockSettings } from "@/lib/blocks/schema";
import { BlockSection } from "@/components/blocks/block-section";
import { useEditorMode } from "@/lib/editor/editor-mode-context";
import { Cta } from "@/components/blocks/cta";
import { ContactForm } from "@/components/blocks/contact-form";
import { Faq } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Footer } from "@/components/blocks/footer";
import { Gallery } from "@/components/blocks/gallery";
import { Hero } from "@/components/blocks/hero";
import { ImageBlock } from "@/components/blocks/image-block";
import { Pricing } from "@/components/blocks/pricing";
import { SocialLinks } from "@/components/blocks/social-links";
import { Spacer } from "@/components/blocks/spacer";
import { Testimonials } from "@/components/blocks/testimonials";
import { Text } from "@/components/blocks/text";
import { VideoEmbed } from "@/components/blocks/video-embed";
import { WhatsappButton } from "@/components/blocks/whatsapp-button";
import { submitLead } from "@/lib/leads/actions";
import type { LeadContext } from "@/lib/leads/types";

function renderContent(content: BlockContent, id: string | undefined, leadContext: LeadContext | undefined) {
  switch (content.type) {
    case "HERO":
      return <Hero content={content} />;
    case "TEXT":
      return <Text content={content} />;
    case "IMAGE":
      return <ImageBlock content={content} />;
    case "GALLERY":
      return <Gallery content={content} />;
    case "FEATURES":
      return <Features content={content} />;
    case "TESTIMONIALS":
      return <Testimonials content={content} />;
    case "PRICING":
      return <Pricing content={content} />;
    case "FAQ":
      return <Faq content={content} />;
    case "CTA":
      return <Cta content={content} />;
    case "CONTACT_FORM":
      return (
        <ContactForm
          content={content}
          action={id && leadContext ? submitLead.bind(null, leadContext.siteId, id, leadContext.basePath) : undefined}
          submitted={Boolean(id) && leadContext?.submittedBlockId === id}
          whatsappHref={leadContext?.whatsappHref}
        />
      );
    case "WHATSAPP_BUTTON":
      return <WhatsappButton content={content} />;
    case "VIDEO_EMBED":
      return <VideoEmbed content={content} />;
    case "SOCIAL_LINKS":
      return <SocialLinks content={content} />;
    case "FOOTER":
      return <Footer content={content} />;
    case "SPACER":
      return <Spacer content={content} />;
  }
}

/** Renders one block's content through its matching component, wrapped in the shared section chrome. */
export function BlockRenderer({
  id,
  content,
  settings,
  leadContext,
}: {
  id?: string;
  content: BlockContent;
  settings: BlockSettings;
  leadContext?: LeadContext;
}) {
  const editor = useEditorMode();

  // A floating WhatsApp button sits outside normal page flow, so it shouldn't
  // get the section wrapper's container width, padding, or background.
  if (content.type === "WHATSAPP_BUTTON" && content.displayStyle === "floating") {
    if (settings.hidden && !editor) return null;
    return <WhatsappButton content={content} />;
  }

  return <BlockSection settings={settings}>{renderContent(content, id, leadContext)}</BlockSection>;
}
