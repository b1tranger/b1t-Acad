/**
 * Changelog / What's New Modal Module
 * Displays website updates from changes.json when the Service Worker CACHE_NAME updates
 * Modeled on b1t-Sched changelog architecture
 */

const ChangelogModal = {
  data: null,
  storageKey: 'b1t_acad_last_seen_version',
  docUrl: 'doc/history.md',

  /**
   * Initialize Changelog Modal
   */
  async init() {
    this.setupEventListeners();
    const data = await this.fetchChanges();
    if (data && data.currentVersion) {
      this.updateBadgePills(data.currentVersion);
    }
    this.checkAndShowChangelog();
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
   * Fetch changes.json bypassing HTTP caching
   */
  async fetchChanges() {
    if (this.data) return this.data;
    try {
      const response = await fetch('changes.json?t=' + Date.now());
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.warn('[ChangelogModal] Could not fetch changes.json:', error);
      return null;
    }
  },

  /**
   * Check if current version is newer than last seen version and show modal
   */
  async checkAndShowChangelog(forceOpen = false) {
    const data = await this.fetchChanges();
    if (!data || !data.currentVersion) return;

    const lastSeenVersion = localStorage.getItem(this.storageKey);
    const currentVersion = data.currentVersion;

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
   * Setup modal event listeners
   */
  setupEventListeners() {
    const modal = document.getElementById('changelog-modal');
    const closeBtn = document.getElementById('close-changelog-modal');
    const gotItBtn = document.getElementById('changelog-modal-got-it-btn');

    const handleDismiss = () => {
      this.close();
      if (this.data && this.data.currentVersion) {
        localStorage.setItem(this.storageKey, this.data.currentVersion);
      }
    };

    if (closeBtn) {
      closeBtn.onclick = handleDismiss;
    }

    if (gotItBtn) {
      gotItBtn.onclick = handleDismiss;
    }

    // Manual trigger hooks (desktop floating button, mobile nav item, footer links)
    const triggerElements = document.querySelectorAll('#view-changelog-link, #desktop-changelog-btn, #mobile-changelog-btn, .view-changelog-btn');
    triggerElements.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.checkAndShowChangelog(true);
      });
    });

    // Backdrop click dismiss
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          handleDismiss();
        }
      };
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
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
      modal.style.display = 'flex';
      document.body.classList.add('no-scroll');
    }
  },

  /**
   * Close the Changelog Modal
   */
  close() {
    const modal = document.getElementById('changelog-modal');
    if (modal) {
      modal.style.display = 'none';
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
