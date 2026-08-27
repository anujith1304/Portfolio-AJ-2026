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
      className="relative mx-auto h-[7305px] w-[1904px]"
      style={canvasSurface}
    >
      {/* 5854:49627 — page-level backdrop, behind the section stack */}
      <Image
        src="/images/footer/footer-bg.png"
        alt=""
        width={3808}
        height={1424}
        className="absolute left-1/2 top-[6593px] h-[712px] w-screen min-w-[1904px] max-w-none -translate-x-1/2 object-cover"
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
        className="absolute left-1/2 top-[6578px] h-[794px] w-screen min-w-[1904px] -translate-x-1/2"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #FDFCF9 0%, rgba(253,251,249,0.5) 47.4%, rgba(253,251,249,0) 100%)",
        }}
      />

      <div className="relative flex flex-col items-start gap-[120px]">
        <Hero />
        <div className="ml-[49px]">
          <Bio />
        </div>
        <div className="ml-[49px]">
          <Works />
        </div>
        <div className="ml-[49px]">
          <About />
        </div>
        <div className="ml-[399px]">
          <Testimonials />
        </div>
        <Footer />
      </div>
    </main>
  );
}
