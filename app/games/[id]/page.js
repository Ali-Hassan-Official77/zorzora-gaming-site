import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Cpu,
  ExternalLink,
  Building2,
  Monitor,
  Tag,
  UserRound,
  Sparkles,
} from "lucide-react";

import { freeToGameFetch } from "@/lib/freetogame";
import { FreeBadge, PlatformBadge } from "@/components/Badges";

export const revalidate = 3600;

async function getGame(id) {
  return freeToGameFetch("/game", { id });
}

export async function generateMetadata({ params }) {
  try {
    const game = await getGame(params.id);

    return {
      title: `${game.title} — ZorZora`,
      description: game.description?.slice(0, 160),
    };
  } catch {
    return {
      title: "Game — ZorZora",
    };
  }
}

export default async function GameDetailPage({ params }) {
  const game = await getGame(params.id);

  const reqs = game.minimum_system_requirements;

  // FreeToGame thumbnails are usually low resolution.
  // Screenshots are much better for large visual areas.
  const heroImage =
    game.screenshots?.[0]?.image ||
    game.thumbnail ||
    null;

  const screenshots = Array.isArray(game.screenshots)
    ? game.screenshots.slice(0, 6)
    : [];

  return (
    <article className="min-h-screen overflow-hidden">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[560px] overflow-hidden border-b border-base-300/60 sm:min-h-[650px] lg:min-h-[720px]">
        {/* High-resolution screenshot background */}
        {heroImage && (
          <>
            <div className="absolute inset-0 scale-[1.04]">
              <Image
                src={heroImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Blur layer hides compression/upscale artifacts */}
            <div className="absolute inset-0 bg-base/20 backdrop-blur-[2px]" />

            {/* Main cinematic gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-base/35 via-base/55 to-base" />

            <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-base/35 to-base/70" />

            {/* Subtle glow */}
            <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[560px] w-full max-w-7xl items-end px-5 pb-10 sm:min-h-[650px] sm:px-8 sm:pb-14 lg:min-h-[720px] lg:pb-16">
          <div className="w-full">
            {/* Back */}
            <Link
              href="/games"
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3.5 py-2 text-sm font-medium text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-black/35 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to browse
            </Link>

            <div className="max-w-4xl">
              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <FreeBadge />

                {game.platform && (
                  <PlatformBadge platform={game.platform} />
                )}

                {game.release_date && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-white/70 backdrop-blur-xl">
                    <Calendar className="h-3.5 w-3.5" />

                    {new Date(game.release_date).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="max-w-4xl text-balance font-display text-4xl font-bold leading-[0.95] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                {game.title}
              </h1>

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/65">
                {game.genre && (
                  <span className="inline-flex items-center gap-2">
                    <Tag className="h-4 w-4 text-teal" />
                    {game.genre}
                  </span>
                )}

                {game.developer && (
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-teal" />
                    {game.developer}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-base to-transparent" />
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_330px] lg:gap-14 lg:py-20">
        {/* =====================================================
            LEFT
        ===================================================== */}
        <div className="min-w-0">
          {/* About */}
          {game.description && (
            <section>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-teal" />

                <h2 className="font-display text-xl font-bold text-base-50">
                  About this game
                </h2>
              </div>

              <p className="max-w-3xl whitespace-pre-line text-sm leading-7 text-muted sm:text-base sm:leading-8">
                {game.description}
              </p>
            </section>
          )}

          {/* ===================================================
              SCREENSHOTS
          =================================================== */}
          {screenshots.length > 0 && (
            <section className="mt-14 sm:mt-16">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-teal" />

                    <h2 className="font-display text-xl font-bold text-base-50">
                      Screenshots
                    </h2>
                  </div>

                  <p className="mt-2 pl-11 text-sm text-muted">
                    A closer look at the game world.
                  </p>
                </div>

                <span className="hidden rounded-full border border-base-300/60 bg-base-100 px-3 py-1 text-xs text-muted sm:block">
                  {screenshots.length} images
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {screenshots.map((s, index) => (
                  <div
                    key={s.id || s.image}
                    className={`group relative overflow-hidden rounded-2xl border border-base-300/60 bg-base-100 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative ${
                        index === 0
                          ? "aspect-[16/8]"
                          : "aspect-video"
                      }`}
                    >
                      <Image
                        src={s.image}
                        alt={`${game.title} screenshot ${index + 1}`}
                        fill
                        sizes={
                          index === 0
                            ? "(max-width: 640px) 100vw, 66vw"
                            : "(max-width: 640px) 100vw, 33vw"
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />

                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />

                      {/* Number */}
                      <div className="absolute bottom-3 left-3 flex h-7 min-w-7 items-center justify-center rounded-full border border-white/10 bg-black/45 px-2 text-[11px] font-semibold text-white backdrop-blur-xl">
                        0{index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ===================================================
              REQUIREMENTS
          =================================================== */}
          {reqs && (
            <section className="mt-14 sm:mt-16">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-teal" />

                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-base-50">
                  <Cpu className="h-5 w-5 text-teal" />
                  Minimum requirements
                </h2>
              </div>

              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.entries(reqs).map(([key, value]) => (
                  <div
                    key={key}
                    className="group rounded-2xl border border-base-300/60 bg-base-100 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/30"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {key.replaceAll("_", " ")}
                    </dt>

                    <dd className="mt-2 break-words text-sm leading-6 text-base-50">
                      {value || "Not specified"}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        {/* =====================================================
            SIDEBAR
        ===================================================== */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5">
            {/* Game card */}
            <div className="overflow-hidden rounded-3xl border border-base-300/60 bg-base-100 shadow-2xl shadow-black/10">
              {/* Better portrait image */}
              {game.thumbnail && (
                <div className="relative aspect-[16/9] overflow-hidden bg-base-200">
                  <Image
                    src={
                      game.screenshots?.[0]?.image ||
                      game.thumbnail
                    }
                    alt={game.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 330px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
                      <Sparkles className="h-3.5 w-3.5 text-teal" />
                      Free to play
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5">
                <h3 className="font-display text-base font-bold text-base-50">
                  Game details
                </h3>

                <dl className="mt-5 space-y-4">
                  {game.genre && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="flex items-center gap-2 text-xs text-muted">
                        <Tag className="h-3.5 w-3.5" />
                        Genre
                      </dt>

                      <dd className="text-right text-sm font-medium text-base-50">
                        {game.genre}
                      </dd>
                    </div>
                  )}

                  {game.developer && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="flex items-center gap-2 text-xs text-muted">
                        <Building2 className="h-3.5 w-3.5" />
                        Developer
                      </dt>

                      <dd className="max-w-[180px] text-right text-sm font-medium text-base-50">
                        {game.developer}
                      </dd>
                    </div>
                  )}

                  {game.publisher && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="flex items-center gap-2 text-xs text-muted">
                        <UserRound className="h-3.5 w-3.5" />
                        Publisher
                      </dt>

                      <dd className="max-w-[180px] text-right text-sm font-medium text-base-50">
                        {game.publisher}
                      </dd>
                    </div>
                  )}

                  {game.platform && (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="flex items-center gap-2 text-xs text-muted">
                        <Monitor className="h-3.5 w-3.5" />
                        Platform
                      </dt>

                      <dd className="text-right text-sm font-medium text-base-50">
                        {game.platform}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Play button */}
            {game.game_url && (
              <a
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-teal px-5 py-3.5 text-center text-sm font-bold text-base shadow-lg shadow-teal/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-soft hover:shadow-xl hover:shadow-teal/15"
              >
                Play now

                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}

            {/* Back button mobile/desktop */}
            <Link
              href="/games"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-base-300/60 bg-base-100 px-5 py-3 text-sm font-medium text-muted transition-all duration-300 hover:border-base-300 hover:text-base-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse more games
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}