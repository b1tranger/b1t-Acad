// Sample course data with drive links
const courses = [
    // ----------------------------------------------------------------------
    // ---------------------------####S01####--------------------------------
    // ----------------------------------------------------------------------
    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "CSE0613111 + CSE0613112", title: "Structured Programming Language (+Lab) - SPL", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1nSuCFox1x5rz02HhS0Gfu35b7W74k27x?usp=drive_link" },
    { code: "MATH0541111", title: "Differential and Integral Calculus - DIC", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/18Tv2KPjLAdIPOBv998lwvs28Y17dXRLE?usp=drive_link" },
    { code: "PHY0533111 + PHY0533112", title: "Engineering Physics (+lab)", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1i0fmFBuSl-yzHV6e7aBU124eWqQpXnHg?usp=drive_link" },
    { code: "CHEM0531111", title: "Engineering Chemistry", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1sk_4HSbvdA_cxSqwjOdOQ8ud4ctY6qt2?usp=drive_link" },
    { code: "GED0232111 + GED0232112", title: "Communicative English (+Lab)", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/19LPsLUN5QCBplYGDyy1b3f5Z2IZVIG3S?usp=drive_link" },
    //
    // [ CE ]
    //

    //
    // [ IT ]
    //
    // ----------------------------------------------------------------------
    // ---------------------------####S02####--------------------------------
    // ----------------------------------------------------------------------
    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "GED0222121", title: "Bangladesh Studies: History and Culture", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1cbmYREhfX7_1VePKk-RPW26NCqbBrWYe?usp=drive_link" },
    { code: "CSE0541123", title: "Discrete Mathematics - DM", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/15DOOPBwkSfuimrrREW45jVcevx07-8nu?usp=drive_link" },
    { code: "ME0715122", title: "Engineering Drawing - MED", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1rkl0UWNfJUS3FUxvvKJLKuOUjihWYKc-?usp=drive_link" },
    { code: "EEE0713121 + EEE0713122", title: "Fundamental of Electrical Engineering (+Lab) - FEE", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1WTnzJD1nXOM9IDU6bldtMWWA5plWfqTa?usp=drive_link" },
    { code: "CSE0613121 + CSE0613122", title: "Object Oriented Programming (+Lab) - OOP", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1HHBBJDZDZ4IKwAzf9vKjfty97Uw4FjW6?usp=drive_link" },
    { code: "MATH0541121", title: "Ordinary and Partial Differential Equations - OPDE", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1_Zqg9MyV8XE0950vrqODdEVSlpYwnsZ-?usp=drive_link" },
    { code: "CSE0613124", title: "Web Application Design - WAD", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1tjlH5xP-PlcosHZxcPwvinQE-wAUzOZS?usp=drive_link" },
    //
    // [ CE ]
    //

    //
    // [ IT ]
    //
    // ----------------------------------------------------------------------
    // ---------------------------####S03####--------------------------------
    // ----------------------------------------------------------------------
    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "MATH0541211", title: "Coordinate Geometry, Linear Algebra and Vector Analysis - CGLAVA", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1bpqvXJuu2qPZ-hVtkK4D9kotKvlqMtH0?usp=drive_link" },
    { code: "CSE0612223", title: "Data Communication - DC", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1G5HhXeaaESsUUzvshJI_-UFpQOSMZL-s?usp=drive_link" },
    { code: "CSE0611215 + CSE0611216", title: "Digital Logic Design (+lab) - DLD", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/11rhTTRViSz-mhOVCV0uwtDgBimN5GO8B?usp=drive_link" },
    { code: "CSE0612215 + CSE0612216", title: "Database Management System (+Lab) - DBMS", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1WbxkGhlKC84ps7r2Ekqs0-Pggq9twvGT?usp=drive_link" },
    { code: "CSE0613211 + CSE0613212", title: "Data Structures and Algorithms 1 - DSA1", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1pmKWdksSPezGZdPct2gAydYctKFJMvpI?usp=drive_link" },
    // 
    // 
    // [ CE ] { code: "", title: "", department: "Dept: CE", driveLink: "" },
    //
    { code: "CE 251", title: "Mechanics of Solids I", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1zAJWtU-QbILz_HYBzdm80bERK-EN-S3H?usp=drive_link" },
    { code: "CE 0732201 CE 201", title: "Engineering Materials", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1iA-RrhyPl_UPvcTKP8Y1fDxodIesz_qm?usp=drive_link" },
    { code: "GED 159 ", title: "Government Course", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1g-uy0jo8Ji8LLfvm4VDZ3RLZUFc6gH_q?usp=drive_link" },
    //
    // [ IT ]
    //

    // ----------------------------------------------------------------------
    // ---------------------------####S04####--------------------------------
    // ----------------------------------------------------------------------
    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "GED113", title: "Financial and Managerial Accounting", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1achIW_ZkLk7SUTcCBIamg7CHvvl2yeSb?usp=drive_link" },
    { code: "MAT265", title: "Complex Variables, Fourier Analysis and Laplace Transform - CVFALT", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1WVfboSGhSvmWjYBU23s2Bk79JX7SyoI2?usp=drive_link" },
    { code: "CSE251 + CSE252", title: "Data Structures and Algorithms 2 - DSA2", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1ZR__njpWSwOeJNhgX1t5eWrIzfmoO0fI?usp=drive_link" },
    { code: "CSE208", title: "Internet Programming Lab - IP", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1yidd6DDh7Oy-D9DTHR3iQApWCXQ9lH39?usp=drive_link" },
    { code: "CSE217", title: "Linear Algebra, Probability and Statistics for Engineers - LAPSE", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1wFrG_OxI7-BzFHadiAX9aFJRPVH0_TgW?usp=drive_link" },
    { code: "CSE213", title: "Theory of Computation - ToC", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1Lk_dkegB5YNBlQpYrOIcUP0KYS7e-oo0?usp=drive_link" },
    { code: "EEE0714211 + EEE0714212", title: "EDC - Electronic Devices and Circuits", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1dLr18ZBIpOTFleZYS3hjiMu3O_ZxBtIC?usp=drive_link" },
    //
    // [ CE ] { code: "", title: "", department: "Dept: CE", driveLink: "" },
    //
    { code: "CE 103 ", title: "Surveying Course", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1zrbZoiQTFJtEc6LapNM57G-q2rYiaBGm?usp=drive_link" },
    { code: "CE 209 ", title: "Numerical Methods and Analysis", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1D5uVsUzUqWofF5RxiJoQF3muZsB06utg?usp=drive_link" },
    { code: "CE 241 ", title: "Fluid Mechanics Course", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1IhaiGgO9MVkE7-W7suO2ZcSwT4XNU77I?usp=drive_link" },
    { code: "CE 253 ", title: "Mechanics of Solids II", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1IeAwsCMioRlJxqDMTYhwuzuf8OSy0-4w?usp=drive_link" },
    { code: "CE 311 ", title: "Supply Engineering Course", department: "Dept: CE", driveLink: "https://drive.google.com/drive/folders/1Vx78OVtJ5ro1wzwTllMU7CtehfAJwxCS?usp=drive_link" },
    //
    // [ IT ]
    //
    // ----------------------------------------------------------------------
    // ---------------------------####S05####--------------------------------
    // ----------------------------------------------------------------------
    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "CSE204", title: "Advanced Problem Solving Strategies Lab", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/11hNDmHjWV1QPRzaQ6KWblWiUUKnPs5-0?usp=drive_link" },
    { code: "CSE311 + CSE312", title: "Artificial Intelligence (+lab) - AI", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1j1Os8LHGAgfOl1gbJjiqWWy05kmsk4Mk?usp=drive_link" },
    { code: "CSE313 + CSE314", title: "Computer Networks (+Lab) - CN", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1ziNG4HDSQVDz0gR8qU1OMbtVW8EPeVRM?usp=drive_link" },
    { code: "CSE319", title: "Computer Architecture - CA", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1-vcckXJirsjVUnA_BfztCVSKkKFSQnLx?usp=drive_link" },
    { code: "CSE318", title: "Numerical Methods and Analysis - NMA", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1gLWZ6NISQQSZuagWmEJGT_fw9I4BQEXz?usp=drive_link" },
    //
    // [ CE ] { code: "", title: "", department: "Dept: CE", driveLink: "" },
    //

    //
    // [ IT ]
    //
    // ----------------------------------------------------------------------
    // ---------------------------####S06####--------------------------------
    // ----------------------------------------------------------------------
    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "CSE351 + CSE352", title: "Compiler (+lab)", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1nPDQAnm5fQVTLOxGP7NqCOcSwGGd3Bem?usp=drive_link" },
    { code: "CSE357 + CSE358", title: "Computer Graphics and Multimedia (+Lab) - CG", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/138zkPmC6GXxJOPXdUb3zj4-tdqIT_ix9?usp=drive_link" },
    { code: "GED 115", title: "Industrial and Operation Management - IOM", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1YstV74bC9Vy9VAkfCTpqILzA0jL2DYXd?usp=drive_link" },
    { code: "CSE359 + CSE360", title: "Microprocessors and Microcontrollers (+Lab) - MM", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1snMh8qTLGLy5eqR5FBTVFhDAJYNITBqu?usp=drive_link" },
    { code: "CSE355 + CSE356", title: "Software Engineering and System Analysis - SE", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1Sk3cJwYA0slESsWxa0Xvllerh40iTP-1?usp=drive_link" },
    //
    // [ CE ] { code: "", title: "", department: "Dept: CE", driveLink: "" },
    //

    //
    // [ IT ]
    //

    // ----------------------------------------------------------------------
    // ---------------------------####S07####--------------------------------
    // ----------------------------------------------------------------------

    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "CSE490", title: "Capstone Project", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/153HLCcu2Kt-3wU6z-f6ujmSQqX85H-R3?usp=drive_link" },
    { code: "CSE420", title: "Industrial Attachment", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/13yd5bW_UjMYmY1aunmq6Nsp_nXnReAw1?usp=drive_link" },
    { code: "CSE401 + CSE402", title: "Internet of Things (+Lab) - IoT", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1deGPqXj8JqS72dQt3EKi3KReVrdiL2df?usp=drive_link" },
    { code: "CSE431 + CSE432", title: "Machine Learning (+Lab) - ML", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1Hvv28jl20e9olD0ToWbsVkG5Cj3dnJog?usp=drive_link" },
    { code: "CSE411 + CSE412", title: "Operating Systems (+Lab) - OS", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1cF2I1OdDpi-TMSOnD8sMg7mUR3w4wgxp?usp=drive_link" },
    { code: "CSE418", title: "Scientific Research and Methodologies", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1HrgdXqI1i0iN6Wrh1JIWa7NUyTpeL30P?usp=drive_link" },
    { code: "CSE413", title: "Simulation and Modeling Lab", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1C8j93IMJ7U6zUANlAH2nUeLhE12j5PYi?usp=drive_link" },
    { code: "CSE416", title: "Software Project Design and Development", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1BDXFHdEjoJEwyeGBkbbS2ZzNgJ9Zub-s?usp=drive_link" },
    
    //
    // [ CE ]
    //

    //
    // [ IT ]
    //
    // ----------------------------------------------------------------------
    // ---------------------------####S08####--------------------------------
    // ----------------------------------------------------------------------
    //
    // [ CSE ] { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    { code: "CSE425 + CSE426", title: "Data Mining and Warehouse (+Lab) - DMW", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1XAuS1BQ_eES_Mdg-DsuIl5UsnodhYxMm?usp=drive_link" },
    { code: "CSE437 + CSE438", title: "Digital Image Processing (+Lab) - DIP", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1Du1Yc_zCNIZVIOuYyU1e_4y15rp2rR3y?usp=drive_link" },
    { code: "CSE459", title: "Professional Ethics and Communication for Engineers - PE", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1cNlANirFZYtjIYm4utSZ5-4W7ZzadO65?usp=drive_link" },
    { code: "CSE492", title: "Technical Writings and Presentation Lab", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1Xke8qu1dpd-rFvKjkUch8svzKZphTw88?usp=drive_link" },
    { code: "CSE 421 + CSE 422", title: "Neural Networks", department: "Dept: CSE", driveLink: "https://drive.google.com/drive/folders/1dIXOU0zRrjPKaWaP0j3SPzQ_lelX78J8?usp=drive_link" },
    // { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    // { code: "", title: "", department: "Dept: CSE", driveLink: "" },
    //
    // [ CE ]
    //

    //
    // [ IT ]
    //
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
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
searchInput.addEventListener('input', function () {
    const query = this.value.trim();

    if (query.length > 0) {
        const filteredCourses = filterCourses(query);
        displayResults(filteredCourses, query);
    } else {
        searchResults.style.display = 'none';
    }
});

// Close search results when clicking outside
document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

// Show results when focusing on search input (if there's content)
searchInput.addEventListener('focus', function () {
    if (this.value.trim().length > 0) {
        const filteredCourses = filterCourses(this.value.trim());
        displayResults(filteredCourses, this.value.trim());
    }
});

// Add keyboard navigation for search results
searchInput.addEventListener('keydown', function (event) {
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