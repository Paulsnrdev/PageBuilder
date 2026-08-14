// Decorative panel for the auth screens. Deliberately not a customer
// testimonial (no real quote to show yet) and not a fake business mockup
// either — a plain placeholder photo, the same picsum.photos source already
// used for template previews elsewhere in the app.
export function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden rounded-2xl md:flex md:w-[46%]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://picsum.photos/seed/pagebuilder-auth/900/1200"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/50" />

      <p className="relative z-10 mt-auto p-10 text-2xl leading-snug font-medium text-white">
        Build your business a landing page,{" "}
        <span className="text-zinc-300">this afternoon.</span>
      </p>
    </div>
  );
}
