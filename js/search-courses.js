// Sample course data with drive links
const courses = [
    // ----------------------------------------------------------------------
    // ---------------------------####S01####--------------------------------
    // ----------------------------------------------------------------------
    { code: "CSE0613111 + CSE0613112", title: "Structured Programming Language (+Lab) - SPL", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1nSuCFox1x5rz02HhS0Gfu35b7W74k27x?usp=drive_link" },
    { code: "MATH0541111", title: "Differential and Integral Calculus", department: "CSE", driveLink: "https://drive.google.com/drive/folders/18Tv2KPjLAdIPOBv998lwvs28Y17dXRLE?usp=drive_link" },
    { code: "PHY0533111 + PHY0533112", title: "Physics (+lab)", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1i0fmFBuSl-yzHV6e7aBU124eWqQpXnHg?usp=drive_link" },
    { code: "CHEM0531111", title: "Chemistry", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1sk_4HSbvdA_cxSqwjOdOQ8ud4ctY6qt2?usp=drive_link" },
    { code: "GED0232111 + GED0232112", title: "English (+Lab)", department: "CSE", driveLink: "https://drive.google.com/drive/folders/19LPsLUN5QCBplYGDyy1b3f5Z2IZVIG3S?usp=drive_link" },
    // ----------------------------------------------------------------------
    // ---------------------------####S02####--------------------------------
    // ----------------------------------------------------------------------
    { code: "Bangladesh Studies: History and Culture", title: "GED0222121", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1cbmYREhfX7_1VePKk-RPW26NCqbBrWYe?usp=drive_link" },
    { code: "CSE0541123", title: "Discrete Mathematics", department: "CSE", driveLink: "https://drive.google.com/drive/folders/15DOOPBwkSfuimrrREW45jVcevx07-8nu?usp=drive_link" },
    { code: "ME0715122", title: "Engineering Drawing", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1rkl0UWNfJUS3FUxvvKJLKuOUjihWYKc-?usp=drive_link" },
    { code: "EEE0713121 + EEE0713122", title: "Fundamental of Electrical Engineering (+Lab)", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1WTnzJD1nXOM9IDU6bldtMWWA5plWfqTa?usp=drive_link" },
    { code: "CSE0613121 + CSE0613122", title: "Object Oriented Programming (+Lab)", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1HHBBJDZDZ4IKwAzf9vKjfty97Uw4FjW6?usp=drive_link" },
    { code: "MATH0541121", title: "Ordinary and Partial Differential Equations", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1_Zqg9MyV8XE0950vrqODdEVSlpYwnsZ-?usp=drive_link" },
    { code: "CSE0613124", title: "Web Application Design", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1tjlH5xP-PlcosHZxcPwvinQE-wAUzOZS?usp=drive_link" },
    // ----------------------------------------------------------------------
    // ---------------------------####S03####--------------------------------
    // ----------------------------------------------------------------------
    { code: "MATH0541211", title: "Coordinate Geometry, Linear Algebra and Vector Analysis", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1bpqvXJuu2qPZ-hVtkK4D9kotKvlqMtH0?usp=drive_link" },
    { code: "CSE0612223", title: "Data Communication", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1G5HhXeaaESsUUzvshJI_-UFpQOSMZL-s?usp=drive_link" },
    { code: "CSE0611215 + CSE0611216", title: "Digital Logic Design (+lab)", department: "CSE", driveLink: "https://drive.google.com/drive/folders/11rhTTRViSz-mhOVCV0uwtDgBimN5GO8B?usp=drive_link" },
    { code: "CSE0612215 + CSE0612216", title: "Database Management System (+Lab)", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1WbxkGhlKC84ps7r2Ekqs0-Pggq9twvGT?usp=drive_link" },
    { code: "CSE0613211 + CSE0613212", title: "Data Structures and Algorithms 1 ", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1pmKWdksSPezGZdPct2gAydYctKFJMvpI?usp=drive_link" },
    // { code: "", title: "", department: "CSE", driveLink: "" },
    // ----------------------------------------------------------------------
    // ---------------------------####S04####--------------------------------
    // ----------------------------------------------------------------------
    { code: "GED113", title: "Financial and Managerial Accounting", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1achIW_ZkLk7SUTcCBIamg7CHvvl2yeSb?usp=drive_link" },
    { code: "MAT265", title: "Complex Variables, Fourier Analysis and Laplace Transform", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1WVfboSGhSvmWjYBU23s2Bk79JX7SyoI2?usp=drive_link" },
    { code: "CSE251 + CSE252", title: "Data Structures and Algorithms 2 ", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1ZR__njpWSwOeJNhgX1t5eWrIzfmoO0fI?usp=drive_link" },
    { code: "CSE208", title: "Internet Programming Lab", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1yidd6DDh7Oy-D9DTHR3iQApWCXQ9lH39?usp=drive_link" },
    { code: "CSE217", title: "Linear Algebra, Probability and Statistics for Engineers", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1wFrG_OxI7-BzFHadiAX9aFJRPVH0_TgW?usp=drive_link" },
    { code: "CSE213", title: "Theory of Computation", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1Lk_dkegB5YNBlQpYrOIcUP0KYS7e-oo0?usp=drive_link" },
    // ----------------------------------------------------------------------
    // ---------------------------####S04####--------------------------------
    // ----------------------------------------------------------------------
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    // ----------------------------------------------------------------------
    // ---------------------------####S05####--------------------------------
    // ----------------------------------------------------------------------
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    // ----------------------------------------------------------------------
    // ---------------------------####S06####--------------------------------
    // ----------------------------------------------------------------------
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    // ----------------------------------------------------------------------
    // ---------------------------####S07####--------------------------------
    // ----------------------------------------------------------------------
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    { code: "", title: "", department: "CSE", driveLink: "" },
    // ----------------------------------------------------------------------
    // ---------------------------####S08####--------------------------------
    // ----------------------------------------------------------------------
];

const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

// Function to highlight the matching text
function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Filter courses based on search query
function filterCourses(query) {
    if (!query) return [];
    
    query = query.toLowerCase();
    return courses.filter(course => {
        return course.title.toLowerCase().includes(query) || 
               course.code.toLowerCase().includes(query) || 
               course.department.toLowerCase().includes(query);
    });
}

// Display the filtered courses
function displayResults(filteredCourses, query) {
    searchResults.innerHTML = '';
    
    if (filteredCourses.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No courses found</div>';
        searchResults.style.display = 'block';
        return;
    }
    
    filteredCourses.forEach(course => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div class="result-title">${highlightMatch(course.title, query)}</div>
            <span class="result-code">${highlightMatch(course.code, query)}</span>
            <span class="result-dept">${highlightMatch(course.department, query)}</span>
        `;
        
        resultItem.addEventListener('click', () => {
            // Modified to open in new tab
            window.open(course.driveLink, '_blank');
        });
        
        searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
}

// Event listeners
searchInput.addEventListener('input', function() {
    const query = this.value.trim();
    
    if (query.length > 0) {
        const filteredCourses = filterCourses(query);
        displayResults(filteredCourses, query);
    } else {
        searchResults.style.display = 'none';
    }
});

// Close search results when clicking outside
document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

// Show results when focusing on search input (if there's content)
searchInput.addEventListener('focus', function() {
    if (this.value.trim().length > 0) {
        const filteredCourses = filterCourses(this.value.trim());
        displayResults(filteredCourses, this.value.trim());
    }
});

// Add keyboard navigation for search results
searchInput.addEventListener('keydown', function(event) {
    const resultItems = searchResults.querySelectorAll('.result-item');
    const currentFocus = searchResults.querySelector('.result-item.active');
    
    if (resultItems.length === 0) return;
    
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!currentFocus) {
            resultItems[0].classList.add('active');
            resultItems[0].style.backgroundColor = '#eef3fd';
        } else {
            currentFocus.classList.remove('active');
            currentFocus.style.backgroundColor = '';
            
            const nextFocus = currentFocus.nextElementSibling;
            if (nextFocus && nextFocus.classList.contains('result-item')) {
                nextFocus.classList.add('active');
                nextFocus.style.backgroundColor = '#eef3fd';
                nextFocus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                resultItems[0].classList.add('active');
                resultItems[0].style.backgroundColor = '#eef3fd';
                resultItems[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (!currentFocus) {
            resultItems[resultItems.length - 1].classList.add('active');
            resultItems[resultItems.length - 1].style.backgroundColor = '#eef3fd';
        } else {
            currentFocus.classList.remove('active');
            currentFocus.style.backgroundColor = '';
            
            const prevFocus = currentFocus.previousElementSibling;
            if (prevFocus && prevFocus.classList.contains('result-item')) {
                prevFocus.classList.add('active');
                prevFocus.style.backgroundColor = '#eef3fd';
                prevFocus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                resultItems[resultItems.length - 1].classList.add('active');
                resultItems[resultItems.length - 1].style.backgroundColor = '#eef3fd';
                resultItems[resultItems.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    } else if (event.key === 'Enter') {
        if (currentFocus) {
            event.preventDefault();
            // Modified to open in new tab
            window.open(courses.find(course => 
                course.title === currentFocus.querySelector('.result-title').textContent.replace(/\s+/g, ' ').trim()
            ).driveLink, '_blank');
        }
    }
});