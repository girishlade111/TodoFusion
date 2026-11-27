# TodoFusion Reference Audit & Discovery Report

## Target
- Reference URL: `https://todofusion.framer.website/`
- Original Template Creator: Dmytri Ivanov / Stylokit
- Stack Observed: Framer SSR + React + Framer Motion (`__framer__appearAnimationsContent`, `__framer__breakpoints` at `min-width: 1200px`)

## Route Discovery Summary
- Total verified HTTP 200 internal routes: **44** (43 initial routes + 1 newly discovered blog detail route `/blog/the-art-of-user-centric-design` linked from Related Blogs).
- Custom 404 route verified at `/this-route-does-not-exist-404` (HTTP 404).
- `robots.txt` and `sitemap.xml` verified HTTP 200.

## Measured Typography & Fonts
Extracted via Chrome DevTools Protocol (`CSS.getPlatformFontsForNode`) and `@font-face` rules:
- Primary Display & Body Font: **Instrument Sans** (`400`, `500`, `600`, `700`, normal & italic)
- Secondary UI Font: **Inter** (`400`, `500`, `600`, `700`)
- Documentation Code Font: **Fragment Mono** (`400`)
- All WOFF2 font binaries downloaded locally into `public/assets/fonts/`.

## Dual-Theme System & Diagonal Background
- **Dark Theme (Default)**:
  - Page background: `#121218` (`rgb(18, 18, 24)`)
  - Diagonal texture: `repeating-linear-gradient(45deg, #17171d, #17171d 1px, transparent 1px, transparent 4px)`
  - Primary card surface: `#1b1b21`
  - Secondary / inset surface: `#09090f` / `#121218`
  - Elevated surface / border: `#24242a`
  - Primary text: `#ffffff`, secondary text: `#94979e`, muted heading fragment: `#61646b`
  - Primary accent purple: `#8624ff` (hover `#7808ff`, light accent `#9f75ff`)
- **Light Theme (Manual Toggle)**:
  - Page background: `#f7f7f8` (`rgb(247, 247, 248)`)
  - Diagonal texture: `repeating-linear-gradient(45deg, #edeef1, #edeef1 1px, transparent 1px, transparent 4px)`
  - Primary card surface: `#ffffff`
  - Secondary / inset surface: `#f1f2f4`
  - Primary text: `#121218`, secondary text: `#61646b`, muted heading fragment: `#94979e`
  - Pricing contrast inversion: Monthly card is white `#ffffff`, Lifetime card flips to dark `#121218` with purple glow.

## Acquired Original Assets
- 105 unique assets downloaded, SHA-256 deduplicated, and validated in `research/manifests/assets.json`, stored in `assets-source/original/` and served from `public/assets/`.
