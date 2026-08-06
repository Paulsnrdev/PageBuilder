import type { LinkField } from "@/lib/blocks/schema";

export function CtaButton({ cta, variant = "primary" }: { cta: LinkField; variant?: "primary" | "secondary" }) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={cta.href}
      target={cta.external ? "_blank" : undefined}
      rel={cta.external ? "noopener noreferrer" : undefined}
      className={
        isPrimary
          ? "inline-flex items-center justify-center rounded-full bg-(--theme-color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          : "inline-flex items-center justify-center rounded-full border border-(--theme-color-muted) px-6 py-3 text-sm font-semibold transition hover:bg-black/5"
      }
    >
      {cta.label}
    </a>
  );
}
