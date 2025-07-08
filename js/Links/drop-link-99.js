// Links fro the dropdown menu under top nav bar


// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
    <a href="https://b1tranger.netlify.app/#coffee" 
      target="_blank"><small>buy me a coffee?</small></a>
      <!-- Add other navigation links here -->
    `;
    
    // Insert the nav HTML into any element with class "navigation"
    document.querySelectorAll('.navigation5').forEach(nav => {
      nav.innerHTML = navHTML;
    });
  });