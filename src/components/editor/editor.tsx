"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { BlockLibraryPanel } from "@/components/editor/block-library-panel";
import { Canvas } from "@/components/editor/canvas";
import { SettingsPanel } from "@/components/editor/settings-panel";
import { Toolbar } from "@/components/editor/toolbar";
import type { BlockType } from "@/generated/prisma/enums";
import { defaultContentByType } from "@/lib/blocks/default-content";
import { blockSettingsSchema, type BlockContent, type BlockSettings } from "@/lib/blocks/schema";
import { useAutosave } from "@/lib/editor/use-autosave";
import { useHistoryState } from "@/lib/editor/use-history-state";
import { setByPath } from "@/lib/editor/set-by-path";
import type { Device, EditorBlock, EditorState } from "@/lib/editor/types";
import { saveSite } from "@/lib/sites/actions";
import type { Theme } from "@/lib/theme/schema";

export function Editor({
  siteId,
  siteName,
  initialState,
}: {
  siteId: string;
  siteName: string;
  initialState: EditorState;
}) {
  const history = useHistoryState<EditorState>(initialState);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(initialState.blocks[0]?.id ?? null);
  const [device, setDevice] = useState<Device>("desktop");
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const autosave = useAutosave(history.present, (state) => saveSite(siteId, state));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isMeta = event.metaKey || event.ctrlKey;
      if (!isMeta || event.key.toLowerCase() !== "z") return;
      event.preventDefault();
      if (event.shiftKey) history.redo();
      else history.undo();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [history]);

  const selectedBlock = history.present.blocks.find((b) => b.id === selectedBlockId) ?? null;

  const addBlock = useCallback(
    (type: BlockType, atIndex?: number) => {
      const newBlock: EditorBlock = {
        id: crypto.randomUUID(),
        content: defaultContentByType[type],
        settings: blockSettingsSchema.parse({}),
      };
      const blocks = [...history.present.blocks];
      const insertAt = atIndex ?? blocks.length;
      blocks.splice(insertAt, 0, newBlock);
      history.set({ ...history.present, blocks });
      setSelectedBlockId(newBlock.id);
    },
    [history],
  );

  // Every live/commit edit goes through setLive first (updates what's on
  // screen immediately) and only pushes a history entry via commitLive once
  // the edit session ends, so a whole typing session undoes in one step.
  const applyLiveOrCommit = useCallback(
    (next: EditorState, { live }: { live: boolean }) => {
      history.setLive(next);
      if (!live) history.commitLive();
    },
    [history],
  );

  const updateSelectedContent = useCallback(
    (content: BlockContent, { live }: { live: boolean }) => {
      if (!selectedBlockId) return;
      const blocks = history.present.blocks.map((b) => (b.id === selectedBlockId ? { ...b, content } : b));
      applyLiveOrCommit({ ...history.present, blocks }, { live });
    },
    [history, selectedBlockId, applyLiveOrCommit],
  );

  const updateSelectedSettings = useCallback(
    (settings: BlockSettings, { live }: { live: boolean }) => {
      if (!selectedBlockId) return;
      const blocks = history.present.blocks.map((b) => (b.id === selectedBlockId ? { ...b, settings } : b));
      applyLiveOrCommit({ ...history.present, blocks }, { live });
    },
    [history, selectedBlockId, applyLiveOrCommit],
  );

  const updateBlockFieldByPath = useCallback(
    (blockId: string, path: string, value: string) => {
      const blocks = history.present.blocks.map((b) =>
        b.id === blockId ? { ...b, content: setByPath(b.content, path, value) } : b,
      );
      history.set({ ...history.present, blocks });
    },
    [history],
  );

  const duplicateBlock = useCallback(
    (blockId: string) => {
      const index = history.present.blocks.findIndex((b) => b.id === blockId);
      if (index === -1) return;
      const copy: EditorBlock = { ...history.present.blocks[index], id: crypto.randomUUID() };
      const blocks = [...history.present.blocks];
      blocks.splice(index + 1, 0, copy);
      history.set({ ...history.present, blocks });
      setSelectedBlockId(copy.id);
    },
    [history],
  );

  const deleteBlock = useCallback(
    (blockId: string) => {
      const blocks = history.present.blocks.filter((b) => b.id !== blockId);
      history.set({ ...history.present, blocks });
      setSelectedBlockId((current) => (current === blockId ? null : current));
    },
    [history],
  );

  const toggleBlockHidden = useCallback(
    (blockId: string) => {
      const blocks = history.present.blocks.map((b) =>
        b.id === blockId ? { ...b, settings: { ...b.settings, hidden: !b.settings.hidden } } : b,
      );
      history.set({ ...history.present, blocks });
    },
    [history],
  );

  const setTheme = useCallback(
    (theme: Theme, { live }: { live: boolean }) => {
      applyLiveOrCommit({ ...history.present, theme }, { live });
    },
    [history, applyLiveOrCommit],
  );

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragStart(event: DragStartEvent) {
    setActiveDragId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDragId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith("library-")) {
      const type = activeId.replace("library-", "") as BlockType;
      if (overId === "canvas-empty") {
        addBlock(type, 0);
        return;
      }
      const overIndex = history.present.blocks.findIndex((b) => b.id === overId);
      addBlock(type, overIndex === -1 ? undefined : overIndex + 1);
      return;
    }

    if (activeId === overId) return;
    const oldIndex = history.present.blocks.findIndex((b) => b.id === activeId);
    const newIndex = history.present.blocks.findIndex((b) => b.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    history.set({ ...history.present, blocks: arrayMove(history.present.blocks, oldIndex, newIndex) });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen flex-col">
        <Toolbar
          siteId={siteId}
          siteName={siteName}
          device={device}
          onDeviceChange={setDevice}
          canUndo={history.canUndo}
          canRedo={history.canRedo}
          onUndo={history.undo}
          onRedo={history.redo}
          autosaveStatus={autosave.status}
          onSaveNow={autosave.saveNow}
        />
        <div className="flex flex-1 overflow-hidden">
          <BlockLibraryPanel onAdd={(type) => addBlock(type)} />
          <Canvas
            theme={history.present.theme}
            blocks={history.present.blocks}
            device={device}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onFieldChange={updateBlockFieldByPath}
            onDuplicate={duplicateBlock}
            onDelete={deleteBlock}
            onToggleHidden={toggleBlockHidden}
          />
          <SettingsPanel
            theme={history.present.theme}
            onThemeChange={setTheme}
            selectedBlock={selectedBlock}
            onContentChange={updateSelectedContent}
            onSettingsChange={updateSelectedSettings}
          />
        </div>
      </div>
      <DragOverlay>
        {activeDragId ? <div className="rounded-lg bg-white px-3 py-2 text-sm shadow-lg">Moving block</div> : null}
      </DragOverlay>
    </DndContext>
  );
}
