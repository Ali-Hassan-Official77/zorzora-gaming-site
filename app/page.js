import Hero from "@/components/Hero";
import GameGrid from "@/components/GameGrid";
import SectionHeading from "@/components/SectionHeading";
import { freeToGameFetch } from "@/lib/freetogame";
import Link from "next/link";
import { ArrowRight, Compass, Flame, Layers3, Sparkles } from "lucide-react";

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

  return (
    <>
      <Hero games={featured} />

      <section className="relative border-b border-white/[.07] bg-[#07070b]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-3 px-5 py-5 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            ["Trending now", "What players are exploring", Flame, "/games?sort-by=popularity", "violet"],
            ["Fresh drops", "Recently released titles", Compass, "/games?sort-by=release-date", "blue"],
            ["Build your queue", "Filter the full catalog", Layers3, "/games", "pink"],
          ].map(([title, text, Icon, href, tone]) => (
            <Link key={title} href={href} className="group flex items-center gap-4 rounded-2xl border border-white/[.07] bg-white/[.025] p-4 transition hover:-translate-y-0.5 hover:border-white/[.14] hover:bg-white/[.045]">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[.07] ${tone === "violet" ? "bg-[#9b5cff]/10 text-[#b779ff]" : tone === "blue" ? "bg-[#4b9cff]/10 text-[#6ee7ff]" : "bg-[#ff3fa4]/10 text-[#ff70ba]"}`}><Icon className="h-5 w-5" /></span>
              <span><b className="block text-sm text-white">{title}</b><small className="text-xs text-white/35">{text}</small></span>
              <ArrowRight className="ml-auto h-4 w-4 text-white/20 transition group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Player pulse" title="Games people are picking up" subtitle="A fast-moving selection from the most popular titles in the catalog." />
          <Link href="/games?sort-by=popularity" className="mb-8 hidden items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-white/40 transition hover:text-white sm:flex">See all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <GameGrid games={popular} />
      </section>

      <section className="border-y border-white/[.07] bg-[#08080d]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <SectionHeading eyebrow="Fresh on the radar" title="New releases" subtitle="Recently added titles worth a quick look." />
          <GameGrid games={newest} />
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="premium-callout relative overflow-hidden rounded-[28px] p-7 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#9b5cff]/15 blur-[90px]" />
          <div className="pointer-events-none absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-[#4b9cff]/10 blur-[80px]" />
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-[#cbb7ff]"><Sparkles className="h-4 w-4" /> No friction</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.055em] text-white sm:text-5xl">Stop scrolling. Start picking.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base">Use platform, genre and sorting controls to turn a huge catalog into a shortlist you actually want to play.</p>
            <Link href="/games" className="primary-button mt-7">Explore the catalog <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
