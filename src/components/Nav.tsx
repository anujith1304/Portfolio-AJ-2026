/**
 * Nav — Figma 5826:26108 "Background".
 * 452x54, HORIZONTAL, gap 16, padding 18/24, radius 66,
 * fill #FFFFFF, 1px stroke #F3F3F3.
 * Type: Satoshi 16 / lh 10 / ls -0.4 — Home Bold, the rest Medium.
 */

const LINKS = [
  { label: "Case Studies", href: "#works" },
  { label: "Experience", href: "#about" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * `base` prefixes the in-page anchors so the same bar works off the home page.
 * On a case study the hashes have no targets, so they resolve to "/#works" and
 * navigate home first.
 */
export function Nav({ base = "", active = "Home" }: { base?: string; active?: string }) {
  return (
    <nav
      className="flex h-[54px] w-[452px] items-center gap-[16px] rounded-[66px] border border-[#F3F3F3] bg-white px-[24px] py-[18px]"
      style={{
        boxShadow:
          "0px 8px 10px 0px rgba(0,0,0,0.10), inset 0px 0px 8px 0px rgba(255,255,255,0.45)",
        backdropFilter: "blur(16px)",
      }}
    >
      <a
        href={base || "#top"}
        aria-current={active === "Home" ? "page" : undefined}
        className={`flex shrink-0 items-center gap-[2px] ${
          active === "Home" ? "type-nav-active text-black" : "type-nav text-black/55 transition-colors hover:text-black"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 18L6 6M6 6v9M6 6h9"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Home
      </a>

      <div className="flex items-center gap-[16px]">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={`${base}${l.href}`}
            aria-current={active === l.label ? "page" : undefined}
            className={
              active === l.label
                ? "type-nav-active text-black"
                : "type-nav text-black/55 transition-colors hover:text-black"
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
