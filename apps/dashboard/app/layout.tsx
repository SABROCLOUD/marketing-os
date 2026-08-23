import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const sans = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"] });
export const metadata: Metadata = { title: "Marketing OS", description: "One operating system for analytics, CRM, and newsletter growth." };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}><body><TooltipProvider>{children}</TooltipProvider></body></html>; }
