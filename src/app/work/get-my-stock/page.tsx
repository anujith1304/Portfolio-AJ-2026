import type { Metadata } from "next";
import Image from "@/components/Img";
import { Figure } from "@/components/case-study/Figure";
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
type Block = {
  /** Shown only at xl, where a reflowed alternative takes over below it. */
  desktopOnly?: boolean;
  /** Offer the full-view control — only where the artwork rewards opening. */
  zoom?: boolean; src: string; alt: string; left: number; top: number; w: number; h: number };

const BLOCKS: Block[] = [
  // Stat visuals; each export covers render bounds, so it is centred on its box.
  { src: "gms-stat-1.png", alt: "", left: 704, top: 6337, w: 637, h: 520 },
  { src: "gms-stat-2.png", alt: "", left: 682, top: 6921, w: 681, h: 520 },
  { src: "gms-stat-3.png", alt: "", left: 686, top: 7504, w: 684, h: 596 },
  { src: "gms-stat-4.png", alt: "", left: 689, top: 8119, w: 673, h: 523 },
  { src: "gms-stat-5.png", alt: "", left: 656, top: 8706, w: 792, h: 570 },
  // 5854:37016 screen grid — 1905x5572 at (0,14243)
  // Desktop only — the per-screen list below replaces it under xl.
  { src: "gms-screens.png", alt: "Full screen set with annotations", left: -1, top: 14243, w: 1907, h: 5572, desktopOnly: true },
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

/**
 * Figures whose caption is a real text node in Figma rather than part of the
 * artwork. They were previously exported as one bitmap per card, which baked
 * the caption in at 16px — unreadable once the card scaled into a phone column.
 * The artwork is now exported on its own and the caption is markup, so it sets
 * at a readable size at every width.
 *
 * `order` is the reading position, not the render y: the cards sit two-up at
 * xl and their render bounds start at slightly different heights, so ordering
 * on y alone would flip each pair in the single-column flow.
 */
type Captioned = {
  src: string;
  alt: string;
  caption: string;
  label?: string;
  left: number;
  top: number;
  w: number;
  h: number;
  /** Distance from the artwork's render bottom to the caption in Figma. */
  gap: number;
  /** Offer the full-view control — only where the artwork rewards opening. */
  zoom?: boolean;
  /**
   * Leading page name to set apart from the sentence. The file runs these as
   * one Regular text run, so "Home Page Consistent 20px grid spacing..." has
   * no break at all; weight is the only change, the words are the file's.
   */
  lead?: string;
  /** Caption box inset from the wrapper's left, and its width, in Figma. */
  capX: number;
  capW: number;
  order: number;
};

const CAPTIONED: Captioned[] = [
  // Solution grid — 5908:15629, caption 5908:16409. Exported without the
  // caption, which the file carries as a real 16px text node; baked in it was
  // the tiny grey line under the artwork.
  { src: "gms-solutions-art.png", alt: "Four solution screens", left: 517, top: 4067, w: 1054, h: 568, gap: 10, capX: 4, capW: 1024, order: 4069, zoom: true,
    caption: "A structured design system that maintains visual consistency and improves the collaboration by standardizing UI components and design guidelines." },

  // Components — 5908:10849 / 5908:10863, caption 5908:10856 / 5908:12173
  { src: "gms-comp-1-art.png", alt: "Component library", left: 517, top: 9553, w: 1032, h: 536, gap: 14, capX: 4, capW: 1024, order: 9555,
    caption: "A structured design system that maintains visual consistency and improves the collaboration by standardizing UI components and design guidelines.",
    label: "Design System" },
  { src: "gms-comp-2-art.png", alt: "Typography and colour", left: 517, top: 10209, w: 1032, h: 536, gap: 14, capX: 4, capW: 1024, order: 10211,
    caption: "Satoshi typography ensures clear hierarchy and readability, while the primary color #003EAF strengthens brand identity and highlights key interactions.",
    label: "Design System" },


  // Spacing — 5908:12185 / 12190 / 12197 / 12202, captions 12188 / 12194 /
  // 12200 / 12206. One card per row, same treatment as the micro-interactions:
  // the caption is a single Regular run in the file, page name included, so it
  // is reproduced as one paragraph rather than split into a title.
  { src: "gms-spacing-home.webp", alt: "Home page spacing grid", left: 517, top: 11140, w: 518, h: 538, gap: 10, capX: 4, capW: 510, order: 11142,
    lead: "Home Page", caption: "Consistent 20px grid spacing keeps content breathable, with aligned card components and clear visual hierarchy guiding users to key actions at a glance." },
  { src: "gms-spacing-categories.webp", alt: "Categories page spacing grid", left: 1059, top: 11140, w: 518, h: 538, gap: 10, capX: 4, capW: 510, order: 11143,
    lead: "Categories Page", caption: "A uniform 12px & 24px gap between category tiles ensures a balanced grid layout, with left-aligned labels maintaining readability across all screen sizes." },
  { src: "gms-spacing-modal.webp", alt: "Change categories modal spacing", left: 517, top: 11790, w: 518, h: 538, gap: 10, capX: 4, capW: 510, order: 11792,
    lead: "Change Categories Modal", caption: "Centered modal with 20px & 24px internal padding creates focused content areas, while evenly spaced options reduce visual clutter and improve selection clarity." },
  { src: "gms-spacing-cart.webp", alt: "Cart page spacing grid", left: 1059, top: 11790, w: 518, h: 538, gap: 10, capX: 4, capW: 510, order: 11793,
    lead: "Cart Page", caption: "Item rows follow a strict 8px baseline grid, with right-aligned pricing and consistent 16px section spacing making the summary easy to scan before checkout." },

  // Micro-interactions — 5908:12447 / 12211 / 12664 / 12427 / 12680
  { src: "gms-micro-1-art.png", alt: "Category tap animation", left: 517, top: 12687, w: 513, h: 408, gap: 10, capX: 4, capW: 505, order: 12689,
    caption: "Tapping a category triggers a subtle scale-up animation, giving users instant visual feedback before navigating deeper into the app." },
  { src: "gms-micro-2-art.png", alt: "Promotional banner slide-in", left: 1046, top: 12681, w: 529, h: 424, gap: 0, capX: 12, capW: 505, order: 12690,
    caption: "The promotional banner smoothly slides in on load, drawing attention to active offers without disrupting the browsing experience." },
  { src: "gms-micro-3-art.png", alt: "App launch fade-in", left: 517, top: 13179, w: 513, h: 408, gap: 10, capX: 4, capW: 505, order: 13181,
    caption: "A clean fade-in on launch sets the brand tone, easing users into the app with a polished and confident first impression." },
  { src: "gms-micro-4-art.png", alt: "Cart bounce animation", left: 1046, top: 13173, w: 529, h: 424, gap: 0, capX: 12, capW: 505, order: 13182,
    caption: "A bounce animation on the cart icon confirms the action keeping users informed without interrupting their flow." },
  // The fifth card is a wide two-screen frame in the file rather than a single
  // phone, which is why it read as a different component. Same treatment as the
  // rest, so in flow it becomes another row like the others.
  { src: "gms-micro-5-art.png", alt: "Category switch slide transition", left: 517, top: 13671, w: 1050, h: 504, gap: 10, capX: 4, capW: 1042, order: 13673,
    caption: "Switching categories triggers a smooth horizontal slide transition, helping users maintain context as they browse across different product sections." },
];

/**
 * The Navigation section is one 1905x5572 export in the file: twelve phone
 * screens in two columns with pointed notes reaching out to the margins. That
 * holds together at desktop width, but scaled into a phone column it becomes a
 * wall of unreadable thumbnails.
 *
 * Below xl the same twelve screens are shown one per row, each with the title
 * and description from its own note — the text is markup here rather than
 * pixels, so it sets at a readable size. At xl the original export is used
 * unchanged, since it carries the pointer arrows that connect note to screen.
 */
const NAV_SCREENS = [
  { src: "welcome",    title: "Welcome Screen",       body: "A minimal splash screen introducing the brand and smoothly transitioning users into the app." },
  { src: "sign-in",    title: "Sign-In using number", body: "Users enter their number to begin a fast, secure, password-free OTP login process." },
  { src: "otp",        title: "Enter OTP",            body: "An intuitive, secure, and user-friendly sign-in flow with OTP-based authentication for a seamless experience." },
  { src: "onboarding", title: "On boarding Page",     body: "A welcoming onboarding screen introducing the grocery experience and encouraging users to get started." },
  { src: "home",       title: "Home Page",            body: "A centralized Home Screen showing categories, offers, quick access to search and navigation and also recently ordered Products." },
  { src: "categories", title: "Categories Page",      body: "Users explore categorized grocery items, view product listings, and quickly add products to cart." },
  { src: "product",    title: "Product Details page", body: "Displays product images, pricing, weight options, and detailed descriptions to help users make purchase decisions." },
  { src: "favorites",  title: "Favorites Page",       body: "Users save favorite items and quickly add products to their shopping list for faster purchases." },
  { src: "cart",       title: "Cart Screen",          body: "Last Minute Add-ons — suggested products at the cart stage increase average order value without disrupting the checkout flow." },
  { src: "sort",       title: "Sort by Modal",        body: "Sort products by relevance, price, or discounts to find the most suitable items quickly and efficiently." },
  { src: "account",    title: "Account Page",         body: "Manage profile details, delivery addresses, payment methods, and app preferences from a centralized and easy-to-navigate account dashboard." },
  { src: "tracking",   title: "Order Tracking page",  body: "Track your order in real time with map updates, delivery status, and estimated arrival information for better transparency." },
];

export default function GetMyStockCaseStudy() {
  return (
    <main
      className="page-x relative mx-auto flex w-full flex-col overflow-x-clip pt-[92px] pb-[64px] xl:h-[20497px] xl:w-[1905px] xl:block xl:overflow-x-visible xl:px-0 xl:pt-0 xl:pb-0"
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
      <h1 className="mb-[16px] font-display text-[64px] leading-[72px] font-medium text-[#060d19] xl:absolute xl:left-[192px] xl:top-[419px] xl:w-[1072px] xl:mb-0" style={{ order: 419 }}>
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
      <p className="mb-[16px] text-[18px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1427px] xl:top-[563px] xl:mb-0" style={{ order: 563 }}>
        Product Designer
      </p>
      <p className="mb-[16px] text-[18px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1595px] xl:top-[563px] xl:mb-0" style={{ order: 563 }}>
        2024 — 2025
      </p>

      {/* 5854:34148 — hero mockup, 1521x853 at (192,651); export carries 4px spill */}
      <Figure
        src="/images/case/gms-hero.png"
        alt="Get My Stock app screens"
        width={3058}
        height={1722}
        priority
        zoomable
        className="mb-[16px] xl:absolute xl:left-[188px] xl:top-[647px] xl:mb-0 xl:h-[861px] xl:w-[1529px]"
        style={{ order: 647 }}
      />

      {/*
        5854:34739 — standfirst. A MIXED-fill text node: all Satoshi Medium 32,
        but the two key phrases are #363b45 against #707581 for the rest.
      */}
      <p className="mb-[16px] text-[32px] leading-[43px] font-medium text-[#707581] xl:absolute xl:left-[521px] xl:top-[1604px] xl:w-[937px] xl:mb-0" style={{ order: 1604 }}>
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
        <Figure
          key={b.src}
          src={`/images/case/${b.src}`}
          alt={b.alt}
          width={b.w * 2}
          height={b.h * 2}
          zoomable={b.zoom}
          className={`mb-[24px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:h-[var(--h)] xl:w-[var(--w)] xl:max-w-none xl:rounded-none ${b.desktopOnly ? "hidden xl:block" : ""}`}
          style={{
            ["--x" as string]: `${b.left}px`,
            ["--y" as string]: `${b.top}px`,
        order: Math.round(b.top),
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
      <div className="mb-[16px] text-[20px] leading-[28px] font-normal text-[#222227] xl:absolute xl:left-[521px] xl:top-[2602px] xl:w-[934px] xl:mb-0" style={{ order: 2602 }}>
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
        className="mb-[16px] flex items-center rounded-[20px] px-[24px] py-[28px] xl:absolute xl:left-[521px] xl:top-[5421px] xl:mb-0 xl:h-[164px] xl:w-[1099px] xl:rounded-[24px] xl:px-[64px] xl:py-0"
        style={{
          order: 5421,
          backgroundImage: "linear-gradient(180deg, #003EAF 0%, #87AFF9 100%)",
        }}
      >
        <p className="font-display text-[21px] leading-[1.35] font-medium text-white xl:text-[32px] xl:leading-[44px]">
          How might we build a better experience for consumers to{" "}
          <span className="font-bold">save more</span> on their daily life
          style?
        </p>
      </div>

      {/* 5854:34765 — "Defining the problem" grid */}
      <h2 className="mb-[16px] font-display text-[40px] leading-[53px] font-medium text-[#060d19] xl:absolute xl:left-[521px] xl:top-[5689px] xl:w-[381px] xl:mb-0" style={{ order: 5689 }}>
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

      <p className="mb-[16px] text-[16px] leading-[24px] font-medium text-[#060d19] xl:absolute xl:left-[987px] xl:top-[5689px] xl:w-[117px] xl:mb-0" style={{ order: 5689 }}>
        Business Goals
      </p>
      <Body top={5689} left={1124} width={498} size={16} lh={28} color="#060d19">
        {
          "Build a scalable B2B procurement platform We created an end-to-end ordering experience that connects retailers directly with distributors  making Get My Stock the default restocking tool for small and medium retailers in India.\nOperational efficiency We built scalable design components across catalogue, ordering, and payment flows reducing friction for both retailers and distributors on the platform."
        }
      </Body>
      <p className="mb-[16px] text-[16px] leading-[24px] font-medium text-[#060d19] xl:absolute xl:left-[987px] xl:top-[5928px] xl:w-[85px] xl:mb-0" style={{ order: 5928 }}>
        User Goals
      </p>
      <Body top={5928} left={1120} width={499} size={16} lh={24} color="#060d19">
        {
          "Faster, easier restocking To give retailers a single place to browse products, check live availability, compare prices, and place orders cutting down the time spent on calls and manual coordination every day.\nA reliable, consistent ordering experience To ensure every part of the app from product discovery to checkout feels trustworthy, predictable, and easy to use, even for first-time digital buyers."
        }
      </Body>
      <p className="mb-[16px] text-[16px] leading-[24px] font-medium text-[#060d19] xl:absolute xl:left-[987px] xl:top-[6134px] xl:w-[70px] xl:mb-0" style={{ order: 6134 }}>
        Impact
      </p>
      <Body top={6134} left={1120} width={478} size={16} lh={24} color="#060d19">
        As this was a zero-to-one product, we shipped the app in phases starting
        with core catalogue and ordering flows, followed by payments and order
        tracking. For confidentiality reasons, I have omitted the actual
        business metrics.
      </Body>



      {/*
        Each figure is one flow item — artwork plus its own caption — so the
        two-up pairs become single rows in the phone column instead of the
        artwork and captions interleaving.
      */}
      {CAPTIONED.map((c) => (
        <div
          key={c.src}
          className="mb-[36px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:w-[var(--w)]"
          style={{
            ["--x" as string]: `${c.left}px`,
            ["--y" as string]: `${c.top}px`,
            ["--w" as string]: `${c.w}px`,
            order: c.order,
          }}
        >
          <Figure
            src={`/images/case/${c.src}`}
            alt={c.alt}
            width={c.w * 2}
            height={c.h * 2}
            zoomable={c.zoom}
            className="xl:h-[var(--fh)] xl:w-full"
            style={{ ["--fh" as string]: `${c.h}px` } as React.CSSProperties}
          />
          {/*
            The wrapper sits on the artwork's render box, which is a few px
            wider than the caption's own box; capX/capW put the caption back on
            its Figma rectangle at xl and are ignored in flow.
          */}
          <div
            className="mt-[12px] xl:mt-[var(--gap)] xl:ml-[var(--cx)] xl:w-[var(--cw)]"
            style={{
              ["--cx" as string]: `${c.capX}px`,
              ["--cw" as string]: `${c.capW}px`,
              // Figma's own gap at xl; in flow a 12px minimum keeps the caption
              // off the artwork where the design has it flush.
              ["--gap" as string]: `${c.gap}px`,
            }}
          >
            <p className="text-[17px] leading-[1.6] text-[#6b6b6b] xl:text-[16px] xl:leading-[22px]">
              {c.lead && (
                <span className="font-medium text-[#3f3f3f]">{c.lead} </span>
              )}
              {c.caption}
            </p>
            {c.label && (
              <p className="mt-[8px] text-[14px] leading-[20px] text-[#9a9a9a] xl:mt-[11px]">
                {c.label}
              </p>
            )}
          </div>
        </div>
      ))}

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
        The navigation walkthrough, one screen per row. Only below xl — at that
        width the file's own annotated grid is shown instead.
      */}
      <section
        className="mb-[8px] flex flex-col gap-[44px] xl:hidden"
        style={{ order: 14320 }}
        aria-label="Navigation walkthrough"
      >
        <div>
          <h2 className="font-display text-[26px] leading-[1.25] font-semibold text-[#222227]">
            Navigation
          </h2>
          <p className="mt-[12px] text-[17px] leading-[1.65] text-[#222227]">
            A seamless end-to-end flow designed to get users from sign-up to
            checkout with minimal friction — every screen connected with purpose
            and clarity.
          </p>
        </div>
        {NAV_SCREENS.map((n) => (
          <div key={n.src}>
            <Figure
              src={`/images/case/nav/${n.src}.webp`}
              alt={n.title}
              width={763}
              height={1574}
              className="mx-auto w-full max-w-[340px]"
            />
            <h3 className="mt-[16px] text-[19px] leading-[1.35] font-semibold text-[#222227]">
              {n.title}
            </h3>
            <p className="mt-[6px] text-[17px] leading-[1.6] text-[#6b6b6b]">
              {n.body}
            </p>
          </div>
        ))}
      </section>

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
        style={{ order: 19855 }}
      />
      <Link
        href="/work/design-system"
        aria-label="Aero UI Design System case study"
        className="mb-[16px] rounded-[24px] transition-colors hover:bg-black/[0.03] xl:absolute xl:left-[191px] xl:top-[19962px] xl:h-[454px] xl:w-[748px] xl:mb-0"
        style={{ order: 19962 }}
      />
      <Link
        href="/"
        aria-label="Back to portfolio"
        className="mb-[16px] rounded-[24px] transition-colors hover:bg-black/[0.03] xl:absolute xl:left-[963px] xl:top-[19962px] xl:h-[454px] xl:w-[748px] xl:mb-0"
        style={{ order: 19962 }}
      />
    </main>
  );
}
