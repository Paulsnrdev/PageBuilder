import type { ContactFormContent } from "@/lib/blocks/schema";

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-(--theme-color-secondary) focus:outline-none";

export function ContactForm({ content }: { content: ContactFormContent }) {
  return (
    <div className="mx-auto max-w-xl">
      {content.heading && (
        <h2 className="font-(family-name:--theme-font-heading) text-3xl font-semibold tracking-tight">
          {content.heading}
        </h2>
      )}
      {content.description && (
        <p className="mt-3 text-(--theme-color-muted)">{content.description}</p>
      )}

      <form className="mt-8 flex flex-col gap-4">
        {content.fields.name && <input className={inputClass} type="text" placeholder="Name" name="name" />}
        {content.fields.email && <input className={inputClass} type="email" placeholder="Email" name="email" />}
        {content.fields.phone && <input className={inputClass} type="tel" placeholder="Phone" name="phone" />}

        {content.customFields.map((field, i) =>
          field.type === "textarea" ? (
            <textarea key={i} className={inputClass} placeholder={field.label} name={field.label} rows={3} />
          ) : field.type === "select" ? (
            <select key={i} className={inputClass} name={field.label} defaultValue="">
              <option value="" disabled>
                {field.label}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input key={i} className={inputClass} type="text" placeholder={field.label} name={field.label} />
          ),
        )}

        {content.fields.message && (
          <textarea className={inputClass} placeholder="Message" name="message" rows={4} />
        )}

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-(--theme-color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {content.submitLabel}
        </button>
      </form>
    </div>
  );
}
