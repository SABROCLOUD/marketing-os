# Marketing OS Dashboard Design

## Objective

Build a separate dark-mode dashboard in `apps/dashboard` that acts as the operating shell for three future tool integrations: Analytics, CRM, and Newsletter Operations. This phase builds the product UI and integration boundaries only; it does not connect external services.

## Product Direction

The dashboard uses shadcn's `sidebar-01` block as its structural foundation and the TweakCN Candyland theme as its token foundation. The dark palette is controlled rather than childish: near-black graphite surfaces, thin neutral borders, and selective pink, cyan, lime, and yellow accents for meaning and hierarchy.

The interface should feel like an active operations room: dense enough to be useful, calm enough to scan, and expressive enough to demonstrate a distinct product.

## Information Architecture

### Global shell

- Collapsible desktop sidebar and mobile drawer.
- Workspace switcher labeled `Marketing OS` with an `All systems` context.
- Primary navigation: Overview, Analytics, CRM, Newsletter.
- Secondary navigation: Connections and Settings.
- Global search / command affordance, date range, notifications, and user menu.
- Persistent connection-health summary in the sidebar footer.

### Overview

The home screen is a cross-system briefing:

- total reach, qualified leads, newsletter subscribers, and attributed revenue;
- channel-performance chart;
- pipeline snapshot;
- recent campaigns;
- operating alerts and connection status;
- compact activity timeline spanning all three modules.

### Analytics

- date-range and channel controls;
- traffic, conversion, acquisition, and revenue KPIs;
- multi-series performance chart;
- source/channel table;
- conversion funnel;
- campaign performance cards;
- connection placeholder for the future analytics tool.

### CRM

- pipeline counts and total value;
- stage distribution;
- searchable and filterable contact table;
- lead/contact detail drawer;
- owner, status, source, value, and last-touch fields;
- local actions for changing stage and adding a note;
- connection placeholder for the future CRM tool.

### Newsletter Operations

- subscriber count, growth, open rate, click rate, and attributed revenue;
- audience growth chart;
- campaigns table with draft, scheduled, and sent states;
- lightweight composer entry point;
- sequence/automation cards;
- list health and deliverability panel;
- connection placeholder for the future newsletter tool.

### Connections

Three provider-neutral adapter cards—Analytics, CRM, and Newsletter—show what data each connection will supply, expected permissions, sync status, and a non-destructive `Configure` demonstration action. No vendor is assumed until the user names the tools.

## Architecture

The dashboard is an independent Next.js App Router app in `apps/dashboard`, with its own package scripts and deployment boundary. It shares only the root pnpm workspace and git history with the website.

Route groups use a shared dashboard layout:

- `app/(dashboard)/layout.tsx` owns `SidebarProvider`, `AppSidebar`, and the inset shell.
- Each page remains server-rendered where possible.
- Focused Client Components own filters, drawers, chart toggles, sidebar state, and demo actions.
- Typed mock data lives in `lib/data.ts`.
- Provider-neutral interfaces live in `lib/integrations.ts` so future adapters replace data sources rather than UI components.

Charts are lightweight SVG/React components built from local mock data. This avoids adding a charting dependency before the real analytics payload shape is known.

## Styling

Install and retain the actual `sidebar-01` registry structure and Candyland theme variables. The document is forced into dark mode at the root.

Candyland accent roles:

- pink: primary actions and revenue;
- cyan: analytics and information;
- lime: healthy systems and positive movement;
- yellow: attention and scheduled work;
- coral/red: risk or destructive states.

Cards use modest radii, one-pixel borders, minimal shadows, and strong typographic hierarchy. Accent colors appear in small regions, charts, icons, and statuses—not as full-screen neon decoration.

## Interaction Model

- Sidebar links navigate to real routes and expose the active page.
- Sidebar collapse works on desktop; the sheet variant works on mobile.
- Overview and Analytics date controls update the displayed mock series.
- CRM search and stage filters change visible rows.
- Selecting a CRM record opens an accessible detail drawer.
- Newsletter campaign filters change visible campaign rows.
- Create, export, sync, and configure actions display explicit demonstration feedback without pretending to call external services.
- Keyboard focus, Escape dismissal, and reduced-motion behavior are supported.

## Data and Integration Boundary

Each module consumes a normalized provider-neutral shape. Future tool adapters will map external responses into these shapes:

- `AnalyticsSnapshot` and `ChannelMetric`;
- `CrmContact`, `PipelineStage`, and `CrmActivity`;
- `NewsletterCampaign`, `AudienceMetric`, and `AutomationSequence`.

Every module includes four connection states: `disconnected`, `connecting`, `healthy`, and `error`. This phase defaults to demonstration data plus a visibly labeled connection status; it never represents mock data as live.

## Error and Empty States

- Disconnected tools show setup guidance without blocking navigation.
- Empty tables explain which filter removed the data and offer a reset.
- Failed mock actions show inline feedback.
- Charts retain labels and summaries when animation is disabled.
- Mobile layouts prioritize primary metrics and allow wide tables to scroll.

## Verification

Completion requires:

1. Dashboard unit tests pass for provider-neutral calculations and filtering.
2. ESLint and the Next.js production build pass.
3. Overview, Analytics, CRM, Newsletter, and Connections routes render.
4. Sidebar navigation, mobile drawer, filters, CRM detail drawer, and demo actions are exercised in Ego Lite.
5. Desktop and mobile screenshots are visually inspected.
6. The dashboard runs on a port distinct from the website.
7. `apps/website` remains unchanged in the dashboard worktree.

## Definition of Done

The dashboard feels like a coherent Marketing OS rather than three unrelated templates. A viewer can move among the modules, understand the operating picture, inspect representative records and campaigns, and see exactly where future tools will connect—without any false implication that external data is already live.
