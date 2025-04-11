


// ------------------------------------------------------
// ------------------------------------------------------

const CACHE_NAME = "offline-cache-v1";  // Update version to force updates


// ------------------------------------------------------
// ------------------------------------------------------

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/page-depth-01/General-Info.html",
    "/page-depth-01/Blog.html",
    "/page-depth-01/CP-aux.html",
    "/page-depth-01/Curated-Resources.html",
    "/page-depth-01/General-Info.html",
    "/page-depth-01/References.html", 
    "/page-depth-01/Tutorials.html", 
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
    "/page-depth-01/[mod]Faculty-Routine-Ramadan.pdf",
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

];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files...");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Serve from cache when offline, but check online first
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone()); // Update cache
                    return response;
                });
            })
            .catch(() => caches.match(event.request)) // Use cache if offline
    );
});

// Activate Service Worker and Remove Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});
