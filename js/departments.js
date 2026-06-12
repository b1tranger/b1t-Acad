document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const deptKey = params.get('dept') ? params.get('dept').toUpperCase() : 'CSE';

  const validDepts = Object.keys(departmentsData);
  const currentDept = validDepts.includes(deptKey) ? deptKey : 'CSE';

  // --- 1. Set Page Title & Header ---
  const deptData = departmentsData[currentDept];
  document.title = `UITS - ${departmentNameMap[currentDept] || currentDept} Departments`; // Use map or data

  // Update Department Title in Header
  const deptTitleEl = document.getElementById('dept-title');
  if (deptTitleEl) {
    deptTitleEl.textContent = deptData.full_name;
  }

  // --- Helper: Create SVG Squircle Cell ---
  function createSquircleCell(text, value, isActive, onClick) {
    let fontSize = '3.8px';
    if (text.length > 5) {
      fontSize = '2.8px';
    } else if (text.length > 3) {
      fontSize = '3.3px';
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', `grid-cell ${isActive ? 'active' : ''}`);
    svg.setAttribute('viewBox', '0 0 24 24');
    if (value) {
      svg.setAttribute('data-value', value);
    }

    svg.innerHTML = `
      <path class="squircle-path" d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9 -9 -1.8 -9 -9 1.8 -9 9 -9" stroke-width="0.5"></path>
      <text x="12" y="12.8" class="grid-cell-text" style="font-size: ${fontSize};">${text}</text>
    `;

    svg.addEventListener('click', onClick);
    return svg;
  }

  // --- 2. Setup Department Selector (Dropdown Grid) ---
  const deptDropdown = document.getElementById('dept-dropdown');
  const deptSelectedText = document.getElementById('dept-selected-text');
  const deptGrid = document.getElementById('dept-grid');

  if (deptDropdown && deptSelectedText && deptGrid) {
    deptSelectedText.textContent = `${currentDept} - ${departmentNameMap[currentDept] || currentDept}`;

    // Toggle dropdown
    const trigger = deptDropdown.querySelector('.dropdown-trigger');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const semDropdown = document.getElementById('semester-dropdown');
      if (semDropdown) semDropdown.classList.remove('active');
      deptDropdown.classList.toggle('active');
    });

    // Populate grid
    validDepts.forEach(dept => {
      const cell = createSquircleCell(
        dept,
        null,
        dept === currentDept,
        () => {
          window.location.search = `?dept=${dept}`;
        }
      );
      cell.title = departmentNameMap[dept] || dept;
      deptGrid.appendChild(cell);
    });
  }

  // --- 3. Setup Departmental Info Button ---
  const deptInfoWrapper = document.getElementById('dept-info-wrapper');
  if (deptInfoWrapper) {
    if (deptData.info_link) {
      deptInfoWrapper.innerHTML = `
        <a href="${deptData.info_link}" target="_blank" class="drive-btn info-btn">
          <i class="fa-solid fa-circle-info"></i>&nbsp; Departmental Info
        </a>
      `;
      deptInfoWrapper.style.display = 'flex';
    } else {
      deptInfoWrapper.style.display = 'none';
    }
  }

  // --- 4. Setup Semester Selector (Dropdown Grid) ---
  const semesterSelectGroup = document.getElementById('semester-select-group');
  const semesterDropdown = document.getElementById('semester-dropdown');
  const semesterSelectedText = document.getElementById('semester-selected-text');
  const semesterGrid = document.getElementById('semester-grid');
  const contentContainer = document.getElementById('semester-content');
  const semesters = Object.keys(deptData.semesters || {}).sort(); // S01, S02...

  if (semesters.length === 0) {
    if (semesterSelectGroup) {
      semesterSelectGroup.style.display = 'none';
    }
    let html = `
      <header class="semester-header">
        <h2 class="semester-title">${deptData.full_name}</h2>
      </header>
      <p style="text-align:center; color: #a0aec0; margin-top: 2rem;">No resources available for this department yet.</p>
    `;
    contentContainer.innerHTML = html;
    return;
  }

  if (semesterSelectGroup && semesterDropdown && semesterSelectedText && semesterGrid) {
    semesterSelectGroup.style.display = 'flex';
    semesterGrid.innerHTML = '';

    // Toggle dropdown
    const trigger = semesterDropdown.querySelector('.dropdown-trigger');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (deptDropdown) deptDropdown.classList.remove('active');
      semesterDropdown.classList.toggle('active');
    });

    // Populate grid
    semesters.forEach(sem => {
      const semNum = sem.replace('S', ''); // e.g. "01"
      const cell = createSquircleCell(
        semNum,
        sem,
        false,
        (e) => {
          e.stopPropagation();

          semesterGrid.querySelectorAll('.grid-cell').forEach(c => c.classList.remove('active'));
          cell.classList.add('active');

          semesterSelectedText.textContent = `Semester ${semNum}`;
          loadSemester(sem);
          semesterDropdown.classList.remove('active');
        }
      );
      cell.title = `Semester ${semNum}`;
      semesterGrid.appendChild(cell);
    });
  }

  // Close dropdowns on click outside
  document.addEventListener('click', () => {
    if (deptDropdown) deptDropdown.classList.remove('active');
    if (semesterDropdown) semesterDropdown.classList.remove('active');
  });

  // Read initial semester from URL if specified, or default to first semester
  const semParam = params.get('sem');
  let initialSem = semesters[0];
  if (semParam) {
    let normalized = semParam.trim().toUpperCase();
    if (normalized.startsWith('S')) {
      normalized = normalized.substring(1);
    }
    const num = parseInt(normalized, 10);
    if (!isNaN(num)) {
      const formatted = 'S' + num.toString().padStart(2, '0');
      if (semesters.includes(formatted)) {
        initialSem = formatted;
      }
    }
  }

  // Load initially selected semester
  loadSemester(initialSem);


  // --- Helper: Load Semester Content ---
  function loadSemester(semKey) {
    // 1. Sync custom dropdown display & active state on grid cells
    const semNum = semKey.replace('S', '');
    const semesterSelectedText = document.getElementById('semester-selected-text');
    if (semesterSelectedText) {
      semesterSelectedText.textContent = `Semester ${semNum}`;
    }

    const semesterGrid = document.getElementById('semester-grid');
    if (semesterGrid) {
      semesterGrid.querySelectorAll('.grid-cell').forEach(cell => {
        if (cell.getAttribute('data-value') === semKey) {
          cell.classList.add('active');
        } else {
          cell.classList.remove('active');
        }
      });
    }

    const semData = deptData.semesters[semKey];
    if (!semData) return;

    // Update URL query parameters dynamically to reflect selection
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('dept', currentDept);
    const currentSem = currentParams.get('sem');
    const targetSemNum = parseInt(semNum, 10).toString();
    if (currentSem !== targetSemNum) {
      currentParams.set('sem', targetSemNum);
      const newURL = window.location.pathname + '?' + currentParams.toString();
      window.history.replaceState(null, '', newURL);
    }

    // 2. Build HTML for Content
    // Header Section (Drive Link & Image)
    let html = `
      <header class="semester-header">
        <h2 class="semester-title">${semData.title}</h2>
              <div class="syllabus-container">
        <img src="${semData.syllabus_image}" alt="${semData.title} List" class="syllabus-img">
      </div>
        <a href="${semData.drive_link}" target="_blank" class="drive-btn">
          <i class="fa-brands fa-google-drive"></i>&nbsp; Open Full Drive
        </a>
        <br><br>
        <div style="display:flex;justify-content:center;">
        <p style="font-size:10px;background-color:#d7d5c4ff;color:black;width:fit-content;display:flex;justify-content:center;padding:8px;box-shadow:0 5px 10px black;font-weight:bold;border-radius:10px;" >refer to "Others" folder for Note Archive</p>
        </div>
      </header>



      <section id="courses" class="content-section" style="min-height: auto; margin-top: -1.9rem;">
        <h2 style="text-align: center; margin-bottom: 30px;">Course Materials</h2>
        <div class="course-card-container">
    `;

    // Courses
    semData.courses.forEach(course => {
      // Check for special "others" button styling
      const isSpecial = course.isSpecial || false;
      const cardClass = isSpecial ? 'others-btn' : 'course-button';

      // Icon: use provided or default
      const iconClass = course.icon || 'fa-folder';

      if (isSpecial) {
        html += `
          <a href="${course.link}" target="_blank" class="${cardClass}" style="grid-column: 1 / -1; max-width: 400px; margin: 0 auto;">
            <i class="fa-regular ${iconClass}"></i>&nbsp; <strong>${course.title}</strong><br>
            <small style="opacity: 0.7; font-size: 0.8rem;">${course.code}</small>
          </a>
        `;
      } else {
        html += `
          <a href="${course.link}" target="_blank" class="${cardClass}">
             <i class="fa-solid ${iconClass} fa-2x" style="margin-bottom: 10px;"></i>
             <strong>${course.title}</strong>
             <span class="course-code">${course.code}</span>
          </a>
        `;
      }
    });

    html += `
        </div>
        <br><br>
        <p style="text-align: center; color: var(--text-content); opacity: 0.8;">
          <small>Click on a card to access resources</small>
        </p>
      </section>
    `;

    contentContainer.innerHTML = html;

    // Scroll to top of content if needed, or just let it stay
  }
});

// Sidebar helper maps
const departmentNameMap = {
  "CSE": "Computer Science & Engineering",
  "CE": "Civil Engineering",
  "IT": "Information Technology",
  "BBA": "Business Administration",
  "ECE": "Electrical & Computer Engineering",
  "EEE": "Electrical & Electronic Engineering",
  "ENGLISH": "English",
  "LAW": "Law",
  "PHARMA": "Pharmacy",
  "SOCIAL": "Social Work"
};
