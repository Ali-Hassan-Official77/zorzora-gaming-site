import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Monitor, Globe2 } from "lucide-react";

export default function GameCard({ game, priority = false }) {
  const platform = game.platform || "PC";
  const isBrowser = String(platform).toLowerCase().includes("browser");

  return (
    <Link href={`/games/${game.id}`} className="game-card group block">
      <div className="game-card-media relative aspect-[16/10] overflow-hidden">
        {game.thumbnail ? (
          <Image src={game.thumbnail} alt={game.title} fill priority={priority} sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover transition duration-700 group-hover:scale-105" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[9px] font-black uppercase tracking-[.14em] text-white backdrop-blur-xl">Free</div>
        <div className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full border border-white/10 bg-black/35 text-white opacity-0 backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="game-card-title line-clamp-1 font-display text-[15px] font-bold tracking-[-.02em]">{game.title}</h3>
          <span className="mt-0.5 text-[9px] font-black uppercase tracking-[.14em] text-white/20">#{String(game.id).slice(-3)}</span>
        </div>
        <div className="game-card-meta mt-3 flex items-center gap-2 text-[10px] font-bold">
          <span className="game-chip rounded-md px-2 py-1">{game.genre || "Adventure"}</span>
          <span className="inline-flex items-center gap-1">{isBrowser ? <Globe2 className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}{platform}</span>
        </div>
      </div>
    </Link>
  );
}
