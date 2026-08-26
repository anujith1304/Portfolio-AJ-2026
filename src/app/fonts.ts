import localFont from "next/font/local";
import { Figtree } from "next/font/google";

/**
 * Fonts read from Figma frame 5826:24084.
 *
 * Satoshi and Figtree are free to serve. Recoleta is licensed (Latinotype)
 * and self-hosted from a subset built out of the licensed desktop OTF —
 * see the note on `recoleta` below. Circular Std is still unlicensed here,
 * so it remains a name-only stack.
 */

/** Satoshi — body, navigation, and most UI. Weights 300/400/500/700. */
export const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "../fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
});

/** Figtree — the Resume button label (Figtree Medium 16). */
export const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

/**
 * Recoleta Alt Medium 72 — the hero display face.
 *
 * Built from the licensed LttRecoleta-Medium.otf, subset to Latin and
 * converted to woff2. "Recoleta Alt" is not a separate family: it is
 * Recoleta with stylistic set 02 applied — ss02 swaps a/e/g/y for the
 * alternate forms, which was verified by matching the ss02 outlines
 * against the Recoleta Alt release (a: 550 vs 550, y: 497 vs 499, where
 * the default forms are 520 and 528). So the Alt look comes from
 * `font-feature-settings: "ss02"`, applied in `displayFontFeature` below.
 *
 * The Fontspring "Recoleta Alt Medium" demo file is deliberately NOT used:
 * it carries only 96 glyphs, has no curly apostrophe (U+2019, which the
 * hero headline needs), and watermarks the straight quote.
 */
export const recoleta = localFont({
  variable: "--font-recoleta",
  display: "swap",
  src: [
    { path: "../fonts/RecoletaAlt-Medium.woff2", weight: "500", style: "normal" },
  ],
  fallback: ["Georgia", "serif"],
});

/** Turns Recoleta into Recoleta Alt. Pair with the `font-display` family. */
export const displayFontFeature = '"ss02" 1';

/**
 * Circular Std — testimonials, the contact block, and several About labels.
 * Figma uses the "Book" style, which is usWeightClass 450 (not 400) — the
 * weights below are the font's real weight classes, so `font-[450]` selects
 * Book, `font-medium` selects Medium and `font-bold` selects Bold.
 */
export const circular = localFont({
  variable: "--font-circular-std",
  display: "swap",
  src: [
    { path: "../fonts/CircularStd-Book.woff2", weight: "450", style: "normal" },
    { path: "../fonts/CircularStd-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/CircularStd-Bold.woff2", weight: "700", style: "normal" },
  ],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
