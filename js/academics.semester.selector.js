// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

  const departmentDropdown = document.getElementById('departmentDropdown');
  const dropdownHeader = document.getElementById('dropdownHeader');
  const dropdownList = document.getElementById('dropdownList');
  const resetButton = document.getElementById('resetButton');
  const semesterList = document.getElementById('semesterList');
  const driveLink = document.getElementById('driveLink');

  // Object mapping departments to semester folder links
  const driveLinks = {
    cse: {
      1: "D1/CSE/S01.html",
      2: "D1/CSE/S02.html",
      3: "D1/CSE/S03.html",
      4: "D1/CSE/S04.html",
      5: "D1/CSE/S05.html",
      6: "D1/CSE/S06.html",
      7: "D1/CSE/S07.html",
      8: "D1/CSE/S08.html",
    },
    ce: {
      1: "D1/CE/S01.html",
      2: "D1/CE/S02.html",
      3: "D1/CE/S03.html",
      4: "D1/CE/S04.html",
      5: "D1/CE/S05.html",
      6: "D1/CE/S06.html",
      7: "D1/CE/S07.html",
      8: "D1/CE/S08.html",
    },
    it: {
      1: "D1/IT/S01.html",
      2: "D1/IT/S02.html",
      3: "D1/IT/S03.html",
      4: "D1/IT/S04.html",
      5: "D1/IT/S05.html",
      6: "D1/IT/S06.html",
      7: "D1/IT/S07.html",
      8: "D1/IT/S08.html",
    }
  };

  // Dropdown toggle functionality
  dropdownHeader.addEventListener('click', () => {
    // FIX: Toggle the class on the main dropdown container, not the list
    departmentDropdown.classList.toggle('open');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!departmentDropdown.contains(event.target)) {
      // FIX: Remove the class from the main dropdown container
      departmentDropdown.classList.remove('open');
    }
  });

  // Dropdown item selection
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
      const department = this.getAttribute('data-value');
      dropdownHeader.textContent = this.textContent;
      // FIX: Remove the class from the main dropdown container
      departmentDropdown.classList.remove('open');

      // Save to session storage
      sessionStorage.setItem('selectedDepartment', department);

      // Update semesters
      updateSemesters(department);
    });
  });

  // Load previous selection from sessionStorage on page load
  const savedDepartment = sessionStorage.getItem('selectedDepartment');
  if (savedDepartment) {
    const departmentItem = document.querySelector(`.dropdown-item[data-value="${savedDepartment}"]`);
    if (departmentItem) {
      dropdownHeader.textContent = departmentItem.textContent;
      updateSemesters(savedDepartment);

      const savedSemester = sessionStorage.getItem('selectedSemester');
      if (savedSemester) {
        // Use a slight delay to ensure buttons are created before trying to find them
        setTimeout(() => {
          const semesterButton = document.querySelector(`.semester-button[data-semester="${savedSemester}"]`);
          if (semesterButton) {
            semesterButton.classList.add('active');
          }
        }, 100);
      }
    }
  }

  // Reset functionality
  resetButton.addEventListener('click', () => {
    dropdownHeader.textContent = 'Select Department';
    semesterList.innerHTML = "";
    driveLink.innerHTML = "";
    sessionStorage.removeItem('selectedDepartment');
    sessionStorage.removeItem('selectedSemester');
  });

  // REPLACE the old updateSemesters function with this one

  // REPLACE the old updateSemesters function with this one

  function updateSemesters(department) {
    // Clear previous semesters and drive link
    semesterList.innerHTML = "";
    driveLink.innerHTML = "";

    if (department) {
      // Create semester links
      for (let i = 1; i <= 8; i++) {
        let semesterLink = document.createElement("a");

        // Set the href attribute
        semesterLink.href = driveLinks[department][i];

        // The line that made it open in a new tab has been removed.
        // semesterLink.target = "_blank"; <-- This line was removed.

        semesterLink.textContent = `Semester ${i}`;
        semesterLink.classList.add('semester-button');
        semesterLink.setAttribute('data-semester', i);

        // The onclick event is for styling and saving the state
        semesterLink.onclick = function () {
          // Remove active class from all links
          document.querySelectorAll('.semester-button').forEach(btn => {
            btn.classList.remove('active');
          });

          // Add active class to clicked link
          this.classList.add('active');

          // Save selected semester to sessionStorage
          sessionStorage.setItem('selectedSemester', i);
        };
        semesterList.appendChild(semesterLink);
      }
    }
  }
});