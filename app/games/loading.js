import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10"><div className="mb-8 h-8 w-64 animate-shimmer rounded bg-white/[.04]" /><LoadingSkeleton count={12} /></section>;
}
