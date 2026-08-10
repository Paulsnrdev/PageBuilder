# Launch checklist

Manual pass to run through before shipping a change that touches the core flow. Use a real browser, not just the build.

## Account and sites

- [ ] Sign in with Google (or dev login in non-production)
- [ ] Create a site from each template, confirming none look broken or half-filled
- [ ] Create a blank site
- [ ] Free plan: confirm a second site is blocked with an upgrade prompt

## Editor

- [ ] Add, reorder (drag), duplicate, delete, and hide a block
- [ ] Click text on the canvas and edit it inline
- [ ] Upload an image via the Cloudinary widget
- [ ] Change a theme colour and font pairing, confirm it applies live
- [ ] Undo and redo
- [ ] Autosave indicator shows saving/saved; reload the page and confirm changes persisted

## Publishing

- [ ] Publish a site, open the public URL, confirm it matches the editor
- [ ] Edit the site without publishing again, confirming the public page is unchanged
- [ ] Set meta title, description, OG image and favicon; confirm they show in the page's `<head>`
- [ ] Share the public link in WhatsApp and confirm the preview card renders
- [ ] Unpublish and confirm the public URL 404s

## Leads

- [ ] Submit a contact form on the public site
- [ ] Confirm the success message (and WhatsApp link, if the site has a WhatsApp block) shows
- [ ] Confirm the lead appears in the dashboard leads table
- [ ] Confirm a notification email was sent to the site owner (if Resend is configured)
- [ ] Free plan: confirm CSV export is blocked with an upgrade prompt
- [ ] Pro/Business plan: confirm CSV export downloads and opens cleanly

## Billing

- [ ] Start checkout for Pro and Business, confirm redirect to Paystack
- [ ] Complete a test payment, confirm the plan updates on `/dashboard/billing`
- [ ] Confirm the site limit, custom domain access, branding, and lead export all reflect the new plan

## Custom domains

- [ ] Add a domain on a Pro/Business site, confirm the DNS instructions render
- [ ] Verify a domain once DNS is set, confirm status flips to verified
- [ ] Visit the site over the custom domain, confirm it renders the published version

## Error states

- [ ] Visit a nonexistent route, confirm the 404 page renders
- [ ] Visit `/s/some-unpublished-or-fake-slug`, confirm 404
- [ ] Trigger a server error (e.g. bad env var) and confirm the error boundary renders instead of a blank page
