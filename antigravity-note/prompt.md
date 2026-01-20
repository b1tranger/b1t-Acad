see the files in "D1\CSE". I want to make a single new page for departments, say, Departments.html, instead of multiple html pages to browse between the semester contents (pages with titles S01 to S08). here "D1" refers to "depth level 1" but you can think of it as "Departments" folder.

now look at the id="Departments" section inside index.html. Instead of a selector, I want a plain list of Departments here. The Semester selector would be placed in the Departments.html. Depending on the semester that the use selectes from the selector, the contents of the respecting department and semester will load like the individual pages (S01 - S08 for each department).

---

seems okay. you may proceed. just make sure not to introduce new tech or frameworks (CSS or JS), and use the existing ones which are basic. But let me know if some tasks cannot be completed without frameworks. otherwise, so as I requested.

---

it's alright. Please make it mobile responsive, and add the data for other departments. Also make a similar empty section for "BBA" department, where I will be adding data in the future.

---

the department.html is not mobile display responsive. the semester list grid is not resizing. please check.

---

please remove all the flex properties and replace them with grid. Especiallly the semester selector, and coure materials. there seems to be padding at top and left side, please remove it,. use uniform padding for all sides instead. also the mobile display screen size shows scroll bar in x direction. I do not want this "overflow-x: scroll" property. please remove it as well. 

---

move the old (and unnecessary) files into a new folder named "archive-old-design". 

---


blog.html
campus.html
Curated-Resources.html
CP-aux.html
My-guides.html
tutorial.html
TG-portal.html
 

move this files into "misc" folder, and make necessary changes to paths inside links used inside them and other pages so the results remain consistent.

---

I can see that there are a lot of css files in my project. Can you make necessary changes so there are no redundancy in the css code? I am not asking you to reduce the amout of css files. Just make it so there are no duplicates overlapping. 

But please compile @styles.css@new.style.css  files into one style.css. Comment out the unnecessary css code at the very end of each file. 

Again, do not remove any css file, and instead of removing unnecessary codes, just comment them out as I have requested.