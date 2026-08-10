import { block, image, tinted } from "@/lib/templates/helpers";
import type { Template } from "@/lib/templates/types";

export const fashionDesignerTemplate: Template = {
  id: "fashion-designer",
  name: "Fashion designer",
  description: "A portfolio-led site for a bespoke fashion designer or tailor.",
  previewImageUrl: image("template-fashion", 800, 600).url,
  blocks: [
    block({
      type: "HERO",
      headline: "Bespoke fashion, cut to fit you",
      subheadline: "Ade Couture designs and tailors custom outfits for weddings, corporate wear and traditional events, from our Surulere atelier.",
      image: image("ade-couture-hero", 1200, 900, "Tailor fitting a custom-made outfit on a client"),
      primaryCta: { label: "Book a fitting", href: "#contact" },
      secondaryCta: { label: "See our designs", href: "#gallery" },
      alignment: "left",
    }),
    block({
      type: "FEATURES",
      heading: "What we make",
      items: [
        { icon: "🤵🏾", title: "Bespoke suits", description: "Fully custom suits, from fabric selection to final fitting." },
        { icon: "👗", title: "Traditional wear", description: "Aso-oke, agbada and asoebi, tailored for weddings and owambe." },
        { icon: "✂️", title: "Alterations", description: "Resizing and repairs for outfits you already own." },
      ],
      columns: 3,
    }, tinted),
    block({
      type: "GALLERY",
      heading: "Our designs",
      columns: 3,
      images: [
        image("ade-couture-gallery-1", 800, 800, "Custom-made suit on a mannequin"),
        image("ade-couture-gallery-2", 800, 800, "Traditional agbada outfit"),
        image("ade-couture-gallery-3", 800, 800, "Asoebi dress"),
        image("ade-couture-gallery-4", 800, 800, "Fabric selection in the atelier"),
        image("ade-couture-gallery-5", 800, 800, "Fitting session in progress"),
        image("ade-couture-gallery-6", 800, 800, "Finished wedding outfit"),
      ],
    }),
    block({
      type: "TESTIMONIALS",
      heading: "What clients say",
      items: [
        {
          quote: "My wedding aso-oke was exactly what I pictured, and it fit perfectly on the first try.",
          authorName: "Bukola A.",
          authorRole: "Bride, 2025",
          rating: 5,
          avatar: image("ade-couture-avatar-1", 200, 200, "Bukola"),
        },
        {
          quote: "I've had three suits made here and the finishing is always sharp. Worth the wait.",
          authorName: "Chuka N.",
          authorRole: "Repeat client",
          rating: 5,
          avatar: image("ade-couture-avatar-2", 200, 200, "Chuka"),
        },
      ],
    }, tinted),
    block({
      type: "PRICING",
      heading: "Starting prices",
      subheading: "Final price depends on fabric and design complexity.",
      tiers: [
        {
          name: "Alterations",
          price: "From ₦5,000",
          features: [
            { text: "Resizing", included: true },
            { text: "Repairs", included: true },
            { text: "Same-week turnaround", included: false },
          ],
          ctaLabel: "Book this",
          ctaHref: "#contact",
        },
        {
          name: "Traditional wear",
          price: "From ₦35,000",
          highlighted: true,
          features: [
            { text: "Custom pattern", included: true },
            { text: "Two fittings included", included: true },
            { text: "Fabric sourcing available", included: true },
          ],
          ctaLabel: "Book this",
          ctaHref: "#contact",
        },
        {
          name: "Bespoke suit",
          price: "From ₦80,000",
          features: [
            { text: "Fully custom pattern", included: true },
            { text: "Three fittings included", included: true },
            { text: "Premium fabric options", included: true },
          ],
          ctaLabel: "Book this",
          ctaHref: "#contact",
        },
      ],
    }),
    block({
      type: "FAQ",
      heading: "Before you book",
      items: [
        { question: "How long does an order take?", answer: "2 to 3 weeks for most orders, depending on complexity and current bookings." },
        { question: "Can you source the fabric for me?", answer: "Yes, or you're welcome to bring your own fabric to the fitting." },
        { question: "How many fittings are included?", answer: "Two to three fittings depending on the package, to make sure the fit is right." },
      ],
    }),
    block({
      type: "CONTACT_FORM",
      heading: "Book a fitting",
      description: "Tell us what you'd like made and your event date.",
      fields: { name: true, email: false, phone: true, message: true },
      customFields: [{ label: "Event date", type: "text" }],
      submitLabel: "Request booking",
      successMessage: "Thanks, we'll confirm your fitting on WhatsApp shortly.",
    }, tinted),
    block({
      type: "WHATSAPP_BUTTON",
      phoneNumber: "+2348001234567",
      prefilledMessage: "Hi Ade Couture, I'd like to book a fitting",
      displayStyle: "floating",
      label: "Chat on WhatsApp",
    }),
    block({
      type: "FOOTER",
      businessName: "Ade Couture",
      tagline: "Bespoke tailoring from our Surulere atelier.",
      links: [{ label: "Designs", href: "#gallery" }, { label: "Book a fitting", href: "#contact" }],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "whatsapp", url: "https://wa.me/2348001234567" },
      ],
      copyrightText: "© 2026 Ade Couture. All rights reserved.",
    }),
  ],
};
