"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "@/components/Img";
import { NAV_SURFACE_CLASS, NAV_SURFACE_STYLE } from "@/components/Nav";

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
 * cannot be hosted here; the embed is the licensed way to play them, and it
 * brings its own scrubber, which is what lets the listener move around inside
 * the track. The 152px variant is used rather than the 80px one precisely
 * because the compact size has no usable seek bar.
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

/* Tall enough for the embed's seek bar; the 80px variant has none. */
const EMBED_H = 152;

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

  const host = useRef<HTMLDivElement | null>(null);
  const api = useRef<SpotifyApi | null>(null);
  const controller = useRef<Controller | null>(null);
  const wanted = useRef<string | null>(null);

  const start = useCallback((id: string) => {
    const uri = `spotify:track:${id}`;
    wanted.current = uri;

    if (controller.current) {
      controller.current.loadUri(uri);
      /* loadUri does not resume on its own; the embed needs a beat to swap. */
      window.setTimeout(() => controller.current?.play(), 400);
      return;
    }
    if (!api.current || !host.current) return; // picked up once ready

    api.current.createController(
      host.current,
      { uri, width: "100%", height: EMBED_H },
      (c) => {
        controller.current = c;
        c.addListener("ready", () => c.play());
      },
    );
  }, []);

  /* Load the API the first time a track is asked for, not on page load. */
  useEffect(() => {
    if (active === null || api.current || plain) return;

    let cancelled = false;
    const give_up = window.setTimeout(() => {
      if (!cancelled && !api.current) setPlain(true);
    }, 6000);

    if (!document.getElementById("spotify-iframe-api")) {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        api.current = IFrameAPI;
        if (wanted.current) start(wanted.current.split(":")[2]);
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
  }, [active, plain, start]);

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
          className="group fixed bottom-[16px] left-1/2 z-50 w-[min(420px,calc(100vw-24px))] -translate-x-1/2 md:bottom-[24px]"
          role="region"
          aria-label={`Now playing: ${track.title} by ${track.artist}`}
        >
          <div
            className={`relative p-[8px] ${NAV_SURFACE_CLASS}`}
            style={NAV_SURFACE_STYLE}
          >
            {/*
              Clipped to a radius concentric with the pill — outer less the 8px
              of padding — so the embed's own square corners do not leave white
              wedges inside the curve.
            */}
            <div className="overflow-hidden rounded-[58px] xl:rounded-[calc(66*var(--u)-8px)]">
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
              className="absolute -top-[8px] -right-[8px] flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#F3F3F3] bg-white text-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60 [@media(hover:none)]:opacity-100"
              style={NAV_SURFACE_STYLE}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.6"
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
