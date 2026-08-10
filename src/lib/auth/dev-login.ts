// Dev-only email login so the app can be signed into locally before real
// Google OAuth credentials exist. Off by default in production; ENABLE_DEV_LOGIN
// lets it run against a local `next start` too, without ever being on for a
// real deploy unless someone deliberately sets that var there.
export const devLoginEnabled = process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_LOGIN === "true";
