import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: export plain HTML/CSS/JS to out/ so it can be
  // previewed locally (npx serve out) or hosted on any static host.
  output: "export",
  // Directory-style URLs (investors/index.html) so GitHub Pages can serve
  // routes without extension rewrites.
  trailingSlash: true,
  // Set by the deploy workflow when hosting under a subpath
  // (e.g. /fundbello on GitHub Pages). Unset for local dev.
  basePath: process.env.NEXT_BASE_PATH,
};

export default nextConfig;
