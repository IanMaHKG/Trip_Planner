/**
 * @file render.js
 * @description CORE RENDER ENGINE — Trip Planner template.
 * Injects structured data from TRIP_CONFIG, SITE_DATA, and ITINERARY_DATA
 * into the semantic HTML template shell with complete multilingual support.
 */

/* ── Helper: Extract Multilingual String ── */
function t(obj, fallback = '') {
  if (!obj) return fallback;
  if (typeof obj === 'string') return obj;

  const isZh = document.body.classList.contains('lang-secondary') || document.body.classList.contains('lang-zh');
  if (isZh && obj.zh) return obj.zh;
  if (obj.en) return obj.en;
  return Object.values(obj)[0] || fallback;
}

function renderBilingualText(obj, className = '') {
  if (!obj) return '';
  if (typeof obj === 'string') return `<span class="${className}">${obj}</span>`;

  const en = obj.en || obj.zh || '';
  const zh = obj.zh || obj.en || '';

  return `
    <span class="lang-en ${className}">${en}</span>
    <span class="lang-zh ${className}">${zh}</span>
  `;
}

/* ═══════════════════════════════════════════════════
   1. RENDER HERO
   ═══════════════════════════════════════════════════ */
function renderHero() {
  const config = window.TRIP_CONFIG;
  if (!config || !config.trip) return;

  const trip = config.trip;

  // Eyebrow
  const eyebrowEl = document.getElementById('hero-eyebrow-container') || document.getElementById('hero-eyebrow');
  if (eyebrowEl && trip.eyebrow) {
    eyebrowEl.innerHTML = renderBilingualText(trip.eyebrow, 'hero-eyebrow');
  }

  // Title
  const titleEl = document.getElementById('hero-title-container') || document.getElementById('hero-title');
  if (titleEl && trip.title) {
    titleEl.innerHTML = `
      <h1 class="hero-title">
        <span class="title-line accent">${renderBilingualText(trip.title)}</span>
        <span class="title-line year">${trip.year || ''}</span>
      </h1>
    `;
  }

  // Subtitle
  const subEl = document.getElementById('hero-subtitle-container') || document.getElementById('hero-subtitle');
  if (subEl && trip.subtitle) {
    subEl.innerHTML = renderBilingualText(trip.subtitle, 'hero-subtitle');
  }

  // Badges
  const badgesEl = document.getElementById('hero-badges-container') || document.getElementById('hero-badges');
  if (badgesEl) {
    let badges = trip.heroBadges;
    if (!badges || !Array.isArray(badges)) {
      badges = [
        { icon: '📅', text: trip.dates?.display || { en: 'Scheduled Tour', zh: '已排定行程' } },
        { icon: '👥', text: { en: `${config.party?.size || 2} Travelers`, zh: `${config.party?.size || 2} 位旅客` } },
        { icon: '📍', text: trip.destination || { en: 'Multi-City', zh: '多城漫遊' } }
      ];
    }
    badgesEl.innerHTML = badges.map(b => `
      <div class="badge">
        <span>${b.icon || '📍'}</span>
        ${renderBilingualText(b.text)}
      </div>
    `).join('');
  }
}

/* ═══════════════════════════════════════════════════
   2. RENDER OVERVIEW CARDS & ROUTE MILESTONE BOARD
   ═══════════════════════════════════════════════════ */
function renderOverview() {
  const data = window.SITE_DATA;
  if (!data) return;

  // Overview Cards
  const cardsEl = document.getElementById('overview-cards-container') || document.getElementById('overview-grid');
  const cards = (data.overview && Array.isArray(data.overview.cards)) ? data.overview.cards : (Array.isArray(data.overview) ? data.overview : null);

  if (cardsEl && cards) {
    cardsEl.innerHTML = cards.map(c => `
      <div class="card overview-card reveal" id="${c.id || ''}">
        <div class="overview-icon">${c.icon || '📌'}</div>
        <div class="overview-info">
          <h3>${renderBilingualText(c.title)}</h3>
          <p>${renderBilingualText(c.desc || c.description)}</p>
        </div>
      </div>
    `).join('');
  }

  // Journey Route Milestone Board
  const boardEl = document.getElementById('route-board-mount') || document.getElementById('route-board');
  const rb = (data.overview && data.overview.routeBoard) || data.routeBoard;
  const stops = (data.overview && data.overview.routeStops) || (rb && rb.stops) || data.routeStops;
  const cfg = window.TRIP_CONFIG || {};

  const activeTransitStyle = (cfg.routeBoardStyle) || (rb && rb.style) || (cfg.theme && cfg.theme.routeBoardStyle) || 'swiss-train';

  if (boardEl && stops && stops.length > 0) {
    const numStops = stops.length;
    const hasColors = stops.some(s => s.color);
    const gradientStops = hasColors
      ? stops.map((s, idx) => `${s.color || 'var(--accent-primary)'} ${Math.round((idx / (numStops - 1)) * 100)}%`).join(', ')
      : '';
    const lineStyle = gradientStops ? `background: linear-gradient(90deg, ${gradientStops});` : '';

    // Style badge text
    let badgeText = (rb && rb.badge) ? rb.badge : '';
    if (!badgeText) {
      if (activeTransitStyle === 'swiss-train') badgeText = '🇨🇭 SBB · CFF · FFS';
      else if (activeTransitStyle === 'jr-rail') badgeText = '🇯🇵 JR · LINE';
      else if (activeTransitStyle === 'london-underground') badgeText = '🔴 UNDERGROUND';
      else if (activeTransitStyle === 'hong-kong-mtr') badgeText = 'Ж MTR';
      else if (activeTransitStyle === 'new-york-subway') badgeText = 'MTA SUBWAY';
      else badgeText = 'TRANSIT ROUTE';
    }

    const lineTitle = (rb && (rb.lineTitle || rb.title)) || { en: 'Journey Route', zh: '行程全景路線' };
    const direction = (rb && rb.direction) || '';

    boardEl.innerHTML = `
      <div class="route-board-container reveal" data-transit-style="${activeTransitStyle}">
        <div class="route-board-header">
          <div class="route-branding">
            <span class="route-type-badge transit-badge">${badgeText}</span>
            <h3 class="route-line-title">${renderBilingualText(lineTitle)}</h3>
          </div>

          <div class="route-direction">
            ${direction ? renderBilingualText(direction) : ''}
            <span class="arrow">➔</span>
          </div>
        </div>

        <div class="route-track-wrap" style="--stops-count: ${numStops};">
          <div class="route-stops-list" style="--stops-count: ${numStops};">
            <div class="route-line-bar" style="${lineStyle}"></div>
            ${stops.map((s, idx) => {
              const codePrefix = s.label || s.code || '';
              const codeNum = s.number || s.code || ('0' + (idx + 1));
              const dotColor = s.color || 'var(--accent-primary)';
              const daysBadge = s.days || s.daysBadge || { en: `Stop ${idx + 1}`, zh: `第 ${idx + 1} 站` };

              const enTitle = s.nameEn || s.nameNative || (s.name && s.name.en) || s.nameRomaji || '';
              const zhTitle = s.nameZh || (s.name && s.name.zh) || s.nameNative || enTitle;

              const enSub = s.nameRomaji || (s.name && s.name.en) || s.nameEn || '';
              const zhSub = (s.name && s.name.zh) || s.nameZh || s.nameRomaji || enSub;

              return `
                <div class="route-stop-item" data-stop="${s.label || s.code || idx}">
                  <div class="route-stop-top">
                    <div class="stop-code-badge" style="--code-color: ${dotColor};">
                      <span class="code-prefix">${codePrefix}</span>
                      <span class="code-num">${codeNum}</span>
                    </div>
                  </div>

                  <div class="route-stop-dot-wrap">
                    <div class="stop-dot" style="--dot-color: ${dotColor};">
                      <span class="dot-inner-core"></span>
                    </div>
                  </div>

                  <div class="route-stop-bottom">
                    <div class="stop-name-native">${renderBilingualText({ en: enTitle, zh: zhTitle })}</div>
                    <div class="stop-name-romaji">${renderBilingualText({ en: enSub, zh: zhSub })}</div>
                    <div class="stop-days-badge">${renderBilingualText(daysBadge)}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Trip Profile Grid (if element exists)
  const profileGrid = document.getElementById('profile-grid');
  if (profileGrid && cfg.party) {
    const party = cfg.party;
    const members = party.members || [];
    profileGrid.innerHTML = `
      <div class="card profile-item-card">
        <h4>👥 <span class="lang-en">Travelers</span><span class="lang-zh lang-secondary">成員人數</span></h4>
        <p><strong>${party.size || 2} Adults</strong></p>
        <p style="font-size:0.85rem; color:var(--text-secondary);">${members.map(m => m.name || m.role || '').filter(Boolean).join(', ')}</p>
      </div>
      <div class="card profile-item-card">
        <h4>🛂 <span class="lang-en">Passports & Entry</span><span class="lang-zh lang-secondary">護照與簽證</span></h4>
        <p><strong>${party.visaStatus ? renderBilingualText(party.visaStatus) : '90-Day Visa Free'}</strong></p>
      </div>
      <div class="card profile-item-card">
        <h4>🚗 <span class="lang-en">Driver & Transit</span><span class="lang-zh lang-secondary">駕駛資格與通票</span></h4>
        <p><strong>${party.drivingLicence ? renderBilingualText(party.drivingLicence) : 'National Rail / Transit Ready'}</strong></p>
      </div>
    `;
  }
}

/* ═══════════════════════════════════════════════════
   3. RENDER PRACTICAL TIPS & EMERGENCY BANNER
   ═══════════════════════════════════════════════════ */
function renderTips() {
  const data = window.SITE_DATA;
  if (!data) return;

  const container = document.getElementById('tips-grid-container') || document.getElementById('tips-grid');
  const tips = Array.isArray(data.tips) ? data.tips : (data.tips && Array.isArray(data.tips.categories) ? data.tips.categories : null);

  if (container && tips) {
    container.innerHTML = tips.map(tip => `
      <div class="tip-card reveal" id="${tip.id || ''}">
        <div class="tip-header">
          <span class="tip-icon">${tip.icon || '💡'}</span>
          <h3 class="tip-title">${renderBilingualText(tip.title)}</h3>
        </div>
        <ul class="tip-list">
          ${(tip.items || []).map(item => {
            if (typeof item === 'object' && item.title && item.desc) {
              return `<li><strong>${renderBilingualText(item.title)}:</strong> ${renderBilingualText(item.desc)}</li>`;
            }
            return `<li>${renderBilingualText(item)}</li>`;
          }).join('')}
        </ul>
      </div>
    `).join('');
  }

  // Emergency Banner (if container exists)
  const emEl = document.getElementById('emergency-banner');
  if (emEl && data.emergency && Array.isArray(data.emergency.contacts)) {
    emEl.innerHTML = `
      <div class="emergency-banner-inner" style="background: rgba(235, 34, 38, 0.08); border: 1.5px solid rgba(235, 34, 38, 0.3); border-radius: var(--radius-lg); padding: 20px 24px; margin-top: 24px; display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.8rem;">🚨</span>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #EB2226; margin: 0;"><span class="lang-en">Emergency Hotlines</span><span class="lang-zh lang-secondary">緊急求助熱線</span></h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 2px 0 0;"><span class="lang-en">Keep these numbers saved on your phone</span><span class="lang-zh lang-secondary">建議將熱線電話預先儲存至手機通訊錄</span></p>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 14px;">
          ${data.emergency.contacts.map(c => `
            <a href="tel:${c.number.replace(/[^0-9+]/g, '')}" style="display: inline-flex; align-items: center; gap: 8px; background: var(--bg-card); border: 1px solid var(--border-mid); padding: 8px 14px; border-radius: var(--radius-pill); font-size: 0.85rem; font-weight: 700; color: var(--text-primary); text-decoration: none;">
              <span>📞 ${c.number}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">(${renderBilingualText(c.label)})</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }
}

/* ═══════════════════════════════════════════════════
   4. RENDER ITINERARY (DAY TIMELINE & ACCORDIONS)
   ═══════════════════════════════════════════════════ */
function renderItinerary() {
  const itinerary = window.ITINERARY_DATA;
  if (!Array.isArray(itinerary)) return;

  const container = document.getElementById('itinerary-timeline-container') || document.getElementById('itinerary-list');
  if (!container) return;

  container.innerHTML = itinerary.map((day, index) => {
    const isFirst = index === 0;
    return `
      <div class="day-card reveal${isFirst ? ' open' : ''}" id="${day.id}" data-region="${day.region || 'all'}">
        <div class="day-header" onclick="toggleDayAccordion('${day.id}')">
          <div class="day-header-left">
            <span class="day-number-badge">DAY ${day.dayNum || (index + 1)}</span>
            <div class="day-header-title-wrap">
              <div class="day-date-label">${day.date || ''}</div>
              <div class="day-main-title">${renderBilingualText(day.title)}</div>
            </div>
          </div>
          <div class="day-header-right">
            <div class="day-tags">
              ${(day.tags || []).map(t => {
                const tagClass = `tag-${t.type || 'city'}`;
                const tagContent = (t && typeof t.text === 'object') ? renderBilingualText(t.text) : (t.en || t.zh ? renderBilingualText(t) : (t.text || ''));
                return `<span class="tag ${tagClass}">${tagContent}</span>`;
              }).join('')}
            </div>
            <div class="day-chevron">▼</div>
          </div>
        </div>

        <div class="day-body">
          <div class="day-slots">
            ${(day.blocks || []).map(block => `
              <div class="time-slot">
                <div class="time-label-wrap">
                  <span class="time-slot-label">${renderBilingualText(block.time)}</span>
                </div>
                <div class="time-slot-content">
                  <h4 class="activity-title">${renderBilingualText(block.activity.title)}</h4>
                  <p class="activity-desc">${renderBilingualText(block.activity.desc)}</p>
                  ${(block.location || block.transport) ? `
                    <div class="activity-meta-pills" style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                      ${block.location ? `
                        <span class="badge" style="font-size: 0.78rem; padding: 3px 8px;">
                          📍 ${renderBilingualText(block.location.name || block.location)}
                        </span>
                      ` : ''}
                      ${block.transport ? `
                        <span class="badge" style="font-size: 0.78rem; padding: 3px 8px;">
                          ${block.transport.icon || '🚆'} ${renderBilingualText(block.transport.text || block.transport)}
                        </span>
                      ` : ''}
                    </div>
                  ` : ''}
                  ${block.activity.meal ? `
                    <div class="activity-meal">
                      <span>${block.activity.meal.icon || '🍽️'}</span>
                      <div>${renderBilingualText(block.activity.meal)}</div>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          ${day.tip ? `
            <div class="day-pro-tip">
              💡 <strong>${renderBilingualText({ en: "Pro Tip:", zh: "實用貼士：" })}</strong>
              ${renderBilingualText(day.tip)}
            </div>
          ` : ''}

          <div class="day-mini-map-container" id="minimap-${day.id}"></div>
        </div>
      </div>
    `;
  }).join('');
}

/* ═══════════════════════════════════════════════════
   5. RENDER PACKING CHECKLIST
   ═══════════════════════════════════════════════════ */
function renderPacking() {
  const data = window.SITE_DATA;
  if (!data) return;

  const container = document.getElementById('packing-grid-container') || document.getElementById('packing-grid');
  if (!container) return;

  const packingList = Array.isArray(data.packing) ? data.packing : (Array.isArray(data.packingList) ? data.packingList : null);
  if (!packingList) return;

  const savedChecks = JSON.parse(localStorage.getItem('trip-packing-state') || '{}');

  container.innerHTML = packingList.map(cat => `
    <div class="packing-category-card reveal">
      <div class="packing-category-header">
        <span class="packing-category-icon">${cat.icon || '🧳'}</span>
        <h3 class="packing-category-title">${renderBilingualText(cat.title)}</h3>
      </div>
      <div class="packing-items-list">
        ${(cat.items || []).map((item, idx) => {
          const itemId = item.id || `pack-${cat.icon || 'item'}-${idx}`;
          const isChecked = !!savedChecks[itemId];
          return `
            <label class="packing-item${isChecked ? ' checked' : ''}" data-item-id="${itemId}">
              <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="togglePackingItem('${itemId}', this)">
              <span class="packing-item-text">${renderBilingualText(item)}</span>
            </label>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function togglePackingItem(itemId, checkbox) {
  const savedChecks = JSON.parse(localStorage.getItem('trip-packing-state') || '{}');
  savedChecks[itemId] = checkbox.checked;
  localStorage.setItem('trip-packing-state', JSON.stringify(savedChecks));

  const parent = checkbox.closest('.packing-item');
  if (parent) {
    parent.classList.toggle('checked', checkbox.checked);
  }
}

/* ═══════════════════════════════════════════════════
   6. RENDER BUDGET ESTIMATES
   ═══════════════════════════════════════════════════ */
function renderBudget() {
  const data = window.SITE_DATA;
  if (!data || !data.budget) return;

  const tbody = document.getElementById('budget-tbody');
  if (tbody && Array.isArray(data.budget.items)) {
    tbody.innerHTML = data.budget.items.map(item => `
      <tr>
        <td><strong>${renderBilingualText(item.category)}</strong></td>
        <td>${item.baseAmount || '—'}</td>
        <td class="converted-val" data-min="${item.min || 0}" data-max="${item.max || 0}">—</td>
        <td>${renderBilingualText(item.notes)}</td>
      </tr>
    `).join('');

    if (data.budget.total) {
      const tot = data.budget.total;
      tbody.innerHTML += `
        <tr class="budget-total">
          <td><strong>${renderBilingualText(tot.category)}</strong></td>
          <td><strong>${tot.baseAmount || '—'}</strong></td>
          <td class="converted-val budget-total-val" data-min="${tot.min || 0}" data-max="${tot.max || 0}"><strong>—</strong></td>
          <td><em>${renderBilingualText(tot.notes)}</em></td>
        </tr>
      `;
    }
  }
}

/* ═══════════════════════════════════════════════════
   7. RENDER HOTELS & STAYS SECTION
   ═══════════════════════════════════════════════════ */
function renderHotels() {
  const data = window.SITE_DATA;
  if (!data || !data.hotels) return;

  const config = window.TRIP_CONFIG;
  const partySize = (config && config.party && config.party.size) ? config.party.size : 2;

  // Quick Leg Pills
  const pillsEl = document.getElementById('hotel-quick-legs-container');
  const quickLegs = data.hotels.quickLegs || [];
  if (pillsEl && Array.isArray(quickLegs) && quickLegs.length > 0) {
    pillsEl.innerHTML = quickLegs.map(p => `
      <button class="quick-leg-pill${p.active ? ' active' : ''}"
              data-dest="${p.dest || ''}"
              data-checkin="${p.checkin || ''}"
              data-checkout="${p.checkout || ''}">
        ${renderBilingualText(p.label)}
      </button>
    `).join('');

    // Pre-fill inputs with first active pill
    const firstActive = quickLegs.find(p => p.active) || quickLegs[0];
    if (firstActive) {
      const destInput = document.getElementById('hotel-dest');
      const inInput = document.getElementById('hotel-checkin');
      const outInput = document.getElementById('hotel-checkout');
      const guestsSelect = document.getElementById('hotel-guests');

      if (destInput) destInput.value = firstActive.dest || '';
      if (inInput) inInput.value = firstActive.checkin || '';
      if (outInput) outInput.value = firstActive.checkout || '';
      if (guestsSelect) guestsSelect.value = String(partySize);
    }
  }

  // Curated Hotel Stay Cards
  const legsGrid = document.getElementById('itinerary-hotels-grid') || document.getElementById('hotels-grid');
  const legs = data.hotels.legs || data.hotels.stays || [];
  if (legsGrid && Array.isArray(legs)) {
    legsGrid.innerHTML = legs.map(leg => `
      <div class="hotel-leg-card reveal">
        <div>
          <div class="hotel-leg-top">
            <span class="hotel-leg-badge">${leg.legNum || 'Stop'} · ${renderBilingualText(leg.nights || 'Stay')}</span>
            <span class="hotel-leg-dates">${leg.dates || ''}</span>
          </div>
          <h4 class="hotel-leg-title">${renderBilingualText(leg.title)}</h4>
          <p class="hotel-leg-desc">${renderBilingualText(leg.desc || leg.description)}</p>
          <div class="day-tags" style="margin-bottom: 16px;">
            ${(leg.tags || []).map(t => `<span class="tag tag-city">${t}</span>`).join('')}
          </div>
        </div>
        <a class="hotel-leg-btn"
           href="https://www.booking.com/searchresults.html?ss=${encodeURIComponent(leg.dest || '')}&checkin=${leg.checkin || ''}&checkout=${leg.checkout || ''}&group_adults=${partySize}"
           target="_blank"
           rel="noopener noreferrer">
          🏨 Search on Booking.com ➔
        </a>
      </div>
    `).join('');
  }
}

/* ═══════════════════════════════════════════════════
   8. RENDER TRANSIT RECOMMENDATIONS
   ═══════════════════════════════════════════════════ */
function renderTransit() {
  const data = window.SITE_DATA;
  if (!data || !data.transit) return;

  const container = document.getElementById('transit-grid-container') || document.getElementById('transit-card');
  const cards = Array.isArray(data.transit.cards) ? data.transit.cards : (Array.isArray(data.transit) ? data.transit : null);

  if (container && cards) {
    container.innerHTML = cards.map(c => `
      <div class="transit-card reveal" id="${c.id || ''}">
        <div class="transit-card-header">
          <span class="transit-icon">${c.icon || '🚆'}</span>
          <h3 class="transit-title">${renderBilingualText(c.title)}</h3>
        </div>
        <p class="transit-details">${renderBilingualText(c.details || c.desc || c.description)}</p>
      </div>
    `).join('');
  }
}

/* ── Master Render All ── */
function renderAll() {
  renderHero();
  renderOverview();
  renderTips();
  renderItinerary();
  renderPacking();
  renderBudget();
  renderHotels();
  renderTransit();
}
