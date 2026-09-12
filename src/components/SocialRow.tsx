import Image from "@/components/Img";

/**
 * The social row is one exported asset in both places it appears — four discs
 * of equal size on an even pitch — so the links go over it as hotspots rather
 * than by rebuilding the icons as markup. The geometry is derived from the
 * asset's own dimensions: each disc is as wide as the row is tall, and the
 * leftover width is split evenly between them. Expressing that as percentages
 * keeps every hotspot on its disc at any width, including the --u canvas scale
 * at xl, without a second set of breakpoint rules.
 *
 * Order matches the artwork: email, LinkedIn, Dribbble, X.
 */
const LINKS: { label: string; href?: string }[] = [
  { label: "Email Anujith", href: "mailto:anujithchand2002@gmail.com" },
  {
    label: "Anujith on LinkedIn",
    href: "https://www.linkedin.com/in/anujith-s-81584922a/",
  },
  /* No Dribbble profile supplied yet, so this disc stays artwork for now. */
  { label: "Dribbble" },
  { label: "Anujith on X", href: "https://x.com/anujithchandhu" },
];

export function SocialRow({
  src,
  w,
  h,
  className = "",
}: {
  src: string;
  /** The asset's own width and height, used to place the hotspots. */
  w: number;
  h: number;
  className?: string;
}) {
  const gap = (w - LINKS.length * h) / (LINKS.length - 1);

  return (
    <div className={`relative ${className}`}>
      {/*
        Decorative: each disc that does anything is announced by the link that
        covers it, so repeating the icon names here would only double them up.
      */}
      <Image src={src} alt="" width={w} height={h} className="h-full w-full" />

      {LINKS.map((l, i) => {
        if (!l.href) return null;
        const external = !l.href.startsWith("mailto:");
        return (
          <a
            key={l.label}
            href={l.href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={l.label}
            className="absolute top-0 h-full rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60"
            style={{
              left: `${((i * (h + gap)) / w) * 100}%`,
              width: `${(h / w) * 100}%`,
            }}
          />
        );
      })}
    </div>
  );
}
