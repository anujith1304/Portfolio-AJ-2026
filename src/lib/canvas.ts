/**
 * The page surface — Figma frame fill for Portfolio(Home), Get My Stock and
 * Design System alike.
 *
 * All three frames carry the same two-layer fill: SOLID #FDFCF9 with an IMAGE
 * above it, `scaleMode: TILE`, `scalingFactor: 1`, sharing one hash
 * (b5e2ac8c…). The image is pure black at alpha 0-10, so it reads as a very
 * fine grain over the canvas colour rather than a picture. Tiling it at its
 * natural size reproduced the frame fill.
 *
 * That sheet is 1440x949 and cost 219KB, fetched on every page before much
 * else could paint, for a texture nobody consciously sees. The grain is
 * random, so it carries no structure worth preserving: this is a 480x316 crop
 * of it, tiled more often. Each noise pixel is still one CSS pixel, so the
 * grain itself is identical and only the repeat period shortens — 24KB.
 * Cropped rather than resized; resizing would have averaged the grain away.
 * backgroundSize has to track the crop, or the texture scales up and coarsens.
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
  backgroundSize: "480px 316px",
} as const;
