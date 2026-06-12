document.addEventListener('DOMContentLoaded', () => {
  let tooltipObserver = null;
  let tooltipTimeout1 = null;
  let tooltipTimeout2 = null;

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
          <i class="fa-solid fa-circle-info"></i>&nbsp;<span class="btn-text-desktop">Departmental Info</span><span class="btn-text-mobile">Info</span>
        </a>
      `;
      deptInfoWrapper.style.display = 'flex';
    } else {
      deptInfoWrapper.style.display = 'none';
    }
  }

  // --- 3b. Setup Question Bank Button ---
  const qbankInfoWrapper = document.getElementById('qbank-info-wrapper');
  if (qbankInfoWrapper) {
    if (deptData.qbank_link) {
      qbankInfoWrapper.innerHTML = `
        <a href="${deptData.qbank_link}" target="_blank" class="drive-btn qbank-btn">
          <i class="fa-solid fa-folder-open"></i>&nbsp;<span class="btn-text-desktop">Question Bank</span><span class="btn-text-mobile">Qbank</span>
        </a>
      `;
      qbankInfoWrapper.style.display = 'flex';
    } else {
      qbankInfoWrapper.style.display = 'none';
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
      <p style="text-align:center; color: #a0aec0; margin-top: 2rem;">No resources available for this department yet. Wish to contribute? Reach out to us through <a href="index.html#About" style="color: var(--accent-color); font-weight: bold; text-decoration: underline;">Socials</a></p>
    `;
    contentContainer.innerHTML = `<div class="semester-fade-in">${html}</div>`;
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
          loadSemester(sem, true);
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

  // Load initially selected semester (keep opacity 0 initially on page load)
  loadSemester(initialSem, false);

  // Scroll to semester content after 3 seconds if department has semesters
  if (semesters.length > 0) {
    setTimeout(() => {
      const contentEl = document.getElementById('semester-content');
      if (contentEl) {
        contentEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Trigger the fade-in animation
      const wrapperEl = document.getElementById('semester-content-wrapper');
      if (wrapperEl) {
        wrapperEl.classList.add('semester-fade-in');
      }
    }, 1000);
  }


  // --- Helper: Load Semester Content ---
  function loadSemester(semKey, animateInstantly = true) {
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
      </header>



      <section id="courses" class="content-section" style="min-height: auto; margin-top: -1.9rem;">
        <h2 style="text-align: center; margin-bottom: 30px;">Course Materials</h2>
        <div style="display: flex; justify-content: center; margin-bottom: 30px; position: relative;" id="drive-btn-container">
          <a href="${semData.drive_link}" target="_blank" class="drive-btn" style="margin-top: 0;">
            <i class="fa-brands fa-google-drive"></i>&nbsp; Open Full Drive
          </a>
          <div id="drive-tooltip" class="drive-tooltip">refer to "Others" folder for Note Archive</div>
        </div>
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

    const animClass = animateInstantly ? 'semester-fade-in' : 'semester-content-wrapper';
    contentContainer.innerHTML = `<div id="semester-content-wrapper" class="${animClass}">${html}</div>`;

    // Set up IntersectionObserver for bottom tooltip
    if (tooltipTimeout1) clearTimeout(tooltipTimeout1);
    if (tooltipTimeout2) clearTimeout(tooltipTimeout2);

    const tooltipEl = document.getElementById('drive-tooltip');
    if (tooltipEl) {
      tooltipEl.classList.remove('show');
    }

    if (tooltipObserver) {
      tooltipObserver.disconnect();
    }

    const coursesEl = document.getElementById('courses');
    if (coursesEl && tooltipEl) {
      tooltipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Unobserve so it only triggers once per semester load
            tooltipObserver.unobserve(coursesEl);

            // Wait 3 seconds to show
            tooltipTimeout1 = setTimeout(() => {
              tooltipEl.classList.add('show');

              // Stay visible for 3 seconds, then hide
              tooltipTimeout2 = setTimeout(() => {
                tooltipEl.classList.remove('show');
              }, 3000);
            }, 3000);
          }
        });
      }, { threshold: 0.1 });
      tooltipObserver.observe(coursesEl);
    }
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
