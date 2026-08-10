"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium text-zinc-400">Something went wrong</p>
      <h1 className="text-2xl font-semibold">We hit a snag</h1>
      <p className="max-w-sm text-sm text-zinc-500">
        Try again, or come back in a moment. If this keeps happening, let us know what you were doing.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Try again
      </button>
    </div>
  );
}
