/**
 * @file render.js
 * @description CORE RENDER ENGINE — Trip Planner template.
 *
 * Reads from three global data objects and injects HTML into the semantic
 * shell placeholders defined in index.html. This file must remain
 * trip-agnostic: no destination names, currency symbols, or language strings
 * may be hardcoded here. All content must flow from the data files.
 *
 * Data dependencies (loaded before this script in index.html):
 *   - window.TRIP_CONFIG     → data/config.js        (languages, theme, party, feature flags)
 *   - window.SITE_DATA       → data/site-data.js     (cards, tips, packing, budget, hotels)
 *   - window.ITINERARY_DATA  → data/itinerary-data.js (day-by-day timeline)
 *
 * Feature flags (TRIP_CONFIG.features.show*):
 *   renderAll() checks each flag before calling individual render functions.
 *   Set a flag to false in config.js to hide a section without touching this file.
 *   A missing flag defaults to true (opt-out, not opt-in).
 *
 * Language system:
 *   - renderBilingualText() emits lang-primary + lang-secondary span wrappers,
 *     plus a specific lang-{code} class. base.css controls visibility for
 *     any language pair, not just English/Chinese.
 *   - Language codes come from TRIP_CONFIG.languages — never hardcoded here.
 *
 * @see data/config.js  — Single source of truth for all trip identity values.
 * @see js/ui.js        — Language switching and theme controllers.
 * @see AGENTS.md       — Architecture and data-driven pattern rules.
 *
 * AGENTS: Do NOT hardcode trip-specific text, city names, dates, or language
 * content in this file. Add new render sections by:
 *   1. Creating a renderXxx() function following the patterns below.
 *   2. Adding a showXxx: true flag in data/config.js features block.
 *   3. Adding the gated call in renderAll().
 *   4. Updating README.md and flagging prompts/trip-planner-prompt.md for review.
 */


/* =======================================================
   HELPERS
   ======================================================= */

/**
 * Extracts the active-language string from a multilingual object.
 * Falls back: secondary lang key -> primary lang key -> first value.
 *
 * @param {string|Object} obj - Plain string or { [langCode]: string } object.
 * @param {string} [fallback=''] - Returned when obj is null/undefined/empty.
 * @returns {string}
 */
function t(obj, fallback = '') {
  if (!obj) return fallback;
  if (typeof obj === 'string') return obj;

  const config = window.TRIP_CONFIG;
  const primaryCode   = config && config.languages && config.languages.primary   ? config.languages.primary.code   : 'en';
  const secondaryCode = config && config.languages && config.languages.secondary ? config.languages.secondary.code : null;
  const isSecondary   = document.body.classList.contains('lang-secondary');

  if (isSecondary && secondaryCode && obj[secondaryCode]) return obj[secondaryCode];
  if (obj[primaryCode]) return obj[primaryCode];
  return Object.values(obj)[0] || fallback;
}

/**
 * Renders a multilingual object as hidden/visible span elements using
 * semantic lang-primary / lang-secondary classes (plus lang-{code} for CSS).
 * Works for any language pair configured in TRIP_CONFIG.languages.
 *
 * AGENTS: Never replace lang-primary/lang-secondary with hardcoded codes
 * (e.g. lang-en). The lang-{code} classes are added ADDITIONALLY for
 * backward-compatible CSS targeting only.
 *
 * @param {string|Object} obj - Plain string or { [langCode]: string } object.
 * @param {string} [className=''] - Extra CSS class added to all spans.
 * @returns {string} HTML with one or two span elements.
 */
function renderBilingualText(obj, className) {
  className = className || '';
  if (!obj) return '';
  if (typeof obj === 'string') {
    return '<span class="lang-primary ' + className + '">' + obj + '</span>';
  }

  const config = window.TRIP_CONFIG;
  const primaryCode   = config && config.languages && config.languages.primary   ? config.languages.primary.code   : 'en';
  const secondaryCode = config && config.languages && config.languages.secondary ? config.languages.secondary.code : null;
  const primaryVal    = obj[primaryCode] || Object.values(obj)[0] || '';

  if (!secondaryCode) {
    return '<span class="lang-primary lang-' + primaryCode + ' ' + className + '">' + primaryVal + '</span>';
  }

  const secondaryVal = obj[secondaryCode] || primaryVal;
  return '<span class="lang-primary lang-' + primaryCode + ' ' + className + '">' + primaryVal + '</span>' +
         '<span class="lang-secondary lang-' + secondaryCode + ' ' + className + '">' + secondaryVal + '</span>';
}


/* =======================================================
   1. RENDER HERO
   ======================================================= */

/**
 * Renders the Hero section: eyebrow, h1 title, subtitle, and badge strip.
 * All content comes from TRIP_CONFIG.trip. When heroBadges is absent,
 * generates neutral fallbacks from config.trip.dates, config.party.size, and
 * config.trip.destination — no hardcoded text in any secondary language.
 *
 * Called by renderAll() when TRIP_CONFIG.features.showOverview !== false.
 */
function renderHero() {
  const config = window.TRIP_CONFIG;
  if (!config || !config.trip) return;

  const trip = config.trip;
  const primaryCode = (config.languages && config.languages.primary) ? config.languages.primary.code : 'en';

  // Eyebrow label (e.g. "🏔️ Europe Adventure")
  const eyebrowEl = document.getElementById('hero-eyebrow-container') || document.getElementById('hero-eyebrow');
  if (eyebrowEl && trip.eyebrow) {
    eyebrowEl.innerHTML = renderBilingualText(trip.eyebrow, 'hero-eyebrow');
  }

  // Main h1 title + year (AGENTS: only one <h1> per page — never add another)
  const titleEl = document.getElementById('hero-title-container') || document.getElementById('hero-title');
  if (titleEl && trip.title) {
    titleEl.innerHTML =
      '<h1 class="hero-title">' +
        '<span class="title-line accent">' + renderBilingualText(trip.title) + '</span>' +
        '<span class="title-line year">' + (trip.year || '') + '</span>' +
      '</h1>';
  }

  // Subtitle (dates + route summary)
  const subEl = document.getElementById('hero-subtitle-container') || document.getElementById('hero-subtitle');
  if (subEl && trip.subtitle) {
    subEl.innerHTML = renderBilingualText(trip.subtitle, 'hero-subtitle');
  }

  // Hero badge strip — should come from config.trip.heroBadges[]
  const badgesEl = document.getElementById('hero-badges-container') || document.getElementById('hero-badges');
  if (badgesEl) {
    var badges = trip.heroBadges;
    if (!badges || !Array.isArray(badges)) {
      // Neutral auto-fallback using config values only (no hardcoded secondary-language text)
      var dateDisplay = (trip.dates && trip.dates.display) ? trip.dates.display : {};
      dateDisplay[primaryCode] = dateDisplay[primaryCode] || 'Dates TBD';
      var destDisplay = trip.destination || {};
      destDisplay[primaryCode] = destDisplay[primaryCode] || 'Multi-Destination';
      var travelerLabel = {};
      travelerLabel[primaryCode] = ((config.party && config.party.size) || 2) + ' Travelers';
      badges = [
        { icon: '📅', text: dateDisplay },
        { icon: '👥', text: travelerLabel },
        { icon: '📍', text: destDisplay }
      ];
    }
    badgesEl.innerHTML = badges.map(function(b) {
      return '<div class="badge"><span>' + (b.icon || '📍') + '</span>' + renderBilingualText(b.text) + '</div>';
    }).join('');
  }
}


/* =======================================================
   2. RENDER OVERVIEW CARDS & ROUTE MILESTONE BOARD
   ======================================================= */

/**
 * Renders three sub-sections:
 *  (a) Overview Cards grid — SITE_DATA.overview.cards[]
 *  (b) Journey Route Milestone Board — SITE_DATA.overview.routeBoard,
 *      styled by TRIP_CONFIG.routeBoardStyle
 *  (c) Optional Trip Profile Grid — TRIP_CONFIG.party (if #profile-grid exists)
 *
 * AGENTS — Transit board style extension rules:
 *   - Add a new else-if branch in the badgeText block below.
 *   - Register the new key in data/config.js comment block.
 *   - Add it to showcase.html and document in README.md.
 *   - NEVER rename or remove an existing key — forks depend on backward compatibility.
 *
 * Called by renderAll() when TRIP_CONFIG.features.showOverview !== false.
 */
function renderOverview() {
  var data = window.SITE_DATA;
  if (!data) return;

  // (a) Overview Cards
  var cardsEl = document.getElementById('overview-cards-container') || document.getElementById('overview-grid');
  var cards = (data.overview && Array.isArray(data.overview.cards))
    ? data.overview.cards
    : (Array.isArray(data.overview) ? data.overview : null);

  if (cardsEl && cards) {
    cardsEl.innerHTML = cards.map(function(c) {
      return '<div class="card overview-card reveal" id="' + (c.id || '') + '">' +
               '<div class="overview-icon">' + (c.icon || '📌') + '</div>' +
               '<div class="overview-info">' +
                 '<h3>' + renderBilingualText(c.title) + '</h3>' +
                 '<p>' + renderBilingualText(c.desc || c.description) + '</p>' +
               '</div>' +
             '</div>';
    }).join('');
  }

  // (b) Route Milestone Board
  var boardEl = document.getElementById('route-board-mount') || document.getElementById('route-board');
  var rb = (data.overview && data.overview.routeBoard) || data.routeBoard;
  var stops = (data.overview && data.overview.routeStops) || (rb && rb.stops) || data.routeStops;
  var cfg = window.TRIP_CONFIG || {};

  // config.js routeBoardStyle takes priority over the data file setting
  var activeTransitStyle = cfg.routeBoardStyle
    || (rb && rb.style)
    || (cfg.theme && cfg.theme.routeBoardStyle)
    || 'swiss-train';

  if (boardEl && stops && stops.length > 0) {
    var numStops = stops.length;
    var hasColors = stops.some(function(s) { return s.color; });
    var gradientStops = hasColors
      ? stops.map(function(s, i) {
          return (s.color || 'var(--accent-primary)') + ' ' + Math.round((i / (numStops - 1)) * 100) + '%';
        }).join(', ')
      : '';
    var lineStyleH    = gradientStops ? 'background: linear-gradient(90deg, ' + gradientStops + ');' : '';
    var lineGradientV = gradientStops ? 'linear-gradient(180deg, ' + gradientStops + ')' : '';

    // AGENTS: Add a new else-if branch here when registering a new transit style key.
    var badgeText = (rb && rb.badge) ? rb.badge : '';
    if (!badgeText) {
      if      (activeTransitStyle === 'swiss-train')        badgeText = '🇨🇭 SBB · CFF · FFS';
      else if (activeTransitStyle === 'jr-rail')            badgeText = '🇯🇵 JR · LINE';
      else if (activeTransitStyle === 'london-underground') badgeText = '🔴 UNDERGROUND';
      else if (activeTransitStyle === 'hong-kong-mtr')      badgeText = 'Ж MTR';
      else if (activeTransitStyle === 'new-york-subway')    badgeText = 'MTA SUBWAY';
      else                                                   badgeText = 'TRANSIT ROUTE';
    }

    var lineTitle = (rb && (rb.lineTitle || rb.title)) || { en: 'Journey Route' };
    var direction = (rb && rb.direction) || '';

    var stopsHtml = stops.map(function(s, idx) {
      var codePrefix = s.label || s.code || '';
      var codeNum    = s.number || s.code || ('0' + (idx + 1));
      var dotColor   = s.color || 'var(--accent-primary)';
      var daysBadge  = s.days || s.daysBadge || { en: 'Stop ' + (idx + 1) };
      var enTitle = s.nameEn || s.nameNative || (s.name && s.name.en) || s.nameRomaji || '';
      var zhTitle = s.nameZh || (s.name && s.name.zh) || s.nameNative || enTitle;
      var enSub   = s.nameRomaji || (s.name && s.name.en) || s.nameEn || '';
      var zhSub   = (s.name && s.name.zh) || s.nameZh || s.nameRomaji || enSub;
      return '<div class="route-stop-item" data-stop="' + (s.label || s.code || idx) + '">' +
               '<div class="route-stop-top">' +
                 '<div class="stop-code-badge" style="--code-color: ' + dotColor + ';">' +
                   '<span class="code-prefix">' + codePrefix + '</span>' +
                   '<span class="code-num">' + codeNum + '</span>' +
                 '</div>' +
               '</div>' +
               '<div class="route-stop-dot-wrap">' +
                 '<div class="stop-dot" style="--dot-color: ' + dotColor + ';">' +
                   '<span class="dot-inner-core"></span>' +
                 '</div>' +
               '</div>' +
               '<div class="route-stop-bottom">' +
                 '<div class="stop-name-native">' + renderBilingualText({ en: enTitle, zh: zhTitle }) + '</div>' +
                 '<div class="stop-name-romaji">' + renderBilingualText({ en: enSub, zh: zhSub }) + '</div>' +
                 '<div class="stop-days-badge">' + renderBilingualText(daysBadge) + '</div>' +
               '</div>' +
             '</div>';
    }).join('');

    boardEl.innerHTML =
      '<div class="route-board-container reveal" data-transit-style="' + activeTransitStyle + '">' +
        '<div class="route-board-header">' +
          '<div class="route-branding">' +
            '<span class="route-type-badge transit-badge">' + badgeText + '</span>' +
            '<h3 class="route-line-title">' + renderBilingualText(lineTitle) + '</h3>' +
          '</div>' +
          '<div class="route-direction">' +
            (direction ? renderBilingualText(direction) : '') +
            '<span class="arrow">➔</span>' +
          '</div>' +
        '</div>' +
        '<div class="route-track-wrap" style="--stops-count: ' + numStops + ';">' +
          '<div class="route-stops-list" style="--stops-count: ' + numStops + ';' + (lineGradientV ? ' --line-gradient-v: ' + lineGradientV + ';' : '') + '">' +
            '<div class="route-line-bar" style="' + lineStyleH + '"></div>' +
            stopsHtml +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // (c) Optional Trip Profile Grid (if the element exists in index.html)
  var profileGrid = document.getElementById('profile-grid');
  if (profileGrid && cfg.party) {
    var party = cfg.party;
    // AGENTS: Surface roles only — not real member names — to avoid PII in public text.
    var memberRoles = (party.members || [])
      .map(function(m) { return m.role ? t(m.role) : ''; })
      .filter(Boolean)
      .join(', ');

    profileGrid.innerHTML =
      '<div class="card profile-item-card">' +
        '<h4>👥 <span class="lang-primary lang-en">Travelers</span><span class="lang-secondary lang-zh">成員人數</span></h4>' +
        '<p><strong>' + (party.size || 2) + ' Adults</strong></p>' +
        '<p style="font-size:0.85rem; color:var(--text-secondary);">' + memberRoles + '</p>' +
      '</div>' +
      '<div class="card profile-item-card">' +
        '<h4>🛂 <span class="lang-primary lang-en">Passports &amp; Entry</span><span class="lang-secondary lang-zh">護照與簽證</span></h4>' +
        '<p><strong>' + (party.visaStatus ? renderBilingualText(party.visaStatus) : '90-Day Visa Free') + '</strong></p>' +
      '</div>' +
      '<div class="card profile-item-card">' +
        '<h4>🚗 <span class="lang-primary lang-en">Driver &amp; Transit</span><span class="lang-secondary lang-zh">駕駛資格與通票</span></h4>' +
        '<p><strong>' + (party.drivingLicence ? renderBilingualText(party.drivingLicence) : 'National Rail / Transit Ready') + '</strong></p>' +
      '</div>';
  }
}


/* =======================================================
   3. RENDER PRACTICAL TIPS & EMERGENCY BANNER
   ======================================================= */

/**
 * Renders the Practical Tips grid from SITE_DATA.tips (or SITE_DATA.tips.categories)
 * and an optional Emergency Contacts banner from SITE_DATA.emergency.contacts.
 * The emergency banner is absent gracefully when data or DOM element is missing.
 *
 * Called by renderAll() when TRIP_CONFIG.features.showTips !== false.
 */
function renderTips() {
  var data = window.SITE_DATA;
  if (!data) return;

  var container = document.getElementById('tips-grid-container') || document.getElementById('tips-grid');
  var tips = Array.isArray(data.tips)
    ? data.tips
    : (data.tips && Array.isArray(data.tips.categories) ? data.tips.categories : null);

  if (container && tips) {
    container.innerHTML = tips.map(function(tip) {
      var items = (tip.items || []).map(function(item) {
        if (typeof item === 'object' && item.title && item.desc) {
          return '<li><strong>' + renderBilingualText(item.title) + ':</strong> ' + renderBilingualText(item.desc) + '</li>';
        }
        return '<li>' + renderBilingualText(item) + '</li>';
      }).join('');
      return '<div class="tip-card reveal" id="' + (tip.id || '') + '">' +
               '<div class="tip-header">' +
                 '<span class="tip-icon">' + (tip.icon || '💡') + '</span>' +
                 '<h3 class="tip-title">' + renderBilingualText(tip.title) + '</h3>' +
               '</div>' +
               '<ul class="tip-list">' + items + '</ul>' +
             '</div>';
    }).join('');
  }

  // Optional emergency contacts banner
  var emEl = document.getElementById('emergency-banner');
  if (emEl && data.emergency && Array.isArray(data.emergency.contacts)) {
    var contacts = data.emergency.contacts.map(function(c) {
      return '<a href="tel:' + c.number.replace(/[^0-9+]/g, '') + '" style="display: inline-flex; align-items: center; gap: 8px; background: var(--bg-card); border: 1px solid var(--border-mid); padding: 8px 14px; border-radius: var(--radius-pill); font-size: 0.85rem; font-weight: 700; color: var(--text-primary); text-decoration: none;">' +
               '<span>📞 ' + c.number + '</span>' +
               '<span style="font-size: 0.75rem; color: var(--text-muted);">(' + renderBilingualText(c.label) + ')</span>' +
             '</a>';
    }).join('');
    emEl.innerHTML =
      '<div class="emergency-banner-inner" style="background: rgba(235,34,38,0.08); border: 1.5px solid rgba(235,34,38,0.3); border-radius: var(--radius-lg); padding: 20px 24px; margin-top: 24px; display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between;">' +
        '<div style="display: flex; align-items: center; gap: 12px;">' +
          '<span style="font-size: 1.8rem;">🚨</span>' +
          '<div>' +
            '<h4 style="font-size: 1.05rem; font-weight: 800; color: #EB2226; margin: 0;">' +
              '<span class="lang-primary lang-en">Emergency Hotlines</span>' +
              '<span class="lang-secondary lang-zh">緊急求助熱線</span>' +
            '</h4>' +
            '<p style="font-size: 0.85rem; color: var(--text-secondary); margin: 2px 0 0;">' +
              '<span class="lang-primary lang-en">Keep these numbers saved on your phone</span>' +
              '<span class="lang-secondary lang-zh">建議將熱線電話預先儲存至手機通訊錄</span>' +
            '</p>' +
          '</div>' +
        '</div>' +
        '<div style="display: flex; flex-wrap: wrap; gap: 14px;">' + contacts + '</div>' +
      '</div>';
  }
}


/* =======================================================
   4. RENDER ITINERARY (DAY TIMELINE & ACCORDIONS)
   ======================================================= */

/**
 * Renders the day-by-day accordion timeline from ITINERARY_DATA[].
 * - Day 1 (index 0) auto-expands on load; all others are collapsed.
 * - Each card carries data-region for the filter tab system.
 * - Mini-map containers are injected but initialized lazily by map.js
 *   when the accordion is expanded, to avoid rendering off-screen maps.
 *
 * @see js/ui.js → initDayFilters()        — region filter tabs
 * @see js/map.js → initDayMiniMap(dayId)  — lazy mini map initialization
 *
 * Called by renderAll() when TRIP_CONFIG.features.showItinerary !== false.
 */
function renderItinerary() {
  var itinerary = window.ITINERARY_DATA;
  if (!Array.isArray(itinerary)) return;

  var container = document.getElementById('itinerary-timeline-container') || document.getElementById('itinerary-list');
  if (!container) return;

  container.innerHTML = itinerary.map(function(day, index) {
    var isFirst = index === 0;
    var tagsHtml = (day.tags || []).map(function(tag) {
      var tagClass = 'tag-' + (tag.type || 'city');
      var tagContent = (tag && typeof tag.text === 'object')
        ? renderBilingualText(tag.text)
        : (tag.en || tag.zh ? renderBilingualText(tag) : (tag.text || ''));
      return '<span class="tag ' + tagClass + '">' + tagContent + '</span>';
    }).join('');

    var blocksHtml = (day.blocks || []).map(function(block) {
      var metaPills = '';
      if (block.location || block.transport) {
        var locationPill = block.location
          ? '<span class="badge" style="font-size: 0.78rem; padding: 3px 8px;">📍 ' + renderBilingualText(block.location.name || block.location) + '</span>'
          : '';
        var transportPill = block.transport
          ? '<span class="badge" style="font-size: 0.78rem; padding: 3px 8px;">' + (block.transport.icon || '🚆') + ' ' + renderBilingualText(block.transport.text || block.transport) + '</span>'
          : '';
        metaPills = '<div class="activity-meta-pills" style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">' + locationPill + transportPill + '</div>';
      }
      var mealHtml = block.activity.meal
        ? '<div class="activity-meal"><span>' + (block.activity.meal.icon || '🍽️') + '</span><div>' + renderBilingualText(block.activity.meal) + '</div></div>'
        : '';
      return '<div class="time-slot">' +
               '<div class="time-label-wrap"><span class="time-slot-label">' + renderBilingualText(block.time) + '</span></div>' +
               '<div class="time-slot-content">' +
                 '<h4 class="activity-title">' + renderBilingualText(block.activity.title) + '</h4>' +
                 '<p class="activity-desc">' + renderBilingualText(block.activity.desc) + '</p>' +
                 metaPills + mealHtml +
               '</div>' +
             '</div>';
    }).join('');

    var tipHtml = day.tip
      ? '<div class="day-pro-tip">💡 <strong>' + renderBilingualText({ en: 'Pro Tip:', zh: '實用貼士：' }) + '</strong> ' + renderBilingualText(day.tip) + '</div>'
      : '';

    return '<div class="day-card reveal' + (isFirst ? ' open' : '') + '" id="' + day.id + '" data-region="' + (day.region || 'all') + '">' +
             '<div class="day-header" onclick="toggleDayAccordion(\'' + day.id + '\')">' +
               '<div class="day-header-left">' +
                 '<span class="day-number-badge">DAY ' + (day.dayNum || (index + 1)) + '</span>' +
                 '<div class="day-header-title-wrap">' +
                   '<div class="day-date-label">' + (day.date || '') + '</div>' +
                   '<div class="day-main-title">' + renderBilingualText(day.title) + '</div>' +
                 '</div>' +
               '</div>' +
               '<div class="day-header-right">' +
                 '<div class="day-tags">' + tagsHtml + '</div>' +
                 '<div class="day-chevron">▼</div>' +
               '</div>' +
             '</div>' +
             '<div class="day-body">' +
               '<div class="day-slots">' + blocksHtml + '</div>' +
               tipHtml +
               '<!-- Mini-map container: populated lazily by map.js initDayMiniMap(dayId) -->' +
               '<div class="day-mini-map-container" id="minimap-' + day.id + '"></div>' +
             '</div>' +
           '</div>';
  }).join('');
}


/* =======================================================
   5. RENDER PACKING CHECKLIST
   ======================================================= */

/**
 * Renders the interactive packing checklist from SITE_DATA.packing.
 * Checkbox state persists in localStorage under key 'trip-packing-state'.
 *
 * Called by renderAll() when TRIP_CONFIG.features.showPacking !== false.
 */
function renderPacking() {
  var data = window.SITE_DATA;
  if (!data) return;

  var container = document.getElementById('packing-grid-container') || document.getElementById('packing-grid');
  if (!container) return;

  var packingList = Array.isArray(data.packing)
    ? data.packing
    : (Array.isArray(data.packingList) ? data.packingList : null);
  if (!packingList) return;

  var savedChecks = JSON.parse(localStorage.getItem('trip-packing-state') || '{}');

  container.innerHTML = packingList.map(function(cat) {
    var itemsHtml = (cat.items || []).map(function(item, idx) {
      var itemId    = item.id || ('pack-' + (cat.icon || 'item') + '-' + idx);
      var isChecked = !!savedChecks[itemId];
      return '<label class="packing-item' + (isChecked ? ' checked' : '') + '" data-item-id="' + itemId + '">' +
               '<input type="checkbox"' + (isChecked ? ' checked' : '') + ' onchange="togglePackingItem(\'' + itemId + '\', this)">' +
               '<span class="packing-item-text">' + renderBilingualText(item) + '</span>' +
             '</label>';
    }).join('');
    return '<div class="packing-category-card reveal">' +
             '<div class="packing-category-header">' +
               '<span class="packing-category-icon">' + (cat.icon || '🧳') + '</span>' +
               '<h3 class="packing-category-title">' + renderBilingualText(cat.title) + '</h3>' +
             '</div>' +
             '<div class="packing-items-list">' + itemsHtml + '</div>' +
           '</div>';
  }).join('');
}

/**
 * Toggles a packing item's checked state and persists it to localStorage.
 * Called inline via onchange from rendered checkbox labels.
 *
 * @param {string} itemId - Unique identifier for the packing item.
 * @param {HTMLInputElement} checkbox - The checkbox element.
 */
function togglePackingItem(itemId, checkbox) {
  var savedChecks = JSON.parse(localStorage.getItem('trip-packing-state') || '{}');
  savedChecks[itemId] = checkbox.checked;
  localStorage.setItem('trip-packing-state', JSON.stringify(savedChecks));
  var parent = checkbox.closest('.packing-item');
  if (parent) parent.classList.toggle('checked', checkbox.checked);
}


/* =======================================================
   6. RENDER BUDGET ESTIMATES
   ======================================================= */

/**
 * Renders the budget estimates table from SITE_DATA.budget.items[].
 * Converted-value cells use data-min / data-max (raw base-currency numbers)
 * read by currency.js → updateConvertedBudgets() to display live conversions
 * without re-rendering the entire table.
 *
 * Called by renderAll() when TRIP_CONFIG.features.showBudget !== false.
 *
 * @see js/currency.js → updateConvertedBudgets()
 */
function renderBudget() {
  var data = window.SITE_DATA;
  if (!data || !data.budget) return;

  var tbody = document.getElementById('budget-tbody');
  if (tbody && Array.isArray(data.budget.items)) {
    tbody.innerHTML = data.budget.items.map(function(item) {
      return '<tr>' +
               '<td><strong>' + renderBilingualText(item.category) + '</strong></td>' +
               '<td>' + (item.baseAmount || '—') + '</td>' +
               '<!-- data-min/data-max: raw base-currency values for currency.js conversion -->' +
               '<td class="converted-val" data-min="' + (item.min || 0) + '" data-max="' + (item.max || 0) + '">—</td>' +
               '<td>' + renderBilingualText(item.notes) + '</td>' +
             '</tr>';
    }).join('');

    if (data.budget.total) {
      var tot = data.budget.total;
      tbody.innerHTML +=
        '<tr class="budget-total">' +
          '<td><strong>' + renderBilingualText(tot.category) + '</strong></td>' +
          '<td><strong>' + (tot.baseAmount || '—') + '</strong></td>' +
          '<td class="converted-val budget-total-val" data-min="' + (tot.min || 0) + '" data-max="' + (tot.max || 0) + '"><strong>—</strong></td>' +
          '<td><em>' + renderBilingualText(tot.notes) + '</em></td>' +
        '</tr>';
    }
  }
}


/* =======================================================
   7. RENDER HOTELS & STAYS SECTION
   ======================================================= */

/**
 * Renders the Hotels section: destination Quick Leg pills (pre-fill the search
 * form) and curated Stay cards with direct Booking.com search links.
 * Party size from TRIP_CONFIG.party.size auto-fills the guest count.
 *
 * Called by renderAll() when TRIP_CONFIG.features.showHotels !== false.
 */
function renderHotels() {
  var data = window.SITE_DATA;
  if (!data || !data.hotels) return;

  var config    = window.TRIP_CONFIG;
  var partySize = (config && config.party && config.party.size) ? config.party.size : 2;

  // Quick Leg Pills (clicking pre-fills the hotel search form)
  var pillsEl   = document.getElementById('hotel-quick-legs-container');
  var quickLegs = data.hotels.quickLegs || [];
  if (pillsEl && Array.isArray(quickLegs) && quickLegs.length > 0) {
    pillsEl.innerHTML = quickLegs.map(function(p) {
      return '<button class="quick-leg-pill' + (p.active ? ' active' : '') + '"' +
               ' data-dest="' + (p.dest || '') + '"' +
               ' data-checkin="' + (p.checkin || '') + '"' +
               ' data-checkout="' + (p.checkout || '') + '">' +
               renderBilingualText(p.label) +
             '</button>';
    }).join('');

    var firstActive = quickLegs.find(function(p) { return p.active; }) || quickLegs[0];
    if (firstActive) {
      var destInput   = document.getElementById('hotel-dest');
      var inInput     = document.getElementById('hotel-checkin');
      var outInput    = document.getElementById('hotel-checkout');
      var guestsInput = document.getElementById('hotel-guests');
      if (destInput)   destInput.value   = firstActive.dest     || '';
      if (inInput)     inInput.value     = firstActive.checkin  || '';
      if (outInput)    outInput.value    = firstActive.checkout || '';
      if (guestsInput) guestsInput.value = String(partySize);
    }
  }

  // Curated Hotel Stay Cards with Booking.com deep-link
  var legsGrid = document.getElementById('itinerary-hotels-grid') || document.getElementById('hotels-grid');
  var legs = data.hotels.legs || data.hotels.stays || [];
  if (legsGrid && Array.isArray(legs)) {
    legsGrid.innerHTML = legs.map(function(leg) {
      var tagsHtml = (leg.tags || []).map(function(tag) { return '<span class="tag tag-city">' + tag + '</span>'; }).join('');
      return '<div class="hotel-leg-card reveal">' +
               '<div>' +
                 '<div class="hotel-leg-top">' +
                   '<span class="hotel-leg-badge">' + (leg.legNum || 'Stop') + ' · ' + renderBilingualText(leg.nights || 'Stay') + '</span>' +
                   '<span class="hotel-leg-dates">' + (leg.dates || '') + '</span>' +
                 '</div>' +
                 '<h4 class="hotel-leg-title">' + renderBilingualText(leg.title) + '</h4>' +
                 '<p class="hotel-leg-desc">' + renderBilingualText(leg.desc || leg.description) + '</p>' +
                 '<div class="day-tags" style="margin-bottom: 16px;">' + tagsHtml + '</div>' +
               '</div>' +
               '<a class="hotel-leg-btn"' +
                  ' href="https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(leg.dest || '') + '&checkin=' + (leg.checkin || '') + '&checkout=' + (leg.checkout || '') + '&group_adults=' + partySize + '"' +
                  ' target="_blank" rel="noopener noreferrer">' +
                 '🏨 Search on Booking.com ➔' +
               '</a>' +
             '</div>';
    }).join('');
  }
}


/* =======================================================
   8. RENDER TRANSIT RECOMMENDATIONS
   ======================================================= */

/**
 * Renders transport recommendation cards from SITE_DATA.transit.cards[].
 * Called by renderAll() when TRIP_CONFIG.features.showTransit !== false.
 */
function renderTransit() {
  var data = window.SITE_DATA;
  if (!data || !data.transit) return;

  var container = document.getElementById('transit-grid-container') || document.getElementById('transit-card');
  var cards = Array.isArray(data.transit.cards)
    ? data.transit.cards
    : (Array.isArray(data.transit) ? data.transit : null);

  if (container && cards) {
    container.innerHTML = cards.map(function(c) {
      return '<div class="transit-card reveal" id="' + (c.id || '') + '">' +
               '<div class="transit-card-header">' +
                 '<span class="transit-icon">' + (c.icon || '🚆') + '</span>' +
                 '<h3 class="transit-title">' + renderBilingualText(c.title) + '</h3>' +
               '</div>' +
               '<p class="transit-details">' + renderBilingualText(c.details || c.desc || c.description) + '</p>' +
             '</div>';
    }).join('');
  }
}


/* =======================================================
   MASTER RENDER ORCHESTRATOR
   ======================================================= */

/**
 * Orchestrates all section renders. Called once on DOMContentLoaded by script.js.
 *
 * Feature flag behavior:
 *   - Reads TRIP_CONFIG.features.show* before each renderer.
 *   - Missing flag defaults to true so legacy configs without a features block
 *     render all sections (opt-out, not opt-in).
 *   - Set a flag to false in data/config.js to hide that section entirely.
 *
 * AGENTS — adding a new section renderer:
 *   1. Create a renderXxx() function following the patterns above.
 *   2. Add showXxx: true to the features block in data/config.js.
 *   3. Add a gated call here: if (features.showXxx !== false) renderXxx();
 *   4. Update README.md feature table and flag prompts/trip-planner-prompt.md.
 */
function renderAll() {
  var features = (window.TRIP_CONFIG && window.TRIP_CONFIG.features) || {};

  // showOverview guards both the hero AND the overview cards + milestone board
  if (features.showOverview      !== false) renderHero();
  if (features.showOverview      !== false) renderOverview();
  if (features.showMilestoneBoard !== false && features.showOverview === false) renderOverview(); // allow standalone milestone
  if (features.showTips          !== false) renderTips();
  if (features.showItinerary     !== false) renderItinerary();
  if (features.showPacking       !== false) renderPacking();
  if (features.showBudget        !== false) renderBudget();
  if (features.showHotels        !== false) renderHotels();
  if (features.showTransit       !== false) renderTransit();
}
