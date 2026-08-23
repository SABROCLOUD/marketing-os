# VELORA Skincare Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a complete, interactive, responsive VELORA skincare demonstration in `apps/website` with generated product imagery and selective ThreeUI effects.

**Architecture:** Keep `app/page.tsx` server-rendered and assemble focused section components around a typed brand-content module. Browser-only commerce state, selectors, drawers, dialogs, and WebGL scenes live in small Client Components; pure recommendation and cart calculations remain independently testable.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `@designcodeio/threeui`, Next Image, Vitest, OpenAI Image API, Ego Lite.

---

## File Map

- Modify `apps/website/app/layout.tsx`: VELORA metadata and font variables.
- Modify `apps/website/app/page.tsx`: semantic server-rendered page assembly.
- Modify `apps/website/app/globals.css`: brand tokens, global layout, accessibility, animation, and ThreeUI host rules.
- Replace `apps/website/components/Hero.tsx`: VELORA hero and sized ThreeUI liquid scene.
- Create `apps/website/content/site.ts`: typed navigation, product, routine, ingredient, testimonial, and journal content.
- Create `apps/website/lib/store.ts`: pure cart subtotal and concern-recommendation functions.
- Create `apps/website/lib/store.test.ts`: Vitest coverage for pure behavior.
- Create `apps/website/components/SiteChrome.tsx`: announcement bar, navigation, mobile menu, and footer.
- Create `apps/website/components/CommerceExperience.tsx`: product grid, concern selector, quick view, and bag drawer state.
- Create `apps/website/components/StorySections.tsx`: principles, science, ritual, editorial, proof, journal, and newsletter sections.
- Create `apps/website/components/ThreeScenes.tsx`: dynamically loaded, explicitly sized ThreeUI hosts and fallbacks.
- Create `apps/website/public/images/velora/*`: generated product and editorial imagery.
- Modify `apps/website/package.json`: add the Vitest test command and dependency.

### Task 1: Establish testable domain behavior

**Files:**
- Modify: `apps/website/package.json`
- Create: `apps/website/lib/store.test.ts`
- Create: `apps/website/lib/store.ts`

- [ ] **Step 1: Install the test runner**

Run:

```bash
pnpm --filter website add -D vitest
```

Add this script:

```json
"test": "vitest run"
```

- [ ] **Step 2: Write failing behavior tests**

Create tests that import missing functions and assert exact outcomes:

```ts
import { describe, expect, it } from "vitest";
import { calculateSubtotal, recommendRoutine } from "./store";

describe("calculateSubtotal", () => {
  it("sums product prices and quantities", () => {
    expect(calculateSubtotal([{ price: 58, quantity: 2 }, { price: 42, quantity: 1 }])).toBe(158);
  });
});

describe("recommendRoutine", () => {
  it("returns the hydration ritual for dry skin", () => {
    expect(recommendRoutine("dry").map((step) => step.productId)).toEqual([
      "dew-cleanse",
      "plump-serum",
      "barrier-cloud",
    ]);
  });
});
```

- [ ] **Step 3: Run tests and confirm RED**

Run `pnpm --filter website test` and expect failure because `lib/store.ts` does not exist.

- [ ] **Step 4: Implement minimal pure functions**

Create typed functions:

```ts
export type Concern = "dry" | "dull" | "sensitive";
export type CartLine = { price: number; quantity: number };
export type RoutineStep = { order: number; productId: string };

const routines: Record<Concern, RoutineStep[]> = {
  dry: [
    { order: 1, productId: "dew-cleanse" },
    { order: 2, productId: "plump-serum" },
    { order: 3, productId: "barrier-cloud" },
  ],
  dull: [
    { order: 1, productId: "dew-cleanse" },
    { order: 2, productId: "radiance-c" },
    { order: 3, productId: "barrier-cloud" },
  ],
  sensitive: [
    { order: 1, productId: "dew-cleanse" },
    { order: 2, productId: "plump-serum" },
    { order: 3, productId: "calm-veil" },
  ],
};

export const calculateSubtotal = (lines: CartLine[]) =>
  lines.reduce((total, line) => total + line.price * line.quantity, 0);

export const recommendRoutine = (concern: Concern) => routines[concern];
```

- [ ] **Step 5: Run tests and confirm GREEN**

Run `pnpm --filter website test`; expect all tests to pass.

### Task 2: Create the sector-swappable content boundary

**Files:**
- Create: `apps/website/content/site.ts`

- [ ] **Step 1: Define exported content types**

Define `NavItem`, `Product`, `ConcernOption`, `Ingredient`, `Testimonial`, and `JournalEntry`, including explicit image paths, prices, descriptions, usage, and alt text.

- [ ] **Step 2: Populate complete VELORA content**

Export `siteContent` with the approved brand statement, four core products (`dew-cleanse`, `plump-serum`, `radiance-c`, `barrier-cloud`), concern copy, cosmetic-safe ingredient claims, three testimonials labeled as demonstration stories, and three journal entries.

- [ ] **Step 3: Type-check the data boundary**

Run `pnpm --filter website exec tsc --noEmit`; expect exit code 0.

### Task 3: Generate and validate the image family

**Files:**
- Create: `tmp/imagegen/velora-assets.jsonl`
- Create: `apps/website/public/images/velora/hero-product.png`
- Create: `apps/website/public/images/velora/dew-cleanse.png`
- Create: `apps/website/public/images/velora/plump-serum.png`
- Create: `apps/website/public/images/velora/radiance-c.png`
- Create: `apps/website/public/images/velora/barrier-cloud.png`
- Create: `apps/website/public/images/velora/editorial-skin.png`
- Create: `apps/website/public/images/velora/ingredient-macro.png`

- [ ] **Step 1: Write one batch job per asset**

Each JSONL prompt uses `product-mockup` or `photorealistic-natural`, requests restrained ivory/mineral-green art direction, forbids watermarks and promotional text, and specifies the target aspect ratio.

- [ ] **Step 2: Run the bundled image CLI once**

Run the local `scripts/image_gen.py generate-batch` command with `--model gpt-image-1.5`, the supplied process-only `OPENAI_API_KEY`, and the website image directory as output. Do not write the key to disk.

- [ ] **Step 3: Inspect every result**

Open the generated contact sheet or each output and verify consistent packaging, no dominant garbled label text, correct composition, usable negative space, and no watermark.

- [ ] **Step 4: Remove temporary JSONL**

Delete only `tmp/imagegen/velora-assets.jsonl` after successful generation.

### Task 4: Build the brand shell and hero

**Files:**
- Modify: `apps/website/app/layout.tsx`
- Modify: `apps/website/app/globals.css`
- Modify: `apps/website/components/Hero.tsx`
- Create: `apps/website/components/SiteChrome.tsx`
- Create: `apps/website/components/ThreeScenes.tsx`

- [ ] **Step 1: Replace scaffold metadata and global tokens**

Set title to `VELORA — Skin, returned to balance`, write a factual demo description, define ivory/mineral/ink/clay tokens, smooth scrolling, focus rings, selection color, reduced-motion behavior, and explicit `.three-scene` sizing.

- [ ] **Step 2: Build accessible navigation**

Render real anchor links to `#shop`, `#ritual`, `#science`, and `#journal`, plus a keyboard-operable mobile menu and bag trigger.

- [ ] **Step 3: Replace the hyperspace hero**

Build a split editorial hero with the lead product image, concise copy, two real anchor CTAs, material badges, and an explicitly sized `LiquidFormBackground` layer using a warm tint. Keep a CSS material field behind the canvas as fallback.

- [ ] **Step 4: Verify the hero live**

Refresh Ego Lite, inspect the DOM and screenshot, and confirm the canvas has non-zero height, the product remains legible, and the header works at desktop and mobile widths.

### Task 5: Build commerce and recommendation interactions

**Files:**
- Create: `apps/website/components/CommerceExperience.tsx`

- [ ] **Step 1: Render the typed product grid**

Use `next/image`, semantic buttons, price and size labels, focus-visible states, and responsive cards.

- [ ] **Step 2: Add the quick-view dialog**

Open from each product card, present image, description, usage, price, and add-to-bag control; close on Escape and backdrop click; return focus to the opener.

- [ ] **Step 3: Add local bag behavior**

Maintain product quantities, show count and subtotal from `calculateSubtotal`, allow removal, and label checkout as a demonstration action with no processor.

- [ ] **Step 4: Add concern recommendations**

Render dry, dull, and sensitive controls; call `recommendRoutine`; show the resulting three-step product sequence without diagnostic language.

- [ ] **Step 5: Browser-test each state**

In Ego Lite, exercise product quick view, add-to-bag, quantity/count, removal, Escape close, concern changes, and mobile drawer layout.

### Task 6: Build the complete story sections

**Files:**
- Create: `apps/website/components/StorySections.tsx`
- Modify: `apps/website/app/page.tsx`

- [ ] **Step 1: Add principles and science**

Render three formulation principles and a split ingredient story with `CondensationBackground` in an explicitly sized host.

- [ ] **Step 2: Add ritual and editorial story**

Render morning/evening routine steps, the wide editorial image, ingredient details, and cosmetic-safe copy.

- [ ] **Step 3: Add proof, journal, and newsletter**

Render a keyboard-operable testimonial carousel, three journal cards, and a local newsletter form that validates an email and shows a no-network confirmation.

- [ ] **Step 4: Assemble the server page**

Compose `SiteChrome`, `Hero`, principles, `CommerceExperience`, science, ritual, editorial story, proof, journal, newsletter, and footer in semantic order.

- [ ] **Step 5: Inspect the complete page live**

Use Ego Lite full-page screenshots and scroll through every section, checking spacing, contrast, image crops, and motion continuity.

### Task 7: Final verification and cleanup

**Files:**
- Modify only files required by failures found during verification.

- [ ] **Step 1: Run automated verification**

Run:

```bash
pnpm --filter website test
pnpm --filter website lint
pnpm --filter website build
git diff --check
```

All commands must exit 0.

- [ ] **Step 2: Verify browser behavior**

Check desktop and mobile in Ego Lite, collect console errors, exercise every interactive control, and verify reduced-motion output.

- [ ] **Step 3: Audit scope and secrets**

Confirm `apps/dashboard` is unchanged, search tracked/untracked website files for API-key prefixes, and verify generated assets contain no embedded credentials or metadata of concern.

- [ ] **Step 4: Report exact state**

Summarize created files, generated assets, test/build outputs, live URL, known limitations, and the untouched user-owned handover state without claiming deployment.
