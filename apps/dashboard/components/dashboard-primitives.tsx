import type { CSSProperties, ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, PlugZap } from "lucide-react";

import type { TrendPoint } from "@/lib/data";

const tones = { pink: "var(--chart-1)", lime: "var(--chart-2)", cyan: "var(--chart-3)", yellow: "var(--chart-5)" };

export function PageIntro({ title, description, actions }: { title: string; description: string; actions?: ReactNode }) {
  return <div className="toolbar"><div><h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">{description}</p></div>{actions}</div>;
}

export function MetricCard({ label, value, change, detail, tone = "pink" }: { label: string; value: string; change: string; detail: string; tone?: keyof typeof tones }) {
  const positive = !change.startsWith("-");
  return <article className="metric-card" style={{ "--metric-accent": tones[tone] } as CSSProperties}><div className="metric-card__top"><span>{label}</span><span className={positive ? "trend-up" : "text-destructive"}>{positive ? <ArrowUpRight className="inline size-3" /> : <ArrowDownRight className="inline size-3" />}{change}</span></div><p className="metric-card__value">{value}</p><div className="metric-card__foot"><span>{detail}</span><span className="font-mono">30D</span></div></article>;
}

export function AreaChart({ data, primaryLabel = "Reach", secondaryLabel = "Conversions" }: { data: TrendPoint[]; primaryLabel?: string; secondaryLabel?: string }) {
  const width = 800; const height = 250; const pad = 24;
  const points = (key: "primary" | "secondary") => data.map((point, index) => `${pad + (index * (width - pad * 2)) / (data.length - 1)},${height - pad - (point[key] / 100) * (height - pad * 2)}`).join(" ");
  const area = `${pad},${height - pad} ${points("primary")} ${width - pad},${height - pad}`;
  return <div className="chart-shell"><div className="mb-3 flex items-center gap-5 text-[10px] text-muted-foreground"><span><i className="mr-2 inline-block size-2 rounded-full bg-primary" />{primaryLabel}</span><span><i className="mr-2 inline-block size-2 rounded-full bg-accent" />{secondaryLabel}</span></div><svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img" aria-label={`${primaryLabel} and ${secondaryLabel} trend chart`} preserveAspectRatio="none"><defs><linearGradient id="area-pink" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity=".3" /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" /></linearGradient></defs>{[25,75,125,175,225].map((y) => <line key={y} x1="24" x2="776" y1={y} y2={y} className="chart-grid-line" />)}<polygon points={area} fill="url(#area-pink)" /><polyline points={points("primary")} fill="none" stroke="var(--chart-1)" strokeWidth="3" vectorEffect="non-scaling-stroke" /><polyline points={points("secondary")} fill="none" stroke="var(--chart-3)" strokeWidth="2" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />{data.filter((_, index) => index % 2 === 0).map((point, index) => <text key={point.label} x={pad + ((index * 2) * (width - pad * 2)) / (data.length - 1)} y="246" className="chart-label">{point.label}</text>)}</svg></div>;
}

export function ConnectionNotice({ module }: { module: string }) {
  return <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground"><PlugZap className="size-4" /></span><div><p className="text-xs font-medium">{module} is showing demonstration data</p><p className="text-[10px] text-muted-foreground">Connect your provider when you are ready to activate live sync.</p></div></div><a href="/connections" className="ghost-button">View connection</a></div>;
}
