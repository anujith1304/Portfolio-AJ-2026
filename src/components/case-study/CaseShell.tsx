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
    <div className="fixed left-[calc(50%-223.5px)] top-[35px] z-50">
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
      className="absolute left-[192px] top-[197px] flex h-[44px] w-[90px] items-center gap-[7px] rounded-[14px] bg-[#fffefc] pl-[12px] transition-colors hover:bg-[#f4f3f0]"
      style={{ border: "1.2px solid #e3e3e3" }}
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

/** Meta row — Timeline / Platform / My Role / Tools Used. */
export function MetaRow({
  top,
  items,
}: {
  top: number;
  items: { label: string; value: string; left: number }[];
}) {
  return (
    <>
      {items.map((m) => (
        <div key={m.label} className="absolute" style={{ left: m.left, top }}>
          <p className="type-circ-20 text-[#6b6b6b]" style={{ lineHeight: "24.8px" }}>
            {m.label}
          </p>
          <p className="mt-[15px] text-[20px] leading-[24.8px] font-normal text-[#222227]">
            {m.value}
          </p>
        </div>
      ))}
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
      className="absolute font-display text-[32px] leading-[35.8px] font-semibold text-[#222227]"
      style={{ left, top, width }}
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
      className="absolute whitespace-pre-line font-normal"
      style={{ left, top, width, fontSize: size, lineHeight: `${lh}px`, color }}
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
}: {
  top: number;
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  body: string;
  impactLabel?: string;
  impact?: string;
}) {
  return (
    <div className="absolute left-[521px] w-[1046px]" style={{ top }}>
      <p
        className="text-[14px] leading-[24.8px] font-medium"
        style={{ color: eyebrowColor }}
      >
        {eyebrow}
      </p>
      <h3 className="mt-[12px] font-display text-[23.6px] leading-[35.8px] font-semibold text-[#222227]">
        {title}
      </h3>
      <p className="mt-[12px] text-[16px] leading-[24.8px] font-normal text-[#494949]">
        {body}
      </p>
      {impact && (
        <>
          <p className="mt-[24px] text-[14px] leading-[24.8px] font-medium text-[#222227]">
            {impactLabel ?? "IMPACT"}
          </p>
          <p className="mt-[12px] text-[16px] leading-[24.8px] font-normal text-[#494949]">
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
    <div className="absolute" style={{ top, left, width }}>
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
      className="absolute left-0 w-[1905px] bg-surface-muted"
      style={{ top, height: 642 }}
    >
      <div className="absolute left-[191px] top-[32px] flex w-[1520px] items-center justify-between">
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
      <div className="absolute left-[191px] top-[107px] flex w-[1520px] gap-[24px]">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex h-[454px] flex-1 flex-col justify-end rounded-[24px] border border-hairline bg-white p-[32px] transition-shadow hover:shadow-lg"
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
