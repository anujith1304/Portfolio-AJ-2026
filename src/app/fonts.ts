import localFont from "next/font/local";
import { Figtree } from "next/font/google";

/**
 * Fonts read from Figma frame 5826:24084.
 *
 * Satoshi and Figtree are free to serve, so they are loaded properly here.
 * Recoleta Alt and Circular Std are commercial (Latinotype / Lineto) and
 * cannot be redistributed, so no files ship in this repo — see the note on
 * `display` below.
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
 * Commercial, so there is nothing to load. The stack names it first so a
 * machine with it installed renders the real face; everyone else falls
 * through. Once the licensed woff2 exists at ../fonts/RecoletaAlt-Medium.woff2,
 * swap this for a localFont() call.
 *
 * Deliberately NOT declared via @font-face against a missing file: a declared
 * face whose src 404s claims the family name and stops the stack falling
 * through to the next entry.
 */
export const displayFontStack =
  '"Recoleta Alt", "Recoleta", "Ltt Recoleta", Georgia, serif';

/** Circular Std — used in the About section. Also commercial. */
export const circularFontStack =
  '"Circular Std", "Satoshi", ui-sans-serif, system-ui, sans-serif';
