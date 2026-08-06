# Product 4 — Landing Page Builder

**Repo name:** `pagebuilder`
**Build time:** 2–3 weeks
**What it is:** Drag and drop a one-page website. Publish to a subdomain or a custom domain.

The block editor you build here gets reused in Product 8 (store builder). Build it well and you save a week later.

---

## Accounts to create first

| Service | What for | Note |
|---|---|---|
| Neon or Supabase | New database | |
| Cloudinary | Images throughout | You'll lean on this heavily |
| Resend | Login, lead notifications | |
| Paystack | Billing | |
| Google Cloud Console | Sign-in | |
| Vercel | Hosting + **Domains API** | Get an API token for custom domain verification |

**Read before Phase 4:** Vercel's domains API. Custom domain support is a Pro-plan selling point and it's fiddly.

## Start the repo

```bash
mkdir pagebuilder && cd pagebuilder
git init
code .
```

---

## Phase 1 — Setup and schema

The block type union in this phase is the foundation of everything. If it's wrong, the editor and renderer will both fight you.

```
I'm building a landing page builder for Nigerian small businesses. Same stack as my previous projects: Next.js 15 App Router, TypeScript, Tailwind, Prisma, PostgreSQL, Auth.js, Paystack, Cloudinary, Vercel.

Set up the skeleton, then this schema:

- User (+ Auth.js tables)
- Site: id, userId, name, slug (unique), customDomain, faviconUrl, metaTitle, metaDescription, ogImageUrl, isPublished, publishedAt, theme (JSON: colours, fonts, spacing scale)
- Block: id, siteId, type, content (JSON), settings (JSON), sortOrder
- Lead: id, siteId, blockId, data (JSON), submittedAt, ipHash
- Subscription: id, userId, paystackCustomerCode, paystackSubscriptionCode, plan, status, currentPeriodEnd

Block types to support: HERO, TEXT, IMAGE, GALLERY, FEATURES, TESTIMONIALS, PRICING, FAQ, CTA, CONTACT_FORM, WHATSAPP_BUTTON, VIDEO_EMBED, SOCIAL_LINKS, FOOTER, SPACER.

Define a TypeScript discriminated union for block content, one shape per type, and a matching Zod schema for each. Everything downstream depends on this being right — take care over it.
```

**Check:** read the generated type definitions yourself. Ask "could I store a hero section in this shape?" for each block type.

---

## Phase 2 — Block rendering

Build the renderer before the editor. It's easier to make an editor for components that already exist than the reverse.

```
Build the block rendering system before the editor.

- A React component per block type in /components/blocks
- A `BlockRenderer` that takes a block and renders the right component
- Each block reads colours, fonts, and spacing from the site theme via CSS variables so a theme change updates everything
- Every block must be responsive and look decent with placeholder content
- Build a /preview/demo route rendering every block type with sample data, so I can see them all at once

Design guidance: clean, modern, generous whitespace. Two font pairings to choose from. Don't make it look like a 2010 template.
```

**Check:** open `/preview/demo` on desktop and phone. Every block should look like something you'd be willing to charge for. Iterate here before moving on — this is the product's visible quality.

---

## Phase 3 — Editor

```
Build the editor at /dashboard/sites/[id]/edit.

- Left: block library, click or drag to add
- Centre: live canvas showing the real rendered page, with device toggles (mobile, tablet, desktop)
- Right: settings for the selected block
- Drag to reorder blocks, duplicate, delete, hide
- Click text directly on the canvas to edit it inline
- Image fields open a Cloudinary upload widget
- A theme panel for colours and fonts, applying live
- Undo and redo
- Autosave with a saved indicator, plus manual save

Mobile: this editor is desktop-first. On small screens show a message suggesting a larger screen, but keep the site list and publish controls usable.
```

**Check:** build a full page for a fictional business using only the editor. If anything makes you reach for the database directly, fix it.

---

## Phase 4 — Publishing

```
Build publishing and the public site.

- Public page at /s/[slug], statically generated, revalidated on publish
- Publish and unpublish, with the published version separate from the draft so edits don't go live until published
- Correct meta tags, Open Graph image, favicon
- Custom domain support: let a user add a domain, show them the DNS records to set (CNAME to cname.vercel-dns.com), verify it via the Vercel domains API, show verification status
- Contact form blocks submit to a server action, store a Lead, email the owner, and optionally open WhatsApp
- WhatsApp button block: floating or inline, prefilled message
- /dashboard/sites/[id]/leads: table of submissions with CSV export
```

**Check:** publish a page, share the link in WhatsApp, confirm the preview card renders. Submit the contact form and confirm the lead lands.

---

## Phase 5 — Templates, billing, launch

```
Add:

Templates — five starter templates (restaurant, salon, consultant, event, product launch), each a preset arrangement of blocks with real-looking Nigerian sample content. New site flow starts from a template or blank.

Paystack billing:
- Free: 1 site, subdomain only, our branding in the footer
- Pro ₦6,000/month: 5 sites, custom domain, no branding, lead export
- Business ₦15,000/month: unlimited sites, priority support

Then marketing homepage, SEO, error states, Vercel config, environment checklist, test script.
```

**Check:** create a site from each template and confirm none of them look broken or half-filled.

---

## Done when

You build a page from a template, publish it, point a real domain at it, and receive a lead from the contact form.

**Note:** the templates matter more than the features here. Nobody buys a page builder because of its block count — they buy it because the first template they saw looked good. Spend real time on those five.
