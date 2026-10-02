# Automated Testing & Top-Rank Google SEO Protocol

Whenever the user asks to "test code", "run tests", "verify code", or "increase Google ranking", you MUST ALWAYS follow this protocol:

## 1. Automated Testing Engine
- **Unit & Component Testing:** Run `npm test` (powered by Vitest) to verify component logic, data integrity, and state machines.
- **Search Engine Crawler & E2E Testing:** Run `npm run test:seo` (powered by Microsoft Playwright) to simulate `Googlebot/2.1` and mobile devices. Verify:
  - Title tags (between 20 and 70 characters to prevent SERP truncation).
  - Meta description (between 50 and 300 characters, keyword-rich).
  - Canonical URL matching the active domain (zero unresolvable redirects).
  - Semantic heading hierarchy (single `<h1>` with core intent keywords).
  - JSON-LD structured data (`ProfessionalService`, `FAQPage`, `WebSite`, `BreadcrumbList`).
  - Accessibility and validity of `robots.txt` and `sitemap.xml`.

## 2. Beast-Level SEO Optimization Standard
- **Zero SPA Crawl Trap:** Always provide pre-rendered semantic HTML inside the root container (`<div id="app">`) so search engines receive full keyword copy on raw HTTP fetch without waiting for JavaScript.
- **Topical Authority & FAQs:** Maintain an on-page FAQ accordion matching the JSON-LD `FAQPage` schema to capture Google "People Also Ask" rich snippets.
- **Sitemap Hygiene:** Never include hash URL fragments (`#...`) in `sitemap.xml`. Include `<image:image>` and `<video:video>` metadata for multimedia indexing.
- **Site-Wide Audits:** Use Unlighthouse (`npm run audit:seo` or `npx unlighthouse --site <url>`) for automated Core Web Vitals (LCP, CLS, INP) audits.

## 3. Pre-Push Validation & Git Sync
- Always run `npm test`, `npm run test:seo`, and `npm run build` before pushing commits to GitHub.
