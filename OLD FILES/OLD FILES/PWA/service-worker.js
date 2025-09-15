// sw.js
// This is the Service Worker file, typically placed in the root of your PWA's directory.
// For ou1ts.github.io/Resources/, this file should be at ou1ts.github.io/Resources/sw.js

// Define the name of your cache. Increment the version number (e.g., v1, v2)
// whenever you make changes to the cached assets, forcing the browser to
// fetch new content.
const CACHE_NAME = 'ou1ts-resources-cache-v1';

// List all the URLs of the assets you want to cache.
// These are the files that will be available offline.
// Ensure all paths are relative to the root of your PWA (ou1ts.github.io/Resources/).
const urlsToCache = [
"/",
  "/css/drop-down.css",
  "/css/selector.css",
  "/css/styles.css",
  "/js/archive-link.js",
  "/js/drop-down.js",
  "/js/faq.js",
  "/js/navbar-drop-down.js",
  "/js/Links/drop-link-01.js",
  "/js/Links/drop-link-02.js",
  "/js/Links/drop-link-03.js",
  "/js/Links/drop-link-04.js",
  "/js/Links/drop-link-99.js",

  "/index.html",
  "https://ouits-res.netlify.app/manifest.json",
  "/images/OSL-Logo.png",
  "/images/icons/OSL-Logo-512.png",
  "/images/icons/OSL-Logo-192.png",
  // OFFLINE_URL,

  "/page-depth-01/Blog.html",
  "/page-depth-01/CP-aux.html",
  "/page-depth-01/Curated-Resources.html",
  "/page-depth-01/General-Info.html",
  "/page-depth-01/References.html",
  "/page-depth-01/Tutorials.html",
  "/page-depth-01/[mod]Faculty-Routine-Ramadan.pdf",

  "/page-depth-01/page-depth-02/S01.html",
  "/page-depth-01/page-depth-02/S02.html",
  "/page-depth-01/page-depth-02/S03.html",
  "/page-depth-01/page-depth-02/S04.html",
  "/page-depth-01/page-depth-02/S05.html",
  "/page-depth-01/page-depth-02/S06.html",
  "/page-depth-01/page-depth-02/S08.html",
  "/page-depth-01/page-depth-02/My-guides.html",
  "/page-depth-01/page-depth-02/OSSU.html",
  "/page-depth-01/page-depth-02/Resources-Dump.html",




  // '/Resources/',             // Crucial: Caches the root URL of your PWA
  // '/Resources/index.html',   // Your main HTML file
  // '/Resources/styles.css',   // Assuming you have a CSS file for styling
  // '/Resources/script.js',    // Assuming you have a main JavaScript file
  // '/Resources/images/icon-192x192.png', // PWA icon for smaller screens
  // '/Resources/images/icon-512x512.png'  // PWA icon for larger screens
  // Add any other critical assets here. For example:
  // '/Resources/another-page.html',
  // '/Resources/fonts/myfont.woff2',
  // '/Resources/data/data.json'
];

// The 'install' event is fired when the Service Worker is first installed.
// It's typically used to pre-cache essential assets.
self.addEventListener('install', (event) => {
  // `waitUntil` ensures that the Service Worker isn't installed until the
  // promise passed to it resolves.
  event.waitUntil(
    // Open a cache with the specified CACHE_NAME.
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Opened cache');
        // Add all the URLs from `urlsToCache` to the cache.
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to open cache or add URLs:', error);
      })
  );
});

// The 'fetch' event is fired for every network request made by the page.
// This is where the Service Worker intercepts requests and serves cached content.
self.addEventListener('fetch', (event) => {
  // `respondWith` allows us to intercept the network request and provide a custom response.
  event.respondWith(
    // Try to find a match for the requested URL in the cache.
    caches.match(event.request)
      .then((response) => {
        // If a match is found in the cache, return the cached response.
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        // If no match is found in the cache, fetch the resource from the network.
        console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request)
          .catch((error) => {
            // Handle network errors, e.g., by serving an offline fallback page.
            console.error('Service Worker: Fetch failed:', event.request.url, error);
            // You could return a specific offline page here if you have one.
            // For example: return caches.match('/Resources/offline.html');
          });
      })
  );
});

// The 'activate' event is fired when the Service Worker is activated.
// It's often used to clean up old caches.
self.addEventListener('activate', (event) => {
  // Define a whitelist of cache names to keep.
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    // Get all current cache names.
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // Iterate over all cache names.
        cacheNames.map((cacheName) => {
          // If a cache name is not in the whitelist, delete it.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// --- Service Worker Registration Code (to be placed in your main script.js or index.html) ---

// Check if the browser supports Service Workers.
if ('serviceWorker' in navigator) {
  // Listen for the 'load' event on the window to ensure the page is fully loaded
  // before attempting to register the Service Worker.
  window.addEventListener('load', () => {
    // Register the Service Worker.
    // The first argument is the path to your sw.js file.
    // The `scope` option defines the URL range that the Service Worker controls.
    // For ou1ts.github.io/Resources/, the scope should be '/Resources/'.
    navigator.serviceWorker.register('/Resources/sw.js', { scope: '/Resources/' })
      .then((registration) => {
        // Service Worker registration was successful.
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        // Service Worker registration failed.
        console.log('Service Worker registration failed:', error);
      });
  });
}
