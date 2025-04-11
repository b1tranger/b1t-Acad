// Store the last visited page
localStorage.setItem("lastPage", window.location.href);

// Redirect user to last visited page (if different)
window.onload = function() {
    let lastPage = localStorage.getItem("lastPage");
    console.log("Last visited:", lastPage);
};

// Register Service Worker

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((error) => console.log("Service Worker Registration Failed:", error));
}


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//         .then((reg) => {
//             console.log("Service Worker Registered");

//             // Check for updates
//             reg.addEventListener('updatefound', () => {
//                 const newWorker = reg.installing;
//                 newWorker.addEventListener('statechange', () => {
//                     if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
//                         if (confirm("New version available. Refresh now?")) {
//                             window.location.reload();
//                         }
//                     }
//                 });
//             });
//         })
//         .catch(err => console.log("Service Worker Registration Failed:", err));
// }
