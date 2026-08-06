import { z } from "zod";

// Shared primitives reused across block content shapes.

const image = z.object({
  url: z.string().url(),
  alt: z.string(),
});

const link = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().default(false),
});

export type ImageField = z.infer<typeof image>;
export type LinkField = z.infer<typeof link>;

const socialPlatform = z.enum([
  "facebook",
  "instagram",
  "twitter",
  "tiktok",
  "linkedin",
  "youtube",
  "whatsapp",
  "website",
]);

const alignment = z.enum(["left", "center", "right"]);

// Settings shared by every block, independent of its content shape.
export const blockSettingsSchema = z.object({
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  paddingY: z.enum(["none", "sm", "md", "lg"]).default("md"),
  containerWidth: z.enum(["narrow", "default", "wide", "full"]).default("default"),
  anchorId: z.string().optional(),
  hidden: z.boolean().default(false),
});

export type BlockSettings = z.infer<typeof blockSettingsSchema>;

// One content schema per block type. `type` is the discriminant used by
// blockContentSchema and by BlockRenderer to pick the right component.

const heroContent = z.object({
  type: z.literal("HERO"),
  headline: z.string().min(1),
  subheadline: z.string().optional(),
  image: image.optional(),
  primaryCta: link.optional(),
  secondaryCta: link.optional(),
  alignment: alignment.default("center"),
});

const textContent = z.object({
  type: z.literal("TEXT"),
  heading: z.string().optional(),
  body: z.string().min(1),
  alignment: alignment.default("left"),
});

const imageContent = z.object({
  type: z.literal("IMAGE"),
  image,
  caption: z.string().optional(),
  link: link.optional(),
});

const galleryContent = z.object({
  type: z.literal("GALLERY"),
  heading: z.string().optional(),
  images: z.array(image).min(1),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
});

const featuresContent = z.object({
  type: z.literal("FEATURES"),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  items: z
    .array(
      z.object({
        icon: z.string().optional(),
        title: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .min(1),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
});

const testimonialsContent = z.object({
  type: z.literal("TESTIMONIALS"),
  heading: z.string().optional(),
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        authorName: z.string().min(1),
        authorRole: z.string().optional(),
        avatar: image.optional(),
        rating: z.number().int().min(1).max(5).optional(),
      }),
    )
    .min(1),
});

const pricingContent = z.object({
  type: z.literal("PRICING"),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  tiers: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        period: z.string().optional(),
        features: z
          .array(
            z.object({
              text: z.string().min(1),
              included: z.boolean().default(true),
            }),
          )
          .default([]),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
        highlighted: z.boolean().default(false),
      }),
    )
    .min(1),
});

const faqContent = z.object({
  type: z.literal("FAQ"),
  heading: z.string().optional(),
  items: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      }),
    )
    .min(1),
});

const ctaContent = z.object({
  type: z.literal("CTA"),
  heading: z.string().min(1),
  subheading: z.string().optional(),
  primaryCta: link,
  secondaryCta: link.optional(),
});

const customField = z.object({
  label: z.string().min(1),
  type: z.enum(["text", "textarea", "select"]).default("text"),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(), // for type: "select"
});

const contactFormContent = z.object({
  type: z.literal("CONTACT_FORM"),
  heading: z.string().optional(),
  description: z.string().optional(),
  fields: z
    .object({
      name: z.boolean().default(true),
      email: z.boolean().default(true),
      phone: z.boolean().default(false),
      message: z.boolean().default(true),
    })
    .default({ name: true, email: true, phone: false, message: true }),
  customFields: z.array(customField).default([]),
  submitLabel: z.string().default("Send message"),
  successMessage: z.string().default("Thanks, we'll be in touch soon."),
});

const whatsappButtonContent = z.object({
  type: z.literal("WHATSAPP_BUTTON"),
  phoneNumber: z.string().min(7),
  prefilledMessage: z.string().optional(),
  displayStyle: z.enum(["floating", "inline"]).default("floating"),
  label: z.string().default("Chat on WhatsApp"),
});

const videoEmbedContent = z.object({
  type: z.literal("VIDEO_EMBED"),
  url: z.string().url(),
  caption: z.string().optional(),
  aspectRatio: z.enum(["16:9", "4:3", "1:1"]).default("16:9"),
});

const socialLinksContent = z.object({
  type: z.literal("SOCIAL_LINKS"),
  heading: z.string().optional(),
  links: z
    .array(
      z.object({
        platform: socialPlatform,
        url: z.string().url(),
      }),
    )
    .min(1),
});

const footerContent = z.object({
  type: z.literal("FOOTER"),
  businessName: z.string().min(1),
  tagline: z.string().optional(),
  links: z.array(link).default([]),
  socialLinks: z
    .array(
      z.object({
        platform: socialPlatform,
        url: z.string().url(),
      }),
    )
    .default([]),
  copyrightText: z.string().optional(),
});

const spacerContent = z.object({
  type: z.literal("SPACER"),
  height: z.enum(["sm", "md", "lg", "xl"]).default("md"),
});

export const blockContentSchema = z.discriminatedUnion("type", [
  heroContent,
  textContent,
  imageContent,
  galleryContent,
  featuresContent,
  testimonialsContent,
  pricingContent,
  faqContent,
  ctaContent,
  contactFormContent,
  whatsappButtonContent,
  videoEmbedContent,
  socialLinksContent,
  footerContent,
  spacerContent,
]);

// The TypeScript discriminated union, derived from the Zod schemas above so
// the two can never drift apart.
export type BlockContent = z.infer<typeof blockContentSchema>;

export type HeroContent = z.infer<typeof heroContent>;
export type TextContent = z.infer<typeof textContent>;
export type ImageContent = z.infer<typeof imageContent>;
export type GalleryContent = z.infer<typeof galleryContent>;
export type FeaturesContent = z.infer<typeof featuresContent>;
export type TestimonialsContent = z.infer<typeof testimonialsContent>;
export type PricingContent = z.infer<typeof pricingContent>;
export type FaqContent = z.infer<typeof faqContent>;
export type CtaContent = z.infer<typeof ctaContent>;
export type ContactFormContent = z.infer<typeof contactFormContent>;
export type WhatsappButtonContent = z.infer<typeof whatsappButtonContent>;
export type VideoEmbedContent = z.infer<typeof videoEmbedContent>;
export type SocialLinksContent = z.infer<typeof socialLinksContent>;
export type FooterContent = z.infer<typeof footerContent>;
export type SpacerContent = z.infer<typeof spacerContent>;

export const blockContentSchemasByType = {
  HERO: heroContent,
  TEXT: textContent,
  IMAGE: imageContent,
  GALLERY: galleryContent,
  FEATURES: featuresContent,
  TESTIMONIALS: testimonialsContent,
  PRICING: pricingContent,
  FAQ: faqContent,
  CTA: ctaContent,
  CONTACT_FORM: contactFormContent,
  WHATSAPP_BUTTON: whatsappButtonContent,
  VIDEO_EMBED: videoEmbedContent,
  SOCIAL_LINKS: socialLinksContent,
  FOOTER: footerContent,
  SPACER: spacerContent,
} as const;
