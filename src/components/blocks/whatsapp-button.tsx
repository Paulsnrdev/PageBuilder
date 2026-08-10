import { FaWhatsapp } from "react-icons/fa6";

import type { WhatsappButtonContent } from "@/lib/blocks/schema";
import { EditableText } from "@/components/blocks/editable-text";

function buildWhatsAppLink(content: WhatsappButtonContent) {
  const digits = content.phoneNumber.replace(/[^\d]/g, "");
  const text = content.prefilledMessage ? `?text=${encodeURIComponent(content.prefilledMessage)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function WhatsappButton({ content }: { content: WhatsappButtonContent }) {
  const href = buildWhatsAppLink(content);

  if (content.displayStyle === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.label}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <FaWhatsapp size={28} />
      </a>
    );
  }

  return (
    <div className="flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <FaWhatsapp size={18} />
        <EditableText as="span" path="label" value={content.label} />
      </a>
    </div>
  );
}
