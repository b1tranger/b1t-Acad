# Notice Scraper — Frontend Documentation

## Overview

The Notice Scraper feature lives at `misc/notice.html` and provides a two-panel interface for browsing UITS university notices. It connects to a Vercel-hosted backend that handles UCAM portal authentication and PDF proxying.

## Architecture

- **Frontend** (this repo, Netlify): `misc/notice.html` — static HTML/CSS/JS page
- **Backend** (private repo, Vercel): `b1t-acad-backend/` — serverless API that logs into UCAM and returns notice data

The frontend **never touches** student credentials. All authentication happens server-side.

## Frontend Components (`misc/notice.html`)

### Layout

```
┌─────────────────────────────────────────────────┐
│  📋 Notice Viewer          ← Back  Visit UCAM ↗ │
├──────────────┬──────────────────────────────────┤
│              │                                   │
│  Notice List │  PDF Viewer                       │
│  ──────────  │  ─────────────────────            │
│  📄 #724 ◄── │  [Open] [⬇ Download]             │
│  📄 #723     │                                   │
│  📄 #722     │  ┌─────────────────────┐          │
│  📄 #721     │  │                     │          │
│  📄 #720     │  │     PDF CONTENT     │          │
│  ...         │  │     (iframe)        │          │
│              │  │                     │          │
│              │  └─────────────────────┘          │
└──────────────┴──────────────────────────────────┘
```

- **Left panel**: Scrollable list of recent notices fetched from `/api/notices`
- **Right panel**: Inline PDF viewer (iframe sourced from `/api/pdf?id=X`) + download & open buttons
- **Responsive**: Stacks vertically on screens ≤768px

### Configuration

At the top of the `<script>` section in `notice.html`:

```javascript
const API_BASE = 'https://b1t-acad-backend.vercel.app';
```

This must point to the deployed Vercel backend URL. If left empty, a config banner appears instead.

### States

| State | UI |
|---|---|
| **Loading** | Spinner + "Loading notices..." |
| **Success** | Notice list populated, first notice auto-selected |
| **Error** | Error message + Retry button |
| **No API** | Config banner: "Backend API URL not configured" |
| **No selection** | Placeholder: "Select a notice from the list" |

### API Calls

1. **On page load**: `GET {API_BASE}/api/notices` → response: `{ notices: [{ id, url }], latestId }`
2. **On notice click**: Sets iframe `src` to `{API_BASE}/api/pdf?id={id}`
3. **Download button**: Direct link to `{API_BASE}/api/pdf?id={id}` with `download` attribute
4. **Open button**: Direct link to `{API_BASE}/api/pdf?id={id}` in new tab

### Styling

Uses the site's existing CSS variables for theme consistency:
- `--secondary-color`, `--border-color` — panel backgrounds/borders
- `--text-color`, `--text-content` — text colors
- `--accent-color` (`#ff7b00`) — active items, hover effects, buttons
- `--hover-btn-bg` — hover background

## Linked From

- `index.html` → General Information section → "Notice Portal" link (line ~598)

## Backend Repository

The backend code was initially created in `b1t-acad-backend/` within this repo and is meant to be **moved to a separate private repository** for security. It contains:

- `api/notices.js` — Notice scanning endpoint
- `api/pdf.js` — PDF proxy endpoint
- `lib/ucam-session.js` — Shared UCAM login/session logic
- `PROJECT_PLAN.md` — Full handoff documentation
- `DOCUMENTATION.md` — Technical documentation

See `b1t-acad-backend/DOCUMENTATION.md` for backend-specific details.

## Development History

- **Initial prompt & planning**: `agentic-note/prompts/prompt_01.md`
- **Full implementation log**: `agentic-note/prompts/prompt_Notice Scraper Implementation.md`
- **Original notice page** used an iframe embedding `uits.edu.bd/notice` (public site, not UCAM)
- **Redesigned** to a two-panel viewer that calls the Vercel backend API
