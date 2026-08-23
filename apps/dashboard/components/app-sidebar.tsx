"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cable, ChartNoAxesCombined, ChevronDown, ContactRound, LayoutDashboard, MailOpen, Settings2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarSeparator } from "@/components/ui/sidebar";

const primary = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Analytics", url: "/analytics", icon: ChartNoAxesCombined, badge: "Live" },
  { title: "CRM", url: "/crm", icon: ContactRound, badge: "286" },
  { title: "Newsletter", url: "/newsletter", icon: MailOpen, badge: "3" },
];
const system = [
  { title: "Connections", url: "/connections", icon: Cable },
  { title: "Settings", url: "/settings", icon: Settings2 },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return <Sidebar collapsible="icon" {...props}>
    <SidebarHeader className="border-b border-sidebar-border p-3"><SidebarMenu><SidebarMenuItem><SidebarMenuButton size="lg" tooltip="Marketing OS" className="h-12"><div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Sparkles className="size-4" /></div><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">Marketing OS</span><span className="truncate text-xs text-muted-foreground">All systems</span></div><ChevronDown className="ml-auto size-4" /></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarHeader>
    <SidebarContent className="pt-3"><SidebarGroup><SidebarGroupLabel>Operate</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{primary.map((item) => <SidebarMenuItem key={item.url}><SidebarMenuButton tooltip={item.title} isActive={pathname === item.url} render={<Link href={item.url} />}><item.icon /><span>{item.title}</span>{item.badge ? <Badge className="ml-auto h-5 rounded-md border-0 bg-sidebar-accent px-1.5 text-[10px] text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden">{item.badge}</Badge> : null}</SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup><SidebarSeparator /><SidebarGroup><SidebarGroupLabel>System</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{system.map((item) => <SidebarMenuItem key={item.url}><SidebarMenuButton tooltip={item.title} isActive={pathname === item.url} render={<Link href={item.url} />}><item.icon /><span>{item.title}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent>
    <SidebarFooter className="border-t border-sidebar-border p-3"><div className="connection-pulse"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-secondary" /></span><div><strong>Demo workspace</strong><small>3 connectors ready</small></div></div></SidebarFooter><SidebarRail />
  </Sidebar>;
}
