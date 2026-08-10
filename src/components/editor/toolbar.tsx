import Link from "next/link";
import { FaArrowLeft, FaDesktop, FaMobileScreenButton, FaRotateLeft, FaRotateRight, FaTabletScreenButton } from "react-icons/fa6";

import type { AutosaveStatus } from "@/lib/editor/use-autosave";
import type { Device } from "@/lib/editor/types";

const devices: { id: Device; icon: typeof FaDesktop; label: string }[] = [
  { id: "mobile", icon: FaMobileScreenButton, label: "Mobile" },
  { id: "tablet", icon: FaTabletScreenButton, label: "Tablet" },
  { id: "desktop", icon: FaDesktop, label: "Desktop" },
];

const statusLabel: Record<AutosaveStatus, string> = {
  idle: "",
  saving: "Saving...",
  saved: "Saved",
  error: "Couldn't save",
};

export function Toolbar({
  siteId,
  siteName,
  device,
  onDeviceChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  autosaveStatus,
  onSaveNow,
}: {
  siteId: string;
  siteName: string;
  device: Device;
  onDeviceChange: (device: Device) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  autosaveStatus: AutosaveStatus;
  onSaveNow: () => void;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/sites" className="text-zinc-400 hover:text-zinc-900">
          <FaArrowLeft size={14} />
        </Link>
        <span className="text-sm font-medium">{siteName}</span>
      </div>

      <div className="flex items-center gap-1 rounded-full bg-zinc-100 p-1">
        {devices.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onDeviceChange(id)}
            aria-label={label}
            className={`flex h-8 w-9 items-center justify-center rounded-full transition ${
              device === id ? "bg-white shadow" : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 disabled:opacity-30"
        >
          <FaRotateLeft size={13} />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          aria-label="Redo"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 disabled:opacity-30"
        >
          <FaRotateRight size={13} />
        </button>

        <span className="w-20 text-xs text-zinc-400">{statusLabel[autosaveStatus]}</span>

        <Link
          href={`/dashboard/sites/${siteId}/settings`}
          className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium transition hover:bg-zinc-50"
        >
          Settings
        </Link>

        <button
          type="button"
          onClick={onSaveNow}
          className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Save
        </button>
      </div>
    </header>
  );
}
