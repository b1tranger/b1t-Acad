document.addEventListener('DOMContentLoaded', () => {
    // Select main structural elements
    const homeSection = document.querySelector('main.container');
    const contentWrapper = document.querySelector('.content-wrapper');
    const sections = document.querySelectorAll('.content-section');
    const backBtn = document.getElementById('spa-back-btn');

    function handleRouting() {
        const hash = window.location.hash;

        // Hide all sub-sections initially
        sections.forEach(sec => sec.style.display = 'none');

        if (!hash || hash === '#') {
            // Show Home Page
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

            if (targetSection && targetSection.classList.contains('content-section')) {
                // Valid Section found: Open sub-page view
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
            } else {
                // Invalid hash or internal fragment on home page (like #course-search)
                if (homeSection) homeSection.style.display = 'block';
                if (contentWrapper) contentWrapper.style.display = 'none';
                if (backBtn) backBtn.style.display = 'none';
                document.title = "b1t Academics";

                // We don't prevent default, so the browser scrolls to the element (e.g., #course-search)
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
});
