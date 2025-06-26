// Links fro the dropdown menu under top nav bar


// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
    <a href="References.html#credits">Made by b1tranger</a>
      <!-- Add other navigation links here -->
    `;
    
    // Insert the nav HTML into any element with class "navigation"
    document.querySelectorAll('.navigation4').forEach(nav => {
      nav.innerHTML = navHTML;
    });
  });