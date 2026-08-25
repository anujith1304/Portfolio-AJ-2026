import { LocalTime } from "@/components/LocalTime";

/**
 * StatusBar — Figma 5826:24258 "Frame 2147223258".
 * 1801x56, HORIZONTAL, gap 669, items-center.
 *
 * Three groups, matching the frame's absolute offsets:
 *  - Variant 2  (0,0)     218x56 — location + local time
 *  - Frame …451 (887,9)   87x38  — scroll cue, VERTICAL gap 15
 *  - Variant 1  (1643,11) 158x34 — availability
 */
export function StatusBar() {
  return (
    <div className="relative h-[56px] w-[1801px]">
      {/* Variant 2 — location */}
      <div className="absolute left-0 top-0 w-[219px]">
        <p className="text-[16px] font-bold leading-[19.2px] text-black/60">
          Based in Tamil nadu
        </p>
        <LocalTime className="mt-[4px] block text-[12px] leading-[12px] text-black/40" />
      </div>

      {/* Scroll cue */}
      <a
        href="#works"
        className="absolute left-[887px] top-[9px] flex w-[87px] flex-col items-center gap-[15px] text-black/30 transition-colors hover:text-black/50"
      >
        <span className="text-[16px] font-medium leading-[19.2px]">
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
      <div className="absolute left-[1643px] top-[11px] h-[34px] w-[158px]">
        <span className="absolute left-[11px] top-0 text-[16px] font-medium leading-[14.4px] text-black/60">
          Freelance Availibility
        </span>
        <span
          className="absolute left-[55px] top-[20px] h-[14px] w-[10px] rounded-full bg-accent"
          aria-hidden="true"
        />
        <span className="absolute left-[70px] top-[21px] text-[12px] leading-[12.6px] uppercase text-black/40">
          Limited Hours
        </span>
      </div>
    </div>
  );
}
