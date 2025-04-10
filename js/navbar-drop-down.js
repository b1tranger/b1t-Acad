 // Improved dropdown toggle function
 function toggleDropdown(button) {
    // Get the dropdown content element
    var dropdownContent = button.nextElementSibling;

    // Toggle the current dropdown
    dropdownContent.classList.toggle("show");

    // Close all other dropdowns
    document.querySelectorAll(".dropdown-content.show").forEach(function (openDropdown) {
      if (openDropdown !== dropdownContent) {
        openDropdown.classList.remove("show");
      }
    });
  }

  // Add a global click event to close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.matches('.dropbtn')) {
      document.querySelectorAll(".dropdown-content.show").forEach(function (dropdown) {
        dropdown.classList.remove("show");
      });
    } else {
      // Stop event from reaching the document listener when clicking a button
      event.stopPropagation();
    }
  });