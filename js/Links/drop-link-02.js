// Links fro the dropdown menu under top nav bar


// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function () {
  const navHTML = `
      <a href="https://drive.google.com/drive/folders/1g93wCOUo4x0qvhNk_HHUb8Ozv_KuSLmL?usp=sharing" target="_blank">
          <small>Resources Google Drive</small>
        </a>
      <!-- Add other navigation links here -->
    `;

  // Insert the nav HTML into any element with class "navigation"
  document.querySelectorAll('.navigation2').forEach(nav => {
    nav.innerHTML = navHTML;
  });
});