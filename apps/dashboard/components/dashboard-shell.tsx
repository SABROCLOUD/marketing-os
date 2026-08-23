import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  return <SidebarProvider><AppSidebar /><SidebarInset className="min-w-0 bg-background"><Topbar /><div className="dashboard-canvas">{children}</div></SidebarInset></SidebarProvider>;
}
