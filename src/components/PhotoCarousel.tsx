"use client";

import Image from "@/components/Img";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * "Stuffs I Click" — Figma component set 5826:26174 "Photos",
 * instanced at 5854:51257 (599x584) in the About bento.
 *
 * The set has ten variants (`Property 1` = 1..10) and the instance carries an
 * AFTER_TIMEOUT reaction of 3s that swaps to the next one, which is what makes
 * it a carousel rather than a static card. Each variant also has its OWN
 * caption — they are not all "Stuffs I Click" — so the label is per slide.
 *
 * Chrome, straight from the frame:
 *   label pill  (24,24)   white@50%, radius 20, padding 7/11/6/12
 *   dot rail   (227,540)  144x20, white@30%, radius 57
 *   dots        7x7 each, 13.7px apart
 *
 * The exported photos cover the node's render bounds (607x592 against a
 * 599x584 box), so the stack is inset by 4px a side to sit on the box.
 */

const SLIDES = [
  { src: "1.png", label: "Stuffs I Click" },
  { src: "2.png", label: "I play Badminton, Up for a game?" },
  { src: "3.png", label: "Stuffs I Click" },
  { src: "4.png", label: "Things which I don’t regret" },
  { src: "5.png", label: "Stuffs I Click" },
  { src: "6.png", label: "Stuffs I Click" },
  { src: "7.png", label: "Stuffs I Click" },
  { src: "8.png", label: "Yeah, its me" },
  { src: "9.png", label: "Got one" },
  { src: "10.png", label: "Stuffs I Click" },
];

/** Figma's AFTER_TIMEOUT on the instance. */
const INTERVAL_MS = 3000;

export function PhotoCarousel({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => {
    if (paused) return clear();
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return clear;
  }, [paused, clear]);

  // Respect a reader who would rather nothing moved on its own.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPaused(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const go = (i: number) => setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos"
    >
      {SLIDES.map((s, i) => (
        <Image
          key={s.src}
          src={`/images/about/photos/${s.src}`}
          alt={s.label}
          width={607}
          height={592}
          priority={i === 0}
          aria-hidden={i !== index}
          className="absolute inset-[-4px] h-[calc(100%+8px)] w-[calc(100%+8px)] max-w-none object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}

      {/* label pill — 5826:26177 at (24,24) */}
      <div
        className="absolute left-[24px] top-[24px] flex h-[30px] items-center rounded-[20px] bg-white/50 pt-[7px] pr-[11px] pb-[6px] pl-[12px] backdrop-blur-[2px]"
        aria-live="polite"
      >
        <span className="text-[14px] leading-[18px] font-medium whitespace-nowrap text-black">
          {SLIDES[index].label}
        </span>
      </div>

      {/* dot rail — 5826:26179, 144x20 at (227,540) */}
      <div className="absolute bottom-[24px] left-1/2 flex h-[20px] w-[144px] -translate-x-1/2 items-center justify-center gap-[6.7px] rounded-[57px] bg-white/30 backdrop-blur-[2px] xl:bottom-auto xl:left-[calc(227*var(--u))] xl:top-[calc(540*var(--u))] xl:translate-x-0 xl:bottom-[calc(24*var(--u))] xl:h-[calc(20*var(--u))] xl:w-[calc(144*var(--u))] xl:gap-[calc(6.7*var(--u))] xl:rounded-[calc(57*var(--u))]">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Photo ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index ? "true" : undefined}
            className="h-[7px] w-[7px] shrink-0 cursor-pointer rounded-full transition-colors"
            style={{ backgroundColor: i === index ? "#ffffff" : "rgba(255,255,255,0.45)" }}
          />
        ))}
      </div>
    </div>
  );
}
