# Theme Switcher Implementation Plan

## Goal
Add a "gray theme" switcher to the website, accessible via a small icon next to the "b1t Scheduler" button. On mobile, move the "b1t Scheduler" link to the sidebar.

## Proposed Changes

### CSS (`style.css`)
- Define `[data-theme="gray"]` selector with light/gray color variables.
- Add styles for the theme switcher icon (positioning it next to `#floating-button`).
- Update media queries:
    - Hide `#floating-button` on mobile.
    - Show the "b1t Scheduler" link in the sidebar (which is `sticky-nav` on mobile) only on mobile.
    - Ensure theme switcher is accessible on mobile (possibly move to sidebar or keep in header).

### HTML (`index.html` and others)
- Add the theme switcher button (using Font Awesome icon, e.g., `fa-moon` / `fa-sun`) next to `#floating-button`.
- Add a list item for "b1t Scheduler" inside the `.sticky-nav ul`, with a class to hide it on desktop.
- Link the new `js/theme.js`.

### JavaScript (`js/theme.js`) -- [NEW]
- **Functionality**:
    - Check `localStorage` for saved theme on load.
    - Toggle `data-theme` attribute on `<html>`.
    - Update the toggle icon (Sun/Moon).
    - Save preference to `localStorage`.

## Verification Plan
- **Manual Verification**:
    - Click the theme switcher and verify colors change to "gray theme".
    - Refresh page to verify theme persistence.
    - Resize window to mobile width:
        - Verify `#floating-button` disappears.
        - Verify "b1t Scheduler" appears in the sidebar menu.
        - Verify theme switcher is still accessible.
