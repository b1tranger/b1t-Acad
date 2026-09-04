# Legacy Codebase & Old Design Archive

> **Historical Reference Document**  
> This document provides an exhaustive, developer-ready breakdown of the architectural patterns, file hierarchies, and JavaScript/CSS logic used in early versions of **b1t Academics** (`archive-old-design-1` and `archive-old-design-2`).  
> Use this archive to understand past architectural decisions, evaluate trade-offs, and safely port or re-implement battle-tested utility patterns in future projects.

---

## Table of Contents

1. [Complete File Tree & Overview](#1-complete-file-tree--overview)
2. [Design Version 1 (`archive-old-design-1`) Breakdown](#2-design-version-1-archive-old-design-1-breakdown)
   - [2.1 Architecture & Page Model](#21-architecture--page-model)
   - [2.2 Mobile Drawer & Floating Action Button (`menu.js`)](#22-mobile-drawer--floating-action-button-menujs)
   - [2.3 Preloader with First-Visit Detection (`preloader.js`)](#23-preloader-with-first-visit-detection-preloaderjs)
   - [2.4 FAQ Accordions & Data-Attribute Tooltips (`faq.dropdown.js` & `faq.tooltip.js`)](#24-faq-accordions--data-attribute-tooltips-faqdropdownjs--faqtooltipjs)
   - [2.5 Multi-Popup Controller (`menubtn.academics.js`)](#25-multi-popup-controller-menubtnacademicsjs)
   - [2.6 Offline PWA & Sync Architecture (`PWA/pwa.js` & `PWA/service-worker.js`)](#26-offline-pwa--sync-architecture-pwapwajs--pwaservice-workerjs)
3. [Design Version 2 (`archive-old-design-2`) Breakdown](#3-design-version-2-archive-old-design-2-breakdown)
   - [3.1 Architecture & Static File Routing](#31-architecture--static-file-routing)
   - [3.2 Dynamic Semester Selector & Storage Restoration (`academics.semester.selector.js`)](#32-dynamic-semester-selector--storage-restoration-academicssemesterselectorjs)
   - [3.3 Course Card Grids & Syllabus Layout (`D1/<DEPT>/S<XX>.html`)](#33-course-card-grids--syllabus-layout-d1deptsxxhtml)
4. [Evolution to Modern Architecture (`Design 3`)](#4-evolution-to-modern-architecture-design-3)
5. [Comparative Analysis & Reusable Logic Summary](#5-comparative-analysis--reusable-logic-summary)

---

## 1. Complete File Tree & Overview

```text
archive-old-design-1/
├── .readthedocs.yaml                     # ReadTheDocs build configuration
├── Academics.html                        # Multi-page academics hub with course selectors
├── Extracurriculars.html                 # Extracurricular activities & club resources portal
├── manifest.json                         # PWA manifest metadata
├── netlify.toml                          # Netlify headers & redirect rules
├── old.index.html                        # Original landing page with framed white canvas layout
├── robot.txt                             # Legacy crawler directives
├── sitemap.xml                           # XML sitemap for static HTML pages
├── abstraction/                          # Staging snippets & backup code
│   ├── faq.backup.txt                    # FAQ raw markup backup
│   ├── ifram.blog.scroll.txt             # Iframe scrolling styling snippet
│   ├── preloader.backup.txt              # Preloader HTML/CSS backup
│   ├── scroll.css.txt                    # Custom scrollbar CSS styles
│   └── temp-manifest.txt                 # Manifest backup template
└── OLD FILES/                            # Extracted modular vanilla JS scripts
    ├── css-bg.js                         # Dynamic background script (deprecated placeholder)
    ├── faq.dropdown.js                   # Nested accordion toggle with click-outside listener
    ├── faq.tooltip.js                    # Inline tooltip parser using DOM data-* attributes
    ├── menu.js                           # FAB button, mobile drawer menu & Gemini API demo
    ├── menubtn.academics.js              # Multi-modal popup pairing with shared backdrop
    ├── navbar-drop-down.js               # Top navigation dropdown hover/click handlers
    ├── preloader.js                      # LocalStorage-persisted first-run preloader
    └── PWA/
        ├── pwa.js                        # Service worker registration, status & offline action queue
        └── service-worker.js             # Comprehensive static asset pre-caching worker

archive-old-design-2/
├── academics.semester.selector.js        # Dynamic DOM generator for 8 semesters with SessionStorage
└── D1/                                   # Hardcoded static semester directory
    ├── OSSU.html                         # Open Source Society University link directory
    ├── CE/                               # Civil Engineering semester pages (8 files)
    │   ├── S01.html ... S08.html
    ├── CSE/                              # Computer Science & Engineering semester pages (8 files)
    │   ├── S01.html ... S08.html
    └── IT/                               # Information Technology semester pages (8 files)
        ├── S01.html ... S08.html
```

---

## 2. Design Version 1 (`archive-old-design-1`) Breakdown

### 2.1 Architecture & Page Model
Design 1 relied on a **traditional multi-page website architecture (MPA)**. Each distinct functional section had its own standalone HTML document (`old.index.html`, `Academics.html`, `Extracurriculars.html`).
- **Visual Design**: Embedded "sheet on a desk" look—a rounded white container (`.page-border`) with heavy box-shadows positioned over a `#333` dark viewport.
- **Navigation**: Dual-navigation system consisting of a top fixed horizontal navbar (`.navbar`) on desktop and a bottom Floating Action Button (`.fab`) triggering a full-height overlay drawer on mobile.

---

### 2.2 Mobile Drawer & Floating Action Button (`menu.js`)

#### Code Implementation
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const fabButton = document.getElementById('fab-button');
    const menuContainer = document.getElementById('menu-container');
    const menuOverlay = document.getElementById('menu-overlay');

    const toggleMenu = () => {
        const isActive = fabButton.classList.contains('is-active');
        if (!isActive) {
            fabButton.classList.add('is-active');
            fabButton.setAttribute('aria-expanded', 'true');
            menuOverlay.classList.remove('hidden');
            menuContainer.classList.add('is-active');
            document.body.classList.add('body-no-scroll');
        } else {
            fabButton.classList.remove('is-active');
            fabButton.setAttribute('aria-expanded', 'false');
            menuOverlay.classList.add('hidden');
            menuContainer.classList.remove('is-active');
            document.body.classList.remove('body-no-scroll');
        }
    };

    fabButton.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fabButton.classList.contains('is-active')) {
            toggleMenu();
        }
    });
});
```

#### Evaluation
| Feature | Details |
| :--- | :--- |
| **Advantages** | Clean state toggling; full accessibility support with `aria-expanded`; keyboard accessibility (`Escape` key); backdrop dismiss click; background scroll locking via `body-no-scroll`. |
| **Disadvantages** | Coupled to hardcoded element IDs; lacks focus trapping (tab navigation can escape into hidden content). |
| **Reusability** | **High**. This lightweight modal/drawer controller can be adapted into any vanilla website without dependencies. |

---

### 2.3 Preloader with First-Visit Detection (`preloader.js`)

#### Code Implementation
```javascript
let preloaderDelay = 2000; // Time before preloader disappears (in ms)

// Check if user has already seen the preloader
if (localStorage.getItem("seenPreloader")) {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("content").classList.add("fade-in");
} else {
    // Show the preloader only for first-time visitors
    localStorage.setItem("seenPreloader", "true");

    window.onload = function () {
        setTimeout(function () {
            document.getElementById("preloader").classList.add("fade-out");

            setTimeout(function () {
                document.getElementById("preloader").style.display = "none";
                document.getElementById("content").style.display = "block";
                document.getElementById("content").classList.add("fade-in");
            }, 1000); // Match fade-out duration
        }, preloaderDelay);
    };
}
```

#### Evaluation
| Feature | Details |
| :--- | :--- |
| **Advantages** | Solves user fatigue by ensuring returning visitors do not sit through repetitive brand introductions; smooth CSS transition chaining. |
| **Disadvantages** | Causes Layout Cumulative Shift (CLS) or flash of unstyled content (FOUC) if script execution is deferred; hardcoded 2000ms delay unnecessarily stalls perceived load speed for first-time visitors on slow networks. |
| **Reusability** | **Medium**. Useful for product onboarding, walkthrough prompts, or promotional splash modals where "show once per client" logic is required. |

---

### 2.4 FAQ Accordions & Data-Attribute Tooltips (`faq.dropdown.js` & `faq.tooltip.js`)

#### Code Implementation (`faq.tooltip.js`)
```javascript
document.querySelectorAll('.faq-icon').forEach(icon => {
    icon.addEventListener('click', function () {
        const section = this.closest('.section');
        const faqBox = section.querySelector('.faq-box');
        const faqs = section.getAttribute('data-faq').split('|');
        faqBox.innerHTML = faqs.map(faq => ` ${faq}`).join('<br>');
        faqBox.style.display = (faqBox.style.display === 'block') ? 'none' : 'block';
    });
});
```

#### Evaluation
| Feature | Details |
| :--- | :--- |
| **Advantages** | Zero template engine required; concise inline storage of helper copy directly in HTML markup (`data-faq="Line 1|Line 2"`); dynamic DOM text injection. |
| **Disadvantages** | Modifying innerHTML directly without sanitation risks XSS if `data-faq` values come from user input; pipe splitting (`|`) limits formatted markdown or HTML links inside tooltips. |
| **Reusability** | **Medium**. Convenient for ultra-light landing pages needing inline FAQ hints without importing heavy tooltip libraries like Tippy.js. |

---

### 2.5 Multi-Popup Controller (`menubtn.academics.js`)

#### Code Implementation
```javascript
document.addEventListener('DOMContentLoaded', function () {
    const menuPairs = [
        { button: 'menuButton2', popup: 'popupMenu2' },
        { button: 'menuButton3', popup: 'popupMenu3' },
        { button: 'menuButton4', popup: 'popupMenu4' },
        { button: 'menuButton5', popup: 'popupMenu5' },
        { button: 'menuButton6', popup: 'popupMenu6' }
    ];

    const popupBackdrop = document.getElementById('popupBackdrop');
    let activePopup = null;

    menuPairs.forEach(pair => {
        const button = document.getElementById(pair.button);
        const popup = document.getElementById(pair.popup);

        button.addEventListener('click', function () {
            popup.classList.add('open');
            popupBackdrop.classList.add('open');
            button.classList.add('active');
            activePopup = popup;
        });
    });

    const closeButtons = document.querySelectorAll('.popup-close-btn');
    closeButtons.forEach(btn => btn.addEventListener('click', closeActivePopup));
    popupBackdrop.addEventListener('click', closeActivePopup);

    function closeActivePopup() {
        document.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.popup-menu').forEach(popup => popup.classList.remove('open'));
        popupBackdrop.classList.remove('open');
        activePopup = null;
    }
});
```

#### Evaluation
| Feature | Details |
| :--- | :--- |
| **Advantages** | Single shared backdrop handles multiple independent dialogs without DOM duplication; centralized closure reset function. |
| **Disadvantages** | Declarative array mapping requires manual code edits every time a new button/modal is added to the HTML. |
| **Reusability** | **High**. Reusable pattern for coordinating multiple dialogs, sub-menus, or popovers using a single background dimmer. |

---

### 2.6 Offline PWA & Sync Architecture (`PWA/pwa.js` & `PWA/service-worker.js`)

#### Offline Action Staging Queue (`PWA/pwa.js`)
```javascript
function saveDataLocally(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function storeOfflineAction(action) {
    let offlineActions = JSON.parse(localStorage.getItem('offlineData')) || [];
    offlineActions.push({
        action,
        timestamp: new Date().toISOString()
    });
    saveDataLocally('offlineData', offlineActions);
}

function updateOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';
    document.body.dataset.connectionStatus = status;
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();
```

#### Evaluation
| Feature | Details |
| :--- | :--- |
| **Advantages** | `dataset.connectionStatus` allows instant reactive CSS styling (`body[data-connection-status="offline"] .banner { display: block; }`); queues offline mutations for background sync. |
| **Disadvantages** | `service-worker.js` in Design 1 attempted to hardcode dozens of relative page URLs in `urlsToCache`. If a single file path broke (404), `cache.addAll()` would reject the entire installation. |
| **Reusability** | **Very High**. The connection status listener and offline action queue can be dropped into any offline-capable web application. |

---

## 3. Design Version 2 (`archive-old-design-2`) Breakdown

### 3.1 Architecture & Static File Routing
In Design 2, the team attempted to solve course resource discovery by pre-rendering **24 separate static HTML files** for every semester across three departments:
- `D1/CE/S01.html` through `S08.html`
- `D1/CSE/S01.html` through `S08.html`
- `D1/IT/S01.html` through `S08.html`

Each semester page was completely self-contained, with duplicated navigation bars, inline CSS styles, syllabus image previews, and course cards with Google Drive links.

---

### 3.2 Dynamic Semester Selector & Storage Restoration (`academics.semester.selector.js`)

#### Code Implementation
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const departmentDropdown = document.getElementById('departmentDropdown');
    const dropdownHeader = document.getElementById('dropdownHeader');
    const semesterList = document.getElementById('semesterList');
    const resetButton = document.getElementById('resetButton');

    const driveLinks = {
        cse: { 1: "D1/CSE/S01.html", 2: "D1/CSE/S02.html", ... 8: "D1/CSE/S08.html" },
        ce:  { 1: "D1/CE/S01.html",  2: "D1/CE/S02.html",  ... 8: "D1/CE/S08.html" },
        it:  { 1: "D1/IT/S01.html",  2: "D1/IT/S02.html",  ... 8: "D1/IT/S08.html" }
    };

    function updateSemesters(department) {
        semesterList.innerHTML = "";
        if (department && driveLinks[department]) {
            for (let i = 1; i <= 8; i++) {
                const semesterLink = document.createElement("a");
                semesterLink.href = driveLinks[department][i];
                semesterLink.textContent = `Semester ${i}`;
                semesterLink.classList.add('semester-button');
                semesterLink.setAttribute('data-semester', i);

                semesterLink.onclick = function () {
                    document.querySelectorAll('.semester-button').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    sessionStorage.setItem('selectedSemester', i);
                };
                semesterList.appendChild(semesterLink);
            }
        }
    }

    // Dropdown Item Selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function () {
            const department = this.getAttribute('data-value');
            dropdownHeader.textContent = this.textContent;
            departmentDropdown.classList.remove('open');
            sessionStorage.setItem('selectedDepartment', department);
            updateSemesters(department);
        });
    });

    // Session State Restoration
    const savedDepartment = sessionStorage.getItem('selectedDepartment');
    if (savedDepartment) {
        const departmentItem = document.querySelector(`.dropdown-item[data-value="${savedDepartment}"]`);
        if (departmentItem) {
            dropdownHeader.textContent = departmentItem.textContent;
            updateSemesters(savedDepartment);

            const savedSemester = sessionStorage.getItem('selectedSemester');
            if (savedSemester) {
                setTimeout(() => {
                    const btn = document.querySelector(`.semester-button[data-semester="${savedSemester}"]`);
                    if (btn) btn.classList.add('active');
                }, 100);
            }
        }
    }

    // Reset Filter
    resetButton.addEventListener('click', () => {
        dropdownHeader.textContent = 'Select Department';
        semesterList.innerHTML = "";
        sessionStorage.removeItem('selectedDepartment');
        sessionStorage.removeItem('selectedSemester');
    });
});
```

#### Evaluation
| Feature | Details |
| :--- | :--- |
| **Advantages** | Persistent filter state: using `sessionStorage` ensured that when a user navigated back from a semester page, their department and active semester remained highlighted. |
| **Disadvantages** | Relied on a fragile `setTimeout(..., 100)` to restore the active semester button styling rather than synchronous state setting; static mapping dictionary bound JavaScript directly to individual relative file paths. |
| **Reusability** | **High**. The pattern of persisting filter state to `sessionStorage` and restoring both form control values and dynamically injected children upon page load is exceptionally practical. |

---

### 3.3 Course Card Grids & Syllabus Layout (`D1/<DEPT>/S<XX>.html`)

#### Layout Pattern
```html
<div class="course-card-container">
    <a href="https://drive.google.com/drive/folders/..." target="_blank" class="course-button">
        <i class="fa-solid fa-code fa-2x" style="margin-bottom: 10px;"></i>
        <strong>SPL</strong>
        <span class="course-code">CSE0613111/112</span>
    </a>
    <a href="https://drive.google.com/drive/folders/..." target="_blank" class="course-button">
        <i class="fa-solid fa-calculator fa-2x" style="margin-bottom: 10px;"></i>
        <strong>D & IC</strong>
        <span class="course-code">MATH0541111</span>
    </a>
</div>

<!-- Floating Back Navigation -->
<a href="javascript:history.back()" id="back-button">
    <i class="fa-solid fa-arrow-left"></i> Back
</a>
```

#### Evaluation
| Feature | Details |
| :--- | :--- |
| **Advantages** | Grid layout with `repeat(auto-fit, minmax(150px, 1fr))` provided clean, fluid responsiveness on all phone sizes; `javascript:history.back()` returned the student directly to their configured selector state. |
| **Disadvantages** | Severe maintainability crisis: updating a single course code, drive folder, header link, or favicon required manually editing 24 separate HTML files. |
| **Reusability** | **Medium**. The CSS grid card layout with auto-fit minmax is standard and versatile for resource listings. |

---

## 4. Evolution to Modern Architecture (`Design 3`)

The transition from Design 1 & 2 to current production (`Design 3` at repository root) resolved the core pain points:

```text
Design 1 & 2 (Fragmented MPAs)          Design 3 (Dynamic Single-File Architecture)
───────────────────────────────         ───────────────────────────────────────────
24+ static semester files         ───►  Single `Departments.html` page
Fragmented navigation & CSS       ───►  Dynamic URL routing (`?dept=CSE&sem=1`)
Hardcoded Drive links in HTML     ───►  Centralized JSON data structure
Manual cache management           ───►  Network-first Service Worker with version bumps
Redundant Netlify build payloads  ───►  Minimal footprint, fast TTFB, PWA offline ready
```

---

## 5. Comparative Analysis & Reusable Logic Summary

| Component / Pattern | Origin | Modern Replacement | Can Be Reused in Future Projects? | Recommended Use Case |
| :--- | :--- | :--- | :---: | :--- |
| **SessionStorage Filter Memory** | Design 2 (`academics.semester.selector.js`) | Replaced by URL query parameters (`?dept=..&sem=..`) | **Yes** | Tabbed dashboards or filters where persistent state across browser reloads is desired without cluttering the URL. |
| **Reactive Connection Status** | Design 1 (`PWA/pwa.js`) | Modern offline alerts in root `sw.js` | **Yes** | Progressive Web Apps needing to toggle offline banners or disable submission forms when offline. |
| **One-Time Preloader** | Design 1 (`preloader.js`) | Removed for faster First Contentful Paint | **Yes** | Product tour guides, introductory animations, or welcome dialogues shown exclusively to first-time visitors. |
| **Multi-Popup Overlay Manager** | Design 1 (`menubtn.academics.js`) | Centralized CSS modal system (`.modal-overlay`) | **Yes** | Landing pages with multiple distinct modal triggers that share a single backdrop and close handler. |
| **Static HTML per Semester** | Design 2 (`D1/*/*.html`) | Dynamic client-side template rendering | **No** | Avoid in future projects: causes extreme maintenance overhead and duplicate markup. |
