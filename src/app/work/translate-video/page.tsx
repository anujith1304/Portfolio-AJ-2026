import type { Metadata } from "next";
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
import { TranslateVideoTabs } from "./Tabs";
import { canvasSurface } from "@/lib/canvas";

/**
 * Translate.video Product Rethink — Figma 5908:21013, 1905x16536.
 *
 * Note this page's body column is x=462 / 1013 wide, not the x=521 / 1046 the
 * other two case studies use, so nothing here shares their coordinates.
 *
 * The visuals are annotated "before" screens: a mockup with callout notes and
 * arrows reaching out to x~2024, past the 1905 frame. Those callouts are
 * siblings of the mockup rather than children, so exporting each mockup node
 * would have cropped them off. Instead the frame was rendered once and sliced
 * locally into the bands below, which keeps every annotation attached to the
 * screen it points at. Copy is live markup and never drawn into a band.
 */

export const metadata: Metadata = {
  title: "Translate.video Product Rethink — Case Study | Anujith S",
  description:
    "Rethinking an AI video localization product at Vitra.AI — dashboard, upload, editor, text-to-speech, timeline and export, from problem framing to final UI.",
};

const SIDE_NAV = [
  { label: "Introduction", id: "introduction", top: 2004 },
  { label: "My Role", id: "my-role", top: 2303 },
  { label: "Problem", id: "problem", top: 2706 },
  { label: "What I learned", id: "what-i-learned", top: 15020 },
  { label: "What it changed", id: "what-it-changed", top: 13928 },
  { label: "What worked", id: "what-worked", top: 14467 },
];

/** Sliced bands: mockup + section label + its callouts. */
const BANDS = [
  { src: "hero.webp",      alt: "Translate.video dashboard",      left: 183, top: 675,   w: 1722, h: 848 },
  { src: "dashboard.webp", alt: "Dashboard, before",              left: 455, top: 2940,  w: 1450, h: 680 },
  { src: "upload.webp",    alt: "Upload modal, before",           left: 455, top: 4855,  w: 1450, h: 608 },
  { src: "editor.webp",    alt: "Editor page, before",            left: 455, top: 6672,  w: 1450, h: 676 },
  { src: "tts.webp",       alt: "Text to speech, before",         left: 455, top: 8556,  w: 1450, h: 624 },
  { src: "timeline.webp",  alt: "Timeline editor, before",        left: 455, top: 10090, w: 1450, h: 688 },
  { src: "export.webp",    alt: "Export modal, before",           left: 455, top: 11564, w: 1450, h: 1314 },
];

type Card = { top: number; eyebrow: string; title: string; body: string; impact: string };

/** Six screens, each with its own numbered problems. */
const PROBLEMS: Card[] = [
  { top: 3674, eyebrow: "PROBLEM #01", title: "Crowded side-bar navigation",
    body: "The old sidebar contained too many navigation items with almost the same visual weight. Core product actions like Dashboard, Process, Instant Cloning, Integration, Settings, Tutorials, Feedback, and Text-to-Speech were placed together without clear grouping. This made the navigation feel heavy and difficult to scan.",
    impact: "Users had to spend more time understanding where to go next. The product also became harder to scale because every new feature added more clutter to the same navigation area." },
  { top: 3974, eyebrow: "PROBLEM #02", title: "Weak visual hierarchy",
    body: "The dashboard did not clearly prioritize the most important actions. The upload area, resource usage card, recent process table, tutorial button, and sidebar were all competing for attention. There was no clear visual flow guiding the user from “start a task” to “complete a task.”",
    impact: "Users could feel unsure about what to focus on first. This increased cognitive load and made the dashboard feel less polished, even though the required features were present." },
  { top: 4249, eyebrow: "PROBLEM #03", title: "Upload flow lacks guidance",
    body: "The upload section allowed users to add a video, but it did not explain the workflow clearly. Users could see video/subtitle options, file details, cancel, and upload buttons, but the next step after upload was not obvious. The section felt like a drop area rather than a guided product workflow.",
    impact: "Users could hesitate before taking action because the system did not clearly communicate what would happen next. This reduced confidence during one of the most important actions in the product." },
  { top: 4523, eyebrow: "PROBLEM #04", title: "Usage panel feels detached",
    body: "The resource usage panel was placed on the right side, but it felt disconnected from the upload and translation workflow. It showed dubbing minutes, lip-sync minutes, and TTS words, but the information was compressed and not clearly connected to the current task.",
    impact: "Users could see their usage limits, but they may not understand how those limits affect the action they are about to perform. This made the usage information feel informative, but not very actionable." },

  { top: 5517, eyebrow: "PROBLEM #01", title: "Recent process table is hard to scan",
    body: "The recent process section used a basic table layout with limited visual distinction between rows. Some project names were unclear or system-generated, and the table did not highlight project type, language details, progress, or quick actions in a readable way.",
    impact: "Users had to spend more effort identifying previous projects. Returning to an existing task became slower, especially when multiple projects had similar names or repeated language combinations." },
  { top: 5791, eyebrow: "PROBLEM #02", title: "Weak visual hierarchy",
    body: "Some icons and controls were placed without a clear visual relationship to the elements they affected. For example, the remove icon in the upload area appeared isolated, and multiple small icons in the sidebar and table did not always support quick understanding.",
    impact: "Users could feel unsure about what to focus on first. This increased cognitive load and made the dashboard feel less polished, even though the required features were present." },
  { top: 6066, eyebrow: "PROBLEM #03", title: "Modal based workflow feels cramped",
    body: "The translation settings flow was placed inside a small modal. Important decisions such as output type, title, folder, source language, and target language were all shown together in one compact space. The modal did not feel like a step-by-step workflow.",
    impact: "Users had to process many decisions at once, which made the workflow feel heavier than necessary. The limited space also made the task feel less important and less focused." },
  { top: 6340, eyebrow: "PROBLEM #04", title: "Inconsistent button hierarchy",
    body: "Primary and secondary actions were not always clearly differentiated. The old UI used different button styles across upload, top-up, translate, cancel, and tutorial actions. Some important actions did not stand out enough, while some secondary actions had similar visual weight.",
    impact: "Users could hesitate because the interface did not clearly show which action was primary. In task-based workflows like uploading and translating videos, unclear button hierarchy can slow down completion and increase errors." },

  { top: 7402, eyebrow: "PROBLEM #01", title: "Overloaded workspace",
    body: "The editor screen contains too many active areas at once: transcript rows, translated text, speaker controls, timing controls, video preview, audio settings, top toolbar actions, side navigation, and bottom playback controls. All of these are visible together without a clear priority.",
    impact: "Users may feel overwhelmed while editing. Since translation editing requires focus, the crowded workspace increases cognitive load and makes it harder to concentrate on the actual transcript and translation task." },
  { top: 7676, eyebrow: "PROBLEM #02", title: "Weak transcript row hierarchy",
    body: "Each transcript block contains many elements such as source text, translated text, speaker name, word count, play icons, timing, retain source toggle, warning status, and delete action.",
    impact: "Users may struggle to quickly scan each segment, identify errors, or understand what needs attention. This slows down editing, especially when working with long videos that contain many transcript rows." },
  { top: 7950, eyebrow: "PROBLEM #03", title: "Poor timeline visibility",
    body: "The old editor had only basic playback controls, with limited visual context for video structure, audio waveform, or transcript segment placement. It did not clearly show how text, voice, timing, and video playback were connected.",
    impact: "Users had to rely on repeated playback to understand where edits were happening, making timing adjustments slower and less confident, especially for longer videos." },
  { top: 8224, eyebrow: "PROBLEM #04", title: "Speaker and voice controls were hard to understand",
    body: "Speaker and voice controls were mixed with other row-level actions like timing, play, warnings, and generate options. This made it harder to understand which speaker or voice was assigned to each segment.",
    impact: "Users could feel unsure while managing voices across multiple transcript rows, increasing the chance of incorrect speaker assignment and slowing down the dubbing workflow." },

  { top: 9234, eyebrow: "PROBLEM #01", title: "Unstructured workspace",
    body: "This Text-to-Speech screen used a large empty canvas with loosely placed controls, making the experience feel unfinished and visually unbalanced. Key elements like process name, text input, and generation controls were not grouped into a clear workflow.",
    impact: "Users had to scan the page to understand where to begin. The lack of structure made the workflow feel less guided and reduced confidence while creating speech from text." },
  { top: 9508, eyebrow: "PROBLEM #02", title: "Disconnected controls",
    body: "Language, voice, and generate actions were placed at the bottom of the screen, visually detached from the main text area. Unlike the redesigned version, the old layout did not connect content entry with the settings needed to generate speech.",
    impact: "This separation made the task flow harder to follow and increased the mental effort required to complete a simple text-to-speech action." },
  { top: 9758, eyebrow: "PROBLEM #03", title: "Weak action hierarchy",
    body: "The screen showed both Save and Generate actions, but their relationship was unclear. The primary next step was not strongly emphasized, and the interface did not clearly guide users from writing text to configuring settings and generating speech.",
    impact: "Users could hesitate before taking action because the workflow did not clearly communicate the most important next step. This slowed task completion and weakened usability." },

  { top: 10832, eyebrow: "PROBLEM #01", title: "Cluttered & dense layout",
    body: "The old timeline was visually crowded with too many elements, small text, and tightly packed controls, making it difficult to focus on important content.",
    impact: "Users felt overwhelmed while editing and struggled to quickly identify the right segment, leading to slower workflows." },
  { top: 11057, eyebrow: "PROBLEM #02", title: "Poor track hierarchy",
    body: "Video, dialogue, source, target, and audio tracks were not clearly separated, making it difficult to understand what each layer represented.",
    impact: "Users could make selection or alignment mistakes, increasing rework and reducing editing accuracy." },
  { top: 11281, eyebrow: "PROBLEM #03", title: "Limited timeline visibility",
    body: "The timeline had limited zooming, unclear waveform visibility, and less context across the full duration of the video.",
    impact: "Users had to repeatedly scroll and zoom to find specific sections, making navigation slower and less efficient." },

  { top: 12932, eyebrow: "PROBLEM #01", title: "Disconnected export flow",
    body: "Different tabs for Video, Subtitle, and History created separate workflows and broke the user’s mental model.",
    impact: "Users had to switch between contexts and spend more time figuring out where to start." },
  { top: 13157, eyebrow: "PROBLEM #02", title: "Removed from context",
    body: "Export opened in a modal that pulled users away from the editor and the content they were working on.",
    impact: "Users lost context, which increased cognitive load and slowed the workflow." },
  { top: 13381, eyebrow: "PROBLEM #03", title: "Limited configuration clarity",
    body: "Options were minimal and scattered. Users couldn’t clearly see languages, formats, or subtitle settings together.",
    impact: "Users were unsure about what they were exporting until the last step." },
  { top: 13606, eyebrow: "PROBLEM #04", title: "Unclear consequences",
    body: "It wasn’t obvious how many languages were selected, what the export would cost, or how subtitles would be included.",
    impact: "Users faced uncertainty and were more likely to make mistakes." },
];

/** Section labels above each mockup — Recoleta/Satoshi 32 at #b2b2b2. */
const SCREEN_LABELS = [
  { top: 2950, text: "Dashboard (~Before)" },
  { top: 4865, text: "Upload Modal (~Before)" },
  { top: 6682, text: "Editor page (~Before)", left: 466 },
  { top: 8566, text: "Text to speech (~Before)" },
  { top: 10100, text: "Timeline editor (~Before)" },
  { top: 11574, text: "Export Modal (~Before)" },
];

const CHANGED = [
  ["Features were distributed across multiple navigation levels", "Core workflows are surfaced directly where users need them"],
  ["Timeline, transcript, audio and video competed for attention", "Content, controls and timeline are organized into a clearer hierarchy"],
  ["Important actions were hidden inside secondary controls", "Primary actions are placed closer to the content they affect"],
  ["Users had to understand the product before knowing what to do", "The interface guides users through the editing workflow"],
  ["Settings and editing controls felt disconnected from the work", "Contextual controls appear alongside the content being edited"],
  ["Large areas of the interface carried little useful information", "Workspace is structured around the user’s active task"],
];

const WORKED = [
  { top: 14588, label: "The Problem", labelLeft: 462, textLeft: 630,
    text: "The old editor brought transcript, translation, video, audio controls, and the timeline into one workspace, but the relationships between them were unclear. With weak hierarchy and actions separated from the content they affected, users had to scan across the interface and move between different areas to understand what to edit, what action to take, and how those changes would affect the final video." },
  { top: 14725, label: "What worked", labelLeft: 462, textLeft: 626,
    text: "We restructured the experience around a clearer content → action → media → timeline relationship. Editing content now has stronger visual priority, relevant actions such as speaker selection, generation, and lip sync sit directly alongside the content they affect, and the timeline is integrated through clearly defined Video, Dialogue, and Audio tracks." },
  { top: 14848, label: "Impact", labelLeft: 462, textLeft: 626,
    text: "The new structure reduces cognitive load and unnecessary navigation, helping users understand the editing workflow faster and see the connection between their changes and the final output. The experience feels more focused and predictable without removing the complexity required for professional video localization." },
];

const LEARNINGS = [
  { top: 15206, title: "Good UX is about reducing the distance between intent and action.",
    body: "The biggest improvement wasn’t adding more functionality, It was bringing existing functionality closer to the user’s context. When the content, action and result are visually connected, users spend less time figuring out where to click and more time actually editing." },
  { top: 15335, title: "Complex products need hierarchy more than simplicity.",
    body: "An enterprise video editor cannot remove every control. The better approach is to decide what deserves attention now, what can stay secondary, and what should only appear when relevant. The redesign made the product feel simpler without removing the underlying complexity." },
  { top: 15464, title: "The timeline should explain the output, not just represent time.",
    body: "A timeline becomes much more useful when users can understand the relationship between video, dialogue and audio at a glance. Structuring those layers around the actual production workflow made the timeline easier to reason about." },
  { top: 15593, title: "Contextual controls beat hidden functionality.",
    body: "A control is only useful when users can recognize when and why to use it. Moving actions next to the content they affect made the interface more discoverable without adding extra instructions." },
  { top: 15722, title: "The best redesigns remove cognitive work, not functionality.",
    body: "The goal wasn’t to make Translate.video less powerful. It was to make the existing power easier to understand, navigate and use." },
];

export default function TranslateVideoCaseStudy() {
  return (
    <main
      className="relative mx-auto h-[16536px] w-[1905px] overflow-x-clip"
      style={canvasSurface}
    >
      <CaseNav />
      <BackLink />

      {/* 5908:21026 — product mark, 294x94 at (192,269) */}
      <Image
        src="/images/case/tv/logo.webp"
        alt="Translate.video"
        width={306}
        height={106}
        className="absolute left-[186px] top-[263px] h-[106px] w-[306px] max-w-none"
      />

      {/* 5908:21018 — title + intro */}
      <h1 className="absolute left-[192px] top-[415px] w-[1072px] font-display text-[64px] leading-[72px] font-medium text-[#060d19]">
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

      {/* Sliced visual bands */}
      {BANDS.map((b) => (
        <Image
          key={b.src}
          src={`/images/case/tv/${b.src}`}
          alt={b.alt}
          width={b.w}
          height={b.h}
          priority={b.src === "hero.webp"}
          className="absolute max-w-none"
          style={{ left: b.left, top: b.top, width: b.w, height: b.h }}
        />
      ))}

      {/* 5908:24487 — standfirst */}
      <p className="absolute left-[462px] top-[1587px] w-[981px] text-[32px] leading-[43px] font-medium text-[#222227]">
        Designed the end-to-end experience for Translate.video at Vitra.AI,
        contributing across problem framing, user flows, wireframes, interaction
        design, and final UI. The goal was to create a scalable, intuitive
        product experience for video dubbing, translation, voice cloning, and
        text-to-speech workflows.
      </p>

      {/* 5908:22066 — meta row, 981x101 at (462,1839) */}
      <MetaRow
        box={{ left: 462, top: 1839, width: 981, height: 101 }}
        items={[
          { label: "Timeline", value: "Feb - Jun (2026)", left: 462 },
          { label: "Platform", value: "Web Application", left: 712 },
          { label: "My Role", value: "UX/UI Designer", left: 933 },
          { label: "Tools used", value: "Figma, Design system, React JS", left: 1153 },
        ]}
      />

      <CaseSideNav items={SIDE_NAV} startAt={2004} endAt={15894} sideNavLeft={240} />
      {SIDE_NAV.map((i) => (
        <Anchor key={i.id} id={i.id} top={i.top} />
      ))}

      <TranslateVideoTabs />

      <SectionHeading top={2004} left={462} width={1013}>Introduction</SectionHeading>
      <Body top={2064} left={462} width={1013}>
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

      <SectionHeading top={2706} left={462} width={1013}>Problem</SectionHeading>
      <Body top={2766} left={462} width={1013}>
        As Translate.video expanded across multiple AI-powered workflows, the
        product experience became harder to navigate and less consistent. Users
        needed to manage uploads, select languages, choose output types, track
        usage, and access different tools from one place, but the existing
        interface did not clearly support these actions.
      </Body>

      {SCREEN_LABELS.map((l) => (
        <h3
          key={l.text}
          className="absolute font-display text-[32px] leading-[36px] font-semibold text-[#b2b2b2]"
          style={{ left: l.left ?? 462, top: l.top, width: 1013 }}
        >
          {l.text}
        </h3>
      ))}

      {PROBLEMS.map((p) => (
        <NumberedCard
          key={`${p.top}-${p.title}`}
          top={p.top}
          left={462}
          width={1046}
          eyebrow={p.eyebrow}
          eyebrowColor="#d62518"
          title={p.title}
          body={p.body}
          impact={p.impact}
          bodyColor="#777777"
        />
      ))}

      {/* 5908:24607 "Gray 101" — 1104x1 rule at (462,13863) */}
      <div aria-hidden className="absolute left-[462px] top-[13863px] h-px w-[1104px] bg-[#e0e0e0]" />

      <h2
        id="what-it-changed"
        className="absolute left-[462px] top-[13933px] font-display text-[32px] leading-[36px] font-semibold text-[#3f3f3f]"
      >
        What actually changed
      </h2>
      <p className="absolute left-[462px] top-[14038px] text-[24px] leading-[32px] font-medium text-[#060d19]">
        Before:
      </p>
      <p className="absolute left-[1124px] top-[14038px] text-[24px] leading-[32px] font-medium text-[#060d19]">
        After:
      </p>
      {CHANGED.map(([before, after], i) => {
        const top = 14094 + i * 48;
        return (
          <div key={before}>
            <p className="absolute left-[462px] w-[620px] text-[18px] leading-[24px] text-[#c50d00]" style={{ top }}>
              {before}
            </p>
            <p className="absolute left-[1112px] w-[640px] text-[18px] leading-[24px] text-[#05b54b]" style={{ top }}>
              {after}
            </p>
          </div>
        );
      })}

      <h2
        id="what-worked"
        className="absolute left-[462px] top-[14467px] w-[1211px] font-display text-[32px] leading-[36px] font-semibold text-[#3f3f3f]"
      >
        Things that didn&rsquo;t work — And how I solved them
      </h2>
      {WORKED.map((w) => (
        <div key={w.label}>
          <p className="absolute text-[20px] leading-[28px] font-medium text-[#060d19]" style={{ left: w.labelLeft, top: w.top }}>
            {w.label}
          </p>
          <p
            className="absolute text-[16px] leading-[24px] text-[#777777]"
            style={{ left: w.textLeft, top: w.top, width: 1043 }}
          >
            {w.text}
          </p>
        </div>
      ))}

      {/* 5908:24573 — banner behind the white heading, 1211x122 r24 at (462,15020) */}
      <Image
        src="/images/case/tv/learnings-banner.webp"
        alt=""
        width={1230}
        height={138}
        className="absolute left-[455px] top-[15012px] h-[138px] w-[1230px] max-w-none"
      />
      <h2
        id="what-i-learned"
        className="absolute left-[494px] top-[15052px] font-display text-[32px] leading-[36px] font-semibold text-white"
      >
        What I learned &amp; the principles I took forward
      </h2>

      {LEARNINGS.map((l) => (
        <div key={l.title}>
          <p className="absolute left-[462px] w-[1100px] text-[23px] leading-[32px] font-bold text-[#222227]" style={{ top: l.top }}>
            {l.title}
          </p>
          <p className="absolute left-[462px] w-[1100px] text-[16px] leading-[24px] text-[#777777]" style={{ top: l.top + 48 }}>
            {l.body}
          </p>
        </div>
      ))}

      {/* 5908:24608 "Related", 1905x642 at y=15894 */}
      <Image
        src="/images/case/tv/related.webp"
        alt=""
        width={1905}
        height={642}
        className="absolute left-0 top-[15894px] h-[642px] w-[1905px] max-w-none"
      />
      <Link
        href="/work/get-my-stock"
        aria-label="Get My Stock case study"
        className="absolute left-[191px] top-[16001px] h-[454px] w-[748px] rounded-[24px] transition-colors hover:bg-black/[0.03]"
      />
      <Link
        href="/work/design-system"
        aria-label="Aero UI Design System case study"
        className="absolute left-[963px] top-[16001px] h-[454px] w-[748px] rounded-[24px] transition-colors hover:bg-black/[0.03]"
      />
    </main>
  );
}
