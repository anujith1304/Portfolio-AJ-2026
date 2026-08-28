"use client";

import { useState } from "react";
import Image from "@/components/Img";
import Link from "next/link";
import {
  CaseNav,
  BackLink,
  MetaRow,
  SectionHeading,
  Body,
  NumberedCard,
} from "@/components/case-study/CaseShell";
import { CaseSideNav, Anchor } from "@/components/case-study/CaseSideNav";
import { StateTabs, STATE_TABS_TRACK } from "@/components/case-study/StateTabs";
import { FloatingStateTabs } from "@/components/case-study/FloatingStateTabs";
import { canvasSurface } from "@/lib/canvas";
import {
  STATES,
  CHANGED,
  WORKED,
  LEARNINGS,
  TAIL_RULES,
  type Variant,
} from "./content";

/**
 * Translate.video Product Rethink.
 *
 * Figma holds this as two sibling frames — 5908:21013 ("Problem", 16536 tall)
 * and 5908:25725 ("Solution", 16623) — wired to each other through the tab
 * strip at (462,2618). Everything above that strip is identical in both, so it
 * is written once here; everything below comes from ./content per state.
 */

/**
 * One column of the before/after table (5908:24532-24543). Figma marks every
 * row as an UNORDERED list item at indent 1, which puts the marker 12.5px into
 * the 28px text box and starts the copy at 27.6px. Browsers derive marker
 * metrics from the font, so the dot is drawn explicitly to land where Figma
 * puts it. Rows are 48px apart: a 28px box plus a 20px gap.
 */
function ChangeList({
  top,
  left,
  width,
  color,
  items,
}: {
  top: number;
  left: number;
  width: number;
  color: string;
  items: string[];
}) {
  return (
    <ul
      className="absolute list-none text-[18px] leading-[28px]"
      style={{ left, top, width, color }}
    >
      {items.map((t) => (
        <li key={t} className="relative mb-[20px] pl-[27.6px] last:mb-0">
          <span
            aria-hidden
            className="absolute left-[10.3px] top-[13.95px] h-[4.3px] w-[4.3px] rounded-full bg-current"
          />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function CaseBody() {
  const [variant, setVariant] = useState<Variant>("before");
  const s = STATES[variant];
  const t = s.tailOffset;
  const relatedTop = 15894 + t;

  return (
    <main
      className="relative mx-auto w-[1905px]"
      style={{ ...canvasSurface, height: s.height }}
    >
      <CaseNav />
      <BackLink />

      {/*
        5908:25738 — product mark. The node box is 294x94 at (192,269) but the
        frame does not clip, so the mark's real extent is its render bounds.
      */}
      <Image
        src="/images/case/tv/logo.webp"
        alt="Translate.video"
        width={333}
        height={133}
        className="absolute left-[172px] top-[253px] h-[133px] w-[333px] max-w-none"
      />

      <h1 className="absolute left-[192px] top-[415px] w-[1072px] font-display text-[64px] leading-[72px] font-medium tracking-[-0.01em] text-[#060d19]">
        Translate.video Product Rethink
      </h1>
      <Body top={507} left={192} width={1072} size={18} lh={24} color="#5d6067">
        Translate.video is an AI-powered video localization platform that helps
        creators, teams, and businesses translate and repurpose video content
        for global audiences. The product supports workflows such as video
        dubbing, subtitle translation, text-to-speech, voice cloning, and
        lip-sync generation, allowing users to create multilingual videos faster
        without relying on complex manual editing processes.
      </Body>
      <p className="absolute left-[1428px] top-[559px] text-[18px] leading-[24px] text-[#5d6067]">
        Product Designer
      </p>
      <p className="absolute left-[1595px] top-[559px] text-[18px] leading-[24px] text-[#5d6067]">
        2025 — 2026
      </p>

      {/* 5908:25745 — hero, placed on its render bounds so the shadow survives */}
      <Image
        src="/images/case/tv/hero.webp"
        alt="Translate.video dashboard"
        width={1529}
        height={848}
        priority
        className="absolute left-[188px] top-[681px] h-[848px] w-[1529px] max-w-none"
      />

      {/*
        5908:27009 is a MIXED-fill node: the body sits at #707581 and only the
        two product names are lifted to #222227.
      */}
      <p className="absolute left-[462px] top-[1587px] w-[981px] text-[32px] leading-[43px] font-medium tracking-[-0.8px] text-[#707581]">
        Designed the end-to-end experience for{" "}
        <span className="text-[#222227]">Translate.video</span> at{" "}
        <span className="text-[#222227]">Vitra.AI,</span> contributing across
        problem framing, user flows, wireframes, interaction design, and final
        UI. The goal was to create a scalable, intuitive product experience for
        video dubbing, translation, voice cloning, and text-to-speech workflows.
      </p>

      <MetaRow
        box={{ left: 462, top: 1839, width: 981, height: 101 }}
        items={[
          { label: "Timeline", value: "Feb - Jun (2026)", left: 462 },
          { label: "Platform", value: "Web Application", left: 712 },
          { label: "My Role", value: "UX/UI Designer", left: 933 },
          { label: "Tools used", value: "Figma, Design system, React JS", left: 1153 },
        ]}
      />

      <CaseSideNav
        key={variant}
        items={s.nav.items}
        startAt={2004}
        endAt={relatedTop}
        sideNavLeft={s.nav.left}
      />
      <Anchor id="introduction" top={2004} />
      <Anchor id="my-role" top={2303} />

      <SectionHeading top={2004} left={462} width={1013}>Introduction</SectionHeading>
      <Body top={2064} left={462} width={1013} lh={32}>
        Translate.video is an AI-powered video localization product by Vitra.AI
        that helps teams translate, dub, subtitle, and adapt video content for
        global audiences. As the product expanded across multiple workflows, the
        interface needed to become more consistent, scalable, and easier to use.
      </Body>
      <Body top={2184} left={462} width={1013}>
        The goal was to create a cleaner and more reliable experience that could
        support current translation workflows while also providing a strong
        foundation for future product features.
      </Body>

      <SectionHeading top={2303} left={462} width={1013}>My Role</SectionHeading>
      <Body top={2363} left={462} width={1013}>
        I contributed to the end-to-end redesign of Translate.video, working
        across research, problem framing, user flows, wireframes, interaction
        design, and final UI execution. My role focused on improving the product
        experience, creating reusable components, refining the visual language,
        and ensuring the design was scalable across key workflows such as video
        dubbing, subtitle translation, voice cloning, and text-to-speech.
      </Body>
      <Body top={2499} left={462} width={1013}>
        I also collaborated closely with engineers to ensure a smooth design
        handoff and maintain consistency between design and implementation.
      </Body>

      {/*
        The inline strip — Figma puts it at (462,2618). It renders the same
        component as the floating bar below, so the two are identical: a reader
        who learns the control at the top recognises it when it reappears
        pinned to the viewport. That makes it wider than Figma's 155x40 box,
        which is the trade for labels that still make sense out of context.
      */}
      <div
        role="tablist"
        aria-label="Before and after"
        className={`${STATE_TABS_TRACK} absolute left-[462px] top-[2618px]`}
      >
        <StateTabs value={variant} onChange={setVariant} />
      </div>

      {/*
        The inline strip is the only switch in the file, and it sits above the
        first screen. This pins the same control to the viewport for the length
        of the problem/solution list so a reader deep in the page can compare a
        problem with its solution without scrolling back to y2618. It takes over
        where the inline strip scrolls away (its box ends at 2658) and stands
        down as "What actually changed" arrives, since the tail is shared.
      */}
      <FloatingStateTabs
        value={variant}
        onChange={setVariant}
        showFrom={2658}
        hideAt={13933 + t}
      />

      {/* ---- per-state ------------------------------------------------- */}

      <Anchor id={variant === "before" ? "problem" : "solution"} top={s.heading.top} />
      <SectionHeading top={s.heading.top} left={462} width={1013}>
        {s.heading.text}
      </SectionHeading>
      <Body top={s.body.top} left={462} width={s.body.width}>
        {s.body.text}
      </Body>

      {/*
        Section labels are centred in their box in Figma, not left-aligned, and
        each is a single MIXED-font node — see labelTilde/labelSuffix.
      */}
      {s.labels.map((l, i) => (
        <h3
          key={`${l.top}-${i}`}
          className="absolute text-[32px] leading-[35.84px] text-[#b2b2b2]"
          style={{ left: l.left ?? 462, top: l.top, width: l.width, textAlign: "center" }}
        >
          <span className="font-display font-semibold">{l.name}</span>
          <span className="font-display font-normal">(</span>
          <span className="font-sans font-normal">{s.labelTilde}</span>
          <span className="font-display font-normal">{s.labelSuffix}</span>
        </h3>
      ))}

      {s.bands.map((b) => (
        <Image
          key={b.src}
          src={`/images/case/tv/${b.src}`}
          alt={b.alt}
          width={b.w}
          height={b.h}
          className="absolute max-w-none"
          style={{ left: b.left, top: b.top, width: b.w, height: b.h }}
        />
      ))}

      {s.cards.map((c, i) => (
        <NumberedCard
          key={`${c.top}-${i}`}
          top={c.top}
          left={462}
          width={1046}
          eyebrow={c.eyebrow}
          eyebrowColor={s.eyebrowColor}
          title={c.title}
          body={c.body}
          impact={c.impact}
          bodyColor="#777777"
        />
      ))}

      {/* ---- tail: same content in both frames, 87px lower in "after" --- */}

      <div
        aria-hidden
        className="absolute left-[462px] h-px w-[1104px] bg-[#dddddd]"
        style={{ top: s.ruleTop }}
      />

      <h2
        id="what-it-changed"
        className="absolute left-[462px] font-display text-[32px] leading-[40px] font-semibold text-[#3f3f3f]"
        style={{ top: 13933 + t }}
      >
        What actually changed
      </h2>
      <p
        className="absolute left-[462px] text-[24px] leading-[32px] font-medium text-[#060d19]"
        style={{ top: 14038 + t }}
      >
        Before:
      </p>
      <p
        className="absolute left-[1124px] text-[24px] leading-[32px] font-medium text-[#060d19]"
        style={{ top: 14038 + t }}
      >
        After:
      </p>
      <ChangeList top={14094 + t} left={462} width={620} color="#c50d00" items={CHANGED.map((r) => r[0])} />
      <ChangeList top={14094 + t} left={1112} width={700} color="#05b54b" items={CHANGED.map((r) => r[1])} />

      {/* 1px #dddddd throughout — a stroke on the rects, a fill on the lines */}
      {TAIL_RULES.map((r) => (
        <div
          key={`${r.top}-${r.left}`}
          aria-hidden
          className="absolute bg-[#dddddd]"
          style={{ left: r.left, top: r.top + t, width: r.w, height: r.h }}
        />
      ))}

      <h2
        id="what-worked"
        className="absolute left-[462px] w-[1211px] font-display text-[32px] leading-[40px] font-semibold text-[#3f3f3f]"
        style={{ top: 14467 + t }}
      >
        Things that didn&rsquo;t work — And how I solved them
      </h2>
      {WORKED.map((w) => (
        <div key={w.label}>
          <p
            className="absolute left-[462px] text-[20px] font-medium text-[#060d19]"
            style={{ top: w.top + t, lineHeight: `${w.labelLh}px` }}
          >
            {w.label}
          </p>
          <p
            className="absolute text-[16px] text-[#777777]"
            style={{
              left: w.textLeft,
              top: w.top + t,
              width: w.textWidth,
              lineHeight: `${w.textLh}px`,
            }}
          >
            {w.text}
          </p>
        </div>
      ))}

      {/*
        The banner heading is a child of the banner frame, so it is baked into
        the image — and the two states carry different headings. Only the
        scroll anchor is placed here.
      */}
      <Image
        src={`/images/case/tv/${s.banner}`}
        alt=""
        width={1219}
        height={130}
        className="absolute left-[458px] h-[130px] w-[1219px] max-w-none"
        style={{ top: 15020 + t }}
      />
      <Anchor id="what-i-learned" top={15052 + t} />

      {LEARNINGS.map((l) => (
        <div key={l.title}>
          <p
            className="absolute left-[462px] w-[1211px] text-[23px] leading-[35.84px] font-bold text-[#222227]"
            style={{ top: l.top + t }}
          >
            {l.title}
          </p>
          <p
            className="absolute left-[462px] w-[1211px] text-[16px] leading-[24px] text-[#777777]"
            style={{ top: l.top + 48 + t }}
          >
            {l.body}
          </p>
        </div>
      ))}

      <Image
        src="/images/case/tv/related.webp"
        alt=""
        width={1905}
        height={642}
        className="absolute left-0 h-[642px] w-[1905px] max-w-none"
        style={{ top: relatedTop }}
      />
      <Link
        href="/work/get-my-stock"
        aria-label="Get My Stock case study"
        className="absolute left-[191px] h-[454px] w-[748px] rounded-[24px] transition-colors hover:bg-black/[0.03]"
        style={{ top: relatedTop + 107 }}
      />
      <Link
        href="/work/design-system"
        aria-label="Aero UI Design System case study"
        className="absolute left-[963px] h-[454px] w-[748px] rounded-[24px] transition-colors hover:bg-black/[0.03]"
        style={{ top: relatedTop + 107 }}
      />
    </main>
  );
}
