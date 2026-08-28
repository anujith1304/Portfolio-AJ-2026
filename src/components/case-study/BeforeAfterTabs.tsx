"use client";

import type { StateContent, Variant } from "@/app/work/translate-video/content";

/**
 * "Before / After" toggle — Figma 5908:24503 (before) and 5908:29768 (after).
 *
 * In the file this is a prototype link: clicking the inactive tab navigates to
 * the sibling frame that holds the other state of the whole case study. Here it
 * flips one piece of state and the page re-renders, which is the same idea
 * without a page load.
 *
 * The node tree and the render disagree on the chrome, and the render wins: the
 * tree carries a #18181b separator and a #fafafa fill on the inactive option,
 * but the separator sits under the selected pill and that fill reads as the
 * track colour. So this draws a #f4f4f5 pill track with a white pill on the
 * selected tab, and takes the pill's box from whichever state is showing —
 * Figma moves and resizes it between the two frames.
 *
 * The tilde marks the active tab, which is why the labels change with state.
 */

export function BeforeAfterTabs({
  onChange,
  tabs,
}: {
  onChange: (v: Variant) => void;
  /** Geometry and labels for the state currently showing. */
  tabs: StateContent["tabs"];
}) {
  const base =
    "absolute top-[4px] flex h-[32px] items-center justify-center text-[14px] leading-[20px] font-medium";
  const sel = "text-[#18181b]";
  const idle = "text-[#92979d] transition-colors hover:text-[#18181b]";
  const leftSelected = tabs.selected === "left";

  return (
    <div
      role="tablist"
      aria-label="Before and after"
      className="absolute left-[462px] top-[2618px] h-[40px] w-[155px] rounded-full bg-[#f4f4f5]"
    >
      {/* The white pill is one element so it slides between the two tabs. */}
      <span
        aria-hidden
        className="absolute top-[4px] h-[32px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
        style={{ left: tabs.pill.x, width: tabs.pill.w }}
      />
      <button
        type="button"
        role="tab"
        aria-selected={leftSelected}
        onClick={() => onChange("before")}
        className={`${base} ${leftSelected ? sel : idle}`}
        style={{ left: tabs.left.x, width: tabs.left.w }}
      >
        {tabs.leftLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={!leftSelected}
        onClick={() => onChange("after")}
        className={`${base} ${leftSelected ? idle : sel}`}
        style={{ left: tabs.right.x, width: tabs.right.w }}
      >
        {tabs.rightLabel}
      </button>
    </div>
  );
}
