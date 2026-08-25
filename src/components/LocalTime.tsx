"use client";

import { useEffect, useState } from "react";

/**
 * The Figma frame shows a live local time ("9:08 PM GMT+5:30").
 *
 * Rendered empty on the server and filled in after mount: the value depends on
 * the current clock, so emitting it during the static export would ship a
 * timestamp frozen at build time and cause a hydration mismatch.
 */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ? `${time} GMT+5:30` : " "}
    </span>
  );
}
