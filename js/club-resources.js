/**
 * Club Resources & Wings Modal Controller
 * b1t Academics - Extracurricular Activities (ECA)
 */

document.addEventListener('DOMContentLoaded', () => {
    const clubButtonsList = document.getElementById('club-buttons-list');
    const modal = document.getElementById('club-wings-modal');
    const closeBtn = document.getElementById('close-club-wings-modal');

    if (!clubButtonsList || typeof clubsData === 'undefined') return;

    // 1. Populate Club Buttons in ECA Section
    const clubKeys = Object.keys(clubsData);
    clubButtonsList.innerHTML = clubKeys.map(deptKey => {
        const club = clubsData[deptKey];
        return `
            <li>
                <button type="button" class="resource-link club-btn-trigger" data-dept="${deptKey}" 
                    style="cursor: pointer; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fa-solid ${club.icon}" style="color: var(--accent-color);"></i>
                    <span>${club.club_name}</span>
                </button>
            </li>
        `;
    }).join('');

    // 2. Open Modal Handler
    function openClubModal(deptKey) {
        const club = clubsData[deptKey];
        if (!club || !modal) return;

        // Header
        const nameEl = document.getElementById('club-modal-name');
        const deptEl = document.getElementById('club-modal-dept');
        const iconEl = document.getElementById('club-modal-icon');
        const descEl = document.getElementById('club-modal-desc');
        const driveLinkEl = document.getElementById('club-modal-main-drive');
        const wingsListEl = document.getElementById('club-modal-wings-list');

        if (nameEl) nameEl.textContent = club.club_name;
        if (deptEl) deptEl.textContent = club.club_full_name || club.dept_name;
        if (iconEl) {
            iconEl.className = `fa-solid ${club.icon}`;
        }
        if (descEl) descEl.textContent = club.description || 'Departmental club resources and subsidiary wings.';

        // Main drive link (fall back to departmentsData.club_res if present)
        let mainDrive = club.club_drive;
        if (!mainDrive && typeof departmentsData !== 'undefined' && departmentsData[deptKey] && departmentsData[deptKey].club_res) {
            mainDrive = departmentsData[deptKey].club_res;
        }

        if (driveLinkEl) {
            if (mainDrive) {
                driveLinkEl.href = mainDrive;
                driveLinkEl.style.display = 'inline-flex';
            } else {
                driveLinkEl.style.display = 'none';
            }
        }

        // Populate Wings List
        if (wingsListEl) {
            if (club.wings && club.wings.length > 0) {
                wingsListEl.innerHTML = club.wings.map(wing => `
                    <div class="wing-card" style="background-color: var(--secondary-color); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px 14px; transition: transform 0.2s, border-color 0.2s;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 6px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid ${wing.icon}" style="color: var(--accent-color); font-size: 1.1rem;"></i>
                                <span style="font-weight: 600; color: var(--text-color); font-size: 0.95rem;">${wing.name}</span>
                            </div>
                            <span style="font-size: 0.75rem; background: rgba(0, 123, 255, 0.15); color: var(--accent-color); padding: 2px 8px; border-radius: 4px; white-space: nowrap;">
                                ${wing.short_name}
                            </span>
                        </div>
                        <p style="margin: 0 0 10px 0; font-size: 0.85rem; color: var(--text-content); line-height: 1.45;">
                            ${wing.description}
                        </p>
                        <div style="display: flex; justify-content: flex-end;">
                            ${wing.drive_link ? `
                                <a href="${wing.drive_link}" target="_blank" 
                                    style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; background: var(--primary-color); border: 1px solid var(--border-color); color: var(--text-color); padding: 5px 10px; border-radius: 6px; text-decoration: none; transition: background 0.2s, border-color 0.2s;">
                                    <i class="fa-brands fa-google-drive" style="color: #34a853;"></i> Open Wing Folder
                                </a>
                            ` : `
                                <span style="font-size: 0.78rem; color: #777; font-style: italic;">Drive folder coming soon</span>
                            `}
                        </div>
                    </div>
                `).join('');
            } else {
                wingsListEl.innerHTML = `
                    <p style="font-size: 0.85rem; color: var(--text-content); text-align: center; margin: 1rem 0;">
                        No subsidiary wings currently cataloged for this club.
                    </p>
                `;
            }
        }

        // Show Modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // 3. Close Modal Handler
    function closeClubModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Attach click listeners to club buttons
    clubButtonsList.addEventListener('click', (e) => {
        const btn = e.target.closest('.club-btn-trigger');
        if (btn) {
            const deptKey = btn.getAttribute('data-dept');
            if (deptKey) openClubModal(deptKey);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeClubModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeClubModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeClubModal();
        }
    });

    // 4. Mobile Tooltip Tap Toggle for Interests Table
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.row-desc-tooltip-trigger');
        document.querySelectorAll('.row-desc-tooltip-trigger.active').forEach(el => {
            if (el !== trigger) el.classList.remove('active');
        });
        if (trigger) {
            trigger.classList.toggle('active');
            e.stopPropagation();
        }
    });
});
