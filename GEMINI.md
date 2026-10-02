# Project Rules & Workflow Instructions

## GitHub Synchronization Rule
- **Continuous Git Synchronization:** Whenever working on any project or completing tasks/milestones, always commit and push the latest version of the code to GitHub (`origin main` or the active working branch).
- **Missing Repository Protocol:** If no Git repository or remote is configured for a project, always ask the user whether they would like to initialize a repository and create/connect a GitHub remote before proceeding.
- **Pre-Push Validation:** Ensure production builds (`npm run build` or equivalent) pass cleanly before pushing to avoid breaking CI/CD pipelines or live deployments.

## Beast-Level Automated Testing & Top-Rank SEO Protocol
- **Code Testing:** Whenever the user asks to test code or verify features, execute `npm test` (Vitest for fast unit/component testing) and `npm run test:seo` (Microsoft Playwright for Googlebot crawler and E2E validation).
- **SEO & Google Ranking:** Ensure full technical SEO compliance on every change:
  - Keep pre-rendered semantic crawler DOM inside root `<div id="app">` so Googlebot receives 100% of keyword copy on raw HTTP fetch.
  - Verify Canonical URLs, JSON-LD Schema (`ProfessionalService`, `FAQPage`, `BreadcrumbList`), and optimal meta title/description lengths.
  - Sitemaps must contain only valid URLs with zero hash `#` fragments.
- **Memory Persistence:** This testing and ranking protocol is permanently codified in `.agents/rules/seo-and-testing-protocol.md` and MUST be observed across all chats, windows, and tasks.
