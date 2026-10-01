# Project Rules & Workflow Instructions

## GitHub Synchronization Rule
- **Continuous Git Synchronization:** Whenever working on any project or completing tasks/milestones, always commit and push the latest version of the code to GitHub (`origin main` or the active working branch).
- **Missing Repository Protocol:** If no Git repository or remote is configured for a project, always ask the user whether they would like to initialize a repository and create/connect a GitHub remote before proceeding.
- **Pre-Push Validation:** Ensure production builds (`npm run build` or equivalent) pass cleanly before pushing to avoid breaking CI/CD pipelines or live deployments.
