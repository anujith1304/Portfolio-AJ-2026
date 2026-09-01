import type { Metadata } from "next";
import { satoshi, figtree, recoleta, circular } from "./fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

/*
  `shadcn init` adds `Geist` bound to --font-sans. That token is what every
  .type-* utility resolves to, so leaving it in place silently renders all
  Satoshi copy as Geist. Satoshi owns --font-sans here; Geist is not used.
*/

export const metadata: Metadata = {
  title: "Anujith S — Product Designer",
  description:
    "I turn ambiguity into intuitive digital products. Through mental models, user research and clean interface design, I help companies move fast without breaking user trust.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        satoshi.variable,
        figtree.variable,
        recoleta.variable,
        circular.variable,
        "font-sans",
      )}
    >
      <body>
        {/*
          Corrects --u to the layout width.

          The CSS fallback derives it from 100vw, which includes the classic
          scrollbar — so on Windows and Linux the canvas came out ~15px wider
          than the space it had and lost that much of its right margin to the
          overflow clip. clientWidth is the width the layout actually gets.

          Runs before the rest of the body parses, and re-runs from a
          ResizeObserver on the root — the vertical scrollbar appears only once
          content has loaded, and its arrival narrows clientWidth without
          firing a resize event. The last value is remembered so writing it back
          cannot loop the observer.

          The CSS value stands if scripting is off: exact on overlay-scrollbar
          platforms, ~0.8% wide elsewhere.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement,p='';" +
              "function u(){var v=(Math.min(d.clientWidth,1905)/1905)+'px';" +
              "if(v!==p){p=v;d.style.setProperty('--u',v)}}" +
              "u();addEventListener('resize',u,{passive:true});" +
              "if(window.ResizeObserver)new ResizeObserver(u).observe(d)})()",
          }}
        />
        {children}
      </body>
    </html>
  );
}
