"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Sparkles, Monitor, Globe2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

function getGameImage(game) {
  if (!game) return "";
  if (typeof game.background === "string" && game.background) return game.background;
  if (typeof game.background_image === "string" && game.background_image) return game.background_image;
  if (Array.isArray(game.screenshots) && game.screenshots.length) {
    const first = game.screenshots[0];
    if (typeof first === "string") return first;
    if (first?.image) return first.image;
    if (first?.url) return first.url;
  }
  return game.image || game.cover || game.thumbnail || "";
}

export default function Hero({ games = [] }) {
  const featured = useMemo(
    () => (Array.isArray(games) ? games.filter((game) => game?.id != null && game?.title && getGameImage(game)).slice(0, 5) : []),
    [games]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % featured.length), 5200);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  useEffect(() => {
    setIndex((current) => (current >= featured.length ? 0 : current));
  }, [featured.length]);

  const nextGame = useCallback(() => {
    setIndex((current) => featured.length > 1 ? (current + 1) % featured.length : current);
  }, [featured.length]);

  const previousGame = useCallback(() => {
    setIndex((current) => featured.length > 1 ? (current - 1 + featured.length) % featured.length : current);
  }, [featured.length]);

  if (!featured.length) return null;

  const game = featured[index];
  const image = getGameImage(game);
  const genre = typeof game.genre === "string" && game.genre.trim() ? game.genre : "Free-to-play";
  const platform = typeof game.platform === "string" && game.platform.trim() ? game.platform : "PC";
  const isBrowser = platform.toLowerCase().includes("browser");
  const gameUrl = `/games/${encodeURIComponent(String(game.id))}`;
  const next = featured[(index + 1) % featured.length];

  return (
    <section className="hero-shell">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image key={game.id} src={image} alt="" fill priority sizes="100vw" className="scale-[1.12] object-cover opacity-[.14] blur-[18px]" />
        <div className="absolute inset-0 bg-[#050507]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(155,92,255,.18),transparent_32%),radial-gradient(circle_at_90%_72%,rgba(255,63,164,.12),transparent_28%),linear-gradient(90deg,#050507_12%,rgba(5,5,7,.88)_48%,rgba(5,5,7,.55)_100%)]" />
      </div>
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="hero-noise pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-glow pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 bg-[#4b9cff]/15" />
      <div className="hero-glow pointer-events-none absolute right-[-80px] top-[-100px] -z-10 h-[430px] w-[430px] bg-[#ff3fa4]/12" />

      <div className="mx-auto max-w-[1500px] px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pb-12 lg:pt-24">
        <div className="mb-8 flex items-center justify-between border-b border-white/[.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="hero-dot h-1.5 w-1.5 rounded-full bg-[#6ee7ff] text-[#6ee7ff]" />
            <span className="text-[9px] font-black uppercase tracking-[.24em] text-white/45">Premium free game discovery</span>
          </div>
          <span className="hidden text-[9px] font-black uppercase tracking-[.22em] text-white/25 sm:block">ZORZORA / 01</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
          <div className="max-w-3xl">
            <div className="hero-kicker mb-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.2em]">
              <Sparkles className="h-3.5 w-3.5" /> Featured selection
            </div>
            <h1 className="hero-title font-display text-[clamp(3rem,7vw,6.8rem)] font-bold leading-[.88] tracking-[-.075em] text-white">
              Discover games<br /><span className="bg-gradient-to-r from-[#d9c7ff] via-[#9b5cff] to-[#ff68b5] bg-clip-text text-transparent">worth playing.</span>
            </h1>
            <p className="hero-copy mt-6 max-w-xl text-sm leading-7 sm:text-base">
              A cleaner way to find free-to-play games. Explore what&apos;s trending, see fresh releases and jump straight into the details.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={gameUrl} className="primary-button px-5 py-3">
                View featured game <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/games" className="inline-flex items-center gap-2 rounded-[13px] border border-white/10 bg-white/[.035] px-5 py-3 text-xs font-extrabold text-white/75 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[.07] hover:text-white">
                Browse catalog
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-0 overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.025]">
              <div className="hero-stat px-4 py-4 sm:px-5"><p className="text-[9px] font-black uppercase tracking-[.16em] text-white/30">Mode</p><p className="mt-1 text-sm font-extrabold text-white">Free to play</p></div>
              <div className="hero-stat border-l border-white/[.08] px-4 py-4 sm:px-5"><p className="text-[9px] font-black uppercase tracking-[.16em] text-white/30">Focus</p><p className="mt-1 text-sm font-extrabold text-white">Curated picks</p></div>
              <div className="hero-stat border-l border-white/[.08] px-4 py-4 sm:px-5"><p className="text-[9px] font-black uppercase tracking-[.16em] text-white/30">Catalog</p><p className="mt-1 text-sm font-extrabold text-white">Always evolving</p></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mr-0">
            <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle,rgba(155,92,255,.18),transparent_65%)] blur-2xl" />
            <div className="relative grid grid-cols-[1fr_auto] items-end gap-3 sm:gap-4">
              <div className="hero-poster relative overflow-hidden rounded-[26px] border border-white/10 bg-black/30 p-1.5 sm:p-2">
                <div className="relative aspect-[.79] overflow-hidden rounded-[20px] bg-[#11101a]">
                  <Image key={`hero-${game.id}`} src={image} alt={game.title} fill priority sizes="(max-width:1024px) 85vw, 43vw" className="hero-poster-image object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6ee7ff]/12 via-transparent to-[#ff3fa4]/12 mix-blend-screen" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl">
                    <span className="hero-dot h-1.5 w-1.5 rounded-full bg-[#6ee7ff] text-[#6ee7ff]" />
                    <span className="text-[8px] font-black uppercase tracking-[.18em] text-white/75">Live pick</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-2.5 py-1 text-[8px] font-black uppercase tracking-[.15em] text-black">Free</span>
                      <span className="rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[8px] font-black uppercase tracking-[.15em] text-white/75 backdrop-blur">{platform}</span>
                    </div>
                    <p className="mb-2 text-[9px] font-black uppercase tracking-[.18em] text-[#cbb7ff]">Featured now</p>
                    <h2 className="line-clamp-2 font-display text-[clamp(2rem,4vw,3.7rem)] font-bold leading-[.9] tracking-[-.06em] text-white">{game.title}</h2>
                    <div className="mt-5 flex items-center gap-3">
                      <Link href={gameUrl} aria-label={`Open ${game.title}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition hover:scale-105 hover:bg-[#d9c7ff]"><Play className="h-4 w-4 fill-current" /></Link>
                      <div className="min-w-0"><p className="truncate text-xs font-extrabold text-white/85">{genre}</p><p className="mt-1 flex items-center gap-1.5 text-[10px] text-white/40">{isBrowser ? <Globe2 className="h-3 w-3" /> : <Monitor className="h-3 w-3" />} {platform}</p></div>
                    </div>
                  </div>
                </div>
              </div>

              {next && featured.length > 1 && (
                <div className="hidden w-[105px] translate-y-[-12px] overflow-hidden rounded-[20px] border border-white/10 bg-black/30 p-1 sm:block">
                  <div className="relative aspect-[.72] overflow-hidden rounded-[15px]">
                    <Image src={getGameImage(next)} alt="" fill sizes="110px" className="object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                </div>
              )}
            </div>

            {featured.length > 1 && (
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {featured.map((item, itemIndex) => (
                    <button key={item.id} type="button" aria-label={`Show ${item.title}`} onClick={() => setIndex(itemIndex)} className={`h-1.5 rounded-full transition-all duration-500 ${index === itemIndex ? "w-10 bg-gradient-to-r from-[#6ee7ff] via-[#9b5cff] to-[#ff3fa4]" : "w-2 bg-white/15 hover:bg-white/30"}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={previousGame} aria-label="Previous featured game" className="icon-button h-9 w-9 rounded-xl"><ChevronLeft className="h-4 w-4" /></button>
                  <button type="button" onClick={nextGame} aria-label="Next featured game" className="icon-button h-9 w-9 rounded-xl"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
