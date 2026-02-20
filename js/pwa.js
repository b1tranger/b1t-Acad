// PWA Registration & Submission Notification System for b1t Academics

// ─── Service Worker Registration ───────────────────────────────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then((reg) => console.log('SW registered, scope:', reg.scope))
            .catch((err) => console.warn('SW registration failed:', err));
    });
}

// ─── Notification Helpers ──────────────────────────────────────────────────
const PWA_STORAGE_KEY = 'pwa_submission_snapshot';

/**
 * Request notification permission with a non-intrusive UI prompt.
 * Called when the user clicks the "Enable Notifications" button.
 */
async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.warn('Notifications not supported');
        return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;

    const result = await Notification.requestPermission();
    return result === 'granted';
}

/**
 * Build a flat list of all submissions from both Questions and Notes Maps.
 * Each entry gets a unique key (type + name + detail hash) for diffing.
 */
function buildSubmissionList(questionsMap, notesMap) {
    const list = [];

    if (questionsMap && questionsMap.size > 0) {
        questionsMap.forEach((submitter) => {
            submitter.submissions.forEach((sub) => {
                list.push({
                    type: 'Question',
                    name: submitter.name,
                    details: sub.details || '',
                    deptBatch: sub.deptBatch || '',
                    key: `q|${submitter.name}|${sub.details || ''}`
                });
            });
        });
    }

    if (notesMap && notesMap.size > 0) {
        notesMap.forEach((submitter) => {
            submitter.submissions.forEach((sub) => {
                list.push({
                    type: 'Note',
                    name: submitter.name,
                    details: sub.details || '',
                    deptBatch: sub.deptBatch || '',
                    key: `n|${submitter.name}|${sub.details || ''}`
                });
            });
        });
    }

    return list;
}

/**
 * Check for new submissions by comparing current data against stored snapshot.
 * If new items found, fire ONE consolidated notification.
 * Called from submission.html after data is fetched.
 */
async function checkForNewSubmissions(questionsMap, notesMap) {
    const currentList = buildSubmissionList(questionsMap, notesMap);
    const storedJson = localStorage.getItem(PWA_STORAGE_KEY);
    const storedKeys = storedJson ? JSON.parse(storedJson) : [];

    const storedKeySet = new Set(storedKeys);
    const newItems = currentList.filter((item) => !storedKeySet.has(item.key));

    // Always update the snapshot
    const allKeys = currentList.map((item) => item.key);
    localStorage.setItem(PWA_STORAGE_KEY, JSON.stringify(allKeys));

    // Store the new items details for the recent panel to pick up
    if (newItems.length > 0) {
        localStorage.setItem('pwa_new_submissions', JSON.stringify(newItems));
    }

    // Don't notify on first ever visit (no prior snapshot)
    if (!storedJson) return;

    if (newItems.length > 0 && Notification.permission === 'granted') {
        const reg = await navigator.serviceWorker?.ready;
        if (reg) {
            reg.showNotification('b1t Academics', {
                body: `${newItems.length} new submission${newItems.length > 1 ? 's' : ''} added!`,
                icon: '/images/icons/OSL-Logo-192.png',
                badge: '/images/icons/OSL-Logo-192.png',
                tag: 'new-submissions', // prevents duplicate notifications
                renotify: true,
                data: { url: '/submission.html?showRecent=true' }
            });
        }
    }
}


// ─── Recent Submissions Panel ──────────────────────────────────────────────

/**
 * Build and show the "Recent Submissions" drawer/panel.
 * Shows the 10 most recent submissions (Questions + Notes merged).
 * Triggered by ?showRecent=true URL param or the 🔔 button.
 */
function showRecentSubmissionsPanel(questionsMap, notesMap) {
    // Remove existing panel if any
    const existing = document.getElementById('recent-submissions-panel');
    if (existing) existing.remove();

    const allSubmissions = buildSubmissionList(questionsMap, notesMap);

    // Take the last 10 (most recent = end of list, since sheets append rows)
    const recent = allSubmissions.slice(-10).reverse();

    if (recent.length === 0) return;

    // Mark new items
    const newItemsJson = localStorage.getItem('pwa_new_submissions');
    const newItems = newItemsJson ? JSON.parse(newItemsJson) : [];
    const newKeySet = new Set(newItems.map(i => i.key));

    // Build panel HTML
    const panel = document.createElement('div');
    panel.id = 'recent-submissions-panel';
    panel.className = 'recent-panel-overlay';
    panel.innerHTML = `
        <div class="recent-panel">
            <div class="recent-panel-header">
                <div class="recent-panel-title">
                    <i class="fa-solid fa-bell"></i>
                    <h3>Recent Submissions</h3>
                </div>
                <button class="recent-panel-close" onclick="closeRecentPanel()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="recent-panel-body">
                ${recent.map((item) => {
        const isNew = newKeySet.has(item.key);
        const typeClass = item.type === 'Question' ? 'recent-type-question' : 'recent-type-note';
        const typeIcon = item.type === 'Question' ? 'fa-circle-question' : 'fa-file-lines';
        const detailPreview = item.details.length > 80
            ? item.details.substring(0, 80) + '...'
            : item.details;

        return `
                        <div class="recent-item ${isNew ? 'recent-item-new' : ''}">
                            <div class="recent-item-header">
                                <span class="recent-type-badge ${typeClass}">
                                    <i class="fa-solid ${typeIcon}"></i>
                                    ${item.type}
                                </span>
                                ${isNew ? '<span class="recent-new-badge">NEW</span>' : ''}
                            </div>
                            <p class="recent-item-text">
                                <strong>${escapeHtmlPwa(item.name)}</strong> just uploaded a ${item.type}: ${escapeHtmlPwa(detailPreview)} !
                            </p>
                            ${item.deptBatch ? `<span class="recent-dept">${escapeHtmlPwa(item.deptBatch)}</span>` : ''}
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // Animate in
    requestAnimationFrame(() => {
        panel.classList.add('active');
    });

    // Close on overlay click
    panel.addEventListener('click', (e) => {
        if (e.target === panel) closeRecentPanel();
    });

    // Close on Escape
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeRecentPanel();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    // Clear the new items flag after showing
    localStorage.removeItem('pwa_new_submissions');
}

function closeRecentPanel() {
    const panel = document.getElementById('recent-submissions-panel');
    if (panel) {
        panel.classList.remove('active');
        setTimeout(() => panel.remove(), 300);
    }
}

function escapeHtmlPwa(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Check URL params for ?showRecent=true and auto-open the panel.
 * Called after data is loaded on submission.html.
 */
function checkShowRecentParam(questionsMap, notesMap) {
    const params = new URLSearchParams(window.location.search);
    if (params.get('showRecent') === 'true') {
        showRecentSubmissionsPanel(questionsMap, notesMap);
        // Clean the URL without reload
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
    }
}


// ─── Inject Panel Styles ───────────────────────────────────────────────────
(function injectRecentPanelStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Recent Submissions Panel Overlay */
        .recent-panel-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 5vh;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        .recent-panel-overlay.active {
            opacity: 1;
            pointer-events: all;
        }

        .recent-panel {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            width: 90%;
            max-width: 520px;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }

        .recent-panel-overlay.active .recent-panel {
            transform: translateY(0);
        }

        .recent-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .recent-panel-title {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            color: #e0e6ed;
        }

        .recent-panel-title i {
            color: #ffb74d;
            font-size: 1.2rem;
        }

        .recent-panel-title h3 {
            font-size: 1.1rem;
            margin: 0;
        }

        .recent-panel-close {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #e0e6ed;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
        }

        .recent-panel-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .recent-panel-body {
            padding: 1rem 1.25rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }

        .recent-item {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.9rem 1rem;
            transition: all 0.2s ease;
        }

        .recent-item:hover {
            background: rgba(255, 255, 255, 0.07);
            border-color: rgba(100, 181, 246, 0.25);
        }

        .recent-item-new {
            border-color: rgba(255, 183, 77, 0.35);
            background: rgba(255, 183, 77, 0.06);
        }

        .recent-item-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .recent-type-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.72rem;
            font-weight: 600;
            padding: 0.2rem 0.65rem;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }

        .recent-type-question {
            background: rgba(255, 183, 77, 0.2);
            color: #ffb74d;
        }

        .recent-type-note {
            background: rgba(129, 199, 132, 0.2);
            color: #81c784;
        }

        .recent-new-badge {
            font-size: 0.65rem;
            font-weight: 700;
            padding: 0.15rem 0.5rem;
            border-radius: 10px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            letter-spacing: 0.05em;
        }

        .recent-item-text {
            color: #c8d0da;
            font-size: 0.88rem;
            line-height: 1.5;
            margin: 0;
        }

        .recent-item-text strong {
            color: #e0e6ed;
        }

        .recent-dept {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            margin-top: 0.4rem;
            font-size: 0.75rem;
            color: #81c784;
            background: rgba(129, 199, 132, 0.1);
            padding: 0.15rem 0.6rem;
            border-radius: 12px;
        }

        /* Notification enable button */
        .notif-enable-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.15rem;
            background: rgba(255, 183, 77, 0.15);
            border: 1px solid rgba(255, 183, 77, 0.3);
            border-radius: 25px;
            color: #ffb74d;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .notif-enable-btn:hover {
            background: rgba(255, 183, 77, 0.25);
            border-color: rgba(255, 183, 77, 0.5);
            transform: translateY(-1px);
        }

        .notif-enable-btn.granted {
            background: rgba(129, 199, 132, 0.15);
            border-color: rgba(129, 199, 132, 0.3);
            color: #81c784;
            cursor: default;
        }

        .notif-enable-btn i {
            font-size: 0.95rem;
        }

        /* Recent bell button */
        .recent-bell-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.15rem;
            background: rgba(100, 181, 246, 0.12);
            border: 1px solid rgba(100, 181, 246, 0.25);
            border-radius: 25px;
            color: #64b5f6;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .recent-bell-btn:hover {
            background: rgba(100, 181, 246, 0.22);
            border-color: rgba(100, 181, 246, 0.45);
            transform: translateY(-1px);
        }

        .notif-actions {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
            align-items: center;
        }

        @media (max-width: 768px) {
            .recent-panel {
                width: 95%;
                max-height: 85vh;
            }

            .recent-panel-body {
                padding: 0.75rem;
            }
        }
    `;
    document.head.appendChild(style);
})();
