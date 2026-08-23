# VELORA Skincare Website Design

## Objective

Build a complete, premium, interactive skincare marketing website inside `apps/website`. VELORA is the demonstration brand; Marketing OS remains sector-agnostic and `apps/dashboard` is unchanged.

The experience should feel editorial, tactile, and calm rather than like a generic ecommerce template or a technology product with skincare copy pasted onto it.

## Experience Direction

VELORA uses warm ivory, mineral green, soft pearl, muted clay, and near-black. Typography combines an expressive editorial display face with a restrained sans-serif system. Photography emphasizes translucent serum, stone, glass, water, and real skin texture.

Motion supports the product story:

- liquid material in the hero;
- condensation and pointer response around ingredient storytelling;
- restrained reveal, hover, parallax, and horizontal-drag interactions;
- reduced-motion and non-WebGL fallbacks for accessibility and resilience.

ThreeUI is used selectively. A small number of deliberate effects is preferable to several simultaneous canvases competing with the products.

## Information Architecture

The single-page experience contains:

1. Announcement bar and responsive navigation.
2. Immersive hero introducing VELORA and the lead product.
3. Trust and formulation principles strip.
4. Bestselling product collection with quick-view interactions.
5. Skin-concern selector that recommends a three-step ritual.
6. Ingredient and formulation story with a restrained ThreeUI treatment.
7. Routine timeline explaining morning and evening use.
8. Editorial lifestyle story.
9. Customer proof and testimonial carousel.
10. Journal cards, newsletter capture, and full footer.
11. Product quick-view dialog and local demonstration bag drawer.

This is a polished marketing and commerce demonstration. It does not include payment processing, authentication, inventory, or a production checkout backend.

## Architecture

### Server-rendered shell

`app/page.tsx` remains a Server Component that assembles semantic page sections and supplies stable content. Metadata in `app/layout.tsx` describes VELORA instead of the default Next.js scaffold.

### Client interaction islands

Browser-dependent behavior is isolated into focused Client Components:

- ThreeUI/WebGL scenes;
- mobile navigation;
- product quick view and bag state;
- concern selector;
- testimonial and product carousels;
- pointer and scroll-driven decoration.

This prevents the entire page from becoming one large Client Component and keeps the initial HTML useful when JavaScript or WebGL is unavailable.

### Content boundary

Brand copy, navigation, products, routines, ingredients, testimonials, and journal entries live in typed data modules rather than being spread across component markup. Shared presentation components consume those interfaces. Replacing VELORA with another vertical should primarily mean replacing content, assets, tokens, and selected scenes rather than rewriting the overall page shell.

This boundary does not pretend that a skincare layout automatically fits manufacturing or supply chain. It makes the demo replaceable without coupling the future dashboard or monorepo to skincare.

### Styling

Tailwind utilities handle layout and responsive behavior. `globals.css` owns brand tokens, resets, accessibility defaults, reusable animation primitives, and ThreeUI host sizing overrides. Component-specific styling stays near the component when it cannot be expressed clearly as utilities.

### ThreeUI integration

ThreeUI components use package subpath imports. WebGL hosts receive explicit sizes so library wrappers cannot collapse. Heavy effects are dynamically loaded where appropriate and mounted only where visible. The primary candidates are:

- `LiquidFormBackground` for the hero;
- `CondensationBackground` or `FluidFieldBackground` for one formulation section;
- `LiquidMetalButton` only if it remains semantically and visually appropriate after browser inspection.

The existing `WarpFieldBackground` experiment is preserved in history but replaced because hyperspace motion does not match the approved skincare direction.

## Image Generation

Use the bundled OpenAI image-generation workflow with the normal `OPENAI_API_KEY`. Do not use Azure credentials and do not store the key in tracked files.

Generate a coherent asset family under `apps/website/public/images/velora/`:

- one hero product still with negative space;
- three or four consistent product packshots;
- one wide editorial skin-and-water photograph;
- one ingredient/material macro photograph;
- optional transparent product cutouts if composition requires them.

Use case slugs are `product-mockup` for packaging and `photorealistic-natural` for editorial photography. Images contain no generated promotional text or watermarks. Product labels remain minimal so minor AI text imperfections do not become focal content. Final outputs are visually inspected before integration.

The installed skill currently defines `gpt-image-1.5` as its supported default. Use that model through the OpenAI Python SDK unless the local skill is updated with a verified newer identifier before generation.

## Interaction Model

- Navigation anchors scroll to real sections and remain keyboard accessible.
- Product cards expose hover/focus detail, open a quick-view dialog, and can add an item to the local bag.
- The bag drawer updates count and subtotal locally; checkout is explicitly a demo action.
- The concern selector changes recommendations without claiming medical diagnosis.
- Carousels support buttons, touch dragging where practical, and keyboard navigation.
- Motion follows `prefers-reduced-motion`; core content remains readable with animation disabled.
- Dialogs and drawers manage focus, Escape, labels, and background scroll.

## Claims and Content Safety

Copy uses cosmetic language such as “supports hydration,” “helps reinforce the moisture barrier,” and “visibly softens.” It avoids disease treatment, guaranteed outcomes, fabricated clinical percentages, or unverified dermatologist claims. Testimonials are clearly demo content and do not invent measurable medical results.

## Error and Fallback Behavior

- WebGL failure shows a composed color/material background and product image rather than a blank area.
- Generated images use fixed dimensions and descriptive alt text to avoid layout shift.
- Interactive sections retain usable static defaults before hydration.
- Newsletter submission returns a local demonstration confirmation and makes no network request.
- Missing optional imagery degrades to a branded material field rather than a broken image icon.

## Performance Constraints

- Prefer no more than one prominent active WebGL scene in the viewport.
- Cap rendering density through the library defaults and avoid unnecessary full-page canvases.
- Use Next Image for responsive raster delivery.
- Lazy-load below-the-fold client effects.
- Avoid autoplay video and large external runtime assets.
- Maintain readable contrast and a stable layout on mobile widths.

## Verification

Completion requires:

1. `pnpm --filter website lint` passes.
2. `pnpm --filter website build` passes.
3. The page loads without browser console errors.
4. Desktop and mobile screenshots are visually inspected in Ego Lite.
5. Navigation, selector, quick view, add-to-bag, bag drawer, carousel, and newsletter states are exercised.
6. Reduced-motion and WebGL/static fallbacks are checked.
7. Only `apps/website` plus project documentation and intentionally generated site assets are changed.
8. The existing user-owned uncommitted work is preserved or deliberately superseded with an explicit diff.

## Definition of Done

The localhost URL presents a complete VELORA skincare experience rather than a hero-only prototype. The page is visually polished on desktop and mobile, the main interactions work, generated imagery is integrated coherently, ThreeUI reinforces the material story, and the dashboard remains untouched.
