import type { BlockType } from "@/generated/prisma/enums";

export type FieldDescriptor =
  | { kind: "text"; key: string; label: string }
  | { kind: "textarea"; key: string; label: string }
  | { kind: "boolean"; key: string; label: string }
  | { kind: "select"; key: string; label: string; options: { value: string; label: string }[] }
  | { kind: "image"; key: string; label: string }
  | { kind: "link"; key: string; label: string }
  | { kind: "list"; key: string; label: string; itemLabel: string; itemFields: FieldDescriptor[]; defaultItem: Record<string, unknown> };

const alignmentOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Centre" },
  { value: "right", label: "Right" },
];

const columnsOptions = [
  { value: "2", label: "2 columns" },
  { value: "3", label: "3 columns" },
  { value: "4", label: "4 columns" },
];

const imageFieldDefault = { url: "https://picsum.photos/seed/new/1200/900", alt: "" };

export const contentFieldsByType: Record<BlockType, FieldDescriptor[]> = {
  HERO: [
    { kind: "image", key: "image", label: "Image" },
    { kind: "link", key: "primaryCta", label: "Primary button" },
    { kind: "link", key: "secondaryCta", label: "Secondary button" },
    { kind: "select", key: "alignment", label: "Text alignment", options: alignmentOptions },
  ],
  TEXT: [
    { kind: "textarea", key: "body", label: "Body" },
    { kind: "select", key: "alignment", label: "Alignment", options: alignmentOptions },
  ],
  IMAGE: [
    { kind: "image", key: "image", label: "Image" },
    { kind: "link", key: "link", label: "Link" },
  ],
  GALLERY: [
    {
      kind: "list",
      key: "images",
      label: "Images",
      itemLabel: "Image",
      itemFields: [{ kind: "image", key: "", label: "Image" }],
      defaultItem: imageFieldDefault,
    },
    { kind: "select", key: "columns", label: "Columns", options: columnsOptions },
  ],
  FEATURES: [
    {
      kind: "list",
      key: "items",
      label: "Features",
      itemLabel: "Feature",
      itemFields: [
        { kind: "text", key: "icon", label: "Icon (emoji)" },
        { kind: "text", key: "title", label: "Title" },
        { kind: "textarea", key: "description", label: "Description" },
      ],
      defaultItem: { title: "New feature", description: "" },
    },
    { kind: "select", key: "columns", label: "Columns", options: columnsOptions },
  ],
  TESTIMONIALS: [
    {
      kind: "list",
      key: "items",
      label: "Testimonials",
      itemLabel: "Testimonial",
      itemFields: [
        { kind: "textarea", key: "quote", label: "Quote" },
        { kind: "text", key: "authorName", label: "Author name" },
        { kind: "text", key: "authorRole", label: "Author role" },
        { kind: "image", key: "avatar", label: "Avatar" },
      ],
      defaultItem: { quote: "New testimonial", authorName: "Customer name" },
    },
  ],
  PRICING: [
    {
      kind: "list",
      key: "tiers",
      label: "Pricing tiers",
      itemLabel: "Tier",
      itemFields: [
        { kind: "text", key: "name", label: "Name" },
        { kind: "text", key: "price", label: "Price" },
        { kind: "text", key: "period", label: "Period (e.g. serves 6-8)" },
        { kind: "text", key: "ctaLabel", label: "Button label" },
        { kind: "text", key: "ctaHref", label: "Button link" },
        { kind: "boolean", key: "highlighted", label: "Highlight this tier" },
        {
          kind: "list",
          key: "features",
          label: "Features",
          itemLabel: "Feature",
          itemFields: [
            { kind: "text", key: "text", label: "Text" },
            { kind: "boolean", key: "included", label: "Included" },
          ],
          defaultItem: { text: "New feature", included: true },
        },
      ],
      defaultItem: { name: "New tier", price: "0" },
    },
  ],
  FAQ: [
    {
      kind: "list",
      key: "items",
      label: "Questions",
      itemLabel: "Question",
      itemFields: [
        { kind: "text", key: "question", label: "Question" },
        { kind: "textarea", key: "answer", label: "Answer" },
      ],
      defaultItem: { question: "New question?", answer: "The answer." },
    },
  ],
  CTA: [
    { kind: "link", key: "primaryCta", label: "Primary button" },
    { kind: "link", key: "secondaryCta", label: "Secondary button" },
  ],
  CONTACT_FORM: [
    { kind: "boolean", key: "fields.name", label: "Show name field" },
    { kind: "boolean", key: "fields.email", label: "Show email field" },
    { kind: "boolean", key: "fields.phone", label: "Show phone field" },
    { kind: "boolean", key: "fields.message", label: "Show message field" },
    { kind: "text", key: "submitLabel", label: "Submit button label" },
    { kind: "text", key: "successMessage", label: "Success message" },
  ],
  WHATSAPP_BUTTON: [
    { kind: "text", key: "phoneNumber", label: "Phone number" },
    { kind: "textarea", key: "prefilledMessage", label: "Prefilled message" },
    {
      kind: "select",
      key: "displayStyle",
      label: "Display style",
      options: [
        { value: "floating", label: "Floating" },
        { value: "inline", label: "Inline" },
      ],
    },
  ],
  VIDEO_EMBED: [
    { kind: "text", key: "url", label: "Video URL" },
    {
      kind: "select",
      key: "aspectRatio",
      label: "Aspect ratio",
      options: [
        { value: "16:9", label: "16:9" },
        { value: "4:3", label: "4:3" },
        { value: "1:1", label: "1:1" },
      ],
    },
  ],
  SOCIAL_LINKS: [
    {
      kind: "list",
      key: "links",
      label: "Links",
      itemLabel: "Link",
      itemFields: [
        {
          kind: "select",
          key: "platform",
          label: "Platform",
          options: [
            { value: "facebook", label: "Facebook" },
            { value: "instagram", label: "Instagram" },
            { value: "twitter", label: "Twitter / X" },
            { value: "tiktok", label: "TikTok" },
            { value: "linkedin", label: "LinkedIn" },
            { value: "youtube", label: "YouTube" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "website", label: "Website" },
          ],
        },
        { kind: "text", key: "url", label: "URL" },
      ],
      defaultItem: { platform: "website", url: "https://" },
    },
  ],
  FOOTER: [
    {
      kind: "list",
      key: "links",
      label: "Nav links",
      itemLabel: "Link",
      itemFields: [
        { kind: "text", key: "label", label: "Label" },
        { kind: "text", key: "href", label: "URL" },
      ],
      defaultItem: { label: "New link", href: "#" },
    },
    {
      kind: "list",
      key: "socialLinks",
      label: "Social links",
      itemLabel: "Link",
      itemFields: [
        {
          kind: "select",
          key: "platform",
          label: "Platform",
          options: [
            { value: "facebook", label: "Facebook" },
            { value: "instagram", label: "Instagram" },
            { value: "twitter", label: "Twitter / X" },
            { value: "tiktok", label: "TikTok" },
            { value: "linkedin", label: "LinkedIn" },
            { value: "youtube", label: "YouTube" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "website", label: "Website" },
          ],
        },
        { kind: "text", key: "url", label: "URL" },
      ],
      defaultItem: { platform: "website", url: "https://" },
    },
  ],
  SPACER: [
    {
      kind: "select",
      key: "height",
      label: "Height",
      options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
        { value: "xl", label: "Extra large" },
      ],
    },
  ],
};
