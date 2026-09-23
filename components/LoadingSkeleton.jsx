export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="skeleton-grid" aria-label="Loading games" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="premium-skeleton-card">
          <div className="premium-skeleton-media"><span /></div>
          <div className="p-4 space-y-3">
            <div className="skeleton-line w-3/4" />
            <div className="skeleton-line w-1/2" />
            <div className="flex gap-2 pt-1"><div className="skeleton-pill" /><div className="skeleton-pill short" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}
