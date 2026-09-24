import { Sparkles, Monitor, Globe } from "lucide-react";

export function FreeBadge() {
  return <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-gradient-to-r from-[#9b5cff] to-[#ff3fa4] px-2.5 py-1 text-xs font-bold text-white"><Sparkles className="h-3 w-3" /> Free</span>;
}

export function PlatformBadge({ platform }) {
  if (!platform) return null;
  const isBrowser = platform.toLowerCase().includes("browser");
  return <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-xs text-white/55">{isBrowser ? <Globe className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}{platform}</span>;
}
