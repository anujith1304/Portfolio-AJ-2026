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
/*
 * Sits inline at the end of the address, which is display type in the current
 * footer, so it scales with the line rather than sitting on a fixed offset.
 * No absolute positioning: it followed a coordinate in the previous layout and
 * ended up in the corner when the address moved.
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
      className="relative ml-[10px] inline-flex h-[0.32em] w-[0.32em] min-h-[18px] min-w-[18px] shrink-0 translate-y-[-0.06em] cursor-pointer items-center justify-center opacity-45 transition-opacity hover:opacity-90"
    >
      <Image
        src="/images/footer/copy.svg"
        alt=""
        width={20}
        height={20}
        className="h-full w-full"
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-[12px] leading-[18px] font-medium text-black/50 transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied
      </span>
    </button>
  );
}
