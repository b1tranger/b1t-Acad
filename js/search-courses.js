 // Sample course data with drive links
 const courses = [
    { code: "CSE0613111 + CSE0613112", title: "Structured Programming Language (+Lab) - SPL", department: "CSE", driveLink: "https://drive.google.com/drive/folders/1nSuCFox1x5rz02HhS0Gfu35b7W74k27x?usp=drive_link" },
    { code: "MATH0541111", title: "Differential and Integral Calculus", department: "CSE", driveLink: "https://drive.google.com/drive/folders/18Tv2KPjLAdIPOBv998lwvs28Y17dXRLE?usp=drive_link" },
    { code: "CS350", title: "Operating Systems", department: "Computer Science", driveLink: "https://drive.google.com/file/d/sample3" },
    { code: "MATH101", title: "Calculus I", department: "Mathematics", driveLink: "https://drive.google.com/file/d/sample4" },
    { code: "MATH201", title: "Calculus II", department: "Mathematics", driveLink: "https://drive.google.com/file/d/sample5" },
    { code: "PHYS101", title: "Introduction to Physics", department: "Physics", driveLink: "https://drive.google.com/file/d/sample6" },
    { code: "CHEM101", title: "General Chemistry", department: "Chemistry", driveLink: "https://drive.google.com/file/d/sample7" },
    { code: "BIO101", title: "Introduction to Biology", department: "Biology", driveLink: "https://drive.google.com/file/d/sample8" },
    { code: "ENG101", title: "English Composition", department: "English", driveLink: "https://drive.google.com/file/d/sample9" },
    { code: "HIST101", title: "World History", department: "History", driveLink: "https://drive.google.com/file/d/sample10" },
    { code: "ECON101", title: "Principles of Economics", department: "Economics", driveLink: "https://drive.google.com/file/d/sample11" },
    { code: "PSYCH101", title: "Introduction to Psychology", department: "Psychology", driveLink: "https://drive.google.com/file/d/sample12" },
    { code: "CS480", title: "Database Systems", department: "Computer Science", driveLink: "https://drive.google.com/file/d/sample13" },
    { code: "CS450", title: "Computer Networks", department: "Computer Science", driveLink: "https://drive.google.com/file/d/sample14" },
    { code: "CS330", title: "Web Development", department: "Computer Science", driveLink: "https://drive.google.com/file/d/sample15" }
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
            window.location.href = course.driveLink;
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
            window.location.href = courses.find(course => 
                course.title === currentFocus.querySelector('.result-title').textContent.replace(/\s+/g, ' ').trim()
            ).driveLink;
        }
    }
});