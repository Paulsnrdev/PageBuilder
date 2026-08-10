"use client";

import Script from "next/script";
import { useState } from "react";

type CloudinaryUploadResult = { event: string; info?: { secure_url: string } };

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: CloudinaryUploadResult) => void,
      ) => { open: () => void };
    };
  }
}

type SignResponse = { signature: string; timestamp: number; apiKey: string; cloudName: string; folder: string };

export function CloudinaryUploadButton({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [scriptReady, setScriptReady] = useState(false);

  async function openWidget() {
    if (!window.cloudinary) return;

    const response = await fetch("/api/cloudinary/sign", { method: "POST" });
    if (!response.ok) return;
    const { signature, timestamp, apiKey, cloudName, folder } = (await response.json()) as SignResponse;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        apiKey,
        uploadSignature: signature,
        uploadSignatureTimestamp: timestamp,
        folder,
        sources: ["local", "url", "camera"],
        multiple: false,
      },
      (_error, result) => {
        if (result?.event === "success" && result.info) {
          onUploaded(result.info.secure_url);
        }
      },
    );

    widget.open();
  }

  return (
    <>
      <Script src="https://upload-widget.cloudinary.com/latest/global/all.js" onReady={() => setScriptReady(true)} />
      <button
        type="button"
        disabled={!scriptReady}
        onClick={openWidget}
        className="rounded border border-zinc-300 px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 disabled:opacity-50"
      >
        Upload image
      </button>
    </>
  );
}
