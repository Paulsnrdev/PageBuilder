import Link from "next/link";
import Image from "next/image";
import { FaCheck, FaWandMagicSparkles, FaLayerGroup, FaWhatsapp, FaGlobe } from "react-icons/fa6";

import { templates } from "@/lib/templates";
import { PLAN_LIMITS, PLAN_PRICING } from "@/lib/billing/plan";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const PLAN_ORDER = ["FREE", "PRO", "BUSINESS"] as const;

const PLAN_FEATURES: Record<(typeof PLAN_ORDER)[number], string[]> = {
  FREE: ["1 site", "Subdomain only", "Page Builder branding in footer"],
  PRO: ["5 sites", "Custom domain", "No branding", "Lead export"],
  BUSINESS: ["Unlimited sites", "Custom domain", "No branding", "Lead export", "Priority support"],
};

const FEATURES = [
  {
    icon: FaWandMagicSparkles,
    title: "Drag-and-drop editor",
    description: "Click any block to add it, click any text to edit it. No code, no learning curve.",
  },
  {
    icon: FaLayerGroup,
    title: `${templates.length} ready-made templates`,
    description: "From restaurants to online stores, filled with real content to start from.",
  },
  {
    icon: FaWhatsapp,
    title: "Built for WhatsApp",
    description: "Every template ships with a floating WhatsApp button so customers can reach you in one tap.",
  },
  {
    icon: FaGlobe,
    title: "Custom domains",
    description: "Launch on a free subdomain, then point your own domain at it when you're ready.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold">
          <Image src="/icon.svg" alt="" width={28} height={28} className="rounded-md" />
          Page Builder
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-500"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(24,24,27,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute top-[-12rem] left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-indigo-200/50 blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700">
              Built for Nigerian small businesses
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Build your business a{" "}
              <span className="bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                landing page
              </span>
              , this afternoon
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600">
              Pick a template, edit it to fit your business, and publish. Made for Nigerian small businesses that need
              to be online without hiring a developer.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
              >
                Get started free
              </Link>
              <a
                href="#templates"
                className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold transition hover:bg-zinc-50"
              >
                See templates
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-100 bg-zinc-50 py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.title} delayMs={i * 75}>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600">
                  <feature.icon size={18} />
                </div>
                <p className="mt-4 font-semibold">{feature.title}</p>
                <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-5xl px-6 py-20">
          <ScrollReveal className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Start from a template that already looks good</h2>
            <p className="mt-3 text-zinc-600">Every template comes filled with real sample content, so you edit instead of starting from nothing.</p>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, i) => (
              <ScrollReveal key={template.id} delayMs={(i % 3) * 75}>
                <div className="group overflow-hidden rounded-xl border border-zinc-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={template.previewImageUrl}
                    alt=""
                    className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <p className="font-medium">{template.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">{template.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-t border-zinc-100 bg-zinc-50 py-20">
          <ScrollReveal className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Simple pricing</h2>
            <p className="mt-3 text-zinc-600">Start free. Upgrade when you need a custom domain or more sites.</p>
          </ScrollReveal>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
            {PLAN_ORDER.map((planId, i) => {
              const highlighted = planId === "PRO";
              return (
                <ScrollReveal
                  key={planId}
                  delayMs={i * 75}
                  className={
                    highlighted
                      ? "relative flex flex-col gap-4 rounded-xl border-2 border-indigo-600 bg-white p-6 shadow-lg shadow-indigo-600/10"
                      : "flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6"
                  }
                >
                  {highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-medium text-zinc-500">{PLAN_PRICING[planId].label}</p>
                    <p className="mt-1 text-2xl font-semibold">
                      {PLAN_PRICING[planId].priceNaira === 0 ? "Free" : `₦${PLAN_PRICING[planId].priceNaira.toLocaleString()}`}
                      {PLAN_PRICING[planId].priceNaira > 0 && <span className="text-sm font-normal text-zinc-500">/month</span>}
                    </p>
                    {PLAN_PRICING[planId].priceNaira > 0 && (
                      <p className="text-xs text-zinc-400">or ₦{PLAN_PRICING[planId].yearlyPriceNaira.toLocaleString()}/year, 2 months free</p>
                    )}
                  </div>
                  <ul className="flex flex-1 flex-col gap-2 text-sm text-zinc-600">
                    {PLAN_FEATURES[planId].map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <FaCheck className={highlighted ? "mt-0.5 shrink-0 text-indigo-600" : "mt-0.5 shrink-0 text-zinc-400"} size={12} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={
                      highlighted
                        ? "rounded-full bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-500"
                        : "rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-zinc-800"
                    }
                  >
                    Get started
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-400">Limits shown: {PLAN_LIMITS.PRO.maxSites} sites on Pro, unlimited on Business.</p>
        </section>

        <section className="px-6 py-20">
          <ScrollReveal className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-zinc-950 px-6 py-16 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />

            <h2 className="relative text-3xl font-semibold tracking-tight text-white">Ready to get your business online?</h2>
            <Link
              href="/signup"
              className="relative mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100"
            >
              Get started free
            </Link>
          </ScrollReveal>
        </section>
      </main>

      <footer className="border-t border-zinc-100 px-6 py-8 text-center text-sm text-zinc-400">
        © 2026 Page Builder. All rights reserved.
      </footer>
    </div>
  );
}
