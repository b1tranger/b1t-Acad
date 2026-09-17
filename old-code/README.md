# Old Code Archive (`old-code/`)

> **Developer & Agent Notice**: Before making any additions or edits inside this folder, please read [`AGENTS.md`](./AGENTS.md).

This directory contains standalone, archived components and visual patterns extracted from the primary **b1t Academics** production site. Each folder is completely decoupled from the root codebase, contains its own HTML, CSS, and JS, and can be tested simply by opening its `index.html` in any browser.

---

## Archived Modules

### 1. [Visitor Counter (`visitor-counter/`)](./visitor-counter/)
- **Original Location**: [`index.html:L1126-L1161`](../index.html)
- **Archival Date**: 17.09.26
- **Summary**: A delayed visitor hit counter badge styled with a pill border, font icon, and smooth fade-in. Communicates with `https://api.counterapi.dev/v1/b1tacad/visits/up` after a 30-second delay to filter out bounce visitors.
- **Files**:
  - [`visitor-counter/index.html`](./visitor-counter/index.html)
  - [`visitor-counter/style.css`](./visitor-counter/style.css)
  - [`visitor-counter/script.js`](./visitor-counter/script.js)

### 2. [Glitch Intro Effect (`glitch-intro/`)](./glitch-intro/)
- **Original Location**: [`index.html:L881-L932`](../index.html), [`L1072-L1078`](../index.html), [`L2281-L2353`](../index.html)
- **Archival Date**: 17.09.26
- **Summary**: A first-visit glitch text swap animation. After settling for 3 seconds, a chromatic aberration glitch transitions the header into *"Gaus এর Website"* and subtext into *"বড়ভাইরা এ নামে ভালো চিনে আরকি"*. Displays for 10 seconds before running a reverse glitch transition back to the default *"b1t Academics"* branding. Tracked using the `gaus_website_effect_run` cookie.
- **Files**:
  - [`glitch-intro/index.html`](./glitch-intro/index.html)
  - [`glitch-intro/style.css`](./glitch-intro/style.css)
  - [`glitch-intro/script.js`](./glitch-intro/script.js)
