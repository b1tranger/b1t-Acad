// Check for saved theme preference, otherwise use default
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Function to update icon
    function updateIcon() {
        if (!themeIcon) return;
        const isGray = document.documentElement.getAttribute('data-theme') === 'gray';
        if (isGray) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Set initial icon
    updateIcon();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            let newTheme = 'dark'; // Default to dark (no attribute)

            if (current === 'gray') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'gray');
                localStorage.setItem('theme', 'gray');
            }

            updateIcon();
        });
    }

    // --- Mobile Menu Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('sticky-nav');
    const overlay = document.getElementById('overlay');

    if (menuToggle && mobileNav && overlay) {
        const toggleMenu = () => {
            mobileNav.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }
});
