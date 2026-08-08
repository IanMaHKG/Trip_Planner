/**
 * @file script.js
 * @description APPLICATION BOOTSTRAP — Trip Planner template.
 *
 * This is the entry point. It:
 *   1. Registers the Service Worker (sw.js) for PWA/offline support.
 *   2. Waits for DOMContentLoaded, then calls each module's init function
 *      in dependency order.
 *
 * Initialization order (matters — do not reorder without reason):
 *   1. initLanguage()       — must run first to set body lang classes before render.
 *   2. initTheme()          — applies palette preset and dark/light mode.
 *   3. renderAll()          — injects all section HTML from data files.
 *   4. initCurrencySelector()— populates budget conversion after renderBudget().
 *   5. initDayFilters()     — builds region tabs after renderItinerary().
 *   6. initNavigation()     — sets up scroll spy and hamburger menu.
 *   7. initHeroParticles()  — cosmetic, safe to run last.
 *   8. initHotelSearch()    — binds hotel form after renderHotels().
 *   9. initRouteMap()       — delayed 200ms for MapLibre container sizing.
 *  10. initDayMiniMap()     — auto-opens Day 1 map if card is pre-opened.
 *
 * Each init call uses a typeof guard so missing modules fail silently
 * (e.g., map.js excluded) rather than crashing the whole app.
 *
 * AGENTS: Wrap new init calls in `if (typeof initXxx === 'function')` guards.
 * Do not add trip-specific logic here — use data/config.js feature flags instead.
 *
 * @see js/ui.js       — initLanguage(), initTheme(), initNavigation().
 * @see js/render.js   — renderAll().
 * @see js/currency.js — initCurrencySelector().
 * @see js/map.js      — initRouteMap(), initDayMiniMap().
 * @see sw.js          — Service Worker (bump CACHE_NAME after code changes).
 * @see AGENTS.md      — Architecture rules.
 */

// Register Service Worker for Offline / PWA Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Trip Planner ServiceWorker registered with scope:', reg.scope))
      .catch(err => console.log('Trip Planner ServiceWorker registration failed:', err));
  });
}

// Master Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // 1. Initialize Language State & Classes
    if (typeof initLanguage === 'function') initLanguage();

    // 2. Initialize Theme (Preset & Dark/Light mode)
    if (typeof initTheme === 'function') initTheme();

    // 3. Render all structured content into HTML Shell
    if (typeof renderAll === 'function') renderAll();

    // 4. Initialize Multi-Currency Converter & Live API
    if (typeof initCurrencySelector === 'function') initCurrencySelector();

    // 5. Initialize Itinerary Day Region Filters
    if (typeof initDayFilters === 'function') initDayFilters();

    // 6. Initialize Sticky Navigation & Scroll Spy
    if (typeof initNavigation === 'function') initNavigation();

    // 7. Generate Hero Floating Particles
    if (typeof initHeroParticles === 'function') initHeroParticles();

    // 8. Initialize Hotel Search Forms
    if (typeof initHotelSearch === 'function') initHotelSearch();

    // 9. Initialize Master Route Map
    if (typeof initRouteMap === 'function') {
      setTimeout(() => {
        initRouteMap();
      }, 200);
    }

    // 10. Auto-open Day 1 mini-map if open
    const firstDayCard = document.querySelector('.day-card.open');
    if (firstDayCard && typeof initDayMiniMap === 'function') {
      setTimeout(() => {
        initDayMiniMap(firstDayCard.id);
      }, 400);
    }
  } catch (err) {
    console.error('Error during Trip Planner initialization:', err);
  }
});
