"use client";

import { useState } from "react";
import { brand, navigation } from "@/content/site";
import { useStorefront } from "@/components/StorefrontProvider";

function MenuIcon({ open }: { open: boolean }) {
  return <span className="relative block h-4 w-5" aria-hidden="true"><span className={`absolute left-0 top-1 h-px w-5 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} /><span className={`absolute bottom-1 left-0 h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} /></span>;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { bagCount, openBag } = useStorefront();
  return <><div className="announcement">{brand.announcement}</div><header className="site-header"><a href="#top" className="wordmark" aria-label="VELORA home">VELORA</a><nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">{navigation.map((item) => <a key={item.href} className="nav-link" href={item.href}>{item.label}</a>)}</nav><div className="flex items-center gap-2"><button className="bag-button" type="button" onClick={openBag}>Bag <span aria-label={`${bagCount} items`}>({bagCount})</span></button><button className="icon-button md:hidden" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}><MenuIcon open={menuOpen} /></button></div>{menuOpen ? <nav className="mobile-menu" aria-label="Mobile navigation">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<span aria-hidden="true">↗</span></a>)}</nav> : null}</header></>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-mark">VELORA</div><div className="footer-grid"><div><p className="eyebrow text-[#a8ad9c]">Skin, returned to balance</p><p className="mt-4 max-w-sm text-sm leading-6 text-white/60">Elemental formulas and intelligent textures for a ritual simple enough to keep.</p></div><div><p className="footer-title">Explore</p>{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div><div><p className="footer-title">Follow</p><a href="#top">Instagram</a><a href="#top">Pinterest</a><a href="#top">TikTok</a></div><div><p className="footer-title">Care</p><a href="#science">Ingredients</a><a href="#ritual">How to use</a><a href="#top">Contact</a></div></div><div className="footer-bottom"><span>© 2026 VELORA — demonstration brand</span><span>Made for skin, designed for attention.</span></div></footer>;
}
