import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-24 text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-[#cbb7ff]"><Sparkles className="h-3.5 w-3.5" /> Lost signal</div>
      <p className="font-display text-7xl font-bold tracking-[-.08em] text-white sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">That game isn&apos;t in our list</h1>
      <p className="mt-2 text-sm leading-6 text-white/45">It may have been removed, or the link is broken.</p>
      <Link href="/games" className="primary-button mt-8"><ArrowLeft className="h-4 w-4" /> Back to browse</Link>
    </div>
  );
}
