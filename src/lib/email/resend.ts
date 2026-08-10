import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Best-effort: a missing API key or a send failure should never block lead capture. */
export async function sendLeadNotification({
  to,
  siteName,
  data,
}: {
  to: string;
  siteName: string;
  data: Record<string, string>;
}) {
  if (!resend) return;

  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;text-transform:capitalize">${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  await resend.emails.send({
    from: "Page Builder <onboarding@resend.dev>",
    to,
    subject: `New lead from ${siteName}`,
    html: `<table>${rows}</table>`,
  });
}
