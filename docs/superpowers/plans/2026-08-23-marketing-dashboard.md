# Marketing OS Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a separate dark Marketing OS dashboard with Overview, Analytics, CRM, Newsletter, and Connections experiences ready for future provider adapters.

**Architecture:** Scaffold `apps/dashboard` as an independent Next.js 16 App Router app, install the real shadcn `sidebar-01` block, then apply the Candyland registry theme. A shared dashboard layout owns navigation while route pages consume typed demonstration data and focused client components.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide icons, Vitest, Ego Lite.

---

### Task 1: Scaffold the dashboard application

**Files:**
- Replace: `apps/dashboard/README.md`
- Create: `apps/dashboard/package.json`
- Create: `apps/dashboard/app/*`
- Create: `apps/dashboard/components.json`

- [ ] Remove only the placeholder README in the isolated worktree.
- [ ] Run `pnpm dlx create-next-app@latest apps/dashboard --typescript --tailwind --eslint --app --import-alias "@/*" --use-pnpm --yes` from the worktree root.
- [ ] Remove any nested `pnpm-workspace.yaml` or lockfile generated inside `apps/dashboard`.
- [ ] Run `pnpm dlx shadcn@latest add sidebar-01 --yes` inside `apps/dashboard`.
- [ ] Run `pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/candyland.json --yes` inside `apps/dashboard`.
- [ ] Confirm `pnpm --filter dashboard lint` and `pnpm --filter dashboard build` pass before customization.

### Task 2: Add typed operating data with tests

**Files:**
- Create: `apps/dashboard/lib/data.ts`
- Create: `apps/dashboard/lib/metrics.ts`
- Create: `apps/dashboard/lib/metrics.test.ts`
- Modify: `apps/dashboard/package.json`

- [ ] Install Vitest and add `"test": "vitest run"`.
- [ ] Write failing tests for `filterContacts`, `filterCampaigns`, and `formatCompactCurrency`.
- [ ] Run `pnpm --filter dashboard test` and confirm failures are caused by missing implementations.
- [ ] Implement normalized Analytics, CRM, Newsletter, and connection types plus pure filtering/formatting helpers.
- [ ] Run the tests and confirm all pass.

### Task 3: Build the shared sidebar shell

**Files:**
- Create: `apps/dashboard/components/app-sidebar.tsx`
- Create: `apps/dashboard/components/dashboard-shell.tsx`
- Create: `apps/dashboard/components/topbar.tsx`
- Create: `apps/dashboard/app/(dashboard)/layout.tsx`
- Modify: `apps/dashboard/app/layout.tsx`
- Modify: `apps/dashboard/app/globals.css`

- [ ] Adapt the installed `sidebar-01` structure to Overview, Analytics, CRM, Newsletter, Connections, and Settings routes.
- [ ] Force dark mode at the document root and retain Candyland OKLCH tokens.
- [ ] Add the workspace switcher, command affordance, live/demo status, user menu, responsive sidebar trigger, and breadcrumb title.
- [ ] Add shared card, status, table, chart, and responsive layout styles using shadcn tokens.
- [ ] Start the app on port 3002 and open it in a dedicated Ego Lite task space.

### Task 4: Build Overview and Analytics

**Files:**
- Create: `apps/dashboard/app/(dashboard)/page.tsx`
- Create: `apps/dashboard/app/(dashboard)/analytics/page.tsx`
- Create: `apps/dashboard/components/metric-card.tsx`
- Create: `apps/dashboard/components/area-chart.tsx`
- Create: `apps/dashboard/components/overview-dashboard.tsx`
- Create: `apps/dashboard/components/analytics-dashboard.tsx`

- [ ] Build overview KPI cards, cross-channel chart, pipeline snapshot, campaign list, operating alerts, and activity timeline.
- [ ] Build Analytics date/channel controls, KPIs, performance chart, conversion funnel, source table, and campaign cards.
- [ ] Label all figures as demonstration data and expose the analytics connection state.
- [ ] Verify desktop layout and period toggles in Ego Lite.

### Task 5: Build CRM and Newsletter Operations

**Files:**
- Create: `apps/dashboard/app/(dashboard)/crm/page.tsx`
- Create: `apps/dashboard/app/(dashboard)/newsletter/page.tsx`
- Create: `apps/dashboard/components/crm-dashboard.tsx`
- Create: `apps/dashboard/components/newsletter-dashboard.tsx`

- [ ] Build CRM pipeline summaries, searchable/filterable contact table, detail drawer, stage control, and local note action.
- [ ] Build Newsletter audience KPIs, growth chart, campaign filters/table, sequence cards, list-health panel, and composer demonstration dialog.
- [ ] Verify filtering, empty states, drawer/dialog dismissal, and mobile table scrolling in Ego Lite.

### Task 6: Build Connections and verify the product

**Files:**
- Create: `apps/dashboard/app/(dashboard)/connections/page.tsx`
- Create: `apps/dashboard/app/(dashboard)/settings/page.tsx`
- Create: `apps/dashboard/components/connections-dashboard.tsx`

- [ ] Build three provider-neutral connection cards with permissions, data contracts, sync states, and local configure feedback.
- [ ] Build a minimal settings page for workspace identity, reporting timezone, and notification defaults.
- [ ] Run `pnpm --filter dashboard test`, `pnpm --filter dashboard lint`, `pnpm --filter dashboard build`, and `git diff --check`.
- [ ] Verify all routes, sidebar navigation, desktop/mobile layouts, interactive filters, dialogs, and drawers in Ego Lite.
- [ ] Confirm `apps/website` is unchanged and leave both localhost apps on separate ports.
