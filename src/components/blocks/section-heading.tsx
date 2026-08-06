export function SectionHeading({
  heading,
  subheading,
  align = "center",
}: {
  heading?: string;
  subheading?: string;
  align?: "left" | "center";
}) {
  if (!heading && !subheading) return null;

  return (
    <div className={`mb-12 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {heading && (
        <h2 className="font-(family-name:--theme-font-heading) text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      )}
      {subheading && (
        <p className="mt-4 text-lg text-(--theme-color-muted)">{subheading}</p>
      )}
    </div>
  );
}
