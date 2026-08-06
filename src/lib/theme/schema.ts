import { z } from "zod";

// Site.theme: colours, fonts, and a spacing scale, applied to every block
// through CSS variables (see theme-provider.tsx) so a single change here
// updates the whole page.

export const themeSchema = z.object({
  colors: z
    .object({
      primary: z.string(),
      secondary: z.string(),
      background: z.string(),
      foreground: z.string(),
      muted: z.string(),
    })
    .default({
      primary: "#0f172a",
      secondary: "#2563eb",
      background: "#ffffff",
      foreground: "#0f172a",
      muted: "#64748b",
    }),
  fontPairing: z.enum(["modern", "editorial"]).default("modern"),
  spacing: z.enum(["compact", "comfortable", "spacious"]).default("comfortable"),
});

export type Theme = z.infer<typeof themeSchema>;

export const defaultTheme: Theme = themeSchema.parse({});
