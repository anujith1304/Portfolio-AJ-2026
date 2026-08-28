"use client";

/**
 * "~ Before / After" toggle — Figma 5908:24503, 155x40 at (462,2618).
 *
 * The node tree and the render disagree here, and the render wins. The tree has
 * a #18181b separator at x89 and a #fafafa fill on option2, but neither appears
 * in Figma's own output: the separator sits under the selected pill, and the
 * option2 fill reads as the track colour. So this draws what actually renders —
 * a #f4f4f5 pill track carrying a white pill on the selected tab.
 *
 * Geometry is the frame's own: the pill is 87x32 inset 4px, and the second tab
 * is 55 wide at x92. The track is 155 wide and clips, so options 3-5 in the
 * source component sit past the clip and are not represented here.
 *
 * Every mockup on this page is the "before" state; the file has no "after"
 * artwork behind the second tab. Rather than wire a control to nothing, the
 * toggle reports which state is shown and stays honest about the missing half,
 * so the page can be completed later without changing this component.
 */

export type BeforeAfter = "before" | "after";

const PILL = "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]";

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
    "absolute top-[4px] flex h-[32px] items-center justify-center text-[14px] leading-[20px] font-medium transition-colors";
  return (
    <div
      role="tablist"
      aria-label="Before and after"
      className="absolute left-[462px] top-[2618px] h-[40px] w-[155px] rounded-full bg-[#f4f4f5]"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "before"}
        onClick={() => onChange("before")}
        className={`${base} left-[4px] w-[87px] rounded-full ${
          value === "before"
            ? `${PILL} text-[#18181b]`
            : "text-[#92979d] hover:text-[#18181b]"
        }`}
      >
        ~ Before
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "after"}
        aria-disabled={!hasAfter}
        onClick={() => hasAfter && onChange("after")}
        title={hasAfter ? undefined : "After states are not in the design file yet"}
        className={`${base} left-[92px] w-[55px] rounded-full ${
          value === "after" ? `${PILL} text-[#18181b]` : "text-[#92979d]"
        } ${hasAfter ? "hover:text-[#18181b]" : "cursor-not-allowed"}`}
      >
        After
      </button>
    </div>
  );
}
