# Project Rules & Workflow Instructions

## GitHub Synchronization Rule
- **Continuous Git Synchronization:** Whenever working on any project or completing tasks/milestones, always commit and push the latest version of the code to GitHub (`origin main` or the active working branch).
- **Missing Repository Protocol:** If no Git repository or remote is configured for a project, always ask the user whether they would like to initialize a repository and create/connect a GitHub remote before proceeding.
- **Pre-Push Validation:** Ensure production builds (`npm run build` or equivalent) pass cleanly before pushing to avoid breaking CI/CD pipelines or live deployments.

## The 2-Tool Standard for Testing & SEO (Universal Across All Projects)
Whenever the user asks to test code or increase Google ranking, use EXACTLY these two tools:
1. **Testing (1 Tool):** **Microsoft Playwright** (`@playwright/test`)
   - Storage: ~17.7 MB.
   - Command: `npm test` (runs real cross-browser, mobile, and Googlebot E2E verification).
2. **Google SEO & Ranking (1 Tool):** **Google Lighthouse** (`lighthouse`)
   - Storage: ~18.3 MB.
   - Command: `npm run audit:seo` (official Google SEO audit engine for 100/100 ranking score).

## Application Across Every Installed Frontend Plugin & Framework
This 2-tool rule governs all active frontend libraries and IDE plugins:
- **React 19 & React Router:** Playwright tests route mounting, lazy Suspense chunks, and history; Lighthouse audits pre-rendered DOM and layout shifts (CLS).
- **Three.js & React Three Fiber:** Playwright verifies WebGL canvas context and headless fallback; Lighthouse ensures 3D shaders don't degrade LCP or TBT.
- **GSAP & ScrollTrigger:** Playwright validates GPU transforms and triggers; Lighthouse ensures reduced-motion support and zero layout thrashing.
- **Lenis Smooth Scroll:** Playwright verifies anchor navigation and wheel events; Lighthouse audits native scroll and keyboard accessibility.
- **Tailwind CSS v4:** Playwright tests responsive breakpoints (mobile, tablet, desktop); Lighthouse audits touch target sizes and color contrast.
- **Vite & Rolldown:** Playwright tests production preview builds; Lighthouse audits module preloads, asset compression, and render-blocking scripts.
- **Chrome DevTools & Modern Web Guidance:** Integrates CDP event tracking with Lighthouse web.dev auditing for 100/100 ranking benchmarks.

## Memory Persistence
- This testing and SEO rule is codified in `.agents/rules/seo-and-testing-protocol.md` and MUST be observed across all chats, windows, and projects.
