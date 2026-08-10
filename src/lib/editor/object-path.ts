export type PathSegment = string | number;

export function getAtPath(obj: unknown, path: PathSegment[]): unknown {
  return path.reduce<unknown>((cursor, key) => {
    if (cursor === null || cursor === undefined) return undefined;
    return (cursor as Record<PathSegment, unknown>)[key];
  }, obj);
}

/** Immutably sets a value at an arbitrary path (object keys and/or array indices). */
export function setAtPath<T>(obj: T, path: PathSegment[], value: unknown): T {
  if (path.length === 0) return value as T;

  const [key, ...rest] = path;
  const clone = (Array.isArray(obj) ? [...obj] : { ...(obj as Record<PathSegment, unknown>) }) as Record<
    PathSegment,
    unknown
  >;

  clone[key] = rest.length === 0 ? value : setAtPath(clone[key], rest, value);

  return clone as T;
}
