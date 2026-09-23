import GameCard from "@/components/GameCard";

export default function GameGrid({ games = [] }) {
  if (games.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-base-300 p-12 text-center text-sm text-muted">
        No games found. Try a different filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game, i) => (
        <div
          key={game.id}
          className="animate-fadeUp"
          style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
        >
          <GameCard game={game} priority={i < 4} />
        </div>
      ))}
    </div>
  );
}
