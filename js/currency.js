/**
 * @file currency.js
 * @description UNIVERSAL MULTI-CURRENCY CONVERTER — Trip Planner.
 *
 * Fetches real-time exchange rates from open.er-api.com (base → all targets)
 * and converts budget amounts into any configured party currency.
 * Falls back to pre-configured rates in TRIP_CONFIG.currency.targets[].fallbackRate
 * when the API is offline or returns an error.
 *
 * Configuration source: TRIP_CONFIG.currency (data/config.js)
 *   .base.code      — ISO 4217 base currency code (e.g. 'EUR', 'JPY').
 *   .targets[]      — Array of conversion currencies with fallback rates.
 *   .defaultTarget  — Pre-selected currency in the switcher UI.
 *
 * DOM integration:
 *   - Populates .currency-switcher buttons from config.targets.
 *   - Sets data-curr body class for CSS-driven currency-specific display.
 *   - Updates all .converted-val elements (data-min / data-max attributes)
 *     with formatted converted values. Managed by updateConvertedBudgets().
 *   - Updates #budget-converted-col-title with the active currency name.
 *
 * @see data/config.js — TRIP_CONFIG.currency (base, targets, defaultTarget).
 * @see js/render.js   — renderBudget() injects .converted-val elements.
 * @see AGENTS.md      — Architecture rules.
 */

let LIVE_RATES = {};

/** Returns currency configuration from global TRIP_CONFIG */
function getCurrencyConfig() {
  if (typeof window !== 'undefined' && window.TRIP_CONFIG && window.TRIP_CONFIG.currency) {
    return window.TRIP_CONFIG.currency;
  }
  // Sensible fallback defaults
  return {
    base: { code: 'EUR', symbol: '€', name: 'Euro' },
    targets: [
      { code: 'usd', symbol: '$', name: 'USD ($)', fallbackRate: 1.08 },
      { code: 'gbp', symbol: '£', name: 'GBP (£)', fallbackRate: 0.85 },
      { code: 'hkd', symbol: 'HK$', name: 'HKD ($)', fallbackRate: 8.45 },
      { code: 'eur', symbol: '€', name: 'EUR (€)', fallbackRate: 1.00 }
    ],
    defaultTarget: 'usd'
  };
}

/* ── Initialize Currency Selector & UI Switcher ── */
function initCurrencySelector() {
  const config = getCurrencyConfig();
  const savedCurr = localStorage.getItem('user-curr') || config.defaultTarget || 'usd';

  // Populate fallback rates
  config.targets.forEach(t => {
    LIVE_RATES[t.code.toLowerCase()] = t.fallbackRate || 1.0;
  });

  // Render currency switcher buttons if container exists
  const switcher = document.querySelector('.currency-switcher');
  if (switcher) {
    switcher.innerHTML = config.targets.map(t => `
      <button class="curr-btn${t.code.toLowerCase() === savedCurr.toLowerCase() ? ' active' : ''}"
              data-curr="${t.code.toLowerCase()}"
              title="${t.name}">
        ${t.name}
      </button>
    `).join('');

    const btns = switcher.querySelectorAll('.curr-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selected = e.target.dataset.curr;
        setCurrency(selected);
        btns.forEach(b => b.classList.toggle('active', b.dataset.curr === selected));
      });
    });
  }

  setCurrency(savedCurr);
  fetchExchangeRates();
}

/* ── Fetch Live Rates (open.er-api.com) ── */
async function fetchExchangeRates() {
  const config = getCurrencyConfig();
  const baseCode = (config.base.code || 'EUR').toUpperCase();

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${baseCode}`);
    if (!res.ok) throw new Error('API fetch error');
    const data = await res.json();

    if (data && data.result === 'success' && data.rates) {
      config.targets.forEach(t => {
        const upperCode = t.code.toUpperCase();
        if (data.rates[upperCode]) {
          LIVE_RATES[t.code.toLowerCase()] = data.rates[upperCode];
        }
      });

      const dateStr = data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toLocaleDateString()
        : new Date().toLocaleDateString();

      document.querySelectorAll('.live-rate-date').forEach(el => {
        el.innerText = dateStr;
      });
    }
  } catch (err) {
    console.warn('Live exchange rate API unavailable, using configured fallback rates:', err);
  } finally {
    updateConvertedBudgets();
  }
}

/* ── Set Active Currency & Update Display ── */
function setCurrency(curr) {
  const normalized = (curr || 'usd').toLowerCase();
  localStorage.setItem('user-curr', normalized);

  // Update body classes for currency-aware selectors
  const config = getCurrencyConfig();
  config.targets.forEach(t => {
    document.body.classList.remove(`curr-${t.code.toLowerCase()}`);
  });
  document.body.classList.add(`curr-${normalized}`);

  updateConvertedBudgets();
}

/* ── Recalculate & Display Converted Budget Values ── */
function updateConvertedBudgets() {
  const config = getCurrencyConfig();
  const activeCurr = (localStorage.getItem('user-curr') || config.defaultTarget || 'usd').toLowerCase();
  const targetObj = config.targets.find(t => t.code.toLowerCase() === activeCurr) || config.targets[0];
  const rate = LIVE_RATES[activeCurr] || targetObj.fallbackRate || 1.0;
  const symbol = targetObj.symbol || '$';

  document.querySelectorAll('.converted-val').forEach(el => {
    const minVal = parseFloat(el.getAttribute('data-min'));
    const maxVal = parseFloat(el.getAttribute('data-max'));
    if (isNaN(minVal) || isNaN(maxVal)) return;

    const rawMin = minVal * rate;
    const rawMax = maxVal * rate;

    // Rounding based on currency magnitude
    let roundedMin, roundedMax;
    if (activeCurr === 'jpy' || activeCurr === 'krw') {
      roundedMin = Math.round(rawMin / 1000) * 1000;
      roundedMax = Math.round(rawMax / 1000) * 1000;
    } else if (activeCurr === 'hkd' || activeCurr === 'twd' || activeCurr === 'cny') {
      roundedMin = Math.round(rawMin / 50) * 50;
      roundedMax = Math.round(rawMax / 50) * 50;
    } else {
      roundedMin = Math.round(rawMin / 10) * 10;
      roundedMax = Math.round(rawMax / 10) * 10;
    }

    const fMin = roundedMin.toLocaleString();
    const fMax = roundedMax.toLocaleString();

    if (el.classList.contains('budget-total-val')) {
      el.innerHTML = `<strong>${symbol}${fMin} – ${symbol}${fMax}</strong>`;
    } else {
      el.innerHTML = `${symbol}${fMin} – ${symbol}${fMax}`;
    }
  });

  // Update table header currency label
  const headerCurrLabel = document.getElementById('budget-converted-col-title');
  if (headerCurrLabel) {
    headerCurrLabel.innerText = `~${targetObj.name}`;
  }
}
