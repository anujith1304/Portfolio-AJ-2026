import Image from "next/image";
import Link from "next/link";

/**
 * Works — Figma 5854:49861 "Frame 2147228578".
 * 1808x1366, VERTICAL, gap 48.
 *
 *  - Header 5854:49862: 1808x90, HORIZONTAL, SPACE_BETWEEN / CENTER.
 *  - Grid   5854:49876: 1808x1228, four 893x602 cards at
 *    (0,0) (916,0) (0,626) (916,626).
 *
 * Each card is a white r24 shell holding an #f8f8f8 r16 header bar
 * (877x64 at 8,8) and an r16 preview (874x514 at 8,80). The previews are
 * full product mockups — hundreds of nodes each — so they are exported from
 * Figma at 2x rather than rebuilt.
 *
 * Cards 01 and 02 are component instances carrying an ON_HOVER reaction that
 * swaps "Property 1=01 50%" for "Property 1=01". Verified against the
 * component set: those variants differ ONLY by root opacity (0.9 vs 1.0), so
 * the hover here is that opacity change and nothing else.
 */

type Work = {
  index: string;
  title: string;
  image: string;
  /** Only 01 and 02 have case-study frames in the file. */
  href?: string;
  /** True where Figma defines a hover variant (cards 01 and 02 only). */
  dims: boolean;
  /** Full-opacity preview, shown on hover. */
  hoverImage?: string;
  left: number;
  top: number;
};

const WORKS: Work[] = [
  {
    index: "Case Study 01",
    title: "Get My Stock (Mobile App)",
    image: "work-01-getmystock.png",
    hoverImage: "work-01-getmystock-hover.png",
    href: "/work/get-my-stock",
    dims: true,
    left: 0,
    top: 0,
  },
  {
    index: "Case Study 02",
    title: "Aero UI Design System",
    image: "work-02-aero.png",
    hoverImage: "work-02-aero-hover.png",
    href: "/work/design-system",
    dims: true,
    left: 916,
    top: 0,
  },
  {
    index: "Case Study 03",
    title: "Translate.video V2 (Product)",
    image: "work-03-translatevideo.png",
    dims: false,
    left: 0,
    top: 626,
  },
  {
    index: "Case Study 04",
    title: "Translate.photo V2 (Product)",
    image: "work-04-translatephoto.png",
    dims: false,
    left: 916,
    top: 626,
  },
];

function Card({ work }: { work: Work }) {
  const inner = (
    <>
      {/* Overlay — 877x64 at (8,8), #f8f8f8, r16 */}
      <div className="absolute left-[8px] top-[8px] flex h-[64px] w-[877px] items-center rounded-[16px] border border-hairline-soft bg-surface-muted">
        <span className="type-eyebrow-20 absolute left-[20px] text-black/60">
          {work.title}
        </span>
        <span className="type-eyebrow-20 absolute right-[18px] text-black/60">
          {work.index}
        </span>
      </div>

      {/*
        Container — 874x514 at (8,80), r16.
        The device render inside carries an IMAGE fill at 70% opacity in the
        default variant and 100% in the hover variant, so both exports are
        shipped and cross-faded. Fading a single 70% export up to full instead
        would wash the mockup out, because the dimming is baked into it.
      */}
      <div className="absolute left-[8px] top-[80px] h-[514px] w-[874px] overflow-hidden rounded-[16px]">
        <Image
          src={`/images/works/${work.image}`}
          alt={work.title}
          width={1748}
          height={1028}
          className="h-[514px] w-[874px] max-w-none"
        />
        {work.hoverImage && (
          <Image
            src={`/images/works/${work.hoverImage}`}
            alt=""
            aria-hidden
            width={1748}
            height={1028}
            className="absolute inset-0 h-[514px] w-[874px] max-w-none opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}
      </div>
    </>
  );

  /*
   * Hover comes from component set 5826:26140 / 5826:26157. A node-by-node
   * diff of "01 50%" against "01" shows exactly two changes:
   *   - the root card opacity, 0.9 -> 1.0
   *   - the device render's IMAGE fill opacity, 0.7 -> 1.0
   * The second is the one that reads: the mockup itself is dimmed at rest and
   * comes up to full on hover, while the card chrome barely moves. Cards 03/04
   * are plain frames with no hover reaction, so they stay inert.
   */
  const shell =
    "group absolute h-[602px] w-[893px] rounded-[24px] bg-white transition-opacity duration-300 ease-out" +
    (work.dims
      ? " opacity-90 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      : "");

  return work.href ? (
    <Link
      href={work.href}
      className={shell}
      style={{ left: work.left, top: work.top }}
    >
      {inner}
    </Link>
  ) : (
    <div className={shell} style={{ left: work.left, top: work.top }}>
      {inner}
    </div>
  );
}

export function Works() {
  return (
    <section id="works" className="flex w-[1808px] flex-col gap-[48px]">
      {/* 5854:49862 */}
      <div className="flex h-[90px] w-[1808px] items-center justify-between">
        {/*
          5854:49863 — Satoshi Medium 72/45.6/-2.5, filled with a vertical
          linear gradient (black@50% -> black@4%), not a solid colour.
        */}
        <h2
          className="type-works-72 flex h-[90px] w-[898px] items-center bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)",
          }}
        >
          Behind the pixels (My works)
        </h2>

        {/* 5854:49864 — "2 Columns" layout toggle, 120x60 r16 */}
        <Image
          src="/images/works/works-toggle.png"
          alt="Two column layout"
          width={240}
          height={120}
          className="h-[60px] w-[120px]"
        />
      </div>

      {/* 5854:49876 */}
      <div className="relative h-[1228px] w-[1808px]">
        {WORKS.map((w) => (
          <Card key={w.index} work={w} />
        ))}
      </div>
    </section>
  );
}
