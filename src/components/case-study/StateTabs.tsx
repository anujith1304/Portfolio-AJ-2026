"use client";

import type { Variant } from "@/app/work/translate-video/content";

/**
 * Problem/Solution switch for the Translate.video case study.
 *
 * Figma draws the inline strip as a 155x40 "~ Before / After" toggle
 * (5908:24503 in the Problem frame, 5908:29768 in the Solution frame), with
 * the tilde marking the active tab. Two things are deliberately different
 * here:
 *
 *  - The labels name the sections they switch between rather than just the
 *    state, because on a scrolling page the control is read far from the
 *    heading that gives "Before" its meaning.
 *  - The page carries a second copy of this control pinned to the viewport
 *    (see FloatingStateTabs). Two controls that do the same thing should not
 *    look different, so both render this component and are identical by
 *    construction.
 *
 * The chrome is Figma's, taken from the render rather than the node tree: the
 * tree carries a #18181b separator and a #fafafa fill on the inactive option,
 * but the separator sits under the selected pill and that fill reads as the
 * track colour, so neither appears in Figma's own output.
 */

export function StateTabs({
  value,
  onChange,
  /** -1 while the control is faded out, so it leaves the tab order. */
  tabIndex = 0,
}: {
  value: Variant;
  onChange: (v: Variant) => void;
  tabIndex?: number;
}) {
  const base =
    "flex h-[36px] items-center justify-center rounded-full px-[18px] text-[15px] leading-[20px] font-medium whitespace-nowrap transition-colors xl:h-[calc(36*var(--u))] xl:rounded-full xl:px-[calc(18*var(--u))] xl:text-[calc(15*var(--u))] xl:leading-[calc(20*var(--u))]";
  const on = "bg-white text-[#18181b] shadow-[0_2px_8px_rgba(0,0,0,0.06)]";
  const off = "text-[#92979d] hover:text-[#18181b]";

  return (
    <>
      <button
        type="button"
        role="tab"
        aria-selected={value === "before"}
        tabIndex={tabIndex}
        onClick={() => onChange("before")}
        className={`${base} ${value === "before" ? on : off}`}
      >
        Problem (~Before)
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "after"}
        tabIndex={tabIndex}
        onClick={() => onChange("after")}
        className={`${base} ${value === "after" ? on : off}`}
      >
        Solution (~After)
      </button>
    </>
  );
}

/** The shared track both placements sit in. */
export const STATE_TABS_TRACK =
  "flex items-center gap-[4px] rounded-full bg-[#f4f4f5] p-[4px] xl:gap-[calc(4*var(--u))] xl:p-[calc(4*var(--u))]";
