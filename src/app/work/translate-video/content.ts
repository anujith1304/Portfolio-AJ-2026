/**
 * Translate.video case study content — two full page states.
 *
 * The Figma file holds this case study as two sibling frames of the same name:
 *
 *   before  5908:21013  1905x16536  "Problem"  — the audited product
 *   after   5908:25725  1905x16623  "Solution" — the redesign
 *
 * They are prototype-linked: the Before frame's second tab navigates to the
 * After frame and vice versa, so the toggle at (462,2618) swaps the whole page
 * rather than one image. Everything above that toggle is identical in both
 * frames and lives in the shell; everything below is per-state and lives here.
 *
 * The tail ("What actually changed" through the Related strip) is the same
 * content in both frames, sitting exactly 87px lower in the After frame, so it
 * is written once against the Before baseline and shifted by `tailOffset`.
 */

export type Variant = "before" | "after";

export type NavItem = {
  label: string;
  /** Scroll target. Omitted for labels the frame carries without a section. */
  id?: string;
  top?: number;
};

export type Band = {
  src: string;
  alt: string;
  left: number;
  top: number;
  w: number;
  h: number;
};

export type ScreenLabel = {
  top: number;
  /** Recoleta SemiBold run, e.g. "Dashboard ". Leading/trailing spaces matter. */
  name: string;
  left?: number;
  width: number;
};

export type Card = {
  top: number;
  eyebrow: string;
  title: string;
  body: string;
  impact: string;
};

export type StateContent = {
  height: number;
  /** Tab strip geometry — the selected pill moves between the two states. */
  tabs: {
    leftLabel: string;
    rightLabel: string;
    /** Which side carries the white pill. */
    selected: "left" | "right";
    left: { x: number; w: number };
    right: { x: number; w: number };
    pill: { x: number; w: number };
  };
  nav: { left: number; width: number; items: NavItem[] };
  heading: { top: number; text: string };
  body: { top: number; width: number; text: string };
  labels: ScreenLabel[];
  /**
   * The label is one MIXED-font node. Both states set the name in Recoleta
   * SemiBold and "(" in Recoleta Regular, but the Satoshi run differs: the
   * Before frame pulls "~B" into Satoshi and leaves "efore)" in Recoleta,
   * while the After frame switches back right after the tilde.
   */
  labelTilde: string;
  labelSuffix: string;
  bands: Band[];
  cards: Card[];
  eyebrowColor: string;
  /** "Gray 101" rule above the tail. */
  ruleTop: number;
  /** Every tail y is this many px below the Before baseline. */
  tailOffset: number;
  banner: string;
};

/* ---------------------------------------------------------------- shared -- */

/** Before/after table rows — identical in both frames (5908:24532-24543). */
export const CHANGED: [string, string][] = [
  ["Features were distributed across multiple navigation levels", "Core workflows are surfaced directly where users need them"],
  ["Timeline, transcript, audio and video competed for attention", "Content, controls and timeline are organized into a clearer hierarchy"],
  ["Important actions were hidden inside secondary controls", "Primary actions are placed closer to the content they affect"],
  ["Users had to understand the product before knowing what to do", "The interface guides users through the editing workflow"],
  ["Settings and editing controls felt disconnected from the work", "Contextual controls appear alongside the content being edited"],
  ["Large areas of the interface carried little useful information", "Workspace is structured around the user’s active task"],
];

/** Tops are the Before baseline; the After state adds `tailOffset`. */
export const WORKED = [
  { top: 14588, label: "The Problem", labelLh: 24, textLeft: 630, textWidth: 1035, textLh: 28,
    text: "The old editor brought transcript, translation, video, audio controls, and the timeline into one workspace, but the relationships between them were unclear. With weak hierarchy and actions separated from the content they affected, users had to scan across the interface and move between different areas to understand what to edit, what action to take, and how those changes would affect the final video." },
  { top: 14725, label: "What worked", labelLh: 20, textLeft: 626, textWidth: 1043, textLh: 24,
    text: "We restructured the experience around a clearer content → action → media → timeline relationship. Editing content now has stronger visual priority, relevant actions such as speaker selection, generation, and lip sync sit directly alongside the content they affect, and the timeline is integrated through clearly defined Video, Dialogue, and Audio tracks." },
  { top: 14848, label: "Impact", labelLh: 20, textLeft: 626, textWidth: 1043, textLh: 24,
    text: "The new structure reduces cognitive load and unnecessary navigation, helping users understand the editing workflow faster and see the connection between their changes and the final output. The experience feels more focused and predictable without removing the complexity required for professional video localization." },
];

export const LEARNINGS = [
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

/** Tail rules, on the Before baseline (5908:24547/24550/24555/24563/24568). */
export const TAIL_RULES = [
  { top: 14013, left: 462, w: 1104, h: 1 },
  { top: 14047, left: 1058, w: 1, h: 315 },
  { top: 14547, left: 462, w: 1194, h: 1 },
  { top: 14705, left: 462, w: 1194, h: 1 },
  { top: 14828, left: 462, w: 1194, h: 1 },
];

/* ---------------------------------------------------------------- before -- */

/** 5908:21013 — the audited product. */
export const BEFORE: StateContent = {
  height: 16536,
  tabs: {
    leftLabel: "~ Before", rightLabel: "After", selected: "left",
    left: { x: 8, w: 79 }, right: { x: 92, w: 55 }, pill: { x: 4, w: 87 },
  },
  nav: {
    left: 240, width: 129,
    items: [
      { label: "Introduction", id: "introduction", top: 2004 },
      { label: "My Role", id: "my-role", top: 2303 },
      { label: "Problem", id: "problem", top: 2706 },
      { label: "What I learned", id: "what-i-learned", top: 15020 },
      { label: "What it changed", id: "what-it-changed", top: 13928 },
      { label: "What worked", id: "what-worked", top: 14467 },
    ],
  },
  heading: { top: 2706, text: "Problem" },
  body: {
    top: 2766, width: 1013,
    text: "As Translate.video expanded across multiple AI-powered workflows, the product experience became harder to navigate and less consistent. Users needed to manage uploads, select languages, choose output types, track usage, and access different tools from one place, but the existing interface did not clearly support these actions.",
  },
  labelTilde: "~B",
  labelSuffix: "efore)",
  labels: [
    { top: 2950,  name: "Dashboard ",      width: 1013 },
    { top: 4865,  name: "Upload Modal ",   width: 1013 },
    { top: 6682,  name: "Editor page ",    width: 1013, left: 466 },
    { top: 8566,  name: "Text to speech ", width: 1013 },
    { top: 10100, name: "Timeline editor ", width: 1013 },
    { top: 11574, name: "Export Modal ",   width: 1013 },
  ],
  bands: [
    { src: "dashboard.webp", alt: "Dashboard, before",      left: 455, top: 3010,  w: 1450, h: 610 },
    { src: "upload.webp",    alt: "Upload modal, before",   left: 455, top: 4925,  w: 1450, h: 538 },
    { src: "editor.webp",    alt: "Editor page, before",    left: 455, top: 6742,  w: 1450, h: 606 },
    { src: "tts.webp",       alt: "Text to speech, before", left: 455, top: 8626,  w: 1450, h: 554 },
    { src: "timeline.webp",  alt: "Timeline editor, before", left: 455, top: 10160, w: 1450, h: 618 },
    { src: "export.webp",    alt: "Export modal, before",   left: 455, top: 11634, w: 1450, h: 1244 },
  ],
  eyebrowColor: "#d62518",
  cards: [
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
  ],
  ruleTop: 13863,
  tailOffset: 0,
  banner: "learnings-banner.webp",
};

/* ----------------------------------------------------------------- after -- */

/**
 * 5908:25725 — the redesign. Note two quirks reproduced from the file as-is:
 * the third label carries a leading space, and the sixth reads "Timeline
 * editor" above the export screens.
 */
export const AFTER: StateContent = {
  height: 16623,
  tabs: {
    leftLabel: "Before", rightLabel: "~ After", selected: "right",
    left: { x: 11, w: 66 }, right: { x: 79, w: 68 }, pill: { x: 75, w: 76 },
  },
  /*
   * The frame's own list reads Components / Spacing / Drop Shadow, which are
   * leftovers from the design-system case study — this frame has no such
   * sections. The index carries the same six entries as the Before state, with
   * Solution in the active slot, and the tail entries shifted by tailOffset.
   */
  nav: {
    left: 241, width: 124,
    items: [
      { label: "Introduction", id: "introduction", top: 2004 },
      { label: "My Role", id: "my-role", top: 2303 },
      { label: "Solution", id: "solution", top: 2706 },
      { label: "What I learned", id: "what-i-learned", top: 15107 },
      { label: "What it changed", id: "what-it-changed", top: 14015 },
      { label: "What worked", id: "what-worked", top: 14554 },
    ],
  },
  heading: { top: 2706, text: "Solution" },
  body: {
    top: 2766, width: 1046,
    text: "The redesigned dashboard creates a cleaner and more focused workspace for Translate.video. Key workflows like Video Dubbing, Subtitling, Instant Speech, and Voice Cloning are now easier to access through clear action cards. Navigation is better organized, recent projects are easier to search and scan, resource usage is presented more clearly. Overall, the new design reduces clutter, improves clarity, and makes the product easier to scale for future workflows.",
  },
  labelTilde: "~",
  labelSuffix: "After)",
  labels: [
    { top: 2978,  name: "Dashboard ",       width: 1046 },
    { top: 4929,  name: "Upload Modal ",    width: 1046 },
    { top: 6779,  name: " Editor Page ",    width: 1046 },
    { top: 8638,  name: "Text to speech ",  width: 1046 },
    { top: 10190, name: "Timeline editor ", width: 1046 },
    { top: 11694, name: "Timeline editor ", width: 1046 },
  ],
  bands: [
    { src: "after/a-dashboard.webp", alt: "Dashboard, after",       left: 458, top: 3060,  w: 1054, h: 598 },
    { src: "after/a-upload.webp",    alt: "Upload workflow, after", left: 458, top: 5011,  w: 1054, h: 598 },
    { src: "after/a-editor.webp",    alt: "Editor page, after",     left: 458, top: 6861,  w: 1054, h: 607 },
    { src: "after/a-tts.webp",       alt: "Text to speech, after",  left: 458, top: 8737,  w: 1054, h: 604 },
    { src: "after/a-timeline.webp",  alt: "Timeline editor, after", left: 458, top: 10288, w: 1054, h: 607 },
    { src: "after/a-export1.webp",   alt: "Export panel, after",    left: 458, top: 11792, w: 1054, h: 607 },
    { src: "after/a-export2.webp",   alt: "Export options, after",  left: 458, top: 12453, w: 1054, h: 510 },
  ],
  eyebrowColor: "#03ad00",
  cards: [
    { top: 3714, eyebrow: "Solution #01", title: "Grouped navigation structure",
      body: "The sidebar was reorganized into clearer sections so users could quickly understand the difference between primary navigation, tools, and supporting actions. Instead of showing all items with equal importance, the new dashboard groups related navigation links together and creates a more structured entry point into the product.",
      impact: "In the old dashboard, the crowded sidebar made navigation feel heavy and difficult to scan. The new grouped structure improves wayfinding, reduces confusion, and helps users move through the product faster with less cognitive effort." },
    { top: 4014, eyebrow: "Solution #02", title: "Clear Starting Point with Feature Cards",
      body: "The new dashboard introduces feature cards at the top of the page to clearly present key workflows such as Video Dubbing, Subtitling, Instant Speech, and Voice Cloning. These cards give users an immediate understanding of what they can do and where to begin.",
      impact: "Previously, users landed on a dashboard without a strong starting point, which made the experience feel task-heavy and unclear. The feature cards now guide users toward the main workflows more directly, improving discoverability and reducing hesitation." },
    { top: 4288, eyebrow: "Solution #03", title: "Stronger Visual Hierarchy",
      body: "The dashboard layout was redesigned to create a clearer visual flow between the welcome section, feature cards, recent projects, and supporting information. Typography, spacing, and content placement were refined so the most important actions stand out first, while secondary information stays supportive.",
      impact: "In the old dashboard, multiple sections competed for attention, making it harder for users to know what mattered most. The improved hierarchy makes the interface easier to scan, improves readability, and helps users focus on the next relevant action." },
    { top: 4587, eyebrow: "Solution #04", title: "Searchable and Easier-to-Scan Recent Projects",
      body: "The Recent Process table was redesigned into a more readable Recent Projects section with clearer rows, better project labeling, and a search bar. Additional structure in the project list makes it easier to identify project type, language details, and recency at a glance.",
      impact: "Earlier, users had to spend extra effort scanning rows and identifying previous work. The improved project section makes revisiting and managing past projects much easier, helping users find relevant work faster and improving overall workflow continuity." },

    { top: 5665, eyebrow: "Solution #01", title: "Dedicated upload workflow page",
      body: "The upload experience was moved from a small modal into a dedicated workflow page. This gives the video dubbing task more space and allows the form to follow a clear vertical structure.",
      impact: "Users can focus on one task without distractions. The workflow is easier to understand, and more suitable for completing a full dubbing setup." },
    { top: 5916, eyebrow: "Solution #02", title: "Clear video source selection",
      body: "The new design separates the video source into two clear options: Upload and YouTube. This helps users immediately understand how they can add their video before moving forward.",
      impact: "Users no longer need to guess how to start. The upload flow becomes more direct, reducing hesitation at the beginning of the task." },
    { top: 6166, eyebrow: "Solution #03", title: "Improved Upload/Drop area",
      body: "The upload area now clearly communicates that users can click or drag a file to upload. It also includes helpful file limits such as supported video size and duration.",
      impact: "Users get clearer guidance before uploading, which reduces errors and improves confidence while adding media." },
    { top: 6414, eyebrow: "Solution #04", title: "Clear Advanced Options & Strong primary CTA",
      body: "Advanced controls such as Number of Speakers and Emotion Detection are separated into simple toggle rows. They are visible but do not distract from the main upload flow and the final action is shown as a full-width Create dub button at the bottom of the form. This creates a clear endpoint for the workflow.",
      impact: "Users can understand optional settings more easily while still staying focused on the main task and Users can easily identify the next step, reducing confusion and improving task completion confidence." },

    { top: 7524, eyebrow: "Solution #01", title: "Dedicated upload workflow page",
      body: "The upload experience was moved from a small modal into a dedicated workflow page. This gives the video dubbing task more space and allows the form to follow a clear vertical structure.",
      impact: "Users can focus on one task without distractions. The workflow is easier to understand, and more suitable for completing a full dubbing setup." },
    { top: 7775, eyebrow: "Solution #02", title: "Clear video source selection",
      body: "The new design separates the video source into two clear options: Upload and YouTube. This helps users immediately understand how they can add their video before moving forward.",
      impact: "Users no longer need to guess how to start. The upload flow becomes more direct, reducing hesitation at the beginning of the task." },
    { top: 8025, eyebrow: "Solution #03", title: "Improved Upload/Drop area",
      body: "The upload area now clearly communicates that users can click or drag a file to upload. It also includes helpful file limits such as supported video size and duration.",
      impact: "Users get clearer guidance before uploading, which reduces errors and improves confidence while adding media." },
    { top: 8273, eyebrow: "Solution #04", title: "Clear Advanced Options & Strong primary CTA",
      body: "Advanced controls such as Number of Speakers and Emotion Detection are separated into simple toggle rows. They are visible but do not distract from the main upload flow and the final action is shown as a full-width Create dub button at the bottom of the form. This creates a clear endpoint for the workflow.",
      impact: "Users can understand optional settings more easily while still staying focused on the main task and Users can easily identify the next step, reducing confusion and improving task completion confidence." },

    { top: 9397, eyebrow: "Solution #01", title: "Clear context to settings structure",
      body: "The new design separates the text area from the speech settings by placing all configuration controls in a right-side panel. This makes the workflow feel more organized and easier to follow.",
      impact: "Users can move naturally from writing text to adjusting settings and generating speech, reducing confusion and improving task clarity." },
    { top: 9648, eyebrow: "Solution #02", title: "Better visibility of output controls ",
      body: "Controls like language, voice, model, audio duration, and audio rate are now clearly visible in one place. Users can understand how the output will be generated before taking action.",
      impact: "This gives users more control and confidence, reducing uncertainty before generating audio." },
    { top: 9898, eyebrow: "Solution #03", title: "Stronger primary actions & Feedback",
      body: "The Generate Speech button is easier to notice and is supported by useful feedback like remaining credits and character count.",
      impact: "Users can quickly identify the next step, make better decisions, and complete the task with less hesitation." },

    { top: 10952, eyebrow: "Solution #01", title: "Clean & focused layout",
      body: "The timeline was simplified with better spacing, clearer typography, and a structured layout that puts the editing content and controls into focus.",
      impact: "Users can scan the timeline faster, stay focused on the current task, and edit with greater confidence." },
    { top: 11178, eyebrow: "Solution #02", title: "Clear Track Separation",
      body: "A well-defined track structure separates video, source, target, and audio using clear labels, icons, and visual grouping.",
      impact: "Users can immediately understand each layer, reduce alignment errors, and make edits more accurately." },
    { top: 11403, eyebrow: "Solution #03", title: "Enhanced Timeline Visibility",
      body: "Improved zoom controls, clearer waveforms, time markers, and a wider timeline view provide better context across the entire video.",
      impact: "Users can navigate faster, locate specific sections easily, and make more precise edits with less effort." },

    { top: 13019, eyebrow: "Solution #01", title: "Unified export panel",
      body: "All export types : Video, Subtitle, and Audio — live within one panel. Switching the media type dynamically updates the relevant options.",
      impact: "One mental model for all exports, making the workflow faster and easier to learn." },
    { top: 13245, eyebrow: "Solution #02", title: "Contextual & non-intrusive",
      body: "Export is presented as a side panel, allowing users to stay within the editor while configuring their export.",
      impact: "No disruption between editing and exporting, with a stronger connection to the current workflow." },
    { top: 13470, eyebrow: "Solution #03", title: "Progressive & clear configuration",
      body: "Options are organized based on the selected media type, with clear sections for resolution, languages, subtitles, and formats.",
      impact: "Less clutter and better clarity. Users see exactly what they need when they need it." },
    { top: 13694, eyebrow: "Solution #04", title: "Transparent before you export",
      body: "Selected languages, subtitle settings, and export cost/credits are visible before the user commits to the export.",
      impact: "Users can make informed decisions and export with greater confidence." },
  ],
  ruleTop: 13950,
  tailOffset: 87,
  /*
   * Exported from this frame's own banner (5908:31403). Its Figma layer name
   * reads "Strengthen the value proposition of core products", but that name is
   * stale — the node's characters are the same heading the Before frame shows.
   */
  banner: "after/a-learnings-banner.webp",
};

export const STATES: Record<Variant, StateContent> = { before: BEFORE, after: AFTER };
