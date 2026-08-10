"use client";

import { useState, useTransition } from "react";

import { CloudinaryUploadButton } from "@/components/editor/fields/cloudinary-upload-button";
import { addCustomDomain, removeCustomDomain, verifyCustomDomain } from "@/lib/sites/domain-actions";
import { publishSite, unpublishSite, updateSiteSettings } from "@/lib/sites/actions";

type SiteSettings = {
  id: string;
  name: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
  faviconUrl: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  customDomain: string | null;
  customDomainVerifiedAt: string | null;
};

const inputClass = "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none";
const labelClass = "flex flex-col gap-1 text-sm";

export function SiteSettingsForm({ site, canUseCustomDomain }: { site: SiteSettings; canUseCustomDomain: boolean }) {
  const [form, setForm] = useState({
    name: site.name,
    slug: site.slug,
    metaTitle: site.metaTitle ?? "",
    metaDescription: site.metaDescription ?? "",
    ogImageUrl: site.ogImageUrl ?? "",
    faviconUrl: site.faviconUrl ?? "",
  });
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [publishState, setPublishState] = useState<"idle" | "busy">("idle");
  const [domain, setDomain] = useState("");
  const [domainState, setDomainState] = useState<"idle" | "busy" | "error">("idle");
  const [domainError, setDomainError] = useState("");
  const [isPublished, setIsPublished] = useState(site.isPublished);
  const [customDomain, setCustomDomain] = useState(site.customDomain);
  const [domainVerifiedAt, setDomainVerifiedAt] = useState(site.customDomainVerifiedAt);
  const [, startTransition] = useTransition();

  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/s/${form.slug}` : `/s/${form.slug}`;

  async function saveSettings() {
    setSaveState("saving");
    try {
      await updateSiteSettings(site.id, form);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  async function togglePublish() {
    setPublishState("busy");
    try {
      if (isPublished) {
        await unpublishSite(site.id);
        setIsPublished(false);
      } else {
        await publishSite(site.id);
        setIsPublished(true);
      }
    } finally {
      setPublishState("idle");
    }
  }

  async function handleAddDomain() {
    if (!domain.trim()) return;
    setDomainState("busy");
    setDomainError("");
    try {
      await addCustomDomain(site.id, domain.trim());
      setCustomDomain(domain.trim().toLowerCase());
      setDomainVerifiedAt(null);
      setDomain("");
    } catch (error) {
      setDomainError(error instanceof Error ? error.message : "Could not add domain");
    } finally {
      setDomainState("idle");
    }
  }

  async function handleVerifyDomain() {
    setDomainState("busy");
    setDomainError("");
    try {
      const result = await verifyCustomDomain(site.id);
      setDomainVerifiedAt(result.verified ? new Date().toISOString() : null);
      if (!result.verified) setDomainError("Not verified yet. DNS changes can take a while to propagate.");
    } catch (error) {
      setDomainError(error instanceof Error ? error.message : "Could not check domain status");
    } finally {
      setDomainState("idle");
    }
  }

  async function handleRemoveDomain() {
    setDomainState("busy");
    try {
      await removeCustomDomain(site.id);
      setCustomDomain(null);
      setDomainVerifiedAt(null);
    } finally {
      setDomainState("idle");
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-xl border border-zinc-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{isPublished ? "Published" : "Draft"}</p>
            <p className="text-xs text-zinc-500">
              {isPublished ? (
                <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {publicUrl}
                </a>
              ) : (
                "Not visible to anyone yet."
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={togglePublish}
            disabled={publishState === "busy"}
            className={`rounded-full px-5 py-2 text-sm font-medium transition disabled:opacity-50 ${
              isPublished ? "border border-zinc-300 hover:bg-zinc-50" : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-400">Basics</h2>
        <label className={labelClass}>
          Site name
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </label>
        <label className={labelClass}>
          URL
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          />
        </label>
        <label className={labelClass}>
          Meta title
          <input
            className={inputClass}
            value={form.metaTitle}
            onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
          />
        </label>
        <label className={labelClass}>
          Meta description
          <textarea
            className={inputClass}
            rows={3}
            value={form.metaDescription}
            onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
          />
        </label>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <p className="font-medium">Open Graph image</p>
            <CloudinaryUploadButton onUploaded={(url) => setForm((f) => ({ ...f, ogImageUrl: url }))} />
          </div>
          {form.ogImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.ogImageUrl} alt="" className="h-28 w-full rounded-lg border border-zinc-200 object-cover" />
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <p className="font-medium">Favicon</p>
            <CloudinaryUploadButton onUploaded={(url) => setForm((f) => ({ ...f, faviconUrl: url }))} />
          </div>
          {form.faviconUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.faviconUrl} alt="" className="h-10 w-10 rounded border border-zinc-200 object-cover" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => startTransition(saveSettings)}
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Save
          </button>
          {saveState === "saving" && <span className="text-xs text-zinc-400">Saving...</span>}
          {saveState === "saved" && <span className="text-xs text-zinc-400">Saved</span>}
          {saveState === "error" && <span className="text-xs text-red-500">Could not save</span>}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-400">Custom domain</h2>

        {!canUseCustomDomain ? (
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 text-sm">
            <p className="text-zinc-500">Custom domains need a Pro or Business plan.</p>
            <a href="/dashboard/billing" className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800">
              Upgrade
            </a>
          </div>
        ) : !customDomain ? (
          <div className="flex gap-3">
            <input
              className={inputClass}
              placeholder="www.yourbusiness.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddDomain}
              disabled={domainState === "busy"}
              className="shrink-0 rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50"
            >
              Add domain
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-medium">{customDomain}</p>
              <span className={domainVerifiedAt ? "text-green-600" : "text-amber-600"}>
                {domainVerifiedAt ? "Verified" : "Pending verification"}
              </span>
            </div>
            {!domainVerifiedAt && (
              <div className="rounded-md bg-zinc-50 p-3 text-xs text-zinc-600">
                <p className="font-medium">Add this DNS record at your domain provider:</p>
                <p className="mt-1 font-mono">CNAME {customDomain} → cname.vercel-dns.com</p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleVerifyDomain}
                disabled={domainState === "busy"}
                className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-medium hover:bg-zinc-50 disabled:opacity-50"
              >
                Check status
              </button>
              <button
                type="button"
                onClick={handleRemoveDomain}
                disabled={domainState === "busy"}
                className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
            {domainError && <p className="text-xs text-red-500">{domainError}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
