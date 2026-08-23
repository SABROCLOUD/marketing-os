"use client";

import { usePathname } from "next/navigation";
import { Bell, CalendarDays, Command, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const titles: Record<string, { eyebrow: string; title: string }> = {
  "/": { eyebrow: "Cross-system command", title: "Overview" }, "/analytics": { eyebrow: "Acquisition intelligence", title: "Analytics" },
  "/crm": { eyebrow: "Relationship pipeline", title: "CRM" }, "/newsletter": { eyebrow: "Audience operations", title: "Newsletter" },
  "/connections": { eyebrow: "Data infrastructure", title: "Connections" }, "/settings": { eyebrow: "Workspace controls", title: "Settings" },
};

export function Topbar() {
  const pathname = usePathname(); const current = titles[pathname] ?? titles["/"];
  const [searchOpen,setSearchOpen]=useState(false); const [notificationsOpen,setNotificationsOpen]=useState(false); const [query,setQuery]=useState("");
  const destinations=useMemo(()=>Object.entries(titles).filter(([,item])=>item.title.toLowerCase().includes(query.toLowerCase())),[query]);
  useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();setSearchOpen(true)}if(event.key==="Escape"){setSearchOpen(false);setNotificationsOpen(false)}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
  return <><header className="topbar"><div className="flex min-w-0 items-center gap-3"><SidebarTrigger className="-ml-1" /><div className="hidden h-5 w-px bg-border sm:block" /><div className="min-w-0"><p className="page-eyebrow">{current.eyebrow}</p><h1 className="truncate text-lg font-semibold tracking-tight">{current.title}</h1></div></div><div className="relative flex items-center gap-2"><button className="command-search" type="button" aria-label="Open command search" onClick={()=>setSearchOpen(true)}><Search className="size-4" /><span>Search anything</span><kbd><Command className="size-3" />K</kbd></button><button className="topbar-pill hidden sm:flex" type="button"><CalendarDays className="size-4" />May 15 — Jun 14</button><button className="icon-control" type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={()=>setNotificationsOpen((value)=>!value)}><Bell className="size-4" /><span className="notification-dot" /></button><Avatar className="size-8 border border-border"><AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">HV</AvatarFallback></Avatar>{notificationsOpen?<div className="notification-menu"><p className="page-eyebrow">Notifications</p><strong>3 operating signals</strong><span>14 qualified leads need follow-up</span><span>Campaign scheduled for Aug 25</span><span>All connector schemas are ready</span></div>:null}</div></header>{searchOpen?<div className="command-backdrop" onMouseDown={(event)=>{if(event.currentTarget===event.target)setSearchOpen(false)}}><section className="command-panel" role="dialog" aria-modal="true" aria-label="Command search"><div className="flex items-center gap-3 border-b border-border px-4"><Search className="size-4 text-muted-foreground"/><input autoFocus value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search pages and modules…" aria-label="Search pages and modules"/><kbd>ESC</kbd></div><div className="p-2"><p className="page-eyebrow px-2 py-2">Jump to</p>{destinations.map(([href,item])=><a key={href} href={href} onClick={()=>setSearchOpen(false)}><span>{item.title}</span><small>{item.eyebrow}</small></a>)}</div></section></div>:null}</>;
}
