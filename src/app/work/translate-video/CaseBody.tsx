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
      className="mt-[10px] list-none text-[16px] leading-[26px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mt-0 xl:w-[var(--w)] xl:text-[calc(18*var(--u))] xl:leading-[calc(28*var(--u))]"
      style={{
        ["--x" as string]: `calc(${left}*var(--u))`,
        ["--y" as string]: `calc(${top}*var(--u))`,
        order: Math.round(top),
        ["--w" as string]: `calc(${width}*var(--u))`,
        color,
      }}
    >
      {items.map((t) => (
        <li key={t} className="relative mb-[12px] pl-[22px] last:mb-0 xl:mb-[calc(20*var(--u))] xl:pl-[calc(27.6*var(--u))]">
          <span
            aria-hidden
            className="absolute left-[7px] top-[10px] h-[4.3px] w-[4.3px] rounded-full bg-current xl:left-[calc(10.3*var(--u))] xl:top-[calc(13.95*var(--u))] xl:h-[calc(4.3*var(--u))] xl:w-[calc(4.3*var(--u))]"
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
      className="page-x relative mx-auto flex w-full flex-col overflow-x-clip pt-[92px] pb-[120px] xl:h-[var(--frame-h)] xl:w-[calc(1905*var(--u))] xl:block xl:overflow-x-visible xl:px-0 xl:pt-0 xl:pb-0"
      style={{ ...canvasSurface, ["--frame-h" as string]: `calc(${s.height}*var(--u))` }}
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
        className="mx-auto mb-[16px] h-auto w-[240px] max-w-full xl:mx-0 xl:absolute xl:left-[calc(172*var(--u))] xl:top-[calc(253*var(--u))] xl:mb-0 xl:h-[calc(133*var(--u))] xl:w-[calc(333*var(--u))] xl:max-w-none"
        style={{ order: 253 }}
      />

      <h1 className="mb-[16px] font-display text-[clamp(32px,5vw,64px)] leading-[1.12] font-medium tracking-[-0.01em] text-[#060d19] xl:absolute xl:left-[calc(192*var(--u))] xl:top-[calc(415*var(--u))] xl:mb-0 xl:w-[calc(1072*var(--u))] xl:text-[calc(64*var(--u))] xl:leading-[calc(72*var(--u))]" style={{ order: 415 }}>
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
      <p className="text-[16px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[calc(1428*var(--u))] xl:top-[calc(559*var(--u))] xl:text-[calc(18*var(--u))] xl:leading-[calc(24*var(--u))]" style={{ order: 559 }}>
        Product Designer
      </p>
      <p className="mb-[24px] text-[16px] leading-[24px] text-[#5d6067] xl:absolute xl:left-[calc(1595*var(--u))] xl:top-[calc(559*var(--u))] xl:mb-0 xl:text-[calc(18*var(--u))] xl:leading-[calc(24*var(--u))]" style={{ order: 559 }}>
        2025 — 2026
      </p>

      {/* 5908:25745 — hero, placed on its render bounds so the shadow survives */}
      <Image
        src="/images/case/tv/hero.webp"
        alt="Translate.video dashboard"
        width={1529}
        height={848}
        priority
        className="mb-[32px] h-auto w-full rounded-[10px] xl:absolute xl:left-[calc(188*var(--u))] xl:top-[calc(681*var(--u))] xl:mb-0 xl:h-[calc(848*var(--u))] xl:w-[calc(1529*var(--u))] xl:max-w-none xl:rounded-none xl:rounded-[calc(10*var(--u))]"
        style={{ order: 681 }}
      />

      {/*
        5908:27009 is a MIXED-fill node: the body sits at #707581 and only the
        two product names are lifted to #222227.
      */}
      <p className="my-[32px] text-[clamp(19px,2.5vw,32px)] leading-[1.4] font-medium tracking-[-0.8px] text-[#707581] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[calc(1587*var(--u))] xl:my-0 xl:w-[calc(981*var(--u))] xl:text-[calc(32*var(--u))] xl:leading-[calc(43*var(--u))]" style={{ order: 1587 }}>
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
        className={`${STATE_TABS_TRACK} mt-[40px] w-fit xl:absolute xl:left-[calc(462*var(--u))] xl:top-[calc(2618*var(--u))] xl:mt-0`}
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
            className="mt-[40px] mb-[16px] text-center text-[22px] leading-[1.25] text-[#b2b2b2] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:my-0 xl:w-[var(--w)] xl:text-[calc(32*var(--u))] xl:leading-[calc(35.84*var(--u))]"
            style={{
              ["--x" as string]: `calc(${screen.label.left ?? 462}*var(--u))`,
              ["--y" as string]: `calc(${screen.label.top}*var(--u))`,
        order: Math.round(screen.label.top),
              ["--w" as string]: `calc(${screen.label.width}*var(--u))`,
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
              /*
               * These are wide annotated screens. At desktop they are drawn at
               * their own size and need no help; scaled into a phone column the
               * callouts stop being readable, so the control is offered there
               * and only there.
               */
              zoom="small"
              className="mb-[24px] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mb-0 xl:h-[var(--h)] xl:w-[var(--w)] xl:max-w-none xl:rounded-none"
              style={{
                ["--x" as string]: `calc(${b.left}*var(--u))`,
                ["--y" as string]: `calc(${b.top}*var(--u))`,
        order: Math.round(b.top),
                ["--w" as string]: `calc(${b.w}*var(--u))`,
                ["--h" as string]: `calc(${b.h}*var(--u))`,
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
        className="mt-[48px] h-px w-full bg-[#dddddd] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[var(--y)] xl:mt-0 xl:w-[calc(1104*var(--u))]"
        style={{ ["--y" as string]: `calc(${s.ruleTop}*var(--u))`, order: Math.round(s.ruleTop) }}
      />

      <h2
        id="what-it-changed"
        className="mt-[32px] mb-[20px] font-display text-[26px] leading-[1.25] font-semibold text-[#3f3f3f] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[var(--y)] xl:my-0 xl:text-[calc(32*var(--u))] xl:leading-[calc(40*var(--u))]"
        style={{ ["--y" as string]: `calc(${13933 + t}*var(--u))`, order: Math.round(13933 + t) }}
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
          className="mt-[8px] text-[20px] leading-[32px] font-medium text-[#060d19] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[var(--y)] xl:mt-0 xl:text-[calc(24*var(--u))] xl:leading-[calc(32*var(--u))]"
          style={{ ["--y" as string]: `calc(${14038 + t}*var(--u))`, order: Math.round(14038 + t) }}
        >
          Before:
        </p>
        <ChangeList top={14094 + t} left={462} width={620} color="#c50d00" items={CHANGED.map((r) => r[0])} />
      </div>
      <div className="xl:contents" style={{ order: 14039 + t }}>
        <p
          className="mt-[28px] text-[20px] leading-[32px] font-medium text-[#060d19] xl:absolute xl:left-[calc(1124*var(--u))] xl:top-[var(--y)] xl:mt-0 xl:text-[calc(24*var(--u))] xl:leading-[calc(32*var(--u))]"
          style={{ ["--y" as string]: `calc(${14038 + t}*var(--u))`, order: Math.round(14038 + t) }}
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
            ["--x" as string]: `calc(${r.left}*var(--u))`,
            ["--y" as string]: `calc(${r.top + t}*var(--u))`,
        order: Math.round(r.top + t),
            ["--w" as string]: `calc(${r.w}*var(--u))`,
            ["--h" as string]: `calc(${r.h}*var(--u))`,
          }}
        />
      ))}

      <h2
        id="what-worked"
        className="mt-[40px] mb-[20px] font-display text-[26px] leading-[1.25] font-semibold text-[#3f3f3f] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[var(--y)] xl:my-0 xl:w-[calc(1211*var(--u))] xl:text-[calc(32*var(--u))] xl:leading-[calc(40*var(--u))]"
        style={{ ["--y" as string]: `calc(${14467 + t}*var(--u))`, order: Math.round(14467 + t) }}
      >
        Things that didn&rsquo;t work — And how I solved them
      </h2>
      {WORKED.map((w) => (
        <div key={w.label} className="xl:contents" style={{ order: w.top + t }}>
          <p
            className="mt-[24px] text-[18px] leading-[1.4] font-medium text-[#060d19] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[var(--y)] xl:mt-0 xl:text-[calc(20*var(--u))] xl:leading-[var(--lh)]"
            style={{
              ["--y" as string]: `calc(${w.top + t}*var(--u))`,
        order: Math.round(w.top + t),
              ["--lh" as string]: `calc(${w.labelLh}*var(--u))`,
            }}
          >
            {w.label}
          </p>
          <p
            className="mt-[6px] text-[16px] leading-[1.6] text-[#777777] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:mt-0 xl:w-[var(--w)] xl:leading-[var(--lh)] xl:text-[calc(16*var(--u))]"
            style={{
              ["--x" as string]: `calc(${w.textLeft}*var(--u))`,
              ["--y" as string]: `calc(${w.top + t}*var(--u))`,
        order: Math.round(w.top + t),
              ["--w" as string]: `calc(${w.textWidth}*var(--u))`,
              ["--lh" as string]: `calc(${w.textLh}*var(--u))`,
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
        className="mt-[40px] h-auto w-full rounded-[16px] xl:absolute xl:left-[calc(458*var(--u))] xl:top-[var(--y)] xl:mt-0 xl:h-[calc(130*var(--u))] xl:w-[calc(1219*var(--u))] xl:max-w-none xl:rounded-none xl:rounded-[calc(16*var(--u))]"
        style={{ ["--y" as string]: `calc(${15020 + t}*var(--u))`, order: Math.round(15020 + t) }}
      />
      <Anchor id="what-i-learned" top={15052 + t} />

      {LEARNINGS.map((l) => (
        <div key={l.title} className="xl:contents" style={{ order: l.top + t }}>
          <p
            className="mt-[28px] text-[19px] leading-[1.35] font-bold text-[#222227] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[var(--y)] xl:mt-0 xl:w-[calc(1211*var(--u))] xl:text-[calc(23*var(--u))] xl:leading-[calc(35.84*var(--u))]"
            style={{ ["--y" as string]: `calc(${l.top + t}*var(--u))`, order: Math.round(l.top + t) }}
          >
            {l.title}
          </p>
          <p
            className="mt-[8px] text-[16px] leading-[1.6] text-[#777777] xl:absolute xl:left-[calc(462*var(--u))] xl:top-[var(--y)] xl:mt-0 xl:w-[calc(1211*var(--u))] xl:leading-[calc(24*var(--u))] xl:text-[calc(16*var(--u))]"
            style={{ ["--y" as string]: `calc(${l.top + 48 + t}*var(--u))`, order: Math.round(l.top + 48 + t) }}
          >
            {l.body}
          </p>
        </div>
      ))}

      <Related top={relatedTop} current="translate-video" />
    </main>
  );
}
