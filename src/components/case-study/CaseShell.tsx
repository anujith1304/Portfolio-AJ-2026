import Image from "@/components/Img";
import Link from "next/link";
import { Nav } from "@/components/Nav";

/**
 * Shared chrome for both case study frames (5854:34147 and 5854:39412).
 *
 * Both pages are 1905 wide and use the same skeleton at the same coordinates:
 *   nav pill   ~(730,40)
 *   back link   (229,209)
 *   title       (192,419 / 192,435)  Recoleta Medium 64/72  #060d19
 *   intro       (192,511)            Satoshi Regular 18/24  #5d6067
 *   hero image  (192,651 / 192,667)  1521x853
 *   body column  x=521, width 1046
 *   side nav     x=291, sticky
 */

/**
 * Top navigation — the same <Nav> the home page uses (5826:26108), so the two
 * page types share one bar rather than two near-identical ones.
 *
 * Fixed, with its x derived from the Figma coordinate: the 1905 frame is
 * centred, so its left edge is `50% - 952.5px`, and the bar sits 729px into
 * it — `calc(50% - 223.5px)`. Matches the home page's behaviour exactly.
 */
export function CaseNav() {
  return (
    <div className="fixed left-1/2 top-[16px] z-50 w-[min(452px,calc(100vw-32px))] -translate-x-1/2 xl:left-[calc(50%-223.5px)] xl:top-[35px] xl:w-auto xl:translate-x-0" style={{ order: 35 }}>
      <Nav base="/" active="Case Studies" />
    </div>
  );
}

/**
 * Back control — 5854:39375 / 5854:40836.
 * 90x44 at (192,197), fill #fffefc, radius 14, 1.2px #e3e3e3 border,
 * arrow_back icon 18x18 at (204,211), label Satoshi Medium 16 #000 at (229,209).
 */
export function BackLink() {
  return (
    <Link
      href="/#works"
      className="mb-[20px] flex h-[44px] w-[90px] items-center gap-[7px] rounded-[14px] bg-[#fffefc] pl-[12px] transition-colors hover:bg-[#f4f3f0] xl:absolute xl:left-[192px] xl:top-[197px] xl:mb-0"
      style={{ order: 197, border: "1.2px solid #e3e3e3" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M14.25 9H3.75M3.75 9l4.5-4.5M3.75 9l4.5 4.5"
          stroke="#1d1b20"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[16px] leading-[17.6px] font-medium text-black">
        Back
      </span>
    </Link>
  );
}

/**
 * Product mark under the back control — 5854:38522, 174x82 at (192,273).
 * A gradient plate with inner and drop shadows around the logo bitmap, so it
 * ships as one export; the render bounds run wider than the box because of
 * those shadows, which is why it is centred on the box rather than pinned to it.
 */
export function CaseLogo({
  src,
  alt,
  left,
  top,
  boxW,
  boxH,
  imgW,
  imgH,
}: {
  src: string;
  alt: string;
  left: number;
  top: number;
  boxW: number;
  boxH: number;
  imgW: number;
  imgH: number;
}) {
  return (
    /*
     * The export covers the node's render bounds, so at xl it is offset by the
     * spill to land the artwork on the Figma box. In flow it simply sits under
     * the back control and above the title, at its own size — the offset there
     * would drag it over the heading.
     */
    <Image
      src={src}
      alt={alt}
      width={imgW * 2}
      height={imgH * 2}
      className="mx-auto mb-[20px] h-auto w-auto max-w-[200px] xl:mx-0 xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:h-[var(--h)] xl:w-[var(--w)] xl:max-w-none"
      style={{
        ["--x" as string]: `${left - (imgW - boxW) / 2}px`,
        ["--y" as string]: `${top - (imgH - boxH) / 2}px`,
        ["--w" as string]: `${imgW}px`,
        ["--h" as string]: `${imgH}px`,
        order: Math.round(top),
      }}
    />
  );
}

/**
 * Meta row — Timeline / Platform / My Role / Tools Used.
 * 5854:34742 / 5854:39476: a 101-tall box with 1px #e0e0e0 rules on its top
 * and bottom edges only (strokeAlign INSIDE), labels 22px down and values 61px
 * down. The rules are part of the design, not a divider I have added.
 */
export function MetaRow({
  box,
  items,
}: {
  box: { left: number; top: number; width: number; height: number };
  items: { label: string; value: string; left: number }[];
}) {
  return (
    <>
      {/*
        The rule is drawn as a bordered box on the Figma rectangle at xl. In
        flow it becomes a bordered wrapper around the items, which is the same
        thing once the items are no longer placed by x.
      */}
      <div
        aria-hidden
        className="hidden xl:absolute xl:block xl:border-t xl:border-b xl:border-[#e0e0e0]"
        style={{
          ["--x" as string]: `${box.left}px`,
          ["--y" as string]: `${box.top}px`,
        order: Math.round(box.top),
          ["--w" as string]: `${box.width}px`,
          ["--h" as string]: `${box.height}px`,
          left: "var(--x)", top: "var(--y)", width: "var(--w)", height: "var(--h)",
        }}
      />
      <div
        className="grid grid-cols-2 gap-x-[24px] gap-y-[18px] border-t border-b border-[#e0e0e0] py-[20px] sm:grid-cols-4 xl:contents"
        style={{ order: box.top }}
      >
      {items.map((m) => (
        <div
          key={m.label}
          className="xl:absolute xl:left-[var(--x)] xl:top-[var(--y)]"
          style={{
            ["--x" as string]: `${m.left}px`,
            ["--y" as string]: `${box.top + 22}px`,
        order: Math.round(box.top + 22),
          }}
        >
          <p className="type-circ-20 text-[#6b6b6b]" style={{ lineHeight: "24.8px" }}>
            {m.label}
          </p>
          <p className="mt-[6px] text-[18px] leading-[24.8px] font-normal text-[#222227] xl:mt-[15px] xl:text-[20px]">
            {m.value}
          </p>
        </div>
      ))}
      </div>
    </>
  );
}

/** Section heading — Recoleta SemiBold 32/35.8 #222227. */
export function SectionHeading({
  children,
  top,
  left = 521,
  width = 1046,
}: {
  children: React.ReactNode;
  top: number;
  left?: number;
  width?: number;
}) {
  return (
    <h2
      className="mt-[48px] mb-[16px] font-display text-[26px] leading-[1.25] font-semibold text-[#222227] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:my-0 xl:w-[var(--w)] xl:text-[32px] xl:leading-[35.8px]"
      style={{
        ["--x" as string]: `${left}px`,
        ["--y" as string]: `${top}px`,
        order: Math.round(top),
        ["--w" as string]: `${width}px`,
      }}
    >
      {children}
    </h2>
  );
}

/** Body copy — Satoshi Regular 20/28 #222227. */
export function Body({
  children,
  top,
  left = 521,
  width = 1046,
  size = 20,
  lh = 28,
  color = "#222227",
}: {
  children: React.ReactNode;
  top: number;
  left?: number;
  width?: number;
  size?: number;
  lh?: number;
  color?: string;
}) {
  return (
    <p
      /*
       * Size and leading are classes, not inline style. Inline style beats a
       * class at any width, so putting them there meant the xl variants never
       * applied and every body rendered at the reflowed size on desktop too.
       * The clamp was also malformed for the 16px bodies — its 17px floor was
       * above its own ceiling, which CSS resolves to the floor — so those set
       * at 17/1.65 instead of 16/24 and ran into the rules below them.
       */
      className="mb-[16px] whitespace-pre-line text-[17px] leading-[1.65] font-normal xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:w-[var(--w)] xl:text-[length:var(--fs)] xl:leading-[var(--lh)]"
      style={{
        ["--x" as string]: `${left}px`,
        ["--y" as string]: `${top}px`,
        order: Math.round(top),
        ["--w" as string]: `${width}px`,
        ["--fs" as string]: `${size}px`,
        ["--lh" as string]: `${lh}px`,
        color,
      }}
    >
      {children}
    </p>
  );
}

/**
 * A numbered Problem / Solution card: eyebrow, title, description, then an
 * IMPACT label and line. Problems use #d62518 for the eyebrow, solutions
 * #03ad00 — straight from the frame.
 */
export function NumberedCard({
  top,
  eyebrow,
  eyebrowColor,
  title,
  body,
  impactLabel,
  impact,
  bodyColor = "#494949",
  left = 521,
  width = 1046,
}: {
  top: number;
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  body: string;
  impactLabel?: string;
  impact?: string;
  bodyColor?: string;
  left?: number;
  width?: number;
}) {
  return (
    <div
      className="mb-[36px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:w-[var(--w)]"
      style={{
        ["--x" as string]: `${left}px`,
        ["--y" as string]: `${top}px`,
        order: Math.round(top),
        ["--w" as string]: `${width}px`,
      }}
    >
      <p
        className="text-[14px] leading-[24.8px] font-medium tracking-[0.02em]"
        style={{ color: eyebrowColor }}
      >
        {eyebrow}
      </p>
      <h3 className="mt-[10px] font-display text-[21px] leading-[1.3] font-semibold text-[#222227] xl:mt-[12px] xl:text-[23.6px] xl:leading-[35.8px]">
        {title}
      </h3>
      <p
        className="mt-[12px] text-[17px] leading-[1.65] font-normal xl:text-[16px] xl:leading-[24.8px]"
        style={{ color: bodyColor }}
      >
        {body}
      </p>
      {impact && (
        <>
          <p className="mt-[22px] text-[14px] leading-[24.8px] font-medium tracking-[0.02em] text-[#222227]">
            {impactLabel ?? "IMPACT"}
          </p>
          <p
            className="mt-[12px] text-[17px] leading-[1.65] font-normal xl:text-[16px] xl:leading-[24.8px]"
            style={{ color: bodyColor }}
          >
            {impact}
          </p>
        </>
      )}
    </div>
  );
}

/** A headline metric block — Satoshi Bold 50 over supporting lines. */
export function StatBlock({
  top,
  left,
  width,
  value,
  caption,
  lines,
}: {
  top: number;
  left: number;
  width: number;
  value: string;
  caption: string;
  lines: string[];
}) {
  return (
    <div
      className="mb-[36px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:w-[var(--w)]"
      style={{
        ["--x" as string]: `${left}px`,
        ["--y" as string]: `${top}px`,
        order: Math.round(top),
        ["--w" as string]: `${width}px`,
      }}
    >
      <p className="text-[50px] leading-[68px] font-bold text-[#060d19]">{value}</p>
      <p className="mt-[0px] text-[17px] leading-[1.6] font-medium text-[#707581] xl:text-[18px] xl:leading-[24px]">
        {caption}
      </p>
      <div className="mt-[24px] flex flex-col gap-[8px]">
        {lines.map((l) => (
          <p key={l} className="text-[17px] leading-[1.6] font-medium text-[#707581] xl:text-[18px] xl:leading-[24px]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * "Explore More" strip — Figma "Related", 1905x642, on every case study.
 *
 * Was a flat 1905-wide export with two transparent hit areas over it, which
 * meant the whole strip — heading, three cards, their titles and copy — scaled
 * down as one bitmap and turned to mush on anything narrower than a desktop.
 * It is markup now, so it reflows and the type stays readable.
 *
 * Geometry is the file's, relative to the strip top:
 *   rule          x191  y32   1520x1  #ececec
 *   "Explore More" x191 y43   Satoshi Medium 19/24 #5d6067
 *   cards         y107  x191 / 707 / 1223, 496 wide, 20 apart
 *     thumbnail   496x278 r16 white
 *     title       +302 from the card top, Recoleta Medium 32/40
 *     description +351, Satoshi Regular 16/24
 *
 * Content note: the file's cards read "Case Study 01/02/03" over lorem ipsum.
 * Those are placeholders, so the real names and one-line summaries are used
 * instead — shipping lorem to a live portfolio would be worse than deviating
 * from the file here. The layout is unchanged.
 *
 * The card for the page you are already on is rendered without a link, which
 * is what the file does with its own first card.
 */

export type RelatedCard = {
  slug: string;
  title: string;
  blurb: string;
  href: string;
  image: string;
};

/** The three case studies, in the order the file lays them out. */
export const CASE_STUDIES: RelatedCard[] = [
  {
    slug: "get-my-stock",
    title: "Get My Stock",
    blurb:
      "A 0 to 1 B2B ordering app for small retailers — problem framing through to a shipped first release.",
    href: "/work/get-my-stock",
    image: "/images/works/work-01-getmystock.png",
  },
  {
    slug: "design-system",
    title: "Aero UI Design System",
    blurb:
      "A component library and token system built to keep a fast-moving product visually consistent.",
    href: "/work/design-system",
    image: "/images/works/work-02-aero.png",
  },
  {
    slug: "translate-video",
    title: "Translate.video V2",
    blurb:
      "Rethinking an AI video localization platform across dashboard, editor, timeline and export.",
    href: "/work/translate-video",
    image: "/images/works/work-03-translatevideo.png",
  },
];

export function Related({
  top,
  /** The case study being viewed; its own card is not linked. */
  current,
}: {
  top: number;
  current: string;
}) {
  return (
    <section
      aria-label="Explore more case studies"
      className="page-x mt-[56px] w-full xl:absolute xl:left-0 xl:top-[var(--y)] xl:mt-0 xl:h-[642px] xl:w-[1905px]"
      style={{ ["--y" as string]: `${top}px`, order: Math.round(top) }}
    >
      <div aria-hidden className="h-px w-full bg-[#ececec] xl:absolute xl:left-[191px] xl:top-[32px] xl:w-[1520px]" />
      <h2 className="mt-[20px] text-[19px] leading-[24px] font-medium text-[#5d6067] xl:absolute xl:left-[191px] xl:top-[43px] xl:mt-0">
        Explore More
      </h2>

      <div className="mt-[24px] grid grid-cols-1 gap-[32px] sm:grid-cols-2 xl:mt-0 xl:block">
        {CASE_STUDIES.map((c, i) => {
          const inner = (
            <>
              <div className="overflow-hidden rounded-[16px] bg-white xl:h-[278px] xl:w-[496px]">
                <Image
                  src={c.image}
                  alt=""
                  width={1748}
                  height={1028}
                  className="h-auto w-full object-cover xl:h-[278px] xl:w-[496px]"
                />
              </div>
              <h3 className="mt-[16px] font-display text-[24px] leading-[1.25] font-medium text-[#060d19] xl:absolute xl:left-0 xl:top-[302px] xl:mt-0 xl:text-[32px] xl:leading-[40px]">
                {c.title}
              </h3>
              <p className="mt-[8px] text-[16px] leading-[24px] text-[#5d6067] xl:absolute xl:left-0 xl:top-[351px] xl:mt-0 xl:w-[488px]">
                {c.blurb}
              </p>
            </>
          );
          const cls =
            "group relative block rounded-[8px] xl:absolute xl:left-[var(--cx)] xl:top-[107px] xl:h-[430px] xl:w-[496px]";
          const style = { ["--cx" as string]: `${191 + i * 516}px` } as React.CSSProperties;
          return c.slug === current ? (
            <div key={c.slug} className={cls} style={style} aria-current="page">
              {inner}
            </div>
          ) : (
            <Link key={c.slug} href={c.href} className={`${cls} transition-opacity hover:opacity-90`} style={style}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
