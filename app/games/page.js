import GameGrid from "@/components/GameGrid";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import SectionHeading from "@/components/SectionHeading";
import { freeToGameFetch } from "@/lib/freetogame";

export const revalidate = 3600;
export const metadata = { title: "All Games — ZorZora" };

async function getGames(searchParams = {}) {
  const games = await freeToGameFetch("/games", {
    platform: searchParams.platform && searchParams.platform !== "all" ? searchParams.platform : undefined,
    category: searchParams.category,
    "sort-by": searchParams["sort-by"] || "popularity",
  });
  const search = searchParams.search?.toLowerCase().trim();
  return (search ? games.filter((g) => g.title.toLowerCase().includes(search)) : games).slice(0, 48);
}

export default async function GamesPage({ searchParams }) {
  const params = await searchParams;
  const games = await getGames(params);
  return <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"><SectionHeading eyebrow="Game library" title={params.search ? `Search results for “${params.search}”` : "Find your next free game"} subtitle="Search, filter and sort the catalog without leaving the page."/><div className="mb-10 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0d1117] p-3 lg:flex-row lg:items-center"><div className="lg:max-w-md lg:flex-1"><SearchBar initialValue={params.search || ""}/></div><FilterBar/></div><GameGrid games={games}/></section>;
}
