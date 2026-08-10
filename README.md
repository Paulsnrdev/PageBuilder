# Page Builder

A drag-and-drop landing page builder for Nigerian small businesses. Build a one-page site from ready-made blocks, publish it to a subdomain or custom domain, and collect leads — no code required.

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

   See the environment checklist below for where each value comes from.

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

## Environment checklist

| Variable | Required for | Where to get it |
|---|---|---|
| `DATABASE_URL`, `DIRECT_URL` | Everything | Neon or Supabase project settings. `DATABASE_URL` is the pooled connection the app uses at runtime; `DIRECT_URL` is the non-pooled connection Prisma Migrate needs. |
| `AUTH_SECRET` | Sign-in | Generate with `npx auth secret`. |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Google sign-in | Google Cloud Console → OAuth client credentials. Not required if `ENABLE_DEV_LOGIN` is on. |
| `ENABLE_DEV_LOGIN` | Local/staging testing only | Set to `"true"` to enable an email-only login with no password. Never set this in a real production deploy. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image uploads in the editor | Cloudinary dashboard. |
| `RESEND_API_KEY` | Lead notification emails | Resend dashboard. Missing key: leads still save, the email is just skipped. |
| `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY` | Billing | Paystack dashboard → API keys. |
| `PAYSTACK_PRO_PLAN_CODE`, `PAYSTACK_BUSINESS_PLAN_CODE` | Billing | Create the Pro and Business plans in the Paystack dashboard first, then copy their plan codes here. |
| `VERCEL_API_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID` | Custom domains | Vercel account settings → tokens, and the project's own settings page. |
| `NEXT_PUBLIC_APP_URL` | Billing callback, sitemap, metadata | The site's full public URL, e.g. `https://yourapp.com`. |

Also add a webhook in the Paystack dashboard pointing at `/api/paystack/webhook` — it's what keeps subscriptions in sync after checkout.
