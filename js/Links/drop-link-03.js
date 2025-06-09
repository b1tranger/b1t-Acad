// Links fro the dropdown menu under top nav bar


// Create a file called shared-elements.js
document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
    <a class="active-1" href="https://github.com/b1tranger/oUITS-Resources/releases" 
      target="_blank" style="color:rgb(0, 0, 0);"><small>oUITS-Resources .apk</small></a>
      <!-- Add other navigation links here -->
    `;
    
    // Insert the nav HTML into any element with class "navigation"
    document.querySelectorAll('.navigation3').forEach(nav => {
      nav.innerHTML = navHTML;
    });
  });