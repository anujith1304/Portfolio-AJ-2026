/**
 * The page surface — Figma frame fill for Portfolio(Home), Get My Stock and
 * Design System alike.
 *
 * All three frames carry the same two-layer fill: SOLID #FDFCF9 with an IMAGE
 * above it, `scaleMode: TILE`, `scalingFactor: 1`, sharing one hash
 * (b5e2ac8c…). The image is pure black at alpha 0-10, so it reads as a very
 * fine grain over the canvas colour rather than a picture. Tiling it at its
 * natural 1440x949 reproduces the frame fill.
 *
 * This is an inline style rather than a CSS class because a `url()` written in
 * a stylesheet is not rewritten for `basePath`. It would resolve to the domain
 * root and 404 on GitHub Pages — the same failure the images hit — so the
 * prefix is applied here, from the same value <Img> uses.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const canvasSurface = {
  backgroundColor: "#FDFCF9",
  backgroundImage: `url("${BASE}/images/canvas-texture.webp")`,
  backgroundRepeat: "repeat",
  backgroundSize: "1440px 949px",
} as const;
