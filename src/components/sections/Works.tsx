import Image from "@/components/Img";
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
 *
 * Card 03 links to the Translate.video case study — the home frame wires it up
 * (5908:32696 -> 5908:21013) — but it is a plain frame with no hover variant,
 * so it links without dimming. Its preview is the redesigned dashboard, taken
 * from the card's own Container (5908:32701) rather than the case study, which
 * renders a slightly different sidebar.
 *
 * Card 04 is "Vitra Universe (Product)": Figma fills its preview with a padlock
 * placeholder (5908:33741) and gives it no click target, so it reads as locked
 * and stays inert here too.
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
    href: "/work/translate-video",
    dims: false,
    left: 0,
    top: 626,
  },
  {
    index: "Case Study 04",
    title: "Vitra Universe (Product)",
    image: "work-04-vitra-universe.png",
    dims: false,
    left: 916,
    top: 626,
  },
];

function Card({ work }: { work: Work }) {
  const inner = (
    <>
      {/* Overlay — 877x64 at (8,8), #f8f8f8, r16 */}
      <div className="m-[8px] flex h-[56px] items-center justify-between gap-[12px] rounded-[16px] border border-hairline-soft bg-surface-muted px-[16px] xl:absolute xl:left-[8px] xl:top-[8px] xl:m-0 xl:h-[64px] xl:w-[877px] xl:justify-start">
        <span className="type-eyebrow-20 truncate text-black/60 xl:absolute xl:left-[20px]">
          {work.title}
        </span>
        <span className="type-eyebrow-20 shrink-0 text-black/60 xl:absolute xl:right-[18px]">
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
      <div className="relative mx-[8px] mb-[8px] overflow-hidden rounded-[16px] xl:absolute xl:left-[8px] xl:top-[80px] xl:mx-0 xl:mb-0 xl:h-[514px] xl:w-[874px]">
        <Image
          src={`/images/works/${work.image}`}
          alt={work.title}
          width={1748}
          height={1028}
          className="block h-auto w-full xl:h-[514px] xl:w-[874px] xl:max-w-none"
        />
        {work.hoverImage && (
          <Image
            src={`/images/works/${work.hoverImage}`}
            alt=""
            aria-hidden
            width={1748}
            height={1028}
            className="absolute inset-0 block h-full w-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 xl:h-[514px] xl:w-[874px] xl:max-w-none"
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
    "group relative block h-auto w-full rounded-[24px] bg-white transition-opacity duration-300 ease-out " +
    "xl:absolute xl:left-[var(--card-x)] xl:top-[var(--card-y)] xl:h-[602px] xl:w-[893px] " +
    (work.dims
      ? " opacity-90 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      : "");

  /*
   * Below xl the grid is a flow column, so the card drops its Figma offsets and
   * sizes to the column. Its inner chrome is a fixed 893x602 composition, which
   * scales to fit — the card is artwork plus a two-line header, and the header
   * is re-drawn in flow above it rather than scaled down with the mockup.
   */
  /*
   * The Figma offsets ride on custom properties rather than inline left/top:
   * an inline style applies at every width, and below xl the card is in flow,
   * where a left/top would shove it out of its column. The properties are only
   * read by the xl rule.
   */
  const pos = {
    ["--card-x" as string]: `${work.left}px`,
    ["--card-y" as string]: `${work.top}px`,
  } as React.CSSProperties;
  return work.href ? (
    <Link href={work.href} className={shell} style={pos}>
      {inner}
    </Link>
  ) : (
    <div className={shell} style={pos}>
      {inner}
    </div>
  );
}

export function Works() {
  return (
    <section id="works" className="page-x flex w-full flex-col gap-[28px] xl:w-[1808px] xl:gap-[48px]">
      {/* 5854:49862 */}
      <div className="flex w-full items-center justify-between gap-[16px] xl:h-[90px] xl:w-[1808px]">
        {/*
          5854:49863 — Satoshi Medium 72/45.6/-2.5, filled with a vertical
          linear gradient (black@50% -> black@4%), not a solid colour.
        */}
        <h2
          className="type-works-72 flex items-center bg-clip-text text-transparent xl:h-[90px] xl:w-[898px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)",
          }}
        >
          Behind the pixels (My works)
        </h2>

        {/*
          The file has a "2 Columns" grid/list toggle here (5854:49864). It was
          decoration — there is only one layout — so it is not drawn.
        */}
      </div>

      {/* 5854:49876 */}
      <div className="flex flex-col gap-[24px] md:grid md:grid-cols-2 md:gap-[24px] xl:relative xl:block xl:h-[1228px] xl:w-[1808px]">
        {WORKS.map((w) => (
          <Card key={w.index} work={w} />
        ))}
      </div>
    </section>
  );
}
