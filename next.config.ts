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
const basePath = isProd ? "/Portfolio-AJ-2026" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // next/image's default loader needs a server; static export requires this.
    unoptimized: true,
  },
  /*
   * basePath is applied automatically to next/link hrefs and to everything
   * under /_next/ (JS, CSS, fonts), but NOT to a plain string `src` on
   * next/image — and with `unoptimized: true` the src is emitted verbatim,
   * so /images/x.png stays /images/x.png and 404s under a basePath deploy.
   * Exposing the value here lets <Img> prefix those srcs itself.
   */
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
