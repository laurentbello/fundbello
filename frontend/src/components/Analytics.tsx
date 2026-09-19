import Script from "next/script";
import {
  CLOUDFLARE_TOKEN,
  GA_MEASUREMENT_ID,
  PLAUSIBLE_DOMAIN,
} from "@/data/analytics";

/**
 * Loads analytics only when configured in src/data/analytics.ts.
 * Renders nothing otherwise.
 */
export default function Analytics() {
  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
      {PLAUSIBLE_DOMAIN && (
        <Script
          strategy="afterInteractive"
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      )}
      {CLOUDFLARE_TOKEN && (
        <Script
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_TOKEN })}
        />
      )}
    </>
  );
}
