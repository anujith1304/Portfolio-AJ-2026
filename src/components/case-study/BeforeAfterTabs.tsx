"use client";

import { useState } from "react";

/**
 * "~ Before / After" toggle — Figma 5908:24503, 155x40 at (462,2618).
 *
 * The frame is 155 wide and clips, so only option1 ("~ Before") and option2
 * ("After") are visible; options 3-5 sit past the clip and are hidden. Option1
 * is the selected state — Satoshi Medium 14 #18181b on a white pill — and
 * option2 is #92979d.
 *
 * Every mockup on this page is the "before" state; the file has no "after"
 * artwork behind the second tab. Rather than wire a control to nothing, the
 * toggle reports which state is shown and stays honest about the missing half,
 * so the page can be completed later without changing this component.
 */

export type BeforeAfter = "before" | "after";

export function BeforeAfterTabs({
  value,
  onChange,
  hasAfter = false,
}: {
  value: BeforeAfter;
  onChange: (v: BeforeAfter) => void;
  /** Flip on once "after" artwork exists in the file. */
  hasAfter?: boolean;
}) {
  const base =
    "flex h-[32px] items-center justify-center rounded-[8px] px-[10px] text-[14px] leading-[20px] font-medium transition-colors";
  return (
    <div
      role="tablist"
      aria-label="Before and after"
      className="absolute left-[462px] top-[2618px] flex h-[40px] w-[155px] items-center gap-[3px] rounded-[10px] border border-[#e4e4e7] bg-white p-[4px]"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "before"}
        onClick={() => onChange("before")}
        className={`${base} ${value === "before" ? "bg-[#f4f4f5] text-[#18181b]" : "text-[#92979d] hover:text-[#18181b]"}`}
      >
        ~ Before
      </button>
      <span aria-hidden className="h-[20px] w-px bg-[#e4e4e7]" />
      <button
        type="button"
        role="tab"
        aria-selected={value === "after"}
        onClick={() => hasAfter && onChange("after")}
        disabled={!hasAfter}
        title={hasAfter ? undefined : "After states are not in the design file yet"}
        className={`${base} ${
          value === "after" ? "bg-[#f4f4f5] text-[#18181b]" : "text-[#92979d]"
        } ${hasAfter ? "hover:text-[#18181b]" : "cursor-not-allowed opacity-60"}`}
      >
        After
      </button>
    </div>
  );
}
