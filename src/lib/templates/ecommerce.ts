import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const ecommerceTemplate: Template = {
  id: "ecommerce",
  name: "Online store",
  description: "A shop-front landing page for an online store, built to take orders by WhatsApp or form.",
  previewImageUrl: image("template-ecommerce", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Everyday fashion, delivered to your door",
      subheadline: "Naija Finds curates affordable clothing, bags and accessories, shipped anywhere in Nigeria in 2 to 4 days.",
      image: image("naija-finds-hero", 1200, 900, "Model wearing a curated outfit from the store"),
      primaryCta: { label: "Shop new arrivals", href: "#gallery" },
      secondaryCta: { label: "Chat on WhatsApp", href: "https://wa.me/2348067890123", external: true },
      alignment: "left",
    }),
    block({
      type: "FEATURES",
      heading: "Why shop with us",
      subheading: "Over 5,000 orders delivered since 2021.",
      items: [
        { icon: "🚚", title: "Nationwide delivery", description: "2 to 4 days in Lagos, 5 to 7 days elsewhere in Nigeria." },
        { icon: "🔒", title: "Pay on delivery available", description: "Pay online or on delivery in select cities." },
        { icon: "↩️", title: "Easy returns", description: "Wrong size or not what you expected? Return within 3 days." },
        { icon: "✅", title: "Authentic products", description: "Every item is sourced and quality-checked before listing." },
      ],
      columns: 4,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "Shop our latest",
      columns: 4,
      images: [
        image("naija-finds-1", 700, 700, "Ankara print dress"),
        image("naija-finds-2", 700, 700, "Leather handbag"),
        image("naija-finds-3", 700, 700, "Sneakers on display"),
        image("naija-finds-4", 700, 700, "Sunglasses and accessories"),
        image("naija-finds-5", 700, 700, "Denim jacket"),
        image("naija-finds-6", 700, 700, "Beaded jewellery set"),
        image("naija-finds-7", 700, 700, "Casual outfit flatlay"),
        image("naija-finds-8", 700, 700, "Tote bag"),
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "What customers are saying",
      items: [
        {
          quote: "Ordered a bag on Monday, had it by Wednesday. Quality was even better than the photos.",
          authorName: "Damilola A.",
          authorRole: "Verified buyer",
          rating: 5,
          avatar: image("naija-finds-avatar-1", 200, 200, "Damilola"),
        },
        {
          quote: "My go-to for affordable ankara pieces. Sizing chart was accurate too.",
          authorName: "Precious O.",
          authorRole: "Verified buyer",
          rating: 5,
          avatar: image("naija-finds-avatar-2", 200, 200, "Precious"),
        },
        {
          quote: "Returned a pair of shoes that didn't fit and got a refund within a week, no wahala.",
          authorName: "Ifeanyi C.",
          authorRole: "Verified buyer",
          rating: 4,
          avatar: image("naija-finds-avatar-3", 200, 200, "Ifeanyi"),
        },
      ],
    }, tinted),
    block({
      type: "FAQ",
      heading: "Before you order",
      items: [
        { question: "How long does delivery take?", answer: "2 to 4 days within Lagos, 5 to 7 days for other states." },
        { question: "Can I pay on delivery?", answer: "Yes, in Lagos, Abuja and Port Harcourt. Other locations require prepayment." },
        { question: "What's your return policy?", answer: "Returns are accepted within 3 days of delivery if the item is unused and in original packaging." },
      ],
    }),
    block({
      type: "CTA",
      heading: "Found something you like?",
      subheading: "Message us the item name on WhatsApp and we'll confirm price and delivery time.",
      primaryCta: { label: "Order on WhatsApp", href: "https://wa.me/2348067890123", external: true },
    }),
    block({
      type: "CONTACT_FORM",
      heading: "Or place your order here",
      description: "Tell us what you'd like to order and we'll confirm availability.",
      fields: { name: true, email: false, phone: true, message: true },
      customFields: [{ label: "Delivery address", type: "textarea" }],
      submitLabel: "Send order",
      successMessage: "Thanks, we'll confirm your order on WhatsApp shortly.",
    }, tinted),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348067890123",
      prefilledMessage: "Hi Naija Finds, I'd like to order an item",
      displayStyle: "floating",
      label: "Chat with us",
    }),
    block({
      type: "SOCIAL_LINKS",
      heading: "Follow for new drops",
      links: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "tiktok", url: "https://tiktok.com" },
        { platform: "whatsapp", url: "https://wa.me/2348067890123" },
      ],
    }),
    block({
      type: "FOOTER",
      businessName: "Naija Finds",
      tagline: "Everyday fashion, shipped nationwide.",
      links: [{ label: "Shop", href: "#gallery" }, { label: "Order", href: "#contact" }],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "tiktok", url: "https://tiktok.com" },
      ],
      copyrightText: "© 2026 Naija Finds. All rights reserved.",
    }),
  ],
};
