import { BlockRenderer } from "@/components/blocks/block-renderer";
import { blockContentSchema, blockSettingsSchema } from "@/lib/blocks/schema";
import { defaultTheme } from "@/lib/theme/schema";
import { ThemeProvider } from "@/lib/theme/theme-provider";

const image = (seed: string, w = 1200, h = 900, alt = "") => ({
  url: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  alt,
});

const plain = blockSettingsSchema.parse({});
const tinted = blockSettingsSchema.parse({ backgroundColor: "#f8fafc" });

const blocks = [
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "HERO",
      headline: "Freshly baked, delivered across Lagos",
      subheadline:
        "Sade's Kitchen makes small-batch cakes and pastries. Order online and we'll deliver same day.",
      image: image("hero-bakery", 1200, 900, "Assorted pastries on a wooden table"),
      primaryCta: { label: "Order now", href: "#contact" },
      secondaryCta: { label: "See our bakes", href: "#gallery" },
      alignment: "left",
    }),
  },
  {
    settings: tinted,
    content: blockContentSchema.parse({
      type: "TEXT",
      heading: "Our story",
      body: "Sade's Kitchen started in 2019 out of a home kitchen in Yaba, baking birthday cakes for neighbours on weekends.\n\nToday we run a small storefront on Herbert Macaulay Way, but every order is still made in small batches with the same recipes we started with.",
      alignment: "left",
    }),
  },
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "FEATURES",
      heading: "Why customers keep ordering",
      subheading: "Small batches, real ingredients, honest prices.",
      items: [
        {
          icon: "🎂",
          title: "Made fresh daily",
          description: "Nothing sits longer than a day before it reaches you.",
        },
        {
          icon: "🚴🏾",
          title: "Same-day delivery",
          description: "Order before noon and get it delivered across Lagos same day.",
        },
        {
          icon: "🌾",
          title: "Local ingredients",
          description: "We source flour, eggs and fruit from Mile 12 market every week.",
        },
      ],
      columns: 3,
    }),
  },
  {
    settings: tinted,
    content: blockContentSchema.parse({
      type: "GALLERY",
      heading: "From the kitchen",
      columns: 3,
      images: [
        image("gallery-1", 800, 800, "Red velvet cake slice"),
        image("gallery-2", 800, 800, "Tray of chin chin"),
        image("gallery-3", 800, 800, "Chocolate birthday cake"),
        image("gallery-4", 800, 800, "Meat pies cooling on a rack"),
        image("gallery-5", 800, 800, "Cupcakes with buttercream"),
        image("gallery-6", 800, 800, "Small chops platter"),
      ],
    }),
  },
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "TESTIMONIALS",
      heading: "What people are saying",
      items: [
        {
          quote: "Ordered a last-minute birthday cake and it arrived in under 3 hours. Tasted even better than it looked.",
          authorName: "Chioma A.",
          authorRole: "Lekki",
          rating: 5,
          avatar: image("avatar-1", 200, 200, "Chioma"),
        },
        {
          quote: "The chin chin is addictive. I now order a tub every month for the office.",
          authorName: "Tunde O.",
          authorRole: "Yaba",
          rating: 5,
          avatar: image("avatar-2", 200, 200, "Tunde"),
        },
        {
          quote: "Great communication on WhatsApp and the meat pies never disappoint.",
          authorName: "Ngozi E.",
          authorRole: "Surulere",
          rating: 4,
          avatar: image("avatar-3", 200, 200, "Ngozi"),
        },
      ],
    }),
  },
  {
    settings: tinted,
    content: blockContentSchema.parse({
      type: "PRICING",
      heading: "Cake sizes & pricing",
      subheading: "Prices in Naira. Custom sizes available on request.",
      tiers: [
        {
          name: "Small",
          price: "₦15,000",
          period: "serves 6–8",
          features: [
            { text: "Choice of 3 flavours", included: true },
            { text: "Standard buttercream finish", included: true },
            { text: "Free delivery within Lagos", included: false },
          ],
          ctaLabel: "Order small",
          ctaHref: "#contact",
        },
        {
          name: "Medium",
          price: "₦25,000",
          period: "serves 12–15",
          highlighted: true,
          features: [
            { text: "Choice of 6 flavours", included: true },
            { text: "Custom message & toppers", included: true },
            { text: "Free delivery within Lagos", included: true },
          ],
          ctaLabel: "Order medium",
          ctaHref: "#contact",
        },
        {
          name: "Large",
          price: "₦40,000",
          period: "serves 20–25",
          features: [
            { text: "Full flavour menu", included: true },
            { text: "Custom design consultation", included: true },
            { text: "Free delivery within Lagos", included: true },
          ],
          ctaLabel: "Order large",
          ctaHref: "#contact",
        },
      ],
    }),
  },
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "FAQ",
      heading: "Frequently asked questions",
      items: [
        {
          question: "How far in advance should I order?",
          answer: "For standard cakes, 2 days' notice is enough. For large or custom orders, we recommend a week.",
        },
        {
          question: "Do you deliver outside Lagos?",
          answer: "Not yet. For now we deliver across Lagos mainland and island only.",
        },
        {
          question: "Can I customize the flavours?",
          answer: "Yes, every tier lets you mix flavours at no extra cost.",
        },
      ],
    }),
  },
  {
    settings: blockSettingsSchema.parse({ paddingY: "sm" }),
    content: blockContentSchema.parse({ type: "SPACER", height: "lg" }),
  },
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "CTA",
      heading: "Ready to order your next cake?",
      subheading: "Message us on WhatsApp or fill the form below. We reply within the hour.",
      primaryCta: { label: "Chat on WhatsApp", href: "https://wa.me/2348012345678", external: true },
      secondaryCta: { label: "View our bakes", href: "#gallery" },
    }),
  },
  {
    settings: tinted,
    content: blockContentSchema.parse({
      type: "CONTACT_FORM",
      heading: "Get in touch",
      description: "Tell us what you need and we'll get back to you same day.",
      fields: { name: true, email: true, phone: true, message: true },
      customFields: [{ label: "Event date", type: "text" }],
      submitLabel: "Send message",
    }),
  },
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "VIDEO_EMBED",
      url: "https://youtu.be/dQw4w9WgXcQ",
      caption: "A peek inside our kitchen",
    }),
  },
  {
    settings: tinted,
    content: blockContentSchema.parse({
      type: "SOCIAL_LINKS",
      heading: "Follow along",
      links: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "facebook", url: "https://facebook.com" },
        { platform: "tiktok", url: "https://tiktok.com" },
        { platform: "whatsapp", url: "https://wa.me/2348012345678" },
      ],
    }),
  },
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "IMAGE",
      image: image("storefront", 1400, 700, "Sade's Kitchen storefront"),
      caption: "Our storefront on Herbert Macaulay Way",
    }),
  },
  {
    settings: blockSettingsSchema.parse({ backgroundColor: "#111827", textColor: "#ffffff" }),
    content: blockContentSchema.parse({
      type: "FOOTER",
      businessName: "Sade's Kitchen",
      tagline: "Small-batch bakes, delivered across Lagos.",
      links: [
        { label: "Home", href: "#" },
        { label: "Menu", href: "#gallery" },
        { label: "Contact", href: "#contact" },
      ],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "facebook", url: "https://facebook.com" },
        { platform: "whatsapp", url: "https://wa.me/2348012345678" },
      ],
      copyrightText: "© 2026 Sade's Kitchen. All rights reserved.",
    }),
  },
  {
    settings: plain,
    content: blockContentSchema.parse({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348012345678",
      prefilledMessage: "Hi Sade's Kitchen, I'd like to place an order",
      displayStyle: "floating",
      label: "Chat with us",
    }),
  },
];

export default function DemoPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        {blocks.map((block, i) => (
          <BlockRenderer key={i} content={block.content} settings={block.settings} />
        ))}
      </main>
    </ThemeProvider>
  );
}
