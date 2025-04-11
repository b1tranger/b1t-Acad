// pwa.js - Add this to your main JavaScript file or include as a separate file

// Check if service worker is supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });

  // Handle offline data storage
  window.addEventListener('online', () => {
    console.log('Back online, syncing data...');
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.sync.register('sync-updates');
      })
      .catch(err => console.log('Sync registration failed:', err));
  });
}

// Local Storage data handling
function saveDataLocally(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

function getLocalData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from localStorage:', error);
    return null;
  }
}

// Function to store offline actions for later sync
function storeOfflineAction(action) {
  let offlineActions = getLocalData('offlineData') || [];
  offlineActions.push({
    action,
    timestamp: new Date().toISOString()
  });
  saveDataLocally('offlineData', offlineActions);
}

// Check connection status
function updateOnlineStatus() {
  const status = navigator.onLine ? 'online' : 'offline';
  console.log(`You are now ${status}`);
  document.body.dataset.connectionStatus = status;
  
  // You can update UI elements here
  const statusIndicator = document.getElementById('connection-status');
  if (statusIndicator) {
    statusIndicator.textContent = status;
    statusIndicator.className = status;
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Initial status check
updateOnlineStatus();
