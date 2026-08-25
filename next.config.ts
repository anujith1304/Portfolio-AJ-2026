import type { NextConfig } from "next";

/**
 * The site is served from GitHub Pages at
 * https://anujith1304.github.io/Portfolio-AJ-2026/, which means:
 *  - `output: "export"` so `next build` emits a static `out/` directory
 *    (Pages cannot run a Node server);
 *  - `basePath` so every asset and link is prefixed with the repo name.
 *
 * basePath is applied only for production builds, so `npm run dev` still
 * serves from http://localhost:3000/ without the prefix.
 */
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Portfolio-AJ-2026" : "",
  trailingSlash: true,
  images: {
    // next/image's default loader needs a server; static export requires this.
    unoptimized: true,
  },
};

export default nextConfig;
