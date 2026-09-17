<!--
tags: changelog, history, updates, logs, archive, agent-rules, guidelines, prompt-archive, anon-file-share, old-code
-->

# 17.09.26
- **Club Resources Sub-Section & Wings Modal Architecture (`index.html`, `js/clubs-data.js`, `js/departments-data.js`)**:
  - Added a dedicated **"Club Resources"** sub-section within the Extra Curricular Activities (ECA) section of [`index.html`](index.html), complete with interactive department club badges.
  - Implemented the `#club-wings-modal` popup modal displaying department club overviews, parent Google Drive folder access, and comprehensive subsidiary focus wings with icons, descriptions, and direct Drive links.
  - Standardized unified native JavaScript data architecture by creating [`js/clubs-data.js`](js/clubs-data.js) containing structured club and wing profiles across all 10 academic departments (`CSE`, `CE`, `IT`, `EEE`, `ECE`, `BBA`, `LAW`, `ENGLISH`, `PHARMA`, `SOCIAL`).
  - Added the `"club_res"` Google Drive link property to all 10 departments in [`js/departments-data.js`](js/departments-data.js) alongside `"info_link"` and `"qbank_link"`.
  - Configured verified active Drive folders for CSE Club (`club_drive`: `1lHHxqZPx6cVX4PkyE0ywuiOG5iCf0NVk`) and Cyber Security & Networks Wing (`drive_link`: `1bX4GuqkoAUiYTIljwqo2MyhqrwRrocRb`), leaving non-configured wing links blank to gracefully display the *"Drive folder coming soon"* placeholder instead of dead redirects.
  - Created [`js/club-resources.js`](js/club-resources.js) to dynamically render club cards, coordinate modal open/close, manage body scroll lock, and handle backdrop/Esc key events.
  - Converted the legacy button list of interests, career, programming, core learning, blog, and tutorials in ECA into a clean, modern responsive table with themed borders, icons, resource scopes, and direct action buttons.
  - Enhanced table responsiveness for mobile screens (`max-width: 680px`): hidden the "Scope / Description" column and moved inline info tooltips (`.row-desc-tooltip-trigger`) to a dedicated second line beneath each resource name (`.row-desc-tooltip-wrap`) with an indented pill button (`[ ⓘ Info ]`), supporting mobile tap toggle and outside-dismiss in [`js/club-resources.js`](js/club-resources.js).
  - Configured `#club-buttons-list` for single-column mobile viewports (`max-width: 600px`): styled department club buttons (`.club-btn-trigger`) to expand to 90% screen width (`width: 90% !important`), eliminating excessive margins on both sides.
  - Redesigned `#club-wings-modal` close button (`#close-club-wings-modal`) to a floating circular badge positioned at the top-right corner slightly protruding outside the modal card with hover scaling and theme-adaptive borders.
  - Replaced the homepage promo button and inspired-by paragraph in [`index.html:L1230-L1250`](index.html) with a prominent, floating highlighted action button (`.ou1ts-portal-btn`) linking directly to the **oU1TS Portal** (`https://ouits-res.netlify.app/`) with accent gradient, box-shadow glow, and external link icon.
  - Fixed `.ou1ts-portal-btn` styling on wider displays: resolved a missing media query closing brace in [`index.html`](index.html) that previously trapped the button class inside `@media (max-width: 480px)`, and mirrored the rule into [`style.css`](style.css) for global multi-screen support.
  - Formatted `#close-club-wings-modal` into a truly circular floating button: purged overriding `.btn` and `.btn-icon` classes (which injected 30px padding and 8px border-radius) and enforced `36px` dimensions with `border-radius: 50% !important; padding: 0 !important;` in [`index.html`](index.html) and [`style.css`](style.css).
  - Prevented website width jumping and scrollbar disappearance on sidebar expansion: configured `html { scrollbar-gutter: stable; overflow-y: scroll; }` and added independent scroll containment (`overflow-y: auto; overscroll-behavior: contain;`) to the mobile `.sticky-nav` drawer.
  - Designed and deployed universal custom **matte** scrollbars across the entire website and modals (`*` and `::-webkit-scrollbar` with slate/charcoal track and thumb in dark theme, soft gray in light theme).
  - Bumped Service Worker cache version `CACHE_NAME` to `'v6.3'` in [`sw.js:L2`](sw.js#L2).
- **Visitor Counter & Glitch Intro Archival (`old-code/`)**:
  - Excised the text-based delayed visitor counter from [`index.html:L1126-L1161`](index.html) (`#visitor-counter-container`, `#visitor-badge`, and the 30-second delayed fetch to `api.counterapi.dev`) and surrounding spacing markup.
  - Excised the first-visit chromatic aberration glitch intro from [`index.html:L881-L932`](index.html) (`@keyframes glitch-text`, `.glitch-active`), [`index.html:L1072-L1078`](index.html) (removed targeting IDs `main-logo-heading` and `main-logo-subtext`), and [`index.html:L2281-L2353`](index.html) (cookie check `gaus_website_effect_run`, 3-second post-load timer, 10-second temporary text swap to *"Gaus এর Website"* / *"বড়ভাইরা এ নামে ভালো চিনে আরকি"*, and revert animation).
  - Created standalone, modular test benches in [`old-code/`](old-code/):
    - [`old-code/visitor-counter/`](old-code/visitor-counter/): Isolated `index.html`, `style.css`, and `script.js` with dark theme variables, FontAwesome CDN integration, 30s delay countdown, and test override button.
    - [`old-code/glitch-intro/`](old-code/glitch-intro/): Isolated `index.html`, `style.css`, and `script.js` with full chromatic aberration keyframes, cookie persistence, 10s display timer, and "Reset Cookie & Replay" developer button.
    - [`old-code/index.html`](old-code/index.html): Direct navigation portal linking to all archived modules.
  - Created [`old-code/AGENTS.md`](old-code/AGENTS.md) and [`old-code/README.md`](old-code/README.md) defining strict guidelines for working inside the archive (100% standalone execution contract, zero build tools, tri-file architecture, storage hygiene, and provenance tracking).
  - Bumped Service Worker cache version `CACHE_NAME` to `'v5.5'` in [`sw.js:L2`](sw.js#L2) to ensure clients receive the clean `index.html`.

# 04.09.26
- **Legacy Codebase & Old Design Archive (`doc/old-files-archive.md`)**:
  - Created [`doc/old-files-archive.md`](doc/old-files-archive.md) providing a written structural and architectural breakdown of [`archive-old-design-1`](archive-old-design-1) and [`archive-old-design-2`](archive-old-design-2).
  - Documented JavaScript and CSS logic across previous iterations: mobile drawer FAB controllers (`menu.js`), `localStorage`-persisted first-visit preloaders (`preloader.js`), `data-faq` attribute tooltips (`faq.tooltip.js`), multi-modal backdrop coordinators (`menubtn.academics.js`), PWA offline state queues (`PWA/pwa.js`), and `sessionStorage`-persisted semester selectors (`academics.semester.selector.js`).
  - Evaluated advantages, disadvantages, and future reusability potential for all extracted patterns, comparing the legacy 24-file static semester approach against the modern dynamic URL routing model (`Departments.html?dept=...&sem=...`).
- **Agent Guidelines & Archiving Workflow Synchronization**:
  - Created [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) in the project root referencing [temp/AGENTS.md](temp/AGENTS.md) and [temp/CLAUDE.md](temp/CLAUDE.md) to standardize cross-platform AI pair programming conventions.
  - Updated both guideline files with explicit **Session Continuity & Updating Past Archives** rules, directing AI agents to locate and append turns directly to existing conversation archive files (`doc/prompts/<Prefix>. <Session Title>.md`) when chats are continued or updated rather than creating new or fragmented archives.
  - Initialized automated history maintenance in [`doc/history.md`](doc/history.md) and established prompt archiving in [`doc/prompts/`](doc/prompts/).
  - Audited the Anonymous File Sharing recent uploads ordering in [`index.html:L1609-L1739`](index.html#L1609-L1739) and [`js/anon-share.js`](js/anon-share.js#L262-L286) against the upstream fix in Prompt 101, documenting the pending chronological sort improvements.

