# b1t Academics - Complete Project Documentation

> **Unofficial Resources Archiver for UITS** - A fast, client-side web application designed to centralize academic resources, previous year question banks, departmental information, community-driven submissions, and notices for UITS students.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack (Detailed)](#technology-stack-detailed)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [JavaScript Modules](#javascript-modules)
6. [Styling System](#styling-system)
7. [Data Model & Integration](#data-model--integration)
8. [Recent Changes & PWA](#recent-changes--pwa)
9. [Version History](#version-history)
10. [Additional Resources](#additional-resources)

---

## Project Overview

### Description
b1t Academics is an unofficial resource centralization platform for UITS university students. It provides easy access to curated department-specific query banks, community-driven questions and notes, official notices, and scheduling tools.

### Key Features
- **Single Page Application (SPA) Routing** - Seamless navigation between sections (e.g., `#info`, `#Qbank`) on the landing page without full page reloads, using native URL hashing.
- **Departmental Navigation** - Custom-built nested folder browser UI pointing to curated Google Drive folders for CSE, CE, IT, etc.
- **Dynamic Routing** - Displays relevant course lists and materials dynamically (e.g., `?dept=CSE`) without needing separate HTML pages.
- **Community Submissions** - View and submit questions or notes using Google Forms/Sheets integration. Submissions display dynamically via JSON API.
- **Text-Based Visitor Counter** - Integrates `api.counterapi.dev` to securely display true page visits as plain text without requiring heavy image badges or cookies.
- **PWA Capabilities** - Installable Progressive Web App with offline caching strategies and smart notifications.
- **Smart Notification System** - LocalStorage-based polling that triggers a consolidated browser alert for new submissions without spam.
- **Recent Submissions Drawer** - A sleek, dark-themed panel for quickly reviewing the 10 most recent uploads across both Questions and Notes.
- **Notices System** - Easy viewing of official University notices with dynamic PDF viewer integration.
- **Dark Theme Mode** - Built-in dark-mode aesthetic with a seamless theme toggler.
- **Serverless Architecture** - Primarily static hosting relying on client-side JS and decentralized databases (Google Sheets/Drive) rather than custom servers.

### Technology Stack (Summary)
| Category | Technology |
|----------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend/Database | Google Sheets API, Google Forms |
| Icons | Font Awesome 6.5 |
| Hosting | Netlify |
| PWA System | Service Worker, Cache API, Notifications API |

---

## Technology Stack (Detailed)

### Frontend Technologies
| Technology | Version | Purpose | Delivery |
|-----------|---------|---------|----------|
| **HTML5** | — | Page structure, semantic markup | Native |
| **CSS3** | — | Styling, layouts, responsive design, CSS custom variables | Native |
| **Vanilla JavaScript (ES6+)** | — | Application logic, DOM manipulation, data fetching | Native |

### Integrations & APIs
| Service | Purpose | Details |
|---------|---------|----------|
| **Google Sheets API** | Decentralized database | Community submissions data fetched via JSON API endpoint (`google.visualization.Query`) |
| **Google Forms** | Data entry | Used for submitting new Questions and Notes safely |
| **Google Drive** | Resource hosting | Hosts PDFs and resources linked in the Departmental Query Banks |
| **CounterAPI** | Analytics | `api.counterapi.dev` provides a free JSON endpoint to display the total site visit count securely |

### Hosting
| Platform | Purpose | Details |
|---------|---------|----------|
| **Netlify** | Static Hosting | Fast global CDN serving HTML, CSS, JS |

---

## Architecture

### Application Flow

```text
┌─────────────────────────────────────────────────────────────┐
│                 index.html (Landing Page)                   │
└─────────────────────────┬───────────────────────────────────┘
                          │
         ┌────────────────┴────────────────┐
         ▼                                 ▼
┌─────────────────┐               ┌─────────────────┐
│ Departments.html│               │ submission.html │
│ (?dept=...)     │               │                 │
└────────┬────────┘               └────────┬────────┘
         │                                 │
         ▼                                 ▼
┌─────────────────┐               ┌─────────────────┐
│ Google Drive    │               │ Google Sheets   │
│ (PDF Resources) │               │ (JSON Data API) │
└─────────────────┘               └─────────────────┘
```

---

## Project Structure

```text
b1t-Acad/
│
├── index.html                    # Main landing page
├── Departments.html              # Dynamic department resource viewer
├── submission.html               # Community notes & questions
├── manifest.json                 # PWA install manifest
├── sw.js                         # Service worker for offline caching
├── README.md                     # Quick start guide
│
├── css/                          # Stylesheets
│   ├── (Various CSS modules for distinct components)
│
├── js/                           # JavaScript modules
│   ├── spa.js                    # SPA hash routing logic
│   ├── departments.js            # Department logic & rendering
│   ├── departments-data.js       # JSON mapping of all courses/drives
│   ├── search-courses.js         # Realtime search indexing logic
│   ├── pwa.js                    # PWA registration & Notification polling
│   ├── theme.js                  # Dark mode toggling logic
│   └── archive-link.js           # Redirect handlers for ancient links
│
├── doc/                          # Documentation
│   └── DOCUMENTATION.md          # Complete project documentation (this file)
│
├── images/                       # Logo assets and UI generic images
│   └── icons/                    # PWA masks (192x192, 512x512)
│
└── misc/                         # Auxiliary pages
    ├── notice.html               # UCAM Notices Viewer
    └── (Other mini-tools)
```

---

## JavaScript Modules

### 1. `js/pwa.js`
**Purpose:** Handles PWA initialization and the smart notification system.
- Registers the service worker (`sw.js`).
- Implements `checkForNewSubmissions()`: Polls Google Sheets and compares row counts against a LocalStorage snapshot (`pwa_submission_snapshot`).
- Fires a consolidated browser Notification and updates LocalStorage to prevent spam.
- Manages the UI/UX for the "Recent Submissions" sliding panel.

### 2. `sw.js` (Root)
**Purpose:** Service Worker.
- Employs a **Network-First** strategy to prioritize fresh dynamic content from the network, but caches assets so they still load quickly offline.
- Handles `notificationclick` events, focusing the browser tab and triggering the UI to open the Recent Submissions panel (`?showRecent=true`).

### 3. `js/departments*.js`
**Purpose:** Parses the structure of the Google Drive query banks.
- `departments-data.js`: Holds static definitions and mappings mapping department IDs to their Google Drive folder strings and course structures.
- `departments.js`: Contains UI DOM manipulation logic to render the folder view dynamically based on URL params.

### 4. `js/theme.js`
**Purpose:** Dark/Light mode preferences.
- Checks local storage for user's aesthetic choice.
- Applies class adjustments to the `<body>`.

### 5. `js/spa.js`
**Purpose:** Manages Single Page Application routing via URL hashes.
- Listens to the window `hashchange` event.
- Displays specific target sections (like `#Qbank`) while hiding the main page list and vice versa.
- Displays a dedicated "Back to Home" floating button over sub-sections.

### 6. `js/search-courses.js`
**Purpose:** Provides a rapid filtering function for long lists of courses.
- Triggers on input events in the search bar.
- Uses strict substring matching to hide/show list elements.

---

## Styling System

The application styling is heavily componentized but avoids heavy CSS frameworks in favor of vanilla CSS custom properties (variables) for theme management. 

- **Variables:** Defined in `:root` scope (colors, padding, border-radius) and overwritten via a `.light-mode` class toggled by `js/theme.js`.
- **Layout:** Extensive use of CSS Grid and Flexbox for responsive, mobile-first design.
- **Modals:** Centralized styling for panels, dropdowns, and popup dialogues (e.g., the PDF Viewer modal and Recent Submissions panel).

---

## Data Model & Integration

Because `b1t-Acad` uses a serverless architecture without Firebase/Firestore, data is managed via Google integrations:

| Component | Integration Method | Security Model |
|-----------|--------------------|----------------|
| **Reading Submissions** | Google Sheets (`gviz/tq?tqx=out:json`) | Read-only accessible via public sheet sharing. |
| **Writing Submissions** | Google Forms | Write-only form submission. Impossible to natively edit/delete other users' posts via the web client. |
| **Resource Links / Files** | Google Drive Folders | View-only link sharing configured directly in Drive by the core Admin team. |

---

## Recent Changes & PWA

> [!NOTE]
> **Progressive Web App (PWA) Integration & Smart Notifications**
> The platform has recently been upgraded to act as a native application installation with intelligent community alerts.

### Installability
- **Manifest**: The `manifest.json` provides branding so users can "Add to Homescreen".
- **Offline Reliability**: The `sw.js` script allows the CSS/JS to be cached resiliently.

### Consolidated Notification System
Since the site uses Google Sheets instead of a server push database, a custom polling Notification strategy is active in `submission.html` via `pwa.js`:
1. Whenever a student opens the page, it polls the latest row counts from Google Sheets.
2. It compares it against an offline snapshot.
3. If there are new insertions, a **single consolidated notification** appears rather than individual popups for every item.
4. Clicking the notification dynamically opens a "Recent Submissions" sidebar showing a beautifully integrated view of the top 10 most recent posts (combining both Questions and Notes).

---

## Version History

| Version | Date | Update | Description |
|---------|------|--------|-------------|
| 5.0 | 2026-02-21 | PWA Integration | Upgraded the platform to a native installable application with offline capabilities. |
| 5.1 | 2026-02-21 | Smart Notifications | Added a consolidated polling notification strategy for new community submissions. |
| 5.2 | 2026-02-21 | Documentation Overhaul | Restructured and updated comprehensive project documentation in `DOCUMENTATION.md`. |
| 5.3 | 2026-02-21 | SPA Routing Implementation | Converted the landing page to a Single Page Application using `spa.js` and hash routing to navigate sections (e.g., `#Qbank`) seamlessly without page reloads. |
| 5.4 | 2026-02-21 | Visitor Counter | Implemented a secure, text-based total visitor counter using `api.counterapi.dev` mapped with a delayed loader to track genuine engagement. |

---

## Additional Resources

- **Main URL**: [b1t Academics](https://b1tacad.netlify.app/)
- **Bug Reports**: Open an issue on the GitHub repository or contact the admin directly.
- **Related Project**: Integrates seamlessly via the Floating Action Button with [b1t-Sched](https://b1tsched.netlify.app/), the task management system.
