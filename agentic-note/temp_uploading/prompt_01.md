> let's improve the <!-- Anon File Sharing Modals --> section in @beautifulMention starting from line 1339:

> #issue:
- the submission list is not rendering links as markdown
- the submission details are longer than needed
- the Guide.pdf prompts the user to download it, instead of viewing it instantly

> #fix:
- make the links render like how links are rendered in markdown files (using linkify?)
- truncate the file names in first 3-4 terms, or shorten the title considering blank spaces as characters, instead of keeping the whole title
- make a half-screen window scroll upward from the bottom of the screen, than loads a preview of the Guide.pdf. Allowing users to view the pdf without downloading it or leaving the website. add the option to download/view full screen.

---

Fixing Anon File Sharing Modals
Updating linkify to render markdown links properly and shorten link text. Modifying index.html and anon-share.js to include a slide-up PDF viewer modal for Guide.pdf.

Files Edited
Progress Updates
1
Updating linkify function for markdown links, shortening text titles, and creating PDF sliding modal.

I have completed the requested improvements to the "Anon File Sharing Modals" section:

Markdown Links & Truncation: I've updated the linkify function in js/anon-share.js. It now parses and extracts markdown links [Title](Link) properly and drops them into <a href> tags. If a title is longer than 4 words or 30 characters, it will automatically cleanly truncate. Lone URLs are also appropriately truncated to not take up excessive space.
Submission Details Shortened: The submission details are now clamped to a maximum of 4 lines using CSS text-overflow rules, keeping the view organized and preventing long blocks of text from overtaking the UI.
PDF Preview Slider: I added a bottom-sliding modal for Guide.pdf. Clicking the link will slide open the dialog box and load a preview of the PDF directly in the browser using an embedded Google Docs Viewer to avoid forced downloads. There's also an external link icon in the new modal header to open the PDF full-screen or download it explicitly.

---

> the pdf preview window loads briefly when refreshing the website. it's not hidden by default. I have added the CSS "style="display: none;"" in the index.html (from line 1372) but now it does not show at all when clicked on the Guide.pdf link.

> #target files: index.html, anon-share.js (ignore others)


I've updated the script to handle the inline style="display: none;" properly!

This was happening because without that style in 

index.html
, the modal container was still a block level element (just transparent with opacity: 0) and momentarily flashing before our JS injected the CSS styling rules into the page.

By adding style="display: none;" to the HTML tag directly, it properly hides it right on page load. I've updated 

js/anon-share.js
 to change display: flex right when you click the link (so the CSS transitions still work) and revert it to display: none when the modal closes.

Give the website a refresh and that flash-on-load issue should be entirely fixed, and the PDF Guide link will slide up as intended!