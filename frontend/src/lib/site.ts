/**
 * Public address of the site, used for the sitemap, robots.txt and link
 * previews. Set SITE_URL in the deploy workflow; change it there when the
 * site moves to its own domain.
 */
export const SITE_URL = (
  process.env.SITE_URL ?? "https://laurentbello.github.io/fundbello"
).replace(/\/$/, "");
