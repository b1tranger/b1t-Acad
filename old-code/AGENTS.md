# Old Code Archive Guidelines & Rules

This document establishes the mandatory principles and operational standards for any AI agent or developer working within the [`old-code/`](.) directory.

---

## 1. Directory Purpose & Scope
- **Deprecation & Modular Preservation**: The `old-code/` directory houses components, visual effects, and architectural patterns removed from production pages (such as `index.html`) of **b1t Academics**.
- **Historical Fidelity**: Archived code must reflect the exact look, feel, behavior, and mechanics it exhibited in production prior to removal.
- **Reference & Reusability**: Snippets preserved here serve as standalone blueprints that can be inspected, tested, or ported back into production or sister projects without reverse engineering git history.

---

## 2. Core Operational Rules

### Rule 2.1: 100% Standalone Execution Contract
- Every archived subfolder under `old-code/` (e.g., `visitor-counter/`, `glitch-intro/`) **MUST** be runnable immediately by double-clicking or opening its `index.html` directly in any standard modern web browser.
- **Zero Build Tools**: No Node.js runtimes, Vite, Webpack, Babel, or compilation steps are permitted.
- **Zero Workspace Coupling**: Archived code must **NOT** link back into root assets (e.g. `../../style.css` or `../../js/theme.js`) because modifying root assets would inadvertently break archived components. All styles and scripts needed must reside strictly within the component's folder.
- **External Assets via CDN**: When an icon set (e.g., FontAwesome) or font family (e.g., Google Fonts) is required, reference it via a public CDN inside `index.html` rather than relative workspace paths.

### Rule 2.2: Tri-File Architecture (HTML, CSS, JS)
Every archived component must cleanly separate concerns into dedicated files inside its specific directory:
```text
old-code/<feature-name>/
├── index.html        # Clean semantic markup and CDN links
├── style.css         # Component-specific styles, CSS variables & animations
└── script.js         # Modular JavaScript logic and event listeners
```
- Do not mix large `<style>` or `<script>` tags directly inside `index.html`.
- Use relative imports (`<link rel="stylesheet" href="style.css">` and `<script src="script.js"></script>`).

### Rule 2.3: Storage & Testing Hygiene (Cookies / LocalStorage)
- If an archived feature relies on cookies or `localStorage` to restrict execution (e.g., first-visit checks like `gaus_website_effect_run`), the implementation **must**:
  1. Faithfully implement the production logic by default.
  2. Include an unobtrusive, developer-friendly control button (e.g. *"Reset Cookie & Re-test"*) or query parameter so the user can easily observe and re-trigger the effect without manually clearing browser storage.
  3. Include a delay-override option if a timer (e.g., 30s delay) would otherwise force the tester to wait unnecessarily during quick checks.

### Rule 2.4: Metadata & Lineage Documentation
Each component directory must include a short header block or documentation section detailing:
- **Origin**: Original file and line ranges (e.g., `index.html:L2281-L2353`).
- **Date Archived**: DD.MM.YY format.
- **Reason for Archival**: Why it was retired from the live site (performance, design refresh, branding revert, etc.).
- **Reintegration Guide**: Exact steps required if a developer decides to re-enable the feature in production.

---

## 3. Catalog of Archived Modules

| Component Folder | Original Source | Description |
| :--- | :--- | :--- |
| [`visitor-counter/`](./visitor-counter/) | `index.html:L1126-L1161` | 30s delayed visitor hit counter fetching `api.counterapi.dev` with adblock fallback. |
| [`glitch-intro/`](./glitch-intro/) | `index.html:L881-L932`, `L1072-L1078`, `L2281-L2353` | Chromatic aberration glitch animation and first-visit Bengali brand name text swap for 10 seconds. |

---

## 4. Archiving Workflow for New Submissions
When extracting and archiving future components into `old-code/`:
1. Create a dedicated slug directory: `old-code/<feature-slug>/`.
2. Split code cleanly into `index.html`, `style.css`, and `script.js`.
3. Provide self-contained theme variables so the design matches the b1t Academics dark aesthetic.
4. Update `old-code/AGENTS.md` and `old-code/README.md` to register the new component.
5. Record changes in root `doc/history.md` and bump root `sw.js` cache version.
