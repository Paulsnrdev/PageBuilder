import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const realEstateTemplate: Template = {
  id: "real-estate",
  name: "Real estate agent",
  description: "A trust-building site for a real estate agent or property agency.",
  previewImageUrl: image("template-realestate", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Find your next home in Lagos, without the stress",
      subheadline: "Lagos Homes Realty helps you buy, rent or manage property across Lekki, Ikoyi and the mainland.",
      image: image("lagoshomes-hero", 1200, 900, "Modern residential building exterior"),
      primaryCta: { label: "View listings", href: "#gallery" },
      secondaryCta: { label: "Talk to an agent", href: "#contact" },
      alignment: "left",
    }),
    block({
      type: "FEATURES",
      heading: "How we help",
      items: [
        { icon: "🏠", title: "Buy or rent", description: "Verified listings across Lagos, with transparent pricing." },
        { icon: "🔑", title: "Property management", description: "Full management for landlords, from tenants to maintenance." },
        { icon: "📄", title: "Documentation support", description: "We help verify titles and handle the paperwork." },
      ],
      columns: 3,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "Featured listings",
      columns: 3,
      images: [
        image("lagoshomes-gallery-1", 800, 800, "Modern duplex exterior"),
        image("lagoshomes-gallery-2", 800, 800, "Spacious living room"),
        image("lagoshomes-gallery-3", 800, 800, "Fitted kitchen"),
        image("lagoshomes-gallery-4", 800, 800, "Apartment balcony view"),
        image("lagoshomes-gallery-5", 800, 800, "Master bedroom"),
        image("lagoshomes-gallery-6", 800, 800, "Gated compound entrance"),
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "What clients say",
      items: [
        {
          quote: "Found us a 3-bedroom in Lekki within two weeks, and the agent handled every bit of paperwork.",
          authorName: "Wale & Tomi",
          authorRole: "Bought a home, 2025",
          rating: 5,
          avatar: image("lagoshomes-avatar-1", 200, 200, "Wale and Tomi"),
        },
        {
          quote: "As a landlord based abroad, having them manage the property has been worth every naira.",
          authorName: "Dr. Ngozi E.",
          authorRole: "Property owner",
          rating: 5,
          avatar: image("lagoshomes-avatar-2", 200, 200, "Ngozi"),
        },
      ],
    }, tinted),
    block({
      type: "FAQ",
      heading: "Common questions",
      items: [
        { question: "Do you charge a fee to view properties?", answer: "No, viewings are free. We charge an agency fee only when a deal closes." },
        { question: "Can you verify a property's title?", answer: "Yes, we run title checks before any purchase to confirm the property is genuine." },
        { question: "Do you manage properties for landlords abroad?", answer: "Yes, we offer full property management including rent collection and maintenance." },
      ],
    }),
    block({
      type: "CONTACT_FORM",
      heading: "Tell us what you're looking for",
      description: "Share your budget and preferred area and we'll send matching listings.",
      fields: { name: true, email: true, phone: true, message: true },
      customFields: [
        { label: "Preferred area", type: "text" },
        { label: "Budget", type: "text" },
      ],
      submitLabel: "Send enquiry",
      successMessage: "Thanks, an agent will reach out within 24 hours.",
    }, tinted),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348090123456",
      prefilledMessage: "Hi Lagos Homes Realty, I'm looking for a property",
      displayStyle: "floating",
      label: "Chat with an agent",
    }),
    block({
      type: "SOCIAL_LINKS",
      heading: "Connect with us",
      links: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "linkedin", url: "https://linkedin.com" },
      ],
    }),
    block({
      type: "FOOTER",
      businessName: "Lagos Homes Realty",
      tagline: "Buy, rent and manage property across Lagos.",
      links: [{ label: "Listings", href: "#gallery" }, { label: "Contact", href: "#contact" }],
      socialLinks: [{ platform: "instagram", url: "https://instagram.com" }],
      copyrightText: "© 2026 Lagos Homes Realty. All rights reserved.",
    }),
  ],
};
