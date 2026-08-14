// Decorative panel for the auth screens. Deliberately not a customer
// testimonial (no real quote to show yet) — an abstract wireframe of a
// published page instead, built from our own real tagline.
export function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden rounded-2xl bg-zinc-950 p-10 md:flex md:w-[46%] md:flex-col md:justify-between">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <p className="relative text-2xl leading-snug font-medium text-white">
        Build your business a landing page,{" "}
        <span className="text-zinc-400">this afternoon.</span>
      </p>

      <div className="relative mt-10 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="space-y-3 p-6">
          <div className="h-3 w-2/3 rounded bg-white/25" />
          <div className="h-2 w-4/5 rounded bg-white/10" />
          <div className="h-2 w-3/5 rounded bg-white/10" />
          <div className="mt-4 h-8 w-32 rounded-full bg-white/90" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-lg bg-white/5" />
            <div className="h-16 rounded-lg bg-white/5" />
            <div className="h-16 rounded-lg bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
