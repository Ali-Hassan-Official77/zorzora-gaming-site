"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/Providers";
import { CATEGORIES, PLATFORMS, SORTS } from "@/lib/categories";

export default function FilterBar() {
  const router = useRouter(), sp = useSearchParams();
  const { notify } = useToast();

  function update(k, v) {
    const p = new URLSearchParams(sp.toString());
    if (v && v !== "all") p.set(k, v); else p.delete(k);
    notify("Catalog filter updated.", "info");
    router.push(`/games?${p.toString()}`);
  }

  const selectClass = "filter-select";
  return (
    <div className="flex flex-wrap gap-2">
      <select value={sp.get("category") || ""} onChange={e => update("category", e.target.value)} className={selectClass}><option value="">All categories</option>{CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select>
      <select value={sp.get("platform") || "all"} onChange={e => update("platform", e.target.value)} className={selectClass}>{PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}</select>
      <select value={sp.get("sort-by") || "popularity"} onChange={e => update("sort-by", e.target.value)} className={selectClass}>{SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}</select>
    </div>
  );
}
