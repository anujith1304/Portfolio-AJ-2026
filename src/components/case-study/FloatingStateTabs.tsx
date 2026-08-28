"use client";

import { useEffect, useState } from "react";
import type { Variant } from "@/app/work/translate-video/content";

/**
 * Floating Problem/Solution switch for the Translate.video case study.
 *
 * The only state toggle in the Figma file sits at y2618, above the first
 * screen. Once a reader is deep in the problem list — thousands of pixels
 * down — comparing a problem with its solution means scrolling all the way
 * back up, flipping the tab, and scrolling down again. This is the same
 * control pinned to the bottom of the viewport so the comparison is one click
 * from wherever the reader happens to be.
 *
 * It is not in the file: the file is a static prototype where the tab is only
 * ever seen at the top. The styling deliberately reuses the inline strip's —
 * #f4f4f5 track, white pill on the active tab — so it reads as the same
 * control rather than a second, competing one.
 *
 * It shows once the inline strip has scrolled away and hides again as the
 * "What actually changed" section arrives, since past that point the page is
 * shared between both states and there is nothing left to compare.
 */

export function FloatingStateTabs({
  value,
  onChange,
  /** y past which the inline strip is gone — the bar takes over here. */
  showFrom,
  /** y of "What actually changed"; the bar is gone before it is read. */
  hideAt,
}: {
  value: Variant;
  onChange: (v: Variant) => void;
  showFrom: number;
  hideAt: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Measuring the far edge against the viewport bottom rather than a fixed
      // offset keeps the bar from overlapping the heading on tall windows.
      setVisible(y > showFrom && y + window.innerHeight < hideAt);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [showFrom, hideAt]);

  const base =
    "flex h-[36px] items-center justify-center rounded-full px-[18px] text-[15px] leading-[20px] font-medium whitespace-nowrap transition-colors";
  const on = "bg-white text-[#18181b] shadow-[0_2px_8px_rgba(0,0,0,0.06)]";
  const off = "text-[#92979d] hover:text-[#18181b]";

  return (
    <div
      role="tablist"
      aria-label="Problem and solution"
      aria-hidden={!visible}
      className="fixed bottom-[32px] left-1/2 z-30 flex -translate-x-1/2 items-center gap-[4px] rounded-full bg-[#f4f4f5] p-[4px] shadow-[0_6px_20px_rgba(0,0,0,0.10)] transition-opacity duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "before"}
        tabIndex={visible ? 0 : -1}
        onClick={() => onChange("before")}
        className={`${base} ${value === "before" ? on : off}`}
      >
        Problem (~Before)
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "after"}
        tabIndex={visible ? 0 : -1}
        onClick={() => onChange("after")}
        className={`${base} ${value === "after" ? on : off}`}
      >
        Solution (~After)
      </button>
    </div>
  );
}
