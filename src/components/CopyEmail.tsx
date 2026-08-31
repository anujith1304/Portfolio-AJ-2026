"use client";

import Image from "@/components/Img";
import { useState } from "react";

/**
 * Copy control beside the footer email — Figma 5854:51589 "Copy",
 * a 20x20 instance at (938,412) within the footer frame.
 *
 * Figma also carries a "Copy Email" tooltip (5854:51610) at opacity 0, i.e.
 * a hover state, so the label here is exposed as the accessible name and as a
 * short confirmation after copying rather than as always-visible text.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked (insecure origin or denied) — leave the label alone */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email"}
      className="relative h-[20px] w-[20px] shrink-0 cursor-pointer opacity-60 transition-opacity hover:opacity-100 xl:absolute xl:left-[938px] xl:top-[412px]"
    >
      <Image
        src="/images/footer/copy.svg"
        alt=""
        width={20}
        height={20}
        className="h-[20px] w-[20px]"
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-[26px] top-[1px] whitespace-nowrap text-[12px] leading-[18px] text-black/50 transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied
      </span>
    </button>
  );
}
