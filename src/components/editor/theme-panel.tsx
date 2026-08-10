"use client";

import type { Theme } from "@/lib/theme/schema";

const colorFields: { key: keyof Theme["colors"]; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "background", label: "Background" },
  { key: "foreground", label: "Text" },
  { key: "muted", label: "Muted text" },
];

const fontPairings: { value: Theme["fontPairing"]; label: string }[] = [
  { value: "modern", label: "Modern (Sora + Inter)" },
  { value: "editorial", label: "Editorial (Playfair + Inter)" },
];

const spacingOptions: { value: Theme["spacing"]; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

export function ThemePanel({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme, opts: { live: boolean }) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-400">Colours</p>
        <div className="grid grid-cols-2 gap-3">
          {colorFields.map(({ key, label }) => (
            <label key={key} className="flex flex-col gap-1 text-sm">
              {label}
              <input
                type="color"
                value={theme.colors[key]}
                onChange={(e) => onChange({ ...theme, colors: { ...theme.colors, [key]: e.target.value } }, { live: true })}
                onBlur={() => onChange(theme, { live: false })}
                className="h-9 w-full rounded border border-zinc-300"
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-400">Fonts</p>
        <div className="flex flex-col gap-2">
          {fontPairings.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="fontPairing"
                checked={theme.fontPairing === option.value}
                onChange={() => onChange({ ...theme, fontPairing: option.value }, { live: false })}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-400">Spacing</p>
        <select
          value={theme.spacing}
          onChange={(e) => onChange({ ...theme, spacing: e.target.value as Theme["spacing"] }, { live: false })}
          className="w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
        >
          {spacingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
