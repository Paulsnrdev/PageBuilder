import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const salonTemplate: Template = {
  id: "salon",
  name: "Salon",
  description: "A polished booking-focused site for a hair or beauty salon.",
  previewImageUrl: image("template-salon", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Look and feel your best",
      subheadline: "Bella Hair & Beauty Studio offers hair, makeup and skincare services in the heart of Ikeja, by appointment.",
      image: image("bella-hero", 1200, 900, "Stylist finishing a client's hairstyle in a salon chair"),
      primaryCta: { label: "Book an appointment", href: "#contact" },
      secondaryCta: { label: "See our work", href: "#gallery" },
      alignment: "center",
    }),
    block({
      type: "FEATURES",
      heading: "Our services",
      subheading: "Everything you need for a full glow-up, under one roof.",
      items: [
        { icon: "💇🏾‍♀️", title: "Hair styling", description: "Braids, weaves, silk press and natural hair care." },
        { icon: "💄", title: "Makeup", description: "Everyday looks, bridal makeup and photoshoot glam." },
        { icon: "💅", title: "Nails", description: "Manicures, pedicures and gel extensions." },
        { icon: "🧖🏾‍♀️", title: "Skincare", description: "Facials and treatments tailored to your skin type." },
      ],
      columns: 4,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "Recent work",
      columns: 3,
      images: [
        image("bella-gallery-1", 800, 800, "Braided hairstyle"),
        image("bella-gallery-2", 800, 800, "Bridal makeup look"),
        image("bella-gallery-3", 800, 800, "Gel nail set"),
        image("bella-gallery-4", 800, 800, "Silk press hairstyle"),
        image("bella-gallery-5", 800, 800, "Natural hair twist out"),
        image("bella-gallery-6", 800, 800, "Client after a facial treatment"),
      ],
    }),
    block({
      type: "PRICING",
      heading: "Price list",
      subheading: "Prices in Naira. Ask about packages for bridal parties.",
      tiers: [
        {
          name: "Hair",
          price: "From ₦8,000",
          features: [
            { text: "Wash and blow dry", included: true },
            { text: "Braiding styles", included: true },
            { text: "Silk press", included: true },
          ],
          ctaLabel: "Book hair",
          ctaHref: "#contact",
        },
        {
          name: "Makeup",
          price: "From ₦20,000",
          highlighted: true,
          features: [
            { text: "Everyday makeup", included: true },
            { text: "Bridal trial included", included: true },
            { text: "Lashes included", included: true },
          ],
          ctaLabel: "Book makeup",
          ctaHref: "#contact",
        },
        {
          name: "Nails",
          price: "From ₦6,000",
          features: [
            { text: "Manicure and pedicure", included: true },
            { text: "Gel extensions", included: true },
            { text: "Nail art", included: false },
          ],
          ctaLabel: "Book nails",
          ctaHref: "#contact",
        },
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "What clients say",
      items: [
        {
          quote: "My braids lasted six weeks and still looked neat on day one. Booking again for sure.",
          authorName: "Chiamaka N.",
          authorRole: "Ikeja",
          rating: 5,
          avatar: image("bella-avatar-1", 200, 200, "Chiamaka"),
        },
        {
          quote: "Did my makeup for my traditional wedding and I looked exactly how I imagined. Thank you!",
          authorName: "Blessing U.",
          authorRole: "Magodo",
          rating: 5,
          avatar: image("bella-avatar-2", 200, 200, "Blessing"),
        },
      ],
    }, tinted),
    block({
      type: "FAQ",
      heading: "Before you book",
      items: [
        { question: "Do you accept walk-ins?", answer: "We prioritize appointments, but walk-ins are welcome if a slot is open." },
        { question: "How do I book?", answer: "Message us on WhatsApp or fill the form below with your preferred date and service." },
        { question: "What products do you use?", answer: "We use professional-grade products suited to natural and relaxed hair types." },
      ],
    }),
    block({
      type: "CONTACT_FORM",
      heading: "Book your appointment",
      description: "Let us know what service you'd like and your preferred date.",
      fields: { name: true, email: false, phone: true, message: true },
      customFields: [],
      submitLabel: "Request booking",
      successMessage: "Thanks, we'll confirm your appointment on WhatsApp shortly.",
    }, tinted),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348034567890",
      prefilledMessage: "Hi Bella Hair & Beauty Studio, I'd like to book an appointment",
      displayStyle: "floating",
      label: "Book on WhatsApp",
    }),
    block({
      type: "FOOTER",
      businessName: "Bella Hair & Beauty Studio",
      tagline: "Hair, makeup and skincare in Ikeja.",
      links: [
        { label: "Services", href: "#" },
        { label: "Gallery", href: "#gallery" },
        { label: "Book now", href: "#contact" },
      ],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "tiktok", url: "https://tiktok.com" },
      ],
      copyrightText: "© 2026 Bella Hair & Beauty Studio. All rights reserved.",
    }),
  ],
};
