document.addEventListener("DOMContentLoaded", () => {
  const contentEl = document.querySelector(".qbank-content");
  if (!contentEl) return;

  // 1. Parse the folder structure from raw HTML
  const folders = [];
  const folderEls = contentEl.querySelectorAll(".qbank-folder");

  folderEls.forEach((folderEl) => {
    const btn = folderEl.querySelector(".qbank-folder-btn");
    const subfoldersEl = folderEl.querySelector(".qbank-subfolders");
    if (!btn || !subfoldersEl) return;

    // Get the folder name cleanly from text nodes in the button
    let folderName = "";
    btn.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        folderName += node.textContent;
      }
    });
    folderName = folderName.trim();
    if (!folderName) {
      // Fallback: search for direct text content or remove icon texts
      folderName = btn.innerText.replace(/CSE Questions|CE Questions|IT Questions|BBA Questions|Law Questions|Others/g, "").trim() || "Folder";
    }

    const items = [];
    const linkEls = subfoldersEl.querySelectorAll(".qbank-link");
    linkEls.forEach((link) => {
      const isFolder = link.classList.contains("folder");
      items.push({
        name: link.innerText.trim(),
        url: link.getAttribute("href"),
        type: isFolder ? "folder" : "file"
      });
    });

    folders.push({
      name: folderName,
      type: "folder",
      items: items
    });
  });

  // Extract the "Open Full QBank" link if it exists
  const fullLinkEl = contentEl.querySelector(".qbank-full-link");
  const fullLink = fullLinkEl ? {
    name: fullLinkEl.innerText.trim(),
    url: fullLinkEl.getAttribute("href")
  } : null;

  // Clear existing content in qbank-content
  contentEl.innerHTML = "";

  // 2. Navigation State Management
  let currentPath = []; // stack of folders. Empty = root.

  // 3. Render Explorer
  function renderExplorer() {
    contentEl.innerHTML = "";

    const explorer = document.createElement("div");
    explorer.className = "file-explorer";

    // Header
    const header = document.createElement("div");
    header.className = "explorer-header";

    // Back Button
    const backBtn = document.createElement("button");
    backBtn.className = "explorer-back-btn";
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backBtn.title = "Go Back";
    if (currentPath.length === 0) {
      backBtn.disabled = true;
      backBtn.style.opacity = "0.3";
      backBtn.style.cursor = "default";
    } else {
      backBtn.onclick = () => {
        currentPath.pop();
        renderExplorer();
      };
    }
    header.appendChild(backBtn);

    // Breadcrumbs
    const breadcrumbs = document.createElement("div");
    breadcrumbs.className = "explorer-breadcrumbs";

    const rootCrumb = document.createElement("span");
    rootCrumb.className = "explorer-crumb" + (currentPath.length === 0 ? " active" : "");
    rootCrumb.innerText = "QBank";
    rootCrumb.onclick = () => {
      if (currentPath.length > 0) {
        currentPath = [];
        renderExplorer();
      }
    };
    breadcrumbs.appendChild(rootCrumb);

    currentPath.forEach((folder, index) => {
      const sep = document.createElement("span");
      sep.className = "explorer-crumb-sep";
      sep.innerText = "/";
      breadcrumbs.appendChild(sep);

      const crumb = document.createElement("span");
      const isActive = index === currentPath.length - 1;
      crumb.className = "explorer-crumb" + (isActive ? " active" : "");
      crumb.innerText = folder.name;
      crumb.onclick = () => {
        if (!isActive) {
          currentPath = currentPath.slice(0, index + 1);
          renderExplorer();
        }
      };
      breadcrumbs.appendChild(crumb);
    });

    header.appendChild(breadcrumbs);
    explorer.appendChild(header);

    // Explorer List
    const listEl = document.createElement("div");
    listEl.className = "explorer-list";

    let activeItems = [];
    if (currentPath.length === 0) {
      activeItems = folders;
    } else {
      activeItems = currentPath[currentPath.length - 1].items;
    }

    if (activeItems.length === 0) {
      const emptyEl = document.createElement("div");
      emptyEl.className = "explorer-empty";
      emptyEl.innerText = "This folder is empty.";
      listEl.appendChild(emptyEl);
    } else {
      activeItems.forEach((item) => {
        const itemRow = document.createElement("div");
        itemRow.className = "explorer-item";

        itemRow.onclick = () => {
          if (currentPath.length === 0 && item.items) {
            // Enter folder
            currentPath.push(item);
            renderExplorer();
          } else {
            // External link (file or folder link)
            window.open(item.url, "_blank");
          }
        };

        // Icon
        const iconWrapper = document.createElement("div");
        iconWrapper.className = "explorer-item-icon";

        if (currentPath.length === 0 || item.type === "folder") {
          // Render folder using SVG from images/icons/open-folder.svg
          const img = document.createElement("img");
          img.src = "images/icons/open-folder.svg";
          img.className = "explorer-folder-svg";
          img.alt = "Folder";
          iconWrapper.appendChild(img);
        } else {
          // Render file icon
          const fileIcon = document.createElement("i");
          const nameLower = item.name.toLowerCase();
          if (nameLower.endsWith(".pdf")) {
            fileIcon.className = "far fa-file-pdf pdf-icon";
          } else if (nameLower.match(/\.(jpe?g|png|webp|gif)$/)) {
            fileIcon.className = "far fa-file-image image-icon";
          } else {
            fileIcon.className = "far fa-file-lines file-icon";
          }
          iconWrapper.appendChild(fileIcon);
        }
        itemRow.appendChild(iconWrapper);

        // Name
        const nameEl = document.createElement("span");
        nameEl.className = "explorer-item-name";
        nameEl.innerText = item.name;
        itemRow.appendChild(nameEl);

        // Right Indicator Arrow
        const indicator = document.createElement("div");
        indicator.className = "explorer-item-indicator";
        if (currentPath.length === 0) {
          indicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
        } else {
          indicator.innerHTML = '<i class="fas fa-external-link-alt"></i>';
        }
        itemRow.appendChild(indicator);

        listEl.appendChild(itemRow);
      });
    }

    explorer.appendChild(listEl);

    // Full QBank Link (at explorer footer)
    if (fullLink) {
      const footerLink = document.createElement("a");
      footerLink.href = fullLink.url;
      footerLink.target = "_blank";
      footerLink.className = "qbank-full-link explorer-footer-link";
      footerLink.innerHTML = `<i class="fas fa-external-link-alt"></i> ${fullLink.name}`;
      explorer.appendChild(footerLink);
    }

    contentEl.appendChild(explorer);
  }

  // Initial render
  renderExplorer();
});
