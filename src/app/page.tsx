import Image from "@/components/Img";
import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { Works } from "@/components/sections/Works";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";
import { canvasSurface } from "@/lib/canvas";

/**
 * Home — Figma 5854:49620 "Portfolio(Home)", 1904x7305.
 *
 * The wrapper (5854:49628) has layoutMode NONE, so its children are placed
 * absolutely. Their y offsets work out to a constant 120px gap:
 *   hero    0    +742  -> 742    bio starts 862  (gap 120)
 *   bio     862  +808  -> 1670   works starts 1790 (gap 120)
 *   works   1790 +1366 -> 3156   about starts 3276 (gap 120)
 *   about   3276 +1614 -> 4890   testim. starts 5010 (gap 120)
 *   testim. 5010 +1448 -> 6458   footer starts 6578 (gap 120)
 *
 * So this is a flex column with gap 120. The x offsets are NOT centring —
 * the 1808-wide sections sit at x=49, where centring would put them at 48 —
 * so each section carries its explicit Figma left offset instead.
 *
 * The footer scrolls with the page like every other section. Its backdrop
 * ("image 163", 5854:49627) is a sibling of the section wrapper rather than a
 * child of the footer, painted behind everything at y=6593, so it and the
 * gradient panel above it are placed here instead of inside <Footer />. Both
 * bleed to the window edge, which is why the overlay is measured from the
 * page rather than confined to the 1905-wide frame.
 */
export default function Home() {
  return (
    <main
      className="relative mx-auto w-full overflow-x-clip xl:h-[calc(7305*var(--u))] xl:w-[calc(1904*var(--u))] xl:overflow-x-visible"
      style={canvasSurface}
    >
      {/*
        5854:49627 — page-level backdrop, behind the section stack.

        Masked to fade in over its own top edge. The gradient panel below is
        only ~89% opaque where the image starts (the image begins 82px into a
        794px gradient whose first stop is solid), so the artwork appeared at
        11% strength in a single step against the fully-cream row above it —
        a hard line across the page. Fading the image itself removes the edge
        at source and leaves the Figma gradient on its own coordinates.
      */}
      <Image
        src="/images/footer/footer-bg.png"
        alt=""
        width={3808}
        height={1424}
        className="pointer-events-none absolute bottom-0 left-1/2 h-[712px] w-screen max-w-none -translate-x-1/2 object-cover xl:top-[calc(6593*var(--u))] xl:min-w-[calc(1904*var(--u))] xl:h-[calc(712*var(--u))]"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0px, rgba(0,0,0,0.55) 90px, #000 190px)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0px, rgba(0,0,0,0.55) 90px, #000 190px)",
        }}
      />

      {/*
        5854:51581 — the gradient that fades the backdrop in behind the footer
        copy. Figma nests it in the footer frame, but the backdrop it covers is
        the page-level image above, which bleeds to the window edge. Kept
        inside the 1905-wide frame it left the image bare down both sides and
        across the bottom 15px, so it is bled to match. Geometry is Figma's: it
        starts at the footer's own top (6578) and runs its full 794px.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[794px] w-screen max-w-none -translate-x-1/2 xl:top-[calc(6511*var(--u))] xl:bottom-auto xl:min-w-[calc(1904*var(--u))] xl:h-[calc(794*var(--u))]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #FDFCF9 0%, rgba(253,251,249,0.5) 47.4%, rgba(253,251,249,0) 100%)",
        }}
      />

      <div className="relative flex flex-col items-stretch gap-[64px] md:gap-[88px] xl:items-start xl:gap-[calc(120*var(--u))]">
        <Hero />
        <div className="xl:ml-[calc(49*var(--u))]">
          <Bio />
        </div>
        <div className="xl:ml-[calc(49*var(--u))]">
          <Works />
        </div>
        <div className="xl:ml-[calc(49*var(--u))]">
          <About />
        </div>
        <div className="xl:ml-[calc(399*var(--u))]">
          <Testimonials />
        </div>
        <Footer />
      </div>
    </main>
  );
}
