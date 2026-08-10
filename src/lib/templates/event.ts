import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const eventTemplate: Template = {
  id: "event",
  name: "Event planner",
  description: "A visual, gallery-led site for an event planning or décor business.",
  previewImageUrl: image("template-event", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Unforgettable events, perfectly planned",
      subheadline: "Golden Moments Events plans weddings, birthdays and corporate events across Lagos, from concept to clean-up.",
      image: image("golden-hero", 1200, 900, "Elegantly decorated wedding reception hall"),
      primaryCta: { label: "Get a quote", href: "#contact" },
      secondaryCta: { label: "See our events", href: "#gallery" },
      alignment: "center",
    }),
    block({
      type: "FEATURES",
      heading: "What we plan",
      items: [
        { icon: "💍", title: "Weddings", description: "From traditional ceremonies to white weddings, fully coordinated." },
        { icon: "🎂", title: "Birthdays", description: "Milestone birthdays and children's parties, themed to fit." },
        { icon: "🏢", title: "Corporate events", description: "Conferences, launches and staff parties that run on time." },
      ],
      columns: 3,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "Recent events",
      columns: 3,
      images: [
        image("golden-gallery-1", 800, 800, "Wedding aisle decorated with flowers"),
        image("golden-gallery-2", 800, 800, "Birthday party table setting"),
        image("golden-gallery-3", 800, 800, "Corporate event stage setup"),
        image("golden-gallery-4", 800, 800, "Reception hall lighting"),
        image("golden-gallery-5", 800, 800, "Outdoor event tent setup"),
        image("golden-gallery-6", 800, 800, "Floral centerpiece on a table"),
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "From our clients",
      items: [
        {
          quote: "They handled every vendor for our wedding and it went off without a single hiccup.",
          authorName: "Yemi & Kunle",
          authorRole: "Wedding, 2025",
          rating: 5,
          avatar: image("golden-avatar-1", 200, 200, "Yemi and Kunle"),
        },
        {
          quote: "Our product launch looked like it cost twice what we paid. Great eye for detail.",
          authorName: "Ronke A.",
          authorRole: "Marketing Lead, tech startup",
          rating: 5,
          avatar: image("golden-avatar-2", 200, 200, "Ronke"),
        },
      ],
    }, tinted),
    block({
      type: "PRICING",
      heading: "Packages",
      subheading: "Every package includes a dedicated event coordinator.",
      tiers: [
        {
          name: "Essential",
          price: "₦500,000",
          period: "up to 100 guests",
          features: [
            { text: "Venue sourcing", included: true },
            { text: "Décor and setup", included: true },
            { text: "Day-of coordination", included: true },
          ],
          ctaLabel: "Enquire",
          ctaHref: "#contact",
        },
        {
          name: "Premium",
          price: "₦1,200,000",
          period: "up to 300 guests",
          highlighted: true,
          features: [
            { text: "Everything in Essential", included: true },
            { text: "Vendor management", included: true },
            { text: "Custom theming", included: true },
          ],
          ctaLabel: "Enquire",
          ctaHref: "#contact",
        },
        {
          name: "Luxury",
          price: "From ₦3,000,000",
          period: "300+ guests",
          features: [
            { text: "Everything in Premium", included: true },
            { text: "Multi-day coordination", included: true },
            { text: "Dedicated on-site team", included: true },
          ],
          ctaLabel: "Enquire",
          ctaHref: "#contact",
        },
      ],
    }),
    block({
      type: "FAQ",
      heading: "Planning questions",
      items: [
        { question: "How far in advance should we book?", answer: "Ideally 3 to 6 months for weddings, 4 to 6 weeks for smaller events." },
        { question: "Do you work outside Lagos?", answer: "Yes, with a travel fee for events outside Lagos state." },
        { question: "Can you work with our own vendors?", answer: "Yes, we can coordinate vendors you've already booked." },
      ],
    }, tinted),
    block({
      type: "CONTACT_FORM",
      heading: "Tell us about your event",
      description: "Share a few details and we'll get back to you with a quote.",
      fields: { name: true, email: true, phone: true, message: true },
      customFields: [
        { label: "Event date", type: "text" },
        { label: "Estimated guests", type: "text" },
      ],
      submitLabel: "Request a quote",
      successMessage: "Thanks, we'll send your quote within 48 hours.",
    }),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348045678901",
      prefilledMessage: "Hi Golden Moments Events, I'd like a quote for an event",
      displayStyle: "floating",
      label: "Chat with us",
    }),
    block({
      type: "FOOTER",
      businessName: "Golden Moments Events",
      tagline: "Weddings, birthdays and corporate events across Lagos.",
      links: [{ label: "Gallery", href: "#gallery" }, { label: "Get a quote", href: "#contact" }],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "whatsapp", url: "https://wa.me/2348045678901" },
      ],
      copyrightText: "© 2026 Golden Moments Events. All rights reserved.",
    }),
  ],
};
