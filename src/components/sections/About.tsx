import Image from "next/image";
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
 */

const GRADIENT =
  "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)";

const EDUCATION = [
  {
    years: "2022 — 2024",
    degree: "Master of Computer Application",
    school: "Acharya Institues, Bangalore",
    top: 97,
  },
  {
    years: "2019 — 2022",
    degree: "Bachelor of Computer Science",
    school: "South Travancore Hindu College, Nagercoil",
    top: 168,
  },
];

const EXPERIENCE = [
  {
    logo: "logo-vitra.png",
    company: "Vitra.AI",
    dates: "Apr 2025 - Present",
    datesLeft: 1616,
    datesWidth: 154,
    role: "UX/UI Designer - ",
    mode: "On site",
    body: "DesignLed end-to-end UX across 4 AI products at a B2B content translation platform, designing scalable interfaces for enterprise users from concept to launch. Drove product adoption from 2% to 18% in two quarters by identifying and resolving 8+ critical usability gaps through research and testing.",
    logoTop: 361,
    bodyHeight: 144,
  },
  {
    logo: "logo-gms.png",
    company: "Get My Strock",
    dates: "Oct 2024 - Mar 2025",
    datesLeft: 1597,
    datesWidth: 174,
    role: "Founding Product Designer - ",
    mode: "Hybrid",
    body: "Led end-to-end design of a B2B stock management app from 0 to 1, shipping the MVP in 3 months with a 92% usability success rate. Ran 15+ user interviews and 3 rounds of testing across 20+ iterations, while partnering with engineering to cut post-launch design bugs by 30%.",
    logoTop: 656,
    bodyHeight: 143,
  },
  {
    logo: "logo-parkqwik.png",
    company: "Parkqwik",
    dates: "Jul 2024 - Sep 2024",
    datesLeft: 1597,
    datesWidth: 174,
    role: "Product Designer Intern - ",
    mode: "Remote",
    body: "Collaborated with the design team on live product projects while independently conceptualising and delivering a website redesign that was selected and shipped. Redesigned the core application to improve performance and ease of use, and contributed to UI improvements across the product backed by user research.",
    logoTop: 950,
    bodyHeight: 143,
  },
  {
    logo: "logo-freelance.png",
    company: "Freelance Product Designer",
    dates: "Apr 2024 - Present",
    datesLeft: 1615,
    datesWidth: 156,
    role: "Product Designer - ",
    mode: "Remote",
    body: "Design and improve end-to-end user experiences for a range of digital products, crafting interfaces that balance usability, accessibility, and visual appeal. Work closely with stakeholders to understand user needs, translate them into intuitive designs",
    logoTop: 1244,
    bodyHeight: 114,
  },
];

const JAMS = [1014, 1109, 1202, 1296, 1390];

export function About() {
  return (
    <section id="about" className="flex w-[1808px] flex-col gap-[24px]">
      {/* 5854:50991 */}
      <div className="flex h-[90px] w-[1808px] items-center">
        <h2
          className="type-works-72 flex h-[90px] w-[911px] items-center bg-clip-text text-transparent"
          style={{ backgroundImage: GRADIENT }}
        >
          What I&rsquo;m about
        </h2>
      </div>

      {/* 5854:50993 */}
      <div className="relative h-[1500px] w-[1808px]">
        {/* ---- Bio card — 5854:50994, 563x301 at (13,21) ---- */}
        <div className="absolute left-[13px] top-[21px] h-[301px] w-[563px] rounded-[20px] border border-hairline bg-white" />
        <p className="type-lead-28 absolute left-[32px] top-[60px] w-[522px] text-[#616161]">
          Product Designer with 2+years of experience, focused on creating
          functional and user-centered digital products with visually stunning
          designs.
        </p>
        <Image
          src="/images/about/social-links.png"
          alt="Copy email, LinkedIn, Dribbble, Twitter"
          width={725}
          height={147}
          className="absolute left-[34px] top-[265px] h-[37px] w-[181px]"
        />
        <a
          href="#"
          className="absolute left-[445px] top-[264px] flex h-[38px] w-[111px] items-center justify-center rounded-[57px] bg-black/4"
        >
          <span className="font-figtree text-[16.04px] leading-[16.04px] font-medium text-black">
            Resume
          </span>
        </a>

        {/* ---- "Good design is balanced." — 5854:51092, 563x572 at (13,346) ---- */}
        <div className="absolute left-[13px] top-[346px] h-[572px] w-[563px] rounded-[20px] border border-hairline bg-white" />
        {/*
          5854:51095 is a MIXED-fill text node, not one gradient:
            "Good design is" -> SOLID #000000 at full opacity
            "balanced."      -> linear gradient black@41% -> black@15%
          Painting the section-heading gradient (50% -> 4%) across both, as
          this previously did, washed the first line out to near-invisible.
        */}
        <h3 className="type-quote-72 absolute left-[37px] top-[370px] w-[515px]">
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
        <p className="absolute left-[37px] top-[540px] w-[485px] text-[14px] leading-[20px] text-[#6b6b6b]">
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
          className="absolute left-[120px] top-[612px] h-[269px] w-[348px] rounded-[20px] object-contain"
        />

        {/* ---- Favorite Jams — border 5854:51099, 563x542 at (13,942) ---- */}
        <div className="absolute left-[13px] top-[942px] h-[542px] w-[563px] rounded-[20px] border border-hairline bg-white" />
        <h3 className="absolute left-[29px] top-[966px] text-[20px] leading-[18px] font-medium text-black">
          Jams I Keep Coming Back To
        </h3>
        {JAMS.map((top, i) => (
          <Image
            key={top}
            src={`/images/about/jam-${i + 1}.png`}
            alt=""
            width={1078}
            height={164}
            className="absolute left-[25px] h-[82px] w-[539px]"
            style={{ top }}
          />
        ))}

        {/* ---- Column 2 — exports carry 4px shadow spill a side ---- */}
        <Image
          src="/images/about/profile.png"
          alt="Hey, Anujith here"
          width={1214}
          height={1151}
          className="absolute left-[596px] top-[17px] h-[575.5px] w-[607px] max-w-none"
        />
        <Image
          src="/images/about/design-stack.png"
          alt="Design stack"
          width={1214}
          height={544}
          className="absolute left-[596px] top-[608px] h-[272px] w-[607px] max-w-none"
        />
        {/*
          5854:51257 — a Photos component instance, not a still. Ten variants
          with an AFTER_TIMEOUT of 3s between them, each carrying its own
          caption, plus a pagination rail. Rendered as a live carousel.
        */}
        <PhotoCarousel className="absolute left-[600px] top-[900px] h-[584px] w-[599px]" />

        {/* ---- Education — 5854:51100, 572x228 at (1223,21) ---- */}
        <div className="absolute left-[1223px] top-[21px] h-[228px] w-[572px] rounded-[20px] border border-hairline bg-white" />
        <h3 className="absolute left-[1255px] top-[53px] text-[20px] leading-[20.62px] font-medium text-black">
          Education
        </h3>
        {EDUCATION.map((e) => (
          <div key={e.years}>
            <span
              className="absolute left-[1255px] text-[18px] leading-[25.66px] font-normal text-black"
              style={{ top: e.top }}
            >
              {e.years}
            </span>
            <span
              className="absolute left-[1422px] w-[322px] text-[18px] leading-[22.46px] font-medium text-black"
              style={{ top: e.top }}
            >
              {e.degree}
            </span>
            <span
              className="absolute left-[1422px] w-[322px] text-[16px] leading-[22.46px] font-medium text-black/40"
              style={{ top: e.top + 28 }}
            >
              {e.school}
            </span>
          </div>
        ))}

        {/* ---- Experience — 5854:51122, 572x1211 at (1223,273) ---- */}
        <div className="absolute left-[1223px] top-[273px] h-[1211px] w-[572px] rounded-[20px] border border-hairline bg-white" />
        <h3 className="absolute left-[1247px] top-[297px] text-[20px] leading-[20.62px] font-medium text-black">
          My Experience so far
        </h3>
        {EXPERIENCE.map((x) => (
          <div key={x.company}>
            <Image
              src={`/images/about/${x.logo}`}
              alt=""
              width={216}
              height={216}
              className="absolute left-[1247px] h-[42px] w-[42px] rounded-[8px] object-contain"
              style={{ top: x.logoTop }}
            />
            <span
              className="absolute left-[1301px] text-[18px] leading-[28.8px] font-medium text-[#0f0f0f]"
              style={{ top: x.logoTop + 7 }}
            >
              {x.company}
            </span>
            <span
              className="absolute text-right text-[18px] leading-[28.8px] font-normal text-[#0f0f0f]"
              style={{ top: x.logoTop + 1, left: x.datesLeft, width: x.datesWidth }}
            >
              {x.dates}
            </span>
            <p
              className="absolute left-[1247px] text-[18px] leading-[28.8px]"
              style={{ top: x.logoTop + 66 }}
            >
              <span className="font-medium text-[#0f0f0f]">{x.role}</span>
              <span className="font-normal text-[#616161]">{x.mode}</span>
            </p>
            <p
              className="absolute left-[1247px] w-[521px] text-[18px] leading-[28.8px] font-normal text-[#616161]"
              style={{ top: x.logoTop + 102, height: x.bodyHeight }}
            >
              {x.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
