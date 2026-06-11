import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: export plain HTML/CSS/JS to out/ so it can be
  // previewed locally (npx serve out) or hosted on any static host.
  output: "export",
};

export default nextConfig;
