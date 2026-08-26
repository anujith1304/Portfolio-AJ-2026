"use client";

import { useEffect, useState } from "react";

/**
 * Section index for the case study pages.
 *
 * There are two designs, and which one shows is purely a function of where the
 * reader is:
 *
 *   plain  — Figma 5854:34793 / 5854:39507, a bare 124-wide list. Used
 *            everywhere the body column is empty canvas behind it.
 *   carded — Figma 5891:6173 "Sidebar", 200x370: white, radius 18.96,
 *            0.79px #e4e4e7 stroke, drop shadow r1.58 #000@5 at 0,0.79, and
 *            24.79px of padding around the same 124-wide list. Used only in
 *            the Navigation section, where the screen grid runs the full frame
 *            width and a bare list would read straight on top of the artwork.
 *
 * The two differ only by a surface, so they are not two layouts: one fixed
 * element always carries the card's padding and width, and the card's
 * background/stroke/shadow fades in beneath the labels. That keeps the labels
 * on the same x — 241px into the frame — through the swap, with no reflow and
 * no jump, and makes the change a crossfade rather than a snap.
 *
 * Item metrics come from the component's inner frame: rows 37px apart, which
 * is a 25px line box plus the 12px gap, and the current row set in Bold 18/28.
 */

export type SideNavItem = { label: string; id: string; top: number };

export function CaseSideNav({
  items,
  /** y where the body column starts — the list appears from here. */
  startAt,
  /** y where the carded design takes over (the Navigation section top). */
  cardFrom,
  /** y of the Related strip — the list is gone before this scrolls in. */
  endAt,
}: {
  items: SideNavItem[];
  startAt: number;
  cardFrom?: number;
  endAt: number;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [visible, setVisible] = useState(false);
  const [carded, setCarded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Present from the top of the body column until the Related strip comes
      // into view. Measuring against the viewport bottom rather than a fixed
      // offset is what guarantees the list is never on screen at the same time
      // as "Explore More" — the Navigation section ends only 40px above it, so
      // a constant margin would either clip the section early or overlap.
      setVisible(y > startAt - 400 && y + window.innerHeight < endAt);
      setCarded(cardFrom !== undefined && y > cardFrom - 300);

      // The entry whose section top is the last one above the reading line.
      // The line sits just below where a clicked section lands (top - 120), so
      // consecutive sections only ~330px apart still resolve to the right one.
      const line = y + 160;
      let current = items[0];
      for (const it of items) if (it.top <= line) current = it;
      setActiveId(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, startAt, endAt, cardFrom]);

  const go = (e: React.MouseEvent, item: SideNavItem) => {
    e.preventDefault();
    window.scrollTo({
      top: item.top - 120,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    history.replaceState(null, "", `#${item.id}`);
  };

  return (
    <nav
      aria-label="Sections"
      className="fixed top-[140px] z-20 hidden w-[200px] flex-col gap-[12px] p-[24.79px] transition-opacity duration-300 xl:flex"
      style={{
        /*
         * The two designs differ only by a surface — container, stroke, shadow.
         * So the element itself never changes: it always carries the card's
         * 24.79px padding and 200px width, and the surface below fades in and
         * out underneath. Nothing reflows, so the labels do not shift by the
         * padding when the design swaps, and the change is a pure crossfade.
         *
         * Padding is constant, so the box sits 24.79px left of where the text
         * should land. Text at 241px into the centred 1905 frame means a box
         * at 216.21px: 50% - 952.5px + 216.21px.
         */
        left: "calc(50% - 736.29px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Figma 5891:6173 surface — present only through the Navigation section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[18.96px] border-[0.79px] border-[#e4e4e7] bg-white shadow-[0_0.79px_1.58px_0_rgba(0,0,0,0.05)] transition-opacity duration-300 ease-out"
        style={{ opacity: carded ? 1 : 0 }}
      />

      {items.map((it) => {
        const active = it.id === activeId;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={(e) => go(e, it)}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "relative text-left text-[18px] leading-[28px] font-bold whitespace-nowrap text-[#222227]"
                : "relative text-left text-[16px] leading-[25px] font-medium whitespace-nowrap text-[#6b6b6b] transition-colors hover:text-[#222227]"
            }
          >
            {it.label}
          </a>
        );
      })}
    </nav>
  );
}

/** Zero-height scroll target placed at a section's Figma y. */
export function Anchor({ id, top }: { id: string; top: number }) {
  return <span id={id} className="absolute left-0 h-px w-px" style={{ top }} />;
}
