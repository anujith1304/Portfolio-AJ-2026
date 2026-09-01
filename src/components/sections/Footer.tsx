import Image from "@/components/Img";
import { CopyEmail } from "@/components/CopyEmail";

/**
 * Footer / Contact.
 *
 * This no longer follows the Figma home frame. The file still has the older
 * composition — a 24px Circular Std paragraph ("Curious about my work? (or)
 * just craving a deep dive into products…") sitting *below* a 72px heading,
 * with the address on a separate "Drop me a text on" line above both. The
 * design supplied since restructures it:
 *
 *   card
 *   CURIOUS ABOUT MY WORK?            eyebrow, uppercase, tracked
 *   Let's Connect - or Collaborate    Recoleta, slate
 *   anujithchand2002@gmail.com        same face and size, on the next line
 *   ● ● ● ●                           social discs
 *                          badge
 *
 * So the long paragraph becomes a short eyebrow above the heading, and the
 * address is promoted from body copy into display type. Worth knowing the two
 * have diverged: a later pass that re-syncs this section from the file would
 * undo it.
 *
 * The card keeps its Figma box (400,99) 348x224 and gains the white mount and
 * slight counter-clockwise tilt the design shows.
 *
 * Asset note: the social row and copy icon are SVG, not PNG. Figma's PNG
 * export composites the node against the page background, which baked an
 * opaque #fdfcf9 block behind both. The badge uses the original uploaded
 * image, which is genuinely transparent — 49% of its pixels have alpha 0.
 */
export function Footer() {
  return (
    <section
      id="contact"
      className="page-x relative flex w-full flex-col items-start pt-[40px] pb-[56px] xl:block xl:h-[712px] xl:w-[1905px] xl:pt-0 xl:pb-0"
    >
      {/*
        The mount is the card: white, radius 26, 12px of margin around the
        artwork, and a soft drop shadow. The bitmap itself stays transparent —
        the opaque block baked into the export was the original complaint.
      */}
      <div className="w-full max-w-[290px] -rotate-[2deg] rounded-[26px] bg-white p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.10)] sm:max-w-[348px] xl:absolute xl:left-[400px] xl:top-[99px] xl:w-[348px] xl:max-w-none">
        <Image
          src="/images/footer/connect-card.png"
          alt=""
          width={696}
          height={448}
          className="h-auto w-full rounded-[16px] bg-[#f5f5f5]"
        />
      </div>

      <p className="mt-[44px] text-[13px] leading-[20px] font-medium tracking-[0.11em] text-black/45 uppercase xl:absolute xl:left-[400px] xl:top-[371px] xl:mt-0 xl:text-[16px]">
        Curious about my work?
      </p>

      <h2 className="type-connect mt-[10px] w-full text-[#4a5568] xl:absolute xl:left-[399px] xl:top-[404px] xl:mt-0 xl:w-[1100px]">
        Let&rsquo;s Connect - or Collaborate
      </h2>

      {/*
        The address is display type in this design, not body copy, so it is set
        in the same face and size as the heading directly beneath it. The copy
        control rides inside the paragraph so it shares the line at every width.
      */}
      <p className="type-connect mt-[4px] w-full break-words text-[#4a5568] xl:absolute xl:left-[399px] xl:top-[496px] xl:mt-0 xl:w-[1100px]">
        <a
          href="mailto:anujithchand2002@gmail.com"
          className="transition-colors hover:text-[#2f3a4d]"
        >
          {/*
            One line at xl. Narrower than that the address is wider than the
            column, so it is given a break opportunity after the @ — left to
            itself the browser splits mid-word ("...2002@g / mail.com").
          */}
          anujithchand2002@<wbr />gmail.com
        </a>
        <CopyEmail email="anujithchand2002@gmail.com" />
      </p>

      <Image
        src="/images/footer/social.svg"
        alt="Email, LinkedIn, Dribbble, Twitter"
        width={184}
        height={40}
        className="mt-[26px] h-[40px] w-[184px] xl:absolute xl:left-[400px] xl:top-[608px] xl:mt-0"
      />

      {/*
        Corner ornament on the backdrop. Sat at the file's y602, which left it
        27px above the artwork's bottom edge against 32px to the frame's right —
        close, but visibly unequal. y597 makes both insets 32.
      */}
      <Image
        src="/images/footer/badge.png"
        alt=""
        width={300}
        height={300}
        className="mt-[28px] h-[74px] w-[101px] self-end object-cover opacity-80 xl:absolute xl:left-[1738px] xl:top-[597px] xl:mt-0 xl:h-[98px] xl:w-[134px]"
      />
    </section>
  );
}
