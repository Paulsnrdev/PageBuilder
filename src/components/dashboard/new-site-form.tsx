"use client";

import { useState } from "react";

import { createSite } from "@/lib/sites/actions";

type TemplateOption = { id: string; name: string; description: string; previewImageUrl: string };

function isRedirectError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT");
}

export function NewSiteForm({ templates }: { templates: TemplateOption[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!name.trim()) return;
    setCreating(true);
    setError("");
    try {
      await createSite(name.trim(), selected ?? undefined);
    } catch (err) {
      if (isRedirectError(err)) throw err;
      setError(err instanceof Error ? err.message : "Could not create site");
      setCreating(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className={`overflow-hidden rounded-xl border text-left transition ${
            selected === null ? "border-zinc-900 ring-2 ring-zinc-900" : "border-zinc-200 hover:border-zinc-300"
          }`}
        >
          <div className="flex h-32 items-center justify-center bg-zinc-50 text-sm text-zinc-400">Blank canvas</div>
          <div className="p-4">
            <p className="font-medium">Blank site</p>
            <p className="mt-1 text-sm text-zinc-500">Start from an empty page and add your own blocks.</p>
          </div>
        </button>

        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => setSelected(template.id)}
            className={`overflow-hidden rounded-xl border text-left transition ${
              selected === template.id ? "border-zinc-900 ring-2 ring-zinc-900" : "border-zinc-200 hover:border-zinc-300"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={template.previewImageUrl} alt="" className="h-32 w-full object-cover" />
            <div className="p-4">
              <p className="font-medium">{template.name}</p>
              <p className="mt-1 text-sm text-zinc-500">{template.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 border-t border-zinc-200 pt-6">
        <input
          type="text"
          required
          placeholder="What's your business called?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating || !name.trim()}
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create site"}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
