import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <p className="font-display text-6xl font-bold text-teal">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-base-50">
        That game isn't in our list
      </h1>
      <p className="mt-2 text-sm text-muted">
        It may have been removed, or the link is broken.
      </p>
      <Link
        href="/games"
        className="mt-8 rounded-full bg-teal px-6 py-3 text-sm font-bold text-base transition-colors hover:bg-teal-soft"
      >
        Back to browse
      </Link>
    </div>
  );
}
