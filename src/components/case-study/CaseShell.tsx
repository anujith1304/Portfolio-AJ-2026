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
    <Image
      src={src}
      alt={alt}
      width={imgW * 2}
      height={imgH * 2}
      className="absolute max-w-none"
      style={{
        left: left - (imgW - boxW) / 2,
        top: top - (imgH - boxH) / 2,
        width: imgW,
        height: imgH,
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
      className="mb-[16px] whitespace-pre-line font-normal xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:w-[var(--w)] xl:text-[length:var(--fs)] xl:leading-[var(--lh)]"
      style={{
        ["--x" as string]: `${left}px`,
        ["--y" as string]: `${top}px`,
        order: Math.round(top),
        ["--w" as string]: `${width}px`,
        ["--fs" as string]: `${size}px`,
        ["--lh" as string]: `${lh}px`,
        fontSize: `clamp(15px, ${(size / 1280) * 100}vw, ${size}px)`,
        lineHeight: 1.6,
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
        className="text-[14px] leading-[24.8px] font-medium"
        style={{ color: eyebrowColor }}
      >
        {eyebrow}
      </p>
      <h3 className="mt-[12px] font-display text-[23.6px] leading-[35.8px] font-semibold text-[#222227]">
        {title}
      </h3>
      <p
        className="mt-[12px] text-[16px] leading-[24.8px] font-normal"
        style={{ color: bodyColor }}
      >
        {body}
      </p>
      {impact && (
        <>
          <p className="mt-[24px] text-[14px] leading-[24.8px] font-medium text-[#222227]">
            {impactLabel ?? "IMPACT"}
          </p>
          <p
            className="mt-[12px] text-[16px] leading-[24.8px] font-normal"
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
      <p className="mt-[0px] text-[18px] leading-[24px] font-medium text-[#707581]">
        {caption}
      </p>
      <div className="mt-[24px] flex flex-col gap-[8px]">
        {lines.map((l) => (
          <p key={l} className="text-[18px] leading-[24px] font-medium text-[#707581]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * "Related" strip — 5854:38498 / 5854:40812, 1905x642.
 * This is the only place the Figma prototype actually wires case study to
 * case study, so the links here mirror those reactions and add the home link.
 */
export function Related({
  top,
  cards,
}: {
  top: number;
  cards: { index: string; title: string; href: string }[];
}) {
  return (
    <section
      className="page-x mt-[64px] w-full bg-surface-muted py-[40px] xl:absolute xl:left-0 xl:mt-0 xl:h-[642px] xl:w-[1905px] xl:py-0"
      style={{ ["--y" as string]: `${top}px`,
        order: Math.round(top), top: "var(--y)" }}
    >
      <div className="flex w-full items-center justify-between xl:absolute xl:left-[191px] xl:top-[32px] xl:w-[1520px]" style={{ order: 32 }}>
        <h2 className="text-[24px] leading-[35px] font-medium text-[#222227]">
          More case studies
        </h2>
        <Link
          href="/#works"
          className="text-[16px] font-medium text-[#6b6b6b] transition-colors hover:text-black"
        >
          All work
        </Link>
      </div>
      <div className="mt-[24px] flex flex-col gap-[16px] sm:flex-row sm:gap-[24px] xl:absolute xl:left-[191px] xl:top-[107px] xl:mt-0 xl:w-[1520px]" style={{ order: 107 }}>
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex min-h-[180px] flex-1 flex-col justify-end rounded-[24px] border border-hairline bg-white p-[24px] transition-shadow hover:shadow-lg xl:h-[454px] xl:p-[32px]"
          >
            <span className="type-eyebrow-20 text-black/60">{c.index}</span>
            <span className="mt-[8px] font-display text-[32px] leading-[35.8px] font-semibold text-[#222227]">
              {c.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
