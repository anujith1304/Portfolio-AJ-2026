import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import {
  CaseNav,
  BackLink,
  CaseLogo,
  MetaRow,
  SectionHeading,
  Body,
  NumberedCard,
} from "@/components/case-study/CaseShell";
import { CaseSideNav, Anchor } from "@/components/case-study/CaseSideNav";
import { canvasSurface } from "@/lib/canvas";

/** Blocks exported from Figma and placed on their node coordinates. */
type Block = { src: string; alt: string; left: number; top: number; w: number; h: number };

const BLOCKS: Block[] = [
  // 5854:38588 solution grid — export 2108x1260 (2x of 1054x630), box 1046x628
  { src: "gms-solutions.png", alt: "Four solution screens", left: 517, top: 4068, w: 1054, h: 630 },
  // Stat visuals; each export covers render bounds, so it is centred on its box.
  { src: "gms-stat-1.png", alt: "", left: 704, top: 6337, w: 637, h: 520 },
  { src: "gms-stat-2.png", alt: "", left: 682, top: 6921, w: 681, h: 520 },
  { src: "gms-stat-3.png", alt: "", left: 686, top: 7504, w: 684, h: 596 },
  { src: "gms-stat-4.png", alt: "", left: 689, top: 8119, w: 673, h: 523 },
  { src: "gms-stat-5.png", alt: "", left: 656, top: 8706, w: 792, h: 570 },
  // Component showcases — 1024x624 boxes, exports 1032x626
  { src: "gms-comp-1.png", alt: "Component library", left: 517, top: 9554, w: 1032, h: 626 },
  { src: "gms-comp-2.png", alt: "Typography and colour", left: 517, top: 10210, w: 1032, h: 626 },
  // Spacing showcase — 1052x1268 box, export 1060x1270
  { src: "gms-spacing.png", alt: "Spacing system", left: 517, top: 11141, w: 1060, h: 1270 },
  // Micro-interaction cards — 505x460 boxes
  { src: "gms-micro-1.png", alt: "Category tap animation", left: 517, top: 12688, w: 513, h: 462 },
  { src: "gms-micro-2.png", alt: "Promotional banner slide-in", left: 1050, top: 12686, w: 529, h: 468 },
  { src: "gms-micro-3.png", alt: "App launch fade-in", left: 517, top: 13180, w: 513, h: 462 },
  { src: "gms-micro-4.png", alt: "Cart bounce animation", left: 1050, top: 13178, w: 529, h: 468 },
  // 5854:36682 — 1042x536 box, export 1050x538
  { src: "gms-container.png", alt: "", left: 517, top: 13672, w: 1050, h: 538 },
  // 5854:37016 screen grid — 1905x5572 at (0,14243)
  { src: "gms-screens.png", alt: "Full screen set with annotations", left: -1, top: 14243, w: 1907, h: 5572 },
];

/**
 * Get My Stock case study — Figma 5854:34147, 1905x20497.
 *
 * Everything is placed at its Figma coordinate inside a 1905-wide frame, the
 * same approach the home page uses. Copy is verbatim from the file.
 *
 * The dense visual blocks (solution grid, stat visuals, component and
 * spacing showcases, micro-interaction cards, the 1905x5572 screen grid and
 * the Related strip) are exported from Figma and listed in BLOCKS above —
 * they are product mockups and annotated screen sets, not layout.
 */

export const metadata: Metadata = {
  title: "Get My Stock — Case Study | Anujith S",
  description:
    "Founding Product Designer on a 0→1 B2B procurement app for Indian retailers, from problem framing through to a shipped iOS and Android release.",
};

const SIDE_NAV = [
  { label: "Introduction", id: "introduction", top: 1977 },
  { label: "My Role", id: "my-role", top: 2307 },
  { label: "Problem", id: "problem", top: 2542 },
  { label: "Issues Solved", id: "issues-solved", top: 3922 },
  { label: "Solutions", id: "solutions", top: 4729 },
  { label: "Components", id: "components", top: 9376 },
  { label: "Spacing", id: "spacing", top: 10935 },
  { label: "Micro Interaction", id: "micro-interaction", top: 12510 },
  { label: "Navigation", id: "navigation", top: 14243 },
];

const PROBLEMS = [
  {
    top: 2865,
    eyebrow: "PROBLEM #01",
    title: "No Way to Browse Stock Digitally",
    body: "Retailers had no structured way to discover or browse products from their distributors. Everything was word-of-mouth or catalogue-based, making it impossible to shop efficiently.",
    impact:
      "Impact Without a browsable catalogue, retailers wasted hours sourcing products and frequently missed items they needed.",
  },
  {
    top: 3115,
    eyebrow: "PROBLEM #02",
    title: "No Real-Time Visibility",
    body: "Description Retailers had no live view of what was in stock, what was on offer, or what was being delivered to their area — making planning nearly impossible.",
    impact:
      "Impact Blind ordering led to frequent fulfillment failures, eroding trust between retailers and distributors.",
  },
  {
    top: 3365,
    eyebrow: "PROBLEM #03",
    title: "No Product Information",
    body: "Description Retailers had little to no information about the products they were buying — no descriptions, no pack sizes, no ingredients, and no alternatives shown.",
    impact:
      "Impact Lack of product detail led to wrong orders, returns, and retailer frustration.",
  },
  {
    top: 3615,
    eyebrow: "PROBLEM #04",
    title: "No Structured Checkout or Order Summary",
    body: "Retailers had no clear way to review, confirm, or manage their orders before finalizing a purchase. There was no itemized summary, no way to apply discounts, and no visibility into delivery timelines making the checkout process entirely guesswork.",
    impact:
      "Without a structured checkout, retailers made frequent ordering errors, missed distributor offers, and had no way to plan stock replenishment without knowing when their order would arrive.",
  },
];

const SOLUTIONS = [
  {
    top: 4729,
    eyebrow: "SOLUTION #01",
    title: "Stock is Now Browsable Digitally",
    body: "Stock is Now Browsable Digitally Retailers can browse a fully structured digital catalogue, search products by name, and explore deals all from one screen. The days of relying on word-of-mouth or physical catalogues to place an order are gone.",
  },
  {
    top: 4894,
    eyebrow: "SOLUTIONS #02",
    title: "Real-Time Visibility at Every Step",
    body: "Live stock status is now visible at every stage of browsing. Retailers know exactly what's available, what's on offer, and what can be delivered before placing a single order.",
  },
  {
    top: 5059,
    eyebrow: "SOLUTIONS #03",
    title: "Complete Product Information, Always",
    body: "Always Every product has a dedicated page with imagery, descriptions, weight variants, pack sizes, and similar product suggestions. Retailers have everything they need to make a confident, informed purchase without any guesswork.",
  },
  {
    top: 5224,
    eyebrow: "SOLUTIONS #04",
    title: "Checkout is Now Guided and Frictionless",
    body: "Everything together itemized order review, coupon application, last-minute add-ons, and a clear total with delivery timeline. Retailers can complete their order confidently with full visibility into what they're paying and when it arrives.",
  },
];

export default function GetMyStockCaseStudy() {
  return (
    <main
      className="page-x relative mx-auto w-full overflow-x-clip pt-[92px] pb-[64px] xl:h-[20497px] xl:w-[1905px] xl:overflow-x-visible xl:px-0 xl:pt-0 xl:pb-0"
      style={canvasSurface}
    >
      <CaseNav />
      <BackLink />
      <CaseLogo
        src="/images/case/gms-logo.png"
        alt="Get My Stock"
        left={192}
        top={273}
        boxW={174}
        boxH={82}
        imgW={213.5}
        imgH={121.75}
      />

      {/* 5854:34785 — title + intro */}
      <h1 className="mb-[16px] font-display text-[64px] leading-[72px] font-medium text-[#060d19] xl:absolute xl:left-[192px] xl:top-[419px] xl:w-[1072px] xl:mb-0">
        Get My Stock, 0→1 B2B Mobile App
      </h1>
      <Body top={511} left={192} width={1072} size={18} lh={24} color="#5d6067">
        I led the end-to-end design from concept to launch, taking the product
        from an early idea to live. My work covered the problem framing, user
        flows and information architecture, wireframes and interaction design,
        and the final UI/visual language. I also built a reusable component
        system and partnered closely with engineer&rsquo;s to deliver a first
        release and a strong foundation for future iterations.
      </Body>
      <p className="mb-[16px] text-[18px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1427px] xl:top-[563px] xl:mb-0">
        Product Designer
      </p>
      <p className="mb-[16px] text-[18px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1595px] xl:top-[563px] xl:mb-0">
        2024 — 2025
      </p>

      {/* 5854:34148 — hero mockup, 1521x853 at (192,651); export carries 4px spill */}
      <Image
        src="/images/case/gms-hero.png"
        alt="Get My Stock app screens"
        width={3058}
        height={1722}
        priority
        className="mb-[16px] xl:absolute xl:left-[188px] xl:top-[647px] xl:h-[861px] xl:w-[1529px] xl:mb-0 h-auto w-full rounded-[10px] xl:max-w-none xl:rounded-none"
      />

      {/*
        5854:34739 — standfirst. A MIXED-fill text node: all Satoshi Medium 32,
        but the two key phrases are #363b45 against #707581 for the rest.
      */}
      <p className="mb-[16px] text-[32px] leading-[43px] font-medium text-[#707581] xl:absolute xl:left-[521px] xl:top-[1604px] xl:w-[937px] xl:mb-0">
        I was a <span className="text-[#363b45]">Founding product designer</span>{" "}
        at Get My Stock, where I led the design of a complete{" "}
        <span className="text-[#363b45]">B2B App</span> and led the end-to-end
        design from concept to launch, taking the product from an early idea to
        live
      </p>

      {/* 5854:34742 — meta row */}
      <MetaRow
        box={{ left: 521, top: 1812, width: 929, height: 101 }}
        items={[
          { label: "Timeline", value: "Oct 2024—Mar 2025", left: 521 },
          { label: "Platform", value: "iOS & Android App", left: 771 },
          { label: "My Role", value: "Product Designer", left: 992 },
          { label: "Tools Used", value: "Figma, Flutter", left: 1213 },
        ]}
      />

      <CaseSideNav
        items={SIDE_NAV}
        startAt={1977}
        cardFrom={14243}
        /* Related strip top; the list clears out before it scrolls in. */
        endAt={19855}
      />
      {SIDE_NAV.map((i) => (
        <Anchor key={i.id} id={i.id} top={i.top} />
      ))}

      {/* Exported Figma blocks, each on its node coordinate */}
      {/*
        The two component sheets already contain their own caption and the
        "Design System" label, so no text layer is drawn over them — doing so
        printed each description twice, slightly offset.
      */}
      {BLOCKS.map((b) => (
        <Image
          key={b.src}
          src={`/images/case/${b.src}`}
          alt={b.alt}
          width={b.w * 2}
          height={b.h * 2}
          className="mb-[24px] h-auto w-full rounded-[10px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:h-[var(--h)] xl:w-[var(--w)] xl:max-w-none xl:rounded-none"
          style={{
            ["--x" as string]: `${b.left}px`,
            ["--y" as string]: `${b.top}px`,
            ["--w" as string]: `${b.w}px`,
            ["--h" as string]: `${b.h}px`,
          }}
        />
      ))}

      <SectionHeading top={1977} width={935}>Introduction</SectionHeading>
      <Body top={2037} width={935}>
        Get My Stock is a B2B procurement app built for small and medium-sized
        retailers to streamline how they source and restock inventory. The
        platform connects retailers directly with distributors and wholesalers,
        enabling faster ordering, real-time stock visibility, and flexible
        payment option, all from a single app. Get My Stock aims to digitise the
        traditionally fragmented supply chain experience for India&rsquo;s
        retail ecosystem.
      </Body>
      <Body top={2188} width={935}>
        In this project, we built the entire product from the ground up,
        designing and shipping the app across both iOS and Android within a
        focused six-month sprint.
      </Body>

      <SectionHeading top={2307} width={935}>My Role</SectionHeading>
      <Body top={2367} width={935}>
        I was the Founding Product Designer for Get My Stock, owning the
        end-to-end design process from early ideation through to the live
        product launch. I worked closely with the founding team, product
        managers, and engineering leads to define the core user experience,
        establish the design system, and ensure every screen was
        production-ready.
      </Body>

      <SectionHeading top={2542} width={934}>Problem</SectionHeading>
      {/*
        5854:34761 — one text node, but getRangeListOptions reports the opening
        paragraph as NONE and the four lines after it as UNORDERED. They are
        genuine bullets in the file, so they are marked up as a list.
      */}
      <div className="mb-[16px] text-[20px] leading-[28px] font-normal text-[#222227] xl:absolute xl:left-[521px] xl:top-[2602px] xl:w-[934px] xl:mb-0">
        <p>
          Small retailers in India still rely heavily on phone calls, WhatsApp
          messages, and in-person visits to reorder stock from their suppliers.
          This process is slow, error-prone, and lacks any visibility into
          pricing, availability, or order status. Here are the key problems with
          the existing experience:
        </p>
        <ul className="mt-[28px] list-disc space-y-[2px] pl-[26px]">
          <li>
            No centralised platform to browse and order from multiple
            distributors at once
          </li>
          <li>Pricing is inconsistent and not transparent across suppliers</li>
          <li>
            Retailers have no real-time visibility into stock availability or
            delivery timelines
          </li>
          <li>
            Payment and credit terms are managed entirely offline, causing
            delays and disputes
          </li>
        </ul>
      </div>

      {PROBLEMS.map((p) => (
        <NumberedCard key={p.eyebrow} {...p} eyebrowColor="#d62518" />
      ))}

      <SectionHeading top={3922} width={196}>Issues Solved</SectionHeading>
      <Body top={3982}>
        The product addressed each problem turning a slow, offline process into
        a fast, transparent, and easy-to-use experience for retailers and
        distributors.
      </Body>

      {SOLUTIONS.map((s) => (
        <NumberedCard key={s.eyebrow} {...s} eyebrowColor="#03ad00" />
      ))}

      {/*
        5854:34762 — "how might we" banner, 1099x164 at (521,5421), radius 24.
        Its fill is a vertical gradient #003eaf -> #87aff9, and the copy is
        Recoleta 32 in white with "save more" set Bold rather than Medium.
      */}
      <div
        className="mb-[16px] flex items-center rounded-[24px] px-[64px] xl:absolute xl:left-[521px] xl:top-[5421px] xl:h-[164px] xl:w-[1099px] xl:mb-0"
        style={{ backgroundImage: "linear-gradient(180deg, #003EAF 0%, #87AFF9 100%)" }}
      >
        <p className="font-display text-[32px] leading-[44px] font-medium text-white">
          How might we build a better experience for consumers to{" "}
          <span className="font-bold">save more</span> on their daily life
          style?
        </p>
      </div>

      {/* 5854:34765 — "Defining the problem" grid */}
      <h2 className="mb-[16px] font-display text-[40px] leading-[53px] font-medium text-[#060d19] xl:absolute xl:left-[521px] xl:top-[5689px] xl:w-[381px] xl:mb-0">
        Defining the problem
      </h2>
      <Body top={5765} left={521} width={383} size={16} lh={22} color="#494949">
        How might we build a better experience for retailers to restock faster
        and run their business more efficiently?
      </Body>
      {/*
        5854:34768 / 34775 / 34780 — "Line" frames, 630x1, #b5b5b5, sitting
        above each row of the grid at x=466 within it (absolute x 987).
      */}
      {[5648, 5907, 6113].map((top) => (
        <div
          key={top}
          aria-hidden
          className="hidden h-px bg-[#b5b5b5] xl:absolute xl:left-[987px] xl:top-[var(--y)] xl:block xl:w-[630px]"
          style={{ ["--y" as string]: `${top}px` }}
        />
      ))}

      <p className="mb-[16px] text-[16px] leading-[24px] font-medium text-[#060d19] xl:absolute xl:left-[987px] xl:top-[5689px] xl:w-[117px] xl:mb-0">
        Business Goals
      </p>
      <Body top={5689} left={1124} width={498} size={16} lh={28} color="#060d19">
        {
          "Build a scalable B2B procurement platform We created an end-to-end ordering experience that connects retailers directly with distributors  making Get My Stock the default restocking tool for small and medium retailers in India.\nOperational efficiency We built scalable design components across catalogue, ordering, and payment flows reducing friction for both retailers and distributors on the platform."
        }
      </Body>
      <p className="mb-[16px] text-[16px] leading-[24px] font-medium text-[#060d19] xl:absolute xl:left-[987px] xl:top-[5928px] xl:w-[85px] xl:mb-0">
        User Goals
      </p>
      <Body top={5928} left={1120} width={499} size={16} lh={24} color="#060d19">
        {
          "Faster, easier restocking To give retailers a single place to browse products, check live availability, compare prices, and place orders cutting down the time spent on calls and manual coordination every day.\nA reliable, consistent ordering experience To ensure every part of the app from product discovery to checkout feels trustworthy, predictable, and easy to use, even for first-time digital buyers."
        }
      </Body>
      <p className="mb-[16px] text-[16px] leading-[24px] font-medium text-[#060d19] xl:absolute xl:left-[987px] xl:top-[6134px] xl:w-[70px] xl:mb-0">
        Impact
      </p>
      <Body top={6134} left={1120} width={478} size={16} lh={24} color="#060d19">
        As this was a zero-to-one product, we shipped the app in phases starting
        with core catalogue and ordering flows, followed by payments and order
        tracking. For confidentiality reasons, I have omitted the actual
        business metrics.
      </Body>


      <SectionHeading top={9376}>Components</SectionHeading>
      <Body top={9436}>
        As Get My Stock scaled, inconsistent UI patterns made it harder for
        users to navigate and trust the platform. Here are the key issues that
        shaped the component redesign:
      </Body>

      <SectionHeading top={10935} width={1052}>Spacing</SectionHeading>
      <Body top={10995} width={1052}>
        We established a base-4 spacing token system a fixed set of values (4,
        8, 12, 16, 20, 24, 32, 48px) that every component and layout is built
        from. This replaced the padding decisions that were causing
        inconsistencies across the product, ensuring whitespace feels
        intentional and consistent regardless of who designed or built the
        screens.
      </Body>

      <SectionHeading top={12510} width={1042}>Micro - interactions</SectionHeading>
      <Body top={12570} width={1042}>
        Small, intentional animations that guide users through the app — making
        every tap, swipe, and transition feel responsive and natural.
      </Body>

      {/*
        5854:38498 "Related", 1905x642 at y=19855. Rendered as the Figma
        export so it matches exactly, with transparent hit areas over the two
        cards — the RelatedItems row is 1520 wide at x=191, split in two.
      */}
      <Image
        src="/images/case/gms-related.png"
        alt=""
        width={3810}
        height={1284}
        className="mb-[16px] left-0 xl:absolute xl:top-[19855px] xl:h-[642px] xl:w-[1905px] xl:mb-0 h-auto w-full rounded-[10px] xl:max-w-none xl:rounded-none"
      />
      <Link
        href="/work/design-system"
        aria-label="Aero UI Design System case study"
        className="mb-[16px] rounded-[24px] transition-colors hover:bg-black/[0.03] xl:absolute xl:left-[191px] xl:top-[19962px] xl:h-[454px] xl:w-[748px] xl:mb-0"
      />
      <Link
        href="/"
        aria-label="Back to portfolio"
        className="mb-[16px] rounded-[24px] transition-colors hover:bg-black/[0.03] xl:absolute xl:left-[963px] xl:top-[19962px] xl:h-[454px] xl:w-[748px] xl:mb-0"
      />
    </main>
  );
}
