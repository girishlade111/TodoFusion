# Configuration & Environment Guide

## Central Site Config
`src/config/site.ts` centralizes:
- Brand name, tagline, and brand mark SVG path
- Header navigation items and Resources dropdown destinations (`/features`, `/integrations`, `/about`)
- Footer columns (`Pages`, `Products`, `Resources`) and social links
- Template purchase URL (`NEXT_PUBLIC_TEMPLATE_URL`)
- Creator attribution (`Stylokit` / `Dmytri Ivanov`)

## Environment Variables
See `.env.example`:
- `NEXT_PUBLIC_SITE_URL`: Canonical base URL for metadata, `robots.txt`, and `sitemap.xml`
- `NEXT_PUBLIC_TEMPLATE_URL`: Configurable CTA destination
- `FORM_ADAPTER`: `"demo"` (default local simulation) or `"webhook"`
- `SALES_WEBHOOK_URL`: Optional server-side webhook for `POST /api/contact/sales`
- `NEWSLETTER_WEBHOOK_URL`: Optional server-side webhook for `POST /api/newsletter`
