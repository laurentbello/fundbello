/**
 * Privacy-friendly analytics configuration.
 *
 * Cloudflare Web Analytics is free, unlimited, sets no cookies and collects no
 * personal data — so it needs NO cookie-consent banner. To turn it on:
 *
 *   1. Sign up (free) at https://dash.cloudflare.com → Analytics → Web Analytics
 *   2. Add your site (laurentbello.github.io/fundbello) — no DNS change needed
 *   3. Copy the token from the snippet it gives you and paste it below
 *   4. Redeploy
 *
 * Until a token is set, no analytics script loads at all.
 *
 * Prefer GoatCounter instead (also free, no account approval)? Swap the script
 * in src/components/Analytics.tsx for its one-line snippet — the on/off gating
 * here stays the same.
 */
export const CLOUDFLARE_TOKEN = "";
