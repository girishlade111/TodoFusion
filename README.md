# TodoFusion Website Reconstruction

Independent Next.js 16 (App Router) + React 19 + TypeScript reconstruction of the [TodoFusion](https://todofusion.framer.website/) SaaS marketing website, interactive product showcase, integration directory, documentation portal, searchable help center, blog, and UI Kit.

## Key Features
- **44 Verified Internal Routes + Custom 404**:
  - 11 primary pages (`/`, `/features`, `/integrations`, `/about`, `/pricing`, `/blog`, `/privacy-policy`, `/contact`, `/helpcenter`, `/docs`, `/uikit`)
  - 1 sales subpage (`/contact/sales`)
  - 8 blog articles (`/blog/[slug]`)
  - 12 integration detail pages (`/integrations/[slug]`)
  - 12 documentation articles (`/docs/[slug]`)
  - `robots.txt`, `sitemap.xml`, and custom `404` page
- **Dual-Theme Design System**:
  - Measured CSS custom properties for Dark (`#121218` with `#17171d` 45-degree diagonal pattern) and Light (`#f7f7f8` with `#edeef1` pattern), zero-flash inline bootstrap script, and `localStorage` persistence.
- **Interactive Product Demonstrations**:
  - Hero macOS workspace with monotonic elapsed-time task timer and Finova editor canvas
  - 8-card asymmetric Productivity Bento (Time tracking, Focused Intervals with custom ARIA duration pickers, row-spanning Schedule tasks calendar + recurrence draft, Checklist Joy, Task Hub, Notes toolbar, Share list copy/email preview, Alerts)
  - 3-card Analytics Bento (SVG Donut chart, custom ARIA list & date filters, Punctuality segmented bar)
- **Authorized Local Assets & Typography**:
  - Locally bundled `Instrument Sans`, `Inter`, and `Fragment Mono` WOFF2 fonts and 105 SHA-256 deduplicated reference assets in `public/assets/`.
- **Configurable Local Form Adapters**:
  - Zod-validated, rate-limited `POST /api/newsletter` and `POST /api/contact/sales` endpoints (`demo` adapter by default, configurable via `.env.example`).

## Commands

```bash
npm install
npm run dev        # Development server
npm run typecheck  # TypeScript check
npm test           # Vitest unit tests
npm run lint       # ESLint check
npm run build      # Production build (50 static/SSG/API routes)
npm run start      # Production preview
```
