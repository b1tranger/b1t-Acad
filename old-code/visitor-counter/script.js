/**
 * Archived Feature: Delayed Visitor Counter (Text Based)
 * Original Location: index.html:L1135-L1161
 * Date Archived: 17.09.26
 *
 * Description:
 * Loads the visitor hit counter after a 30-second delay to prevent counting
 * visitors who immediately bounce/close the tab. Uses counterapi.dev JSON API.
 */

let counterTimeout = null;
let remainingSeconds = 30;
let countdownInterval = null;

async function fetchVisitorCount() {
  const badge = document.getElementById('visitor-badge');
  const countTextElement = document.getElementById('visitor-count-text');
  const countdownEl = document.getElementById('countdown-timer');

  if (countdownEl) {
    countdownEl.textContent = 'Fetching visits now...';
  }

  if (badge && countTextElement) {
    try {
      // Using free JSON API for visitor counting to display as text
      const response = await fetch("https://api.counterapi.dev/v1/b1tacad/visits/up");
      const data = await response.json();

      // Format number neatly (e.g. 1,234)
      const formattedCount = Number(data.count).toLocaleString();
      countTextElement.innerHTML = `Total Visits: ${formattedCount}`;

      // Fade in the badge
      badge.style.opacity = '1';
      if (countdownEl) {
        countdownEl.textContent = 'Counter loaded successfully.';
      }
    } catch (error) {
      countTextElement.innerHTML = `<span title="Adblockers or browser privacy settings may block the visit counter.">Visits unavailable (Adblock?)</span>`;
      badge.style.opacity = '1';
      if (countdownEl) {
        countdownEl.textContent = 'Fetch failed (Adblock/Network restriction).';
      }
      console.error(
        "Failed to fetch visitor count. This is often caused by adblockers, privacy extensions, or strict browser settings blocking tracking APIs.",
        error
      );
    }
  }
}

// Start original 30-second delay mechanism
function initDelayedCounter() {
  const countdownEl = document.getElementById('countdown-timer');
  
  countdownInterval = setInterval(() => {
    remainingSeconds--;
    if (countdownEl && remainingSeconds > 0) {
      countdownEl.textContent = `Auto-fetching in ${remainingSeconds}s (original 30s delay)...`;
    } else if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  counterTimeout = setTimeout(() => {
    clearInterval(countdownInterval);
    fetchVisitorCount();
  }, 30000);
}

// Immediate fetch bypass for testing purposes
function fetchImmediately() {
  if (counterTimeout) clearTimeout(counterTimeout);
  if (countdownInterval) clearInterval(countdownInterval);
  fetchVisitorCount();
}

document.addEventListener('DOMContentLoaded', () => {
  initDelayedCounter();

  const testBtn = document.getElementById('btn-test-now');
  if (testBtn) {
    testBtn.addEventListener('click', fetchImmediately);
  }
});
