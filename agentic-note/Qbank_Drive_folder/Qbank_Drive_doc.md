# QBank Folder Browser - Implementation Documentation

## Overview
A nested folder browser component added to the QBank section of `index.html` that allows users to browse question bank folders without leaving the website.

## Feature Description
- **Two-level navigation** system for browsing Google Drive folders
- **Dark theme** with orange accent colors
- Clicking parent folders expands subfolders (no redirect)
- Only leaf nodes (semester folders) redirect to Google Drive

## File Changes

### Modified File
- `index.html`

### Location in HTML
- Section: `#Qbank` (Question Bank section)
- Placed above the existing `<nav class="resources-nav">` element

## HTML Structure

```html
<div class="qbank-browser">
  <button class="qbank-toggle">📁 Browse Question Bank</button>
  <div class="qbank-content">
    <!-- Department folders -->
    <div class="qbank-folder">
      <button class="qbank-folder-btn">CSE Questions</button>
      <div class="qbank-subfolders">
        <!-- Semester links (redirect to Drive) -->
        <a href="..." class="qbank-link">q.cse.s01</a>
        ...
      </div>
    </div>
    ...
  </div>
</div>
```

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.qbank-browser` | Main container |
| `.qbank-toggle` | Top-level expand button |
| `.qbank-content` | Container for all folders |
| `.qbank-folder` | Individual department folder |
| `.qbank-folder-btn` | Button to expand department |
| `.qbank-subfolders` | Container for semester links |
| `.qbank-link` | Individual semester link (redirects) |
| `.qbank-full-link` | "Open Full QBank" link |

## Color Scheme

- **Background:** `#1a1a1a` (dark)
- **Secondary BG:** `#252525`
- **Accent/Border:** `#ff7b00` (orange)
- **Folder icon:** `#ff9f43`
- **Text:** `#f5f5f5` / `#e0e0e0`

## Folder Structure (from Google Drive)

```
oU1TS Qbank/
├── CSE Questions/
│   ├── q.cse.s01
│   ├── q.cse.s02
│   └── ...
├── CE Questions/
│   ├── q.ce.s01
│   └── ...
├── libraryQ.IT/
│   └── ...
└── Others/
    └── Miscellaneous
```

## JavaScript Behavior
Uses inline `onclick` handlers for toggling:
- `this.parentElement.classList.toggle('open')` - for main toggle
- `this.parentElement.classList.toggle('expanded')` - for folder expansion

## TODO
- [ ] Update placeholder Google Drive links with actual folder IDs for each semester
- [ ] Add more departments as they become available
- [ ] Consider fetching folder structure dynamically via Google Drive API

## Related Links
- Main QBank Drive: https://drive.google.com/drive/folders/1i0UUsgy68Nypc2ylPsaB-Teljkf0NSUD
