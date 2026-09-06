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
    const swPath = location.pathname.includes('/examples/') ? '../../sw.js' : './sw.js';
    navigator.serviceWorker.register(swPath)
      .then(reg => {
        reg.update();
        console.log('Trip Planner ServiceWorker registered with scope:', reg.scope);
      })
      .catch(err => console.log('Trip Planner ServiceWorker registration notice:', err.message || err));
  });
}

/* ═══════════════════════════════════════════════════
   PLAN MODE — View Swap Logic
   ═══════════════════════════════════════════════════
   Checks if the loaded data/config.js has meta.isCustomPlan === true.
   If yes  → hides #portal-landing, reveals #trip-onepager, runs renderAll().
   If no   → stays on the hub landing page, no render pipeline needed.
   ======================================================= */

/**
 * Updates the nav bar for plan mode.
 * Adds body.plan-mode so CSS swaps hub-link vs plan-link visibility.
 * Updates the nav logo text to the trip title from TRIP_CONFIG.
 * @param {object} config - window.TRIP_CONFIG
 */
function updateNavForPlanMode(config) {
  document.body.classList.add('plan-mode');

  // Update nav logo to show the trip title
  const navLogo = document.querySelector('.nav-logo, .nav-brand, a.nav-logo');
  if (navLogo && config && config.trip && config.trip.title) {
    const primaryCode = (config.languages && config.languages.primary) ? config.languages.primary.code : 'en';
    const title = (typeof config.trip.title === 'string') ? config.trip.title
      : (config.trip.title[primaryCode] || Object.values(config.trip.title)[0] || 'Trip Planner');
    const logoSpan = navLogo.querySelector('span:last-child');
    if (logoSpan) logoSpan.textContent = title;
  }

  // Swap aria-hidden on the two panels
  const portal = document.getElementById('portal-landing');
  const onepager = document.getElementById('trip-onepager');
  if (portal) {
    portal.style.display = 'none';
    portal.setAttribute('aria-hidden', 'true');
  }
  if (onepager) {
    onepager.removeAttribute('aria-hidden');
    onepager.style.removeProperty('display'); // reveal (opacity:0 from CSS)
    // Use rAF so browser paints once before adding .plan-visible → triggers CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onepager.classList.add('plan-visible');
      });
    });
  }
}

// Master Initialization — works both on DOMContentLoaded and when dynamically injected
// (In plan mode, script.js is loaded after DOMContentLoaded has already fired,
//  so we run init immediately if the DOM is already ready.)
function tripPlannerInit() {
  try {
    // ── Detect plan mode ──────────────────────────────────────────
    // In root index.html: if meta.isCustomPlan is true, AI-generated plan is present.
    // In standalone/example plans: #portal-landing does not exist, so it is always a direct plan page.
    const isDirectPlanPage = !document.getElementById('portal-landing');
    const hasPlan = isDirectPlanPage || (window.TRIP_CONFIG
      && window.TRIP_CONFIG.meta
      && window.TRIP_CONFIG.meta.isCustomPlan === true);

    if (!hasPlan) {
      // ── HUB MODE ──────────────────────────────────────────────
      // Stay on the landing page. No render pipeline needed.
      // Portal-specific scripts (lang, theme) are inlined in index.html.
      console.log('Trip Planner: Hub mode — no custom plan detected.');
      return;
    }

    // ── PLAN MODE ────────────────────────────────────────────────
    console.log('Trip Planner: Plan mode — rendering custom itinerary.');

    // Swap views: hide hub, reveal one-pager with fade-in
    updateNavForPlanMode(window.TRIP_CONFIG);

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

    // 9. Mark Active Today Schedule Pill
    if (typeof initTodayPill === 'function') initTodayPill();

    // 10. Initialize Scroll Progress Tracker & Active Navigation
    if (typeof initProgressTracker === 'function') initProgressTracker();

    // 11. Initialize Itinerary Touch Swipe Gestures (Mobile)
    if (typeof initItinerarySwipe === 'function') initItinerarySwipe();

    // 12. Initialize Maps (Lazy Loader or Direct)
    if (typeof initMapLibreLazyLoader === 'function') {
      initMapLibreLazyLoader();
    } else if (typeof initRouteMap === 'function') {
      setTimeout(() => {
        initRouteMap();
      }, 200);
    }

    // 13. Auto-open Day 1 mini-map if open
    const firstDayCard = document.querySelector('.day-card.open');
    if (firstDayCard && typeof initDayMiniMap === 'function') {
      setTimeout(() => {
        initDayMiniMap(firstDayCard.id);
      }, 400);
    }
  } catch (err) {
    console.error('Error during Trip Planner initialization:', err);
  }
}

// Run immediately if DOM is already loaded (dynamic injection in plan mode),
// otherwise wait for DOMContentLoaded (direct script tag in example pages).
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tripPlannerInit);
} else {
  tripPlannerInit();
}
