import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
export default function WorkspaceLayout({ children }: { children: ReactNode }) { return <DashboardShell>{children}</DashboardShell>; }
