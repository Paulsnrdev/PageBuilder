import type { BlockContent } from "@/lib/blocks/schema";
import { blockContentSchema } from "@/lib/blocks/schema";
import type { BlockType } from "@/generated/prisma/enums";

const placeholderImage = { url: "https://picsum.photos/seed/placeholder/1200/900", alt: "Placeholder image" };

/** Starting content for a freshly added block, one entry per type. */
export const defaultContentByType: Record<BlockType, BlockContent> = {
  HERO: blockContentSchema.parse({
    type: "HERO",
    headline: "Your headline goes here",
    subheadline: "A short line about what you offer and who it's for.",
    image: placeholderImage,
    primaryCta: { label: "Get started", href: "#" },
  }),
  TEXT: blockContentSchema.parse({
    type: "TEXT",
    heading: "Section heading",
    body: "Write a paragraph about your business here.",
  }),
  IMAGE: blockContentSchema.parse({
    type: "IMAGE",
    image: placeholderImage,
  }),
  GALLERY: blockContentSchema.parse({
    type: "GALLERY",
    heading: "Gallery",
    images: [placeholderImage, placeholderImage, placeholderImage],
  }),
  FEATURES: blockContentSchema.parse({
    type: "FEATURES",
    heading: "Why choose us",
    items: [
      { title: "Feature one", description: "Describe this feature." },
      { title: "Feature two", description: "Describe this feature." },
      { title: "Feature three", description: "Describe this feature." },
    ],
  }),
  TESTIMONIALS: blockContentSchema.parse({
    type: "TESTIMONIALS",
    heading: "What customers say",
    items: [{ quote: "This business is great to work with.", authorName: "Customer name" }],
  }),
  PRICING: blockContentSchema.parse({
    type: "PRICING",
    heading: "Pricing",
    tiers: [
      { name: "Standard", price: "₦10,000", features: [{ text: "Feature one" }, { text: "Feature two" }] },
    ],
  }),
  FAQ: blockContentSchema.parse({
    type: "FAQ",
    heading: "Frequently asked questions",
    items: [{ question: "A common question?", answer: "The answer to that question." }],
  }),
  CTA: blockContentSchema.parse({
    type: "CTA",
    heading: "Ready to get started?",
    primaryCta: { label: "Contact us", href: "#contact" },
  }),
  CONTACT_FORM: blockContentSchema.parse({
    type: "CONTACT_FORM",
    heading: "Get in touch",
  }),
  WHATSAPP_BUTTON: blockContentSchema.parse({
    type: "WHATSAPP_BUTTON",
    phoneNumber: "+2348000000000",
  }),
  VIDEO_EMBED: blockContentSchema.parse({
    type: "VIDEO_EMBED",
    url: "https://youtu.be/dQw4w9WgXcQ",
  }),
  SOCIAL_LINKS: blockContentSchema.parse({
    type: "SOCIAL_LINKS",
    links: [{ platform: "instagram", url: "https://instagram.com" }],
  }),
  FOOTER: blockContentSchema.parse({
    type: "FOOTER",
    businessName: "Your business name",
  }),
  SPACER: blockContentSchema.parse({ type: "SPACER" }),
};
