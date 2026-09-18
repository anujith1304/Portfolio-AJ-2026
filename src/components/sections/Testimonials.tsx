import Image from "@/components/Img";

/**
 * Testimonials — Figma 5854:51420 "Frame 2147228580".
 * 1107 wide, two 536-wide columns 571px apart (so a 35px gutter). Sits at
 * x=399 on the page.
 *
 * The cards were previously two exported column images with the copy baked
 * into them, which meant the words could not be edited and scaled with the
 * picture rather than with the reader. They are rebuilt here as markup; the
 * avatars and the platform discs are cropped straight out of those exports, so
 * the people, their handles and the card design are unchanged and only the
 * quotes are new. Colours are sampled from the same artwork: name #061236,
 * handle #848ba1, quote #4a4a4a.
 */
type Card = {
  avatar: string;
  name: string;
  handle: string;
  /** Second half of the byline, after the divider. Not every card has one. */
  role?: string;
  platform: "x" | "threads";
  quote: string;
};

const BADGE = {
  x: "/images/testimonials/badge-x.png",
  threads: "/images/testimonials/badge-threads.png",
} as const;

/*
 * Two independent columns, so a long card does not drag its neighbour down.
 *
 * This block has to hold its designed 1272 height: the footer backdrop and its
 * gradient are absolutely positioned at the footer's Figma top rather than
 * flowing with it, so a section that comes up short detaches the footer from
 * its own artwork. Dheeraj's testimonial is long enough that the second column
 * now sets that height, which lets the gap go back to the artwork's own 44;
 * the card padding carries the small remainder at 38 against a designed 30.
 */
const COLUMNS: Card[][] = [
  [
    {
      avatar: "/images/testimonials/avatars/a1.png",
      name: "Roger",
      handle: "@Vitra.ai",
      platform: "x",
      quote:
        "Anujith spoiled me a little. I’d hand him a one-line brief and he’d come back with the questions I should’ve asked myself. Who’s actually using this? What do they see when the model returns nothing? By the time we got to real screens, most of the arguments we’d normally have were already settled.",
    },
    {
      avatar: "/images/testimonials/avatars/a2.png",
      name: "Roger",
      handle: "@Get My Stock",
      role: "Product Marketer",
      platform: "x",
      quote:
        "Three months for the whole MVP and he still made time to talk to users. I kept waiting for the part where we cut the research to hit the date, and it never came. When I asked why a screen worked the way it did, he’d pull up the actual interview where someone got stuck. Made my job a lot easier.",
    },
    {
      avatar: "/images/testimonials/avatars/a3.png",
      name: "SriBalaji",
      handle: "@Vitra.ai",
      role: "Senior Software Engineer",
      platform: "threads",
      /* SriBalaji's own words, kept verbatim. */
      quote:
        "Anujith is a talented Product designer who brings a strong understanding of users and product requirements to his work. He has a great eye for detail and creates simple, intuitive experiences. I especially appreciate how he works closely with the engineering team and takes the time to compare the implementation with the prototype to catch UI gaps and inconsistencies. He takes ownership of his work and always cares about delivering a polished final experience. He is a great collaborator and a valuable part of the team.",
    },
  ],
  [
    {
      avatar: "/images/testimonials/avatars/a4.png",
      name: "Dheeraj",
      handle: "@Get My Stock",
      role: "Founder",
      platform: "x",
      /* Dheeraj's own words, kept verbatim. */
      quote:
        "I worked closely with Anujith during the early days of the company, where he was our founding designer. Building a product from the ground up comes with a lot of ambiguity, and I was always impressed by how he handled it. He could take a complicated problem, understand what actually mattered to the user, and turn it into an experience that felt simple and intentional. He also worked incredibly well with engineering — he was open to feedback, understood technical constraints, and cared about how the design actually came to life. Anujith didn’t just design our product; he played a big part in shaping the product itself.",
    },
    {
      avatar: "/images/testimonials/avatars/a5.png",
      name: "Roger",
      handle: "@Vitra.ai",
      platform: "x",
      quote:
        "Our product is a nightmare to design for. Dense data, AI output you can’t fully predict, and enterprise users who won’t sit through a tutorial. Anujith finds the spine in it. He took the dubbing flow from something like fourteen states down to feeling like three, and didn’t hide anything people needed along the way.",
    },
    {
      avatar: "/images/testimonials/avatars/a6.png",
      name: "Roger",
      handle: "@Vitra.ai",
      platform: "x",
      quote:
        "The thing I’d tell anyone hiring him is that he tells you early. If something’s going to slip you hear it that week, not the morning it’s due. He scopes honestly, ships the version that works instead of the perfect one, and doesn’t go quiet when it gets tight.",
    },
  ],
];

function Testimonial({ c }: { c: Card }) {
  return (
    <figure className="rounded-[18px] border border-black/4 bg-white px-[20px] py-[22px] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_10px_28px_rgba(16,24,40,0.05)] xl:rounded-[calc(24*var(--u))] xl:px-[calc(28*var(--u))] xl:py-[calc(38*var(--u))]">
      <figcaption className="flex items-center gap-[11px] xl:gap-[calc(15*var(--u))]">
        {/*
          Cropped from the original export, so each still carries its verified
          star and the white card ground behind it — no mask needed.
        */}
        <Image
          src={c.avatar}
          alt=""
          width={122}
          height={122}
          className="h-[50px] w-[50px] shrink-0 xl:h-[calc(61*var(--u))] xl:w-[calc(61*var(--u))]"
        />
        <div className="min-w-0 flex-1">
          <p className="font-circular text-[17px] leading-[1.3] font-medium text-[#061236] xl:text-[calc(20*var(--u))] xl:leading-[calc(26*var(--u))]">
            {c.name}
          </p>
          <p className="font-circular text-[14px] leading-[1.35] text-[#848ba1] xl:text-[calc(18*var(--u))] xl:leading-[calc(24*var(--u))]">
            {c.handle}
            {c.role ? (
              <>
                <span className="px-[6px] text-black/15">|</span>
                {c.role}
              </>
            ) : null}
          </p>
        </div>
        <Image
          src={BADGE[c.platform]}
          alt={c.platform === "x" ? "Posted on X" : "Posted on Threads"}
          width={94}
          height={94}
          className="h-[32px] w-[32px] shrink-0 xl:h-[calc(44*var(--u))] xl:w-[calc(44*var(--u))]"
        />
      </figcaption>

      <blockquote className="mt-[16px] font-circular text-[15px] leading-[1.6] text-[#4a4a4a] xl:mt-[calc(24*var(--u))] xl:text-[calc(20*var(--u))] xl:leading-[calc(29*var(--u))]">
        {c.quote}
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="page-x flex w-full flex-col gap-[28px] xl:w-[calc(1107*var(--u))] xl:gap-[calc(48*var(--u))]">
      {/* 5854:51421 */}
      <div className="flex w-full flex-col gap-[8px] xl:w-[calc(1107*var(--u))] xl:gap-[calc(8*var(--u))]">
        <div className="flex w-full items-center xl:h-[calc(90*var(--u))] xl:w-[calc(1107*var(--u))]">
          <h2
            className="type-works-72 flex items-center bg-clip-text text-transparent xl:h-[calc(90*var(--u))] xl:w-[calc(958*var(--u))]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)",
            }}
          >
            What it&rsquo;s like working with me
          </h2>
        </div>
        {/* 5854:51424 — Circular Std Book 20/29.13 */}
        <p className="type-circ-20 w-full text-[#565656] xl:h-[calc(30*var(--u))] xl:w-[calc(1107*var(--u))]">
          Words from those who&rsquo;ve worked alongside me
        </p>
      </div>

      {/* 5854:51425 — one column on a phone, two from tablet up. */}
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:w-[calc(1107*var(--u))] xl:gap-[calc(35*var(--u))]">
        {COLUMNS.map((col, i) => (
          <div
            key={i}
            className="flex flex-col gap-[18px] xl:gap-[calc(44*var(--u))]"
          >
            {col.map((c, j) => (
              <Testimonial key={j} c={c} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
