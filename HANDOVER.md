# Handover — marketing-os

Status snapshot as of this session. Written so work can continue in another tool (e.g. Codex) with no missing context.

## What this project is

A single git repo (monorepo, pnpm workspaces) meant to hold two separate apps:

- `apps/website` — public marketing site, Three.js-heavy, in progress.
- `apps/dashboard` — internal/marketing dashboard, shadcn/ui, **not started** (placeholder only).

Decision made and confirmed with the user: **one monorepo**, not two separate repos. Rationale: single git history, shared workspace tooling, independent deploys still possible later (each app gets its own Vercel project pointed at its subfolder).

## Repo state

- Git initialized at repo root. One commit so far: `2772245 Scaffold marketing-os monorepo with website app`.
- **Uncommitted changes right now** (not committed — left for you/Codex to review before committing):
  - Modified: `apps/website/app/page.tsx`
  - New: `apps/website/components/Hero.tsx`

Run `git status` / `git diff` before committing to review.

## Tooling

- Package manager: **pnpm**, workspace defined in root `pnpm-workspace.yaml` (`apps/*`, `packages/*`).
- Root `package.json` has convenience scripts: `dev:website`, `dev:dashboard`, `build:website`, `build:dashboard`.
- No Turborepo — deliberately skipped; only worth adding once there's real cross-package build dependency (e.g. a shared `packages/ui`), which doesn't exist yet.

## apps/website

- Scaffolded via `create-next-app`: Next.js 16 (App Router), TypeScript, Tailwind v4, ESLint.
- Installed dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `@designcodeio/threeui` (+ `@types/three` dev dep).
- **Important gotcha already fixed once**: `create-next-app` generates its own nested `pnpm-workspace.yaml` + `pnpm-lock.yaml` inside `apps/website`, which fragments the monorepo into two workspace roots. I deleted both and moved the one setting it had (`ignoredBuiltDependencies: [sharp, unrs-resolver]`) into the root `pnpm-workspace.yaml`. If you scaffold `apps/dashboard` the same way, check for and remove the same nested files again.
- `pnpm --filter website build` passes clean (verified).

### `@designcodeio/threeui` — what it actually is

This is **not** a template to clone in. It's an npm package published from https://github.com/MengTo/threeui — a library of ~100 standalone React/Three.js/WebGL components (shaders, effects, buttons, full landing-page components). Already installed and confirmed working at the type level.

- Full component list: `node_modules/@designcodeio/threeui/lib-dist/index.d.ts`
- Canonical usage pattern (from the package's own README):
  ```tsx
  import { WarpFieldBackground } from "@designcodeio/threeui/components/WarpFieldBackground";
  import "@designcodeio/threeui/style.css";
  ```
  Subpath imports (`@designcodeio/threeui/components/X`) keep bundle size down — prefer these over the barrel import.
- Some components (full landing pages like `KageLandingPage`, `SylvaHero`, `MengToSketchbookLandingPage`) render full HTML documents and need runtime asset files copied from `lib-dist/assets/` into your `public/` dir, or a `sourceUrl`/`assetBaseUrl` prop override. The component currently in use (`WarpFieldBackground`) is **not** one of those — it's self-contained, no asset copying needed.
- ⚠️ The package's README usage example references a component called `AtTheHorizon` — **that component does not exist in this (Community/free) build.** I checked; it's presumably a Pro-only component and the README wasn't edition-specific. Don't chase that name — use one from the actual export list in `index.d.ts`.

### `Hero.tsx` — current state and a live bug

`apps/website/components/Hero.tsx` renders a full-screen hero using `WarpFieldBackground` (variant `"hyperspace"`) as a background behind headline text, wired into `apps/website/app/page.tsx`.

**Known unresolved bug:** the WebGL effect is not visually rendering (page loads fine, headline/CTA show, zero console errors, HTTP 200 — but the canvas ends up with `height: 0`).

Root cause (confirmed via `getComputedStyle`): I passed `className="absolute inset-0 -z-10"` to `WarpFieldBackground` to make it a full-bleed background. But the library's own stylesheet (`@designcodeio/threeui/style.css`) contains:
```css
.threeui-background{position:relative; ...}
```
This class is applied to the same wrapper element my `className` lands on. Because Next.js loads that component-level CSS import *after* the global Tailwind stylesheet in the cascade, `position: relative` (library) beats `position: absolute` (my Tailwind utility) at equal specificity — last one in the cascade wins. With `position: relative` instead of `absolute`, the `inset-0` utility does nothing (inset only affects absolutely/fixed-positioned boxes), and the wrapper collapses to 0 height.

**Fix identified but not yet applied** (ran out of runway this session): force the utility to win with Tailwind's important modifier:
```tsx
<WarpFieldBackground className="!absolute !inset-0 -z-10" variant="hyperspace" speed={0.6} hue={210} />
```
`!absolute` compiles to `position: absolute !important`, which will beat the library rule regardless of import order. That single-word change is the next thing to try — I'd verify visually (screenshot or just eyeball the dev server) after applying it.

## Local dev / preview notes

- `.claude/launch.json` exists, configured to run `pnpm --filter website dev` with `autoPort: true` (port 3000 was already occupied by another process during this session — likely a leftover dev server from earlier in the session, PID was ~79301 at the time). If port 3000 is still stuck, find and kill it:
  ```bash
  lsof -i :3000
  kill <PID>
  ```
- The in-app browser preview tool on this install does **not** support attach-to-existing-URL mode — only start-a-command mode. Don't bother with a `"url"`-only launch config here.

## Not started yet

- `apps/dashboard` — only a placeholder `README.md` with the intended scaffold command (`create-next-app` + `shadcn@latest init`). No code.
- No shared `packages/` anything (intentionally deferred — see root `README.md` reasoning).

## Suggested next steps

1. Apply the `!absolute !inset-0` fix in `Hero.tsx`, confirm the warp field actually renders.
2. Review and commit the current uncommitted diff (`page.tsx`, `components/Hero.tsx`).
3. Continue building out the website's sections/pages using more `@designcodeio/threeui` components from `index.d.ts`.
4. Dashboard scaffold comes later, per your own plan — not blocking anything above.
