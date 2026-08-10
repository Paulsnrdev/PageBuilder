import type { BlockType } from "@/generated/prisma/enums";

export const blockLibrary: { type: BlockType; label: string }[] = [
  { type: "HERO", label: "Hero" },
  { type: "TEXT", label: "Text" },
  { type: "IMAGE", label: "Image" },
  { type: "GALLERY", label: "Gallery" },
  { type: "FEATURES", label: "Features" },
  { type: "TESTIMONIALS", label: "Testimonials" },
  { type: "PRICING", label: "Pricing" },
  { type: "FAQ", label: "FAQ" },
  { type: "CTA", label: "Call to action" },
  { type: "CONTACT_FORM", label: "Contact form" },
  { type: "WHATSAPP_BUTTON", label: "WhatsApp button" },
  { type: "VIDEO_EMBED", label: "Video" },
  { type: "SOCIAL_LINKS", label: "Social links" },
  { type: "FOOTER", label: "Footer" },
  { type: "SPACER", label: "Spacer" },
];
