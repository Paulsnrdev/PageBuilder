import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const restaurantTemplate: Template = {
  id: "restaurant",
  name: "Restaurant",
  description: "A warm, appetite-driven site for a restaurant or eatery.",
  previewImageUrl: image("template-restaurant", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Authentic Nigerian dishes, made fresh daily",
      subheadline: "Mama Bisi's Kitchen serves home-style jollof, soups and grills from our Lekki kitchen, for dine-in, pickup or delivery.",
      image: image("mama-bisi-hero", 1200, 900, "Jollof rice and grilled chicken plated for serving"),
      primaryCta: { label: "View menu", href: "#menu" },
      secondaryCta: { label: "Book a table", href: "#contact" },
      alignment: "left",
    }),
    block({
      type: "FEATURES",
      heading: "Why people keep coming back",
      subheading: "Twelve years of cooking for Lekki, one plate at a time.",
      items: [
        { icon: "🍲", title: "Made fresh daily", description: "Every pot is cooked to order, nothing sits under a warmer." },
        { icon: "🛵", title: "Fast delivery", description: "Most orders reach you within 45 minutes across Lekki and Ajah." },
        { icon: "🌶️", title: "Real Nigerian flavour", description: "Recipes passed down from three generations of family cooking." },
      ],
      columns: 3,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "From our kitchen",
      columns: 3,
      images: [
        image("mb-gallery-1", 800, 800, "Bowl of assorted jollof rice"),
        image("mb-gallery-2", 800, 800, "Grilled suya skewers"),
        image("mb-gallery-3", 800, 800, "Pepper soup with fish"),
        image("mb-gallery-4", 800, 800, "Fried plantain and stew"),
        image("mb-gallery-5", 800, 800, "Egusi soup with pounded yam"),
        image("mb-gallery-6", 800, 800, "Chin chin in a bowl"),
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "What our customers say",
      items: [
        {
          quote: "Best jollof I've had since I left my grandmother's house. I order every Friday without fail.",
          authorName: "Folake A.",
          authorRole: "Lekki Phase 1",
          rating: 5,
          avatar: image("mb-avatar-1", 200, 200, "Folake"),
        },
        {
          quote: "Delivery is always on time and the food is still hot when it arrives. Rare in this economy.",
          authorName: "Emeka O.",
          authorRole: "Ajah",
          rating: 5,
          avatar: image("mb-avatar-2", 200, 200, "Emeka"),
        },
        {
          quote: "We used them for a 40-guest office lunch and everyone asked where the food was from.",
          authorName: "Aisha M.",
          authorRole: "Victoria Island",
          rating: 4,
          avatar: image("mb-avatar-3", 200, 200, "Aisha"),
        },
      ],
    }, tinted),
    block({
      type: "PRICING",
      heading: "Set menus for groups and events",
      subheading: "Feeding a party or an office lunch? These packages serve everyone without the guesswork.",
      tiers: [
        {
          name: "Small gathering",
          price: "₦45,000",
          period: "serves 10–12",
          features: [
            { text: "Choice of 2 proteins", included: true },
            { text: "Jollof and fried rice", included: true },
            { text: "Delivery within Lekki", included: false },
          ],
          ctaLabel: "Order this package",
          ctaHref: "#contact",
        },
        {
          name: "Office lunch",
          price: "₦110,000",
          period: "serves 25–30",
          highlighted: true,
          features: [
            { text: "Choice of 3 proteins", included: true },
            { text: "Rice, salad and swallow", included: true },
            { text: "Free delivery within Lagos", included: true },
          ],
          ctaLabel: "Order this package",
          ctaHref: "#contact",
        },
        {
          name: "Full event",
          price: "From ₦250,000",
          period: "serves 60+",
          features: [
            { text: "Full menu, chef's choice", included: true },
            { text: "On-site serving staff", included: true },
            { text: "Free delivery and setup", included: true },
          ],
          ctaLabel: "Request a quote",
          ctaHref: "#contact",
        },
      ],
    }),
    block({
      type: "FAQ",
      heading: "Good to know",
      items: [
        { question: "What are your opening hours?", answer: "We're open Tuesday to Sunday, 10am to 9pm. Closed on Mondays." },
        { question: "Do you deliver outside Lekki?", answer: "Yes, we deliver across Lagos mainland and island. Delivery fees vary by distance." },
        { question: "Can I customize a set menu?", answer: "Yes, message us on WhatsApp and we'll adjust proteins and sides to fit your group." },
      ],
    }, tinted),
    block({
      type: "CONTACT_FORM",
      heading: "Book a table or place an order",
      description: "Tell us what you need and we'll confirm within the hour.",
      fields: { name: true, email: true, phone: true, message: true },
      customFields: [{ label: "Preferred date", type: "text" }],
      submitLabel: "Send request",
      successMessage: "Thanks, we've got your request and will confirm shortly.",
    }),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348023456789",
      prefilledMessage: "Hi Mama Bisi's Kitchen, I'd like to place an order",
      displayStyle: "floating",
      label: "Order on WhatsApp",
    }),
    block({
      type: "FOOTER",
      businessName: "Mama Bisi's Kitchen",
      tagline: "Home-style Nigerian food, delivered across Lagos.",
      links: [
        { label: "Menu", href: "#menu" },
        { label: "Book a table", href: "#contact" },
      ],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "whatsapp", url: "https://wa.me/2348023456789" },
      ],
      copyrightText: "© 2026 Mama Bisi's Kitchen. All rights reserved.",
    }),
  ],
};
