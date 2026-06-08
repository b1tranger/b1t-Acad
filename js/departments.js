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

  // --- 2. Setup Department Selector (Dropdown) ---
  const deptSelectEl = document.getElementById('dept-select');
  if (deptSelectEl) {
    validDepts.forEach(dept => {
      const option = document.createElement('option');
      option.value = dept;
      option.textContent = `${dept} - ${departmentNameMap[dept] || dept}`;
      option.selected = (dept === currentDept);
      deptSelectEl.appendChild(option);
    });

    deptSelectEl.addEventListener('change', (e) => {
      window.location.search = `?dept=${e.target.value}`;
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

  // --- 4. Setup Semester Selector (Dropdown) ---
  const semesterSelectGroup = document.getElementById('semester-select-group');
  const semesterSelectEl = document.getElementById('semester-select');
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

  if (semesterSelectGroup && semesterSelectEl) {
    semesterSelectGroup.style.display = 'flex';
    semesterSelectEl.innerHTML = '';
    semesters.forEach(sem => {
      const option = document.createElement('option');
      option.value = sem;
      option.textContent = `Semester ${sem.replace('S', '')}`; // "Semester 01"
      semesterSelectEl.appendChild(option);
    });

    semesterSelectEl.addEventListener('change', (e) => {
      loadSemester(e.target.value);
    });
  }

  // Load first semester by default
  loadSemester(semesters[0]);


  // --- Helper: Load Semester Content ---
  function loadSemester(semKey) {
    // 1. Sync select element value if available
    if (semesterSelectEl) {
      semesterSelectEl.value = semKey;
    }

    const semData = deptData.semesters[semKey];
    if (!semData) return;

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
        <p style="font-size:14px;background-color:yellow;color:black;width:fit-content;display:flex;justify-content:center;padding:8px;box-shadow:0 5px 10px black;font-weight:bold;" >(refer to "Others" folder for Note Archive)</p>
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
