"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_SURFACE_STYLE } from "@/components/Nav";
import { canvasSurface } from "@/lib/canvas";
import { GATE_HASH, GATE_KEY, GATE_SALT } from "@/lib/gate";

/**
 * The password screen over the site.
 *
 * What this is: a curtain. The site is a static export with no server, so by
 * the time this runs the browser has already been handed every page, every
 * bundle and every asset. `curl` never meets it. Anyone who opens devtools,
 * turns off JavaScript's effect on the stored flag, or requests a file by URL
 * gets the content. It keeps a passer-by out; it does not keep anyone out.
 *
 * Which way round the showing works matters. Locking is done in CSS off a
 * `data-unlocked` attribute on <html>, not by conditional rendering here, for
 * two reasons: the inline script in the layout sets that attribute before the
 * body paints, so a returning visitor never sees the lock screen flash; and
 * with scripting off the attribute is never set, so the page stays hidden
 * rather than falling open. `display:none` is what hides it, which also takes
 * the content out of the accessibility tree — no `inert` juggling needed.
 *
 * The password is compared as a salted SHA-256 so the repo holds no plaintext.
 * That is hygiene, not strength: these values are public and a short password
 * falls out of them immediately.
 */
export function PasswordGate() {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  /* Focus the field on a cold load, but not over a returning visitor's page. */
  useEffect(() => {
    if (document.documentElement.dataset.unlocked !== "1") input.current?.focus();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setWrong(false);

    const bytes = new TextEncoder().encode(GATE_SALT + value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hex = [...new Uint8Array(digest)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (hex === GATE_HASH) {
      try {
        localStorage.setItem(GATE_KEY, "1");
      } catch {
        /* Private mode can refuse; the visit still unlocks, it just won't stick. */
      }
      document.documentElement.dataset.unlocked = "1";
      return;
    }

    setWrong(true);
    setBusy(false);
    setValue("");
    input.current?.focus();
  }

  return (
    <div
      data-gate-overlay
      className="fixed inset-0 z-[100] flex items-center justify-center px-[20px]"
      style={canvasSurface}
    >
      <div
        className="w-full max-w-[420px] rounded-[20px] bg-white px-[28px] py-[32px]"
        style={NAV_SURFACE_STYLE}
      >
        <h1 className="font-display text-[28px] leading-[1.2] font-medium text-[#061236]">
          Anujith S
        </h1>
        <p className="mt-[8px] font-circular text-[15px] leading-[1.55] text-[#565656]">
          This portfolio is private. Enter the password to view it.
        </p>

        <form onSubmit={submit} className="mt-[22px]">
          <label htmlFor="gate-password" className="sr-only">
            Password
          </label>
          <input
            ref={input}
            id="gate-password"
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setWrong(false);
            }}
            autoComplete="current-password"
            aria-invalid={wrong}
            aria-describedby={wrong ? "gate-error" : undefined}
            className={`w-full rounded-[12px] border bg-white px-[14px] py-[12px] font-circular text-[16px] text-[#061236] outline-none transition-colors placeholder:text-black/35 ${
              wrong
                ? "border-[#d64545] focus:border-[#d64545]"
                : "border-black/10 focus:border-black/35"
            }`}
            placeholder="Password"
          />

          {/* Announced when it appears, so it is not silent for a screen reader. */}
          <p
            id="gate-error"
            role="alert"
            className={`mt-[8px] font-circular text-[13px] leading-[1.4] text-[#d64545] ${
              wrong ? "" : "invisible"
            }`}
          >
            That password isn&rsquo;t right.
          </p>

          <button
            type="submit"
            disabled={busy || value.length === 0}
            className="mt-[6px] w-full cursor-pointer rounded-[12px] bg-[#061236] px-[14px] py-[12px] font-circular text-[15px] text-white transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-40"
          >
            {busy ? "Checking…" : "View portfolio"}
          </button>
        </form>
      </div>

      {/*
        Scripting off means the attribute below never gets set and the site
        stays hidden — correct, but silent without this.
      */}
      <noscript>
        <p className="mt-[16px] text-center font-circular text-[13px] text-[#565656]">
          This page needs JavaScript enabled.
        </p>
      </noscript>
    </div>
  );
}
