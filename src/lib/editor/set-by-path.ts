/** Immutably sets a string value at a dot path (supports numeric array indices, e.g. "items.0.title"). */
export function setByPath<T>(obj: T, path: string, value: string): T {
  const keys = path.split(".");
  const clone = structuredClone(obj) as Record<string, unknown>;

  let cursor: Record<string, unknown> = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    cursor = cursor[keys[i]] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;

  return clone as T;
}
