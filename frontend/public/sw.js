const CACHE_NAME = "jumbo-print-v1";

// 1. Install Service Worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("✅ Service Worker: Installed");
});

// 2. Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  console.log("✅ Service Worker: Activated");
});

// 3. Background Fetch Support (For Large Files)
self.addEventListener("backgroundfetchsuccess", (event) => {
  const registration = event.registration;
  event.waitUntil(
    registration.matchAll().then(async (records) => {
      console.log("🚀 Background Upload Success:", registration.id);
      // Success Notification
      self.registration.showNotification("Upload Complete!", {
        body: " upload completed.",
        icon: "/vite.svg",
      });
    })
  );
});

self.addEventListener("backgroundfetchfail", (event) => {
  console.error("❌ Background Upload Failed:", event.registration.id);
});

// 4. Push Notifications
self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "/vite.svg",
  });
});
