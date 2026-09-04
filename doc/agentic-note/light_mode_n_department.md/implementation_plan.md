# Refactor Departments to Single Page

The goal is to replace the multiple static HTML pages for each semester (S01-S08) with a single `Departments.html` page that loads content dynamically. This improves maintainability and user experience.

## User Review Required
> [!IMPORTANT]
> This refactor will introduce a new approach using JavaScript objects to store course data. I will migrate the **CSE** department data (S01-S08) as part of this task.
> **Note**: I will structure the data file so that CE and IT departments can be easily added later by following the pattern.

## Proposed Changes

### Root Directory
#### [NEW] [Departments.html](file:///e:/Git_WIP/2.%20Personal%20Repositories/b1t-Acad/Departments.html)
- A new single-page interface for exploring department resources.
- Features:
    - Department Selector (CSE, CE, IT).
    - Semester Selector (1-8).
    - Dynamic content area (Loads data from JS).

#### [MODIFY] [index.html](file:///e:/Git_WIP/2.%20Personal%20Repositories/b1t-Acad/index.html)
- Remove the complex "Departments" dropdown selector.
- Replace it with a simple list of links to `Departments.html?dept=CSE`, `Departments.html?dept=CE`, etc.

### JS Directory
#### [NEW] [js/departments-data.js](file:///e:/Git_WIP/2.%20Personal%20Repositories/b1t-Acad/js/departments-data.js)
- Contains the structured data for departments, semesters, and courses.
- Format:
```javascript
const departmentsData = {
    "CSE": {
        "full_name": "Computer Science & Engineering",
        "semesters": {
            "S01": {
                "drive_link": "...",
                "syllabus_image": "...",
                "courses": [
                    { title: "SPL", code: "CSE...", link: "...", icon: "fa-code" },
                    ...
                ]
            },
            ...
        }
    },
    ...
};
```

#### [NEW] [js/departments.js](file:///e:/Git_WIP/2.%20Personal%20Repositories/b1t-Acad/js/departments.js)
- Logic to:
    - Parse query parameters (e.g., `?dept=CSE`).
    - Render the appropriate content based on selection.
    - Handle tab switching.

## Verification Plan

### Automated Tests
- None (Static site).

### Manual Verification
1.  **Navigation**: Click "Departments" in `index.html`. Verify it scrolls to the new list.
2.  **Dept Links**: Click "Computer Science..." link. Verify it opens `Departments.html` with CSE selected.
3.  **Content Loading**: In `Departments.html`, verify S01 content matches the original `D1/CSE/S01.html`.
4.  **Semester Switching**: Click "Semester 2". Verify content updates.
5.  **Responsiveness**: Check mobile view of the new page.
