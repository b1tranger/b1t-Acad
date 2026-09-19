/**
 * Contribution Incentive Modal Module
 * Displays a motivational introductory modal when visitors enter the Question Bank (#Qbank)
 * or Donate Resources (#Donate) sections for the first time.
 */

const ContributionModal = {
  storageKey: 'b1t_contribution_intro_seen',
  modalId: 'contribution-modal',

  /**
   * Initialize Contribution Modal
   */
  init() {
    this.setupEventListeners();
    this.checkCurrentSection();
  },

  /**
   * Check if current route/hash is #Qbank or #Donate and trigger if not seen
   */
  checkCurrentSection() {
    const hash = (window.location.hash || '').toLowerCase();
    if (hash === '#qbank' || hash === '#donate') {
      this.checkAndShow();
    }
  },

  /**
   * Show modal if visitor hasn't seen it yet
   */
  checkAndShow() {
    if (!this.hasSeen()) {
      // Small timeout to allow SPA route transitions and rendering to settle
      setTimeout(() => {
        this.open();
        this.markAsSeen();
      }, 350);
    }
  },

  /**
   * Check localStorage status
   */
  hasSeen() {
    try {
      return localStorage.getItem(this.storageKey) === 'true';
    } catch (e) {
      return false;
    }
  },

  /**
   * Mark modal as seen in localStorage
   */
  markAsSeen() {
    try {
      localStorage.setItem(this.storageKey, 'true');
    } catch (e) {
      // Ignore private browsing storage quota errors
    }
  },

  /**
   * Open the Contribution Modal
   */
  open() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.style.setProperty('display', 'flex', 'important');
      document.body.classList.add('no-scroll');
    }
  },

  /**
   * Close the Contribution Modal
   */
  close() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.style.setProperty('display', 'none', 'important');
      document.body.classList.remove('no-scroll');
    }
    this.markAsSeen();
  },

  /**
   * Setup global event listeners with delegation
   */
  setupEventListeners() {
    // 1. Listen for SPA hash changes
    window.addEventListener('hashchange', () => {
      this.checkCurrentSection();
    });

    // 2. Click delegation for triggers, buttons, and backdrop dismiss
    document.addEventListener('click', (e) => {
      // Manual triggers (e.g. "Why Donate?" info pills or buttons)
      const trigger = e.target.closest('[data-open-contribution-modal], .btn-why-donate');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        this.open();
        return;
      }

      // Intercept navigation links heading to #Qbank or #Donate
      const navLink = e.target.closest('a[href="#Qbank"], a[href="#Donate"], a[href="#qbank"], a[href="#donate"]');
      if (navLink && !this.hasSeen()) {
        setTimeout(() => {
          this.checkAndShow();
        }, 400);
      }

      // Close buttons
      const closeBtn = e.target.closest('#close-contribution-modal, #contribution-modal-got-it-btn');
      if (closeBtn) {
        e.preventDefault();
        this.close();
        return;
      }

      // Backdrop dismiss
      const modal = document.getElementById(this.modalId);
      if (modal && e.target === modal) {
        this.close();
      }
    });

    // 3. Escape key to dismiss
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById(this.modalId);
      if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
        this.close();
      }
    });
  }
};

// Export to window
window.ContributionModal = ContributionModal;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ContributionModal.init();
  });
} else {
  ContributionModal.init();
}
