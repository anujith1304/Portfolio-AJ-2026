import type { Metadata } from "next";
import Image from "@/components/Img";
import { Figure } from "@/components/case-study/Figure";
import {
  CaseNav,
  BackLink,
  MetaRow,
  SectionHeading,
  Body,
  NumberedCard,
  Related,
} from "@/components/case-study/CaseShell";
import { CaseSideNav, Anchor } from "@/components/case-study/CaseSideNav";
import { canvasSurface } from "@/lib/canvas";

/** Blocks exported from Figma, placed on their node coordinates. */
type Block = { src: string; alt: string; left: number; top: number; w: number; h: number };

const BLOCKS: Block[] = [
  // 5854:39515 problem dashboard — box 1046x648, export 1054x656
  { src: "ds-problem.png", alt: "Dashboard before the system", left: 517, top: 2713, w: 1054, h: 656 },
  // 5854:40843 / 5854:41821 — boxes 1046x670, exports 1055x673
  { src: "ds-solved-1.png", alt: "Redesigned dashboard", left: 517, top: 4765, w: 1055, h: 673 },
  { src: "ds-solved-2.png", alt: "Redesigned dubbing flow", left: 517, top: 5499, w: 1055, h: 673 },
  // Component sheets — boxes 1052x~692, exports 1060x~694
  { src: "ds-comp-1.png", alt: "Type scale and colour tokens", left: 517, top: 7542, w: 1060, h: 694 },
  { src: "ds-comp-2.png", alt: "Button states", left: 517, top: 8266, w: 1060, h: 694 },
  { src: "ds-comp-3.png", alt: "Component set", left: 517, top: 8990, w: 1060, h: 694 },
  { src: "ds-comp-4.png", alt: "Component set", left: 517, top: 9714, w: 1060, h: 707 },
  { src: "ds-comp-5.png", alt: "Component set", left: 517, top: 10448, w: 1060, h: 710 },
  // Spacing sheets — 5854:40306 (1052x861), 5854:40563 (1052x795)
  { src: "ds-spacing-1.png", alt: "Spacing applied to cards", left: 517, top: 11420, w: 1060, h: 864 },
  { src: "ds-spacing-2.png", alt: "Spacing applied to forms", left: 517, top: 12313, w: 1060, h: 797 },
  // Drop-shadow sheets — 1051x861 boxes, exports 1059x864
  { src: "ds-shadow-1.png", alt: "Elevation scale", left: 517, top: 13398, w: 1059, h: 864 },
  { src: "ds-shadow-2.png", alt: "Elevation applied", left: 517, top: 14272, w: 1059, h: 864 },
  { src: "ds-shadow-3.png", alt: "Elevation applied", left: 517, top: 15165, w: 1059, h: 864 },
];

/**
 * Aero UI Design System case study — Figma 5854:39412, 1905x16749.
 *
 * Same skeleton and coordinate approach as the Get My Stock page. Copy is
 * verbatim from the file, including the NDA notice at (1089,294), which is
 * part of the design and should not be dropped.
 *
 * The visual blocks (problem dashboard, before/after pairs, component
 * sheets, spacing sheets, drop-shadow sheets and the Related strip) are
 * exported from Figma and listed in BLOCKS above.
 */

export const metadata: Metadata = {
  title: "Aero UI Design System — Case Study | Anujith S",
  description:
    "Building a scalable design system for Vitra.AI — type scale, 4px spacing, button hierarchy and a refined colour system across every product surface.",
};

const SIDE_NAV = [
  { label: "Introduction", id: "introduction", top: 1973 },
  { label: "My Role", id: "my-role", top: 2303 },
  { label: "Problem", id: "problem", top: 2538 },
  { label: "Issues Solved", id: "issues-solved", top: 4559 },
  { label: "Components", id: "components", top: 7364 },
  { label: "Spacing", id: "spacing", top: 11214 },
  { label: "Drop Shadow", id: "drop-shadow", top: 13173 },
];

/*
 * Each entry is eyebrow / title / body / IMPACT / impact body — the same
 * five-part shape the Get My Stock cards use. `top` is the eyebrow's y.
 * An earlier pass read this page's copy with a >=16px filter, which silently
 * dropped every 14px label: the PROBLEM/Solution eyebrows and all eight
 * IMPACT headings. Body copy here is #777777, not the #494949 used on the
 * other case study.
 */
const PROBLEMS = [
  {
    top: 3429,
    eyebrow: "PROBLEM #01",
    title: "Un-balanced Type Scale",
    a: "Designers and developers were building UI elements independently, the heading, nav labels, table headers, and body text are all inconsistent in size and weight, with no clear typographic hierarchy governing them.",
    b: "Typography is the primary tool for guiding a user's attention through a screen. Without a defined type scale, every section competes for the same visual weight nothing feels more important than anything else.",
  },
  {
    top: 3704,
    eyebrow: "PROBLEM #02",
    title: "Broken Spacing System",
    a: "The upload card, resource usage card, and data table all use different internal padding and gaps spacing decisions were made per component rather than from a shared token system.",
    b: "Inconsistent spacing is one of the hardest problems to fix, because it touches every single component in the product. Without spacing tokens, every new component a designer creates will default to a different value, and every developer will interpret spacing from the design file differently.",
  },
  {
    top: 3979,
    eyebrow: "PROBLEM #03",
    title: "In-consistent Button Hierarchy",
    a: "Upload uses a blue filled button, Top-up uses a purple filled button, and Cancel is un-styled text all on the same screen with no defined rule for when to use which style.",
    b: "When users can't visually distinguish a primary action from a secondary one, they hesitate. In a product built around fast, repetitive workflows like uploading and processing files, that hesitation adds up.",
  },
  {
    top: 4253,
    eyebrow: "PROBLEM #04",
    title: "Conflicting Surface Colors",
    a: "The dark sidebar, white content cards, and grey background have no defined elevation system or surface hierarchy and also they coexist without a clear rule in the product.",
    b: "Without a surface system, the layout has no reliable way to communicate depth, focus, or containment. Users struggle to distinguish interactive areas from static ones, and the overall interface feels assembled rather than designed.",
  },
];

const SOLUTIONS = [
  {
    top: 6234,
    eyebrow: "SOLUTION #01",
    title: "Balanced Type Scale",
    a: "A consistent type scale was applied across headings, navigation labels, cards, tables, form fields, and body text. This created a clear visual hierarchy and made the dashboard easier to scan.",
    b: "Compared to the old dashboard, where text sizes felt inconsistent and every section competed for attention, the new type system helps users quickly identify important areas like recent projects, tool cards, usage balance, and primary actions.",
  },
  {
    top: 6509,
    eyebrow: "SOLUTION #02",
    title: "Consistent 4px Grid Spacing",
    a: "The interface was rebuilt using a 4px spacing system to keep padding, gaps, card spacing, and form alignment consistent across the dashboard and workflow screens.",
    b: "The old UI felt uneven because each component had different spacing rules. The new layout feels more organized and predictable, helping users move through the dashboard without visual clutter or confusion.",
  },
  {
    top: 6784,
    eyebrow: "SOLUTION #03",
    title: "Clear Button Hierarchy",
    a: "Primary, secondary, and supporting actions were redesigned with clear visual differences. Key actions like Create Dub and Upgrade are now more visible, while less important actions remain subtle.",
    b: "In the old dashboard, users could not easily distinguish between main actions and secondary actions. The new button hierarchy guides users toward the next step faster and reduces hesitation during tasks like uploading, creating, or upgrading.",
  },
  {
    top: 7058,
    eyebrow: "SOLUTION #04",
    title: "Refined Color System",
    a: "The color system was simplified using one primary color, one secondary color, and neutral shades for backgrounds, borders, and text. This created a cleaner and more controlled visual style.",
    b: "The old dashboard used colors without a clear system, making the interface feel busy and inconsistent. The new color system improves focus, separates interactive elements from static content, and gives the product a more polished and professional look.",
  },
];

export default function DesignSystemCaseStudy() {
  return (
    <main
      className="page-x relative mx-auto flex w-full flex-col overflow-x-clip pt-[92px] pb-[64px] xl:h-[16749px] xl:w-[1905px] xl:block xl:overflow-x-visible xl:px-0 xl:pt-0 xl:pb-0"
      style={canvasSurface}
    >
      <CaseNav />
      <BackLink />
      {/*
        5854:40280 "Expand → Image Container".
        Its BOX is only 96x96 at (385,274) — that is just the black share tile.
        The frame does not clip, and it holds a 506x118 child at x=192 that
        fans out seven rotated icon tiles, so the component's real extent is
        its RENDER bounds: 514x126 at (188,269). Sizing it to the 96x96 box
        squashed the whole fan into one tile.
      */}
      <Image
        src="/images/case/ds-expand-tiles.png"
        alt=""
        width={2056}
        height={504}
        className="mb-[16px] xl:absolute xl:left-[188px] xl:top-[269px] xl:h-[126px] xl:w-[514px] xl:mb-0 h-auto w-full rounded-[10px] xl:max-w-none xl:rounded-none"
        style={{ order: 269 }}
      />

      {/* 5854:42904 — NDA notice, part of the design */}
      <p className="mb-[16px] text-[20px] leading-[28px] text-[#6b6b6b] xl:absolute xl:left-[1089px] xl:top-[290px] xl:w-[624px] xl:mb-0" style={{ order: 290 }}>
        Due to a signed NDA, the work displayed is not an exact representation
        of the real design and is provided only as a conceptual reference.
      </p>

      {/* 5854:39499 — title + intro */}
      <h1 className="mb-[16px] font-display text-[64px] leading-[72px] font-medium text-[#060d19] xl:absolute xl:left-[192px] xl:top-[435px] xl:w-[1072px] xl:mb-0" style={{ order: 435 }}>
        Design System for Vitra.AI
      </h1>
      <Body top={527} left={192} width={1072} size={18} lh={24} color="#5d6067">
        Collaborated with the Senior Product Designer across the full product
        lifecycle — from problem framing and user flows to wireframes,
        interaction design, and the final UI/visual language. Contributed to
        building the reusable component system and partnered with engineers to
        deliver a strong first release and a foundation for future iterations.
      </Body>
      <p className="mb-[16px] text-[18px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1427px] xl:top-[579px] xl:mb-0" style={{ order: 579 }}>
        UX/UI Designer
      </p>
      <p className="mb-[16px] text-[18px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1595px] xl:top-[579px] xl:mb-0" style={{ order: 579 }}>
        2025 — 2026
      </p>

      {/* 5854:39413 — hero, 1521x853 at (192,667); export carries 4px spill */}
      <Image
        src="/images/case/ds-hero.png"
        alt="Aero UI Design System for Figma"
        width={3058}
        height={1722}
        priority
        className="mb-[16px] xl:absolute xl:left-[188px] xl:top-[663px] xl:h-[861px] xl:w-[1529px] xl:mb-0 h-auto w-full rounded-[10px] xl:max-w-none xl:rounded-none"
        style={{ order: 663 }}
      />

      {/* 5854:39473 — standfirst */}
      <p className="mb-[16px] text-[32px] leading-[43px] font-medium text-[#222227] xl:absolute xl:left-[521px] xl:top-[1600px] xl:w-[995px] xl:mb-0" style={{ order: 1600 }}>
        I collaborated with the Senior Product Designer on the end-to-end design
        of a Design System for Vitra.AI, contributing across the full product
        lifecycle from problem framing and user flows to wireframes, interaction
        design, and the final UI/visual language.
      </p>

      <MetaRow
        box={{ left: 521, top: 1808, width: 995, height: 101 }}
        items={[
          { label: "Timeline", value: "Nov 2025—Jan 2026", left: 521 },
          { label: "Platform", value: "Across All Products", left: 791 },
          { label: "My Role", value: "UX/UI Designer", left: 1030 },
          { label: "Tools used", value: "Figma, React JS", left: 1268 },
        ]}
      />

      <CaseSideNav items={SIDE_NAV} startAt={1973} endAt={16107} />
      {SIDE_NAV.map((i) => (
        <Anchor key={i.id} id={i.id} top={i.top} />
      ))}

      {BLOCKS.map((b) => (
        <Figure
          key={b.src}
          src={`/images/case/${b.src}`}
          alt={b.alt}
          width={b.w * 2}
          height={b.h * 2}
          className="mb-[24px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:h-[var(--h)] xl:w-[var(--w)] xl:max-w-none xl:rounded-none"
          style={{
            ["--x" as string]: `${b.left}px`,
            ["--y" as string]: `${b.top}px`,
        order: Math.round(b.top),
            ["--w" as string]: `${b.w}px`,
            ["--h" as string]: `${b.h}px`,
          }}
        />
      ))}

      <SectionHeading top={1973} width={995}>Introduction</SectionHeading>
      <Body top={2033} width={995}>
        Vitra.AI is an AI-powered platform that helps teams translate, localize,
        and adapt content across multiple languages at scale. As the product
        grew, the need for a consistent, scalable design language became
        critical one that could support multiple product surfaces while
        maintaining visual and functional coherence across the entire
        experience.
      </Body>
      <Body top={2184} width={995}>
        In this project, we built the design system from the ground up,
        establishing a shared foundation that would serve both the current
        product and future iterations.
      </Body>

      <SectionHeading top={2303} width={995}>My Role</SectionHeading>
      <Body top={2363} width={995}>
        {
          "I worked alongside the Senior Product Designer, contributing across the full lifecycle of the design system from early problem framing and information architecture through to component design and final handoff.\nI was actively involved in shaping the visual language, building reusable components, and collaborating closely with engineers to ensure a smooth and accurate implementation."
        }
      </Body>

      <SectionHeading top={2538} width={995}>Problem</SectionHeading>
      <Body top={2598} width={995}>
        As Vitra.AI&rsquo;s product expanded, design and development teams were
        working without a shared system, leading to inconsistencies across the
        UI. Here are the key problems with the existing experience:
      </Body>

      {PROBLEMS.map((p) => (
        <NumberedCard
          key={p.title}
          top={p.top}
          eyebrow={p.eyebrow}
          eyebrowColor="#d62518"
          title={p.title}
          body={p.a}
          impact={p.b}
          bodyColor="#777777"
        />
      ))}

      <SectionHeading top={4559} width={196}>Issues Solved</SectionHeading>
      <Body top={4619}>
        The redesigned dashboard creates a cleaner, more structured workspace
        where users can access tools, manage projects, track usage, and upgrade
        easily. The workflow screen follows the same design system, making video
        dubbing simple with a focused upload, language selection, settings, and
        creation flow.
      </Body>

      {SOLUTIONS.map((s) => (
        <NumberedCard
          key={s.title}
          top={s.top}
          eyebrow={s.eyebrow}
          eyebrowColor="#03ad00"
          title={s.title}
          body={s.a}
          impact={s.b}
          bodyColor="#777777"
        />
      ))}

      <SectionHeading top={7364}>Components</SectionHeading>
      <Body top={7424}>
        As Vitra.AI&rsquo;s product expanded, design and development teams were
        working without a shared system, leading to inconsistencies across the
        UI. Here are the key problems with the existing experience:
      </Body>

      {/*
        The four component captions (y 8933, 9657, 10375, 11116) are CHILDREN
        of ds-comp-2..5, so they already appear in those exports and must not
        be drawn again. Only the Spacing and Drop Shadow bodies below are
        standalone siblings and need markup.

        Ownership here cannot be judged from coordinates — all six sit inside a
        sheet's bounds. It has to come from each node's ancestry.
      */}
      <SectionHeading top={11214} width={1052}>Spacing</SectionHeading>
      <Body top={11274} width={1052}>
        We established a base-4 spacing token system a fixed set of values (4,
        8, 12, 16, 20, 24, 32, 48px) that every component and layout is built
        from. This replaced the padding decisions that were causing
        inconsistencies across the product, ensuring whitespace feels
        intentional and consistent regardless of who designed or built the
        screens.
      </Body>

      <SectionHeading top={13173} width={1052}>Drop Shadow</SectionHeading>
      <Body top={13233} width={1052}>
        A defined set of shadow tokens used to communicate elevation and depth
        across the product. Each level is intentionally scoped from subtle card
        lifts to prominent modal overlays ensuring depth is applied consistently
        rather than decided on a case-by-case basis.
      </Body>

      {/*
        The Issues Solved captions (5370, 6104) and the Components caption
        (8209) are children of ds-solved-1 / ds-solved-2 / ds-comp-1, so they
        already appear in those exports. Drawing them again printed each twice.
      */}

      <Related top={16107} current="design-system" />
    </main>
  );
}
