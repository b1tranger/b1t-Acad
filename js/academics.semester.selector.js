const departmentDropdown = document.getElementById('departmentDropdown');
        const dropdownHeader = document.getElementById('dropdownHeader');
        const dropdownList = document.getElementById('dropdownList');
        const resetButton = document.getElementById('resetButton');
        const semesterList = document.getElementById('semesterList');
        const driveLink = document.getElementById('driveLink');
    
        // Object mapping departments to semester Google Drive folder links
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
            1: "https://drive.google.com/drive/folders/1Q4-tnRaIoLjZenzEZTRs-35OgqV54l9W?usp=drive_link",
            2: "https://drive.google.com/drive/folders/1gAajNJtRo3up6dpnP-R3cTx0trNikJVP?usp=drive_link",
            3: "https://drive.google.com/drive/folders/1XecebUV1rScSMpO0TUbnVoPUWKS8bJAH?usp=drive_link",
            4: "https://drive.google.com/drive/folders/1R3AkpHgDgB2FiHS-gXxPTV7eljZJRknm?usp=drive_link",
            5: "#",
            6: "#",
            7: "#",
            8: "#",
          }
        };
    
        // Dropdown toggle functionality
        dropdownHeader.addEventListener('click', () => {
          dropdownList.classList.toggle('open');
        });
    
        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
          if (!departmentDropdown.contains(event.target)) {
            dropdownList.classList.remove('open');
          }
        });
    
        // Dropdown item selection
        document.querySelectorAll('.dropdown-item').forEach(item => {
          item.addEventListener('click', function () {
            const department = this.getAttribute('data-value');
            dropdownHeader.textContent = this.textContent;
            dropdownList.classList.remove('open');
    
            // Save to session storage
            sessionStorage.setItem('selectedDepartment', department);
    
            // Update semesters
            updateSemesters(department);
          });
        });
    
        // Load previous selection from sessionStorage on page load
        document.addEventListener('DOMContentLoaded', () => {
          const savedDepartment = sessionStorage.getItem('selectedDepartment');
          if (savedDepartment) {
            const departmentItem = document.querySelector(`.dropdown-item[data-value="${savedDepartment}"]`);
            if (departmentItem) {
              dropdownHeader.textContent = departmentItem.textContent;
              updateSemesters(savedDepartment);
    
              const savedSemester = sessionStorage.getItem('selectedSemester');
              if (savedSemester) {
                const semesterButton = document.querySelector(`.semester-button[data-semester="${savedSemester}"]`);
                if (semesterButton) {
                  semesterButton.classList.add('active');
                }
              }
            }
          }
        });
    
        // Reset functionality
        resetButton.addEventListener('click', () => {
          // Reset dropdown header
          dropdownHeader.textContent = 'Select Department';
    
          // Clear semester list
          semesterList.innerHTML = "";
    
          // Clear drive link
          driveLink.innerHTML = "";
    
          // Remove from sessionStorage
          sessionStorage.removeItem('selectedDepartment');
          sessionStorage.removeItem('selectedSemester');
        });
    
        function updateSemesters(department) {
          // Clear previous semesters and drive link
          semesterList.innerHTML = "";
          driveLink.innerHTML = "";
    
          if (department) {
            // Create semester buttons
            for (let i = 1; i <= 8; i++) {
              let semesterButton = document.createElement("button");
              semesterButton.textContent = `Semester ${i}`;
              semesterButton.classList.add('semester-button');
              semesterButton.setAttribute('data-semester', i);
              semesterButton.onclick = function () {
                // Remove active class from all buttons
                document.querySelectorAll('.semester-button').forEach(btn => {
                  btn.classList.remove('active');
                });
    
                // Add active class to clicked button
                this.classList.add('active');
    
                // Save selected semester to sessionStorage
                sessionStorage.setItem('selectedSemester', i);
    
                // Open drive folder
                openDriveFolder(department, i);
              };
              semesterList.appendChild(semesterButton);
            }
          }
        }
    
        function openDriveFolder(department, semester) {
          window.location.href = driveLinks[department][semester];
        }