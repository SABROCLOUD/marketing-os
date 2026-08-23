# Marketing OS Dashboard

Dark-mode operating dashboard for Analytics, CRM, and Newsletter workflows.

## Local development

From the repository root:

```bash
pnpm --dir apps/dashboard exec next dev -p 3003
```

Or from this directory:

```bash
pnpm dev -- -p 3003
```

## Verification

```bash
pnpm test
pnpm lint
pnpm build
```

The current screens use clearly labeled demonstration data. Provider integrations are intentionally deferred until an analytics tool, CRM, and newsletter platform are selected.
