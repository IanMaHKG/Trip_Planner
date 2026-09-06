/**
 * @file map.js
 * @description GLOBAL MAP MODULE — renders interactive vector maps via MapLibre GL JS
 * using free OpenFreeMap tiles (no API key required).
 *
 * Two map types:
 *   1. Overview Route Map (#route-map) — plots all route stops from
 *      SITE_DATA.overview.routeStops[] with a polyline and numbered markers.
 *      Auto-fits bounding box to any GPS coordinates worldwide.
 *   2. Per-Day Mini Maps (#minimap-{dayId}) — lazily initialized when a day
 *      accordion is opened. Plots activity locations from
 *      ITINERARY_DATA[].blocks[].activity.locations[].
 *
 * Theme integration:
 *   - Listens to 'themechange' CustomEvent (dispatched by ui.js) and swaps
 *     map tile styles: Positron (light) ↔ Fiord (dark).
 *
 * Language integration:
 *   - Listens to 'langchange' CustomEvent (dispatched by ui.js) and updates
 *     all open marker popup labels to the new active language.
 *
 * AGENTS: Map marker colors use inline hex strings (not CSS custom properties)
 * because MapLibre GL elements are SVG/Canvas and do not read CSS vars.
 * This is an acceptable exception to the CSS custom properties rule.
 *
 * @see data/site-data.js       — SITE_DATA.overview.routeStops[] for route map.
 * @see data/itinerary-data.js  — ITINERARY_DATA[].blocks[].activity.locations[].
 * @see js/ui.js                — Dispatches 'themechange' and 'langchange' events.
 * @see AGENTS.md               — Architecture rules.
 */

/* ═══════════════════════════════════════════════════
   0. DYNAMIC MAPLIBRE GL LOADER
   ═══════════════════════════════════════════════════
 * MapLibre GL JS (~780 KB) is NOT loaded synchronously in index.html.
 * Instead, this loader watches #map and #food sections with an
 * IntersectionObserver and injects the <script> tag only when those
 * sections are within 200px of the viewport (rootMargin: '200px').
 *
 * All public init functions (initRouteMap, initDayMiniMap, initFoodMap)
 * are guarded by typeof maplibregl === 'undefined' already, so they
 * safely no-op until the bundle is ready and the load callback retries.
 *
 * Fallback: if IntersectionObserver is not supported (very old browsers),
 * the bundle is loaded immediately on DOMContentLoaded.
 */
const MAPLIBRE_JS_URL = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js';

let _maplibreLoaded  = false;
let _maplibreLoading = false;
const _pendingMapInits = [];  // queue of callbacks waiting for maplibregl

/**
 * Dynamically loads the MapLibre GL bundle once, then fires all queued callbacks.
 */
function loadMapLibre(callback) {
  if (_maplibreLoaded) {
    if (callback) callback();
    return;
  }
  if (callback) _pendingMapInits.push(callback);
  if (_maplibreLoading) return;

  _maplibreLoading = true;
  const script = document.createElement('script');
  script.src = MAPLIBRE_JS_URL;
  script.async = true;
  script.onload = () => {
    _maplibreLoaded = true;
    _maplibreLoading = false;
    _pendingMapInits.splice(0).forEach(fn => fn());
  };
  script.onerror = () => {
    _maplibreLoading = false;
    console.warn('[map.js] Failed to load MapLibre GL from', MAPLIBRE_JS_URL);
  };
  document.head.appendChild(script);
}

/**
 * Sets up IntersectionObserver to lazy-load MapLibre when map sections
 * are about to scroll into view. Falls back to eager load if IO not supported.
 */
function initMapLibreLazyLoader() {
  const watchTargets = ['map', 'food', 'itinerary'].map(id => document.getElementById(id)).filter(Boolean);

  if (!watchTargets.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: load immediately
    loadMapLibre(null);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const triggered = entries.some(e => e.isIntersecting);
    if (triggered) {
      observer.disconnect();
      loadMapLibre(null);
    }
  }, { rootMargin: '300px' });

  watchTargets.forEach(el => observer.observe(el));
}

// Kick off lazy loader after DOM is ready (script.js already fires after DOMContentLoaded,
// but map.js may execute before renderAll populates #map — so we use a small delay)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initMapLibreLazyLoader, 100));
} else {
  setTimeout(initMapLibreLazyLoader, 100);
}

const STYLE_LIGHT = 'https://tiles.openfreemap.org/styles/positron';
const STYLE_DARK  = 'https://tiles.openfreemap.org/styles/fiord';

/** Returns the correct OpenFreeMap style URL for the current theme */
function getMapStyle() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? STYLE_DARK
    : STYLE_LIGHT;
}

/** Global map instance registries */
let _routeMap = null;
let _routeMapRefs = [];
const _dayMaps = {};
const _dayMarkers = {};
let _foodMap = null;
let _foodMarkers = [];

/** Category marker colors for food spots */
const FOOD_CATEGORY_COLORS = {
  'street-food': '#D97706',     // warm amber
  'traditional': '#B91C1C',     // rich dark red / brick
  'seafood': '#0284C7',         // ocean blue
  'modern-dining': '#7C3AED',   // vibrant purple
  'cafe-bakery': '#0D9488'      // nordic teal
};

/** Listen to theme changes across all map instances */
window.addEventListener('themechange', (e) => {
  const s = e.detail.theme === 'dark' ? STYLE_DARK : STYLE_LIGHT;
  if (_routeMap) _routeMap.setStyle(s);
  if (_foodMap) _foodMap.setStyle(s);
  Object.values(_dayMaps).forEach(m => m.setStyle(s));
});

/** Listen to language changes to update marker popups */
window.addEventListener('langchange', (e) => {
  const lang = e.detail.lang;
  const config = window.TRIP_CONFIG;
  const primaryCode   = config && config.languages && config.languages.primary   ? config.languages.primary.code : 'en';
  const secondaryCode = config && config.languages && config.languages.secondary ? config.languages.secondary.code : null;
  const tertiaryCode  = config && config.languages && config.languages.tertiary  ? config.languages.tertiary.code  : null;

  // True when any non-primary (Chinese-family) language is active
  const isZh = (lang !== primaryCode);
  // Pick the best zh key: tertiary (zh-cn) when active, else secondary (zh)
  const zhKey = (tertiaryCode && lang === tertiaryCode) ? tertiaryCode : secondaryCode;

  // Update Route Map Popups
  _routeMapRefs.forEach(({ popup, stop, index }) => {
    let nameTxt = isZh
      ? (stop.name && (stop.name[zhKey] || stop.name.zh || stop.name[secondaryCode]) || stop.nameNative || stop.nameEn || `第 ${index + 1} 站`)
      : (stop.nameEn || stop.nameNative || (stop.name && stop.name.en) || `Stop ${index + 1}`);

    let descTxt = isZh
      ? ((stop.desc && (stop.desc[zhKey] || stop.desc.zh || stop.desc.en)) || (stop.name && (stop.name[zhKey] || stop.name.zh)) || stop.nameRomaji || '')
      : (stop.nameRomaji || (stop.desc && (stop.desc.en || stop.desc.zh)) || (stop.name && stop.name.en) || '');

    popup.setHTML(`
      <div style="font-family: inherit; padding: 4px;">
        <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 800;">${nameTxt}</h4>
        ${descTxt ? `<p style="margin: 0; font-size: 12px; color: #475569;">${descTxt}</p>` : ''}
      </div>
    `);
  });

  // Update Day Minimap Popups
  Object.entries(_dayMarkers).forEach(([, refs]) => {
    refs.forEach(({ popup, point }) => {
      if (point.label || point.name) {
        const pObj = point.label || point.name;
        const txt = isZh
          ? (pObj[zhKey] || pObj.zh || pObj[secondaryCode] || pObj.en || pObj)
          : (pObj.en || pObj);
        popup.setHTML(`<strong>${txt}</strong>`);
      }
    });
  });

  // Update Food Map Popups
  _foodMarkers.forEach(({ popup, spot }) => {
    const nameTxt = isZh
      ? (spot.name && (spot.name[zhKey] || spot.name.zh || spot.name[secondaryCode]) || spot.name.en)
      : (spot.name && spot.name.en || '');
    const districtTxt = isZh
      ? (spot.district && (spot.district[zhKey] || spot.district.zh || spot.district[secondaryCode]) || spot.district.en)
      : (spot.district && spot.district.en || '');
    const viewListTxt = (isZh ? '在列表中檢視' : 'View in List');

    popup.setHTML(`
      <div class="food-popup-content">
        <div class="food-popup-header">
          <span class="food-popup-icon">${spot.icon || '🍽️'}</span>
          <h4 class="food-popup-title">${nameTxt}</h4>
        </div>
        <div class="food-popup-meta">
          <span>${districtTxt}</span> • <span>${spot.price || '€€'}</span> • <span>${spot.rating || ''}</span>
        </div>
        <a class="food-popup-btn" href="#spot-${spot.id}" onclick="if (typeof focusFoodCard === 'function') focusFoodCard('${spot.id}');">📍 ${viewListTxt} ➔</a>
      </div>
    `);
  });
});

/* ═══════════════════════════════════════════════════
   1. OVERVIEW ROUTE MAP
   ═══════════════════════════════════════════════════ */
function initRouteMap() {
  if (typeof maplibregl === 'undefined') {
    loadMapLibre(() => initRouteMap());
    return;
  }
  const mapEl = document.getElementById('route-map') || document.getElementById('main-map');
  if (!mapEl) return;

  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA : null;
  if (!data) return;

  let stops = (data.overview && data.overview.routeStops) || (data.routeBoard && data.routeBoard.stops) || data.routeStops || [];
  if (!Array.isArray(stops) || stops.length === 0) return;

  // Filter stops with valid coordinates
  const validStops = stops.filter(s => typeof s.lat === 'number' && typeof s.lng === 'number');
  if (validStops.length === 0) {
    mapEl.style.display = 'none';
    return;
  }

  const coords = validStops.map(s => [s.lng, s.lat]);

  // Calculate auto bounding box
  const bounds = coords.reduce(
    (b, c) => b.extend(c),
    new maplibregl.LngLatBounds(coords[0], coords[0])
  );

  const containerId = mapEl.id;
  const map = new maplibregl.Map({
    container: containerId,
    style: getMapStyle(),
    bounds: bounds,
    fitBoundsOptions: { padding: { top: 60, bottom: 60, left: 60, right: 60 }, maxZoom: 12 },
    scrollZoom: false,
    attributionControl: true
  });

  _routeMap = map;
  _routeMapRefs = [];

  map.on('load', () => {
    // Add Route Polyline
    if (coords.length > 1) {
      map.addSource('route-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coords
          }
        }
      });

      map.addLayer({
        id: 'route-line-layer',
        type: 'line',
        source: 'route-line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#0284C7',
          'line-width': 4,
          'line-opacity': 0.85
        }
      });
    }

    // Add Stop Markers
    validStops.forEach((stop, index) => {
      const el = document.createElement('div');
      el.className = 'custom-map-marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = stop.color || '#075AAA';
      el.style.border = '3px solid #FFFFFF';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.35)';
      el.style.color = '#FFFFFF';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontSize = '11px';
      el.style.fontWeight = '800';
      el.innerText = stop.label || stop.code || (index + 1);

      const isTertiary  = document.body.classList.contains('lang-tertiary') || document.body.classList.contains('lang-zh-cn');
      const isSecondary = document.body.classList.contains('lang-secondary') || document.body.classList.contains('lang-zh');
      const isZh        = isSecondary || isTertiary;
      const zhKey       = isTertiary ? 'zh-cn' : 'zh';

      let nameTxt = isZh
        ? ((stop.name && (stop.name[zhKey] || stop.name.zh)) || stop.nameZh || stop.nameNative || stop.nameEn || `第 ${index + 1} 站`)
        : (stop.nameEn || stop.nameNative || (stop.name && stop.name.en) || `Stop ${index + 1}`);

      let descTxt = isZh
        ? ((stop.desc && (stop.desc[zhKey] || stop.desc.zh || stop.desc.en)) || (stop.name && (stop.name[zhKey] || stop.name.zh)) || stop.nameRomaji || '')
        : (stop.nameRomaji || (stop.desc && (stop.desc.en || stop.desc.zh)) || (stop.name && stop.name.en) || '');

      const popup = new maplibregl.Popup({ offset: 18 }).setHTML(`
        <div style="font-family: inherit; padding: 4px;">
          <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 800;">${nameTxt}</h4>
          ${descTxt ? `<p style="margin: 0; font-size: 12px; color: #475569;">${descTxt}</p>` : ''}
        </div>
      `);

      new maplibregl.Marker({ element: el })
        .setLngLat([stop.lng, stop.lat])
        .setPopup(popup)
        .addTo(map);

      _routeMapRefs.push({ popup, stop, index });
    });
  });
}

/* ═══════════════════════════════════════════════════
   2. PER-DAY MINI MAPS (Lazy Initialized)
   ═══════════════════════════════════════════════════ */
function initDayMiniMap(dayId) {
  if (typeof maplibregl === 'undefined') {
    loadMapLibre(() => initDayMiniMap(dayId));
    return;
  }
  if (_dayMaps[dayId]) return;

  const container = document.getElementById(`minimap-${dayId}`);
  if (!container) return;

  const itinerary = window.ITINERARY_DATA || [];
  const day = itinerary.find(d => d.id === dayId);
  if (!day) return;

  // Extract all GPS locations from this day's blocks
  const points = [];
  (day.blocks || []).forEach(b => {
    if (b.activity && Array.isArray(b.activity.locations)) {
      b.activity.locations.forEach(loc => {
        if (typeof loc.lat === 'number' && typeof loc.lng === 'number') {
          points.push(loc);
        }
      });
    }
  });

  if (points.length === 0) {
    container.style.display = 'none';
    return;
  }

  const coords = points.map(p => [p.lng, p.lat]);
  const bounds = coords.reduce(
    (b, c) => b.extend(c),
    new maplibregl.LngLatBounds(coords[0], coords[0])
  );

  const map = new maplibregl.Map({
    container: `minimap-${dayId}`,
    style: getMapStyle(),
    bounds: bounds,
    fitBoundsOptions: { padding: { top: 40, bottom: 40, left: 40, right: 40 }, maxZoom: 14 },
    scrollZoom: false,
    attributionControl: false
  });

  _dayMaps[dayId] = map;
  _dayMarkers[dayId] = [];

  map.on('load', () => {
    points.forEach((pt, idx) => {
      const el = document.createElement('div');
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#DC2626';
      el.style.border = '2px solid #FFFFFF';
      el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      el.style.color = '#FFFFFF';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontSize = '10px';
      el.style.fontWeight = '800';
      el.innerText = idx + 1;

      const isTertiary  = document.body.classList.contains('lang-tertiary') || document.body.classList.contains('lang-zh-cn');
      const isSecondary = document.body.classList.contains('lang-secondary') || document.body.classList.contains('lang-zh');
      const isZh        = isSecondary || isTertiary;
      const zhKey       = isTertiary ? 'zh-cn' : 'zh';
      const labelTxt    = pt.label ? (isZh ? (pt.label[zhKey] || pt.label.zh || pt.label.en) : (pt.label.en || pt.label)) : `Point ${idx + 1}`;

      const popup = new maplibregl.Popup({ offset: 14 }).setHTML(`<strong>${labelTxt}</strong>`);

      new maplibregl.Marker({ element: el })
        .setLngLat([pt.lng, pt.lat])
        .setPopup(popup)
        .addTo(map);

      _dayMarkers[dayId].push({ popup, point: pt });
    });
  });
}

/* ═══════════════════════════════════════════════════
   3. CULINARY FOOD MAP & FILTERING
   ═══════════════════════════════════════════════════ */

/**
 * Initializes the interactive Food & Restaurant Map (#food-map).
 * Plots all spots from SITE_DATA.food.spots[] with category-coded markers
 * and binds popup / card synchronisation.
 */
function initFoodMap() {
  if (typeof maplibregl === 'undefined') {
    loadMapLibre(() => initFoodMap());
    return;
  }
  const mapEl = document.getElementById('food-map');
  if (!mapEl) return;

  // If already initialized, just resize
  if (_foodMap) {
    _foodMap.resize();
    return;
  }

  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA : null;
  if (!data || !data.food || !Array.isArray(data.food.spots)) return;

  const spots = data.food.spots;
  const validSpots = spots.filter(s => typeof s.lat === 'number' && typeof s.lng === 'number');
  if (validSpots.length === 0) {
    mapEl.style.display = 'none';
    return;
  }

  const coords = validSpots.map(s => [s.lng, s.lat]);
  const bounds = coords.reduce(
    (b, c) => b.extend(c),
    new maplibregl.LngLatBounds(coords[0], coords[0])
  );

  const map = new maplibregl.Map({
    container: 'food-map',
    style: getMapStyle(),
    bounds: bounds,
    fitBoundsOptions: { padding: { top: 50, bottom: 50, left: 50, right: 50 }, maxZoom: 14 },
    scrollZoom: false,
    attributionControl: true
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

  _foodMap = map;
  _foodMarkers = [];

  map.on('load', () => {
    validSpots.forEach((spot) => {
      const el = document.createElement('div');
      el.className = 'food-marker';
      el.dataset.spotId = spot.id;
      el.dataset.category = spot.category;
      el.style.backgroundColor = FOOD_CATEGORY_COLORS[spot.category] || '#0D9488';
      el.innerHTML = `<span style="pointer-events:none;">${spot.icon || '🍽️'}</span>`;

      const isTertiary  = document.body.classList.contains('lang-tertiary') || document.body.classList.contains('lang-zh-cn');
      const isSecondary = document.body.classList.contains('lang-secondary') || document.body.classList.contains('lang-zh');
      const isZh        = isSecondary || isTertiary;
      const zhKey       = isTertiary ? 'zh-cn' : 'zh';

      const nameTxt = isZh
        ? (spot.name && (spot.name[zhKey] || spot.name.zh || spot.name[isSecondary ? 'zh' : 'zh-cn']) || spot.name.en)
        : (spot.name && spot.name.en || '');
      const districtTxt = isZh
        ? (spot.district && (spot.district[zhKey] || spot.district.zh) || spot.district.en)
        : (spot.district && spot.district.en || '');
      const viewListTxt = (isZh ? '在列表中檢視' : 'View in List');

      const popup = new maplibregl.Popup({ offset: 18 }).setHTML(`
        <div class="food-popup-content">
          <div class="food-popup-header">
            <span class="food-popup-icon">${spot.icon || '🍽️'}</span>
            <h4 class="food-popup-title">${nameTxt}</h4>
          </div>
          <div class="food-popup-meta">
            <span>${districtTxt}</span> • <span>${spot.price || '€€'}</span> • <span>${spot.rating || ''}</span>
          </div>
          <a class="food-popup-btn" href="#spot-${spot.id}" onclick="if (typeof focusFoodCard === 'function') focusFoodCard('${spot.id}');">📍 ${viewListTxt} ➔</a>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([spot.lng, spot.lat])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener('click', () => {
        if (typeof focusFoodCard === 'function') {
          focusFoodCard(spot.id);
        }
      });

      _foodMarkers.push({ marker, spot, el, popup });
    });
  });
}

/**
 * Filters visible map markers by food category and adjusts the map view.
 * @param {string} category - 'all' or specific category id.
 */
function filterFoodMap(category) {
  if (!_foodMap || _foodMarkers.length === 0) return;

  const visibleCoords = [];

  _foodMarkers.forEach(({ marker, spot, el }) => {
    const isVisible = (category === 'all' || spot.category === category);
    el.style.display = isVisible ? 'flex' : 'none';
    if (isVisible) {
      visibleCoords.push([spot.lng, spot.lat]);
    }
  });

  if (visibleCoords.length > 0) {
    const newBounds = visibleCoords.reduce(
      (b, c) => b.extend(c),
      new maplibregl.LngLatBounds(visibleCoords[0], visibleCoords[0])
    );
    _foodMap.fitBounds(newBounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      maxZoom: 14,
      duration: 700
    });
  }
}

/**
 * Centers the food map on a spot and opens its popup.
 * @param {string} spotId - Spot identifier.
 */
function focusFoodSpot(spotId) {
  if (!_foodMap || _foodMarkers.length === 0) return;

  const item = _foodMarkers.find(m => m.spot.id === spotId);
  if (!item) return;

  // Smooth-scroll to food map if not currently in view
  const mapContainer = document.querySelector('.food-map-container') || document.getElementById('food-map');
  if (mapContainer) {
    const rect = mapContainer.getBoundingClientRect();
    if (rect.top < 40 || rect.bottom > window.innerHeight) {
      mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  _foodMap.flyTo({
    center: [item.spot.lng, item.spot.lat],
    zoom: 15,
    speed: 1.2,
    curve: 1.42,
    essential: true
  });

  // Ensure marker is visible
  item.el.style.display = 'flex';

  // Toggle/open popup
  if (!item.marker.getPopup().isOpen()) {
    item.marker.togglePopup();
  }
}

// Global exports
if (typeof window !== 'undefined') {
  window.initFoodMap = initFoodMap;
  window.filterFoodMap = filterFoodMap;
  window.focusFoodSpot = focusFoodSpot;
}

