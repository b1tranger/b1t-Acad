// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function () {
  const navHTML = `
    <a href="https://b1tsched.netlify.app/" target="blank">
          <small>b1t Scheduler</small>
        </a>
      
      
      <!-- Add other navigation links here -->
    `;

  // Insert the nav HTML into any element with class "navigation"
  document.querySelectorAll('.navigation1').forEach(nav => {
    nav.innerHTML = navHTML;
  });
});