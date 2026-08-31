import Image from "@/components/Img";

/**
 * Testimonials — Figma 5854:51420 "Frame 2147228580".
 * 1107x1448, VERTICAL, gap 48. Sits at x=399 on the page.
 *
 *  - Header  5854:51421: 1107x128, VERTICAL, gap 8.
 *  - Wrapper 5854:51425: 1107x1272, two 536-wide columns 571px apart.
 *
 * The six cards are screenshots of Product Hunt / Twitter / Threads posts —
 * avatars, platform chrome and vector logos — so each column is exported
 * from Figma as one 2x image rather than rebuilt. Column 1's first card sits
 * at (-1,-1), which is why that column is offset by a pixel.
 */
export function Testimonials() {
  return (
    <section className="page-x flex w-full flex-col gap-[28px] xl:w-[1107px] xl:gap-[48px]">
      {/* 5854:51421 */}
      <div className="flex w-full flex-col gap-[8px] xl:w-[1107px]">
        <div className="flex w-full items-center xl:h-[90px] xl:w-[1107px]">
          <h2
            className="type-works-72 flex items-center bg-clip-text text-transparent xl:h-[90px] xl:w-[958px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)",
            }}
          >
            What it&rsquo;s like working with me
          </h2>
        </div>
        {/* 5854:51424 — Circular Std Book 20/29.13 */}
        <p className="type-circ-20 w-full text-[#565656] xl:h-[30px] xl:w-[1107px]">
          Words from those who&rsquo;ve worked alongside me
        </p>
      </div>

      {/* 5854:51425 */}
      {/*
        Two exported columns of testimonial screenshots. Artwork, so they keep
        their proportions: one column on a phone, two from tablet up.
      */}
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:relative xl:block xl:h-[1272px] xl:w-[1107px]">
        <Image
          src="/images/testimonials/col-1.png"
          alt="Testimonials from Product Hunt and Threads"
          width={1074}
          height={2546}
          className="h-auto w-full xl:absolute xl:left-[-1px] xl:top-[-1px] xl:h-[1273px] xl:w-[537px] xl:max-w-none"
        />
        <Image
          src="/images/testimonials/col-2.png"
          alt="Testimonials from Product Hunt and Twitter"
          width={1073}
          height={2395}
          className="h-auto w-full xl:absolute xl:left-[571px] xl:top-0 xl:h-[1197.5px] xl:w-[536.5px] xl:max-w-none"
        />
      </div>
    </section>
  );
}
