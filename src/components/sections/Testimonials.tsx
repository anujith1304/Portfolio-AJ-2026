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

/* Two independent columns, so a long card does not drag its neighbour down. */
const COLUMNS: Card[][] = [
  [
    {
      avatar: "/images/testimonials/avatars/a1.png",
      name: "Roger",
      handle: "@Vitra.ai",
      platform: "x",
      quote:
        "Anujith has a way of taking a half-defined problem and coming back with a flow the whole team can actually build. He asks the awkward questions early — who is this for, what happens when it fails — which saves us weeks further down the line. I have watched him turn a vague one-line brief into a shipped feature more than once.",
    },
    {
      avatar: "/images/testimonials/avatars/a2.png",
      name: "Roger",
      handle: "@Get My Stock",
      role: "Product Marketer",
      platform: "x",
      quote:
        "We gave him a three-month runway for the MVP and he shipped with time to spare. What stood out wasn’t the speed though, it was that he never traded away the research to get there. Every screen he handed over had a reason behind it, and he could tell you what that reason was. When we questioned a decision, he had the interview notes ready.",
    },
    {
      avatar: "/images/testimonials/avatars/a3.png",
      name: "Roger",
      handle: "@Vitra.ai",
      platform: "threads",
      quote:
        "He built our component library from nothing while the product was still moving underneath him. Half the reason our releases got faster is that engineers stopped guessing at spacing and states — it was all there, documented, with the edge cases already thought through. He also sits with the engineers rather than throwing files over the wall, which is rarer than it should be. Months on, that system is still what we onboard new designers into, and it has survived two redesigns of the product without needing to be rebuilt — which tells you how carefully the foundations were laid in the first place.",
    },
  ],
  [
    {
      avatar: "/images/testimonials/avatars/a4.png",
      name: "Roger",
      handle: "@Get My Stock",
      role: "Founder",
      platform: "x",
      quote:
        "Anujith was the first designer we hired and he behaved like a founder about it. He ran the interviews, made the calls, and pushed back on us when the business idea and the user need didn’t line up. The product we launched is his, and the usability numbers we put in front of investors came out of his testing.",
    },
    {
      avatar: "/images/testimonials/avatars/a5.png",
      name: "Roger",
      handle: "@Vitra.ai",
      platform: "x",
      quote:
        "Our product is genuinely hard to design for — dense data, AI output that isn’t always predictable, and enterprise users with no patience for a learning curve. Anujith is good at finding the simple spine inside all of that. He’ll take a workflow with fourteen states and make it feel like three, without hiding anything the user actually needs to see. That is the part most designers get wrong here.",
    },
    {
      avatar: "/images/testimonials/avatars/a6.png",
      name: "Roger",
      handle: "@Vitra.ai",
      platform: "x",
      quote:
        "Deadlines don’t rattle him. He scopes honestly up front, flags early when something is going to slip rather than on the day it does, and ships the version that works instead of the version that is perfect. Easy to plan around, and he holds the same standard when the timeline gets tight.",
    },
  ],
];

function Testimonial({ c }: { c: Card }) {
  return (
    <figure className="rounded-[18px] border border-black/4 bg-white px-[20px] py-[22px] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_10px_28px_rgba(16,24,40,0.05)] xl:rounded-[calc(24*var(--u))] xl:px-[calc(28*var(--u))] xl:py-[calc(30*var(--u))]">
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
            className="flex flex-col gap-[16px] xl:gap-[calc(44*var(--u))]"
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
