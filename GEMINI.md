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

## Memory Persistence
- This testing and SEO rule is codified in `.agents/rules/seo-and-testing-protocol.md` and MUST be observed across all chats, windows, and projects.
