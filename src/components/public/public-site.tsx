import { BlockRenderer } from "@/components/blocks/block-renderer";
import type { PublishedSnapshot } from "@/lib/sites/snapshot";
import { ThemeProvider } from "@/lib/theme/theme-provider";

function buildWhatsappHref(snapshot: PublishedSnapshot) {
  const button = snapshot.blocks.find((block) => block.content.type === "WHATSAPP_BUTTON");
  if (!button || button.content.type !== "WHATSAPP_BUTTON") return undefined;

  const digits = button.content.phoneNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}

/** Renders a published site's blocks. Shared by the /s/[slug] route and custom-domain rendering. */
export function PublicSite({
  snapshot,
  siteId,
  basePath,
  submittedBlockId,
  branded,
}: {
  snapshot: PublishedSnapshot;
  siteId: string;
  basePath: string;
  submittedBlockId?: string;
  /** Free plan: show a small "made with" badge at the foot of the page. */
  branded: boolean;
}) {
  const whatsappHref = buildWhatsappHref(snapshot);

  return (
    <ThemeProvider theme={snapshot.theme}>
      <main>
        {snapshot.blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            id={block.id}
            content={block.content}
            settings={block.settings}
            leadContext={{ siteId, basePath, submittedBlockId, whatsappHref }}
          />
        ))}
      </main>
      {branded && (
        <a
          href={process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}
          className="block bg-zinc-50 py-3 text-center text-xs text-zinc-400 hover:text-zinc-600"
        >
          Made with Page Builder
        </a>
      )}
    </ThemeProvider>
  );
}
