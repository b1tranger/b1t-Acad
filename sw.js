// Service Worker for b1t Academics PWA
const CACHE_NAME = 'b1t-acad-cache-v2';

// Install — minimal pre-caching, rely on network-first for freshness
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch — network-first strategy to avoid stale content
self.addEventListener('fetch', (event) => {
    // Only cache same-origin GET requests
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Clone and cache successful responses
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Fallback to cache when offline
                return caches.match(event.request);
            })
    );
});

// Notification click — open or focus submission.html with recent panel
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const targetUrl = new URL('/submission.html?showRecent=true', self.location.origin).href;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // If a submission page is already open, focus it and navigate
            for (const client of windowClients) {
                if (client.url.includes('submission.html')) {
                    client.navigate(targetUrl);
                    return client.focus();
                }
            }
            // Otherwise open a new window
            return clients.openWindow(targetUrl);
        })
    );
});
