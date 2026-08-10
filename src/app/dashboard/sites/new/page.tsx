import Link from "next/link";

import { NewSiteForm } from "@/components/dashboard/new-site-form";
import { templates } from "@/lib/templates";

export default function NewSitePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link href="/dashboard/sites" className="text-sm text-zinc-500 hover:text-zinc-900">
        ← Sites
      </Link>
      <h1 className="mt-1 text-2xl font-semibold">Start a new site</h1>
      <p className="mt-1 text-sm text-zinc-500">Pick a template to start with real content, or start blank.</p>
      <NewSiteForm
        templates={templates.map((template) => ({
          id: template.id,
          name: template.name,
          description: template.description,
          previewImageUrl: template.previewImageUrl,
        }))}
      />
    </div>
  );
}
