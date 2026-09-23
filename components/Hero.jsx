"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Play,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

function getGameImage(game) {
  if (!game) return "";

  if (typeof game.background === "string" && game.background) {
    return game.background;
  }

  if (
    typeof game.background_image === "string" &&
    game.background_image
  ) {
    return game.background_image;
  }

  if (Array.isArray(game.screenshots) && game.screenshots.length > 0) {
    const firstScreenshot = game.screenshots[0];

    if (typeof firstScreenshot === "string") {
      return firstScreenshot;
    }

    if (firstScreenshot && typeof firstScreenshot.image === "string") {
      return firstScreenshot.image;
    }

    if (firstScreenshot && typeof firstScreenshot.url === "string") {
      return firstScreenshot.url;
    }
  }

  if (typeof game.image === "string" && game.image) {
    return game.image;
  }

  if (typeof game.cover === "string" && game.cover) {
    return game.cover;
  }

  if (typeof game.thumbnail === "string" && game.thumbnail) {
    return game.thumbnail;
  }

  return "";
}

export default function Hero({ games = [] }) {
  const featured = useMemo(() => {
    if (!Array.isArray(games)) return [];

    return games
      .filter((game) => {
        return (
          game &&
          game.id !== undefined &&
          game.id !== null &&
          game.title &&
          getGameImage(game)
        );
      })
      .slice(0, 5);
  }, [games]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!featured.length) {
      setIndex(0);
      return;
    }

    setIndex((current) => {
      if (current >= featured.length) return 0;
      return current;
    });
  }, [featured.length]);

  const nextGame = useCallback(() => {
    setIndex((current) => {
      if (featured.length <= 1) return current;
      return (current + 1) % featured.length;
    });
  }, [featured.length]);

  const previousGame = useCallback(() => {
    setIndex((current) => {
      if (featured.length <= 1) return current;
      return (current - 1 + featured.length) % featured.length;
    });
  }, [featured.length]);

  useEffect(() => {
    if (featured.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % featured.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [featured.length]);

  const game = featured[index];

  if (!game) return null;

  const image = getGameImage(game);

  const genre =
    typeof game.genre === "string" && game.genre.trim()
      ? game.genre
      : typeof game.genre === "object" && game.genre?.name
        ? game.genre.name
        : "Free-to-play";

  const platform =
    typeof game.platform === "string" && game.platform.trim()
      ? game.platform
      : typeof game.platforms === "string" && game.platforms.trim()
        ? game.platforms
        : "PC";

  // KEEPING YOUR ORIGINAL ROUTE
  const gameUrl = `/games/${encodeURIComponent(String(game.id))}`;

  const nextGameData =
    featured.length > 1
      ? featured[(index + 1) % featured.length]
      : null;

  const previousGameData =
    featured.length > 2
      ? featured[(index + 2) % featured.length]
      : null;

  const nextImage = getGameImage(nextGameData);
  const previousImage = getGameImage(previousGameData);

  return (
    <section className="relative isolate overflow-hidden border-b border-black/[0.08] bg-[#f5f7f5] text-[#08110d] transition-colors duration-500 dark:border-white/[0.07] dark:bg-[#050706] dark:text-white">
      {/* =====================================================
          BACKDROP
      ====================================================== */}

      <div className="absolute inset-0 -z-30 overflow-hidden">
        <Image
          key={`background-${game.id}`}
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.18] object-cover object-center opacity-[0.07] blur-[14px] transition-all duration-[1200ms] dark:opacity-[0.16] dark:blur-[8px]"
        />

        <div className="absolute inset-0 bg-[#f5f7f5]/95 dark:bg-[#050706]/90" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f7f5] via-[#f5f7f5]/95 to-transparent dark:from-[#050706] dark:via-[#050706]/95 dark:to-transparent" />
      </div>

      {/* =====================================================
          SUBTLE GREEN LIGHT
      ====================================================== */}

      <div className="pointer-events-none absolute -right-32 top-[-180px] -z-20 h-[500px] w-[500px] rounded-full bg-[#00ff80]/10 blur-[130px] dark:bg-[#00ff80]/[0.055]" />

      <div className="pointer-events-none absolute bottom-[-250px] left-[25%] -z-20 h-[450px] w-[450px] rounded-full bg-[#00d9a0]/[0.07] blur-[130px]" />

      {/* =====================================================
          MICRO GRID
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-[0.035] dark:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="relative mx-auto min-h-[780px] max-w-[1650px] px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36 xl:px-16">
        {/* ===================================================
            TOP NAV-LIKE LINE
        ==================================================== */}

        <div className="flex items-center justify-between border-b border-black/[0.08] pb-5 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="relative h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#00ff80] opacity-50" />
              <span className="absolute inset-0 rounded-full bg-[#00d978]" />
            </div>

            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#637069] dark:text-white/40">
              Free game discovery
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8b9690] dark:text-white/25">
              ZORZORA
            </span>

            <span className="h-px w-8 bg-black/15 dark:bg-white/15" />

            <span className="font-mono text-[9px] text-[#8b9690] dark:text-white/25">
              25° 17&apos; N
            </span>
          </div>
        </div>

        {/* ===================================================
            HERO COMPOSITION
        ==================================================== */}

        <div className="grid min-h-[650px] items-center lg:grid-cols-[110px_minmax(420px,0.85fr)_minmax(500px,1.15fr)]">
          {/* =================================================
              VERTICAL BRAND
          ================================================== */}

          <div className="relative hidden h-[500px] items-center justify-center lg:flex">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/[0.08] dark:bg-white/[0.07]" />

            <div className="relative z-10 flex flex-col items-center gap-5 bg-[#f5f7f5] py-5 dark:bg-[#050706]">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#00a965] [writing-mode:vertical-rl] dark:text-[#00ff80]">
                ZORZORA
              </span>

              <span className="h-8 w-px bg-[#00d978]/40" />

              <span className="font-mono text-[8px] text-[#8a958f] [writing-mode:vertical-rl] dark:text-white/25">
                PLAY / EXPLORE / DISCOVER
              </span>
            </div>
          </div>

          {/* =================================================
              TEXT SIDE
          ================================================== */}

          <div className="relative z-20 py-14 lg:pr-10">
            {/* Label */}

            <div className="mb-8 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#00b968]/25 bg-[#00ff80]/10 text-[#00a965] dark:text-[#00ff80]">
                <Sparkles className="h-4 w-4" />
              </span>

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#738079] dark:text-white/35">
                  Today&apos;s selection
                </p>

                <p className="mt-1 text-xs font-bold text-[#18271f] dark:text-white/70">
                  Curated for you
                </p>
              </div>
            </div>

            {/* Main heading */}

            <h1 className="max-w-[680px] font-display text-[clamp(4rem,7.4vw,8rem)] font-black leading-[0.78] tracking-[-0.09em] text-[#07110d] dark:text-white">
              PLAY
              <br />

              <span className="relative inline-block text-[#00ae68] dark:text-[#00ff80]">
                WITHOUT
                <span className="absolute -right-3 top-[12%] h-2 w-2 rounded-full bg-[#00ff80] shadow-[0_0_18px_rgba(0,255,128,.7)]" />
              </span>

              <br />

              LIMITS.
            </h1>

            {/* Description */}

            <p className="mt-9 max-w-[500px] text-sm leading-7 text-[#59675f] sm:text-base sm:leading-8 dark:text-white/45">
              Skip the endless scrolling. Find free games
              worth playing, from overlooked indie worlds
              to multiplayer experiences made for your next
              session.
            </p>

            {/* Actions */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/games"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#07110d] px-6 text-sm font-black text-white shadow-[0_18px_50px_rgba(0,0,0,.14)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00d978] hover:shadow-[0_20px_55px_rgba(0,217,120,.2)] dark:bg-[#00ff80] dark:text-[#031008] dark:hover:bg-[#39ffb0]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 dark:bg-black/10">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>

                Enter ZorZora

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href={gameUrl}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-black/10 bg-white/40 px-6 text-sm font-bold text-[#15231c] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00c978]/40 hover:bg-[#00ff80]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-[#00ff80]/30 dark:hover:bg-white/[0.08]"
              >
                <Gamepad2 className="h-4 w-4 text-[#00a965] dark:text-[#00ff80]" />

                View selection
              </Link>
            </div>

            {/* Small stats */}

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#849089] dark:text-white/25">
                  Catalog
                </p>

                <p className="mt-1 text-sm font-black text-[#14231c] dark:text-white">
                  Always evolving
                </p>
              </div>

              <div className="h-7 w-px bg-black/10 dark:bg-white/10" />

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#849089] dark:text-white/25">
                  Access
                </p>

                <p className="mt-1 text-sm font-black text-[#14231c] dark:text-white">
                  100% Free
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              ARTWORK SIDE
          ================================================== */}

          <div className="relative flex min-h-[520px] items-center justify-center lg:min-h-[620px]">
            {/* Decorative coordinate text */}

            <div className="pointer-events-none absolute right-0 top-6 hidden font-mono text-[8px] leading-5 text-[#8b9690] dark:text-white/20 xl:block">
              FRAME_001
              <br />
              SIGNAL_ACTIVE
              <br />
              DISCOVERY_MODE
            </div>

            {/* Back artwork */}

            {previousGameData && previousImage && (
              <div className="pointer-events-none absolute left-[3%] top-[12%] hidden w-[31%] rotate-[-12deg] overflow-hidden rounded-[24px] border border-black/10 shadow-[0_30px_70px_rgba(0,0,0,.16)] lg:block dark:border-white/10">
                <div className="relative aspect-[0.72]">
                  <Image
                    key={`previous-${previousGameData.id}`}
                    src={previousImage}
                    alt=""
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/45" />
                </div>
              </div>
            )}

            {/* Second artwork */}

            {nextGameData && nextImage && (
              <div className="pointer-events-none absolute bottom-[8%] right-[1%] hidden w-[31%] rotate-[11deg] overflow-hidden rounded-[24px] border border-black/10 shadow-[0_30px_70px_rgba(0,0,0,.16)] lg:block dark:border-white/10">
                <div className="relative aspect-[0.72]">
                  <Image
                    key={`next-${nextGameData.id}`}
                    src={nextImage}
                    alt=""
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/45" />
                </div>
              </div>
            )}

            {/* Main poster */}

            <div className="relative z-20 w-full max-w-[490px]">
              {/* Neon edge */}

              <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-br from-[#00ff80]/60 via-transparent to-[#00d9a0]/20 opacity-70 blur-[1px]" />

              <div className="relative rounded-[30px] border border-white/15 bg-white/10 p-2 shadow-[0_35px_100px_rgba(0,0,0,.28)] backdrop-blur-xl sm:p-3">
                <div className="relative aspect-[0.78] overflow-hidden rounded-[24px] bg-[#101412]">
                  <Image
                    key={`main-${game.id}`}
                    src={image}
                    alt={game.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 38vw"
                    className="object-cover object-center transition-all duration-700"
                  />

                  {/* Cinematic image treatment */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff80]/20 via-transparent to-transparent mix-blend-screen" />

                  {/* Poster number */}

                  <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
                    <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-white/60">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Top-right status */}

                  <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-xl sm:right-6 sm:top-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00ff80] shadow-[0_0_12px_rgba(0,255,128,.9)]" />

                    <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/80">
                      Live pick
                    </span>
                  </div>

                  {/* Main poster content */}

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-[#00ff80] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#031008]">
                        Free
                      </span>

                      <span className="rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
                        {platform}
                      </span>
                    </div>

                    <p className="mb-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#79ffc2]">
                      Featured now
                    </p>

                    <h2 className="line-clamp-2 max-w-[410px] font-display text-[clamp(2.3rem,5vw,4.3rem)] font-black leading-[0.86] tracking-[-0.065em] text-white">
                      {game.title}
                    </h2>

                    <div className="mt-5 flex items-center gap-4">
                      <Link
                        href={gameUrl}
                        aria-label={`Play ${game.title}`}
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110 hover:bg-[#00ff80]"
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </Link>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-white/85">
                          {genre}
                        </p>

                        <p className="mt-1 text-[10px] text-white/40">
                          Explore game details
                        </p>
                      </div>

                      <span className="ml-auto hidden font-mono text-[9px] text-white/35 sm:block">
                        {String(index + 1).padStart(2, "0")}/
                        {String(featured.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  CAROUSEL CONTROLS
              ================================================== */}

              {featured.length > 1 && (
                <div className="relative z-40 mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {featured.map((item, itemIndex) => (
                      <button
                        key={String(item.id)}
                        type="button"
                        aria-label={`Show ${item.title}`}
                        aria-current={
                          index === itemIndex ? "true" : undefined
                        }
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setIndex(itemIndex);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          index === itemIndex
                            ? "w-12 bg-[#00d978] dark:bg-[#00ff80]"
                            : "w-2 bg-black/15 hover:bg-black/30 dark:bg-white/15 dark:hover:bg-white/35"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous featured game"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        previousGame();
                      }}
                      className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-[#17251f] backdrop-blur-xl transition-all duration-300 hover:border-[#00c978]/40 hover:bg-[#00ff80]/10 active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      aria-label="Next featured game"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        nextGame();
                      }}
                      className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-[#17251f] backdrop-blur-xl transition-all duration-300 hover:border-[#00c978]/40 hover:bg-[#00ff80]/10 active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM MARQUEE
        ====================================================== */}

        <div className="flex flex-col gap-4 border-t border-black/[0.08] pt-5 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#75817b] dark:text-white/30">
              Discover
            </span>

            <span className="h-px w-8 bg-black/15 dark:bg-white/15" />

            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#00a965] dark:text-[#00ff80]">
              Play
            </span>

            <span className="h-px w-8 bg-black/15 dark:bg-white/15" />

            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#75817b] dark:text-white/30">
              Repeat
            </span>
          </div>

          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#89948e] dark:text-white/25">
            Find something worth playing.
          </p>
        </div>
      </div>

      {/* Bottom line */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d978]/60 to-transparent" />
    </section>
  );
}