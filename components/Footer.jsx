import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Database, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" width={38} height={38} alt="ZorZora" />
              <span className="font-display text-xl font-bold tracking-[-.045em]">Zor<span className="brand-accent">Zora</span></span>
            </Link>
            <p className="footer-copy">A cinematic discovery space for free-to-play games. Browse the catalog, compare details and move from discovery to play without unnecessary friction.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="footer-chip"><Database /> FreeToGame data</span>
              <span className="footer-chip"><ShieldCheck /> No account required</span>
              <span className="footer-chip"><Sparkles /> Curated interface</span>
            </div>
          </div>
          <div><h3 className="footer-label">Explore</h3><ul className="footer-links"><li><Link href="/games">All games</Link></li><li><Link href="/games?sort-by=popularity">Trending</Link></li><li><Link href="/games?sort-by=release-date">New releases</Link></li></ul></div>
          <div><h3 className="footer-label">Platforms</h3><ul className="footer-links"><li><Link href="/games?platform=pc">PC games</Link></li><li><Link href="/games?platform=browser">Browser games</Link></li></ul></div>
          <div><h3 className="footer-label">Source</h3><ul className="footer-links"><li><a href="https://www.freetogame.com" target="_blank" rel="noreferrer">FreeToGame <ArrowUpRight /></a></li><li><Link href="/games">Catalog <ArrowUpRight /></Link></li></ul></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ZorZora. All rights reserved.</span><span>Game information and artwork supplied through the FreeToGame API.</span></div>
      </div>
    </footer>
  );
}
