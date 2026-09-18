"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "@/components/Img";
import { NAV_SURFACE_STYLE } from "@/components/Nav";

/**
 * The jams list, and the player it opens.
 *
 * Each row is a flat export with the play button drawn into the bitmap, so the
 * control is a transparent hotspot sitting on that disc rather than markup that
 * replaces it. The disc measures identically in all five files — x 993-1050 of
 * 1078, y 83-140 of 164 — which is where the percentages below come from. The
 * hotspot is allowed to grow past the disc on small screens, because 57px of a
 * 1078-wide export is only about 16 real pixels on a phone and that is far
 * under a usable touch target.
 *
 * Playback is a Spotify embed. These are commercial recordings, so the audio
 * cannot be hosted here; the embed is the licensed way to play them.
 *
 * Worth knowing: Spotify serves a 30-second preview to anyone not logged in,
 * and swaps the player for a "Get Spotify" panel once that preview runs out.
 * Anyone logged in hears the whole track. Nothing here can change that.
 *
 * The iFrame API is loaded so that pressing a row's play button actually starts
 * the track, rather than only revealing a player that still has to be pressed.
 * If it fails to arrive the component falls back to a plain embed, which shows
 * the right track and plays on its own button.
 *
 * Track ids were each checked against Spotify's oembed endpoint and the titles
 * it returned match the rows.
 */
type Track = { title: string; artist: string; id: string };

const TRACKS: Track[] = [
  { title: "Saagara", artist: "Sumedh K", id: "7ks8EfGw4AUHf5f8ewctqo" },
  { title: "Mockingbird", artist: "Eminem", id: "1LSuKQcuBZeDK27szSRZW7" },
  {
    title: "Sapta Sagaradaache Ello",
    artist: "Charanraj MR",
    id: "5GLFyqAmbNRSh0or6QJV1d",
  },
  {
    title: "Young & Beautiful",
    artist: "Lana Del Rey",
    id: "2nMeu6UenVvwUktBCpLMK9",
  },
  { title: "June Ponal", artist: "Krishh", id: "6S6DFMfhwIZYHUffVzuWOI" },
];

/*
 * Spotify has two embed sizes, not a range: ask for anything between 80 and
 * 152 and it still draws the 80px card and leaves the remainder blank. The
 * compact one is used here because the tall one spends its extra height on a
 * larger sleeve and a "Save on Spotify" row rather than on controls, and at
 * 152 the dock stood three times the nav's height with the nav's 66px radius,
 * which stops reading as a pill and starts reading as a blob.
 */
const EMBED_H = 80;

/* The play disc, as a share of the export it is drawn in. */
const DISC = {
  left: `${(993 / 1078) * 100}%`,
  top: `${(83 / 164) * 100}%`,
  width: `${(57 / 1078) * 100}%`,
  height: `${(57 / 164) * 100}%`,
};

type Controller = {
  loadUri: (uri: string) => void;
  play: () => void;
  destroy: () => void;
  addListener: (event: string, cb: () => void) => void;
};
type SpotifyApi = {
  createController: (
    el: HTMLElement,
    opts: { uri: string; width: string | number; height: string | number },
    cb: (c: Controller) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyApi) => void;
  }
}

export function Jams({ tops }: { tops: number[] }) {
  const [active, setActive] = useState<number | null>(null);
  /* Set when the API never arrives, so the player still works as a plain embed. */
  const [plain, setPlain] = useState(false);

  /* State, not a ref, because the controller can only be built once the dock
     has rendered — so the API's arrival has to re-run an effect. */
  const [apiReady, setApiReady] = useState(false);

  const host = useRef<HTMLDivElement | null>(null);
  const api = useRef<SpotifyApi | null>(null);
  const controller = useRef<Controller | null>(null);
  const wanted = useRef<string | null>(null);

  const start = useCallback((id: string) => {
    wanted.current = `spotify:track:${id}`;
    if (controller.current) {
      controller.current.loadUri(wanted.current);
      /* loadUri does not resume on its own; the embed needs a beat to swap. */
      window.setTimeout(() => controller.current?.play(), 400);
    }
    /* With no controller yet there is nothing to build it in: the dock, and
       the host element inside it, only mount on the render after this click.
       The effect below picks the request up once that host exists. */
  }, []);

  /* Load the API the first time a track is asked for, not on page load. */
  useEffect(() => {
    if (active === null || apiReady || plain) return;

    let cancelled = false;
    const give_up = window.setTimeout(() => {
      if (!cancelled) setPlain(true);
    }, 6000);

    if (!document.getElementById("spotify-iframe-api")) {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        api.current = IFrameAPI;
        setApiReady(true);
      };
      const s = document.createElement("script");
      s.id = "spotify-iframe-api";
      s.src = "https://open.spotify.com/embed/iframe-api/v1";
      s.async = true;
      s.onerror = () => setPlain(true);
      document.body.appendChild(s);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(give_up);
    };
  }, [active, apiReady, plain]);

  /*
   * Build the embed once both halves exist: the API, and the host element that
   * is only mounted while the dock is open. Closing destroys the controller,
   * so this has to run again on the next open — that reopen is what used to
   * leave an empty pill, the click handler finding no host to build in and the
   * API-loading effect having already done its one job.
   */
  useEffect(() => {
    if (active === null || plain) return;
    if (controller.current || !api.current || !host.current) return;
    const uri = wanted.current ?? `spotify:track:${TRACKS[active].id}`;

    api.current.createController(
      host.current,
      { uri, width: "100%", height: EMBED_H },
      (c) => {
        controller.current = c;
        c.addListener("ready", () => c.play());
      },
    );
  }, [active, apiReady, plain]);

  const close = useCallback(() => {
    controller.current?.destroy();
    controller.current = null;
    wanted.current = null;
    setActive(null);
  }, []);

  /* Escape closes it, as it does the nav's own menu. */
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close]);

  const track = active === null ? null : TRACKS[active];

  return (
    <>
      <div className="mt-[16px] flex flex-col gap-[10px] xl:mt-0 xl:block xl:gap-[calc(10*var(--u))]">
        {tops.map((top, i) => (
          <div
            key={top}
            className="relative xl:absolute xl:left-[calc(12*var(--u))] xl:top-[var(--y)] xl:h-[calc(82*var(--u))] xl:w-[calc(539*var(--u))]"
            style={{ ["--y" as string]: `calc(${top}*var(--u))` }}
          >
            <Image
              src={`/images/about/jam-${i + 1}.png`}
              alt=""
              width={1078}
              height={164}
              className="h-auto w-full xl:h-full xl:w-full"
            />
            {/* The hotspot box sits exactly on the disc; the button inside it
                is centred there but never smaller than a touch target. */}
            <span className="absolute" style={DISC}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  start(TRACKS[i].id);
                }}
                aria-label={`Play ${TRACKS[i].title} by ${TRACKS[i].artist} on Spotify`}
                className="absolute top-1/2 left-1/2 h-full max-h-none min-h-[44px] w-full min-w-[44px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60"
              />
            </span>
          </div>
        ))}
      </div>

      {track && (
        <div
          /*
            A full-width strip that centres the pill, rather than a width doing
            `100vw` arithmetic: `100vw` counts the scrollbar, so asking for
            `calc(100vw - 32px)` left a 9px gutter on the side you can see. A
            padded flex row measures against the viewport the pill actually
            sits in. The strip itself must not swallow clicks meant for the
            page behind it, hence the pointer-events pair.
          */
          className="pointer-events-none fixed inset-x-0 bottom-[16px] z-50 flex justify-center px-[16px] md:bottom-[24px]"
          role="region"
          aria-label={`Now playing: ${track.title} by ${track.artist}`}
        >
          {/*
            The nav's shadow and blur, but not its border or its radius. The
            pill radius belonged to a bar whose content is text: here it cut
            through the embed's own furniture — Spotify's mark sits 8px in
            from the right and 9px down, and the sleeve 8px in from the
            top-left, which puts the ceiling at a 27px clip. The embed's card
            carries its own 8px corner with nothing behind it, so 15px inside
            and 20px outside hugs that curve without touching anything.
          */}
          <div
            className="group pointer-events-auto relative w-full max-w-[560px] rounded-[20px] bg-white p-[5px]"
            style={NAV_SURFACE_STYLE}
          >
            <div className="overflow-hidden rounded-[15px]">
              {plain ? (
                <iframe
                  title={`${track.title} by ${track.artist}`}
                  src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                  width="100%"
                  height={EMBED_H}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block"
                />
              ) : (
                /* createController swaps this out for the embed's own iframe. */
                <div ref={host} className="block w-full" style={{ height: EMBED_H }} />
              )}
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close player"
              /* Revealed on hover, as asked — but always there where there is
                 no hover to give, and whenever it has keyboard focus. */
              className="absolute -top-[7px] -right-[7px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white text-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60 [@media(hover:none)]:opacity-100"
              style={NAV_SURFACE_STYLE}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
