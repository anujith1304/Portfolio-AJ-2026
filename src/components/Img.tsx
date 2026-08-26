import NextImage, { type ImageProps } from "next/image";

/**
 * Drop-in replacement for next/image that resolves `/public` paths against
 * the deploy's basePath.
 *
 * Next prefixes basePath onto next/link hrefs and onto everything it serves
 * from /_next/ — JS, CSS, fonts — but not onto a plain string `src` given to
 * next/image. With `unoptimized: true` (required by `output: "export"`) that
 * src is written to the HTML verbatim, so "/images/hero-bg.png" stays
 * absolute and resolves to the domain root. Locally that is correct and
 * everything renders; on GitHub Pages the site lives under
 * /Portfolio-AJ-2026/, so every one of those requests 404s while the files
 * themselves sit there perfectly intact one level down.
 *
 * Prefixing here rather than at each call site keeps the ~30 usages honest
 * and means any image added later inherits the fix.
 *
 * Only root-relative strings are touched. Absolute URLs and static imports
 * (StaticImageData) already carry the right prefix and are passed through.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Img({ src, ...rest }: ImageProps) {
  const resolved =
    typeof src === "string" && src.startsWith("/") && !src.startsWith(BASE)
      ? `${BASE}${src}`
      : src;

  return <NextImage src={resolved} {...rest} />;
}
