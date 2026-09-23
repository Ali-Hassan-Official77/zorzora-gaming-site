 "use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme, useToast } from "@/components/Providers";

const links = [
  ["Discover", "/"],
  ["All Games", "/games"],
  ["Trending", "/games?sort-by=popularity"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { notify } = useToast();

  function changeTheme() {
    toggleTheme();
    notify(theme === "dark" ? "Light mode enabled" : "Dark mode enabled", "info");
  }

  return (
    <header className="site-header sticky top-0 z-50">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="brand-link group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo.png" width={42} height={42} alt="ZorZora" className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" priority />
          <span className="font-display text-xl font-bold tracking-[-0.05em] sm:text-2xl">Zor<span>Zora</span></span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="nav-link rounded-full px-5 py-2.5 text-sm font-semibold">{label}</Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/games" aria-label="Search games" className="icon-button"><Search className="h-4 w-4" /></Link>
          <button onClick={changeTheme} className="icon-button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/games" className="primary-button">Explore games</Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={changeTheme} className="icon-button" aria-label="Toggle color theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen(!open)} className="icon-button" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-panel md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-5 pt-3 sm:px-8">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="mobile-link">{label}</Link>
            ))}
            <Link href="/games" onClick={() => setOpen(false)} className="primary-button mt-2 justify-center">Explore games</Link>
          </div>
        </div>
      )}
    </header>
  );
}
