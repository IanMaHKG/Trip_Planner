/**
 * @file script.js
 * @description APPLICATION BOOTSTRAP — Trip Planner template.
 * Orchestrates initialization of all modules, registers Service Worker for PWA,
 * and sets up global handlers.
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
