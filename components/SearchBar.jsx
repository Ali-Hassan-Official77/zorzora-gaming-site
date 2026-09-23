"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/Providers";

export default function SearchBar({ initialValue = "", large = false }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const { notify } = useToast();

  function submit(e) {
    e.preventDefault();
    const query = value.trim();
    if (!query) {
      notify("Enter a game title to search.", "warning");
      return;
    }
    notify(`Searching the catalog for “${query}”`, "info");
    const p = new URLSearchParams({ search: query });
    router.push(`/games?${p.toString()}`);
  }

  return (
    <form onSubmit={submit} role="search" className="w-full">
      <div className={`search-shell flex items-center gap-3 ${large ? "py-4" : "py-3"}`}>
        <Search className="h-4 w-4 shrink-0 search-icon" />
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search games..." aria-label="Search games" className="w-full bg-transparent text-sm outline-none" />
        <button className="search-button" type="submit">Search</button>
      </div>
    </form>
  );
}
