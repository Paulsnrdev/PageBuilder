"use client";

import type { ImageField as ImageValue } from "@/lib/blocks/schema";
import { CloudinaryUploadButton } from "@/components/editor/fields/cloudinary-upload-button";

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ImageValue | undefined;
  onChange: (next: ImageValue) => void;
}) {
  const image = value ?? { url: "", alt: "" };

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-medium">{label}</p>
        <CloudinaryUploadButton onUploaded={(url) => onChange({ ...image, url })} />
      </div>
      {image.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.url} alt={image.alt} className="h-28 w-full rounded-lg border border-zinc-200 object-cover" />
      )}
      <input
        type="text"
        placeholder="Image URL"
        value={image.url}
        onChange={(e) => onChange({ ...image, url: e.target.value })}
        className="rounded border border-zinc-300 px-2 py-1.5"
      />
      <input
        type="text"
        placeholder="Alt text"
        value={image.alt}
        onChange={(e) => onChange({ ...image, alt: e.target.value })}
        className="rounded border border-zinc-300 px-2 py-1.5"
      />
    </div>
  );
}
