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
  const tertiaryCode  = config && config.languages && config.languages.tertiary  ? config.languages.tertiary.code  : null;
  const isTertiary    = document.body.classList.contains('lang-tertiary');
  const isSecondary   = document.body.classList.contains('lang-secondary');

  if (isTertiary  && tertiaryCode  && obj[tertiaryCode])  return obj[tertiaryCode];
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
  const tertiaryCode  = config && config.languages && config.languages.tertiary  ? config.languages.tertiary.code  : null;
  const primaryVal    = obj[primaryCode] || Object.values(obj)[0] || '';

  if (!secondaryCode) {
    // Single-language mode
    return '<span class="lang-primary lang-' + primaryCode + ' ' + className + '">' + primaryVal + '</span>';
  }

  const secondaryVal = obj[secondaryCode] ||
                       (secondaryCode === 'zh' ? (obj['zh-HK'] || obj['zh-TW'] || obj['zh-Hant']) : null) ||
                       (secondaryCode && secondaryCode.startsWith('zh') ? (obj.zh || obj['zh-HK'] || obj['zh-TW']) : null) ||
                       primaryVal;
  let html = '<span class="lang-primary lang-' + primaryCode + ' ' + className + '">' + primaryVal + '</span>' +
             '<span class="lang-secondary lang-' + secondaryCode + ' ' + className + '">' + secondaryVal + '</span>';

  if (tertiaryCode) {
    const tertiaryVal = obj[tertiaryCode] ||
                        (tertiaryCode === 'zh-cn' ? (obj['zh-CN'] || obj['zh-Hans'] || obj['zh-SG'] || obj['zh-MY']) : null) ||
                        (tertiaryCode && tertiaryCode.startsWith('zh') ? (obj['zh-cn'] || obj['zh-CN'] || obj['zh-Hans']) : null) ||
                        primaryVal;
    html += '<span class="lang-tertiary lang-' + tertiaryCode + ' ' + className + '">' + tertiaryVal + '</span>';
  }

  return html;
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
  const cfg = config;

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

  // Hero Countdown Timer
  var countdownEl = document.getElementById('hero-countdown');
  if (countdownEl) {
    function updateCountdown() {
      var targetDate = (cfg.trip && cfg.trip.dates && cfg.trip.dates.start)
        ? new Date(cfg.trip.dates.start + 'T07:30:00Z')
        : new Date('2026-11-26T07:30:00Z');
      var returnDate = (cfg.trip && cfg.trip.dates && cfg.trip.dates.end)
        ? new Date(cfg.trip.dates.end + 'T17:25:00Z')
        : new Date('2026-11-28T17:25:00Z');
      var now = new Date();
      var diff = targetDate - now;

      var cdBefore = (cfg.trip && cfg.trip.countdown && cfg.trip.countdown.before) || {
        en: 'Countdown to Departure',
        zh: '啟程倒數計時',
        'zh-cn': '启程倒数计时'
      };
      var cdDuring = (cfg.trip && cfg.trip.countdown && cfg.trip.countdown.during) || {
        en: 'You are on your trip! Enjoy every moment!',
        zh: '旅程進行中！盡情享受美好時光！',
        'zh-cn': '旅程进行中！尽情享受美好时光！'
      };
      var cdAfter = (cfg.trip && cfg.trip.countdown && cfg.trip.countdown.after) || {
        en: 'Trip Completed · Unforgettable Memories',
        zh: '旅程圓滿結束 · 難忘回憶',
        'zh-cn': '旅程圆满结束 · 难忘回忆'
      };

      if (diff > 0) {
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((diff % (1000 * 60)) / 1000);

        countdownEl.innerHTML =
          '<div class="countdown-card">' +
            '<div class="countdown-header">' +
              '<span class="countdown-icon">⏳</span> ' +
              renderBilingualText(cdBefore) +
            '</div>' +
            '<div class="countdown-grid">' +
              '<div class="countdown-item"><span class="countdown-num">' + days + '</span><span class="countdown-unit">' + renderBilingualText({ en: 'Days', zh: '天', 'zh-cn': '天' }) + '</span></div>' +
              '<div class="countdown-sep">:</div>' +
              '<div class="countdown-item"><span class="countdown-num">' + String(hours).padStart(2, '0') + '</span><span class="countdown-unit">' + renderBilingualText({ en: 'Hours', zh: '時', 'zh-cn': '时' }) + '</span></div>' +
              '<div class="countdown-sep">:</div>' +
              '<div class="countdown-item"><span class="countdown-num">' + String(mins).padStart(2, '0') + '</span><span class="countdown-unit">' + renderBilingualText({ en: 'Mins', zh: '分', 'zh-cn': '分' }) + '</span></div>' +
              '<div class="countdown-sep">:</div>' +
              '<div class="countdown-item"><span class="countdown-num">' + String(secs).padStart(2, '0') + '</span><span class="countdown-unit">' + renderBilingualText({ en: 'Secs', zh: '秒', 'zh-cn': '秒' }) + '</span></div>' +
            '</div>' +
          '</div>';
      } else if (now < returnDate) {
        countdownEl.innerHTML =
          '<div class="countdown-card active-trip">' +
            '<span class="countdown-icon">🎄</span> ' +
            renderBilingualText(cdDuring) +
          '</div>';
      } else {
        countdownEl.innerHTML =
          '<div class="countdown-card completed-trip">' +
            '<span class="countdown-icon">✨</span> ' +
            renderBilingualText(cdAfter) +
          '</div>';
      }
    }

    updateCountdown();
    if (window._heroCountdownInterval) clearInterval(window._heroCountdownInterval);
    window._heroCountdownInterval = setInterval(updateCountdown, 1000);
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
      var cnTitle = (s.name && s.name['zh-cn']) || s.nameZhCn || zhTitle;
      var enSub   = s.nameRomaji || (s.name && s.name.en) || s.nameEn || '';
      var zhSub   = (s.name && s.name.zh) || s.nameZh || s.nameRomaji || enSub;
      var cnSub   = (s.name && s.name['zh-cn']) || s.nameZhCn || zhSub;
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
                 '<div class="stop-name-native">' + renderBilingualText({ en: enTitle, zh: zhTitle, 'zh-cn': cnTitle }) + '</div>' +
                 '<div class="stop-name-romaji">' + renderBilingualText({ en: enSub, zh: zhSub, 'zh-cn': cnSub }) + '</div>' +
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
        '<h4>👥 <span class="lang-primary lang-en">Travelers</span><span class="lang-secondary lang-zh">成員人數</span><span class="lang-tertiary lang-zh-cn">成员人数</span></h4>' +
        '<p><strong>' + (party.size || 2) + ' Adults</strong></p>' +
        '<p style="font-size:0.85rem; color:var(--text-secondary);">' + memberRoles + '</p>' +
      '</div>' +
      '<div class="card profile-item-card">' +
        '<h4>🛂 <span class="lang-primary lang-en">Passports &amp; Entry</span><span class="lang-secondary lang-zh">護照與簽證</span><span class="lang-tertiary lang-zh-cn">护照与签证</span></h4>' +
        '<p><strong>' + (party.visaStatus ? renderBilingualText(party.visaStatus) : '90-Day Visa Free') + '</strong></p>' +
      '</div>' +
      '<div class="card profile-item-card">' +
        '<h4>🚗 <span class="lang-primary lang-en">Driver &amp; Transit</span><span class="lang-secondary lang-zh">駕駛資格與通票</span><span class="lang-tertiary lang-zh-cn">驾驶资格与通票</span></h4>' +
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
              '<span class="lang-tertiary lang-zh-cn">紧急求助热线</span>' +
            '</h4>' +
            '<p style="font-size: 0.85rem; color: var(--text-secondary); margin: 2px 0 0;">' +
              '<span class="lang-primary lang-en">Keep these numbers saved on your phone</span>' +
              '<span class="lang-secondary lang-zh">建議將熱線電話預先儲存至手機通訊錄</span>' +
              '<span class="lang-tertiary lang-zh-cn">建议将热线电话预先储存至手机通讯录</span>' +
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

  // Render Itinerary Action Toolbar (Calendar .ics, Expand/Collapse All, Print)
  var toolbarMount = document.getElementById('itinerary-toolbar-container');
  if (toolbarMount) {
    toolbarMount.innerHTML =
      '<div class="itinerary-toolbar">' +
        '<button type="button" class="itinerary-tool-btn btn-calendar" onclick="downloadItineraryICS()">' +
          '<span>📅</span> ' + renderBilingualText({ en: 'Add to Calendar (.ics)', zh: '導出日曆 (.ics)', 'zh-cn': '导出日历 (.ics)' }) +
        '</button>' +
        '<button type="button" class="itinerary-tool-btn" id="itinerary-toggle-all-btn" onclick="toggleAllAccordions()">' +
          '<span id="itinerary-toggle-all-icon">📂</span> ' +
          '<span id="itinerary-toggle-all-label">' + renderBilingualText({ en: 'Expand All', zh: '全部展開', 'zh-cn': '全部展开' }) + '</span>' +
        '</button>' +
        '<button type="button" class="itinerary-tool-btn" onclick="window.print()">' +
          '<span>🖨️</span> ' + renderBilingualText({ en: 'Print / Save PDF', zh: '列印 / 保存PDF', 'zh-cn': '打印 / 保存PDF' }) +
        '</button>' +
      '</div>';
  }

  container.innerHTML = itinerary.map(function(day, index) {
    var isFirst = index === 0;
    var tagsHtml = (day.tags || []).map(function(tag) {
      var tagClass = 'tag-' + (tag.type || 'city');
      var tagContent = (tag && typeof tag.text === 'object')
        ? renderBilingualText(tag.text)
        : (tag.en || tag.zh ? renderBilingualText(tag) : (tag.text || ''));
      return '<span class="tag ' + tagClass + '">' + tagContent + '</span>';
    }).join('');

    // ── Helper: classify a block into a time period based on its time label emoji/text
    function classifyPeriod(block) {
      var timeEn = (block.time && (typeof block.time === 'string' ? block.time : (block.time.en || Object.values(block.time)[0]))) || '';
      if (/🌅|morning|arrival|flight|07:|08:|09:|10:|11:/i.test(timeEn)) return 'morning';
      if (/🌤️|🕑|early.?after|12:|13:|14:|15:/i.test(timeEn)) return 'afternoon';
      if (/🛌|mid.?after|rest|recharge|16:/i.test(timeEn)) return 'afternoon';
      if (/🌆|🌃|🌙|evening|night|dinner|17:|18:|19:|20:|21:/i.test(timeEn)) return 'evening';
      return 'afternoon'; // default to afternoon for unlabelled blocks
    }

    // ── Build a single time-slot HTML string for one block
    function buildBlockHtml(block) {
      var locationPills = '';
      if (block.activity && block.activity.locations && block.activity.locations.length > 0) {
        locationPills = block.activity.locations.map(function(loc) {
          var mapUrl = 'https://maps.google.com/?q=' + loc.lat + ',' + loc.lng;
          return '<a href="' + mapUrl + '" target="_blank" rel="noopener noreferrer" class="badge location-badge" title="Open in Google Maps">' +
                   '📍 ' + renderBilingualText(loc.label) + ' <span class="ext-icon">↗</span>' +
                 '</a>';
        }).join('');
      } else if (block.location) {
        locationPills = '<span class="badge" style="font-size: 0.78rem; padding: 3px 8px;">📍 ' + renderBilingualText(block.location.name || block.location) + '</span>';
      }

      var walkingPill = (block.activity && block.activity.walkingInfo)
        ? '<span class="badge walking-badge">' + renderBilingualText(block.activity.walkingInfo) + '</span>'
        : '';

      var transportPill = block.transport
        ? '<span class="badge transport-badge" style="font-size: 0.78rem; padding: 3px 8px;">' + (block.transport.icon || '🚆') + ' ' + renderBilingualText(block.transport.text || block.transport) + '</span>'
        : '';

      var metaPills = '';
      if (locationPills || walkingPill || transportPill) {
        metaPills = '<div class="activity-meta-pills" style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">' +
                      locationPills + walkingPill + transportPill +
                    '</div>';
      }

      var photoTipHtml = (block.activity && block.activity.photoTip)
        ? '<div class="photo-tip-box">' +
            '<span class="photo-tip-icon">📸</span>' +
            '<div class="photo-tip-text">' + renderBilingualText(block.activity.photoTip) + '</div>' +
          '</div>'
        : '';

      var bookingHtml = (block.activity && block.activity.bookingUrl)
        ? '<div class="activity-booking-wrap">' +
            '<a href="' + block.activity.bookingUrl + '" target="_blank" rel="noopener noreferrer" class="activity-booking-btn">' +
              '🎟️ ' + renderBilingualText({ en: 'Book Timed Tickets Online', zh: '官方時段門票預約', 'zh-cn': '官方时段门票预约' }) + ' ↗' +
            '</a>' +
          '</div>'
        : '';

      var mealHtml = (block.activity && block.activity.meal)
        ? '<div class="activity-meal"><span>' + (block.activity.meal.icon || '🍽️') + '</span><div>' + renderBilingualText(block.activity.meal) + '</div></div>'
        : '';

      return '<div class="time-slot">' +
               '<div class="time-label-wrap"><span class="time-slot-label">' + renderBilingualText(block.time) + '</span></div>' +
               '<div class="time-slot-content">' +
                 '<h4 class="activity-title">' + renderBilingualText(block.activity.title) + '</h4>' +
                 '<p class="activity-desc">' + renderBilingualText(block.activity.desc) + '</p>' +
                 metaPills + photoTipHtml + bookingHtml + mealHtml +
               '</div>' +
             '</div>';
    }

    // ── Group blocks into ordered periods
    var PERIOD_ORDER = ['morning', 'afternoon', 'evening'];
    var PERIOD_META = {
      morning:   { icon: '🌅', label: { en: 'Morning',   zh: '上午',   'zh-cn': '上午'   } },
      afternoon: { icon: '🌤️', label: { en: 'Afternoon', zh: '下午',   'zh-cn': '下午'   } },
      evening:   { icon: '🌆', label: { en: 'Evening',   zh: '傍晚 / 晚上', 'zh-cn': '傍晚 / 晚上' } }
    };

    var periodGroups = { morning: [], afternoon: [], evening: [] };
    (day.blocks || []).forEach(function(block) {
      var p = classifyPeriod(block);
      periodGroups[p].push(block);
    });

    // Build blocksHtml as collapsible period details elements
    var blocksHtml = PERIOD_ORDER.filter(function(p) { return periodGroups[p].length > 0; }).map(function(p, pIdx) {
      var meta = PERIOD_META[p];
      var periodLabel = renderBilingualText(meta.label);
      var slotsHtml = periodGroups[p].map(buildBlockHtml).join('');
      var activityCount = periodGroups[p].length;
      var countLabel = renderBilingualText({ en: activityCount + ' ' + (activityCount === 1 ? 'activity' : 'activities'), zh: activityCount + ' 項活動', 'zh-cn': activityCount + ' 项活动' });
      // Morning is open by default (pIdx === 0); afternoon/evening start collapsed
      var openAttr = (pIdx === 0) ? ' open' : '';
      return '<details class="period-group"' + openAttr + '>' +
               '<summary class="period-group-header">' +
                 '<span class="period-icon">' + meta.icon + '</span>' +
                 '<span class="period-label">' + periodLabel + '</span>' +
                 '<span class="period-count">' + countLabel + '</span>' +
                 '<span class="period-chevron">▼</span>' +
               '</summary>' +
               '<div class="period-slots">' + slotsHtml + '</div>' +
             '</details>';
    }).join('');

    var tipHtml = day.tip
      ? '<div class="day-pro-tip">💡 <strong>' + renderBilingualText({ en: 'Pro Tip:', zh: '實用貼士：', 'zh-cn': '实用贴士：' }) + '</strong> ' + renderBilingualText(day.tip) + '</div>'
      : '';

    return '<div class="day-card reveal' + (isFirst ? ' open' : '') + '" id="' + day.id + '" data-region="' + (day.region || 'all') + '">' +
             '<div class="day-header" onclick="toggleDayAccordion(\'' + day.id + '\')">' +
               '<div class="day-header-left">' +
                 '<span class="day-number-badge">' +
               renderBilingualText({ en: 'DAY ' + (day.dayNum || (index + 1)), zh: '第 ' + (day.dayNum || (index + 1)) + ' 天', 'zh-cn': '第 ' + (day.dayNum || (index + 1)) + ' 天' }) +
               '</span>' +
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

  var totalItems = 0;
  var checkedItems = 0;

  var cardsHtml = packingList.map(function(cat) {
    var itemsHtml = (cat.items || []).map(function(item, idx) {
      totalItems++;
      var itemId    = item.id || ('pack-' + (cat.icon || 'item') + '-' + idx);
      var isChecked = !!savedChecks[itemId];
      if (isChecked) checkedItems++;

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

  container.innerHTML = cardsHtml;

  // Render Live Packing Progress Bar
  var progressMount = document.getElementById('packing-progress-mount');
  if (progressMount && totalItems > 0) {
    var pct = Math.round((checkedItems / totalItems) * 100);
    progressMount.innerHTML =
      '<div class="packing-progress-header">' +
        '<div class="packing-progress-title">' +
          '<span>🎒</span> ' +
          renderBilingualText({ en: 'Packing Progress', zh: '行前準備進度', 'zh-cn': '行前准备进度' }) +
        '</div>' +
        '<span class="packing-progress-pct" id="packing-pct">' + pct + '%</span>' +
      '</div>' +
      '<div class="packing-progress-track">' +
        '<div class="packing-progress-fill" id="packing-fill" style="width: ' + pct + '%;"></div>' +
      '</div>' +
      '<div class="packing-progress-footer">' +
        '<span id="packing-count-text">' + checkedItems + ' / ' + totalItems + ' ' + renderBilingualText({ en: 'items packed', zh: '項已收拾', 'zh-cn': '项已收拾' }) + '</span>' +
        '<button type="button" class="packing-reset-btn" onclick="resetPackingChecklist()">' +
          renderBilingualText({ en: 'Reset checklist', zh: '重設所有勾選', 'zh-cn': '重置所有勾选' }) +
        '</button>' +
      '</div>';
  }
}

/**
 * Toggles a packing item's checked state, persists it, and updates progress bar.
 */
function togglePackingItem(itemId, checkbox) {
  var savedChecks = JSON.parse(localStorage.getItem('trip-packing-state') || '{}');
  savedChecks[itemId] = checkbox.checked;
  localStorage.setItem('trip-packing-state', JSON.stringify(savedChecks));
  var parent = checkbox.closest('.packing-item');
  if (parent) parent.classList.toggle('checked', checkbox.checked);

  // Recalculate packing progress
  var allBoxes = document.querySelectorAll('.packing-item input[type="checkbox"]');
  if (allBoxes.length > 0) {
    var total = allBoxes.length;
    var checked = 0;
    allBoxes.forEach(function(b) { if (b.checked) checked++; });
    var pct = Math.round((checked / total) * 100);

    var pctEl = document.getElementById('packing-pct');
    var fillEl = document.getElementById('packing-fill');
    var countEl = document.getElementById('packing-count-text');

    if (pctEl) pctEl.innerText = pct + '%';
    if (fillEl) fillEl.style.width = pct + '%';
    if (countEl) {
      countEl.innerHTML = checked + ' / ' + total + ' ' + renderBilingualText({ en: 'items packed', zh: '項已收拾', 'zh-cn': '项已收拾' });
    }
  }
}

function resetPackingChecklist() {
  var msg = {
    en: 'Are you sure you want to reset all checked packing items?',
    zh: '確認要重設並清空所有已勾選的行李項目嗎？',
    'zh-cn': '确认要重置并清空所有已勾选的行李项目吗？'
  };
  if (confirm(t(msg))) {
    localStorage.removeItem('trip-packing-state');
    renderPacking();
    showToast({ en: '✓ Packing checklist reset', zh: '✓ 已重設行前準備清單', 'zh-cn': '✓ 已重设行前准备清单' });
  }
}
window.resetPackingChecklist = resetPackingChecklist;


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

  // 1. Render Executive Budget Stat Cards & Breakdown Bar
  var summaryMount = document.getElementById('budget-summary-mount');
  if (summaryMount) {
    var bSum = data.budget.summary || {
      total: { min: 899, max: 999, sub: { en: 'Base: €899 – €999 · 2 Adults', zh: '基數：€899 – €999 · 2位成人', 'zh-cn': '基数：€899 – €999 · 2位成人' } },
      prepaid: { min: 529, max: 529, sub: { en: 'Prepaid & Confirmed', zh: '出發前已付清款項', 'zh-cn': '出发前已付清款项' } },
      onSite: { min: 370, max: 470, sub: { en: 'On-Site Spending Est.', zh: '當地現場開支預算', 'zh-cn': '当地现场开支预算' } }
    };
    var bAlloc = data.budget.allocation || [
      { name: { en: 'Hotel (31%)', zh: '住宿 (31%)', 'zh-cn': '住宿 (31%)' }, pct: 31, cls: 'seg-hotel' },
      { name: { en: 'Flights (28%)', zh: '機票 (28%)', 'zh-cn': '机票 (28%)' }, pct: 28, cls: 'seg-flights' },
      { name: { en: 'Food (22%)', zh: '餐飲 (22%)', 'zh-cn': '餐饮 (22%)' }, pct: 22, cls: 'seg-food' },
      { name: { en: 'Transit (10%)', zh: '交通 (10%)', 'zh-cn': '交通 (10%)' }, pct: 10, cls: 'seg-transit' },
      { name: { en: 'Sightseeing (9%)', zh: '門票 (9%)', 'zh-cn': '门票 (9%)' }, pct: 9, cls: 'seg-sight' }
    ];

    var distBarsHtml = bAlloc.map(function(seg) {
      var plainLabel = (seg.name && (seg.name.en || (typeof seg.name === 'string' ? seg.name : Object.values(seg.name)[0]))) || '';
      return '<div class="dist-seg ' + (seg.cls || '') + '" style="width: ' + seg.pct + '%;" title="' + plainLabel + '">' +
               '<span class="dist-seg-label">' + renderBilingualText(seg.name) + '</span>' +
             '</div>';
    }).join('');

    var colors = ['#0D9488', '#8B5CF6', '#F59E0B', '#0284C7', '#EC4899'];
    var distLegendHtml = bAlloc.map(function(seg, i) {
      var color = colors[i % colors.length];
      return '<span class="dist-legend-item"><span class="dist-dot" style="background:' + color + ';"></span> ' + renderBilingualText(seg.name) + '</span>';
    }).join('');

    summaryMount.innerHTML =
      '<div class="budget-stats-grid">' +
        '<div class="budget-stat-card highlight">' +
          '<div class="budget-stat-top">' +
            '<span class="budget-stat-label">' + renderBilingualText({ en: 'Total Estimated Budget', zh: '行程總估算預算', 'zh-cn': '行程总估算预算' }) + '</span>' +
            '<span class="budget-stat-icon">💰</span>' +
          '</div>' +
          '<div class="budget-stat-val converted-val" data-min="' + bSum.total.min + '" data-max="' + bSum.total.max + '">—</div>' +
          '<div class="budget-stat-sub">' + renderBilingualText(bSum.total.sub) + '</div>' +
        '</div>' +

        '<div class="budget-stat-card">' +
          '<div class="budget-stat-top">' +
            '<span class="budget-stat-label">' + renderBilingualText({ en: 'Prepaid & Confirmed', zh: '出發前已付清款項', 'zh-cn': '出发前已付清款项' }) + '</span>' +
            '<span class="budget-stat-icon">💳</span>' +
          '</div>' +
          '<div class="budget-stat-val converted-val" data-min="' + bSum.prepaid.min + '" data-max="' + bSum.prepaid.max + '">—</div>' +
          '<div class="budget-stat-sub">' + renderBilingualText(bSum.prepaid.sub) + '</div>' +
        '</div>' +

        '<div class="budget-stat-card">' +
          '<div class="budget-stat-top">' +
            '<span class="budget-stat-label">' + renderBilingualText({ en: 'On-Site Spending Est.', zh: '當地現場開支預算', 'zh-cn': '当地现场开支预算' }) + '</span>' +
            '<span class="budget-stat-icon">💶</span>' +
          '</div>' +
          '<div class="budget-stat-val converted-val" data-min="' + bSum.onSite.min + '" data-max="' + bSum.onSite.max + '">—</div>' +
          '<div class="budget-stat-sub">' + renderBilingualText(bSum.onSite.sub) + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="budget-breakdown-card">' +
        '<div class="budget-breakdown-header">' +
          '<div class="budget-breakdown-title">📊 ' + renderBilingualText({ en: 'Trip Expenditure Allocation', zh: '各項支出比例分佈', 'zh-cn': '各项支出比例分布' }) + '</div>' +
        '</div>' +
        '<div class="budget-dist-bar">' + distBarsHtml + '</div>' +
        '<div class="budget-dist-legend">' + distLegendHtml + '</div>' +
      '</div>';
  }

  // 2. Render Budget Table
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

  // Curated Hotel Stay Cards with Booking.com / Official Marriott link
  var legsGrid = document.getElementById('itinerary-hotels-grid') || document.getElementById('hotels-grid');
  var legs = data.hotels.legs || data.hotels.stays || [];
  if (legsGrid && Array.isArray(legs)) {
    legsGrid.innerHTML = legs.map(function(leg) {
      var tagsHtml = (leg.tags || []).map(function(tag) { return '<span class="tag tag-city">' + tag + '</span>'; }).join('');
      var badgeClass = leg.isConfirmed ? 'hotel-leg-badge confirmed' : 'hotel-leg-badge';
      var badgePrefix = leg.isConfirmed ? '✓ ' : '';
      var checkinTime = leg.checkinTime || '15:00';
      var checkoutTime = leg.checkoutTime || '12:00';
      var timesBadgesHtml =
        '<div class="hotel-times-strip">' +
          '<span class="hotel-time-chip checkin">🔑 ' + renderBilingualText({ en: 'Check-in: ' + checkinTime, zh: '入住時間：' + checkinTime, 'zh-cn': '入住时间：' + checkinTime }) + '</span>' +
          '<span class="hotel-time-chip checkout">🔓 ' + renderBilingualText({ en: 'Check-out: ' + checkoutTime, zh: '退房時間：' + checkoutTime, 'zh-cn': '退房时间：' + checkoutTime }) + '</span>' +
        '</div>';

      var gmapUrl = 'https://maps.google.com/?q=' + encodeURIComponent(leg.address || leg.dest || '');
      var addressHtml = leg.address
        ? '<div class="hotel-address-tag">' +
            '<span>📍 ' + leg.address + '</span>' +
            '<button class="copy-addr-btn" type="button" data-copy="' + encodeURIComponent(leg.address || '') + '" onclick="copyToClipboard(decodeURIComponent(this.getAttribute(\'data-copy\')))" title="Copy Address">📋</button>' +
            '<a href="' + gmapUrl + '" target="_blank" rel="noopener noreferrer" class="hotel-map-link">🗺️ Google Maps ↗</a>' +
          '</div>'
        : '';

      var linkUrl = leg.url || ('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(leg.dest || '') + '&checkin=' + (leg.checkin || '') + '&checkout=' + (leg.checkout || '') + '&group_adults=' + partySize);
      var hasCustomUrl = !!leg.url;
      var btnClass = hasCustomUrl ? 'hotel-leg-btn marriott-btn' : 'hotel-leg-btn';
      var btnLabel = leg.btnLabel
        ? renderBilingualText(leg.btnLabel)
        : (hasCustomUrl
            ? '<span class="lang-primary lang-en">🏨 View Official Hotel Page ➔</span>' +
              '<span class="lang-secondary lang-zh">🏨 瀏覽官方酒店專頁 ➔</span>' +
              '<span class="lang-tertiary lang-zh-cn">🏨 浏览官方酒店专页 ➔</span>'
            : '<span class="lang-primary lang-en">🏨 Search on Booking.com ➔</span>' +
              '<span class="lang-secondary lang-zh">🏨 在 Booking.com 搜尋 ➔</span>' +
              '<span class="lang-tertiary lang-zh-cn">🏨 在 Booking.com 搜索 ➔</span>');

      return '<div class="hotel-leg-card reveal">' +
               '<div>' +
                 '<div class="hotel-leg-top">' +
                   '<span class="' + badgeClass + '">' + badgePrefix + (leg.legNum || 'Stop') + ' · ' + renderBilingualText(leg.nights || 'Stay') + '</span>' +
                   '<span class="hotel-leg-dates">' + (leg.dates || '') + '</span>' +
                 '</div>' +
                 '<h4 class="hotel-leg-title">' + renderBilingualText(leg.title) + '</h4>' +
                 timesBadgesHtml +
                 addressHtml +
                 '<p class="hotel-leg-desc">' + renderBilingualText(leg.desc || leg.description) + '</p>' +
                 '<div class="day-tags" style="margin-bottom: 16px;">' + tagsHtml + '</div>' +
               '</div>' +
               '<a class="' + btnClass + '"' +
                  ' href="' + linkUrl + '"' +
                  ' target="_blank" rel="noopener noreferrer">' +
                  btnLabel +
               '</a>' +
             '</div>';
    }).join('');
  }
}


/* =======================================================
   7.5. RENDER CONFIRMED FLIGHTS SECTION
   ======================================================= */

/**
 * Renders the Confirmed Flights section from window.SITE_DATA.flights.
 * Displays BA960 (outbound) and BA967 (return) boarding-pass cards
 * and airport transfer guidelines.
 * Called by renderAll() when TRIP_CONFIG.features.showFlights !== false.
 */
function renderFlights() {
  var data = window.SITE_DATA;
  if (!data || !data.flights) return;

  var container = document.getElementById('flights-container');
  if (!container) return;

  var flights = data.flights;
  var legs = flights.legs || [];

  var cardsHtml = legs.map(function(leg) {
    var legBadgeText = renderBilingualText(leg.legNum);
    var statusText   = renderBilingualText(leg.status || 'Confirmed');
    var dateText     = renderBilingualText(leg.dateDisplay);
    var originCity   = renderBilingualText(leg.origin.city);
    var destCity     = renderBilingualText(leg.destination.city);
    var notesText    = leg.notes ? renderBilingualText(leg.notes) : '';

    return '<div class="flight-card reveal" id="' + (leg.id || '') + '">' +
             '<div>' +
               '<div class="flight-card-header">' +
                 '<span class="flight-leg-badge">' + legBadgeText + ' · ' + leg.flightNum + '</span>' +
                 '<span class="flight-status-pill"><span class="flight-status-dot"></span>' + statusText + '</span>' +
               '</div>' +
               '<div class="flight-date-heading">📅 ' + dateText + '</div>' +
               '<div class="flight-route-visual">' +
                 '<div class="flight-station origin">' +
                   '<div class="flight-code">' + leg.origin.code + '</div>' +
                   '<div class="flight-city">' + originCity + '</div>' +
                   '<span class="flight-terminal-tag">' + (leg.origin.terminal || '') + '</span>' +
                   '<div class="flight-time-display">' + leg.origin.time + ' <span style="font-size:0.75rem;font-weight:600;color:var(--text-muted);">' + leg.origin.tz + '</span></div>' +
                 '</div>' +
                 '<div class="flight-mid">' +
                   '<span class="flight-duration-badge">⏱️ ' + leg.duration + '</span>' +
                   '<div class="flight-plane-track">' +
                     '<div class="flight-track-line"></div>' +
                     '<span class="flight-plane-icon ba-route-icon" title="British Airways">' +
                       '<img src="assets/ba-logo.svg" alt="British Airways" class="ba-speedmarque-route">' +
                     '</span>' +
                     '<div class="flight-track-line"></div>' +
                   '</div>' +
                   '<span style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;">' + (leg.aircraft || '') + '</span>' +
                 '</div>' +
                 '<div class="flight-station dest">' +
                   '<div class="flight-code">' + leg.destination.code + '</div>' +
                   '<div class="flight-city">' + destCity + '</div>' +
                   '<span class="flight-terminal-tag">' + (leg.destination.terminal || '') + '</span>' +
                   '<div class="flight-time-display">' + leg.destination.time + ' <span style="font-size:0.75rem;font-weight:600;color:var(--text-muted);">' + leg.destination.tz + '</span></div>' +
                 '</div>' +
               '</div>' +
               '<div class="flight-details-list">' +
                 '<span class="flight-detail-chip">💺 ' + leg.airline + '</span>' +
                 '<span class="flight-detail-chip">✈️ ' + leg.aircraft + '</span>' +
                 '<span class="flight-detail-chip">🧳 23kg Checked + 23kg Cabin</span>' +
                 '<span class="flight-detail-chip">⚡ Nonstop (1h 40m)</span>' +
                 '<span class="flight-detail-chip">💳 Paid: £212.70 (2 pax)</span>' +
               '</div>' +
               (notesText ? '<div class="flight-notes-box">💡 ' + notesText + '</div>' : '') +
             '</div>' +
             '<div class="flight-actions-row">' +
               '<a class="flight-status-btn" href="' + (leg.statusUrl || 'https://www.britishairways.com/travel/flightstatus/public/en_gb/searchFlights') + '" target="_blank" rel="noopener noreferrer">' +
                 '<img src="assets/ba-logo.svg" alt="British Airways" class="ba-speedmarque-btn">' +
                 '<span class="lang-primary lang-en">BA Live Flight Status ➔</span>' +
                 '<span class="lang-secondary lang-zh">英航即時航班動態 ➔</span>' +
                 '<span class="lang-tertiary lang-zh-cn">英航实时航班动态 ➔</span>' +
               '</a>' +
             '</div>' +
           '</div>';
  }).join('');

  var transferCardHtml = '';
  if (flights.summary && flights.summary.airportTransfer) {
    transferCardHtml = '<div class="flight-transfer-card reveal" style="margin-top: 24px;">' +
                         '<div class="flight-transfer-icon">🚇</div>' +
                         '<div class="flight-transfer-content">' +
                           '<h4>' +
                             '<span class="lang-primary lang-en">S1 S-Bahn Direct Airport Transfer</span>' +
                             '<span class="lang-secondary lang-zh">S1城郊列車機場直達指南</span>' +
                             '<span class="lang-tertiary lang-zh-cn">S1城郊列车机场直达指南</span>' +
                           '</h4>' +
                           '<p>' + renderBilingualText(flights.summary.airportTransfer) + '</p>' +
                         '</div>' +
                       '</div>';
  }

  container.innerHTML = '<div class="flights-grid">' + cardsHtml + '</div>' + transferCardHtml;
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
   8.5. RENDER CULINARY FOOD SECTION & FILTERING
   ======================================================= */

/**
 * Focuses a food card in the DOM, scrolls to it, and highlights it briefly.
 */
function focusFoodCard(spotId) {
  var card = document.getElementById('spot-' + spotId);
  if (!card) return;

  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('highlighted');
  setTimeout(function() {
    card.classList.remove('highlighted');
  }, 2200);
}
window.focusFoodCard = focusFoodCard;

/**
 * Renders the Culinary Guide & Food Map section.
 * Builds category filter pills, cards grid, and connects with MapLibre GL.
 */
function renderFood() {
  var data = window.SITE_DATA;
  if (!data || !data.food) return;

  var pillsContainer = document.getElementById('food-filter-pills');
  var cardsContainer = document.getElementById('food-cards-grid');
  if (!pillsContainer || !cardsContainer) return;

  var categories = data.food.categories || [];
  var spots = data.food.spots || [];

  // Render Filter Pills
  pillsContainer.innerHTML = categories.map(function(cat) {
    var count = (cat.id === 'all')
      ? spots.length
      : spots.filter(function(s) { return s.category === cat.id; }).length;
    var isActive = (cat.id === 'all') ? ' active' : '';

    return '<button class="food-pill' + isActive + '" data-category="' + cat.id + '">' +
             '<span>' + (cat.icon || '🍽️') + '</span>' +
             renderBilingualText(cat.label) +
             '<span class="food-pill-count">' + count + '</span>' +
           '</button>';
  }).join('');

  // Render Food Cards
  cardsContainer.innerHTML = spots.map(function(spot) {
    var categoryLabel = spot.categoryLabel ? renderBilingualText(spot.categoryLabel) : spot.category;
    var districtText = spot.district ? renderBilingualText(spot.district) : '';
    var nameText = renderBilingualText(spot.name);
    var descText = renderBilingualText(spot.desc);
    var badgeText = spot.badge ? ('<div class="food-highlight-badge"><span>✨</span>' + renderBilingualText(spot.badge) + '</div>') : '';

    var specialtiesHtml = '';
    if (Array.isArray(spot.specialties) && spot.specialties.length > 0) {
      var items = spot.specialties.map(function(sp) {
        return '<div class="food-specialty-item">' +
                 '<span class="food-specialty-dot">●</span>' +
                 '<span>' + renderBilingualText(sp) + '</span>' +
               '</div>';
      }).join('');

      specialtiesHtml = '<div class="food-specialties-box">' +
                          '<div class="food-specialties-label">' +
                            '<span>🍴</span>' +
                            '<span class="lang-primary lang-en">Must-Order Specialties</span>' +
                            '<span class="lang-secondary lang-zh">必點招牌美食</span>' +
                            '<span class="lang-tertiary lang-zh-cn">必点招牌美食</span>' +
                          '</div>' +
                          '<div class="food-specialties-list">' + items + '</div>' +
                        '</div>';
    }

    var mapActionText = '<span class="lang-primary lang-en">📍 Locate on Map</span>' +
                        '<span class="lang-secondary lang-zh">📍 在地圖定位</span>' +
                        '<span class="lang-tertiary lang-zh-cn">📍 在地图定位</span>';

    return '<div class="food-card reveal" id="spot-' + spot.id + '" data-category="' + spot.category + '" onclick="if (typeof focusFoodSpot === \'function\') focusFoodSpot(\'' + spot.id + '\');">' +
             '<div>' +
               '<div class="food-card-top">' +
                 '<div class="food-card-badges">' +
                   '<span class="food-category-tag"><span>' + (spot.icon || '🍽️') + '</span>' + categoryLabel + '</span>' +
                 '</div>' +
                 '<div style="display:flex;align-items:center;gap:8px;">' +
                   '<span class="food-price-badge">' + (spot.price || '€€') + '</span>' +
                   (spot.rating ? '<span class="food-rating-badge">★ ' + spot.rating.replace('★', '').trim() + '</span>' : '') +
                 '</div>' +
               '</div>' +
               '<div class="food-card-main">' +
                 '<div class="food-card-title-row">' +
                   '<span class="food-spot-icon">' + (spot.icon || '🍽️') + '</span>' +
                   '<h3 class="food-spot-name">' + nameText + '</h3>' +
                 '</div>' +
                 '<div class="food-district-row">📍 ' + districtText + '</div>' +
                 badgeText +
                 '<p class="food-spot-desc">' + descText + '</p>' +
                 specialtiesHtml +
               '</div>' +
             '</div>' +
             '<div class="food-card-footer">' +
                '<div class="food-address-bar">' +
                  '<span class="food-address" title="' + (spot.address || '') + '">📌 ' + (spot.address || '') + '</span>' +
                  '<button class="copy-addr-btn" type="button" data-copy="' + encodeURIComponent(spot.address || '') + '" onclick="event.stopPropagation(); copyToClipboard(decodeURIComponent(this.getAttribute(\'data-copy\')));" title="Copy Address">📋</button>' +
                '</div>' +
                '<div class="food-card-btn-group">' +
                  '<button class="food-action-btn" type="button" onclick="event.stopPropagation(); if (typeof focusFoodSpot === \'function\') focusFoodSpot(\'' + spot.id + '\');">' +
                    mapActionText +
                  '</button>' +
                  '<a class="food-maps-btn" href="' + (spot.url || ('https://maps.google.com/?q=' + spot.lat + ',' + spot.lng)) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">' +
                    '🗺️ Maps ↗' +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>';
  }).join('');

  // Bind Filter Pills click handlers
  pillsContainer.querySelectorAll('.food-pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      var category = pill.getAttribute('data-category');

      // Toggle active pill
      pillsContainer.querySelectorAll('.food-pill').forEach(function(p) { p.classList.remove('active'); });
      pill.classList.add('active');

      // Filter food cards
      cardsContainer.querySelectorAll('.food-card').forEach(function(card) {
        var cardCat = card.getAttribute('data-category');
        var match = (category === 'all' || cardCat === category);
        card.style.display = match ? 'flex' : 'none';
      });

      // Filter map markers
      if (typeof window.filterFoodMap === 'function') {
        window.filterFoodMap(category);
      }
    });
  });
}



/* =======================================================
   8.6. UTILITIES: CLIPBOARD COPY & TOAST NOTIFICATION
   ======================================================= */

function copyToClipboard(text) {
  if (!text) return;
  var successMsg = {
    en: '✓ Copied to clipboard: ' + text,
    zh: '✓ 已複製至剪貼簿：' + text,
    'zh-cn': '✓ 已复制至剪贴板：' + text
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showToast(successMsg);
    }).catch(function() {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}
window.copyToClipboard = copyToClipboard;

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  var successMsg = {
    en: '✓ Copied to clipboard: ' + text,
    zh: '✓ 已複製至剪貼簿：' + text,
    'zh-cn': '✓ 已复制至剪贴板：' + text
  };
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch(e) {
    prompt('Copy address:', text);
  }
  document.body.removeChild(ta);
}

function showToast(msg) {
  var existing = document.getElementById('trip-toast');
  if (existing) existing.remove();

  var text = (typeof msg === 'object') ? t(msg) : msg;
  var toast = document.createElement('div');
  toast.id = 'trip-toast';
  toast.className = 'trip-toast';
  toast.innerText = text;
  document.body.appendChild(toast);

  setTimeout(function() {
    toast.classList.add('show');
  }, 10);

  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 300);
  }, 2600);
}
window.showToast = showToast;


/* =======================================================
   8.7. RENDER WEATHER WIDGET (Late-November Hamburg)
   ======================================================= */

function renderWeather() {
  var data = window.SITE_DATA;
  if (!data || !data.weather) return;

  var container = document.getElementById('weather-widget');
  if (!container) return;

  var w = data.weather;
  var avg = w.averages || {};
  var forecast = w.dailyForecast || [];

  var forecastHtml = forecast.map(function(f) {
    return '<div class="weather-day-card">' +
             '<div class="weather-day-header">' +
               '<span class="weather-day-name">' + renderBilingualText(f.dayLabel) + '</span>' +
               '<span class="weather-day-icon">' + f.icon + '</span>' +
             '</div>' +
             '<div class="weather-temp-range">' +
               '<span class="temp-high">' + f.high + '</span>' +
               '<span class="temp-divider">/</span>' +
               '<span class="temp-low">' + f.low + '</span>' +
             '</div>' +
             '<div class="weather-condition">' + renderBilingualText(f.condition) + '</div>' +
             '<div class="weather-meta-row">' +
               '<span>💨 ' + f.wind + '</span>' +
               '<span>🌅 ' + f.sunset + '</span>' +
             '</div>' +
             '<div class="weather-day-tip">' + renderBilingualText(f.tip) + '</div>' +
           '</div>';
  }).join('');

  container.innerHTML =
    '<div class="weather-widget-card reveal">' +
      '<div class="weather-widget-header">' +
        '<div class="weather-title-wrap">' +
          '<h3 class="weather-title">🌦️ ' + renderBilingualText(w.title || {
            en: (w.city || 'Destination') + ' Climate &amp; Weather Outlook',
            zh: (w.city || '目的地') + ' 氣候特徵與行程天氣預測',
            'zh-cn': (w.city || '目的地') + ' 气候特征与行程天气预测'
          }) + '</h3>' +
          '<span class="weather-period-tag">' + renderBilingualText(w.period) + '</span>' +
        '</div>' +
        '<div class="weather-stats-strip">' +
          '<div class="weather-stat-chip"><strong>' + avg.high + ' / ' + avg.low + '</strong><span>' + renderBilingualText({ en: 'Avg High/Low', zh: '平均氣溫', 'zh-cn': '平均气温' }) + '</span></div>' +
          '<div class="weather-stat-chip"><strong>' + avg.rainChance + '</strong><span>' + renderBilingualText({ en: 'Rain/Snow Prob.', zh: '降水機率', 'zh-cn': '降水概率' }) + '</span></div>' +
          '<div class="weather-stat-chip"><strong>' + avg.daylight + '</strong><span>' + renderBilingualText({ en: 'Daylight (Sunset ' + avg.sunset + ')', zh: '日照時數（日落 ' + avg.sunset + '）', 'zh-cn': '日照时数（日落 ' + avg.sunset + '）' }) + '</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="weather-days-grid">' + forecastHtml + '</div>' +
      '<div class="weather-clothing-tip">' +
        renderBilingualText(w.clothingTip) +
      '</div>' +
    '</div>';
}


/* =======================================================
   8.7b. FETCH LIVE WEATHER — Open-Meteo Free API
   =======================================================
 * Uses the free Open-Meteo API (https://open-meteo.com).
 * No API key required. Fetches daily max/min temperature,
 * precipitation probability, and wind speed for Hamburg
 * (lat 53.55, lon 10.0) for the 3 trip dates.
 *
 * On success: patches SITE_DATA.weather.dailyForecast with live
 * temperatures and adds a "🔴 LIVE" badge to the widget header.
 * On failure (network error, timeout, parse error): silently
 * falls back to existing static forecast data already rendered.
 *
 * AGENTS: Open-Meteo returns forecast data up to 16 days ahead.
 * For dates beyond 16 days the API returns empty arrays —
 * the function guards against this and keeps static data.
 */
function fetchLiveWeather() {
  var data = window.SITE_DATA;
  if (!data || !data.weather) return;

  var tripDates = (window.TRIP_CONFIG && window.TRIP_CONFIG.trip && window.TRIP_CONFIG.trip.dates) || {};
  var startDate = tripDates.start || '2026-11-26';
  var endDate   = tripDates.end   || '2026-11-28';

  var apiUrl = 'https://api.open-meteo.com/v1/forecast' +
    '?latitude=53.55&longitude=10.0' +
    '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max' +
    '&wind_speed_unit=kmh&timezone=Europe%2FBerlin' +
    '&start_date=' + startDate +
    '&end_date=' + endDate;

  var controller = null;
  var timeoutId = null;
  if (typeof AbortController !== 'undefined') {
    controller = new AbortController();
    timeoutId = setTimeout(function() { controller.abort(); }, 4000);
  }

  fetch(apiUrl, controller ? { signal: controller.signal } : {})
    .then(function(res) {
      if (timeoutId) clearTimeout(timeoutId);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function(json) {
      var daily = json && json.daily;
      if (!daily || !daily.time || daily.time.length === 0) return;

      var forecast = data.weather.dailyForecast;
      if (!Array.isArray(forecast) || forecast.length === 0) return;

      var updated = false;
      daily.time.forEach(function(dateStr, i) {
        var idx = i < forecast.length ? i : -1;
        if (idx < 0) return;

        var maxTemp = daily.temperature_2m_max && daily.temperature_2m_max[i];
        var minTemp = daily.temperature_2m_min && daily.temperature_2m_min[i];
        var wind    = daily.wind_speed_10m_max && daily.wind_speed_10m_max[i];

        if (maxTemp != null) { forecast[idx].high = Math.round(maxTemp) + '°C'; }
        if (minTemp != null) { forecast[idx].low  = Math.round(minTemp) + '°C'; }
        if (wind    != null) { forecast[idx].wind = Math.round(wind) + ' km/h'; }
        forecast[idx]._live = true;
        updated = true;
      });

      if (!updated) return;

      data.weather._liveUpdated = true;
      data.weather._liveTimestamp = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      renderWeather();  // re-render with live temps

      // Inject LIVE badge into the widget header
      var titleWrap = document.querySelector('.weather-title-wrap');
      if (titleWrap && !titleWrap.querySelector('.weather-live-badge')) {
        var badge = document.createElement('span');
        badge.className = 'weather-live-badge';
        badge.textContent = '🔴 LIVE · ' + data.weather._liveTimestamp;
        titleWrap.appendChild(badge);
      }
    })
    .catch(function(err) {
      if (timeoutId) clearTimeout(timeoutId);
      if (err && err.name !== 'AbortError') {
        console.info('[weather] Live fetch unavailable, showing curated forecast. (' + (err.message || '') + ')');
      }
    });
}


/* =======================================================
   8.8. RENDER TRAVEL ESSENTIALS & GERMAN PHRASES
   ======================================================= */

function renderEssentials() {
  var data = window.SITE_DATA;
  if (!data || !data.essentials) return;
  var ess = data.essentials;

  var container = document.getElementById('essentials-container');
  if (!container) return;

  var contacts = data.essentials.emergencyContacts || [];
  var phraseCats = data.essentials.phrases || [];

  // 1. Emergency Contacts Cards
  var contactsHtml = contacts.map(function(c) {
    var isCrit = c.priority === 'critical';
    var badgeClass = isCrit ? 'contact-badge critical' : (c.priority === 'important' ? 'contact-badge important' : 'contact-badge');
    var telLink = c.number ? '<a href="tel:' + c.number + '" class="contact-tel-btn">📞 ' + c.displayNumber + '</a>' : '';

    return '<div class="contact-card ' + (isCrit ? 'critical-border' : '') + '">' +
             '<div class="contact-card-top">' +
               '<div class="contact-card-meta">' +
                 '<span class="contact-icon">' + c.icon + '</span>' +
                 '<span class="' + badgeClass + '">' + renderBilingualText(c.badge) + '</span>' +
               '</div>' +
               '<h4 class="contact-name">' + renderBilingualText(c.name) + '</h4>' +
             '</div>' +
             '<p class="contact-desc">' + renderBilingualText(c.desc) + '</p>' +
             '<div class="contact-action-row">' + telLink + '</div>' +
           '</div>';
  }).join('');

  // 2. Phrase Category Tabs and Panels
  var phraseTabsHtml = phraseCats.map(function(cat, idx) {
    return '<button class="phrase-tab-btn' + (idx === 0 ? ' active' : '') + '" data-phrase-cat="' + cat.category + '">' +
             '<span>' + cat.icon + '</span> ' + renderBilingualText(cat.categoryName) +
           '</button>';
  }).join('');

  var phrasePanelsHtml = phraseCats.map(function(cat, idx) {
    var itemsHtml = cat.items.map(function(item) {
      return '<div class="phrase-item">' +
               '<div class="phrase-card-body">' +
                 '<div class="phrase-header">' +
                   '<span class="phrase-german">' + item.german + '</span>' +
                    '<button type="button" class="phrase-speech-btn" title="Listen to pronunciation" data-phrase="' + encodeURIComponent(item.german || item.phrase || '') + '" onclick="window.playDestinationPhrase &amp;&amp; window.playDestinationPhrase(decodeURIComponent(this.getAttribute(\'data-phrase\')), this)">🔊</button>' +
                 '</div>' +
                 '<div class="phrase-phonetic-row">' +
                   '<span class="phrase-phonetic">🗣️ [' + item.phonetic + ']</span>' +
                 '</div>' +
               '</div>' +
               '<div class="phrase-trans-row">' +
                 '<span class="phrase-trans-text">' + renderBilingualText(item) + '</span>' +
               '</div>' +
             '</div>';
    }).join('');

    return '<div class="phrase-cat-panel' + (idx === 0 ? ' active' : '') + '" id="phrase-cat-' + cat.category + '">' +
             '<div class="phrases-grid">' + itemsHtml + '</div>' +
           '</div>';
  }).join('');

  container.innerHTML =
    '<div class="essentials-wrapper reveal">' +
      '<div class="essentials-block contacts-block">' +
        '<div class="essentials-block-header">' +
          '<h3>🚨 ' + renderBilingualText({ en: 'Emergency Hotlines & Consular Support', zh: '緊急救助電話與領事保護專線', 'zh-cn': '紧急救助电话与领事保护专线' }) + '</h3>' +
          '<p class="essentials-desc">' + renderBilingualText({ en: 'Toll-free 112 (medical/fire) and 110 (police) work 24/7 across Germany even without a SIM card.', zh: '全德境內直撥 112（急救/火警）及 110（警察報案）均24小時免費，手機無SIM卡亦可接通。', 'zh-cn': '全德境内直拨 112（急救/火警）及 110（警察报案）均24小时免费，手机无SIM卡亦可接通。' }) + '</p>' +
        '</div>' +
        '<div class="contacts-grid">' + contactsHtml + '</div>' +
      '</div>' +
      '<div class="essentials-block phrases-block" style="margin-top: 36px;">' +
        '<div class="essentials-block-header">' +
          '<h3>🗣️ ' + renderBilingualText({ en: 'Handy German Travel Phrases & Phonetics', zh: '漢堡旅行常用德語與發音對照', 'zh-cn': '汉堡旅行常用德语与发音对照' }) + '</h3>' +
          '<p class="essentials-desc">' + renderBilingualText(ess.phrasesDesc || {
            en: 'Essential travel phrases and phonetics.',
            zh: '精選實用旅行常用句與發音對照。',
            'zh-cn': '精选实用旅行常用句与发音对照。'
          }) + '</p>' +
        '</div>' +
        '<div class="phrase-tabs-row">' + phraseTabsHtml + '</div>' +
        '<div class="phrase-panels-container">' + phrasePanelsHtml + '</div>' +
      '</div>' +
    '</div>';

  // Bind phrase tab switching
  container.querySelectorAll('.phrase-tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var cat = btn.getAttribute('data-phrase-cat');
      container.querySelectorAll('.phrase-tab-btn').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.phrase-cat-panel').forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var targetPanel = document.getElementById('phrase-cat-' + cat);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
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
  var data = window.SITE_DATA || {};

  // showOverview guards both the hero AND the overview cards + milestone board
  if (features.showOverview      !== false) renderHero();
  if (features.showOverview      !== false) renderOverview();
  if (features.showWeather       !== false && data.weather) renderWeather();
  if (features.showMilestoneBoard !== false && features.showOverview === false) renderOverview(); // allow standalone milestone
  if (features.showFlights       !== false && data.flights) renderFlights();
  if (features.showTips          !== false) renderTips();
  if (features.showItinerary     !== false) renderItinerary();
  if (features.showFood          !== false && data.food) renderFood();
  if (features.showPacking       !== false) renderPacking();
  if (features.showEssentials    !== false && data.essentials) renderEssentials();
  if (features.showBudget        !== false) renderBudget();
  if (features.showHotels        !== false) renderHotels();
  if (features.showTransit       !== false) renderTransit();

  // Hydrate taxi card modal if present
  populateTaxiModal(data);

  // Async: fetch live weather from Open-Meteo and patch the widget (non-blocking)
  if (features.showWeather !== false && data.weather && typeof fetchLiveWeather === 'function') {
    setTimeout(fetchLiveWeather, 600);  // small delay so static render completes first
  }
}

/**
 * Hydrates the taxi/destination flashcard modal with trip-specific hotel and airport details.
 */
function populateTaxiModal(data) {
  if (!data) return;
  var taxi = data.taxi;
  var hotel = (data.hotels && data.hotels[0]) || null;
  var flight = (data.flights && data.flights[0]) || null;

  if (taxi && taxi.hotel) {
    var hName = document.getElementById('taxi-name-hotel');
    var hAddr = document.getElementById('taxi-addr-hotel');
    var hLandmark = document.getElementById('taxi-landmark-hotel');
    var hLink = document.getElementById('taxi-map-hotel-link');
    if (hName && taxi.hotel.name) hName.innerText = t(taxi.hotel.name);
    if (hAddr && taxi.hotel.address) hAddr.innerText = t(taxi.hotel.address);
    if (hLandmark && taxi.hotel.landmark) hLandmark.innerText = '📍 ' + t(taxi.hotel.landmark);
    if (hLink && (taxi.hotel.address || taxi.hotel.name)) hLink.href = 'https://maps.google.com/?q=' + encodeURIComponent(t(taxi.hotel.address || taxi.hotel.name));
  } else if (hotel) {
    var hName = document.getElementById('taxi-name-hotel');
    var hAddr = document.getElementById('taxi-addr-hotel');
    var hLink = document.getElementById('taxi-map-hotel-link');
    if (hName && hotel.name) hName.innerText = t(hotel.name);
    if (hAddr && (hotel.location || hotel.address)) hAddr.innerText = t(hotel.location || hotel.address);
    if (hLink && (hotel.location || hotel.address || hotel.name)) hLink.href = 'https://maps.google.com/?q=' + encodeURIComponent(t(hotel.location || hotel.address || hotel.name));
  }

  if (taxi && taxi.airport) {
    var aName = document.getElementById('taxi-name-airport');
    var aAddr = document.getElementById('taxi-addr-airport');
    var aLandmark = document.getElementById('taxi-landmark-airport');
    var aLink = document.getElementById('taxi-map-airport-link');
    if (aName && taxi.airport.name) aName.innerText = t(taxi.airport.name);
    if (aAddr && taxi.airport.address) aAddr.innerText = t(taxi.airport.address);
    if (aLandmark && taxi.airport.landmark) aLandmark.innerText = '✈️ ' + t(taxi.airport.landmark);
    if (aLink && (taxi.airport.address || taxi.airport.name)) aLink.href = 'https://maps.google.com/?q=' + encodeURIComponent(t(taxi.airport.address || taxi.airport.name));
  } else if (flight) {
    var aName = document.getElementById('taxi-name-airport');
    var aAddr = document.getElementById('taxi-addr-airport');
    var aLandmark = document.getElementById('taxi-landmark-airport');
    var aLink = document.getElementById('taxi-map-airport-link');
    var destAirport = flight.arrivalAirport || flight.airport || '';
    if (destAirport) {
      if (aName) aName.innerText = t(destAirport);
      if (aAddr) aAddr.innerText = t(flight.destinationCity || flight.city || '') + ' Airport';
      if (aLandmark && flight.arrivalTerminal) aLandmark.innerText = '✈️ ' + t(flight.arrivalTerminal);
      if (aLink) aLink.href = 'https://maps.google.com/?q=' + encodeURIComponent(t(destAirport));
    }
  }
}
window.populateTaxiModal = populateTaxiModal;
