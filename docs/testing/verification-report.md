# TodoFusion Verification & Regression Report

## Build & Unit Verification
- `vitest run`: **5 / 5 tests passed** (`tests/unit/content.test.ts`).
- `tsc --noEmit`: **0 errors**.
- `next build`: **50 / 50 routes compiled and prerendered cleanly**.

## Production Preview Checks (`http://localhost:3000`)
- **Routes**: 44 / 44 internal routes returned HTTP `200`; `/nonexistent-route-check` returned HTTP `404`.
- **Assets**: `0` broken images across all 44 routes (`naturalWidth > 0`).
- **Layout Overflow**: `0` horizontal overflows on desktop (`1440x900`) across all 44 routes; `0` horizontal overflows at `320x700` across `/`, `/features`, `/pricing`, `/integrations`, `/about`, `/blog`, `/docs`, `/uikit`.
- **Dual Theme**:
  - Dark default body background: `rgb(18, 18, 24)`
  - Light toggled body background: `rgb(247, 247, 248)` (persisted across reload)
- **Interactive Controls Verified**:
  - Checklist Joy toggles `aria-checked` state
  - Share list Copy link displays `"Copied!"`
  - FAQ accordion expands answers
  - Pricing Testimonial Avatar Tabs switch between quotes
  - Helpcenter category filters (`Company`: 6 expandable buttons? Wait: 4 matching items + header/other) and live search (`privacy`: 3 matching items) update results
  - Docs live search locates `Task Automation`
  - Newsletter & Sales forms submit to local API routes with Zod validation

## Accessibility (`@axe-core/playwright`)
- `/features`: **0 violations**
- `/pricing`: **0 violations**
- `/helpcenter`: **0 violations**
- `/docs`: **0 violations**
- `/contact/sales`: **0 violations**
- `/`: **1 rule (`color-contrast`, 2 nodes)** inside the decorative hero mockup labels (`HomeHeroShowcase`).

## Visual Comparison (`pixelmatch`, `1440x3000` top slice)
- Dark Homepage vs Reference (`research/comparisons/home/dark/side-by-side.png`): `11.03%` pixel diff (`476,496` px), primarily attributable to live marquee logo position, Framer `"Made in Framer"` floating badge (intentionally omitted in independent Next.js build), and subtle vertical rhythm spacing differences in the lower bento fold.
- Light Homepage vs Reference: `12.32%` pixel diff (`532,438` px).
