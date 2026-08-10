import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const makeupArtistTemplate: Template = {
  id: "makeup-artist",
  name: "Makeup artist",
  description: "A booking-focused site for a freelance makeup artist, built around a gallery of real looks.",
  previewImageUrl: image("template-makeup", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Makeup that photographs as good as it feels",
      subheadline: "Tioluwani Makeovers does bridal, editorial and everyday glam across Lagos, available for home and studio sessions.",
      image: image("tiolu-hero", 1200, 900, "Bride with finished bridal makeup look"),
      primaryCta: { label: "Book a session", href: "#contact" },
      secondaryCta: { label: "See my work", href: "#gallery" },
      alignment: "center",
    }),
    block({
      type: "FEATURES",
      heading: "Services",
      items: [
        { icon: "👰🏾", title: "Bridal makeup", description: "Trial session included, plus touch-up kit on the day." },
        { icon: "📸", title: "Editorial & photoshoot", description: "Bold, camera-ready looks for shoots and campaigns." },
        { icon: "💫", title: "Everyday glam", description: "Natural, long-lasting makeup for events and nights out." },
        { icon: "🎓", title: "Makeup classes", description: "One-on-one lessons for beginners and enthusiasts." },
      ],
      columns: 4,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "Recent looks",
      columns: 3,
      images: [
        image("tiolu-gallery-1", 800, 800, "Bridal makeup close-up"),
        image("tiolu-gallery-2", 800, 800, "Editorial makeup look"),
        image("tiolu-gallery-3", 800, 800, "Soft glam everyday makeup"),
        image("tiolu-gallery-4", 800, 800, "Bold red lip look"),
        image("tiolu-gallery-5", 800, 800, "Traditional wedding makeup"),
        image("tiolu-gallery-6", 800, 800, "Natural makeup finish"),
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "From my clients",
      items: [
        {
          quote: "My makeup lasted the entire wedding, through tears and all. Tioluwani is a true professional.",
          authorName: "Funmi & David",
          authorRole: "Wedding, 2025",
          rating: 5,
          avatar: image("tiolu-avatar-1", 200, 200, "Funmi"),
        },
        {
          quote: "Booked her for a shoot and she nailed the brief on the first try. Will book again.",
          authorName: "Amara O.",
          authorRole: "Content creator",
          rating: 5,
          avatar: image("tiolu-avatar-2", 200, 200, "Amara"),
        },
      ],
    }, tinted),
    block({
      type: "PRICING",
      heading: "Packages",
      subheading: "Travel fee applies outside Lekki and Ikoyi.",
      tiers: [
        {
          name: "Classic glam",
          price: "₦25,000",
          features: [
            { text: "Full face makeup", included: true },
            { text: "False lashes included", included: true },
            { text: "Touch-up kit", included: false },
          ],
          ctaLabel: "Book this",
          ctaHref: "#contact",
        },
        {
          name: "Bridal",
          price: "₦85,000",
          period: "bride only",
          highlighted: true,
          features: [
            { text: "Trial session included", included: true },
            { text: "Touch-up kit for the day", included: true },
            { text: "False lashes included", included: true },
          ],
          ctaLabel: "Book this",
          ctaHref: "#contact",
        },
        {
          name: "Bridal party",
          price: "₦55,000",
          period: "per person",
          features: [
            { text: "Full face makeup", included: true },
            { text: "Group discount from 4 people", included: true },
            { text: "On-location service", included: true },
          ],
          ctaLabel: "Enquire",
          ctaHref: "#contact",
        },
      ],
    }),
    block({
      type: "FAQ",
      heading: "Questions before you book",
      items: [
        { question: "Do you offer trial sessions?", answer: "Yes, included with every bridal package, or bookable separately for ₦15,000." },
        { question: "Do you travel outside Lagos?", answer: "Yes, with travel and accommodation covered for events outside Lagos state." },
        { question: "What products do you use?", answer: "A mix of professional, skin-safe brands suited to a range of skin tones." },
      ],
    }, tinted),
    block({
      type: "CONTACT_FORM",
      heading: "Book your session",
      description: "Tell me the date, service and location and I'll confirm availability.",
      fields: { name: true, email: false, phone: true, message: true },
      customFields: [{ label: "Event date", type: "text" }],
      submitLabel: "Request booking",
      successMessage: "Thanks, I'll confirm your booking on WhatsApp shortly.",
    }),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348078901234",
      prefilledMessage: "Hi Tioluwani, I'd like to book a makeup session",
      displayStyle: "floating",
      label: "Book on WhatsApp",
    }),
    block({
      type: "FOOTER",
      businessName: "Tioluwani Makeovers",
      tagline: "Bridal, editorial and everyday makeup across Lagos.",
      links: [{ label: "Gallery", href: "#gallery" }, { label: "Book now", href: "#contact" }],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "tiktok", url: "https://tiktok.com" },
      ],
      copyrightText: "© 2026 Tioluwani Makeovers. All rights reserved.",
    }),
  ],
};
