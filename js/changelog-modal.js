/**
 * Changelog / What's New Modal Module
 * Displays website updates from changes.json when the Service Worker CACHE_NAME updates
 * Modeled on b1t-Sched changelog architecture
 */

// Embedded fallback data ensuring the modal ALWAYS opens even on file:// protocol or offline
const CHANGELOG_DATA_FALLBACK = {
  "currentVersion": "v8.8",
  "lastUpdated": "September 2026",
  "documentationUrl": "doc/history.md",
  "history": [
    {
      "version": "v8.8",
      "badge": "Latest",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Desktop Home Button Restoration & Search Courses Removal",
          "description": "Restored the desktop floating Home button (#spa-back-btn) aligned with the top frosted-glass header, allowing instant one-click return to the home view. Removed the redundant Search Courses button from the top navigation bar across all content sections, keeping only direct departmental and resource section links."
        }
      ]
    },
    {
      "version": "v8.7",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Expanded Top Navigation Bar Buttons for Content Sections",
          "description": "Updated the desktop top navigation bar across all content sections to include all 8 primary navigation buttons (Search Courses, Info, Question Bank, Departments, Donate, ECA, Library, About) matching the main navigation list. Added flex wrapping and proportional button padding to ensure seamless rendering across all desktop screen sizes."
        }
      ]
    },
    {
      "version": "v8.6",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Desktop Top Navigation Bar for Content Sections",
          "description": "Added persistent desktop top navigation bar (Home, Departments, Q-Bank, Library) to all content-section views in index.html matching the Departments.html header aesthetics. Features frosted-glass backdrop filter, centered links, and seamless SPA routing without page reloads, while suppressing the navigation on mobile to preserve touch drawer ergonomics."
        }
      ]
    },
    {
      "version": "v8.5",
      "badge": "Fix",
      "date": "18.09.26",
      "changes": [
        {
          "type": "Bug Fix",
          "title": "Desktop Screen Size CSS Restoration & Media Query Scoping",
          "description": "Resolved critical styling failure on desktop screens caused by an unclosed @media (max-width: 768px) block in style.css. The missing closing brace after #theme-toggle inadvertently trapped over 4,500 lines of core styling (including html layout, universal custom matte scrollbars, body flex centering, typography, and desktop components) inside the mobile-only query, causing browsers to ignore desktop styles entirely."
        }
      ]
    },
    {
      "version": "v8.4",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Mobile Scheduler Nav Drawer Item (above Coffee button)",
          "description": "Revised mobile b1t Scheduler approach: hides fixed #floating-button entirely on mobile and adds a .mobile-scheduler-nav-item list item inside the sliding nav drawer directly above the Coffee support button. Styled as a pill button with float animation matching the drawer aesthetic. Removed IntersectionObserver script and pendulum hanging animation."
        }
      ]
    },
    {
      "version": "v8.3",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Pendulum Hanging Animation for Mobile Scheduler Button",
          "description": "Redesigned the mobile hanging b1t Scheduler droplet button animation: changed transform-origin to 50% 0 (top-center suspension point), positioned below #theme-toggle. Keyframes swing from rotate(-8deg) to rotate(8deg). Removed conflicting transform transition. Simplified IntersectionObserver."
        }
      ]
    },
    {
      "version": "v8.2",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Mobile Drawer Coffee Button Placement & IntersectionObserver Scheduler Transition",
          "description": "Moved the mobile navigation drawer Coffee support button downward directly above the Changelog trigger, eliminating top-drawer fixed coordinates. Implemented IntersectionObserver visibility detection on the intro section with cubic-bezier spring transitions for the hanging scheduler droplet button on mobile viewports, modeled after portfolio reference patterns."
        }
      ]
    },
    {
      "version": "v8.1",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Upload Section Mobile Button Padding & Scaling",
          "description": "Scaled down button padding and dimensions for .upload-card across mobile screen widths (padding: 0.65rem 0.75rem and 135px width/height on <=768px, padding: 0.5rem and 120px width/height on <=480px) with proportional grid gap tuning, matching the scaled-down card images and ensuring snug, well-proportioned button footprints."
        }
      ]
    },
    {
      "version": "v8.0",
      "badge": "Fix",
      "date": "18.09.26",
      "changes": [
        {
          "type": "Fix",
          "title": "Question Bank Modal Mobile Width Stabilization & Truncation",
          "description": "Resolved mobile width stretching in the Question Bank modal when displaying long file names. Enforced strict flex and block-level text ellipsis on .qbank-link and .explorer-item-name with min-width: 0 and overflow-x: hidden containment across all modal container levels, locking mobile modal width invariant to content."
        }
      ]
    },
    {
      "version": "v7.9",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Hanging Water Droplet Scheduler & Mobile Sidebar Coffee Button",
          "description": "Redesigned the mobile b1t Scheduler button as an elongated water droplet suspended 90 degrees downward beneath the theme toggle with fluid pendulum swaying micro-animation and tapered asymmetric padding. Relocated the Coffee support button directly into the mobile navigation drawer in place of the previous scheduler link."
        }
      ]
    },
    {
      "version": "v7.8",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Mobile Floating Buttons Placement Swap",
          "description": "Swapped mobile screen placement between the Coffee support button (#support-qr-persistent) and the b1t Scheduler button (#floating-button). On mobile screens (<=768px), b1t Scheduler now sits prominently in the top header beside the theme toggle while the persistent Coffee button is concealed."
        }
      ]
    },
    {
      "version": "v7.7",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Upload Section Mobile Card Image Scaling",
          "description": "Scaled down .upload-card-image dimensions on mobile screen widths (from 150px to 105px on <=768px and 90px on <=480px) with proportionally tuned margins, preventing card overcrowding and enhancing visual proportioning."
        }
      ]
    },
    {
      "version": "v7.6",
      "badge": "Fix",
      "date": "18.09.26",
      "changes": [
        {
          "type": "Fix",
          "title": "Persistent Support Button & Mobile Navigation Overlap Prevention",
          "description": "Resolved overlap between the persistent Coffee support button (#support-qr-persistent) and the mobile navigation drawer (#sticky-nav). Lowered button z-index to 2500, elevated mobile drawer and overlay z-indices to 3500/3400, and added automatic fade-out dismissal whenever the drawer is open."
        }
      ]
    },
    {
      "version": "v7.5",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Mobile Navigation Drawer Centering & Floating Button Margin",
          "description": "Added responsive top margin (8.5rem) to the mobile navigation links list (.sticky-nav ul) to cleanly center the navigation items in the sidebar drawer and completely prevent overlap with the floating b1t Scheduler button."
        }
      ]
    },
    {
      "version": "v7.4",
      "badge": "Fix",
      "date": "18.09.26",
      "changes": [
        {
          "type": "Fix",
          "title": "Unclosed Parent Modal Hierarchy Resolution",
          "description": "Resolved critical HTML nesting issue where #changelog-modal was trapped inside an unclosed hidden #qbank-modal container, preventing the changelog modal from rendering on screen."
        }
      ]
    },
    {
      "version": "v7.3",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Mobile Navigation Drawer Changelog Button Relocation",
          "description": "Moved the mobile Changelog button to the very bottom of the sliding navigation drawer with an automatic top margin anchor and subtle border separator for a cleaner menu layout."
        }
      ]
    },
    {
      "version": "v7.2",
      "badge": "Fix",
      "date": "18.09.26",
      "changes": [
        {
          "type": "Fix",
          "title": "Changelog Modal Offline & Protocol Resiliency",
          "description": "Resolved issue where the changelog modal would not display upon button click due to CORS fetch restrictions on file:// protocols. Added embedded fallback data, delegated document click listeners, inline onclick fallbacks, and elevated overlay z-index."
        }
      ]
    },
    {
      "version": "v7.1",
      "badge": "Feature",
      "date": "18.09.26",
      "changes": [
        {
          "type": "New Feature",
          "title": "Changelog Manual Trigger Buttons (Desktop & Mobile)",
          "description": "Added responsive trigger buttons to manually open the What's New changelog modal: a floating glassmorphic pill button positioned at the bottom-left of the homepage for desktop, and a dedicated menu item with a live version badge inside the mobile navigation drawer."
        }
      ]
    },
    {
      "version": "v7.0",
      "badge": "UI/UX",
      "date": "18.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Search Bar Clear Button",
          "description": "Added an interactive clear button (X) inside the course search input that dynamically appears when typing, allowing one-click query clearance and refocusing with dark and light theme support."
        }
      ]
    },
    {
      "version": "v6.9",
      "badge": "Feature",
      "date": "17.09.26",
      "changes": [
        {
          "type": "New Feature",
          "title": "Visitor Changelog Modal & Changes JSON Architecture",
          "description": "Implemented an automated 'What's New' visitor changelog modal modeled on b1t-Sched, automatically detecting new site updates based on Service Worker CACHE_NAME, with full dark/light theme support, tag pills, and an accordion for earlier releases."
        },
        {
          "type": "Enhancement",
          "title": "Course Search Enter Selection & Dual-Theme Keyboard Navigation",
          "description": "Allowed desktop users to press Enter in the course search input to immediately open the top result in a new tab without prior arrow navigation. Replaced hardcoded inline colors with semantic .active classes and high-contrast dual-theme highlight styles."
        }
      ]
    },
    {
      "version": "v6.8",
      "badge": "Fix",
      "date": "17.09.26",
      "changes": [
        {
          "type": "Fix",
          "title": "Dark Theme Contrast for Mirror Links & Sitewide .link-hover-a",
          "description": "Resolved low contrast issue in the bottom mirror links banner ([mirror: Netlify / GitHub]). Replaced hardcoded black text in .link-hover-a with bright accent color #64b5f6 in dark theme and #1976d2 in light theme sitewide."
        }
      ]
    },
    {
      "version": "v6.7",
      "badge": "UI/UX",
      "date": "17.09.26",
      "changes": [
        {
          "type": "UI/UX",
          "title": "Submission Page Mobile Floating Back Button",
          "description": "Repositioned the back button on mobile devices (<= 768px) to float at the bottom-right corner with a pill shape, glassmorphic backdrop blur, and dark-theme border glow, matching the mobile home button on index.html."
        },
        {
          "type": "New Feature",
          "title": "Animated Collapsible Notice Banner with Top-Bar Info Trigger",
          "description": "Implemented dynamic notice banner architecture that displays prominently on initial page load, then automatically glides and minimizes into a top-bar info trigger icon after 4 seconds (with hover-pause). Clicking the icon expands or collapses the banner with smooth animation."
        },
        {
          "type": "UI/UX",
          "title": "Compact Circular Icon Actions on Mobile Submissions",
          "description": "Hid text labels on mobile screen widths, transforming the notification action buttons into compact 44x44px circular icon buttons with tooltips and accessible touch hit zones."
        }
      ]
    },
    {
      "version": "v6.6",
      "badge": "Major",
      "date": "17.09.26",
      "changes": [
        {
          "type": "New Feature",
          "title": "Club Resources Sub-Section & Wings Modal Architecture",
          "description": "Added a dedicated Club Resources sub-section inside Extra Curricular Activities (ECA) with interactive department club badges and popup modal displaying parent Google Drive access and subsidiary focus wings across all 10 academic departments."
        },
        {
          "type": "New Feature",
          "title": "QBank Full-Screen Popup Modal",
          "description": "Replaced the inline dropdown accordion with a centered launcher button opening a 96vw x 92vh full-screen dialog with circular protruding close button, header banner, tap-outside dismiss, and Escape key handling."
        },
        {
          "type": "UI/UX",
          "title": "Mobile Floating Home Button & Dark Theme Contrast",
          "description": "Repositioned #spa-back-btn on mobile viewports to the bottom-right corner (bottom: 2rem; right: 1.5rem;) with pure white text and icon on hover in dark theme."
        },
        {
          "type": "UI/UX",
          "title": "100vh Viewport Scroll Optimization & Section Headroom Restoration",
          "description": "Eliminated unnecessary scrolling to blank trailing space when sections fit within 100vh, while preserving generous top clearance below top floating overlays."
        },
        {
          "type": "UI/UX",
          "title": "Universal Matte Scrollbars & Sticky Nav Width Stabilization",
          "description": "Deployed custom matte scrollbars across the website and modals, and stabilized layout width during sidebar expansion using scrollbar-gutter: stable."
        },
        {
          "type": "UI/UX",
          "title": "Light Theme (Gray Mode) Comprehensive Contrast Audit",
          "description": "Un-nested global gray theme styles to cover mobile viewports and eliminated hardcoded inline white styles across headings, paragraphs, hints, tooltips, tables, and file explorer cards."
        }
      ]
    },
    {
      "version": "v5.5",
      "badge": "Refactor",
      "date": "17.09.26",
      "changes": [
        {
          "type": "Refactor",
          "title": "Visitor Counter & Glitch Intro Archival to old-code/",
          "description": "Cleaned up the production homepage by excising the delayed visitor counter badge and first-visit chromatic aberration glitch intro, preserving both as standalone modular test benches in old-code/."
        }
      ]
    },
    {
      "version": "v5.0",
      "badge": "Docs",
      "date": "04.09.26",
      "changes": [
        {
          "type": "Docs",
          "title": "Legacy Codebase & Old Design Architectural Archive",
          "description": "Created comprehensive documentation in doc/old-files-archive.md analyzing legacy UI patterns, mobile drawer FAB controllers, preloaders, and semester selectors."
        },
        {
          "type": "Docs",
          "title": "Agent Guidelines & Archiving Workflow Synchronization",
          "description": "Standardized AI development workflows in AGENTS.md, automated history tracking in doc/history.md, and established full turn prompt archiving in doc/prompts/."
        }
      ]
    }
  ]
};

const ChangelogModal = {
  data: null,
  storageKey: 'b1t_acad_last_seen_version',
  docUrl: 'doc/history.md',
  isInitialized: false,

  /**
   * Initialize Changelog Modal
   */
  async init() {
    this.setupEventListeners();
    const data = await this.fetchChanges();
    if (data && data.currentVersion) {
      this.updateBadgePills(data.currentVersion);
    }
    this.checkAndShowChangelog(false);
    this.isInitialized = true;
  },

  /**
   * Update all version badge pills across UI
   */
  updateBadgePills(version) {
    if (!version) return;
    const badges = document.querySelectorAll('.changelog-badge-pill');
    badges.forEach(badge => {
      badge.textContent = version;
    });
  },

  /**
   * Fetch changes.json with automatic fallback to embedded data
   */
  async fetchChanges() {
    if (this.data) return this.data;
    try {
      const response = await fetch('changes.json?t=' + Date.now());
      if (response && response.ok) {
        this.data = await response.json();
        return this.data;
      }
    } catch (error) {
      // Expected when browsing file:/// protocol locally or offline
      console.info('[ChangelogModal] fetch failed or blocked (file:// protocol), using fallback dataset');
    }
    this.data = CHANGELOG_DATA_FALLBACK;
    return this.data;
  },

  /**
   * Check if current version is newer than last seen version, or force open
   */
  async checkAndShowChangelog(forceOpen = false) {
    const data = await this.fetchChanges();
    if (!data) return;

    const lastSeenVersion = localStorage.getItem(this.storageKey);
    const currentVersion = data.currentVersion || 'v7.1';

    if (forceOpen || !lastSeenVersion || lastSeenVersion !== currentVersion) {
      this.render(data);
      this.open();
    }
  },

  /**
   * Render changelog data into modal DOM
   */
  render(data) {
    const titleBadge = document.getElementById('changelog-version-badge');
    const bodyEl = document.getElementById('changelog-modal-body');

    if (titleBadge) {
      titleBadge.textContent = data.currentVersion || 'Latest';
    }
    this.updateBadgePills(data.currentVersion);

    if (!bodyEl) return;

    const history = data.history || [];
    if (history.length === 0) {
      bodyEl.innerHTML = '<p style="text-align: center; color: var(--text-content);">No changelog details available.</p>';
      return;
    }

    const latest = history[0];
    const olderVersions = history.slice(1);

    let html = `
      <div class="changelog-version-section">
        <div class="changelog-version-header">
          <div class="changelog-version-title">
            <span>Version ${this.escapeHtml(latest.version)}</span>
            <span class="changelog-tag ${this.getTagClass(latest.badge || 'Latest')}">${this.escapeHtml(latest.badge || 'Latest')}</span>
          </div>
          <span class="changelog-date">${this.escapeHtml(latest.date || '')}</span>
        </div>
        <div class="changelog-items-list">
          ${(latest.changes || []).map(change => `
            <div class="changelog-item">
              <div class="changelog-item-title-row">
                <span class="changelog-tag ${this.getTagClass(change.type)}">${this.escapeHtml(change.type || 'Update')}</span>
                <span class="changelog-item-title">${this.escapeHtml(change.title || '')}</span>
              </div>
              <p class="changelog-item-desc">${this.escapeHtml(change.description || '')}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Render older versions accordion if available
    if (olderVersions.length > 0) {
      html += `
        <button id="changelog-history-toggle" class="changelog-history-toggle" type="button" aria-expanded="false">
          <span><i class="fa-solid fa-clock-rotate-left"></i> View Earlier Updates (${olderVersions.length} versions)</span>
          <i class="fa-solid fa-chevron-down changelog-chevron"></i>
        </button>
        <div id="changelog-history-list" class="changelog-history-list">
          ${olderVersions.map(ver => `
            <div class="changelog-history-item">
              <div class="changelog-history-header">
                <div class="changelog-history-version">
                  <span>${this.escapeHtml(ver.version)}</span>
                  ${ver.badge ? `<span class="changelog-tag ${this.getTagClass(ver.badge)}">${this.escapeHtml(ver.badge)}</span>` : ''}
                </div>
                <span class="changelog-date">${this.escapeHtml(ver.date || '')}</span>
              </div>
              <div class="changelog-items-list">
                ${(ver.changes || []).map(change => `
                  <div class="changelog-item">
                    <div class="changelog-item-title-row">
                      <span class="changelog-tag ${this.getTagClass(change.type)}">${this.escapeHtml(change.type || 'Update')}</span>
                      <span class="changelog-item-title">${this.escapeHtml(change.title || '')}</span>
                    </div>
                    <p class="changelog-item-desc">${this.escapeHtml(change.description || '')}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    bodyEl.innerHTML = html;

    // Attach accordion toggle listener
    const historyToggle = document.getElementById('changelog-history-toggle');
    const historyList = document.getElementById('changelog-history-list');
    if (historyToggle && historyList) {
      historyToggle.addEventListener('click', () => {
        const isOpen = historyList.classList.toggle('open');
        historyToggle.classList.toggle('active', isOpen);
        historyToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  },

  /**
   * Helper to get CSS class for a change badge/tag
   */
  getTagClass(type) {
    if (!type) return 'enhancement';
    const lower = type.toLowerCase();
    if (lower.includes('feature')) return 'new-feature';
    if (lower.includes('fix') || lower.includes('bug')) return 'fix';
    if (lower.includes('security')) return 'security';
    if (lower.includes('major')) return 'major';
    if (lower.includes('ui') || lower.includes('ux')) return 'ui-ux';
    if (lower.includes('refactor')) return 'refactor';
    if (lower.includes('doc')) return 'docs';
    return 'enhancement';
  },

  /**
   * Basic HTML escaping for safe rendering
   */
  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Setup modal event listeners with robust global delegation
   */
  setupEventListeners() {
    const handleDismiss = () => {
      this.close();
      if (this.data && this.data.currentVersion) {
        localStorage.setItem(this.storageKey, this.data.currentVersion);
      }
    };

    // Global click delegation for all triggers & modal actions
    document.addEventListener('click', (e) => {
      // 1. Check if clicking a changelog trigger button / link
      const trigger = e.target.closest('#view-changelog-link, #desktop-changelog-btn, #mobile-changelog-btn, .view-changelog-btn, [data-open-changelog]');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        this.checkAndShowChangelog(true);
        return;
      }

      // 2. Check if clicking close / got it buttons
      const closeBtn = e.target.closest('#close-changelog-modal, #changelog-modal-got-it-btn');
      if (closeBtn) {
        e.preventDefault();
        handleDismiss();
        return;
      }

      // 3. Backdrop dismiss
      const modal = document.getElementById('changelog-modal');
      if (modal && e.target === modal) {
        handleDismiss();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('changelog-modal');
      if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
        handleDismiss();
      }
    });
  },

  /**
   * Open the Changelog Modal
   */
  open() {
    const modal = document.getElementById('changelog-modal');
    if (modal) {
      modal.style.setProperty('display', 'flex', 'important');
      document.body.classList.add('no-scroll');
    }
  },

  /**
   * Close the Changelog Modal
   */
  close() {
    const modal = document.getElementById('changelog-modal');
    if (modal) {
      modal.style.setProperty('display', 'none', 'important');
      document.body.classList.remove('no-scroll');
    }
  }
};

// Export to window for accessibility sitewide
window.ChangelogModal = ChangelogModal;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ChangelogModal.init();
  });
} else {
  ChangelogModal.init();
}
