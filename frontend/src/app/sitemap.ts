import type { MetadataRoute } from "next";
import { investors, everTickerSlugs, aggregateStocks } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Every page Google should index: the main sections, each manager, each stock. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/activity", "/stocks", "/rankings", "/classification"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}/` })),
    ...investors.map((i) => ({ url: `${SITE_URL}/investors/${i.slug}/` })),
    ...[
      ...new Set([
        ...aggregateStocks().map((s) => s.tickerSlug),
        ...everTickerSlugs(),
      ]),
    ].map((t) => ({ url: `${SITE_URL}/stocks/${t}/` })),
  ];
}
