// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function () {
  const navHTML = `
      <a href="https://drive.google.com/drive/folders/1ikxxwqtI0l90ouTQfe9vcg4vg2Ldfskv?usp=drive_link"
                        target="_blank">
                        G-Drive Archives
                    </a>
      <!-- Add other navigation links here -->
    `;

  // Insert the nav HTML into any element with class "navigation"
  document.querySelectorAll('.navigation-archive').forEach(nav => {
    nav.innerHTML = navHTML;
  });
});

// FIND: Drive LINK 