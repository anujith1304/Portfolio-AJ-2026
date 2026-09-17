"use client";

import { useEffect, useRef } from "react";

/**
 * A looping collage tile.
 *
 * It autoplays from the markup so it still runs with JavaScript off, and the
 * effect only intervenes to stop it: the loop is decorative, runs longer than
 * five seconds and never ends on its own, which is exactly the case WCAG 2.2.2
 * asks to be pausable. Anyone who has asked their system for less motion gets
 * the poster frame instead, and gets it live if they change that setting while
 * the page is open.
 */
export function CollageVideo({
  src,
  poster,
  className,
  style,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        /* Autoplay can still be refused (a data saver, a background tab); the
           poster stays up if it is, which is the right thing to show anyway. */
        void video.play().catch(() => {});
      }
    };

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
      style={style}
    />
  );
}
