import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const productLaunchTemplate: Template = {
  id: "product-launch",
  name: "Product launch",
  description: "A focused, conversion-first landing page for launching a single product.",
  previewImageUrl: image("template-product", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Radiant skin, the natural way",
      subheadline: "Glow Naturals Shea Radiance Serum is handmade in Lagos with raw shea butter and vitamin E. Now available nationwide.",
      image: image("glow-hero", 1200, 900, "Skincare serum bottle on a clean background"),
      primaryCta: { label: "Order now", href: "#contact" },
      secondaryCta: { label: "See what's inside", href: "#features" },
      alignment: "left",
    }),
    block({
      type: "FEATURES",
      heading: "Why it works",
      subheading: "Three ingredients, no fillers, real results.",
      items: [
        { icon: "🌿", title: "Raw shea butter", description: "Sourced directly from women's cooperatives in northern Nigeria." },
        { icon: "✨", title: "Vitamin E", description: "Locks in moisture and helps even out skin tone over time." },
        { icon: "🚫", title: "No harsh chemicals", description: "No parabens, no sulfates, safe for daily use." },
      ],
      columns: 3,
    }, tinted),
    block({
      type: "VIDEO_EMBED",
      url: "https://youtu.be/dQw4w9WgXcQ",
      caption: "How we make every bottle, from shea to serum",
      aspectRatio: "16:9",
    }),
    block({
      type: "TESTIMONIALS",
      heading: "Early customers are loving it",
      items: [
        {
          quote: "My skin has never felt this soft. I noticed a difference in under two weeks.",
          authorName: "Temitope B.",
          rating: 5,
          avatar: image("glow-avatar-1", 200, 200, "Temitope"),
        },
        {
          quote: "Finally a Nigerian skincare brand that actually lists what's in the bottle. Repeat customer here.",
          authorName: "Zainab I.",
          rating: 5,
          avatar: image("glow-avatar-2", 200, 200, "Zainab"),
        },
        {
          quote: "Small bottle but it lasts. A little goes a long way.",
          authorName: "Grace E.",
          rating: 4,
          avatar: image("glow-avatar-3", 200, 200, "Grace"),
        },
      ],
    }),
    block({
      type: "PRICING",
      heading: "Get your bottle",
      subheading: "Launch pricing ends soon.",
      tiers: [
        {
          name: "Single bottle",
          price: "₦8,500",
          period: "30ml",
          features: [
            { text: "1x Radiance Serum", included: true },
            { text: "Free delivery in Lagos", included: false },
          ],
          ctaLabel: "Order now",
          ctaHref: "#contact",
        },
        {
          name: "3-pack bundle",
          price: "₦22,000",
          period: "save ₦3,500",
          highlighted: true,
          features: [
            { text: "3x Radiance Serum", included: true },
            { text: "Free delivery nationwide", included: true },
          ],
          ctaLabel: "Order now",
          ctaHref: "#contact",
        },
      ],
    }, tinted),
    block({
      type: "FAQ",
      heading: "Questions before you order",
      items: [
        { question: "How long does one bottle last?", answer: "With daily use, one 30ml bottle lasts about six to eight weeks." },
        { question: "Is it suitable for oily skin?", answer: "Yes, the formula absorbs quickly and doesn't leave a heavy residue." },
        { question: "Do you deliver outside Lagos?", answer: "Yes, we deliver nationwide via courier, typically within 3 to 5 days." },
      ],
    }),
    block({
      type: "CTA",
      heading: "Ready to try Glow Naturals?",
      subheading: "Launch pricing is only available for the first 500 bottles.",
      primaryCta: { label: "Order now", href: "#contact" },
    }),
    block({
      type: "CONTACT_FORM",
      heading: "Place your order",
      description: "Fill in your details and we'll confirm your order on WhatsApp.",
      fields: { name: true, email: false, phone: true, message: false },
      customFields: [{ label: "Delivery address", type: "textarea" }],
      submitLabel: "Order now",
      successMessage: "Thanks, we'll confirm your order on WhatsApp shortly.",
    }, tinted),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348056789012",
      prefilledMessage: "Hi Glow Naturals, I'd like to order the Radiance Serum",
      displayStyle: "floating",
      label: "Order on WhatsApp",
    }),
    block({
      type: "FOOTER",
      businessName: "Glow Naturals",
      tagline: "Handmade skincare, made in Lagos.",
      links: [{ label: "How it works", href: "#features" }, { label: "Order", href: "#contact" }],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "tiktok", url: "https://tiktok.com" },
      ],
      copyrightText: "© 2026 Glow Naturals. All rights reserved.",
    }),
  ],
};
