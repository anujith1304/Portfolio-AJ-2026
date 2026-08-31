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
    <div className="relative flex w-full items-start justify-between gap-x-[16px] xl:h-[56px] xl:w-[1801px]">
      {/* Variant 2 — location */}
      <div className="w-auto shrink-0 xl:absolute xl:left-0 xl:top-0 xl:w-[219px]">
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
        className="hidden shrink-0 flex-col items-center gap-[15px] text-black/30 transition-colors hover:text-black/50 md:flex xl:absolute xl:left-1/2 xl:top-[9px] xl:w-[87px] xl:-translate-x-1/2"
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

      {/* Variant 1 — availability */}
      <div className="relative h-[34px] w-[158px] shrink-0 xl:absolute xl:left-[1643px] xl:top-[11px]">
        <span className="absolute left-[11px] top-0 type-avail-16 text-black/60">
          Freelance Availibility
        </span>
        <span
          className="absolute left-[55px] top-[20px] h-[14px] w-[10px] rounded-full bg-brand-orange"
          aria-hidden="true"
        />
        <span className="absolute left-[70px] top-[21px] type-meta-12-up text-black/40">
          Limited Hours
        </span>
      </div>
    </div>
  );
}
