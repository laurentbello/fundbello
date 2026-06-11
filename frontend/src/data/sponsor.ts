/**
 * Self-served ad slot configuration.
 *
 * To run a sponsor: fill in `current` below and redeploy. To take ads down:
 * set `current` to `null` — the slot then shows a subtle "Advertise here"
 * placeholder that links to ADVERTISE_EMAIL, so it recruits advertisers for
 * you instead of going blank.
 *
 * This is a direct/self-sold slot (you keep 100%, no third-party scripts, no
 * cookie-consent banner needed). To switch to a network like Carbon Ads or
 * Google AdSense later, drop their <script>/<img> tag into SponsorSlot.tsx in
 * place of the sponsor markup — the placement stays the same.
 */

export interface Sponsor {
  /** Short brand name shown in bold. */
  name: string;
  /** One-line pitch, kept brief so the slot stays compact. */
  tagline: string;
  /** Destination URL (your advertiser's landing page). */
  href: string;
  /** Optional call-to-action label on the button (defaults to "Learn more"). */
  cta?: string;
}

/** Where "Advertise here" enquiries are sent. */
export const ADVERTISE_EMAIL = "laurentbello@gmail.com";

/**
 * Set to a Sponsor object to run an ad, or null to show the placeholder.
 * Example:
 *   export const current: Sponsor | null = {
 *     name: "Acme Brokerage",
 *     tagline: "Commission-free trading for serious investors.",
 *     href: "https://example.com",
 *     cta: "Open an account",
 *   };
 */
export const current: Sponsor | null = null;
