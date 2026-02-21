# b1t Academics - Project Documentation

## 1. Overview
**b1t Academics** (Unofficial Resources Archiver for UITS) is a fast, client-side web application designed to centralize academic resources, previous year question banks, departmental information, and community-driven submissions for UITS students. 

The platform is designed to be highly accessible and relies primarily on static hosting (Netlify) connected to decentralized databases (like Google Sheets for community submissions) rather than maintaining a custom backend server.

---

## 2. Core Features & Architecture

### 🌐 Frontend & UI
- **Tech Stack**: Vanilla HTML5, CSS3, and JavaScript.
- **Theming**: Core dark-mode aesthetic with a seamless theme toggler (`#theme-toggle`).
- **Navigation**: Sticky top navigation bar and a floating action button linking to the **b1t Scheduler** tool.
- **Modularity**: Separation of concerns across `index.html` (Landing), `Departments.html` (Filtering), `submission.html` (Community data), and `misc/notice.html` (Notices).

### 📚 Question Bank & Departments
- **QBank Navigation**: A custom-built nested folder browser UI pointing to curated Google Drive folders (organized by CSE, CE, IT, etc.).
- **Dynamic Routing**: `Departments.html` uses URL parameters (e.g., `?dept=CSE`) to dynamically load and display relevant course lists and materials without requiring separate HTML pages for each department.

### 📝 Community Submissions (`submission.html`)
- **Serverless Architecture**: Submissions (Questions and Notes) are crowd-sourced via Google Forms and stored in Google Sheets.
- **Data Fetching**: The site fetches the sheet data in real-time as JSON using the `google.visualization.Query` endpoint.
- **Dynamic Rendering**: Displays categorized submissions with visual grouping, avatar generation based on student names, and modal popups for viewing file links.

---

## 3. Recent Changes

> [!NOTE]
> **Progressive Web App (PWA) Integration & Smart Notifications**
> The platform has been upgraded to act as a native application installation with intelligent community alerts.

### A. PWA Installability
- **`manifest.json` Added**: The app now features a web manifest defining `b1t Academics`, allowing students to install the site directly to their mobile home screens or desktop applications.
- **Service Worker (`sw.js`)**: Implemented a lightweight, robust **Network-First** caching strategy. This ensures crucial pages load incredibly fast and work offline, while still prioritizing the latest dynamic content (like new questions) from the network.

### B. Consolidated Notification System (`js/pwa.js`)
Since the site uses Google Sheets instead of a server push database (like Firebase Realtime DB), a custom polling Notification strategy was implemented:
- **Polling + Snapshots**: Whenever a student opens `submission.html`, the script fetches the latest submissions and compares them against a LocalStorage snapshot (`pwa_submission_snapshot`).
- **Anti-Spam Concept**: Instead of firing 10 individual notifications for 10 new questions, the system triggers **one consolidated browser action** (e.g., *"3 new submissions added!"*).
- **Recent Submissions Drawer**: Clicking the notification (or the new in-page `Recent Submissions` button) slides out a sleek, dark-themed panel. This panel dynamically merges both `Questions` and `Notes`, displaying the **10 most recent** uploads tagged clearly with "NEW" badges.
- **Permissions Handling**: A non-intrusive "Enable Notifications 🔔" interface is built right into the submission page.

---

## 4. Directory Structure
- `/`: Core HTML files (`index.html`, `Departments.html`, `submission.html`), `manifest.json`, `sw.js`.
- `/css/`: Stylesheets modularized for various components.
- `/js/`: Client-side logic including `pwa.js` (notifications & Service worker registration) and `theme.js`.
- `/images/`: Assets, social previews, and PWA masking icons (`192x192` & `512x512`).
- `/misc/`: Auxiliary pages (Notices, Student Portal, Campus tools).
- `/doc/`: Project documentation.
