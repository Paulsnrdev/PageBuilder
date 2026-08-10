"use client";

import { createContext, useContext } from "react";

type EditorMode = {
  /** Called on blur with the field's dot path (e.g. "headline", "items.0.title") and its new text. */
  onFieldChange: (path: string, value: string) => void;
};

const EditorModeContext = createContext<EditorMode | null>(null);

export const EditorModeProvider = EditorModeContext.Provider;

/** Returns the editing callbacks when rendered inside the editor canvas, or null on the public site. */
export function useEditorMode() {
  return useContext(EditorModeContext);
}
