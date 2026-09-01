import type { NextConfig } from "next";

/**
 * The site is served from GitHub Pages at the apex domain https://anujiths.in/,
 * so:
 *  - `output: "export"` so `next build` emits a static `out/` directory
 *    (Pages cannot run a Node server);
 *  - no `basePath` — the site is at the domain root, not under a repo path.
 *
 * It previously carried basePath: "/Portfolio-AJ-2026" for the project-site URL
 * anujith1304.github.io/Portfolio-AJ-2026/. Attaching the custom domain moves
 * the site to the root, and leaving the prefix in place would 404 every asset
 * and route. That URL no longer serves the site.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // next/image's default loader needs a server; static export requires this.
    unoptimized: true,
  },
};

export default nextConfig;
