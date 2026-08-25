import type { Metadata } from "next";
import { satoshi, figtree } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anujith S — Product Designer",
  description:
    "I turn ambiguity into intuitive digital products. Through mental models, user research and clean interface design, I help companies move fast without breaking user trust.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
