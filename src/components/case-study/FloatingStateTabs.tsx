"use client";

import { useEffect, useState } from "react";
import type { Variant } from "@/app/work/translate-video/content";
import { StateTabs, STATE_TABS_TRACK } from "./StateTabs";

/**
 * The Problem/Solution switch, pinned to the bottom of the viewport.
 *
 * The only state toggle in the Figma file sits at y2618, above the first
 * screen. Once a reader is deep in the problem list — thousands of pixels
 * down — comparing a problem with its solution means scrolling all the way
 * back up, flipping the tab, and scrolling down again. This is the same
 * control, rendered from the same component as the inline strip, following
 * the reader down the page.
 *
 * It is not in the file: the file is a static prototype where the tab is only
 * ever seen at the top, so the problem it solves does not arise there.
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
      // offset keeps the bar from overlapping the heading on tall windows, and
      // lets it track each state's own tail offset.
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

  return (
    <div
      role="tablist"
      aria-label="Problem and solution"
      aria-hidden={!visible}
      className={`${STATE_TABS_TRACK} fixed bottom-[32px] left-1/2 z-30 -translate-x-1/2 shadow-[0_6px_20px_rgba(0,0,0,0.10)] transition-opacity duration-300 ease-out`}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <StateTabs value={value} onChange={onChange} tabIndex={visible ? 0 : -1} />
    </div>
  );
}
