"use client";

import { useState } from "react";

import { ContentFieldsForm } from "@/components/editor/content-fields-form";
import { ThemePanel } from "@/components/editor/theme-panel";
import { contentFieldsByType } from "@/lib/editor/content-fields";
import type { BlockContent, BlockSettings } from "@/lib/blocks/schema";
import type { EditorBlock } from "@/lib/editor/types";
import type { Theme } from "@/lib/theme/schema";

const paddingOptions: BlockSettings["paddingY"][] = ["none", "sm", "md", "lg"];
const widthOptions: BlockSettings["containerWidth"][] = ["narrow", "default", "wide", "full"];

export function SettingsPanel({
  theme,
  onThemeChange,
  selectedBlock,
  onContentChange,
  onSettingsChange,
}: {
  theme: Theme;
  onThemeChange: (theme: Theme, opts: { live: boolean }) => void;
  selectedBlock: EditorBlock | null;
  onContentChange: (content: BlockContent, opts: { live: boolean }) => void;
  onSettingsChange: (settings: BlockSettings, opts: { live: boolean }) => void;
}) {
  const [tab, setTab] = useState<"block" | "theme">("block");
  const activeTab = selectedBlock ? tab : "theme";

  return (
    <aside className="flex w-80 shrink-0 flex-col overflow-y-auto border-l border-zinc-200 bg-white">
      <div className="flex border-b border-zinc-200">
        <button
          type="button"
          onClick={() => setTab("block")}
          disabled={!selectedBlock}
          className={`flex-1 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:text-zinc-300 ${
            activeTab === "block" ? "border-b-2 border-zinc-900 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          Block
        </button>
        <button
          type="button"
          onClick={() => setTab("theme")}
          className={`flex-1 py-3 text-sm font-medium transition ${
            activeTab === "theme" ? "border-b-2 border-zinc-900 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          Theme
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "theme" && <ThemePanel theme={theme} onChange={onThemeChange} />}

        {activeTab === "block" && selectedBlock && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-400">Content</p>
              <ContentFieldsForm
                content={selectedBlock.content}
                fields={contentFieldsByType[selectedBlock.content.type]}
                onChange={(content, opts) => onContentChange(content as BlockContent, opts)}
              />
            </div>

            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-400">Block settings</p>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1 text-sm">
                  Background colour
                  <input
                    type="color"
                    value={selectedBlock.settings.backgroundColor ?? "#ffffff"}
                    onChange={(e) =>
                      onSettingsChange({ ...selectedBlock.settings, backgroundColor: e.target.value }, { live: true })
                    }
                    onBlur={() => onSettingsChange(selectedBlock.settings, { live: false })}
                    className="h-9 w-full rounded border border-zinc-300"
                  />
                </label>

                <label className="flex flex-col gap-1 text-sm">
                  Vertical padding
                  <select
                    value={selectedBlock.settings.paddingY}
                    onChange={(e) =>
                      onSettingsChange(
                        { ...selectedBlock.settings, paddingY: e.target.value as BlockSettings["paddingY"] },
                        { live: false },
                      )
                    }
                    className="rounded border border-zinc-300 px-2 py-1.5"
                  >
                    {paddingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-sm">
                  Container width
                  <select
                    value={selectedBlock.settings.containerWidth}
                    onChange={(e) =>
                      onSettingsChange(
                        { ...selectedBlock.settings, containerWidth: e.target.value as BlockSettings["containerWidth"] },
                        { live: false },
                      )
                    }
                    className="rounded border border-zinc-300 px-2 py-1.5"
                  >
                    {widthOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "block" && !selectedBlock && (
          <p className="text-sm text-zinc-400">Select a block to edit its settings.</p>
        )}
      </div>
    </aside>
  );
}
