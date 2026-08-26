import Image from "@/components/Img";
import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { Works } from "@/components/sections/Works";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

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
 * "image 163" (5854:49627) is a sibling of that wrapper, not a child of the
 * footer, and is painted behind everything at y=6593 — hence the absolute
 * placement below rather than inside <Footer />.
 */
export default function Home() {
  return (
    <main className="relative mx-auto w-[1904px]">
      <div className="relative z-10 flex flex-col items-start gap-[120px] bg-canvas pb-[120px]">
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
      </div>
      {/* Uncovers the fixed footer at the end of the scroll. */}
      <div className="h-[712px]" aria-hidden />

      {/*
        The footer is pinned to the bottom of the viewport and the rest of the
        page scrolls over it, so it is revealed rather than scrolled through.
        Its backdrop ("image 163", 5854:49627) and the gradient panel
        (5854:51581) travel with it — all three are one fixed layer at z-0,
        behind the scrolling stack, which carries its own canvas background.
        The 712px spacer at the end of the stack is what uncovers it.
      */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[712px]">
        <Image
          src="/images/footer/footer-bg.png"
          alt=""
          width={3808}
          height={1424}
          className="absolute left-1/2 top-0 h-[712px] w-screen min-w-[1904px] max-w-none -translate-x-1/2 object-cover"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[-15px] h-[794px] w-screen min-w-[1904px] -translate-x-1/2"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FDFCF9 0%, rgba(253,251,249,0.5) 47.4%, rgba(253,251,249,0) 100%)",
          }}
        />
        <div className="pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2">
          <Footer />
        </div>
      </div>
    </main>
  );
}
