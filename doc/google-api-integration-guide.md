# Step-by-Step Guide: Google Drive API & Google Form Integration

**Project**: b1t-Acad / oU1TS Portal  
**Target File**: `doc/google-api-integration-guide.md`  
**Purpose**: Comprehensive architectural blueprint and step-by-step technical implementation guide to:
1. Authenticate users via Google Identity Services (GIS / OAuth 2.0).
2. Conditionally view and explore Google Drive resources inside the website based on login state.
3. Submit custom in-website forms to Google Forms / Google Drive via a zero-cost, CORS-friendly Google Apps Script API bridge.

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Step 1: Google Cloud Console Configuration](#step-1-google-cloud-console-configuration)
3. [Step 2: Google Identity Services (GIS) & Conditional View Architecture](#step-2-google-identity-services-gis--conditional-view-architecture)
4. [Step 3: In-Website Google Drive Viewer & Folder Explorer](#step-3-in-website-google-drive-viewer--folder-explorer)
5. [Step 4: Custom In-Website Form Submission Architecture](#step-4-custom-in-website-form-submission-architecture)
6. [Step 5: Google Apps Script API Bridge (Code & Deployment)](#step-5-google-apps-script-api-bridge-code--deployment)
7. [Step 6: UI/UX Component Specifications](#step-6-uiux-component-specifications)
8. [Step 7: Security, Service Worker & PWA Considerations](#step-7-security-service-worker--pwa-considerations)
9. [Step 8: Verification, Testing & Troubleshooting](#step-8-verification-testing--troubleshooting)

---

## 1. Architecture Overview

```
                     +--------------------------------------------+
                     |            b1t-Acad Web Client             |
                     |  (Vanilla JS, Glassmorphic Dark UI, PWA)   |
                     +--------------------------------------------+
                                   |                 |
                   Google Sign-In  |                 | Custom Form Submit
                   & Token Request |                 | (JSON / Base64 File)
                                   v                 v
               +-----------------------+    +-----------------------+
               | Google Identity (GIS) |    |  Google Apps Script   |
               | OAuth 2.0 Client ID   |    |  Web App API Bridge   |
               +-----------------------+    +-----------------------+
                           |                            |
          Access Token /   |                            | Submit Response &
          Logged-in State  |                            | Upload File
                           v                            v
               +-----------------------+    +-----------------------+
               |   Google Drive API    |    |  Google Form / Sheet  |
               |  (v3 Files & Folders) |    |  & Drive Submissions  |
               +-----------------------+    +-----------------------+
```

### Key Technical Considerations
- **Static Hosting Friendly**: The portal is statically hosted on GitHub Pages / Netlify. All integrations must run client-side without requiring a dedicated Node/Python server backend.
- **Why Apps Script for Form Submission?**: The official Google Forms REST API (`v1`) requires elevated OAuth scopes or server-to-server service account credentials to mutate forms, and does not provide an anonymous public submit endpoint. A lightweight **Google Apps Script Web App** acts as a secure, serverless API endpoint with CORS headers, accepting custom submissions and file uploads to Google Drive with 100% free hosting.
- **Conditional Drive Access**: Google Drive links throughout b1t-Acad (e.g. in Question Bank, Departments, Library) are wrapped with an auth guard. Unauthenticated visitors see a locked indicator and login prompt; authenticated users can open an in-website modal preview or navigate folders interactively.

---

## Step 1: Google Cloud Console Configuration

### 1.1 Create or Select a GCP Project
1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown at the top and select **New Project**.
3. Project Name: `b1t-Acad-Portal`.
4. Click **Create**.

### 1.2 Enable Required APIs
1. In the left navigation menu, go to **APIs & Services > Library**.
2. Search for and enable:
   - **Google Drive API** (v3)
   - **Google Forms API** (optional if using Apps Script, required if reading form schema)
   - **Google Identity Toolkit API** / **People API** (optional for user profile display)

### 1.3 Configure OAuth Consent Screen
1. Go to **APIs & Services > OAuth consent screen**.
2. Select User Type:
   - **External**: Allows any Google account (or university accounts) to sign in.
3. Fill in basic information:
   - **App name**: `b1t-Acad Academic Portal`
   - **User support email**: Your admin email.
   - **Developer contact information**: Your contact email.
4. Add Scopes:
   - `.../auth/userinfo.profile` (Read user name and avatar)
   - `.../auth/userinfo.email` (Read user email for institutional validation)
   - `https://www.googleapis.com/auth/drive.readonly` (Read Drive files metadata for embedded viewing)
5. Under **Test Users**, add your personal/testing Google email addresses while the app is in testing mode.
6. Click **Save and Continue**.

### 1.4 Generate OAuth 2.0 Web Client ID
1. Go to **APIs & Services > Credentials**.
2. Click **Create Credentials > OAuth client ID**.
3. Application Type: **Web application**.
4. Name: `b1t-Acad Web Client`.
5. **Authorized JavaScript origins**:
   - `http://localhost:5500` (for Live Server local development)
   - `http://127.0.0.1:5500`
   - `https://b1tacad.netlify.app`
   - `https://ou1ts.netlify.app`
   - `https://b1tranger.github.io`
6. Click **Create**.
7. Copy the generated **Client ID** (e.g., `xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com`).

### 1.5 Generate an API Key (Restricted)
1. In **Credentials**, click **Create Credentials > API key**.
2. Click **Edit API key**:
   - Name: `b1t-Acad Drive Viewer Key`.
   - **Set Application Restrictions**: Choose **Websites** and restrict to your domains (`*.netlify.app/*`, `*.github.io/*`, `localhost:*`).
   - **Set API Restrictions**: Restrict specifically to **Google Drive API**.
3. Copy the **API Key**.

---

## Step 2: Google Identity Services (GIS) & Conditional View Architecture

### 2.1 Include GIS Script in HTML
Include the modern Google Identity Services SDK in [`index.html`](file:///d:/GitHub/%5BoU1TS%5D/b1t-Acad/index.html) and other entry pages:
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

### 2.2 Auth Manager Module (`js/auth-manager.js`)
Create a modular authentication controller adhering to the existing vanilla JS patterns in `js/`:

```javascript
// ============================================
// AUTH MANAGER MODULE (Google Identity Services)
// ============================================
const AuthManager = {
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    API_KEY: 'YOUR_RESTRICTED_GOOGLE_API_KEY',
    SCOPES: 'https://www.googleapis.com/auth/drive.readonly email profile',

    user: null,
    accessToken: null,
    tokenClient: null,

    init() {
        this.loadStoredSession();
        this.initGISClient();
        this.setupEventListeners();
        this.updateUI();
    },

    initGISClient() {
        if (!window.google || !window.google.accounts) {
            setTimeout(() => this.initGISClient(), 100);
            return;
        }

        // Initialize OAuth 2.0 Token Client for Drive access
        this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES,
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    this.handleTokenSuccess(tokenResponse);
                }
            }
        });
    },

    signIn() {
        if (!this.tokenClient) return;
        // Prompt user for account authorization
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
    },

    signOut() {
        if (this.accessToken) {
            google.accounts.oauth2.revoke(this.accessToken, () => {
                console.log('Access token revoked');
            });
        }
        this.user = null;
        this.accessToken = null;
        sessionStorage.removeItem('b1t_acad_user');
        sessionStorage.removeItem('b1t_acad_token');
        this.updateUI();
        document.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { isAuthenticated: false } }));
    },

    async handleTokenSuccess(tokenResponse) {
        this.accessToken = tokenResponse.access_token;
        sessionStorage.setItem('b1t_acad_token', this.accessToken);

        // Fetch user profile info
        try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });
            const profile = await res.json();
            this.user = profile;
            sessionStorage.setItem('b1t_acad_user', JSON.stringify(profile));
        } catch (e) {
            this.user = { name: 'Student Member', email: '' };
        }

        this.updateUI();
        document.dispatchEvent(new CustomEvent('auth-state-changed', { 
            detail: { isAuthenticated: true, user: this.user, token: this.accessToken } 
        }));
    },

    loadStoredSession() {
        const storedUser = sessionStorage.getItem('b1t_acad_user');
        const storedToken = sessionStorage.getItem('b1t_acad_token');
        if (storedUser && storedToken) {
            this.user = JSON.parse(storedUser);
            this.accessToken = storedToken;
        }
    },

    isAuthenticated() {
        return !!this.accessToken;
    },

    updateUI() {
        const authButtons = document.querySelectorAll('.auth-trigger-btn');
        const userBadges = document.querySelectorAll('.auth-user-badge');
        const lockedBadges = document.querySelectorAll('.drive-locked-badge');

        if (this.isAuthenticated()) {
            authButtons.forEach(btn => {
                btn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Sign Out`;
                btn.onclick = () => this.signOut();
            });
            userBadges.forEach(badge => {
                badge.style.display = 'inline-flex';
                badge.textContent = this.user?.name || 'Authenticated';
            });
            lockedBadges.forEach(badge => badge.style.display = 'none');
            document.body.classList.add('user-authenticated');
        } else {
            authButtons.forEach(btn => {
                btn.innerHTML = `<i class="fa-brands fa-google"></i> Sign In to Access`;
                btn.onclick = () => this.signIn();
            });
            userBadges.forEach(badge => badge.style.display = 'none');
            lockedBadges.forEach(badge => badge.style.display = 'inline-flex');
            document.body.classList.remove('user-authenticated');
        }
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const driveLink = e.target.closest('a[href*="drive.google.com"]');
            if (driveLink && !driveLink.classList.contains('bypass-auth-guard')) {
                if (!this.isAuthenticated()) {
                    e.preventDefault();
                    this.showLoginRequiredModal(driveLink.href);
                } else if (driveLink.dataset.viewerModal === 'true' || !driveLink.target) {
                    e.preventDefault();
                    DriveViewer.open(driveLink.href);
                }
            }
        });
    },

    showLoginRequiredModal(targetUrl) {
        let modal = document.getElementById('login-required-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'login-required-modal';
            modal.className = 'anon-modal-overlay';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 440px; text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; color: #64b5f6; margin-bottom: 1rem;">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <h3 style="margin-bottom: 0.5rem; color: #fff;">Student Login Required</h3>
                    <p style="color: #bbb; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.5;">
                        To view archived course resources and study materials, please sign in with your Google account.
                    </p>
                    <button id="modal-login-btn" class="submit-resource-btn" style="width: 100%; justify-content: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <i class="fa-brands fa-google"></i> Sign In with Google
                    </button>
                    <button id="modal-close-login" style="background: none; border: none; color: #888; cursor: pointer; padding: 0.5rem;">
                        Dismiss
                    </button>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('modal-close-login').onclick = () => {
                modal.style.display = 'none';
            };
            modal.onclick = (ev) => {
                if (ev.target === modal) modal.style.display = 'none';
            };
        }

        const loginBtn = document.getElementById('modal-login-btn');
        loginBtn.onclick = () => {
            modal.style.display = 'none';
            this.signIn();
        };

        modal.style.display = 'flex';
    }
};
```

---

## Step 3: In-Website Google Drive Viewer & Folder Explorer

### 3.1 Google Drive URL Parsing
Google Drive links come in two primary formats:
1. **Direct Files**: `https://drive.google.com/file/d/{FILE_ID}/view`
2. **Folders**: `https://drive.google.com/drive/folders/{FOLDER_ID}`

### 3.2 Drive Viewer Module (`js/drive-viewer.js`)
Create an in-app modal that:
- Embeds single files directly using Google's preview iframe (`https://drive.google.com/file/d/{FILE_ID}/preview`).
- Queries Google Drive API v3 for folders to render a navigable explorer table inside the modal.

```javascript
// ============================================
// GOOGLE DRIVE IN-APP VIEWER & EXPLORER
// ============================================
const DriveViewer = {
    modalEl: null,

    init() {
        this.injectModal();
    },

    injectModal() {
        if (document.getElementById('drive-viewer-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'drive-viewer-modal';
        modal.className = 'drive-viewer-overlay';
        modal.innerHTML = `
            <div class="drive-viewer-window">
                <header class="drive-viewer-header">
                    <div class="drive-header-title">
                        <i class="fa-brands fa-google-drive" style="color: #4285F4;"></i>
                        <span id="drive-modal-title">Drive Resource Preview</span>
                    </div>
                    <div class="drive-header-actions">
                        <a id="drive-external-link" href="#" target="_blank" class="drive-action-btn" title="Open in Google Drive">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                        <button id="drive-close-btn" class="drive-action-btn close" title="Close Preview">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </header>
                <div class="drive-viewer-body" id="drive-modal-body">
                    <div class="drive-viewer-loader">
                        <div class="spinner"></div>
                        <p>Loading resource preview...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modalEl = modal;

        document.getElementById('drive-close-btn').onclick = () => this.close();
        modal.onclick = (e) => {
            if (e.target === modal) this.close();
        };
    },

    open(url) {
        this.injectModal();
        this.modalEl.style.display = 'flex';
        document.getElementById('drive-external-link').href = url;

        const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);

        if (fileMatch && fileMatch[1]) {
            this.renderFilePreview(fileMatch[1]);
        } else if (folderMatch && folderMatch[1]) {
            this.renderFolderExplorer(folderMatch[1]);
        } else {
            // Fallback for generic drive links
            this.renderGenericIframe(url);
        }
    },

    close() {
        if (this.modalEl) {
            this.modalEl.style.display = 'none';
            document.getElementById('drive-modal-body').innerHTML = '';
        }
    },

    renderFilePreview(fileId) {
        const body = document.getElementById('drive-modal-body');
        document.getElementById('drive-modal-title').textContent = 'File Preview';
        body.innerHTML = `
            <iframe 
                src="https://drive.google.com/file/d/${fileId}/preview" 
                class="drive-preview-iframe" 
                allow="autoplay" 
                frameborder="0">
            </iframe>
        `;
    },

    async renderFolderExplorer(folderId) {
        const body = document.getElementById('drive-modal-body');
        document.getElementById('drive-modal-title').textContent = 'Folder Browser';

        if (!AuthManager.accessToken) {
            body.innerHTML = `
                <div class="drive-error-msg">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p>Authorization required to inspect folder contents.</p>
                    <button class="submit-resource-btn" onclick="AuthManager.signIn()">Sign In</button>
                </div>
            `;
            return;
        }

        body.innerHTML = `
            <div class="drive-viewer-loader">
                <div class="spinner"></div>
                <p>Retrieving folder items...</p>
            </div>
        `;

        try {
            const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
            const endpoint = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,size,webViewLink,iconLink)&pageSize=100&orderBy=folder,name`;

            const res = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${AuthManager.accessToken}` }
            });

            if (!res.ok) throw new Error(`Google API returned HTTP ${res.status}`);
            const data = await res.json();
            const files = data.files || [];

            if (files.length === 0) {
                body.innerHTML = `<div class="drive-empty-state"><p>This folder is empty.</p></div>`;
                return;
            }

            let html = `<div class="drive-folder-list">`;
            files.forEach(item => {
                const isFolder = item.mimeType === 'application/vnd.google-apps.folder';
                const icon = isFolder ? 'fa-folder' : (item.mimeType.includes('pdf') ? 'fa-file-pdf' : 'fa-file-lines');
                const sizeStr = item.size ? `${(parseInt(item.size) / (1024 * 1024)).toFixed(1)} MB` : (isFolder ? 'Folder' : '--');

                html += `
                    <div class="drive-item-row" data-id="${item.id}" data-type="${isFolder ? 'folder' : 'file'}">
                        <div class="item-name">
                            <i class="fa-solid ${icon} item-icon ${isFolder ? 'folder' : 'file'}"></i>
                            <span>${item.name}</span>
                        </div>
                        <div class="item-size">${sizeStr}</div>
                        <div class="item-action">
                            <a href="${item.webViewLink}" target="_blank" class="drive-item-action-btn">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            body.innerHTML = html;

            // Handle subfolder and file clicks
            body.querySelectorAll('.drive-item-row').forEach(row => {
                row.addEventListener('click', (ev) => {
                    if (ev.target.closest('.drive-item-action-btn')) return;
                    const id = row.dataset.id;
                    const type = row.dataset.type;
                    if (type === 'folder') {
                        this.renderFolderExplorer(id);
                    } else {
                        this.renderFilePreview(id);
                    }
                });
            });

        } catch (err) {
            console.error('Failed to load Drive folder:', err);
            body.innerHTML = `
                <div class="drive-error-msg">
                    <p>Unable to load folder contents via API. You can still open it directly in Google Drive.</p>
                    <a href="https://drive.google.com/drive/folders/${folderId}" target="_blank" class="submit-resource-btn">
                        Open in Google Drive <i class="fa-solid fa-external-link"></i>
                    </a>
                </div>
            `;
        }
    }
};
```

---

## Step 4: Custom In-Website Form Submission Architecture

### 4.1 Form API Strategy: Why Google Apps Script?
Google Forms does not provide a CORS-friendly public JSON endpoint for submitting user responses directly from external web pages. The two official ways:
1. **Google Forms API v1**: Intended for administrative access (creating questions, reading batches of responses). It requires user OAuth or a backend service account with private keys (unsafe to embed in client-side static sites).
2. **Google Apps Script Web App**: Acts as a micro-backend deployed directly inside your Google Drive!
   - 100% free, runs on Google's servers.
   - Accepts POST requests from your website (`fetch()`).
   - Writes responses to a Google Form or linked Google Sheet.
   - Accepts **attachments/files** directly, saving them into a designated Google Drive folder.
   - Sends notification emails to admins if desired.

---

## Step 5: Google Apps Script API Bridge (Code & Deployment)

### 5.1 Create the Apps Script Project
1. Open [script.google.com](https://script.google.com/).
2. Click **New Project**.
3. Rename project to: `b1t-Acad Form Submitter Bridge`.

### 5.2 Add Backend Script (`Code.gs`)
Replace the default code with the following production-ready script:

```javascript
/**
 * b1t-Acad Custom Form Submission Bridge
 * Receives POST requests from custom website form,
 * uploads file attachments to Google Drive,
 * and appends submission entries into Google Sheet / Google Form.
 */

// CONFIGURATION: Set your Target Google Drive Folder & Sheet IDs
const CONFIG = {
  // Folder ID where submitted files will be stored
  UPLOAD_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE',
  // Spreadsheet ID where submissions will be logged
  SPREADSHEET_ID: 'YOUR_GOOGLE_SPREADSHEET_ID_HERE',
  SHEET_NAME: 'Submissions'
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait up to 30s to prevent concurrent write collisions
  lock.tryLock(30000);

  try {
    const rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return jsonResponse({ status: 'error', message: 'No payload received' }, 400);
    }

    const payload = JSON.parse(rawData);

    // 1. Process File Upload (if any)
    let fileUrl = '';
    let fileName = '';
    if (payload.fileData && payload.fileName) {
      const folder = DriveApp.getFolderById(CONFIG.UPLOAD_FOLDER_ID);
      const decodedData = Utilities.base64Decode(payload.fileData.split(',')[1] || payload.fileData);
      const blob = Utilities.newBlob(decodedData, payload.fileType || 'application/octet-stream', payload.fileName);
      const uploadedFile = folder.createFile(blob);
      uploadedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = uploadedFile.getUrl();
      fileName = uploadedFile.getName();
    }

    // 2. Log to Google Sheet
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Submission Type',
        'Department',
        'Course / Topic',
        'Contributor Name',
        'Student ID',
        'Contact / Email',
        'Notes / Details',
        'File Attachment Link'
      ]);
    }

    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      payload.submissionType || 'Question Paper',
      payload.department || 'General',
      payload.courseTopic || 'N/A',
      payload.contributorName || 'Anonymous',
      payload.studentId || 'N/A',
      payload.email || 'N/A',
      payload.notes || '',
      fileUrl
    ]);

    return jsonResponse({
      status: 'success',
      message: 'Resource submitted successfully!',
      timestamp: timestamp,
      fileUrl: fileUrl
    }, 200);

  } catch (error) {
    return jsonResponse({
      status: 'error',
      message: error.toString()
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

// Handle preflight CORS requests
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function jsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 5.3 Deploying the Web App
1. At the top right of Apps Script editor, click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in settings:
   - **Description**: `b1t-Acad Form Submitter v1`.
   - **Execute as**: `Me (your-email@gmail.com)` *(Important: Allows script to write to your Drive/Sheet)*.
   - **Who has access**: `Anyone` *(Important: Allows client submissions without Google login barrier)*.
4. Click **Deploy**.
5. Authorize the script when prompted by Google.
6. Copy the **Web App URL** (format: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## Step 6: UI/UX Component Specifications

### 6.1 Custom In-Website Form Modal
Integrate the submission modal directly in [`submission.html`](file:///d:/GitHub/%5BoU1TS%5D/b1t-Acad/submission.html) or [`index.html`](file:///d:/GitHub/%5BoU1TS%5D/b1t-Acad/index.html), replacing the external redirects for `Upload Questions` and `Upload Notes`.

```html
<!-- Custom Submission Modal -->
<div id="custom-submission-modal" class="anon-modal-overlay">
  <div class="modal-content custom-form-modal">
    <div class="modal-header">
      <h3 id="form-modal-title"><i class="fa-solid fa-cloud-arrow-up"></i> Submit Resource</h3>
      <button class="close-btn" id="close-submission-modal">&times;</button>
    </div>
    
    <form id="resource-upload-form" class="modal-body">
      <!-- Submission Type Selection -->
      <div class="form-group">
        <label for="submission-type">Submission Category</label>
        <select id="submission-type" required class="form-input">
          <option value="Question Paper">Question Paper / Exam Recall</option>
          <option value="Lecture Notes">Lecture Notes & Summaries</option>
          <option value="Lab Report / Code">Lab Report / Code Solution</option>
          <option value="Book / Reference">Reference Book / PDF</option>
        </select>
      </div>

      <!-- Department & Course -->
      <div class="form-row">
        <div class="form-group flex-1">
          <label for="form-department">Department</label>
          <select id="form-department" required class="form-input">
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            <option value="Civil">Civil</option>
            <option value="BBA">BBA</option>
            <option value="English">English</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Law">Law</option>
          </select>
        </div>
        <div class="form-group flex-1">
          <label for="form-course">Course / Subject Code</label>
          <input type="text" id="form-course" placeholder="e.g. CSE-211" required class="form-input">
        </div>
      </div>

      <!-- Contributor Details -->
      <div class="form-row">
        <div class="form-group flex-1">
          <label for="form-name">Contributor Name (or 'Anonymous')</label>
          <input type="text" id="form-name" placeholder="Your Name or Alias" value="Anonymous" class="form-input">
        </div>
        <div class="form-group flex-1">
          <label for="form-contact">Student ID / Telegram / Email</label>
          <input type="text" id="form-contact" placeholder="Optional for recognition" class="form-input">
        </div>
      </div>

      <!-- Notes / Description -->
      <div class="form-group">
        <label for="form-notes">Description / Exam Details</label>
        <textarea id="form-notes" rows="3" placeholder="Semester (e.g. Spring 2026), Mid/Final, Teacher, or question memory prompts..." class="form-input"></textarea>
      </div>

      <!-- File Attachment Upload -->
      <div class="form-group">
        <label for="form-file">Attach Document / Image / PDF (Max 15MB)</label>
        <div class="file-dropzone" id="file-dropzone">
          <i class="fa-solid fa-file-arrow-up"></i>
          <span id="file-chosen-text">Drag & drop or browse file</span>
          <input type="file" id="form-file" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip" style="display:none;">
        </div>
      </div>

      <div class="form-feedback" id="form-feedback" style="display:none;"></div>

      <div class="modal-footer" style="padding: 15px 0 0 0;">
        <button type="button" class="back-btn" id="cancel-submission-btn">Cancel</button>
        <button type="submit" class="submit-resource-btn" id="submit-form-btn">
          <i class="fa-solid fa-paper-plane"></i> Submit Resource
        </button>
      </div>
    </form>
  </div>
</div>
```

### 6.2 Client Submission Logic (`js/submission-bridge.js`)
```javascript
const SubmissionBridge = {
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',

    init() {
        const form = document.getElementById('resource-upload-form');
        const fileInput = document.getElementById('form-file');
        const dropzone = document.getElementById('file-dropzone');
        const fileText = document.getElementById('file-chosen-text');

        if (dropzone && fileInput) {
            dropzone.onclick = () => fileInput.click();
            fileInput.onchange = () => {
                if (fileInput.files.length > 0) {
                    fileText.textContent = fileInput.files[0].name;
                }
            };
        }

        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                await this.handleSubmit();
            };
        }
    },

    async handleSubmit() {
        const submitBtn = document.getElementById('submit-form-btn');
        const feedback = document.getElementById('form-feedback');
        const fileInput = document.getElementById('form-file');

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;
        feedback.style.display = 'none';

        try {
            let fileData = null;
            let fileName = null;
            let fileType = null;

            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                if (file.size > 15 * 1024 * 1024) {
                    throw new Error('File exceeds 15MB limit. Please provide a Drive link in description instead.');
                }
                fileName = file.name;
                fileType = file.type;
                fileData = await this.toBase64(file);
            }

            const payload = {
                submissionType: document.getElementById('submission-type').value,
                department: document.getElementById('form-department').value,
                courseTopic: document.getElementById('form-course').value,
                contributorName: document.getElementById('form-name').value,
                contact: document.getElementById('form-contact').value,
                notes: document.getElementById('form-notes').value,
                fileData: fileData,
                fileName: fileName,
                fileType: fileType
            };

            const response = await fetch(this.APPS_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids CORS preflight issues with Apps Script
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.status === 'success') {
                feedback.className = 'form-feedback success';
                feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Submitted successfully! Thank you for contributing.`;
                feedback.style.display = 'block';
                document.getElementById('resource-upload-form').reset();
                document.getElementById('file-chosen-text').textContent = 'Drag & drop or browse file';
                setTimeout(() => {
                    document.getElementById('custom-submission-modal').style.display = 'none';
                    feedback.style.display = 'none';
                }, 2500);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err) {
            feedback.className = 'form-feedback error';
            feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${err.message}`;
            feedback.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit Resource`;
        }
    },

    toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
};
```

---

## Step 7: Security, Service Worker & PWA Considerations

### 7.1 Service Worker Cache Exclusions
Update [`sw.js`](file:///d:/GitHub/%5BoU1TS%5D/b1t-Acad/sw.js) to ensure dynamic Google API calls are never stale-cached:
```javascript
// Inside sw.js fetch listener
if (
  url.origin.includes('googleapis.com') ||
  url.origin.includes('accounts.google.com') ||
  url.origin.includes('script.google.com') ||
  url.origin.includes('script.googleusercontent.com')
) {
  // Always go direct to network for Auth & Drive/Form APIs
  return fetch(event.request);
}
```

### 7.2 API Key Restrictions & Secret Management
- **Never store Client Secrets in front-end code**: OAuth 2.0 Web Client IDs are public identifiers and safe in client-side code; client secrets must NEVER be used on static hosting.
- **Enforce Referrer Restrictions**: In the GCP Console, bind your API key strictly to your live deployment URLs and localhost.
- **OAuth Token Storage**: Store auth tokens in `sessionStorage` or keep them in-memory via GIS. When the tab closes, auth state clears automatically for shared computer security.

---

## Step 8: Verification, Testing & Troubleshooting

| Test Case | Procedure | Expected Result |
| :--- | :--- | :--- |
| **Unauthenticated Drive Click** | Click any course Google Drive link while logged out. | Prevent navigation; trigger sleek "Student Login Required" modal. |
| **Google Sign-In Flow** | Click "Sign In with Google", complete prompt. | Login modal dismisses, top-nav reflects user profile, lock icons unlock. |
| **In-Website Drive Preview** | Click a Drive file link when logged in. | Modal launches with responsive iframe rendering the PDF/doc without leaving portal. |
| **Drive Folder Explorer** | Click a Drive folder link when logged in. | Drive API v3 queries parent folder, rendering files and folders in a glassmorphic explorer. |
| **Custom Form Submission** | Complete form, select category, upload 2MB sample PDF, click Submit. | Loading spinner appears; file uploads to Google Drive folder; row is appended in Google Sheet; success banner displays. |
| **Offline / PWA Handling** | Disconnect Wi-Fi and attempt submission. | Form presents clear offline notice without crashing; cached site shell remains responsive. |

---
*Guide maintained for b1t-Acad / oU1TS Portal.*
