# TodoFusion Implementation Architecture

## Framework & Styling
- **Next.js 16 (App Router)** with React 19 and strict TypeScript.
- **Zero external UI kit bloat**: independent CSS Modules paired with centralized CSS custom properties (`src/styles/tokens.css`, `src/styles/themes/dark.css`, `src/styles/themes/light.css`, `src/styles/globals.css`).
- **No-Flash Theme System**: Inline `<script>` in `src/app/layout.tsx` reads `localStorage['todofusion-theme']` before paint, backed by `ThemeProvider` (`src/components/theme/ThemeProvider.tsx`).

## Routes (44 Verified + Custom 404 + APIs)
- Marketing Pages: `/`, `/features`, `/integrations`, `/about`, `/pricing`, `/privacy-policy`, `/contact`, `/contact/sales`, `/helpcenter`, `/uikit`
- Dynamic CMS Collections (statically generated via `generateStaticParams`):
  - `/blog` + 8 `/blog/[slug]` articles (`src/content/articles.ts`)
  - `/integrations` + 12 `/integrations/[slug]` pages (`src/content/integrations.ts`)
  - `/docs` + 12 `/docs/[slug]` guides (`src/content/docs.ts`)
- Authorized Form Adapters (Zod validated + rate-limited):
  - `POST /api/newsletter`
  - `POST /api/contact/sales`

## Interactive Demonstrations
- `HomeHeroShowcase`: Local monotonic elapsed-time task timer (`Web design`), toggleable task rows, Finova creative-editor canvas.
- `ProductivityBento`: Isolated local state across all 8 cards (overtime tracker, Focused Intervals switch + custom ARIA duration pickers, layered Schedule Tasks calendar + time/recurrence draft, Checklist Joy checkboxes, Task Hub list, Notes formatting toggles, Share List copy + email preview, Alerts dismiss/reset).
- `AnalyticsBento`: Lightweight SVG Donut Chart with custom ARIA list/date-range filters and Punctuality segmented bar.
- `HelpcenterView` & `DocumentationShell`: Real-time client-side search and category filtering across all 12 Helpcenter Q&As and 12 Documentation guides.
