"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "@/components/Img";

/**
 * Case study artwork with a full-view escape hatch.
 *
 * The exports are wide, densely annotated product screens drawn at up to
 * 1900px. Scaled into a phone column they stay legible enough to follow the
 * argument, but not to read a label on. Rather than degrade the page for that
 * minority of moments, each figure carries a control that opens the artwork
 * full-screen at its own size, where it can be panned and pinched.
 *
 * The control is always in the DOM so it is reachable by keyboard, and shows
 * on hover or focus at desktop where the artwork is already large.
 */

export function Figure({
  src,
  alt,
  width,
  height,
  className = "",
  style,
  priority,
  caption,
  /** Hide the control where the artwork is decorative rather than referenced. */
  zoomable = true,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  caption?: string;
  zoomable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    // The page behind must not scroll while the overlay owns the screen.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <figure className={`group relative m-0 ${className}`} style={style}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="block h-auto w-full rounded-[10px] xl:h-full xl:w-full xl:rounded-none"
      />

      {zoomable && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-[8px] top-[8px] z-10 rounded-full border border-black/10 bg-white/85 px-[9px] py-[4px] text-[11px] leading-[15px] font-medium text-[#222227] shadow-[0_1px_5px_rgba(0,0,0,0.10)] backdrop-blur-[2px] transition-opacity hover:bg-white xl:right-[10px] xl:top-[10px] xl:px-[12px] xl:py-[6px] xl:text-[12px] xl:leading-[16px] xl:opacity-0 xl:group-hover:opacity-100 xl:group-focus-within:opacity-100"
        >
          View Full Component
        </button>
      )}

      {caption && (
        <figcaption className="mt-[10px] text-[15px] leading-[24px] text-[#6b6b6b] xl:text-[16px]">
          {caption}
        </figcaption>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Full view"}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-[2px]"
        >
          <div className="flex shrink-0 items-center justify-between gap-[16px] px-[16px] py-[12px]">
            <span className="min-w-0 truncate text-[14px] text-white/80">{alt}</span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close full view"
              className="flex h-[36px] shrink-0 items-center gap-[8px] rounded-full bg-white/15 px-[14px] text-[14px] font-medium text-white transition-colors hover:bg-white/25"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Close
            </button>
          </div>
          {/*
            The artwork keeps its own width here and the frame scrolls, which is
            the point of the overlay — fitting it to the viewport would just
            reproduce the size it already has on the page.
          */}
          <div
            className="min-h-0 flex-1 overflow-auto overscroll-contain p-[16px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/*
              Shown at the artwork's own design size, not its pixel size: every
              export here is 2x, so rendering at the intrinsic width would double
              it. Wider than the viewport is the point — the frame scrolls, and
              that is what makes the labels readable.
            */}
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="mx-auto h-auto max-w-none rounded-[8px] bg-white"
              style={{ width: Math.round(width / 2), minWidth: "min(100%, 320px)" }}
            />
          </div>
        </div>
      )}
    </figure>
  );
}
