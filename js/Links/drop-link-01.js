// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function () {
  const navHTML = `
    <a style="color: rgb(0, 0, 0);" class="active-1" href="https://ouits-schedule.netlify.app/" target="blank">
          <small>oUITS Scheduler</small>
        </a>
      
      
      <!-- Add other navigation links here -->
    `;

  // Insert the nav HTML into any element with class "navigation"
  document.querySelectorAll('.navigation1').forEach(nav => {
    nav.innerHTML = navHTML;
  });
});