import type { CSSProperties, ReactNode } from "react";

import type { Theme } from "@/lib/theme/schema";

const headingFontByPairing: Record<Theme["fontPairing"], string> = {
  modern: "var(--font-sora)",
  editorial: "var(--font-playfair)",
};

// Base spacing unit each block's paddingY setting multiplies against.
// This is what makes the theme's spacing scale affect every block at once.
const spaceUnitByScale: Record<Theme["spacing"], string> = {
  compact: "0.75rem",
  comfortable: "1rem",
  spacious: "1.25rem",
};

/** Applies a site's theme as CSS variables to everything rendered inside it. */
export function ThemeProvider({ theme, children }: { theme: Theme; children: ReactNode }) {
  const vars = {
    "--theme-color-primary": theme.colors.primary,
    "--theme-color-secondary": theme.colors.secondary,
    "--theme-color-background": theme.colors.background,
    "--theme-color-foreground": theme.colors.foreground,
    "--theme-color-muted": theme.colors.muted,
    "--theme-font-heading": headingFontByPairing[theme.fontPairing],
    "--theme-font-body": "var(--font-inter)",
    "--theme-space-unit": spaceUnitByScale[theme.spacing],
  } as CSSProperties;

  return (
    <div
      style={{ ...vars, backgroundColor: "var(--theme-color-background)", color: "var(--theme-color-foreground)" }}
      className="font-(family-name:--theme-font-body)"
    >
      {children}
    </div>
  );
}
