# Department & Course Data Synchronization Guidelines

This guide standardizes the process of updating course listings in [`js/departments-data.js`](departments-data.js) and [`js/search-courses.js`](search-courses.js) when supplied with a Google Drive folder link. Follow these steps so the crawling, extraction, and formatting workflow is consistent and doesn't require repeating the research process each time.

---

## 1. Google Drive Crawling & Extraction Workflow

When given a Google Drive folder URL (e.g., `https://drive.google.com/drive/folders/{FOLDER_ID}?usp=drive_link`):

### Step 1: Fetch Folder Listing via Embedded Endpoint
Use Node.js to fetch the lightweight embedded folder view, which exposes the folder hierarchy and metadata without client-side SPA overhead:
```javascript
// scratch/extract.js
const https = require('https');

const folderId = '<FOLDER_ID>';
const url = `https://drive.google.com/embeddedfolderview?id=${folderId}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // 1. Check for standard <a> links to folders: /drive/folders/{id} or /file/d/{id}
    const folderRegex = /href="https:\/\/drive\.google\.com\/drive\/folders\/([^"]+)"[^>]*>([^<]+)<\/a>/g;
    let match;
    const folders = [];
    while ((match = folderRegex.exec(data)) !== null) {
      folders.push({ id: match[1], name: match[2].trim() });
    }
    
    // 2. Also check for embedded script init data if direct links are empty
    console.log(JSON.stringify(folders, null, 2));
  });
});
```

### Step 2: Handle Edge Cases (InitData / Empty Embedded View)
If direct regex on HTML markup returns empty, inspect `_initData` or similar inline JSON payload within the HTML response, or inspect folder item titles and IDs inside the script tags. Extract:
- Folder ID (`id`)
- Course title string (`name` / folder label)

---

## 2. Parsing Course Titles, Dual Codes & Metadata

Folder names in Google Drive typically follow standard department conventions:
- Example A: `[ACT0411311] [ACT-311] Management Accounting`
- Example B: `[MKT0413222] [MKT-222] Organizational Behavior`
- Example C: `[CSE111] Computer Fundamentals`

### Parsing Rules:
1. **Long/Standard Course Code**: Extract primary code (e.g. `ACT0411311`, `CSE111`).
2. **Short/Alternative Course Code**: Extract alternate code if bracketed (e.g. `ACT-311`).
3. **Course Title**: Clean, title-cased name of the subject (e.g. `Management Accounting`).
4. **Link**: `https://drive.google.com/drive/folders/{FOLDER_ID}?usp=drive_link`.

---

## 3. Formatting in `js/departments-data.js`

In [`js/departments-data.js`](departments-data.js), locate the corresponding department object and semester entry (e.g., `departmentsData['BBA'].semesters[...]`):

```javascript
{ "title": "Course Name", "code": "PRIMARY_CODE", "link": "https://drive.google.com/drive/folders/FOLDER_ID?usp=drive_link", "icon": "fa-ICON_NAME" },
```

### FontAwesome Icon Selection Guidelines:
Pick contextual, visually representative FontAwesome 6 icons (`fa-solid` classes, specifying the class name without prefix, e.g. `fa-calculator`):
- **Accounting / Finance / Audit**: `fa-calculator`, `fa-coins`, `fa-scale-unbalanced-flip`, `fa-chart-pie`, `fa-file-invoice-dollar`, `fa-building-columns`
- **Management / HR / Org Behavior**: `fa-people-group`, `fa-users-gear`, `fa-sitemap`, `fa-briefcase`
- **Marketing / Advertising / Sales**: `fa-bullhorn`, `fa-rectangle-ad`, `fa-shop`, `fa-magnifying-glass-chart`, `fa-chart-line`
- **Law / Ethics**: `fa-scale-balanced`, `fa-gavel`, `fa-book-bookmark`
- **Computer Science / Tech**: `fa-laptop-code`, `fa-database`, `fa-network-wired`, `fa-code`, `fa-shield-halved`
- **Mathematics / Statistics**: `fa-chart-column`, `fa-square-root-variable`, `fa-percent`

---

## 4. Formatting in `js/search-courses.js`

In [`js/search-courses.js`](search-courses.js), maintain the organized section headers and comments for each department and semester:

```javascript
    // ==========================================
    // DEPARTMENT NAME - Semester NN
    // ==========================================
    {
        name: "Course Title",
        dept: "DEPT_CODE", // e.g. "BBA", "CSE", "EEE"
        sem: "Semester NN",
        code: "PRIMARY_CODE", // e.g. "ACT0411311"
        altCode: "ALT_CODE",  // e.g. "ACT-311" or omit if none
        link: "https://drive.google.com/drive/folders/FOLDER_ID?usp=drive_link",
        type: "Major" // or "General", "Elective", "Core" depending on dept curriculum
    },
```

### Search Index Rules:
- If a course has dual codes (e.g., `ACT0411311` and `ACT-311`), store primary code in `code` and the short format in `altCode` so search indexing catches both.
- Maintain consistent indentation (4 spaces) and alphabetical or chronological semester grouping.

---

## 5. Post-Update Verification Checklist
After modifying `js/departments-data.js` and `js/search-courses.js`:
1. **Validate Syntax**: Run `node -c js/departments-data.js` and `node -c js/search-courses.js`.
2. **Bump Cache**: Increment `CACHE_NAME` in [`sw.js`](../sw.js).
3. **Synchronize Changelogs**:
   - Update `currentVersion` and add release item in [`changes.json`](../changes.json).
   - Document changes in [`doc/history.md`](../doc/history.md).
