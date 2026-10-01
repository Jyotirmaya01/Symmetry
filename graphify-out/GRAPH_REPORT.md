# Graph Report - Symmetry  (2026-10-01)

## Corpus Check
- Corpus is ~39,280 words - fits in a single context window. You may not need a graph.

## Summary
- 171 nodes · 314 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- ref_gsap / ref_react / src_components_aivideoshowcase
- ref_lenis / src_components_ajbot / src_components_ajbot_ajavatar
- node_path / package / package_name
- tsconfig / tsconfig_compileroptions / tsconfig_compileroptions_allowarbitraryextensions
- src_app / src_app_ajbot / src_app_app
- ref_lucide_react / ref_react_router_dom / src_components_footer
- package_dependencies / package_dependencies_gsap / package_dependencies_lenis
- package_devdependencies / package_devdependencies_tailwindcss / package_devdependencies_tailwindcss_vite
- vercel / vercel_buildcommand / vercel_cleanurls

## God Nodes (most connected - your core abstractions)
1. `react` - 20 edges
2. `compilerOptions` - 19 edges
3. `lucide-react` - 17 edges
4. `HomePage()` - 14 edges
5. `Navbar()` - 12 edges
6. `AppContent()` - 11 edges
7. `Footer()` - 11 edges
8. `smoothScrollTo()` - 9 edges
9. `react-router-dom` - 8 edges
10. `getOptimizedMediaUrl()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AppContent()` --calls--> `HomePage()`  [EXTRACTED]
  src/App.tsx → src/pages/HomePage.tsx
- `AiVideoShowcase()` --calls--> `getOptimizedMediaUrl()`  [EXTRACTED]
  src/components/AiVideoShowcase.tsx → src/utils/mediaUrl.ts
- `HomePage()` --calls--> `Footer()`  [EXTRACTED]
  src/pages/HomePage.tsx → src/components/Footer.tsx
- `HeroSection()` --calls--> `smoothScrollTo()`  [EXTRACTED]
  src/components/HeroSection.tsx → src/hooks/useLenis.ts
- `MotionShowcase()` --calls--> `getOptimizedMediaUrl()`  [EXTRACTED]
  src/components/MotionShowcase.tsx → src/utils/mediaUrl.ts

## Import Cycles
- None detected.

## Communities (11 total, 2 thin omitted)

### Community 0 - "ref_gsap / ref_react / src_components_aivideoshowcase"
Cohesion: 0.10
Nodes (25): gsap, react, AiVideoShowcase(), CommercialVideo, commercialVideos, BentoServices(), iconMap, HeroSection() (+17 more)

### Community 1 - "ref_lenis / src_components_ajbot / src_components_ajbot_ajavatar"
Cohesion: 0.11
Nodes (21): lenis, AjAvatar(), AjBot(), ChatMessage, extractClientDetails(), ExtractedDetails, ClientImpact(), initialTestimonials (+13 more)

### Community 2 - "node_path / package / package_name"
Cohesion: 0.08
Nodes (19): name, private, scripts, build, dev, preview, type, version (+11 more)

### Community 3 - "tsconfig / tsconfig_compileroptions / tsconfig_compileroptions_allowarbitraryextensions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 4 - "src_app / src_app_ajbot / src_app_app"
Cohesion: 0.19
Nodes (14): AjBot, App(), AppContent(), NotFoundPage, PrivacyPage, SecurityPage, TermsPage, SmoothCursor() (+6 more)

### Community 5 - "ref_lucide_react / ref_react_router_dom / src_components_footer"
Cohesion: 0.46
Nodes (8): lucide-react, react-router-dom, Footer(), Navbar(), NotFoundPage(), PrivacyPage(), SecurityPage(), TermsPage()

### Community 6 - "package_dependencies / package_dependencies_gsap / package_dependencies_lenis"
Cohesion: 0.20
Nodes (10): dependencies, gsap, lenis, lucide-react, react, react-dom, react-router-dom, @react-three/drei (+2 more)

### Community 7 - "package_devdependencies / package_devdependencies_tailwindcss / package_devdependencies_tailwindcss_vite"
Cohesion: 0.25
Nodes (8): devDependencies, tailwindcss, @tailwindcss/vite, @types/react, @types/react-dom, @types/three, typescript, vite

### Community 8 - "vercel / vercel_buildcommand / vercel_cleanurls"
Cohesion: 0.29
Nodes (6): buildCommand, cleanUrls, headers, outputDirectory, rewrites, trailingSlash

## Knowledge Gaps
- **79 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+74 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 91 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ref_gsap / ref_react / src_components_aivideoshowcase` to `ref_lenis / src_components_ajbot / src_components_ajbot_ajavatar`, `node_path / package / package_name`, `src_app / src_app_ajbot / src_app_app`, `ref_lucide_react / ref_react_router_dom / src_components_footer`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `ref_lucide_react / ref_react_router_dom / src_components_footer` to `ref_gsap / ref_react / src_components_aivideoshowcase`, `ref_lenis / src_components_ajbot / src_components_ajbot_ajavatar`, `node_path / package / package_name`, `src_app / src_app_ajbot / src_app_app`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `dependencies` connect `package_dependencies / package_dependencies_gsap / package_dependencies_lenis` to `node_path / package / package_name`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ref_gsap / ref_react / src_components_aivideoshowcase` be split into smaller, more focused modules?**
  _Cohesion score 0.1036036036036036 - nodes in this community are weakly interconnected._
- **Should `ref_lenis / src_components_ajbot / src_components_ajbot_ajavatar` be split into smaller, more focused modules?**
  _Cohesion score 0.11396011396011396 - nodes in this community are weakly interconnected._
- **Should `node_path / package / package_name` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._