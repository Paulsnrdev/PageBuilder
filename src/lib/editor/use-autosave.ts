import { useCallback, useEffect, useRef, useState } from "react";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

/** Debounces `save(value)` on every change to `value`, skipping the initial mount. */
export function useAutosave<T>(value: T, save: (value: T) => Promise<unknown>, delayMs = 1500) {
  const [status, setStatus] = useState<AutosaveStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRun = useRef(true);
  const latestValue = useRef(value);
  const saveRef = useRef(save);

  useEffect(() => {
    saveRef.current = save;
    latestValue.current = value;
  }, [save, value]);

  const runSave = useCallback(async () => {
    setStatus("saving");
    try {
      await saveRef.current(latestValue.current);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(runSave, delayMs);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value, delayMs, runSave]);

  const saveNow = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    return runSave();
  }, [runSave]);

  return { status, saveNow };
}
