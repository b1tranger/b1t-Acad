// ============================================
// ANON FILE SHARE MODULE
// Handles the "Anon File Sharing" Modal
// ============================================

const AnonShareManager = {
    UPLOAD_TIMEOUT: 20000,
    NOTES_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkfeqBsTm77yzgxPzjwcRNXEzTwjwfY-boa81xysBvyJFoaWwC0hJS2ORiirEwmdbIHtFpM_44I5UC/pub?output=csv',

    // Column indices for Anon Share Form
    N_COL_TIMESTAMP: 0,
    N_COL_CONTENT: 1,

    init() {
        console.log('Initializing AnonShareManager...');
        this.injectStyles();
        this.setupEventListeners();
    },

    injectStyles() {
        if (!document.getElementById('anon-share-styles')) {
            const style = document.createElement('style');
            style.id = 'anon-share-styles';
            style.innerHTML = `
                /* Anon Modals CSS */
                .anon-modal-overlay {
                  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                  background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 1000000;
                }
                .anon-modal-overlay .modal-content {
                  background: #212529; color: white; width: 90%; max-width: 500px;
                  border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); display: flex; flex-direction: column; margin: auto;
                }
                .anon-modal-overlay .modal-header {
                  display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; border-bottom: 1px solid #333; margin:0;
                }
                .anon-modal-overlay .modal-body {
                  padding: 20px; max-height: 70vh; overflow-y: auto;
                }
                .anon-modal-overlay .modal-footer {
                  padding: 15px 20px; border-top: 1px solid #333; display: flex; align-items: center;
                }
                .anon-recent-item {
                  background: #2a2d32; border-radius: 6px; padding: 12px; margin-bottom: 10px; border: 1px solid #444;
                }
                .anon-recent-header {
                  display: flex; justify-content: space-between; margin-bottom: 5px; color: #64b5f6; font-weight: bold;
                }
                .anon-recent-details {
                  font-size: 0.9rem; color: #ccc; margin-bottom: 5px; word-break: break-word; white-space: pre-wrap;
                  display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;
                }
                .anon-recent-badge {
                  background: #333; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; color: #fff;
                }
                .anon-recent-dept {
                  font-size: 0.75rem; color: #888;
                }

                /* PDF Sliding Modal CSS */
                .pdf-anon-modal {
                  position: fixed; bottom: 0; left: 0; width: 100%; height: 100%;
                  background: rgba(0,0,0,0.5); display: flex; align-items: flex-end; justify-content: center;
                  z-index: 1000001; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
                }
                .pdf-anon-modal.show {
                  opacity: 1; pointer-events: auto;
                }
                .pdf-modal-content {
                  background: #212529; width: 100%; max-width: 800px; height: 75vh;
                  border-radius: 12px 12px 0 0; display: flex; flex-direction: column-reverse;
                  transform: translateY(100%); transition: transform 0.3s ease;
                  box-shadow: 0 -4px 15px rgba(0,0,0,0.5);
                }
                .pdf-anon-modal.show .pdf-modal-content {
                  transform: translateY(0);
                }
                .pdf-modal-header {
                  display: flex; justify-content: space-between; align-items: center; padding: 15px 20px;
                  border-bottom: 1px solid #333; color: white;
                }
                .pdf-modal-body {
                  flex: 1; overflow: hidden; background: #fff; border-radius: 0;
                }
            `;
            document.head.appendChild(style);
        }
    },

    setupEventListeners() {
        // Trigger modal opening from the donate section
        const anonBtn = document.getElementById('btn-anon-share');
        if (anonBtn) {
            anonBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openRecentModal();
            });
        }

        // Close Modals
        const closeRecentBtn = document.getElementById('close-anon-recent-modal');
        const closeEditorBtn = document.getElementById('close-anon-editor-modal');
        const modalOverlays = document.querySelectorAll('.anon-modal-overlay');

        if (closeRecentBtn) closeRecentBtn.addEventListener('click', () => this.closeAllModals());
        if (closeEditorBtn) closeEditorBtn.addEventListener('click', () => {
            document.getElementById('anon-editor-modal').style.display = 'none';
            document.getElementById('anon-recent-modal').style.display = 'flex'; // Go back
        });

        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeAllModals();
            });
        });

        // PDF Guide Modal Events
        const openPdfBtn = document.getElementById('open-guide-pdf');
        const pdfModal = document.getElementById('pdf-preview-modal');
        const closePdfBtn = document.getElementById('close-pdf-modal');
        const pdfIframe = document.getElementById('pdf-iframe');
        const pdfDownloadBtn = document.getElementById('pdf-download-btn');

        if (openPdfBtn && pdfModal) {
            openPdfBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const pdfUrl = openPdfBtn.getAttribute('data-pdf');
                
                // Set display flex first so transition works
                pdfModal.style.display = 'flex';
                
                // Need a tiny timeout to allow display change to take effect before opacity transition
                setTimeout(() => {
                    pdfIframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
                    pdfDownloadBtn.href = pdfUrl;
                    pdfModal.classList.add('show');
                }, 10);
            });
            
            const closePdf = () => {
                pdfModal.classList.remove('show');
                setTimeout(() => { 
                    pdfIframe.src = ''; 
                    pdfModal.style.display = 'none'; // hide completely after transition
                }, 300);
            };

            if (closePdfBtn) closePdfBtn.addEventListener('click', closePdf);
            pdfModal.addEventListener('click', (e) => {
                if (e.target === pdfModal) closePdf();
            });
        }

        // "Upload New File" Button
        const uploadNewBtn = document.getElementById('anon-upload-new-btn');
        if (uploadNewBtn) {
            uploadNewBtn.addEventListener('click', () => this.openEditorModal());
        }

        // File Uploader Trigger
        const triggerUploadBtn = document.getElementById('anon-trigger-upload-btn');
        const fileInput = document.getElementById('anon-file-input');

        if (triggerUploadBtn && fileInput) {
            triggerUploadBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }

        // Final Submit to Google Forms
        const shareSubmitBtn = document.getElementById('anon-share-submit-btn');
        if (shareSubmitBtn) {
            shareSubmitBtn.addEventListener('click', () => this.submitToForm());
        }
    },

    openRecentModal() {
        document.getElementById('anon-recent-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.fetchRecentUploads();
    },

    openEditorModal() {
        document.getElementById('anon-recent-modal').style.display = 'none';
        document.getElementById('anon-editor-modal').style.display = 'flex';
    },

    closeAllModals() {
        const overlays = document.querySelectorAll('.anon-modal-overlay');
        overlays.forEach(overlay => overlay.style.display = 'none');
        document.body.style.overflow = '';
    },

    // ──────────────────────────────────────────────
    // RECENT UPLOADS FETCHING
    // ──────────────────────────────────────────────

    parseCSV(str) {
        const arr = [];
        let quote = false;  // 'true' means we're inside a quoted field
        let col = 0, row = 0;

        for (let c = 0; c < str.length; c++) {
            let cc = str[c], nc = str[c + 1];
            arr[row] = arr[row] || [];
            arr[row][col] = arr[row][col] || '';

            if (cc == '"' && quote && nc == '"') {
                arr[row][col] += cc; ++c; continue;
            }
            if (cc == '"') {
                quote = !quote; continue;
            }
            if (cc == ',' && !quote) {
                ++col; continue;
            }
            if (cc == '\r' && nc == '\n' && !quote) {
                ++row; col = 0; ++c; continue;
            }
            if (cc == '\n' && !quote) {
                ++row; col = 0; continue;
            }
            if (cc == '\r' && !quote) {
                ++row; col = 0; continue;
            }
            arr[row][col] += cc;
        }
        return arr;
    },

    async fetchRecentUploads() {
        const listContainer = document.getElementById('anon-recent-list');
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #64b5f6;"></i>
                <p style="margin-top: 1rem; color: #a0a0a0;">Loading recent community uploads...</p>
            </div>
        `;

        try {
            const url = `${this.NOTES_CSV_URL}&_=${Date.now()}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error('Network response was not ok');
            const documentText = await response.text();
            const rows = this.parseCSV(documentText);

            if (rows.length <= 1) { // Only header or empty
                listContainer.innerHTML = '<p style="text-align:center; color:#a0a0a0; padding:2rem;">No uploads found or error loading.</p>';
                return;
            }

            const submissions = [];

            // Skip header (row 0)
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (!row || row.length < 2) continue; // Malformed row

                const contentRaw = String(row[this.N_COL_CONTENT] || '').trim();
                if (!contentRaw || contentRaw === '') continue;

                // Timestamp string parsing (e.g. "3/4/2026 13:41:41")
                const tsStr = String(row[this.N_COL_TIMESTAMP] || '').trim();
                let timestampVal = 0;
                if (tsStr) {
                    const parsedTs = Date.parse(tsStr);
                    if (!isNaN(parsedTs)) timestampVal = parsedTs;
                }

                let fileCount = 0;
                const matches = contentRaw.match(/https?:\/\/[^\s,)]+/g);
                if (matches) fileCount = matches.length;

                submissions.push({
                    name: 'Anonymous user',
                    deptBatch: '',
                    details: contentRaw,
                    fileCount,
                    timestamp: timestampVal
                });
            }

            // Sort newest first
            submissions.sort((a, b) => b.timestamp - a.timestamp);
            const recent10 = submissions.slice(0, 10);

            if (recent10.length === 0) {
                listContainer.innerHTML = '<p style="text-align:center; color:#a0a0a0; padding:2rem;">No submissions yet. Be the first!</p>';
                return;
            }

            // Render
            listContainer.innerHTML = recent10.map(item => `
                <div class="anon-recent-item">
                    <div class="anon-recent-header">
                        <span class="anon-recent-name"><i class="fas fa-user-circle"></i> ${this.escapeHtml(item.name)}</span>
                        ${item.fileCount > 0 ? `<span class="anon-recent-badge"><i class="fas fa-paperclip"></i> ${item.fileCount} File(s)</span>` : ''}
                    </div>
                    ${item.details ? `<p class="anon-recent-details">${this.linkify(this.escapeHtml(item.details))}</p>` : ''}
                    ${item.deptBatch ? `<span class="anon-recent-dept">${this.escapeHtml(item.deptBatch)}</span>` : ''}
                </div>
            `).join('');

        } catch (error) {
            console.error('Error fetching anon uploads:', error);
            listContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ffb74d;"></i>
                    <p style="margin-top: 1rem; color: #a0a0a0;">Failed to load recent uploads.</p>
                </div>
            `;
        }
    },

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    linkify(text) {
        if (!text) return '';

        // 1. Match Markdown links [Title](http(s)://...)
        const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        let html = text.replace(mdLinkRegex, (match, titleText, urlText) => {
            let shortTitle = titleText;

            // Truncate based on terms or length
            const words = shortTitle.split(/\s+/);
            if (words.length > 4) {
                shortTitle = words.slice(0, 4).join(' ') + '...';
            } else if (shortTitle.length > 30) {
                shortTitle = shortTitle.substring(0, 30) + '...';
            }

            return `<a href="${urlText.replace(/"/g, '&quot;')}" target="_blank" style="color: #64b5f6; text-decoration: underline;"><i class="fas fa-link"></i> ${shortTitle}</a>`;
        });

        // 2. Match lone URLs that haven't been wrapped in <a> yet
        const urlRegex = /(<a\s+[^>]*>.*?<\/a>)|(https?:\/\/[^\s<)]+)/g;
        html = html.replace(urlRegex, (match, aTag, loneUrl) => {
            if (aTag) return aTag; // skip existing links

            let displayUrl = loneUrl;
            if (displayUrl.length > 35) {
                displayUrl = displayUrl.substring(0, 35) + '...';
            }
            return `<a href="${loneUrl.replace(/"/g, '&quot;')}" target="_blank" style="color: #64b5f6; text-decoration: underline;"><i class="fas fa-link"></i> ${displayUrl}</a>`;
        });

        return html;
    },

    // ──────────────────────────────────────────────
    // FILE UPLOAD PROCESS
    // ──────────────────────────────────────────────

    showMessage(msg, type) {
        const errorContainer = document.getElementById('anon-upload-error');
        if (!errorContainer) return;

        errorContainer.textContent = msg;
        errorContainer.style.display = 'block';

        if (type === 'success') {
            errorContainer.style.color = '#81c784';
            errorContainer.style.background = 'rgba(129, 199, 132, 0.1)';
        } else {
            errorContainer.style.color = '#ffb74d';
            errorContainer.style.background = 'rgba(255, 183, 77, 0.1)';
        }

        // Hide after 6 seconds
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 6000);
    },

    async handleFileSelect(event) {
        let file = event.target.files[0];
        if (!file) return;

        const maxSize = 200 * 1024 * 1024; // 200MB
        if (file.size > maxSize) {
            this.showMessage('File is too large. Maximum size is 200MB.', 'error');
            return;
        }

        const uploadBtn = document.getElementById('anon-trigger-upload-btn');
        const fallback = document.getElementById('anon-fileio-fallback');

        const originalText = uploadBtn.innerHTML;
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        uploadBtn.disabled = true;
        uploadBtn.style.opacity = '0.7';
        if (fallback) fallback.style.display = 'none';

        try {
            const result = await this.uploadWithFallback(file);

            // Insert link
            const textarea = document.getElementById('anon-textarea');
            const markdownLink = `\n[${file.name}](${result.url})\n`;

            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const textBefore = textarea.value.substring(0, startPos);
            const textAfter = textarea.value.substring(endPos);

            textarea.value = textBefore + markdownLink + textAfter;

            let message = `File uploaded successfully via ${result.provider}!`;
            this.showMessage(message, 'success');
        } catch (error) {
            console.error('Upload error:', error);
            this.showMessage('Failed to upload file. See fallback below.', 'error');
            if (fallback) fallback.style.display = 'flex';
        } finally {
            uploadBtn.innerHTML = originalText;
            uploadBtn.disabled = false;
            uploadBtn.style.opacity = '1';
            event.target.value = '';
        }
    },

    async uploadWithFallback(file) {
        const providers = [
            { name: 'Catbox', method: () => this.uploadToCatbox(file), maxSize: 200 * 1024 * 1024 },
            { name: 'Tmpfiles', method: () => this.uploadToTmpfiles(file), maxSize: 100 * 1024 * 1024 }
        ];

        let lastError = null;

        for (const provider of providers) {
            if (file.size > provider.maxSize) continue;

            try {
                const url = await Promise.race([
                    provider.method(),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error(`${provider.name} upload timed out.`)), this.UPLOAD_TIMEOUT)
                    )
                ]);
                return { url, provider: provider.name };
            } catch (error) {
                console.warn(`${provider.name} upload failed:`, error.message);
                lastError = error;
            }
        }
        throw new Error(lastError?.message || 'All automated upload providers failed');
    },

    async uploadToTmpfiles(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('https://tmpfiles.org/api/v1/upload', { method: 'POST', body: formData });
        if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
        const data = await response.json();
        if (data.status !== 'success' || !data.data || !data.data.url) throw new Error('Invalid response from Tmpfiles');
        return data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
    },

    async uploadToCatbox(file) {
        const formData = new FormData();
        formData.append('reqtype', 'fileupload');
        formData.append('fileToUpload', file);
        const response = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: formData });
        if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
        const url = await response.text();
        if (!url || !url.startsWith('https://files.catbox.moe/')) throw new Error('Invalid response from Catbox');
        return url.trim();
    },

    // ──────────────────────────────────────────────
    // FORM SUBMISSION
    // ──────────────────────────────────────────────

    submitToForm() {
        const textarea = document.getElementById('anon-textarea');
        const content = textarea.value.trim();

        if (!content) {
            this.showMessage('Please write some notes or attach files first.', 'error');
            return;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(content).then(() => {
            // Update button UI temporarily
            const btn = document.getElementById('anon-share-submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied! Redirecting...';
            btn.style.background = '#4CAF50';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = ''; // reset
                // Redirect user to blank form to paste
                window.open('https://forms.gle/zouhKqXSh8MaLFKf7', '_blank');
                this.closeAllModals();
                textarea.value = ''; // clear upon success
            }, 1500);
        }).catch(err => {
            console.error('Clipboard error:', err);
            // Fallback: Just open the form and let them copy manually if API fails
            alert('Your browser blocked clipboard access. Please manually select and copy your text before clicking OK.');
            window.open('https://forms.gle/zouhKqXSh8MaLFKf7', '_blank');
        });
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AnonShareManager.init();
});
