import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Monitor, Globe2 } from "lucide-react";

export default function GameCard({ game, priority = false }) {
  return (
    <Link href={`/games/${game.id}`} className="game-card group block overflow-hidden rounded-[20px]">
      <div className="relative aspect-[16/10] overflow-hidden bg-base-200">
        {game.thumbnail ? <Image src={game.thumbnail} alt={game.title} fill priority={priority} sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover transition duration-700 group-hover:scale-105" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-teal px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-base">Free</div>
        <div className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-display text-base font-bold text-white">{game.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-white/40">
          <span className="rounded-md bg-white/5 px-2 py-1">{game.genre || "Adventure"}</span>
          <span className="inline-flex items-center gap-1">{String(game.platform || "PC").toLowerCase().includes("browser") ? <Globe2 className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}{game.platform || "PC"}</span>
        </div>
      </div>
    </Link>
  );
}
