"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Nav — Figma 5826:26108 "Background".
 * 452x54, HORIZONTAL, gap 16, padding 18/24, radius 66,
 * fill #FFFFFF, 1px stroke #F3F3F3.
 * Type: Satoshi 16 / lh 10 / ls -0.4 — Home Bold, the rest Medium.
 *
 * The pill is a fixed 452px at xl, per the file, but our text sets a little
 * narrower than Figma's, leaving ~17px of slack. Centring the row splits that
 * evenly instead of letting it all pile up after "Contact", which read as a
 * lopsided bar.
 *
 * Those metrics are the desktop (>= xl) rendering and are untouched. Below it
 * the bar has to earn its width back: at tablet the pill keeps every link but
 * tightens its type and padding, and on a phone five links cannot fit at a
 * legible size, so it collapses to Home plus a menu that opens the rest.
 */

const LINKS = [
  { label: "Case Studies", href: "#works" },
  { label: "Experience", href: "#about" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 18L6 6M6 6v9M6 6h9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * `base` prefixes the in-page anchors so the same bar works off the home page.
 * On a case study the hashes have no targets, so they resolve to "/#works" and
 * navigate home first.
 */
export function Nav({ base = "", active = "Home" }: { base?: string; active?: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // A menu pinned over the page should close on an outside tap or Escape,
  // otherwise it sits on top of whatever the reader taps next.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkCls = (label: string) =>
    active === label
      ? "type-nav-active text-black"
      : "type-nav text-black/55 transition-colors hover:text-black";

  return (
    <div ref={wrap} className="relative">
      <nav
        className="flex h-[48px] items-center justify-center gap-[12px] rounded-[66px] border border-[#F3F3F3] bg-white px-[16px] md:h-[54px] md:gap-[16px] md:px-[20px] xl:w-[452px] xl:gap-[16px] xl:px-[24px] xl:py-[18px]"
        style={{
          boxShadow:
            "0px 8px 10px 0px rgba(0,0,0,0.10), inset 0px 0px 8px 0px rgba(255,255,255,0.45)",
          backdropFilter: "blur(16px)",
        }}
      >
        <a
          href={base || "#top"}
          aria-current={active === "Home" ? "page" : undefined}
          className={`flex shrink-0 items-center gap-[2px] ${linkCls("Home")}`}
        >
          <HomeIcon />
          Home
        </a>

        {/* Tablet and up: every link inline, as in the file. */}
        <div className="hidden items-center gap-[12px] md:flex xl:gap-[16px]">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={`${base}${l.href}`}
              aria-current={active === l.label ? "page" : undefined}
              className={linkCls(l.label)}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Phone: the rest of the bar lives behind this. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-[4px] ml-auto flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-black/70 transition-colors hover:bg-black/[0.05] hover:text-black md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2.5 5h13M2.5 9h13M2.5 13h13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+8px)] flex flex-col overflow-hidden rounded-[20px] border border-[#F3F3F3] bg-white py-[6px] md:hidden"
          style={{ boxShadow: "0px 10px 24px 0px rgba(0,0,0,0.12)" }}
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={`${base}${l.href}`}
              onClick={() => setOpen(false)}
              aria-current={active === l.label ? "page" : undefined}
              className={`px-[18px] py-[11px] text-[15px] leading-[20px] transition-colors hover:bg-black/[0.04] ${
                active === l.label ? "font-bold text-black" : "font-medium text-black/60"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
