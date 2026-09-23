import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="skeleton mb-8 h-8 w-64 animate-shimmer rounded" />
      <LoadingSkeleton count={12} />
    </section>
  );
}
