import type { Metadata } from "next";
import { CaseBody } from "./CaseBody";

export const metadata: Metadata = {
  title: "Translate.video Product Rethink — Case Study | Anujith S",
  description:
    "Rethinking an AI video localization product at Vitra.AI — dashboard, upload, editor, text-to-speech, timeline and export, from problem framing to the redesigned product.",
};

export default function TranslateVideoCaseStudy() {
  return <CaseBody />;
}
