"use client";

import { useState } from "react";
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
      className="mt-[10px] list-none text-[16px] leading-[26px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mt-0 xl:w-[var(--w)] xl:text-[18px] xl:leading-[28px]"
      style={{
        ["--x" as string]: `${left}px`,
        ["--y" as string]: `${top}px`,
        order: Math.round(top),
        ["--w" as string]: `${width}px`,
        color,
      }}
    >
      {items.map((t) => (
        <li key={t} className="relative mb-[12px] pl-[22px] last:mb-0 xl:mb-[20px] xl:pl-[27.6px]">
          <span
            aria-hidden
            className="absolute left-[7px] top-[10px] h-[4.3px] w-[4.3px] rounded-full bg-current xl:left-[10.3px] xl:top-[13.95px]"
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

  /*
   * Each labelled screen owns the artwork and cards that sit between its label
   * and the next one. The y coordinates already encode that grouping, so it is
   * derived rather than duplicated in the content file.
   */
  const screens = s.labels.map((label, i) => {
    const from = label.top;
    const to = s.labels[i + 1]?.top ?? Number.POSITIVE_INFINITY;
    return {
      label,
      bands: s.bands.filter((b) => b.top >= from && b.top < to),
      cards: s.cards.filter((c) => c.top >= from && c.top < to),
    };
  });

  return (
    <main
      className="page-x relative mx-auto flex w-full flex-col overflow-x-clip pt-[92px] pb-[120px] xl:h-[var(--frame-h)] xl:w-[1905px] xl:block xl:overflow-x-visible xl:px-0 xl:pt-0 xl:pb-0"
      style={{ ...canvasSurface, ["--frame-h" as string]: `${s.height}px` }}
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
        className="mb-[16px] h-auto w-[240px] max-w-full xl:absolute xl:left-[172px] xl:top-[253px] xl:mb-0 xl:h-[133px] xl:w-[333px] xl:max-w-none"
        style={{ order: 253 }}
      />

      <h1 className="mb-[16px] font-display text-[clamp(32px,5vw,64px)] leading-[1.12] font-medium tracking-[-0.01em] text-[#060d19] xl:absolute xl:left-[192px] xl:top-[415px] xl:mb-0 xl:w-[1072px] xl:text-[64px] xl:leading-[72px]" style={{ order: 415 }}>
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
      <p className="text-[16px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1428px] xl:top-[559px] xl:text-[18px]" style={{ order: 559 }}>
        Product Designer
      </p>
      <p className="mb-[24px] text-[16px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[1595px] xl:top-[559px] xl:mb-0 xl:text-[18px]" style={{ order: 559 }}>
        2025 — 2026
      </p>

      {/* 5908:25745 — hero, placed on its render bounds so the shadow survives */}
      <Image
        src="/images/case/tv/hero.webp"
        alt="Translate.video dashboard"
        width={1529}
        height={848}
        priority
        className="mb-[32px] h-auto w-full rounded-[10px] xl:absolute xl:left-[188px] xl:top-[681px] xl:mb-0 xl:h-[848px] xl:w-[1529px] xl:max-w-none xl:rounded-none"
        style={{ order: 681 }}
      />

      {/*
        5908:27009 is a MIXED-fill node: the body sits at #707581 and only the
        two product names are lifted to #222227.
      */}
      <p className="my-[32px] text-[clamp(19px,2.5vw,32px)] leading-[1.4] font-medium tracking-[-0.8px] text-[#707581] xl:absolute xl:left-[462px] xl:top-[1587px] xl:my-0 xl:w-[981px] xl:text-[32px] xl:leading-[43px]" style={{ order: 1587 }}>
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

      {/*
        No `key` here. Keying this on `variant` remounted the index on every
        switch, which reset its visible/active state and replayed the fade-in —
        the sidebar appeared to reload each time the tab was flipped. Its effect
        already re-runs when `items` or `endAt` change, so the same element can
        carry both states.
      */}
      <CaseSideNav
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
        className={`${STATE_TABS_TRACK} mt-[40px] w-fit xl:absolute xl:left-[462px] xl:top-[2618px] xl:mt-0`}
        style={{ order: 2618 }}
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
        At xl every piece is placed by its Figma coordinate, so source order is
        irrelevant. In flow it is the only thing that matters, and the labels,
        artwork and cards are three separate lists that would otherwise stack as
        three blocks. Grouping them back into the screens they describe — by the
        y each one sits at — restores the reading order the design has.
      */}
      {screens.map((screen, i) => (
        <section key={i} className="contents" style={{ order: screen.label.top }}>
          {/*
            Labels are centred in their box in Figma, not left-aligned, and each
            is a single MIXED-font node — see labelTilde/labelSuffix.
          */}
          <h3
            className="mt-[40px] mb-[16px] text-center text-[22px] leading-[1.25] text-[#b2b2b2] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:my-0 xl:w-[var(--w)] xl:text-[32px] xl:leading-[35.84px]"
            style={{
              ["--x" as string]: `${screen.label.left ?? 462}px`,
              ["--y" as string]: `${screen.label.top}px`,
        order: Math.round(screen.label.top),
              ["--w" as string]: `${screen.label.width}px`,
            }}
          >
            <span className="font-display font-semibold">{screen.label.name}</span>
            <span className="font-display font-normal">(</span>
            <span className="font-sans font-normal">{s.labelTilde}</span>
            <span className="font-display font-normal">{s.labelSuffix}</span>
          </h3>

          {screen.bands.map((b) => (
            <Figure
              key={b.src}
              src={`/images/case/tv/${b.src}`}
              alt={b.alt}
              width={b.w}
              height={b.h}
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

          {screen.cards.map((c, j) => (
            <NumberedCard
              key={`${c.top}-${j}`}
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
        </section>
      ))}

      {/* ---- tail: same content in both frames, 87px lower in "after" --- */}

      <div
        aria-hidden
        className="mt-[48px] h-px w-full bg-[#dddddd] xl:absolute xl:left-[462px] xl:top-[var(--y)] xl:mt-0 xl:w-[1104px]"
        style={{ ["--y" as string]: `${s.ruleTop}px`, order: Math.round(s.ruleTop) }}
      />

      <h2
        id="what-it-changed"
        className="mt-[32px] mb-[20px] font-display text-[26px] leading-[1.25] font-semibold text-[#3f3f3f] xl:absolute xl:left-[462px] xl:top-[var(--y)] xl:my-0 xl:text-[32px] xl:leading-[40px]"
        style={{ ["--y" as string]: `${13933 + t}px`, order: Math.round(13933 + t) }}
      >
        What actually changed
      </h2>
      {/*
        Each column's heading is pinned above its own list at xl, where the two
        sit side by side. In flow they stack, so the heading has to travel with
        its list — otherwise both headings land together above both lists. The
        pairing wrapper is flattened at xl so the Figma offsets still resolve.
      */}
      <div className="xl:contents" style={{ order: 14038 + t }}>
        <p
          className="mt-[8px] text-[20px] leading-[32px] font-medium text-[#060d19] xl:absolute xl:left-[462px] xl:top-[var(--y)] xl:mt-0 xl:text-[24px]"
          style={{ ["--y" as string]: `${14038 + t}px`, order: Math.round(14038 + t) }}
        >
          Before:
        </p>
        <ChangeList top={14094 + t} left={462} width={620} color="#c50d00" items={CHANGED.map((r) => r[0])} />
      </div>
      <div className="xl:contents" style={{ order: 14039 + t }}>
        <p
          className="mt-[28px] text-[20px] leading-[32px] font-medium text-[#060d19] xl:absolute xl:left-[1124px] xl:top-[var(--y)] xl:mt-0 xl:text-[24px]"
          style={{ ["--y" as string]: `${14038 + t}px`, order: Math.round(14038 + t) }}
        >
          After:
        </p>
        <ChangeList top={14094 + t} left={1112} width={700} color="#05b54b" items={CHANGED.map((r) => r[1])} />
      </div>

      {/* 1px #dddddd throughout — a stroke on the rects, a fill on the lines */}
      {TAIL_RULES.map((r) => (
        <div
          key={`${r.top}-${r.left}`}
          aria-hidden
          className="hidden bg-[#dddddd] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:block xl:h-[var(--h)] xl:w-[var(--w)]"
          style={{
            ["--x" as string]: `${r.left}px`,
            ["--y" as string]: `${r.top + t}px`,
        order: Math.round(r.top + t),
            ["--w" as string]: `${r.w}px`,
            ["--h" as string]: `${r.h}px`,
          }}
        />
      ))}

      <h2
        id="what-worked"
        className="mt-[40px] mb-[20px] font-display text-[26px] leading-[1.25] font-semibold text-[#3f3f3f] xl:absolute xl:left-[462px] xl:top-[var(--y)] xl:my-0 xl:w-[1211px] xl:text-[32px] xl:leading-[40px]"
        style={{ ["--y" as string]: `${14467 + t}px`, order: Math.round(14467 + t) }}
      >
        Things that didn&rsquo;t work — And how I solved them
      </h2>
      {WORKED.map((w) => (
        <div key={w.label} className="xl:contents" style={{ order: w.top + t }}>
          <p
            className="mt-[24px] text-[18px] leading-[1.4] font-medium text-[#060d19] xl:absolute xl:left-[462px] xl:top-[var(--y)] xl:mt-0 xl:text-[20px] xl:leading-[var(--lh)]"
            style={{
              ["--y" as string]: `${w.top + t}px`,
        order: Math.round(w.top + t),
              ["--lh" as string]: `${w.labelLh}px`,
            }}
          >
            {w.label}
          </p>
          <p
            className="mt-[6px] text-[16px] leading-[1.6] text-[#777777] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mt-0 xl:w-[var(--w)] xl:leading-[var(--lh)]"
            style={{
              ["--x" as string]: `${w.textLeft}px`,
              ["--y" as string]: `${w.top + t}px`,
        order: Math.round(w.top + t),
              ["--w" as string]: `${w.textWidth}px`,
              ["--lh" as string]: `${w.textLh}px`,
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
        className="mt-[40px] h-auto w-full rounded-[16px] xl:absolute xl:left-[458px] xl:top-[var(--y)] xl:mt-0 xl:h-[130px] xl:w-[1219px] xl:max-w-none xl:rounded-none"
        style={{ ["--y" as string]: `${15020 + t}px`, order: Math.round(15020 + t) }}
      />
      <Anchor id="what-i-learned" top={15052 + t} />

      {LEARNINGS.map((l) => (
        <div key={l.title} className="xl:contents" style={{ order: l.top + t }}>
          <p
            className="mt-[28px] text-[19px] leading-[1.35] font-bold text-[#222227] xl:absolute xl:left-[462px] xl:top-[var(--y)] xl:mt-0 xl:w-[1211px] xl:text-[23px] xl:leading-[35.84px]"
            style={{ ["--y" as string]: `${l.top + t}px`, order: Math.round(l.top + t) }}
          >
            {l.title}
          </p>
          <p
            className="mt-[8px] text-[16px] leading-[1.6] text-[#777777] xl:absolute xl:left-[462px] xl:top-[var(--y)] xl:mt-0 xl:w-[1211px] xl:leading-[24px]"
            style={{ ["--y" as string]: `${l.top + 48 + t}px`, order: Math.round(l.top + 48 + t) }}
          >
            {l.body}
          </p>
        </div>
      ))}

      <Related top={relatedTop} current="translate-video" />
    </main>
  );
}
