import NextImage, { type ImageProps } from "next/image";

/**
 * Thin wrapper over next/image.
 *
 * It used to prefix root-relative `src` strings with the deploy's basePath:
 * Next prefixes basePath onto next/link hrefs and onto everything under
 * /_next/, but not onto a plain string src given to next/image, and with
 * `unoptimized: true` that src is written to the HTML verbatim. Under the old
 * /Portfolio-AJ-2026/ deploy every one of those requests 404d.
 *
 * The site now serves from the apex domain, so there is no prefix to apply and
 * a root-relative src is already correct. The wrapper is kept so the ~30 call
 * sites stay on one import — and so a future basePath deploy has one place to
 * reintroduce the prefix rather than thirty.
 */
export default function Img(props: ImageProps) {
  return <NextImage {...props} />;
}
