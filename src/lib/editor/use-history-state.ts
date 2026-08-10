import { useCallback, useRef, useState } from "react";

/**
 * State with undo/redo. `set` pushes an immediate history entry (for
 * discrete actions like add/delete/reorder). `setLive` + `commitLive` are for
 * continuous input (typing): every keystroke updates the visible state via
 * setLive, but only one history entry is pushed, when commitLive() runs on
 * blur, covering the whole edit as a single undo step.
 */
export function useHistoryState<T>(initial: T) {
  const [present, setPresent] = useState(initial);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const pendingSnapshot = useRef<T | null>(null);

  const set = useCallback(
    (next: T) => {
      past.current.push(present);
      future.current = [];
      setPresent(next);
      setCanUndo(true);
      setCanRedo(false);
    },
    [present],
  );

  const setLive = useCallback(
    (next: T) => {
      if (pendingSnapshot.current === null) pendingSnapshot.current = present;
      setPresent(next);
    },
    [present],
  );

  const commitLive = useCallback(() => {
    if (pendingSnapshot.current === null) return;
    past.current.push(pendingSnapshot.current);
    future.current = [];
    pendingSnapshot.current = null;
    setCanUndo(true);
    setCanRedo(false);
  }, []);

  const undo = useCallback(() => {
    const previous = past.current.pop();
    if (previous === undefined) return;
    future.current.push(present);
    setPresent(previous);
    setCanUndo(past.current.length > 0);
    setCanRedo(true);
  }, [present]);

  const redo = useCallback(() => {
    const next = future.current.pop();
    if (next === undefined) return;
    past.current.push(present);
    setPresent(next);
    setCanRedo(future.current.length > 0);
    setCanUndo(true);
  }, [present]);

  return { present, set, setLive, commitLive, undo, redo, canUndo, canRedo };
}
