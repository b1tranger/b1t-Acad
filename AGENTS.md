# Repository Rules & Guidelines

## 1. Changelog, History & Changes.json Maintenance
- **Automatic History & `changes.json` Updates**: Whenever adding new features, fixing bugs, refactoring components, or altering UI/styles in this codebase:
  1. Document all changes in [`doc/history.md`](doc/history.md).
  2. Bump the service worker cache version (`const CACHE_NAME` in [`sw.js#L2`](sw.js#L2)) when modifying cached runtime assets.
  3. **Update [`changes.json`](changes.json)**: Keep `currentVersion` synchronized with `CACHE_NAME` in [`sw.js`](sw.js), refresh `lastUpdated`, and prepend or update the current release entry in `history` with categorized items (`type`, `title`, `description`) so the automated visitor changelog modal reflects the new changes immediately.
  4. Keep [`README.md`](README.md) synchronized with feature and release states.
- **Date Format & Placement**:
  - In `doc/history.md`, group entries under the current date using the format `# DD.MM.YY` (e.g., `# 04.09.26`) placed chronologically at the top of the file directly beneath the frontmatter tags comment block.
  - Record detailed release notes and comprehensive per-change descriptions directly in `doc/history.md` and companion walkthrough files in `doc/prompts/`.
- **Entry Structure**:
  - Title the main change in bold with a clear feature/fix description.
  - Detail specific modifications with bullet points mentioning affected file paths, selectors/IDs, and technical/design decisions.
  - Preserve existing frontmatter tag comments at the top of the file.

## 2. Mandatory Prompt, Plan & Walkthrough Archiving
- **Target Location & Serial Session Folders**:
  - All conversation, prompt, plan, and walkthrough records reside inside [`doc/prompts/`](doc/prompts) in dedicated serial folders named with an incrementing major integer prefix:
    `doc/prompts/<N>. <Session Title>/` (e.g., `doc/prompts/11. Course Search Refactor/`).
  - **Determining `<N>`**: Inspect `doc/prompts/` to find the highest existing major integer prefix across both existing session folders and legacy flat `<N>. ...md` files, and assign `N = N_max + 1` for an entirely distinct, new conversation session.
  - **Session Continuity**: Whenever an existing conversation or chat thread is continued, resumed, or revisited, locate and update **that same session folder** (`doc/prompts/<N>. <Session Title>/`); do NOT create a new major folder `<N+1>` per turn.
- **Required Files Inside `doc/prompts/<N>. <Session Title>/`**:
  1. **`transcript_full.jsonl`**: An exact, unmodified UTF-8 copy of `<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript_full.jsonl`. Never truncate, edit, or reformat lines in `transcript_full.jsonl`.
  2. **`conversation.md` (Full Authentic Chat Archive)**: A complete Markdown rendering that **looks exactly the same as the AI response in the chat interface, alongside the user prompts**. It structures turns sequentially (`## Turn <N>`) with `### 👤 User` (verbatim prompt), `### 🧠 AI Thinking` (collapsible reasoning `<details><summary>Click to expand internal reasoning</summary>...</details>`), and `### 🤖 Assistant Response` (exact full response with all markdown headings, code, and explanations verbatim). Do NOT replace or truncate with high-level synthetic summaries (such as the legacy `summary.md` format).
  3. **Companion Plans & Walkthroughs (Fractional Suffixes Reserved for Plans & Walkthroughs Only)**: Stored in the same `doc/prompts/<N>. <Session Title>/` folder:
     - Implementation plan: `<N>.1 Implementation Plan - <Plan Title>.md` (dual-write whenever creating/updating `implementation_plan.md` before user review)
     - Walkthrough document: `<N>.2 Walkthrough - <Title>.md` (dual-write whenever creating/updating `walkthrough.md` upon completion)
     - Subsequent plans/walkthroughs in the same session: `<N>.3 Implementation Plan - ...`, `<N>.4 Walkthrough - ...`, etc.
- **Update Cadence (Keeping the Archive Current)**:
  - Because the runtime writes a turn's final `PLANNER_RESPONSE` (final `thinking` and `content`) to `transcript_full.jsonl` after the turn finishes:
    1. **At the start of each turn (or when continuing from a prior `<conversation-id>`):** Copy `<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript_full.jsonl` to `doc/prompts/<N>. <Session Title>/transcript_full.jsonl` and regenerate `conversation.md` so the previous turn's finalized `thinking` and `content` are captured verbatim (and sync the prior conversation's folder if continuing).
    2. **Before sending each new final response:** Re-copy `transcript_full.jsonl`, regenerate `conversation.md` to capture all completed steps of the current turn, append the exact final response under `### 🤖 Assistant Response (Pre-Commit)` (noting it will be replaced verbatim from `transcript_full.jsonl` on the next sync).

## 3. Code Quality & Styling Standards
- Follow the established vanilla JavaScript and CSS conventions across the repository.
- Avoid introducing unnecessary third-party runtime frameworks or heavy libraries unless explicitly requested.
- Maintain responsive design and dark/sky-blue aesthetic consistency across all interactive tools and modals.

## 4. Commit Message & Chat Summary Generation
- **Commit Message & Description Suggestion**:
  - At the end of every response, summarize the work completed across the chat session (referencing the active session folder in `doc/prompts/<N>. <Session Title>/`).
  - Suggest a ready-to-use Git commit message with a structured commit description at the very end of the response.

## 5. Department & Course Data Synchronization
- Refer to [`js/AGENTS.md`](js/AGENTS.md) for the standardized workflow when crawling Google Drive folders and updating [`js/departments-data.js`](js/departments-data.js) and [`js/search-courses.js`](js/search-courses.js).

