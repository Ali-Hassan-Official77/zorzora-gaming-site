import Hero from "@/components/Hero";
import GameGrid from "@/components/GameGrid";
import SectionHeading from "@/components/SectionHeading";
import { freeToGameFetch } from "@/lib/freetogame";
import Link from "next/link";
import { ArrowRight, Compass, Flame, Layers3, MousePointer2 } from "lucide-react";

export const revalidate = 3600;

async function getHomeData() {
  const [popular, newest] = await Promise.all([
    freeToGameFetch("/games", { "sort-by": "popularity" }),
    freeToGameFetch("/games", { "sort-by": "release-date" }),
  ]);
  return { popular: popular.slice(0, 8), newest: newest.slice(0, 8) };
}

export default async function HomePage() {
  const { popular, newest } = await getHomeData();
  const featured = popular.slice(0, 5);
  return <>
    <Hero games={featured} />
    <section className="border-b border-white/10 bg-[#080b10]"><div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-5 py-5 sm:grid-cols-3 sm:px-8"><Link href="/games?sort-by=popularity" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 hover:bg-white/[0.045]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ff3b30]/10 text-[#00FF80]"><Flame className="h-5 w-5"/></span><span><b className="block text-sm text-white">Trending now</b><small className="text-xs text-white/35">What players are exploring</small></span><ArrowRight className="ml-auto h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white"/></Link><Link href="/games?sort-by=release-date" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 hover:bg-white/[0.045]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-white"><Compass className="h-5 w-5"/></span><span><b className="block text-sm text-white">Fresh drops</b><small className="text-xs text-white/35">Recently released titles</small></span><ArrowRight className="ml-auto h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white"/></Link><Link href="/games" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 hover:bg-white/[0.045]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-white"><Layers3 className="h-5 w-5"/></span><span><b className="block text-sm text-white">Build your queue</b><small className="text-xs text-white/35">Filter the full catalog</small></span><ArrowRight className="ml-auto h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white"/></Link></div></section>
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"><div className="flex items-end justify-between gap-6"><SectionHeading eyebrow="Player pulse" title="Games people are picking up" subtitle="A fast-moving selection from the most popular titles in the catalog."/><Link href="/games?sort-by=popularity" className="mb-8 hidden items-center gap-2 text-sm font-bold text-white/50 hover:text-white sm:flex">See all <ArrowRight className="h-4 w-4"/></Link></div><GameGrid games={popular}/></section>
    <section className="border-y border-white/10 bg-[#0b0f14]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"><SectionHeading eyebrow="Fresh on the radar" title="New releases" subtitle="Recently added titles worth a quick look."/><GameGrid games={newest}/></div></section>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_85%_20%,rgba(255,59,48,.18),transparent_35%),#10141a] p-7 sm:p-10 lg:p-14"><div className="max-w-2xl"><div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#00FF80]"><MousePointer2 className="h-4 w-4"/> No friction</div><h2 className="mt-3 font-display text-3xl font-bold tracking-[-.04em] text-white sm:text-5xl">Stop scrolling. Start picking.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base">Use platform, genre and sorting controls to turn a huge catalog into a shortlist you actually want to play.</p><Link href="/games" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:-translate-y-0.5">Explore the catalog <ArrowRight className="h-4 w-4"/></Link></div></div></section>
  </>;
}
