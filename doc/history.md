<!--
tags: changelog, history, updates, logs, archive, agent-rules, guidelines, prompt-archive, anon-file-share
-->

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

