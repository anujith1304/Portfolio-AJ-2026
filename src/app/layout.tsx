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
      <body>{children}</body>
    </html>
  );
}
