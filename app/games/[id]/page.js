import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Cpu, ExternalLink, Building2, Monitor, Tag, UserRound, Sparkles, Globe2 } from "lucide-react";
import { freeToGameFetch } from "@/lib/freetogame";

export const revalidate = 3600;

async function getGame(id) {
  return freeToGameFetch("/game", { id });
}

export async function generateMetadata({ params }) {
  try {
    const game = await getGame(params.id);
    return { title: `${game.title} — ZorZora`, description: game.description?.slice(0, 160) };
  } catch {
    return { title: "Game — ZorZora" };
  }
}

export default async function GameDetailPage({ params }) {
  const game = await getGame(params.id);
  const reqs = game.minimum_system_requirements;
  const heroImage = game.screenshots?.[0]?.image || game.thumbnail || null;
  const screenshots = Array.isArray(game.screenshots) ? game.screenshots.slice(0, 6) : [];
  const platform = game.platform || "PC";
  const isBrowser = String(platform).toLowerCase().includes("browser");

  return (
    <article className="min-h-screen overflow-hidden">
      <section className="detail-hero relative min-h-[590px] sm:min-h-[680px] lg:min-h-[760px]">
        {heroImage && (
          <>
            <div className="absolute inset-0"><Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover opacity-55" /></div>
            <div className="absolute inset-0 bg-[#050507]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(155,92,255,.2),transparent_30%),linear-gradient(90deg,#050507_8%,rgba(5,5,7,.78)_50%,rgba(5,5,7,.45)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050507] to-transparent" />
          </>
        )}

        <div className="relative z-10 mx-auto flex min-h-[590px] max-w-[1500px] items-end px-5 pb-10 sm:min-h-[680px] sm:px-8 sm:pb-14 lg:min-h-[760px] lg:px-10 lg:pb-16">
          <div className="w-full">
            <Link href="/games" className="mb-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3.5 py-2 text-xs font-bold text-white/70 backdrop-blur-xl transition hover:border-white/20 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to browse</Link>
            <div className="max-w-5xl">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="detail-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"><Sparkles className="h-3.5 w-3.5 text-[#b779ff]" /> Free</span>
                <span className="detail-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs">{isBrowser ? <Globe2 className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}{platform}</span>
                {game.release_date && <span className="detail-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"><Calendar className="h-3.5 w-3.5" />{new Date(game.release_date).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"})}</span>}
              </div>
              <h1 className="detail-heading max-w-5xl font-display text-5xl font-bold leading-[.88] tracking-[-.065em] sm:text-7xl lg:text-8xl">{game.title}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
                {game.genre && <span className="inline-flex items-center gap-2"><Tag className="h-4 w-4 text-[#b779ff]" />{game.genre}</span>}
                {game.developer && <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4 text-[#6ee7ff]" />{game.developer}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_340px] lg:gap-14 lg:px-10 lg:py-20">
        <div className="min-w-0">
          {game.description && (
            <section>
              <div className="mb-5 flex items-center gap-3"><span className="detail-line h-px w-9" /><h2 className="font-display text-xl font-bold text-white">About this game</h2></div>
              <p className="max-w-3xl whitespace-pre-line text-sm leading-7 text-white/55 sm:text-base sm:leading-8">{game.description}</p>
            </section>
          )}

          {screenshots.length > 0 && (
            <section className="mt-14 sm:mt-16">
              <div className="mb-5 flex items-end justify-between gap-4"><div><div className="flex items-center gap-3"><span className="detail-line h-px w-9" /><h2 className="font-display text-xl font-bold text-white">Screenshots</h2></div><p className="mt-2 pl-12 text-sm text-white/40">A closer look at the game world.</p></div><span className="hidden rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-xs text-white/40 sm:block">{screenshots.length} images</span></div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {screenshots.map((s,index)=>(
                  <div key={s.id || s.image} className={`group relative overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.02] ${index===0?"sm:col-span-2":""}`}>
                    <div className={`relative ${index===0?"aspect-[16/8]":"aspect-video"}`}>
                      <Image src={s.image} alt={`${game.title} screenshot ${index+1}`} fill sizes={index===0?"(max-width:640px) 100vw,66vw":"(max-width:640px) 100vw,33vw"} className="object-cover transition duration-700 group-hover:scale-[1.045]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 grid h-7 min-w-7 place-items-center rounded-full border border-white/10 bg-black/45 px-2 text-[10px] font-bold text-white backdrop-blur-xl">0{index+1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {reqs && (
            <section className="mt-14 sm:mt-16">
              <div className="mb-5 flex items-center gap-3"><span className="detail-line h-px w-9" /><h2 className="flex items-center gap-2 font-display text-xl font-bold text-white"><Cpu className="h-5 w-5 text-[#b779ff]" /> Minimum requirements</h2></div>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.entries(reqs).map(([key,value])=>(
                  <div key={key} className="detail-card p-4 transition hover:-translate-y-0.5 hover:border-white/15"><dt className="text-[10px] font-bold uppercase tracking-[.16em] text-white/30">{key.replaceAll("_"," ")}</dt><dd className="mt-2 break-words text-sm leading-6 text-white/70">{value || "Not specified"}</dd></div>
                ))}
              </dl>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5">
            <div className="detail-card overflow-hidden">
              {game.thumbnail && <div className="relative aspect-[16/9] overflow-hidden"><Image src={game.screenshots?.[0]?.image || game.thumbnail} alt={game.title} fill sizes="(max-width:1024px) 100vw,340px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0c0b12] via-transparent to-transparent" /><div className="absolute left-4 top-4"><span className="detail-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"><Sparkles className="h-3.5 w-3.5 text-[#b779ff]" /> Free to play</span></div></div>}
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-white">Game details</h3>
                <dl className="mt-5 space-y-4">
                  {[["Genre",game.genre,Tag],["Developer",game.developer,Building2],["Publisher",game.publisher,UserRound],["Platform",game.platform,Monitor]].map(([label,value,Icon])=>value?<div key={label} className="flex items-start justify-between gap-4"><dt className="flex items-center gap-2 text-xs text-white/35"><Icon className="h-3.5 w-3.5" />{label}</dt><dd className="max-w-[190px] text-right text-sm font-semibold text-white/75">{value}</dd></div>:null)}
                </dl>
              </div>
            </div>

            {game.game_url && <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="detail-primary">Play now <ExternalLink className="h-4 w-4" /></a>}
            <Link href="/games" className="flex w-full items-center justify-center gap-2 rounded-[13px] border border-white/10 bg-white/[.03] px-5 py-3.5 text-sm font-bold text-white/55 transition hover:border-white/20 hover:bg-white/[.055] hover:text-white"><ArrowLeft className="h-4 w-4" /> Browse more games</Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
