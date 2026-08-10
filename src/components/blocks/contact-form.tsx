"use client";

import { FaWhatsapp } from "react-icons/fa6";

import type { ContactFormContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-(--theme-color-secondary) focus:outline-none";

export function ContactForm({
  content,
  action,
  submitted = false,
  whatsappHref,
}: {
  content: ContactFormContent;
  /** Bound server action; omitted in the editor/demo, where the form is decorative. */
  action?: (formData: FormData) => void;
  submitted?: boolean;
  whatsappHref?: string;
}) {
  const editor = useEditorMode();

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="text-lg font-medium">{content.successMessage}</p>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FaWhatsapp size={18} />
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {(content.heading || editor) && (
        <EditableText
          as="h2"
          path="heading"
          value={content.heading ?? ""}
          className="block font-(family-name:--theme-font-heading) text-3xl font-semibold tracking-tight"
        />
      )}
      {(content.description || editor) && (
        <EditableText as="p" path="description" value={content.description ?? ""} className="mt-3 block text-(--theme-color-muted)" />
      )}

      <form className="mt-8 flex flex-col gap-4" action={action}>
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
