import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const consultantTemplate: Template = {
  id: "consultant",
  name: "Consultant",
  description: "A credibility-first site for a consultant or independent advisor.",
  previewImageUrl: image("template-consultant", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Strategic advice for growing Nigerian businesses",
      subheadline: "Adaeze Consulting helps small and mid-size businesses fix their finances, sharpen their strategy and get investor-ready.",
      image: image("adaeze-hero", 1200, 900, "Consultant reviewing a business plan with a client"),
      primaryCta: { label: "Book a free call", href: "#contact" },
      alignment: "left",
    }),
    block({
      type: "FEATURES",
      heading: "How I help",
      subheading: "Practical, hands-on advice, not generic slide decks.",
      items: [
        { icon: "📊", title: "Business strategy", description: "Clarify your growth plan and the numbers behind it." },
        { icon: "💰", title: "Financial advisory", description: "Cash flow, pricing and fundraising readiness." },
        { icon: "🎯", title: "Operations review", description: "Find where time and money are leaking, and fix it." },
      ],
      columns: 3,
    }, tinted),
    block({
      type: "TEXT",
      heading: "About Adaeze",
      body: "I've spent over a decade working with founders across Lagos and Abuja, from early-stage startups to established family businesses.\n\nMy approach is simple: understand the business deeply, then give advice you can actually act on this quarter, not next year.",
      alignment: "left",
    }),
    block({
      type: "TESTIMONIALS",
      heading: "Client results",
      items: [
        {
          quote: "Adaeze restructured our pricing in one session and we saw the difference in the next month's revenue.",
          authorName: "Tobi F.",
          authorRole: "Founder, logistics startup",
          rating: 5,
          avatar: image("adaeze-avatar-1", 200, 200, "Tobi"),
        },
        {
          quote: "She helped us prepare for our first investor meeting. We closed the round three months later.",
          authorName: "Ijeoma K.",
          authorRole: "Co-founder, retail brand",
          rating: 5,
          avatar: image("adaeze-avatar-2", 200, 200, "Ijeoma"),
        },
      ],
    }),
    block({
      type: "PRICING",
      heading: "Ways to work together",
      subheading: "Every engagement starts with a free discovery call.",
      tiers: [
        {
          name: "Strategy session",
          price: "₦75,000",
          period: "single session",
          features: [
            { text: "90-minute deep dive", included: true },
            { text: "Written action plan", included: true },
            { text: "Follow-up support", included: false },
          ],
          ctaLabel: "Book this",
          ctaHref: "#contact",
        },
        {
          name: "Monthly advisory",
          price: "₦350,000",
          period: "per month",
          highlighted: true,
          features: [
            { text: "Two sessions a month", included: true },
            { text: "Unlimited WhatsApp support", included: true },
            { text: "Quarterly financial review", included: true },
          ],
          ctaLabel: "Book this",
          ctaHref: "#contact",
        },
        {
          name: "Investor readiness",
          price: "From ₦900,000",
          period: "project-based",
          features: [
            { text: "Full financial model", included: true },
            { text: "Pitch deck review", included: true },
            { text: "Investor introductions", included: true },
          ],
          ctaLabel: "Enquire",
          ctaHref: "#contact",
        },
      ],
    }, tinted),
    block({
      type: "FAQ",
      heading: "Common questions",
      items: [
        { question: "How do sessions work?", answer: "Sessions run over video call, with a written summary and action items after each one." },
        { question: "Do you work with early-stage startups?", answer: "Yes, alongside more established businesses. Pricing is adjusted for stage." },
        { question: "What industries do you cover?", answer: "Mostly retail, logistics and services, but the frameworks apply broadly." },
      ],
    }),
    block({
      type: "CTA",
      heading: "Ready to fix what's not working?",
      subheading: "Book a free 20-minute call and leave with at least one concrete next step.",
      primaryCta: { label: "Book a free call", href: "#contact" },
    }),
    block({
      type: "CONTACT_FORM",
      heading: "Get in touch",
      description: "Tell me a bit about your business and what you're looking for.",
      fields: { name: true, email: true, phone: true, message: true },
      customFields: [],
      submitLabel: "Send message",
      successMessage: "Thanks, I'll reply within a business day.",
    }, tinted),
    block({
      type: "SOCIAL_LINKS",
      heading: "Connect",
      links: [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "twitter", url: "https://twitter.com" },
      ],
    }),
    block({
      type: "FOOTER",
      businessName: "Adaeze Consulting",
      tagline: "Strategy and financial advisory for growing businesses.",
      links: [{ label: "About", href: "#" }, { label: "Contact", href: "#contact" }],
      socialLinks: [{ platform: "linkedin", url: "https://linkedin.com" }],
      copyrightText: "© 2026 Adaeze Consulting. All rights reserved.",
    }),
  ],
};
