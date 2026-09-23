import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <LoadingSkeleton count={8} />
    </div>
  );
}
