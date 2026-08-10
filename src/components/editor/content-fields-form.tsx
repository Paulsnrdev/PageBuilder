"use client";

import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6";

import { ImageField } from "@/components/editor/fields/image-field";
import { LinkField } from "@/components/editor/fields/link-field";
import type { FieldDescriptor } from "@/lib/editor/content-fields";
import { getAtPath, setAtPath, type PathSegment } from "@/lib/editor/object-path";

export function ContentFieldsForm({
  content,
  fields,
  basePath = [],
  onChange,
}: {
  content: unknown;
  fields: FieldDescriptor[];
  basePath?: PathSegment[];
  onChange: (nextContent: unknown, opts: { live: boolean }) => void;
}) {
  function set(path: PathSegment[], value: unknown, opts: { live: boolean }) {
    onChange(setAtPath(content, path, value), opts);
  }

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => {
        const path = [...basePath, ...(field.key ? field.key.split(".") : [])];
        const value = getAtPath(content, path);

        switch (field.kind) {
          case "text":
            return (
              <label key={field.key} className="flex flex-col gap-1 text-sm">
                {field.label}
                <input
                  type="text"
                  value={(value as string) ?? ""}
                  onChange={(e) => set(path, e.target.value, { live: true })}
                  onBlur={(e) => set(path, e.target.value, { live: false })}
                  className="rounded border border-zinc-300 px-2 py-1.5"
                />
              </label>
            );

          case "textarea":
            return (
              <label key={field.key} className="flex flex-col gap-1 text-sm">
                {field.label}
                <textarea
                  rows={3}
                  value={(value as string) ?? ""}
                  onChange={(e) => set(path, e.target.value, { live: true })}
                  onBlur={(e) => set(path, e.target.value, { live: false })}
                  className="rounded border border-zinc-300 px-2 py-1.5"
                />
              </label>
            );

          case "boolean":
            return (
              <label key={field.key} className="flex items-center justify-between text-sm">
                {field.label}
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(e) => set(path, e.target.checked, { live: false })}
                />
              </label>
            );

          case "select":
            return (
              <label key={field.key} className="flex flex-col gap-1 text-sm">
                {field.label}
                <select
                  value={(value as string) ?? field.options[0]?.value}
                  onChange={(e) => set(path, e.target.value, { live: false })}
                  className="rounded border border-zinc-300 px-2 py-1.5"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            );

          case "image":
            return (
              <ImageField
                key={field.key || "image"}
                label={field.label}
                value={value as { url: string; alt: string } | undefined}
                onChange={(next) => set(path, next, { live: false })}
              />
            );

          case "link":
            return (
              <LinkField
                key={field.key}
                label={field.label}
                value={value as { label: string; href: string; external: boolean } | undefined}
                onChange={(next) => set(path, next, { live: false })}
              />
            );

          case "list":
            return (
              <ListField
                key={field.key}
                label={field.label}
                itemLabel={field.itemLabel}
                itemFields={field.itemFields}
                defaultItem={field.defaultItem}
                items={(value as unknown[]) ?? []}
                onChange={(nextItems, opts) => set(path, nextItems, opts)}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

function ListField({
  label,
  itemLabel,
  itemFields,
  defaultItem,
  items,
  onChange,
}: {
  label: string;
  itemLabel: string;
  itemFields: FieldDescriptor[];
  defaultItem: Record<string, unknown>;
  items: unknown[];
  onChange: (nextItems: unknown[], opts: { live: boolean }) => void;
}) {
  function updateItem(index: number, nextItem: unknown) {
    const nextItems = [...items];
    nextItems[index] = nextItem;
    onChange(nextItems, { live: false });
  }

  function addItem() {
    onChange([...items, { ...defaultItem }], { live: false });
  }

  function removeItem(index: number) {
    onChange(
      items.filter((_, i) => i !== index),
      { live: false },
    );
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const nextItems = [...items];
    [nextItems[index], nextItems[target]] = [nextItems[target], nextItems[index]];
    onChange(nextItems, { live: false });
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">{label}</p>
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-zinc-200 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">
              {itemLabel} {index + 1}
            </span>
            <div className="flex items-center gap-2 text-zinc-400">
              <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} className="disabled:opacity-30">
                <FaArrowUp size={11} />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="disabled:opacity-30"
              >
                <FaArrowDown size={11} />
              </button>
              <button type="button" onClick={() => removeItem(index)} className="hover:text-red-500">
                <FaTrash size={11} />
              </button>
            </div>
          </div>
          <ContentFieldsForm content={item} fields={itemFields} onChange={(nextItem) => updateItem(index, nextItem)} />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="rounded-lg border border-dashed border-zinc-300 py-2 text-sm text-zinc-500 hover:border-zinc-400 hover:text-zinc-700"
      >
        + Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}
