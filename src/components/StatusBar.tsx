import { LocalTime } from "@/components/LocalTime";

/**
 * StatusBar — Figma 5826:24258 "Frame 2147223258".
 * 1801x56, HORIZONTAL, gap 669, items-center.
 *
 * Three groups, matching the frame's absolute offsets:
 *  - Variant 2  (0,0)     218x56 — location + local time
 *  - Frame …451 (887,9)   87x38  — scroll cue, VERTICAL gap 15.
 *    Centred on the bar rather than left at 887: the file's own offset puts it
 *    ~43px right of centre, which reads as a misalignment on a bar this wide.
 *  - Variant 1  (1643,11) 158x34 — availability
 *
 * Those offsets only hold at the 1801px width, so they sit behind `xl:`. Below
 * it the three groups are a flex row: location and availability at the ends,
 * and the scroll cue — a pointer affordance with little meaning on touch —
 * only from tablet up.
 */
export function StatusBar() {
  return (
    <div className="relative flex w-full items-start justify-between gap-x-[16px] xl:h-[calc(56*var(--u))] xl:w-[calc(1801*var(--u))] xl:gap-x-[calc(16*var(--u))]">
      {/* Variant 2 — location */}
      <div className="w-auto shrink-0 xl:absolute xl:left-0 xl:top-0 xl:w-[calc(219*var(--u))]">
        <p className="type-status text-black/60">Based in Tamil nadu</p>
        <span className="mt-[4px] flex items-center gap-[6px]">
          <LocalTime className="type-meta-12 text-black/40" />
          <span aria-hidden className="text-[12px] leading-[12px]">
            {"\u{1F5FB}"}
          </span>
        </span>
      </div>

      {/* Scroll cue */}
      <a
        href="#works"
        className="hidden shrink-0 flex-col items-center gap-[15px] text-black/30 transition-colors hover:text-black/50 md:flex xl:absolute xl:left-1/2 xl:top-[calc(9*var(--u))] xl:w-[calc(87*var(--u))] xl:-translate-x-1/2 xl:gap-[calc(15*var(--u))]"
      >
        <span className="type-scroll-16">
          Scroll down
        </span>
        <svg width="10" height="4" viewBox="0 0 10 4" fill="none" aria-hidden="true">
          <path
            d="M1 1l4 2 4-2"
            stroke="currentColor"
            strokeWidth="1.84"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/*
        Variant 1 — availability.

        The three parts sit on hand-placed offsets inside a 158px box in the
        file, which only reads correctly at that width: reflowed, the marker and
        its label were left stranded mid-block instead of lining up under the
        heading. Below xl they stack and align to the right edge, and the marker
        sits inline with its label; at xl the Figma offsets are restored.
      */}
      <div className="relative flex shrink-0 flex-col items-end gap-[3px] xl:absolute xl:left-[calc(1643*var(--u))] xl:top-[calc(11*var(--u))] xl:block xl:h-[calc(34*var(--u))] xl:w-[calc(158*var(--u))]">
        <span className="type-avail-16 whitespace-nowrap text-black/60 xl:absolute xl:left-[calc(11*var(--u))] xl:top-0">
          Freelance Availibility
        </span>
        <span className="flex items-center gap-[6px] xl:contents">
          <span
            className="h-[12px] w-[9px] shrink-0 rounded-full bg-brand-orange xl:absolute xl:left-[calc(55*var(--u))] xl:top-[calc(20*var(--u))] xl:h-[calc(14*var(--u))] xl:w-[calc(10*var(--u))]"
            aria-hidden="true"
          />
          <span className="type-meta-12-up whitespace-nowrap text-black/40 xl:absolute xl:left-[calc(70*var(--u))] xl:top-[calc(21*var(--u))]">
            Limited Hours
          </span>
        </span>
      </div>
    </div>
  );
}
