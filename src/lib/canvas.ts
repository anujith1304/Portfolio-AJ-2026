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
 * Kept as an inline style rather than a CSS class: a `url()` written in a
 * stylesheet is not rewritten for `basePath`, so this needed the prefix applied
 * by hand under the old /Portfolio-AJ-2026/ deploy. The site now serves from
 * the apex domain and the path is correct as written, but leaving it here keeps
 * the one place that would need the prefix back if that ever changes.
 */

export const canvasSurface = {
  backgroundColor: "#FDFCF9",
  backgroundImage: 'url("/images/canvas-texture.webp")',
  backgroundRepeat: "repeat",
  backgroundSize: "1440px 949px",
} as const;
