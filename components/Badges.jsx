import { Sparkles, Monitor, Globe } from "lucide-react";

export function FreeBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-teal px-2.5 py-1 text-xs font-bold text-base backdrop-blur-sm">
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      Free
    </span>
  );
}

export function PlatformBadge({ platform }) {
  if (!platform) return null;
  const isBrowser = platform.toLowerCase().includes("browser");

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-base-200/80 px-2.5 py-1 text-xs text-muted backdrop-blur-sm">
      {isBrowser ? (
        <Globe className="h-3 w-3" aria-hidden="true" />
      ) : (
        <Monitor className="h-3 w-3" aria-hidden="true" />
      )}
      {platform}
    </span>
  );
}
