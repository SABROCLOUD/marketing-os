"use client";

import dynamic from "next/dynamic";

const LiquidFormBackground = dynamic(() => import("@designcodeio/threeui/components/LiquidFormBackground").then((module) => module.LiquidFormBackground), { ssr: false });
const CondensationBackground = dynamic(() => import("@designcodeio/threeui/components/CondensationBackground").then((module) => module.CondensationBackground), { ssr: false });

export function HeroLiquidScene() {
  return <div className="three-scene three-scene--hero" aria-hidden="true"><LiquidFormBackground className="!absolute !inset-0 !h-full !w-full" speed={0.45} morph={0.78} noiseScale={0.72} mouseAmount={0.12} metal={0.62} camera={6.6} tintHue={76} tintAmount={0.3} /></div>;
}

export function CondensationScene() {
  return <div className="three-scene three-scene--condensation" aria-hidden="true"><CondensationBackground className="!absolute !inset-0 !h-full !w-full" speed={0.36} dropAmount={0.75} opacity={0.5} /></div>;
}
