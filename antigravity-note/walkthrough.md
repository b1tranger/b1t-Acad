# Theme Switcher and Layout Fixes Walkthrough

## Changes Summary

### 1. Gray Theme Implementation
-   **CSS Variables**: Refactored `style.css` to use CSS variables (`--bg-color`, `--text-color`, `--secondary-color`, etc.) for easier theming.
-   **Gray Theme Colors**: Defined a "Gray Theme" palette (`[data-theme="gray"]`) with:
    -   Background: `#e3e3e3` (Off-white/Gray)
    -   Text: `#1a1a1a` (Dark Gray/Black) for readability.
    -   Secondary elements: `#f0f0f0` and `#dcdcdc` to differentiate from the background.
-   **Contrast fixes**: Updated text colors in the "About", "Footer", and "Search" sections to ensure they are visible in both Dark and Gray themes.

### 2. Layout & UI Fixes
-   **b1t Scheduler Button on Mobile**: Added a media query to **hide** the floating "b1t Scheduler" button on screens narrower than 768px.
    -   *Logic*: `display: none !important` inside `@media (max-width: 768px)`.
-   **Theme Switcher Position**: Moved the theme toggle button to be adjacent to the scheduler button (left side) and adjusted its position for mobile.
-   **Footer Icons**: Updated social media icons in the footer to use `var(--text-color)` so they turn dark in the Gray Theme.
-   **Go To Top Button**: Updated the arrow icon to use `currentColor` so it adapts to the button's text color.

## Verification Scenarios

### Scenario 1: Switching Themes
1.  Click the Moon/Sun icon at the top right.
2.  **Expected**: Website background turns light gray, text turns dark.
3.  **Expected**: The icon changes from Moon to Sun.
4.  **Expected**: All text (including footer, search hints) is clearly readable.

### Scenario 2: Mobile View
1.  Resize browser window to < 768px width.
2.  **Expected**: The floating "b1t Scheduler" button at the top right disappears.
3.  **Expected**: The "b1t Scheduler" link is still accessible via the hamburger menu (functionality already existed in HTML).
4.  **Expected**: Theme switcher remains visible but adjusts position.

### Code Changes
-   `style.css`: Major refactor to introduce variables and replace hardcoded colors.
-   `index.html`: Minor updates to use CSS variables inline.
