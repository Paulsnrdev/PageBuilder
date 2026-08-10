import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const fitnessTemplate: Template = {
  id: "fitness",
  name: "Fitness coach",
  description: "A results-focused site for a gym, personal trainer or fitness coach.",
  previewImageUrl: image("template-fitness", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Real results, no gimmicks",
      subheadline: "IronCore Fitness offers personal training, group classes and nutrition coaching at our Yaba gym or online.",
      image: image("ironcore-hero", 1200, 900, "Personal trainer coaching a client through a workout"),
      primaryCta: { label: "Start your free trial", href: "#contact" },
      secondaryCta: { label: "See our plans", href: "#pricing" },
      alignment: "left",
    }),
    block({
      type: "FEATURES",
      heading: "What we offer",
      items: [
        { icon: "🏋🏾", title: "Personal training", description: "One-on-one sessions built around your goals." },
        { icon: "👥", title: "Group classes", description: "HIIT, strength and circuit classes, morning and evening." },
        { icon: "🥗", title: "Nutrition coaching", description: "Meal plans that work with a Nigerian kitchen, not against it." },
      ],
      columns: 3,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "Inside the gym",
      columns: 3,
      images: [
        image("ironcore-gallery-1", 800, 800, "Gym floor with weights"),
        image("ironcore-gallery-2", 800, 800, "Group fitness class"),
        image("ironcore-gallery-3", 800, 800, "Client mid-workout with trainer"),
        image("ironcore-gallery-4", 800, 800, "Cardio equipment area"),
        image("ironcore-gallery-5", 800, 800, "Free weights section"),
        image("ironcore-gallery-6", 800, 800, "Client celebrating a personal best"),
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "Transformations",
      items: [
        {
          quote: "Lost 12kg in 4 months without starving myself. The nutrition plan actually fit my lifestyle.",
          authorName: "Segun A.",
          authorRole: "Member since 2024",
          rating: 5,
          avatar: image("ironcore-avatar-1", 200, 200, "Segun"),
        },
        {
          quote: "First gym where the trainers actually correct your form instead of just counting reps.",
          authorName: "Chiamaka U.",
          authorRole: "Member since 2023",
          rating: 5,
          avatar: image("ironcore-avatar-2", 200, 200, "Chiamaka"),
        },
      ],
    }, tinted),
    block({
      type: "PRICING",
      heading: "Membership plans",
      subheading: "No long-term contracts. Cancel anytime.",
      tiers: [
        {
          name: "Group classes",
          price: "₦20,000",
          period: "per month",
          features: [
            { text: "Unlimited group classes", included: true },
            { text: "Personal training", included: false },
            { text: "Nutrition plan", included: false },
          ],
          ctaLabel: "Start free trial",
          ctaHref: "#contact",
        },
        {
          name: "Full access",
          price: "₦45,000",
          period: "per month",
          highlighted: true,
          features: [
            { text: "Unlimited group classes", included: true },
            { text: "4 personal training sessions", included: true },
            { text: "Nutrition plan", included: true },
          ],
          ctaLabel: "Start free trial",
          ctaHref: "#contact",
        },
        {
          name: "1-on-1 coaching",
          price: "₦120,000",
          period: "per month",
          features: [
            { text: "Unlimited personal training", included: true },
            { text: "Custom nutrition plan", included: true },
            { text: "Weekly progress check-ins", included: true },
          ],
          ctaLabel: "Enquire",
          ctaHref: "#contact",
        },
      ],
    }),
    block({
      type: "FAQ",
      heading: "Common questions",
      items: [
        { question: "Do I need experience to join?", answer: "No, we coach all levels, from first-timers to competitive athletes." },
        { question: "Can I train online?", answer: "Yes, we offer virtual personal training for members outside Lagos." },
        { question: "Is there a joining fee?", answer: "No joining fee, just your monthly plan." },
      ],
    }),
    block({
      type: "CTA",
      heading: "Your first session is on us",
      subheading: "Try a class or a personal training session free, no commitment.",
      primaryCta: { label: "Claim your free session", href: "#contact" },
    }),
    block({
      type: "CONTACT_FORM",
      heading: "Get started",
      description: "Tell us your goals and we'll recommend the right plan.",
      fields: { name: true, email: true, phone: true, message: true },
      customFields: [],
      submitLabel: "Send message",
      successMessage: "Thanks, a coach will reach out within a day.",
    }, tinted),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348089012345",
      prefilledMessage: "Hi IronCore Fitness, I'd like to claim my free session",
      displayStyle: "floating",
      label: "Chat with a coach",
    }),
    block({
      type: "FOOTER",
      businessName: "IronCore Fitness",
      tagline: "Personal training, classes and nutrition coaching in Yaba.",
      links: [{ label: "Plans", href: "#pricing" }, { label: "Get started", href: "#contact" }],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "youtube", url: "https://youtube.com" },
      ],
      copyrightText: "© 2026 IronCore Fitness. All rights reserved.",
    }),
  ],
};
