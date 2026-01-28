# Prompt: Improve university_projects.html

> prompt

```
let's improve @[misc/university_projects.html] further.

#target
- move <section id="uits-projects" class="content-section" style="margin-top: 0;"> inside  <section id="inter-university" class="content-section">
- FAQ elements are not working, add/fix necessary JS for:
<div class="section" style="margin-bottom: 10px;"
                data-faq="Projects by UITS Students. Let me know if you're working on something and are okay with sharing it, I'll happily list them here.|: &#41;">
                <div class="faq-icon">?</div>
                <div class="faq-box"></div>
            </div>

- do not separate each sections by 100vh. Projects list should start right after <header> section.
```

---

## Clarification

The user clarified that "moving UITS-Projects inside Inter University Resources" means adding the UITS project links as a table row in the Inter University Resources table (similar to how UIU is listed), not as a separate sub-section.

---

## Changes Made (2026-01-25)

### 1. Restructured UITS-Projects
- Removed the standalone UITS-Projects `<div>` section with grid buttons
- Added UITS as the first row in the Inter University Resources table
- Links included: oU1TS Portal, oU1TS Wiki, Blood Donation Network

### 2. Fixed FAQ Tooltip JavaScript
- Added inline FAQ tooltip functionality since `js/faq.tooltip.js` didn't exist
- FAQ icon click now toggles the FAQ box visibility

### 3. Removed 100vh Section Spacing
Added CSS overrides:
```css
.content-section {
    min-height: auto !important;
    margin-top: 2rem !important;
    padding: 2rem 2rem !important;
}
```

### 4. Added `.project-link` CSS Class
User added a reusable class for project link styling:
```css
.project-link {
    background-color: lightblue;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    color: #000000;
}
```

### 5. Updated DIU Row
User moved Blended Learning Center to Official Resources column and added:
- DIU Smart Proctor
- বাজারদর (now a govt. project)

---

## Changes Made (2026-01-25) - Accordion Dropdown

### 6. Replaced Table with Accordion Dropdown
- Converted the `table-container` table format to an accordion-style dropdown menu
- Only university names are visible initially; clicking expands to show resources
- Universities sorted alphabetically: AIUB, AUST, BRACU, BUTEX, DIU, IUB, IUT, NSU, SEU, SUST, UIU, UITS

### 7. Added Accordion CSS
```css
.university-accordion { display: flex; flex-direction: column; gap: 8px; }
.accordion-item { border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; }
.accordion-header { width: 100%; padding: 14px 18px; display: flex; justify-content: space-between; cursor: pointer; }
.accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
.accordion-item.active .accordion-content { max-height: 600px; padding: 18px; }
.accordion-item.active .accordion-icon { transform: rotate(180deg); }
```

### 8. Added Accordion JavaScript
```javascript
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        this.closest('.accordion-item').classList.toggle('active');
    });
});
```

### 9. Preserved Inline Styles
- Kept existing inline styles on Student Projects links (lightblue, yellow, red backgrounds)
- Resources now grouped under "Official Resources" and "Student Projects" headings within each accordion
