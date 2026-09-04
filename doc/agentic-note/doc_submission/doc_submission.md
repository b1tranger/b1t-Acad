# Submission Page Documentation

## Overview

The `submission.html` page is a dynamic web page that displays student submissions for **Questions** and **Notes**. Data is fetched from two separate Google Sheets and displayed in an interactive card-based interface.

---

## Features

### 1. Tab-Based Navigation
- **Question Submissions**: Displays all question uploads from students
- **Note Submissions**: Displays all note uploads from students
- Each tab shows a count badge indicating the number of unique submitters

### 2. Submission Cards
Each card displays:
- **Avatar**: Circular icon with student initials (color-coded based on name)
- **Student Name**: Full name of the submitter
- **Email Address**: Student's email (if available)
- **Student ID**: Educational ID or "UITS Student" as fallback
- **Submission Count**: Number of submissions by this student

### 3. Detail Modal
Clicking a card opens a modal popup showing:
- **Department - Batch**: Student's department and batch information
- **Question/Note Details**: Description of the submission
- **File Links**: Downloadable files from Google Drive
  - Questions show: "Upload Questions Here"
  - Notes show: "Upload Notes here"

---

## Google Sheets Configuration

### Question Uploads Sheet
- **Sheet ID**: `---`
- **URL**: Google Sheet Link

### Note Uploads Sheet
- **Sheet ID**: `---`
- **URL**: Google Sheet Link

### Column Mapping (0-indexed)

| Index | Questions Sheet Column | Notes Sheet Column |
|-------|------------------------|-------------------|
| 1 | Email Address | Email Address |
| 2 | Student Name | Student Name |
| 3 | Student ID/Edu Mail | Student ID/Edu Mail |
| 4 | Department - Batch | Department - Batch |
| 5 | Question Details | Note Details |
| 6 | Upload Questions Here | Upload Notes here |

> **Note**: Column index starts at 1 (index 0 is typically the timestamp).

---

## Technical Implementation

### Data Fetching
```javascript
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
```
- Uses Google Visualization API to fetch sheet data as JSON
- Parses JSONP response format
- Groups submissions by student name

### State Management
- `questionsData`: Map storing question submissions grouped by student name
- `notesData`: Map storing note submissions grouped by student name
- `currentTab`: Tracks active tab ('questions' or 'notes')
- Lazy loading: Data is fetched once and cached

### File Link Parsing
The `parseFileLinks()` function extracts URLs from the file upload column:
- Matches any HTTP/HTTPS URLs using regex
- Returns array of file objects with `url` and `name` properties

---

## CSS Styling

### Color Themes
- **Questions**: Orange/Amber accent (`#ffb74d`)
- **Notes**: Green accent (`#81c784`)
- **General UI**: Blue accent (`#64b5f6`)

### Avatar Colors
8 gradient color pairs that cycle based on name length:
1. Blue (`#64b5f6` → `#42a5f5`)
2. Green (`#81c784` → `#66bb6a`)
3. Orange (`#ffb74d` → `#ffa726`)
4. Purple (`#ba68c8` → `#ab47bc`)
5. Cyan (`#4dd0e1` → `#26c6da`)
6. Pink (`#f06292` → `#ec407a`)
7. Light Green (`#aed581` → `#9ccc65`)
8. Deep Orange (`#ff8a65` → `#ff7043`)

### Responsive Breakpoints
- **Desktop**: Full layout with all features
- **Tablet** (≤768px): Reduced padding, smaller icons
- **Mobile** (≤480px): Stacked header layout

---

## Page States

| State | Icon | Description |
|-------|------|-------------|
| Loading | `fa-spinner fa-spin` | Fetching data from Google Sheets |
| Empty | `fa-inbox` | No submissions found for selected category |
| Error | `fa-exclamation-triangle` | Failed to fetch data |
| Success | Grid display | Shows submission cards |

---

## Dependencies

- **Font Awesome 6.5.0**: Icons (CDN)
- **style.css**: Base styles and CSS variables
- **Google Sheets API**: Data source (sheets must be published to web)

---

## File Structure

```
submission.html
├── <head>
│   ├── Meta tags
│   ├── External stylesheets (style.css, Font Awesome)
│   └── <style> (page-specific CSS)
├── <body>
│   ├── .category-page (main container)
│   │   ├── .category-header (page header with back button, icon, title)
│   │   └── .project-list (content area)
│   │       ├── .page-description (info banner)
│   │       ├── .tab-container (tab buttons)
│   │       ├── #loading-state
│   │       ├── #empty-state
│   │       ├── #error-state
│   │       ├── #submissions-grid (card container)
│   │       ├── #details-modal (popup modal)
│   │       └── .reference-footer
│   └── <script> (JavaScript logic)
```

---

## Usage

1. Ensure Google Sheets are published to the web
2. Verify column indices match actual sheet structure
3. Link to page from main navigation (index.html)

### To Modify Column Mappings
Update these constants in the `<script>` section:
```javascript
// Questions
const Q_COL_EMAIL = 1;
const Q_COL_NAME = 2;
const Q_COL_STUDENT_ID = 3;
const Q_COL_DEPT_BATCH = 4;
const Q_COL_DETAILS = 5;
const Q_COL_FILES = 6;

// Notes
const N_COL_EMAIL = 1;
const N_COL_NAME = 2;
const N_COL_STUDENT_ID = 3;
const N_COL_DEPT_BATCH = 4;
const N_COL_DETAILS = 5;
const N_COL_FILES = 6;
```

---

## Related Files

- [contributions.html](../contributions.html) - Similar page for resource contributions
- [style.css](../style.css) - Global styles and CSS variables
- [index.html](../index.html) - Main portal page

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-28 | Initial creation with dual-tab functionality |
| 2026-01-28 | Added improved header CSS with gradient styling |
| 2026-01-28 | Fixed file labels to match sheet column names |
