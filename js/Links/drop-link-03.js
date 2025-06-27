// Links fro the dropdown menu under top nav bar


// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
    <a href="https://b1tranger.gitbook.io/archive/documentations/web-dev/ouits-resources" 
      target="_blank"><small>Project Documentation</small></a>
      <!-- Add other navigation links here -->
    `;
    
    // Insert the nav HTML into any element with class "navigation"
    document.querySelectorAll('.navigation3').forEach(nav => {
      nav.innerHTML = navHTML;
    });
  });