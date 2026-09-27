import manifest from "./image-manifest.json";

/**
 * Points next/image at the widths built by scripts/optimize-images.mjs.
 *
 * A static export has no /_next/image to resize on demand, so the work happens
 * at build time and this only has to choose. next/image still does everything
 * else it normally would — the srcset, the density candidates, the lazy
 * loading — which is why no call site had to change.
 *
 * Anything absent from the manifest is returned untouched, which is the
 * correct answer for SVG and for the animated WebP the build step leaves
 * alone rather than flattening to its first frame.
 */
const widthsFor = manifest as Record<string, number[]>;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const widths = widthsFor[src];
  if (!widths) return src;

  /* Smallest build that still covers the requested width; the largest we have
     if the request runs past it, since upscaling was never generated. */
  const picked = widths.find((w) => w >= width) ?? widths[widths.length - 1];

  return `${src.replace(/^\/images\//, "/images/_opt/").replace(/\.[^.]+$/, "")}.${picked}.webp`;
}
