# Page Builder

A drag-and-drop landing page builder for Nigerian small businesses. Build a one-page site from ready-made blocks, publish it to a subdomain or custom domain, and collect leads — no code required.

## Status

Early development (Phase 1 — schema and skeleton). Block rendering, the editor, publishing, and billing are not built yet. See [04-page-builder.md](04-page-builder.md) for the full build plan.

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS**
- **Prisma** + **PostgreSQL** (Neon / Supabase)
- **Auth.js** — Google sign-in
- **Cloudinary** — image uploads
- **Resend** — transactional email
- **Paystack** — billing
- **Vercel** — hosting + Domains API for custom domains

## Data model

- `Site` — a user's page: slug, custom domain, theme (colours/fonts/spacing), publish state
- `Block` — one of 15 types (Hero, Text, Image, Gallery, Features, Testimonials, Pricing, FAQ, CTA, Contact Form, WhatsApp Button, Video Embed, Social Links, Footer, Spacer), each with its own `content` shape validated by Zod
- `Lead` — a contact form submission tied to a site and block
- `Subscription` — Paystack plan and billing status per user

See [prisma/schema.prisma](prisma/schema.prisma) and [src/lib/blocks/schema.ts](src/lib/blocks/schema.ts).

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in your own values:

   ```bash
   cp .env.example .env
   ```

   You'll need credentials for Postgres, Auth.js, Cloudinary, Resend, Paystack, and Vercel — see [.env.example](.env.example) for the full list.

3. Run migrations and generate the Prisma client:

   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |
