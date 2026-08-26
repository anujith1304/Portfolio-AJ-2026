import Image from "@/components/Img";
import { Nav } from "@/components/Nav";
import { StatusBar } from "@/components/StatusBar";

/**
 * Hero — Figma 5841:31961 → 5841:31949 → 5826:24086 "Section - Hero".
 *
 * Outer frame: VERTICAL, gap 10, padding 12/51, justify-end, items-center.
 * Inner "Section - Hero" is 1904x742 with absolutely positioned children,
 * so this mirrors that with a relative container.
 */
export function Hero() {
  return (
    <section className="relative h-[742px] w-[1904px]">
      <div className="absolute inset-0">
        {/* BG_Image:mask-group — 5826:24089 */}
        <Image
          src="/images/hero-bg.png"
          alt=""
          width={1904}
          height={742}
          priority
          className="absolute left-1/2 top-0 h-[742px] w-screen min-w-[1904px] max-w-none -translate-x-1/2 object-cover"
        />

        {/*
          Nav — 5826:26108, 452x54 at (729,35) in the frame.
          Fixed rather than absolute so it stays reachable while scrolling.
          Its x still comes from the Figma coordinate: the 1904 frame is
          centred, so its left edge is `50% - 952px`, and the nav sits 729px
          into it — hence `calc(50% - 223px)`. No JS, and the resting position
          is pixel-identical to the absolute one.
        */}
        <div className="fixed left-[calc(50%-223px)] top-[35px] z-50">
          <Nav />
        </div>

        {/* Heading + buttons — 5826:24092 at (509,207), 885x344, gap 40 */}
        <div className="absolute left-[509px] top-[207px] flex w-[885px] flex-col items-center gap-[40px]">
          {/* 5826:24093 — gap 20 */}
          <div className="flex w-full flex-col items-center gap-[20px]">
            {/*
              5826:24094 — one text node, four styled segments. All Recoleta Alt
              Medium 72/80/-1.28; only the fill opacity changes (50% / 90%).
              The apostrophe is U+0027, per the Figma character codes.
            */}
            <h1 className="type-hero w-[885px] text-center">
              <span className="text-black/50">{"Hello, I\u0027m "}</span>
              <span className="text-black/90">Anujith S</span>
              <br />
              <span className="text-black/50">{"a "}</span>
              <span className="text-black/90">Product Designer</span>
            </h1>
            <p className="w-[887px] type-bio-24 text-center text-black/50">
              I turn ambiguity into intuitive digital products. Through mental
              models,&nbsp; user research and clean interface design, I help
              companies move fast without breaking user trust.
            </p>
          </div>

          {/* 5826:24096 — buttons, HORIZONTAL gap 16 */}
          <div className="flex h-[48px] items-center gap-[16px]">
            <a
              href="#contact"
              className="relative flex h-[48px] w-[164px] items-center justify-center rounded-[14px] bg-[#121212]"
              style={{
                boxShadow:
                  "0px 12px 12px 0px rgba(0,0,0,0.08), 0px 2.75px 2.75px 0px rgba(0,0,0,0.19), 0px 0.72px 0.72px 0px rgba(0,0,0,0.22), inset 0px 10px 18px 0px rgba(255,255,255,0.29), inset 0px 2.29px 4.12px 0px rgba(255,255,255,0.34), inset 0px 0.6px 1.08px 0px rgba(255,255,255,0.35)",
              }}
            >
              <span className="type-btn-18 text-white">
                Reach Out
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-[12px] border border-[#121212]" />
            </a>

            <a
              href="#"
              className="relative flex h-[48px] w-[164px] items-center justify-center rounded-[14px]"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #EBECEE 17%)",
                boxShadow:
                  "inset 0px -12px 16.8px 0px rgba(204,204,204,0.5), inset 0px -2.75px 3.84px 0px rgba(204,204,204,0.5), 0px -0.72px 1.01px 0px rgba(204,204,204,0.5)",
              }}
            >
              <span className="type-btn-16 text-[#252525]">
                View Resume
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-[14px] border border-[#DDDDDD]" />
            </a>
          </div>
        </div>

        {/* Status bar — 5826:24258 at (52,674), 1801x56 */}
        <div className="absolute left-[52px] top-[674px]">
          <StatusBar />
        </div>
      </div>
    </section>
  );
}
