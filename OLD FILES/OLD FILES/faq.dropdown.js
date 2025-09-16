
document.addEventListener('DOMContentLoaded', function () {
  const dropdownHeaders = document.querySelectorAll('.dropdown-header');

  // Function to close all dropdowns
  function closeAllDropdowns() {
    dropdownHeaders.forEach(header => {
      header.classList.remove('active');
      header.nextElementSibling.classList.remove('show');
    });
  }

  // Add click event to each dropdown header
  dropdownHeaders.forEach(header => {
    header.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent clicking from bubbling to document

      // Get the content element that follows this header
      const content = this.nextElementSibling;

      // If this dropdown is already open, close it
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        content.classList.remove('show');
      } else {
        // Otherwise, close all dropdowns and open this one
        closeAllDropdowns();
        this.classList.add('active');
        content.classList.add('show');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    closeAllDropdowns();
  });

  // Prevent clicks inside dropdown content from closing the dropdown
  const dropdownContents = document.querySelectorAll('.dropdown-content-1');
  dropdownContents.forEach(content => {
    content.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const dropdownHeaders = document.querySelectorAll('.dropdown-header2');

  // Function to close all dropdowns
  function closeAllDropdowns() {
    dropdownHeaders.forEach(header => {
      header.classList.remove('active');
      header.nextElementSibling.classList.remove('show');
    });
  }

  // Add click event to each dropdown header
  dropdownHeaders.forEach(header => {
    header.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent clicking from bubbling to document

      // Get the content element that follows this header
      const content = this.nextElementSibling;

      // If this dropdown is already open, close it
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        content.classList.remove('show');
      } else {
        // Otherwise, close all dropdowns and open this one
        closeAllDropdowns();
        this.classList.add('active');
        content.classList.add('show');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    closeAllDropdowns();
  });

  // Prevent clicks inside dropdown content from closing the dropdown
  const dropdownContents = document.querySelectorAll('.dropdown-content-1');
  dropdownContents.forEach(content => {
    content.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });
});

