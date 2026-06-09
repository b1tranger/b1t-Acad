// ============================================
// ACADEMIC CALENDAR PDF VIEWER MODULE
// Uses PDF.js to render the Academic Calendar inline
// Supports zooming, pagination, and downloading
// ============================================

const AcademicCalendarViewer = {
    pdfDoc: null,
    pageNum: 1,
    pageRendering: false,
    pageNumPending: null,
    scale: 1.0,
    canvas: null,
    ctx: null,
    resizeTimeout: null,

    // Academic Calendar URL Configuration
    // Option 1: Remote URL directly from GitHub user-attachments (Default)
    // pdfUrl: 'https://github.com/user-attachments/files/28764200/Academic.Calendar.2026.pdf',

    // Option 2: Local fallback URL (Uncomment to use if CORS/network issues arise)
    pdfUrl: './doc/academic-calendar-2026-IMG_0001.pdf',

    init() {
        console.log('Initializing AcademicCalendarViewer...');
        this.canvas = document.getElementById('pdf-render-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        // Update download links dynamically to match the selected pdfUrl
        const downloadBtn = document.querySelector('#academic-calendar-section .download-btn');
        const errorDownloadBtn = document.querySelector('#academic-calendar-section .download-btn-error');
        if (downloadBtn) downloadBtn.href = this.pdfUrl;
        if (errorDownloadBtn) errorDownloadBtn.href = this.pdfUrl;

        this.setupEventListeners();
        this.loadPDF();
    },

    setupEventListeners() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const zoomFitBtn = document.getElementById('zoom-fit');

        if (prevBtn) prevBtn.addEventListener('click', () => this.onPrevPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.onNextPage());
        if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.onZoomIn());
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.onZoomOut());
        if (zoomFitBtn) zoomFitBtn.addEventListener('click', () => this.onZoomFit());

        // Handle window resize to adjust fit width dynamically
        window.addEventListener('resize', () => {
            if (this.pdfDoc) {
                if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.adjustScaleForWidth();
                }, 200);
            }
        });
    },

    async loadPDF() {
        const loadingSpinner = document.getElementById('pdf-loading-spinner');
        const errorMsg = document.getElementById('pdf-error-message');

        // Check if page is loaded via file:// protocol (local file execution)
        if (window.location.protocol === 'file:') {
            console.log('Local file protocol detected. Falling back to native iframe viewer to bypass CORS.');
            this.useIframeFallback();
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            return;
        }

        try {
            // Configure PDF.js worker
            if (typeof pdfjsLib !== 'undefined') {
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

                // Load document
                this.pdfDoc = await pdfjsLib.getDocument(this.pdfUrl).promise;

                const pageCountElement = document.getElementById('page-count');
                if (pageCountElement) {
                    pageCountElement.textContent = this.pdfDoc.numPages;
                }

                // Adjust scale to fit the initial container width and render
                this.adjustScaleForWidth();

                if (loadingSpinner) loadingSpinner.style.display = 'none';
            } else {
                throw new Error('pdfjsLib is not loaded');
            }
        } catch (error) {
            console.error('Error loading PDF with PDF.js, falling back to native iframe viewer:', error);
            this.useIframeFallback();
            if (loadingSpinner) loadingSpinner.style.display = 'none';
        }
    },

    adjustScaleForWidth() {
        if (!this.pdfDoc) return;

        // Get container width
        const viewportContainer = document.querySelector('.pdf-viewer-viewport');
        if (!viewportContainer) return;
        const containerWidth = viewportContainer.clientWidth - 30; // padding offset

        // Get viewport of current page at scale 1.0 to check its width
        this.pdfDoc.getPage(this.pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.0 });

            // Calculate scale to fit width
            const fitScale = containerWidth / viewport.width;

            // Limit fitScale to reasonable bounds (0.5 to 3.0)
            this.scale = Math.min(Math.max(fitScale, 0.5), 3.0);

            this.updateZoomIndicator();
            this.renderPage(this.pageNum);
        });
    },

    renderPage(num) {
        if (!this.pdfDoc) return;
        this.pageRendering = true;

        // Using promise to fetch the page
        this.pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport({ scale: this.scale });
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: this.ctx,
                viewport: viewport
            };
            const renderTask = page.render(renderContext);

            // Wait for rendering to finish
            renderTask.promise.then(() => {
                this.pageRendering = false;
                this.updateButtonStates();
                if (this.pageNumPending !== null) {
                    // New page rendering is pending
                    this.renderPage(this.pageNumPending);
                    this.pageNumPending = null;
                }
            });
        });

        // Update page counters
        const pageNumElement = document.getElementById('page-num');
        if (pageNumElement) {
            pageNumElement.textContent = num;
        }
    },

    queueRenderPage(num) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num);
        }
    },

    updateButtonStates() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        if (prevBtn) prevBtn.disabled = (this.pageNum <= 1);
        if (nextBtn) nextBtn.disabled = (this.pdfDoc ? this.pageNum >= this.pdfDoc.numPages : true);
    },

    onPrevPage() {
        if (this.pageNum <= 1) return;
        this.pageNum--;
        this.queueRenderPage(this.pageNum);
    },

    onNextPage() {
        if (!this.pdfDoc || this.pageNum >= this.pdfDoc.numPages) return;
        this.pageNum++;
        this.queueRenderPage(this.pageNum);
    },

    onZoomIn() {
        if (this.scale >= 3.0) return;
        this.scale = parseFloat((this.scale + 0.2).toFixed(1));
        this.updateZoomIndicator();
        this.queueRenderPage(this.pageNum);
    },

    onZoomOut() {
        if (this.scale <= 0.5) return;
        this.scale = parseFloat((this.scale - 0.2).toFixed(1));
        this.updateZoomIndicator();
        this.queueRenderPage(this.pageNum);
    },

    onZoomFit() {
        this.adjustScaleForWidth();
    },

    updateZoomIndicator() {
        const zoomPercent = Math.round(this.scale * 100);
        const zoomPercentElement = document.getElementById('zoom-percent');
        if (zoomPercentElement) {
            zoomPercentElement.textContent = `${zoomPercent}%`;
        }
    },

    useIframeFallback() {
        const viewport = document.querySelector('.pdf-viewer-viewport');
        if (!viewport) return;

        // Clear existing canvas wrapper and loading text
        viewport.innerHTML = '';

        // Create fallback iframe
        const iframe = document.createElement('iframe');
        iframe.src = this.pdfUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.minHeight = '550px';
        iframe.setAttribute('allowfullscreen', 'true');

        viewport.appendChild(iframe);

        // Hide dynamic controls that aren't functional with iframe rendering
        const controls = document.querySelector('#academic-calendar-section .calendar-controls');
        if (controls) {
            const pageControls = controls.querySelectorAll('button, .page-indicator, .zoom-indicator, .control-separator');
            pageControls.forEach(el => el.style.display = 'none');
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page containing the calendar canvas
    if (document.getElementById('pdf-render-canvas')) {
        AcademicCalendarViewer.init();
    }
});
