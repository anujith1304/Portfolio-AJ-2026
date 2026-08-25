import Image from "next/image";
import { Nav } from "@/components/Nav";
import { StatusBar } from "@/components/StatusBar";
import { displayFontStack } from "@/app/fonts";

/**
 * Hero — Figma 5841:31961 → 5841:31949 → 5826:24086 "Section - Hero".
 *
 * Outer frame: VERTICAL, gap 10, padding 12/51, justify-end, items-center.
 * Inner "Section - Hero" is 1904x742 with absolutely positioned children,
 * so this mirrors that with a relative container.
 */
export function Hero() {
  return (
    <section className="flex w-[1905px] flex-col items-center justify-end gap-[10px] px-[51px] py-[12px]">
      <div className="relative h-[742px] w-[1904px]">
        {/* BG_Image:mask-group — 5826:24089 */}
        <Image
          src="/images/hero-bg.png"
          alt=""
          width={1904}
          height={742}
          priority
          className="absolute inset-0 h-[742px] w-[1904px] object-cover"
        />

        {/* Nav — 5826:26108, absolute at (729,35), 452x54 */}
        <div className="absolute left-[729px] top-[35px]">
          <Nav />
        </div>

        {/* Heading + buttons — 5826:24092 at (509,207), 885x344, gap 40 */}
        <div className="absolute left-[509px] top-[207px] flex w-[885px] flex-col items-center gap-[40px]">
          {/* 5826:24093 — gap 20 */}
          <div className="flex w-full flex-col items-center gap-[20px]">
            <h1
              className="w-[885px] text-center text-[72px] font-medium leading-[80px] tracking-[-1.28px] whitespace-pre-line"
              style={{ fontFamily: displayFontStack }}
            >
              {"Hello, I’m Anujith S\na Product Designer"}
            </h1>
            <p className="w-[887px] text-center text-[24px] font-medium leading-[32px] tracking-[-0.36px] text-black/50">
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
              <span className="text-[18px] font-medium leading-[20px] text-white">
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
              <span className="text-[16px] font-bold leading-[29.7px] text-[#252525]">
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
