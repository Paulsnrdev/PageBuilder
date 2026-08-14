import Image from "next/image";

// Decorative panel for the auth screens. Deliberately not a customer
// testimonial (no real quote to show yet) — a screenshot of the actual
// demo page (/preview/demo) instead, built from our own real tagline.
export function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden rounded-2xl bg-zinc-950 p-10 md:flex md:w-[46%] md:flex-col md:justify-center md:gap-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "#4f46e5" }}
      />

      <p className="relative text-2xl leading-snug font-medium text-white">
        Build your business a landing page,{" "}
        <span className="text-zinc-400">this afternoon.</span>
      </p>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="relative aspect-1280/840 w-full">
          <Image
            src="/marketing/auth-showcase.png"
            alt="A landing page built with Page Builder"
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
