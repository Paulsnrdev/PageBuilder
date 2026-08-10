import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

import { templates } from "@/lib/templates";
import { PLAN_LIMITS, PLAN_PRICING } from "@/lib/billing/plan";

const PLAN_ORDER = ["FREE", "PRO", "BUSINESS"] as const;

const PLAN_FEATURES: Record<(typeof PLAN_ORDER)[number], string[]> = {
  FREE: ["1 site", "Subdomain only", "Page Builder branding in footer"],
  PRO: ["5 sites", "Custom domain", "No branding", "Lead export"],
  BUSINESS: ["Unlimited sites", "Custom domain", "No branding", "Lead export", "Priority support"],
};

const FEATURES = [
  { title: "Drag-and-drop editor", description: "Click any block to add it, click any text to edit it. No code, no learning curve." },
  { title: `${templates.length} ready-made templates`, description: "From restaurants to online stores, filled with real content to start from." },
  { title: "Built for WhatsApp", description: "Every template ships with a floating WhatsApp button so customers can reach you in one tap." },
  { title: "Custom domains", description: "Launch on a free subdomain, then point your own domain at it when you're ready." },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-lg font-semibold">Page Builder</span>
        <Link href="/login" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50">
          Log in
        </Link>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Build your business a landing page, this afternoon
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600">
            Pick a template, edit it to fit your business, and publish. Made for Nigerian small businesses that need
            to be online without hiring a developer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Get started free
            </Link>
            <a
              href="#templates"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold transition hover:bg-zinc-50"
            >
              See templates
            </a>
          </div>
        </section>

        <section className="border-y border-zinc-100 bg-zinc-50 py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title}>
                <p className="font-semibold">{feature.title}</p>
                <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-5xl px-6 py-20">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Start from a template that already looks good</h2>
            <p className="mt-3 text-zinc-600">Every template comes filled with real sample content, so you edit instead of starting from nothing.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div key={template.id} className="overflow-hidden rounded-xl border border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={template.previewImageUrl} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="font-medium">{template.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-t border-zinc-100 bg-zinc-50 py-20">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Simple pricing</h2>
            <p className="mt-3 text-zinc-600">Start free. Upgrade when you need a custom domain or more sites.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
            {PLAN_ORDER.map((planId) => (
              <div key={planId} className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6">
                <div>
                  <p className="text-sm font-medium text-zinc-500">{PLAN_PRICING[planId].label}</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {PLAN_PRICING[planId].priceNaira === 0 ? "Free" : `₦${PLAN_PRICING[planId].priceNaira.toLocaleString()}`}
                    {PLAN_PRICING[planId].priceNaira > 0 && <span className="text-sm font-normal text-zinc-500">/month</span>}
                  </p>
                </div>
                <ul className="flex flex-1 flex-col gap-2 text-sm text-zinc-600">
                  {PLAN_FEATURES[planId].map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <FaCheck className="mt-0.5 shrink-0 text-zinc-400" size={12} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-400">Limits shown: {PLAN_LIMITS.PRO.maxSites} sites on Pro, unlimited on Business.</p>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to get your business online?</h2>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Get started free
          </Link>
        </section>
      </main>

      <footer className="border-t border-zinc-100 px-6 py-8 text-center text-sm text-zinc-400">
        © 2026 Page Builder. All rights reserved.
      </footer>
    </div>
  );
}
