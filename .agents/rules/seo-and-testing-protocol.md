# The Unified 2-Tool Standard for Testing & SEO (Universal Across Any Project)

Whenever the user asks to "test code", "verify code", or "increase Google ranking", you MUST use EXACTLY these two industry-standard tools across ANY project:

## 1. The Single Testing Tool: Microsoft Playwright (`@playwright/test`)
- **Storage:** ~17.7 MB in project dependencies.
- **Why it is the best for ANY project:**
  - Works universally with React, Next.js, Vue, Svelte, Node.js, Python, PHP, or plain HTML.
  - Runs real end-to-end (E2E) testing across Desktop Chrome, Mobile Chrome, and Googlebot.
  - Tests user journeys, forms, buttons, APIs, route transitions, and catches runtime JavaScript errors.
- **Execution:** `npm test` (or `npx playwright test`).

## 2. The Single SEO Tool: Google Lighthouse (`lighthouse`)
- **Storage:** ~18.3 MB in project dependencies (or 0 MB on-demand via `npx lighthouse`).
- **Why it is the best for ANY project:**
  - It is Google's official search engine audit engine used to determine real-world ranking and indexing.
  - Tests Title tags, Meta descriptions, Canonical links, Open Graph, H1 headings, Robots.txt, Sitemap validity, and Core Web Vitals (LCP, CLS, INP).
  - Guarantees 100/100 Technical SEO compliance before production deployment.
- **Execution:** `npm run audit:seo` (or `npx lighthouse <url> --only-categories=seo`).

## 3. SEO Ranking Architecture Rules (All Projects)
- **Zero SPA Crawl Trap:** Always provide pre-rendered semantic HTML inside root containers (`<div id="app">` or `<div id="root">`) so search engines receive full keyword copy on raw HTTP fetch.
- **Valid URLs Only:** Zero `#` hash fragments in `sitemap.xml`.
- **JSON-LD Structured Data:** Embed valid schema (`ProfessionalService`, `FAQPage`, `BreadcrumbList`).
- **Pre-Push Validation:** Ensure `npm test` and `npm run build` pass cleanly before pushing to GitHub.
