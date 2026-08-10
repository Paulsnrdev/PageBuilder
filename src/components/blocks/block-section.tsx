"use client";

import type { ReactNode } from "react";

import type { BlockSettings } from "@/lib/blocks/schema";
import { useEditorMode } from "@/lib/editor/editor-mode-context";

const paddingMultiplier: Record<BlockSettings["paddingY"], number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
};

const containerWidthClass: Record<BlockSettings["containerWidth"], string> = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
  full: "max-w-none",
};

/**
 * Shared wrapper every block renders through. Applies the block's own
 * settings (background, padding, container width, visibility) plus the
 * site theme's spacing unit, so block padding scales with the theme.
 */
export function BlockSection({ settings, children }: { settings: BlockSettings; children: ReactNode }) {
  const editor = useEditorMode();
  if (settings.hidden && !editor) return null;

  const paddingRem = `calc(var(--theme-space-unit) * ${paddingMultiplier[settings.paddingY]})`;

  return (
    <section
      id={settings.anchorId}
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        paddingTop: paddingRem,
        paddingBottom: paddingRem,
      }}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${containerWidthClass[settings.containerWidth]}`}>
        {children}
      </div>
    </section>
  );
}
