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

/** Listen to theme changes across all map instances */
window.addEventListener('themechange', (e) => {
  const s = e.detail.theme === 'dark' ? STYLE_DARK : STYLE_LIGHT;
  if (_routeMap) _routeMap.setStyle(s);
  Object.values(_dayMaps).forEach(m => m.setStyle(s));
});

/** Listen to language changes to update marker popups */
window.addEventListener('langchange', (e) => {
  const isZh = (e.detail.lang === 'secondary' || e.detail.lang === 'zh' || e.detail.lang === 'zh-hk');

  // Update Route Map Popups
  _routeMapRefs.forEach(({ popup, stop, index }) => {
    let nameTxt = isZh
      ? (stop.nameZh || (stop.name && stop.name.zh) || stop.nameNative || stop.nameEn || `第 ${index + 1} 站`)
      : (stop.nameEn || stop.nameNative || (stop.name && stop.name.en) || `Stop ${index + 1}`);

    let descTxt = isZh
      ? ((stop.desc && (stop.desc.zh || stop.desc.en)) || (stop.name && stop.name.zh) || stop.nameRomaji || '')
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
        const txt = isZh ? (pObj.zh || pObj.en || pObj) : (pObj.en || pObj);
        popup.setHTML(`<strong>${txt}</strong>`);
      }
    });
  });
});

/* ═══════════════════════════════════════════════════
   1. OVERVIEW ROUTE MAP
   ═══════════════════════════════════════════════════ */
function initRouteMap() {
  const mapEl = document.getElementById('route-map') || document.getElementById('main-map');
  if (!mapEl || typeof maplibregl === 'undefined') return;

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

      const isZh = document.body.classList.contains('lang-secondary') || document.body.classList.contains('lang-zh');

      let nameTxt = isZh
        ? (stop.nameZh || (stop.name && stop.name.zh) || stop.nameNative || stop.nameEn || `第 ${index + 1} 站`)
        : (stop.nameEn || stop.nameNative || (stop.name && stop.name.en) || `Stop ${index + 1}`);

      let descTxt = isZh
        ? ((stop.desc && (stop.desc.zh || stop.desc.en)) || (stop.name && stop.name.zh) || stop.nameRomaji || '')
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
  if (_dayMaps[dayId] || typeof maplibregl === 'undefined') return;

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

      const isZh = document.body.classList.contains('lang-secondary') || document.body.classList.contains('lang-zh');
      const labelTxt = pt.label ? (isZh ? (pt.label.zh || pt.label.en) : (pt.label.en || pt.label)) : `Point ${idx + 1}`;

      const popup = new maplibregl.Popup({ offset: 14 }).setHTML(`<strong>${labelTxt}</strong>`);

      new maplibregl.Marker({ element: el })
        .setLngLat([pt.lng, pt.lat])
        .setPopup(popup)
        .addTo(map);

      _dayMarkers[dayId].push({ popup, point: pt });
    });
  });
}
