// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function () {
  const navHTML = `
      <a href="https://drive.google.com/drive/u/2/folders/1Cdyu6RMn0N52g_whxvL1sluLCZ_YvS4X"
                        target="_blank">
                        G-Drive Archive
                    </a>
      <!-- Add other navigation links here -->
    `;

  // Insert the nav HTML into any element with class "navigation"
  document.querySelectorAll('.navigation-archive').forEach(nav => {
    nav.innerHTML = navHTML;
  });
});

// FIND: Drive LINK 