
        document.addEventListener('DOMContentLoaded', function () {
            // Button and popup pairs
            const menuPairs = [
                // { button: 'menuButton1', popup: 'popupMenu1' },
                { button: 'menuButton2', popup: 'popupMenu2' },
                { button: 'menuButton3', popup: 'popupMenu3' },
                { button: 'menuButton4', popup: 'popupMenu4' },
                { button: 'menuButton5', popup: 'popupMenu5' },
                { button: 'menuButton6', popup: 'popupMenu6' }
                // Add more pairs as needed
            ];

            const popupBackdrop = document.getElementById('popupBackdrop');
            let activePopup = null;

            // Set up each button-popup pair
            menuPairs.forEach(pair => {
                const button = document.getElementById(pair.button);
                const popup = document.getElementById(pair.popup);

                button.addEventListener('click', function () {
                    // Open this specific popup
                    popup.classList.add('open');
                    popupBackdrop.classList.add('open');
                    button.classList.add('active');
                    activePopup = popup;
                });
            });

            // Close buttons for all popups
            const closeButtons = document.querySelectorAll('.popup-close-btn');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', closeActivePopup);
            });

            // Backdrop click closes any open popup
            popupBackdrop.addEventListener('click', closeActivePopup);

            function closeActivePopup() {
                // Remove active class from all buttons
                document.querySelectorAll('.menu-button').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Close all popups
                document.querySelectorAll('.popup-menu').forEach(popup => {
                    popup.classList.remove('open');
                });

                // Hide backdrop
                popupBackdrop.classList.remove('open');
                activePopup = null;
            }
        });
    