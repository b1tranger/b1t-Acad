/**
 * SPA (Single Page Application) Router Module
 * Controls seamless in-page routing between Homescreen and Content Sections
 */

(function () {
    function initSpa() {
        // Select main structural elements
        const homeSection = document.querySelector('main.container');
        const contentWrapper = document.querySelector('.content-wrapper');
        const sections = document.querySelectorAll('.content-section');
        const backBtn = document.getElementById('spa-back-btn');

        /**
         * Synchronize page state classes on <html>
         */
        function updatePageState(isSection) {
            if (isSection) {
                document.documentElement.classList.remove('page-state-home');
                document.documentElement.classList.add('page-state-section');
            } else {
                document.documentElement.classList.remove('page-state-section');
                document.documentElement.classList.add('page-state-home');
            }
        }

        function handleRouting() {
            const hash = window.location.hash;

            // Hide all sub-sections initially
            sections.forEach(sec => sec.style.display = 'none');

            if (!hash || hash === '#' || hash === '#course-search') {
                // Show Home Page
                updatePageState(false);
                if (homeSection) homeSection.style.display = 'block';
                if (contentWrapper) contentWrapper.style.display = 'none';
                if (backBtn) backBtn.style.display = 'none';

                document.title = "b1t Academics";
            } else {
                // Target a specific section
                let targetSection = null;
                try {
                    targetSection = document.querySelector(hash);
                } catch (e) {
                    // Ignore invalid selectors like #invalid%hash
                }

                // If not found directly, attempt case-insensitive match against section IDs
                if (!targetSection && hash.length > 1) {
                    const cleanHash = hash.substring(1).toLowerCase();
                    sections.forEach(sec => {
                        if (sec.id && sec.id.toLowerCase() === cleanHash) {
                            targetSection = sec;
                        }
                    });
                }

                if (targetSection && targetSection.classList.contains('content-section')) {
                    // Valid Section found: Open sub-page view
                    updatePageState(true);
                    if (homeSection) homeSection.style.display = 'none';
                    if (contentWrapper) contentWrapper.style.display = 'block';
                    targetSection.style.display = 'block';
                    if (backBtn) backBtn.style.display = 'flex';

                    // Set Document Title
                    const sectionTitle = targetSection.querySelector('h2');
                    if (sectionTitle) {
                        document.title = `${sectionTitle.textContent} - b1t Academics`;
                    }

                    // Scroll to top of the new page
                    window.scrollTo(0, 0);
                } else if (targetSection && targetSection.closest('.content-section')) {
                    // Target is inside a content section (e.g., #book-session inside #info)
                    const parentSection = targetSection.closest('.content-section');

                    updatePageState(true);
                    if (homeSection) homeSection.style.display = 'none';
                    if (contentWrapper) contentWrapper.style.display = 'block';
                    parentSection.style.display = 'block';
                    if (backBtn) backBtn.style.display = 'flex';

                    // Set Document Title
                    const sectionTitle = parentSection.querySelector('h2');
                    if (sectionTitle) {
                        document.title = `${sectionTitle.textContent} - b1t Academics`;
                    }

                    // Scroll down to the nested element after layout renders
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else {
                    // Invalid hash or internal fragment on home page
                    updatePageState(false);
                    if (homeSection) homeSection.style.display = 'block';
                    if (contentWrapper) contentWrapper.style.display = 'none';
                    if (backBtn) backBtn.style.display = 'none';
                    document.title = "b1t Academics";
                }
            }
        }

        // Listen to hash changes in the URL
        window.addEventListener('hashchange', handleRouting);

        // Call once on initial load
        handleRouting();

        // Back button behavior
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Clear hash to return home
                window.location.hash = '';
            });
        }

        // Intercept clicks on links pointing to "index.html" to return home smoothly without reload
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === 'index.html' || href === 'index.html#' || href === '#') {
                    if (window.location.hash) {
                        e.preventDefault();
                        window.location.hash = '';
                        handleRouting();
                        window.scrollTo(0, 0);
                    } else if (href === '#' || href === 'index.html#') {
                        e.preventDefault();
                        handleRouting();
                        window.scrollTo(0, 0);
                    }
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSpa);
    } else {
        initSpa();
    }
})();
