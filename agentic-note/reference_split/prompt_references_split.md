
> prompt

```
#target files: @References.html @style.css @index.html 

#target section:
1.  <div class="university-resources" style="margin-bottom: 50px;padding-left: 10px;padding-right: 10px;">
2. <div id="credits" style="max-width: 600px; margin: auto; text-align: center; font-family: Arial, sans-serif;padding-left: 10px;padding-right: 10px;">

#target changes:
- I want to improve the CSS of the whole @References.html  page. Please refer to @index.html and make the references.html based on index.html.
- refer to the #target section, and make 2 html pages by separating the two sections that have been mentioned
- two new html pages will be: 
  - "university_projects.html" where the contents starting from "Inter University Resources" will be added. Also add the section starting with "UITS-Projects" here
  - "contributions.html" where point 2 of the #target section will be added

- you can add the parts where "data-faq"  are defines. these should work as local FAQs

#ignore
- everything else. do not make extra css changes, stick to the target sections of the target files. 

#documentation
- @prompt_references_split.md  update this file with the documentation of the new changes. Make sure to add the user prompts as provided. You may add your interpretation of what the user said alongside it.
```

---

## Interpretation

The user requested to split the References.html page into multiple HTML pages while improving their CSS to match the styling of index.html. The key objectives were:

1. **Split content into separate pages**:
   - `university_projects.html` - Contains UITS-Projects and Inter University Resources table
   - `contributions.html` - Contains Credits & Acknowledgements section

2. **Improve CSS styling** to match index.html patterns:
   - Use `style.css` for consistent theming
   - Add theme toggle (dark/light mode)
   - Add mobile hamburger menu
   - Add sticky navigation bar
   - Add go-to-top button

3. **Keep data-faq elements** for FAQ tooltips

4. **Update References.html** as a hub page linking to the new pages

---

## Changes Made (2026-01-24)

### New Files Created

| File | Description |
|------|-------------|
| `university_projects.html` | UITS-Projects section + Inter University Resources table with FAQ tooltips |
| `contributions.html` | Credits & Acknowledgements with UITS Contributors, Friends & Collaborators, AI Assistance sections |

### Modified Files

| File | Changes |
|------|---------|
| `References.html` | Converted to hub page with links to new pages, uses index.html styling patterns |

### Design Features Added

- **Theme Toggle**: Dark/Light mode support via `js/theme.js`
- **Sticky Navigation**: Appears when scrolling down
- **Mobile Menu**: Hamburger menu for mobile devices
- **Go-to-Top Button**: Floating button for easy navigation
- **Consistent Styling**: All pages now use `style.css` CSS variables

### File Structure

```
b1t-Acad/
├── References.html          # Hub page (updated)
├── university_projects.html # NEW - UITS Projects + Inter University Resources
├── contributions.html       # NEW - Credits & Acknowledgements
├── style.css               # Main stylesheet (shared by all pages)
└── js/
    └── theme.js            # Theme toggle logic
```

### Navigation Structure

All three pages share the same navigation:
- Home → index.html
- References → References.html (hub)
- Projects → university_projects.html
- Credits → contributions.html