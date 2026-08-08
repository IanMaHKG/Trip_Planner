/**
 * @file sw.js
 * @description SERVICE WORKER — provides offline capability for the Trip Planner.
 *
 * Caching strategy: Cache-First for all static app shell assets (HTML, CSS, JS,
 * data files) with Stale-While-Revalidate background refresh. Network-First
 * for external APIs (open.er-api.com, openfreemap.org tile CDN).
 *
 * AGENTS — IMPORTANT: Bump CACHE_NAME after ANY change to JS, CSS, HTML, or
 * data files so returning users with a cached service worker receive the
 * updated assets. Increment the version number (e.g. v1 → v2). Failing to
 * do this means users may see stale code even after a deployment.
 *
 * @see AGENTS.md — Service Worker & PWA Rules section.
 */

const CACHE_NAME = 'trip-planner-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/favicon.svg',
  './css/palette.css',
  './css/base.css',
  './css/components.css',
  './css/sections.css',
  './css/responsive.css',
  './css/style.css',
  './data/config.js',
  './data/site-data.js',
  './data/itinerary-data.js',
  './js/currency.js',
  './js/map.js',
  './js/render.js',
  './js/ui.js',
  './js/script.js'
];

/* ── Install: Cache App Shell ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: Clean old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

/* ── Fetch: Cache-First for static assets, Network-First for API/Tiles ── */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Allow live API and CDN requests to go to network
  if (url.origin !== location.origin || url.pathname.includes('open.er-api.com') || url.pathname.includes('openfreemap.org') || url.pathname.includes('unpkg.com')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {/* Offline */});
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      });
    })
  );
});
