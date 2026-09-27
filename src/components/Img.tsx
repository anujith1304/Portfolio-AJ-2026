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
 *
 * It now also supplies `sizes`, which is what makes the responsive set worth
 * building. Without it next/image describes an image only by density — the
 * declared width at 1x and 2x — so a phone showing a card 434px wide still
 * downloaded the 1748px file, four times the pixels it could use. `sizes`
 * tells the browser the display width instead, and it picks off the ladder.
 *
 * The value is derived rather than written out per call site because above the
 * breakpoint the layout makes that sound: every section is drawn on a 1905px
 * canvas scaled by --u, so an image declared N wide occupies N/1905 of the
 * viewport whatever the window is doing.
 *
 * Below the breakpoint that reasoning fails, and it fails in the direction
 * that shows. The photo carousel is declared 607 — a third of the canvas —
 * but goes nearly full width on a phone, so a single canvas-derived figure
 * asked for 180px to fill 458 and the browser duly picked a file too small to
 * be sharp. Under the breakpoint the layout stacks and most things run close
 * to full width, so that half is a flat 92vw. Where that over-states a small
 * tile the cost is bounded by the source, which for those is small; getting
 * it wrong the other way is a visibly soft image. Pass `sizes` to override.
 */
const CANVAS = 1905;

/** Matches --breakpoint-xl, where the canvas layout takes over from the stack. */
const XL = "64rem";

export default function Img(props: ImageProps) {
  const { sizes, width, fill } = props;

  if (sizes === undefined && !fill && typeof width === "number") {
    const onCanvas = Math.min(100, Math.ceil((width / CANVAS) * 100) + 4);
    return (
      <NextImage {...props} sizes={`(min-width: ${XL}) ${onCanvas}vw, 92vw`} />
    );
  }

  return <NextImage {...props} />;
}
