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

---

## 3. How the 2-Tool Rule Governs Every Installed Frontend Plugin & Framework

Whenever testing or optimizing for search ranking, evaluate each installed frontend tool through the dual Playwright + Lighthouse lens:

### A. React 19 & React Router (`react`, `react-dom`, `react-router-dom`)
- **Testing (Playwright):** Validates client-side route mounting, lazy `<Suspense>` chunk loading, browser history state, 404 error boundaries, and interactive modal/accordion toggles.
- **SEO (Lighthouse):** Prevents the "SPA Crawl Trap." Ensures pre-rendered semantic HTML exists inside `<div id="app">` so Googlebot indexes full copy on initial GET without waiting for React hydration; checks that client routing doesn't produce layout shifts (CLS < 0.1).

### B. Three.js & React Three Fiber (`three`, `@react-three/fiber`, `@react-three/drei`)
- **Testing (Playwright):** Verifies `<canvas>` WebGL contexts initialize cleanly, gracefully handles headless rendering environments without throwing WebGL context-lost exceptions, and verifies interactive 3D click/drag events.
- **SEO (Lighthouse):** Ensures heavy 3D shaders, geometries, and textures do not delay Largest Contentful Paint (LCP < 2.5s) or Total Blocking Time (TBT < 200ms). WebGL canvas must have descriptive `role="img"` and `aria-label` tags.

### C. GSAP & ScrollTrigger (`gsap`)
- **Testing (Playwright):** Verifies scroll-triggered entrance animations, transform hardware acceleration (`transform-gpu`, `will-change-transform`), and zero console animation warnings.
- **SEO (Lighthouse):** Validates that animations respect `@media (prefers-reduced-motion: reduce)`, cause zero layout thrashing (forced reflows), and do not push visible content offscreen during crawler snapshotting.

### D. Lenis Smooth Scroll (`lenis`)
- **Testing (Playwright):** Tests programmatic anchor scrolling (`#solutions`, `#showcase`, `#faq`), wheel event dispatching, and mobile touch scroll compatibility.
- **SEO (Lighthouse):** Verifies that smooth scrolling does not hijack native browser scroll accessibility, trap keyboard tab navigation, or prevent search engines from deep-linking to page sections.

### E. Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`)
- **Testing (Playwright):** Validates responsive viewports (Mobile: 375px, Tablet: 768px, Desktop: 1280px) and dark mode styling across Chromium, WebKit, and Firefox.
- **SEO (Lighthouse):** Audits color contrast compliance (WCAG AA 4.5:1 ratio), touch target dimensions (minimum 36×36px / 48×48px clickable areas), and ensures unused utility CSS is purged in production.

### F. Vite & Rolldown Build Engine (`vite`, `@tailwindcss/vite`)
- **Testing (Playwright):** Uses Vite's native preview server (`localhost:4173`) to test production bundles before deployment.
- **SEO (Lighthouse):** Audits asset preloading (`rel="preload"`, `rel="modulepreload"`), gzip/brotli compression, font display swap (`display=swap`), and elimination of render-blocking JavaScript.

### G. Chrome DevTools & Modern Web Guidance IDE Plugins
- **Testing (Playwright):** Hooks directly into Chrome DevTools Protocol (CDP) to monitor real-time network waterfalls, console warnings, and memory leaks.
- **SEO (Lighthouse):** Uses Google's official auditing guidelines (web.dev / CWV) to benchmark performance, accessibility, best practices, and SEO scores to maintain 100/100 ranking targets.

---

## 4. Pre-Push Validation & Git Sync
- Always run `npm test` (Playwright) and `npm run build` before pushing commits to GitHub (`origin main`).
- Verify production deployments reach 100/100 Technical SEO via `npm run audit:seo`.
