"use client";

import type { LinkField as LinkValue } from "@/lib/blocks/schema";

export function LinkField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LinkValue | undefined;
  onChange: (next: LinkValue | undefined) => void;
}) {
  const link = value ?? { label: "", href: "", external: false };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-3 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-medium">{label}</p>
        {value ? (
          <button type="button" className="text-xs text-zinc-400 hover:text-red-500" onClick={() => onChange(undefined)}>
            Remove
          </button>
        ) : (
          <button type="button" className="text-xs text-blue-600 hover:underline" onClick={() => onChange(link)}>
            Add
          </button>
        )}
      </div>
      {value && (
        <>
          <input
            type="text"
            placeholder="Button label"
            value={link.label}
            onChange={(e) => onChange({ ...link, label: e.target.value })}
            className="rounded border border-zinc-300 px-2 py-1.5"
          />
          <input
            type="text"
            placeholder="https://..."
            value={link.href}
            onChange={(e) => onChange({ ...link, href: e.target.value })}
            className="rounded border border-zinc-300 px-2 py-1.5"
          />
          <label className="flex items-center gap-2 text-xs text-zinc-500">
            <input
              type="checkbox"
              checked={link.external}
              onChange={(e) => onChange({ ...link, external: e.target.checked })}
            />
            Open in new tab
          </label>
        </>
      )}
    </div>
  );
}
