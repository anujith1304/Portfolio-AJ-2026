import Image from "@/components/Img";
import { CopyEmail } from "@/components/CopyEmail";

/**
 * Footer / Contact — Figma home frame 5908:32522, page y 6578.
 *
 * Rebuilt against the current frame. The offsets here previously came from
 * 5854:49620, the home frame Figma has since replaced, and every element was
 * 67px low as a result — that frame's footer group started at 6578 where this
 * one starts at 6511. Coordinates are now taken from the live nodes:
 *
 *   connect card  5908:34495  (400,6677) 348x224 r24
 *   email row     5908:34496  (400,6917) 558x32, copy control at 938
 *   heading       5908:34401  (399,6973) 945x80  Recoleta Medium 72 @70%
 *   body          5908:34402  (399,7073) 945x64  Circular Std Book 24/32 @50%
 *   socials       5908:34403  (400,7153) 184x40  four 40x40 discs, gap 8
 *   badge         5908:34500  (1738,7180) 134x98
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
      className="page-x relative flex w-full flex-col items-start pt-[40px] pb-[56px] xl:block xl:h-[712px] xl:w-[1905px] xl:pt-0 xl:pb-0"
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
      {/*
        The card has a #f5f5f5 ground and a 24px radius in the file. The bitmap
        keeps its transparency — the opaque block baked into the export was what
        made it read as a white rectangle — and the ground is painted here, so
        the artwork sits on a card rather than floating over the backdrop.
      */}
      <div className="w-full max-w-[300px] overflow-hidden rounded-[24px] bg-[#f5f5f5] sm:max-w-[348px] xl:absolute xl:left-[400px] xl:top-[99px] xl:h-[224px] xl:w-[348px] xl:max-w-none">
        <Image
          src="/images/footer/connect-card.png"
          alt=""
          width={696}
          height={448}
          className="h-auto w-full xl:h-[224px] xl:w-[348px]"
        />
      </div>

      {/* 5854:51588 — email line at (400,406); copy control at (938,412) */}
      {/*
        The copy control sits at its own frame coordinate at xl. In flow it
        belongs beside the address, so the two share a row and the wrapper is
        flattened at xl (`contents`) to leave both on their Figma offsets.
      */}
      {/*
        One line at xl, where there is room for it. Below that the label takes
        its own line so the address and the copy control stay together on the
        next — the address alone is most of a phone's width, so keeping the
        three inline pushed the control onto a third line by itself.
      */}
      <div className="mt-[24px] w-full xl:contents">
        <p className="w-full xl:absolute xl:left-[400px] xl:top-[339px] xl:w-[558px]">
          <span className="type-circ-24-sm block text-black/50 xl:inline">
            Drop me a text on{" "}
          </span>
          <a
            href="mailto:anujithchand2002@gmail.com"
            className="type-email-24 break-all text-black/70 xl:break-normal"
          >
            anujithchand2002@gmail.com
          </a>
          {/*
            Inside the paragraph, so it sets on the same line as the address in
            flow. At xl it is absolutely positioned and the nesting is moot.
          */}
          <CopyEmail email="anujithchand2002@gmail.com" />
        </p>
      </div>

      {/* 5854:51592 — Recoleta Medium 72/-1.28, no ss02 (plain Recoleta) */}
      <h2 className="type-connect mt-[20px] w-full text-black/70 xl:absolute xl:left-[399px] xl:top-[395px] xl:mt-0 xl:w-[945px]">
        Let&rsquo;s Connect - or collaborate
      </h2>

      {/* 5854:51593 — Circular Std Book 24/32/-0.4 */}
      <p className="type-circ-24-lg measure mt-[14px] w-full text-black/50 xl:absolute xl:left-[399px] xl:top-[495px] xl:mt-0 xl:w-[945px] xl:max-w-none">
        Curious about my work? (or) just craving a deep dive into products &amp;
        the rest of life&rsquo;s good stuff?, Let&rsquo;s chat.
      </p>

      {/* 5854:51594 — four 40x40 round buttons, gap 8 */}
      <Image
        src="/images/footer/social.svg"
        alt="Email, LinkedIn, Dribbble, Twitter"
        width={184}
        height={40}
        className="mt-[28px] h-[40px] w-[184px] xl:absolute xl:left-[400px] xl:top-[575px] xl:mt-0"
      />

      {/* 5854:51685 — "image 166", image fill at 80% opacity */}
      <Image
        src="/images/footer/badge.png"
        alt=""
        width={300}
        height={300}
        className="mt-[28px] h-[74px] w-[101px] self-end object-cover opacity-80 xl:absolute xl:left-[1738px] xl:top-[602px] xl:mt-0 xl:h-[98px] xl:w-[134px]"
      />
    </section>
  );
}
