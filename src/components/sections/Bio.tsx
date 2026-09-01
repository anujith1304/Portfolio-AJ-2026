import Image from "@/components/Img";

/**
 * Bio + collage — Figma 5854:49704 "Frame 2147228576".
 * 1808x808, HORIZONTAL, items-center, justify-between.
 *
 * Left  (5854:49705): 960 wide, VERTICAL, gap 54.
 * Right (5854:49710): "Card sets_Container", 797x808, absolutely placed cards.
 *
 * The eight cards are illustration artwork — nested vector groups, masked
 * renders and rotated device mockups. They are exported from Figma at 2x
 * rather than rebuilt, per the design-to-code rule about never hand-authoring
 * vector data. Each export covers the node's *render* bounds (the 4px/2px
 * shadow spill included), so every card is positioned at its render offset,
 * not its box offset — that is what makes the placement land exactly.
 */

type Card = {
  src: string;
  alt: string;
  left: number;
  top: number;
  w: number;
  h: number;
  /**
   * True for a replacement asset placed on the node's own box rather than a
   * Figma export of its render bounds. Those exports already contain the card
   * chrome and its shadow spill, so they must not be rounded or clipped.
   */
  card?: boolean;
};

/* left/top/w/h are absoluteRenderBounds relative to 5854:49710. */
const CARDS: Card[] = [
  // 3D blob supplied by the user, replacing the flat Figma export. Its ground
  // is keyed out, so it sits on a real card that matches the other seven.
  { src: "bio-blob-3d.webp",     alt: "",  left:   0, top:   0, w: 150, h: 148, card: true },
  { src: "bio-key-cmd.png",      alt: "",  left: 162, top:  -2, w: 154, h: 156 },
  { src: "bio-key-v.png",        alt: "",  left: 324, top:  -2, w: 154, h: 156 },
  { src: "bio-screens.png",      alt: "",  left: 486, top:  -2, w: 316, h: 322 },
  { src: "bio-smallmoments.png", alt: "",  left:  -4, top: 162, w: 482, h: 322 },
  { src: "bio-apps.png",         alt: "",  left: 486, top: 328, w: 316, h: 156 },
  { src: "bio-folder.png",       alt: "",  left:  -4, top: 492, w: 316, h: 322 },
  { src: "bio-manga.png",        alt: "",  left: 320, top: 492, w: 482, h: 322 },
];

/** The collage's design canvas — every card is placed as a share of this. */
const CANVAS_W = 797;
const CANVAS_H = 808;

export function Bio() {
  return (
    <section className="page-x flex w-full flex-col items-start gap-[40px] xl:h-[calc(808*var(--u))] xl:w-[calc(1808*var(--u))] xl:flex-row xl:items-center xl:justify-between xl:gap-0">
      {/* 5854:49705 — copy column */}
      <div className="flex w-full flex-col gap-[28px] xl:w-[calc(960*var(--u))] xl:gap-[calc(54*var(--u))]">
        {/* 5854:49706 — Satoshi Medium 72/86/-2.4, base black@30, accents black@80 */}
        <div className="flex flex-col justify-center xl:h-[calc(684*var(--u))]">
          <p className="type-display-72 whitespace-pre-wrap text-black/30">
            {"I’m a Product Designer who focuses on crafting intuitive digital experiences. Previously    a founding designer at "}
            <span className="text-black/80">{"Get My Stock "}</span>
            {"and at present, a "}
            <span className="text-black/80">{"UX/UI Designer "}</span>
            {"at"}
            <span className="text-black/80">{" Vitra.ai"}</span>
            {", Where I helped bring multiple products from "}
            <span className="bulb" role="img" aria-label="idea">
              {"\u{1F4A1}"}
            </span>
            {" to launch."}
          </p>
        </div>

        {/* 5854:49707 — role + dates, gap 8 */}
        <div className="flex w-full flex-col gap-[8px] xl:h-[calc(70*var(--u))] xl:w-[calc(344*var(--u))] xl:gap-[calc(8*var(--u))]">
          <div className="flex flex-col justify-center xl:h-[calc(38*var(--u))]">
            <p className="type-role-32 text-black">
              {"Role ~ "}
              <span className="type-circ-32">Product Designer</span>
            </p>
          </div>
          <div className="flex flex-col justify-center xl:h-[calc(24*var(--u))]">
            <p className="type-date-20 text-black/40">
              {"April 2025 - "}
              <span className="type-circ-20-sm">Present</span>
            </p>
          </div>
        </div>
      </div>

      {/* 5854:49710 — collage */}
      {/*
        Artwork only — hand-placed offsets with no text — so the collage keeps
        its proportions instead of reflowing. Each card's Figma rectangle is
        expressed as a percentage of the 797x808 canvas, which resolves back to
        the exact pixel values at the design width.
      */}
      <div
        className="fit-canvas mx-auto xl:mx-0"
        style={{ ["--fw" as string]: 797, ["--fh" as string]: 808 }}
      >
        {CARDS.map((c) => {
          const box = {
            left: `${(c.left / CANVAS_W) * 100}%`,
            top: `${(c.top / CANVAS_H) * 100}%`,
            width: `${(c.w / CANVAS_W) * 100}%`,
            height: `${(c.h / CANVAS_H) * 100}%`,
          };
          return c.card ? (
            /* Figma card chrome: white, r16, and the collage drop shadow. */
            <div
              key={c.src}
              className="absolute flex items-center justify-center rounded-[16px] bg-white"
              style={{
                ...box,
                boxShadow:
                  "0.5px 0.5px 2px 0px rgba(103,109,124,0.12), 0px 2px 4px 0px rgba(103,109,124,0.1)",
              }}
            >
              <Image
                src={`/images/collage/${c.src}`}
                alt={c.alt}
                width={c.w * 4}
                height={c.h * 4}
                className="h-[62%] w-[33%] object-contain"
              />
            </div>
          ) : (
            <Image
              key={c.src}
              src={`/images/collage/${c.src}`}
              alt={c.alt}
              width={c.w * 2}
              height={c.h * 2}
              className="absolute max-w-none object-contain"
              style={box}
            />
          );
        })}
      </div>
    </section>
  );
}
