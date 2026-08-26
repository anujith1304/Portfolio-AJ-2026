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
    <section className="flex w-[1107px] flex-col gap-[48px]">
      {/* 5854:51421 */}
      <div className="flex w-[1107px] flex-col gap-[8px]">
        <div className="flex h-[90px] w-[1107px] items-center">
          <h2
            className="type-works-72 flex h-[90px] w-[958px] items-center bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.04) 100%)",
            }}
          >
            What it&rsquo;s like working with me
          </h2>
        </div>
        {/* 5854:51424 — Circular Std Book 20/29.13 */}
        <p className="type-circ-20 h-[30px] w-[1107px] text-[#565656]">
          Words from those who&rsquo;ve worked alongside me
        </p>
      </div>

      {/* 5854:51425 */}
      <div className="relative h-[1272px] w-[1107px]">
        <Image
          src="/images/testimonials/col-1.png"
          alt="Testimonials from Product Hunt and Threads"
          width={1074}
          height={2546}
          className="absolute left-[-1px] top-[-1px] h-[1273px] w-[537px] max-w-none"
        />
        <Image
          src="/images/testimonials/col-2.png"
          alt="Testimonials from Product Hunt and Twitter"
          width={1073}
          height={2395}
          className="absolute left-[571px] top-0 h-[1197.5px] w-[536.5px] max-w-none"
        />
      </div>
    </section>
  );
}
