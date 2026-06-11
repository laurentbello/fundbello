import Script from "next/script";
import { CLOUDFLARE_TOKEN } from "@/data/analytics";

/**
 * Loads Cloudflare Web Analytics only when a token is configured. No cookies,
 * no personal data, no consent banner required. Renders nothing otherwise.
 */
export default function Analytics() {
  if (!CLOUDFLARE_TOKEN) return null;

  return (
    <Script
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_TOKEN })}
    />
  );
}
