// Links fro the dropdown menu under top nav bar


// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
    <a href="https://github.com/orgs/oU1TS/repositories" 
      target="_blank"><small>All Repositories</small></a>
      <!-- Add other navigation links here -->
    `;
    
    // Insert the nav HTML into any element with class "navigation"
    document.querySelectorAll('.navigation5').forEach(nav => {
      nav.innerHTML = navHTML;
    });
  });