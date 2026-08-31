import Image from "@/components/Img";
import { PhotoCarousel } from "@/components/PhotoCarousel";

/**
 * About — Figma 5854:50990 "Frame 2147228579".
 * 1808x1614, VERTICAL, gap 24.
 *
 *  - Header    5854:50991: 1808x90, heading with the same vertical gradient
 *              text fill as the Works heading (black@50% -> black@4%).
 *  - Container 5854:50993: 1808x1500, a bento of nine absolutely placed cards.
 *
 * Copy, headings and the education / experience lists are real markup. The
 * photographic and illustrated cards (profile, design stack, photo carousel,
 * album rows, company logos, social icon row) are exported from Figma —
 * they are bitmaps and nested vector art, not layout.
 *
 * Placement note: several exports cover the node's render bounds rather than
 * its box, i.e. they include the drop-shadow spill. Where that happens the
 * card is offset by the difference (4px a side) so the artwork lands on the
 * Figma coordinate. Exports whose size already matches the box are placed
 * straight onto it.
 *
 * Responsive note: the bento is only a bento at >= xl, where each card keeps
 * its Figma box and its contents keep their offsets inside it. Below that the
 * cards are a one- then two-column stack and their contents flow.
 *
 * Every Figma coordinate therefore rides on a custom property rather than an
 * inline style: an inline left/width/height applies at every breakpoint, and in
 * flow those would re-impose the desktop geometry on a phone. The properties
 * are only read by the xl rules.
 */

/**
 * The bento's card shell. In flow it is a padded box; at xl it takes the Figma
 * rectangle and becomes the positioning context for its own contents.
 */
function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative mb-[16px] break-inside-avoid rounded-[20px] border border-hairline bg-white p-[20px] xl:absolute xl:mb-0 xl:p-0 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

const GRADIENT =
  "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)";

/*
 * Education and Experience offsets are relative to their own card, not to the
 * bento. Both cards are absolutely positioned at xl, so their contents resolve
 * against the card box: Education sits at bento (1223,21) and Experience at
 * (1223,273), and those origins are already subtracted from the values below.
 * The file's own numbers are given alongside for reference.
 */
const EDUCATION = [
  {
    years: "2022 — 2024",
    degree: "Master of Computer Application",
    school: "Acharya Institues, Bangalore",
    top: 76, // bento 97
  },
  {
    years: "2019 — 2022",
    degree: "Bachelor of Computer Science",
    school: "South Travancore Hindu College, Nagercoil",
    top: 147, // bento 168
  },
];

const EXPERIENCE = [
  {
    logo: "logo-vitra.png",
    company: "Vitra.AI",
    dates: "Apr 2025 - Present",
    datesLeft: 393, // bento 1616
    datesWidth: 154,
    role: "UX/UI Designer - ",
    mode: "On site",
    body: "DesignLed end-to-end UX across 4 AI products at a B2B content translation platform, designing scalable interfaces for enterprise users from concept to launch. Drove product adoption from 2% to 18% in two quarters by identifying and resolving 8+ critical usability gaps through research and testing.",
    logoTop: 88, // bento 361
    bodyHeight: 144,
  },
  {
    logo: "logo-gms.png",
    company: "Get My Strock",
    dates: "Oct 2024 - Mar 2025",
    datesLeft: 374, // bento 1597
    datesWidth: 174,
    role: "Founding Product Designer - ",
    mode: "Hybrid",
    body: "Led end-to-end design of a B2B stock management app from 0 to 1, shipping the MVP in 3 months with a 92% usability success rate. Ran 15+ user interviews and 3 rounds of testing across 20+ iterations, while partnering with engineering to cut post-launch design bugs by 30%.",
    logoTop: 383, // bento 656
    bodyHeight: 143,
  },
  {
    logo: "logo-parkqwik.png",
    company: "Parkqwik",
    dates: "Jul 2024 - Sep 2024",
    datesLeft: 374, // bento 1597
    datesWidth: 174,
    role: "Product Designer Intern - ",
    mode: "Remote",
    body: "Collaborated with the design team on live product projects while independently conceptualising and delivering a website redesign that was selected and shipped. Redesigned the core application to improve performance and ease of use, and contributed to UI improvements across the product backed by user research.",
    logoTop: 677, // bento 950
    bodyHeight: 143,
  },
  {
    logo: "logo-freelance.png",
    company: "Freelance Product Designer",
    dates: "Apr 2024 - Present",
    datesLeft: 392, // bento 1615
    datesWidth: 156,
    role: "Product Designer - ",
    mode: "Remote",
    body: "Design and improve end-to-end user experiences for a range of digital products, crafting interfaces that balance usability, accessibility, and visual appeal. Work closely with stakeholders to understand user needs, translate them into intuitive designs",
    logoTop: 971, // bento 1244
    bodyHeight: 114,
  },
];

const JAMS = [1014, 1109, 1202, 1296, 1390];

export function About() {
  return (
    <section
      id="about"
      className="page-x flex w-full flex-col gap-[24px] xl:w-[1808px]"
    >
      {/* 5854:50991 */}
      <div className="flex w-full items-center xl:h-[90px] xl:w-[1808px]">
        <h2
          className="type-works-72 flex items-center bg-clip-text text-transparent xl:h-[90px] xl:w-[911px]"
          style={{ backgroundImage: GRADIENT }}
        >
          What I&rsquo;m about
        </h2>
      </div>

      {/*
        5854:50993 — the bento. At xl every card keeps its Figma box and its
        children keep their offsets inside it. Below xl the same cards are a
        one- then two-column stack, and each card's content flows.
      */}
      <div className="columns-1 gap-[16px] md:columns-2 xl:relative xl:block xl:columns-1 xl:h-[1500px] xl:w-[1808px]">
        {/* ---- Bio card — 5854:50994, 563x301 at (13,21) ---- */}
        <Card className="xl:left-[13px] xl:top-[21px] xl:h-[301px] xl:w-[563px]">
          <p className="type-lead-28 text-[#616161] xl:absolute xl:left-[19px] xl:top-[39px] xl:w-[522px]">
            Product Designer with 2+years of experience, focused on creating
            functional and user-centered digital products with visually stunning
            designs.
          </p>
          <div className="mt-[20px] flex items-center justify-between gap-[16px] xl:mt-0 xl:block">
            <Image
              src="/images/about/social-links.png"
              alt="Copy email, LinkedIn, Dribbble, Twitter"
              width={725}
              height={147}
              className="h-[37px] w-[181px] xl:absolute xl:left-[21px] xl:top-[244px]"
            />
            <a
              href="#"
              className="flex h-[38px] w-[111px] shrink-0 items-center justify-center rounded-[57px] bg-black/4 xl:absolute xl:left-[432px] xl:top-[243px]"
            >
              <span className="font-figtree text-[16.04px] leading-[16.04px] font-medium text-black">
                Resume
              </span>
            </a>
          </div>
        </Card>

        {/* ---- "Good design is balanced." — 5854:51092, 563x572 at (13,346) ---- */}
        <Card className="xl:left-[13px] xl:top-[346px] xl:h-[572px] xl:w-[563px]">
          {/*
            5854:51095 is a MIXED-fill text node, not one gradient:
              "Good design is" -> SOLID #000000 at full opacity
              "balanced."      -> linear gradient black@41% -> black@15%
            Painting the section-heading gradient (50% -> 4%) across both, as
            this previously did, washed the first line out to near-invisible.
          */}
          <h3 className="type-quote-72 xl:absolute xl:left-[24px] xl:top-[24px] xl:w-[515px]">
            <span className="text-black">Good design is</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0,0,0,0.41) 0%, rgba(0,0,0,0.15) 100%)",
              }}
            >
              balanced.
            </span>
          </h3>
          <p className="mt-[16px] text-[14px] leading-[20px] text-[#6b6b6b] xl:absolute xl:left-[24px] xl:top-[194px] xl:mt-0 xl:w-[485px]">
            Strategic thinker crafting clean, effective designs that seamlessly
            blend user delight with business success.
          </p>
          {/*
            Animated yin-yang supplied by the user, replacing the still export.
            Converted from a 14.2MB / 180-frame GIF to animated WebP at half the
            frame count with doubled durations — same motion and timing, 1.7MB.
            `unoptimized` keeps Next from collapsing it to a single frame.
          */}
          <Image
            src="/images/about/balanced.webp"
            alt=""
            width={620}
            height={503}
            unoptimized
            className="mx-auto mt-[20px] h-auto w-full max-w-[348px] rounded-[20px] object-contain xl:absolute xl:left-[107px] xl:top-[266px] xl:mt-0 xl:h-[269px] xl:w-[348px]"
          />
        </Card>

        {/* ---- Favorite Jams — border 5854:51099, 563x542 at (13,942) ---- */}
        <Card className="xl:left-[13px] xl:top-[942px] xl:h-[542px] xl:w-[563px]">
          <h3 className="text-[20px] leading-[18px] font-medium text-black xl:absolute xl:left-[16px] xl:top-[24px]">
            Jams I Keep Coming Back To
          </h3>
          <div className="mt-[16px] flex flex-col gap-[10px] xl:mt-0 xl:block">
            {JAMS.map((top, i) => (
              <Image
                key={top}
                src={`/images/about/jam-${i + 1}.png`}
                alt=""
                width={1078}
                height={164}
                className="h-auto w-full xl:absolute xl:left-[12px] xl:top-[var(--y)] xl:h-[82px] xl:w-[539px]"
                style={{ ["--y" as string]: `${top}px` }}
              />
            ))}
          </div>
        </Card>

        {/* ---- Column 2 — exports carry 4px shadow spill a side ---- */}
        <Image
          src="/images/about/profile.png"
          alt="Hey, Anujith here"
          width={1214}
          height={1151}
          className="mb-[16px] h-auto w-full break-inside-avoid rounded-[20px] xl:absolute xl:left-[596px] xl:top-[17px] xl:mb-0 xl:h-[575.5px] xl:w-[607px] xl:max-w-none xl:rounded-none"
        />
        <Image
          src="/images/about/design-stack.png"
          alt="Design stack"
          width={1214}
          height={544}
          className="mb-[16px] h-auto w-full break-inside-avoid rounded-[20px] xl:absolute xl:left-[596px] xl:top-[608px] xl:mb-0 xl:h-[272px] xl:w-[607px] xl:max-w-none xl:rounded-none"
        />
        {/*
          5854:51257 — a Photos component instance, not a still. Ten variants
          with an AFTER_TIMEOUT of 3s between them, each carrying its own
          caption, plus a pagination rail. Rendered as a live carousel.
        */}
        <div
          className="fit-canvas mb-[16px] break-inside-avoid xl:absolute xl:left-[600px] xl:top-[900px] xl:mb-0 xl:h-[584px] xl:w-[599px] xl:max-w-none"
          style={{ ["--fw" as string]: 599, ["--fh" as string]: 584 }}
        >
          <PhotoCarousel className="absolute inset-0 h-full w-full" />
        </div>

        {/* ---- Education — 5854:51100, 572x228 at (1223,21) ---- */}
        <Card className="xl:left-[1223px] xl:top-[21px] xl:h-[228px] xl:w-[572px]">
          <h3 className="text-[20px] leading-[20.62px] font-medium text-black xl:absolute xl:left-[32px] xl:top-[32px]">
            Education
          </h3>
          <div className="mt-[18px] flex flex-col gap-[16px] xl:mt-0 xl:block">
            {EDUCATION.map((e) => (
              <div
                key={e.years}
                className="flex flex-col gap-[2px] sm:flex-row sm:gap-[24px] xl:block"
              >
                <span
                  className="shrink-0 text-[18px] leading-[25.66px] font-normal text-black xl:absolute xl:left-[32px] xl:top-[var(--y)]"
                  style={{ ["--y" as string]: `${e.top}px` }}
                >
                  {e.years}
                </span>
                <span className="xl:contents">
                  <span
                    className="block text-[18px] leading-[22.46px] font-medium text-black xl:absolute xl:left-[199px] xl:top-[var(--y)] xl:w-[322px]"
                    style={{ ["--y" as string]: `${e.top}px` }}
                  >
                    {e.degree}
                  </span>
                  <span
                    className="block text-[16px] leading-[22.46px] font-medium text-black/40 xl:absolute xl:left-[199px] xl:top-[var(--y)] xl:w-[322px]"
                    style={{ ["--y" as string]: `${e.top + 28}px` }}
                  >
                    {e.school}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ---- Experience — 5854:51122, 572x1211 at (1223,273) ---- */}
        <Card className="xl:left-[1223px] xl:top-[273px] xl:h-[1211px] xl:w-[572px]">
          <h3 className="text-[20px] leading-[20.62px] font-medium text-black xl:absolute xl:left-[24px] xl:top-[24px]">
            My Experience so far
          </h3>
          <div className="mt-[20px] flex flex-col gap-[28px] xl:mt-0 xl:block">
            {EXPERIENCE.map((x) => (
              <div key={x.company} className="xl:contents">
                <div className="flex items-start gap-[12px] xl:contents">
                  <Image
                    src={`/images/about/${x.logo}`}
                    alt=""
                    width={216}
                    height={216}
                    className="h-[42px] w-[42px] shrink-0 rounded-[8px] object-contain xl:absolute xl:left-[24px] xl:top-[var(--y)]"
                    style={{ ["--y" as string]: `${x.logoTop}px` }}
                  />
                  <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-[12px] xl:contents">
                    <span
                      className="text-[18px] leading-[28.8px] font-medium text-[#0f0f0f] xl:absolute xl:left-[78px] xl:top-[var(--y)]"
                      style={{ ["--y" as string]: `${x.logoTop + 7}px` }}
                    >
                      {x.company}
                    </span>
                    <span
                      className="text-[16px] leading-[28.8px] font-normal text-[#0f0f0f] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:w-[var(--w)] xl:text-right xl:text-[18px]"
                      style={{ ["--y" as string]: `${x.logoTop + 1}px`, ["--x" as string]: `${x.datesLeft}px`, ["--w" as string]: `${x.datesWidth}px` }}
                    >
                      {x.dates}
                    </span>
                  </div>
                </div>
                <p
                  className="mt-[10px] text-[17px] leading-[26px] xl:absolute xl:left-[24px] xl:top-[var(--y)] xl:mt-0 xl:text-[18px] xl:leading-[28.8px]"
                  style={{ ["--y" as string]: `${x.logoTop + 66}px` }}
                >
                  <span className="font-medium text-[#0f0f0f]">{x.role}</span>
                  <span className="font-normal text-[#616161]">{x.mode}</span>
                </p>
                <p
                  className="mt-[6px] text-[16px] leading-[26px] font-normal text-[#616161] xl:absolute xl:left-[24px] xl:top-[var(--y)] xl:mt-0 xl:h-[var(--h)] xl:w-[521px] xl:text-[18px] xl:leading-[28.8px]"
                  style={{ ["--y" as string]: `${x.logoTop + 102}px`, ["--h" as string]: `${x.bodyHeight}px` }}
                >
                  {x.body}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
