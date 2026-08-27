import Image from "@/components/Img";
import { CopyEmail } from "@/components/CopyEmail";

/**
 * Footer / Contact — Figma 5854:51580 "Frame 2147228584".
 * 1905x712 at page y=6578, VERTICAL, gap 10, padding 27/32.
 *
 * Panel 5854:51581 (the 1904x794 gradient that fades the artwork in) is NOT
 * rendered here. The artwork it sits over ("image 163", 5854:49627) is a
 * page-level sibling at y=6593 that bleeds to the window edge, so an overlay
 * confined to this 1905-wide frame left the image uncovered down both sides
 * and along the bottom 15px. Both now live together in page.tsx, where the
 * overlay can match the image it is supposed to cover.
 *
 * Asset note: the social row and copy icon are SVG, not PNG. Figma's PNG
 * export composites the node against the page background, which baked an
 * opaque #fdfcf9 block behind both. The SVG exports carried the same
 * background as <rect> elements (a #E4E4E4 artboard rect plus 1904-wide page
 * rects); those are stripped so only the icon art remains. The badge uses the
 * original uploaded image, which is genuinely transparent — 49% of its pixels
 * have alpha 0.
 */
export function Footer() {
  return (
    <section
      id="contact"
      className="relative h-[712px] w-[1905px]"
    >
      {/*
        5854:51585 — image card above the copy, 348x224 at (400,166).
        Figma's export covered the render bounds and baked the 4px shadow
        spill as opaque canvas colour, so the spill is cropped off and this is
        the node's own box on its true coordinate.
        The ground was baked into the source bitmap too (rgb(248,248,245)) and
        has been flood-filled to transparent from the border inwards. A plain
        colour key would have removed the drawing's interior whites as well,
        since it is black line art; the fill only reaches what connects to the
        edge, so the linework is untouched.
      */}
      <Image
        src="/images/footer/connect-card.png"
        alt=""
        width={696}
        height={448}
        className="absolute left-[400px] top-[166px] h-[224px] w-[348px] max-w-none"
      />

      {/* 5854:51588 — email line at (400,406); copy control at (938,412) */}
      <p className="absolute left-[400px] top-[406px] w-[558px]">
        <span className="type-circ-24-sm text-black/50">Drop me a text on </span>
        <a
          href="mailto:anujithchand2002@gmail.com"
          className="type-email-24 text-black/70"
        >
          anujithchand2002@gmail.com
        </a>
      </p>
      <CopyEmail email="anujithchand2002@gmail.com" />

      {/* 5854:51592 — Recoleta Medium 72/-1.28, no ss02 (plain Recoleta) */}
      <h2 className="type-connect absolute left-[399px] top-[462px] w-[945px] text-black/70">
        Let&rsquo;s Connect - or collaborate
      </h2>

      {/* 5854:51593 — Circular Std Book 24/32/-0.4 */}
      <p className="type-circ-24-lg absolute left-[399px] top-[562px] w-[945px] text-black/50">
        Curious about my work? (or) just craving a deep dive into products &amp;
        the rest of life&rsquo;s good stuff?, Let&rsquo;s chat.
      </p>

      {/* 5854:51594 — four 40x40 round buttons, gap 8 */}
      <Image
        src="/images/footer/social.svg"
        alt="Email, LinkedIn, Dribbble, Twitter"
        width={184}
        height={40}
        className="absolute left-[400px] top-[642px] h-[40px] w-[184px]"
      />

      {/* 5854:51685 — "image 166", image fill at 80% opacity */}
      <Image
        src="/images/footer/badge.png"
        alt=""
        width={300}
        height={300}
        className="absolute left-[1739px] top-[587px] h-[98px] w-[134px] object-cover opacity-80"
      />
    </section>
  );
}
