// service-worker.js with Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Check if Workbox loaded successfully
if (workbox) {
  console.log('Workbox is loaded');
} else {
  console.log('Workbox failed to load');
}

// Force skipWaiting on installation
workbox.core.skipWaiting();
// Take control immediately
workbox.core.clientsClaim();

const CACHE_NAME = 'ouits-res-cache-v1';
const OFFLINE_URL = '/offline.html';

// Cache the offline page on install
workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/css/drop-down.css', revision: '1' },
  { url: '/css/selector.css', revision: '1' },
  { url: '/css/styles.css', revision: '1' },
  { url: '/js/archive-link.js', revision: '1' },
  { url: '/js/drop-down.js', revision: '1' },
  { url: '/js/faq.js', revision: '1' },
  { url: '/js/navbar-drop-down.js', revision: '1' },
  { url: '/js/Links/drop-link-01.js', revision: '1' },
  { url: '/js/Links/drop-link-02.js', revision: '1' },
  { url: '/js/Links/drop-link-03.js', revision: '1' },
  { url: '/js/Links/drop-link-04.js', revision: '1' },
  { url: '/js/Links/drop-link-99.js', revision: '1' },
  { url: '/manifest.webmanifest', revision: '1' },


  { url: '/images/OSL-Logo.png', revision: '1' },
  { url: '/images/icons/OSL-Logo-512.png', revision: '1' },
  { url: '/images/icons/OSL-Logo-192.png', revision: '1' },

  { url: '/page-depth-01/Blog.html', revision: '1' },
  { url: '/page-depth-01/CP-aux.html', revision: '1' },
  { url: '/page-depth-01/Curated-Resources.html', revision: '1' },
  { url: '/page-depth-01/General-Info.html', revision: '1' },
  { url: '/page-depth-01/References.html', revision: '1' },
  { url: '/page-depth-01/Tutorials.html', revision: '1' },
  { url: '/page-depth-01/[mod]Faculty-Routine-Ramadan.pdf', revision: '1' },


  { url: '/page-depth-01/page-depth-02/S01.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/S02.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/S03.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/S04.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/S05.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/S06.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/S07.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/S08.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/My-guides.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/OSSU.html', revision: '1' },
  { url: '/page-depth-01/page-depth-02/Resources-Dump.html', revision: '1' },
  { url: OFFLINE_URL, revision: '1' },
  // Add other important assets here with their revision IDs
]);

//"/",
//   "/css/drop-down.css",
//   "/css/selector.css",
//   "/css/styles.css",
//   "/js/archive-link.js",
//   "/js/drop-down.js",
//   "/js/faq.js",
//   "/js/navbar-drop-down.js",
//   "/js/Links/drop-link-01.js",
//   "/js/Links/drop-link-02.js",
//   "/js/Links/drop-link-03.js",
//   "/js/Links/drop-link-04.js",
//   "/js/Links/drop-link-99.js",

//   "/index.html",
//   "https://ouits-res.netlify.app/manifest.json",
//   "/images/OSL-Logo.png",
//   "/images/icons/OSL-Logo-512.png",
//   "/images/icons/OSL-Logo-192.png",
//   OFFLINE_URL,

//   "/page-depth-01/Blog.html",
//   "/page-depth-01/CP-aux.html",
//   "/page-depth-01/Curated-Resources.html",
//   "/page-depth-01/General-Info.html",
//   "/page-depth-01/References.html",
//   "/page-depth-01/Tutorials.html",
//   "/page-depth-01/[mod]Faculty-Routine-Ramadan.pdf",

//   "/page-depth-01/page-depth-02/S01.html",
//   "/page-depth-01/page-depth-02/S02.html",
//   "/page-depth-01/page-depth-02/S03.html",
//   "/page-depth-01/page-depth-02/S04.html",
//   "/page-depth-01/page-depth-02/S05.html",
//   "/page-depth-01/page-depth-02/S06.html",
//   "/page-depth-01/page-depth-02/S08.html",
//   "/page-depth-01/page-depth-02/My-guides.html",
//   "/page-depth-01/page-depth-02/OSSU.html",
//   "/page-depth-01/page-depth-02/Resources-Dump.html",




// Cache CSS, JS, and Web Worker files with a cache-first strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'style' || 
                   request.destination === 'script' || 
                   request.destination === 'worker',
  new workbox.strategies.CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache images with a cache-first strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache page navigations with a network-first strategy
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
    networkTimeoutSeconds: 3,
    // Show the offline page if network fails
    fallback: ({ event }) => {
      return caches.match(OFFLINE_URL);
    }
  })
);

// Background sync for offline data
workbox.routing.registerRoute(
  new RegExp('/api/.*'),
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.BackgroundSyncPlugin('offlineQueue', {
        maxRetentionTime: 24 * 60 // Retry for 24 Hours (in minutes)
      })
    ]
  }),
  'POST'
);

// Handle sync event for localStorage data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-updates') {
    event.waitUntil(syncData());
  }
});

// Function to sync data from localStorage when online
async function syncData() {
  // Check if there's data in localStorage to sync
  const dataToSync = localStorage.getItem('offlineData');
  if (dataToSync) {
    try {
      // Process and sync your data here
      // For example, you could send it to your server:
      /*
      await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dataToSync
      });
      */
      
      // Then clear the synced data
      localStorage.removeItem('offlineData');
      console.log('Offline data synced successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }
}

// Cache cleanup - Remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== 'static-resources' && 
              cacheName !== 'images' && 
              cacheName !== 'pages') {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});






// // ------------------------------------------------------
// // ------------------------------------------------------









// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
// );
// workbox.routing.registerRoute(
//   ({ request }) => request.destination === 'image',
//   new workbox.strategies.NetworkFirst()
// );










// // ------------------------------------------------------
// // ------------------------------------------------------

// // service-worker.js
// const CACHE_NAME = 'ouits-res-cache-v1'; // Update version to force updates
// const OFFLINE_URL = '/offline-index.html';
// const urlsToCache = [
//   "/",
//   "/css/drop-down.css",
//   "/css/selector.css",
//   "/css/styles.css",
//   "/js/archive-link.js",
//   "/js/drop-down.js",
//   "/js/faq.js",
//   "/js/navbar-drop-down.js",
//   "/js/Links/drop-link-01.js",
//   "/js/Links/drop-link-02.js",
//   "/js/Links/drop-link-03.js",
//   "/js/Links/drop-link-04.js",
//   "/js/Links/drop-link-99.js",

//   "/index.html",
//   "https://ouits-res.netlify.app/manifest.json",
//   "/images/OSL-Logo.png",
//   "/images/icons/OSL-Logo-512.png",
//   "/images/icons/OSL-Logo-192.png",
//   OFFLINE_URL,

//   "/page-depth-01/Blog.html",
//   "/page-depth-01/CP-aux.html",
//   "/page-depth-01/Curated-Resources.html",
//   "/page-depth-01/General-Info.html",
//   "/page-depth-01/References.html",
//   "/page-depth-01/Tutorials.html",
//   "/page-depth-01/[mod]Faculty-Routine-Ramadan.pdf",

//   "/page-depth-01/page-depth-02/S01.html",
//   "/page-depth-01/page-depth-02/S02.html",
//   "/page-depth-01/page-depth-02/S03.html",
//   "/page-depth-01/page-depth-02/S04.html",
//   "/page-depth-01/page-depth-02/S05.html",
//   "/page-depth-01/page-depth-02/S06.html",
//   "/page-depth-01/page-depth-02/S08.html",
//   "/page-depth-01/page-depth-02/My-guides.html",
//   "/page-depth-01/page-depth-02/OSSU.html",
//   "/page-depth-01/page-depth-02/Resources-Dump.html",



// ];

// // Install event - cache key files
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
//   // Force the waiting service worker to become the active service worker
//   self.skipWaiting();
// });

// // Activate event - clean up old caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             console.log('Deleting old cache:', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
//   // Claim any clients immediately
//   self.clients.claim();
// });

// // Fetch event - serve from cache, fallback to network, save new responses to cache
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         // Cache hit - return the response from the cached version
//         if (response) {
//           return response;
//         }

//         // Not in cache - return the result from the live server
//         // and add it to the cache for future use
//         return fetch(event.request)
//           .then((response) => {
//             // Check if we received a valid response
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             // Clone the response
//             const responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then((cache) => {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           })
//           .catch(() => {
//             // If network fails and it's a navigation request, serve the offline page
//             if (event.request.mode === 'navigate') {
//               return caches.match(OFFLINE_URL);
//             }
//           });
//       })
//   );
// });

// // Handle updates when online
// self.addEventListener('sync', (event) => {
//   if (event.tag === 'sync-updates') {
//     event.waitUntil(syncData());
//   }
// });

// // Function to sync data from localStorage when online
// async function syncData() {
//   // Check if there's data in localStorage to sync
//   const dataToSync = localStorage.getItem('offlineData');
//   if (dataToSync) {
//     try {
//       // Process and sync your data here
//       // Then clear the synced data
//       localStorage.removeItem('offlineData');
//     } catch (error) {
//       console.error('Sync failed:', error);
//     }
//   }
// }