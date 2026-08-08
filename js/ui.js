/**
 * @file ui.js
 * @description UI INTERACTIONS & CONTROLLER MODULE — Trip Planner.
 * Controls language switching, dark/light theme toggle, theme presets,
 * accordion behaviors, sticky navigation, particle effects, and hotel search.
 */

/* ═══════════════════════════════════════════════════
   1. LANGUAGE SWITCHER (Always Visible & Instant)
   ═══════════════════════════════════════════════════ */
function initLanguage() {
  const config = window.TRIP_CONFIG;
  const primaryLang = (config && config.languages && config.languages.primary) ? config.languages.primary.code : 'en';
  const secondaryLang = (config && config.languages && config.languages.secondary) ? config.languages.secondary.code : 'zh';
  const defaultLang = (config && config.languages && config.languages.default) ? config.languages.default : 'en';

  const savedLang = localStorage.getItem('user-lang') || defaultLang;
  setLanguage(savedLang);

  // Render language toggle buttons dynamically
  const switcher = document.querySelector('.lang-switcher');
  if (switcher && config && config.languages) {
    if (!config.languages.secondary) {
      // Single language mode: hide language switcher
      switcher.style.display = 'none';
      return;
    }

    switcher.innerHTML = `
      <button class="lang-btn${savedLang === primaryLang ? ' active' : ''}" data-lang="${primaryLang}">
        ${config.languages.primary.label || 'EN'}
      </button>
      <button class="lang-btn${savedLang === secondaryLang ? ' active' : ''}" data-lang="${secondaryLang}">
        ${config.languages.secondary.label || '繁中'}
      </button>
    `;

    switcher.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        setLanguage(lang);
        switcher.querySelectorAll('.lang-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.lang === lang);
        });
      });
    });
  }
}

function setLanguage(lang) {
  const config = window.TRIP_CONFIG;
  const primaryCode = (config && config.languages && config.languages.primary) ? config.languages.primary.code : 'en';

  localStorage.setItem('user-lang', lang);

  // Reset classes
  document.body.classList.remove('lang-primary', 'lang-secondary', 'lang-en', 'lang-zh', 'lang-zh-hk');

  if (lang === primaryCode) {
    document.body.classList.add('lang-primary', `lang-${primaryCode}`);
  } else {
    document.body.classList.add('lang-secondary', `lang-${lang}`);
  }

  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/* ═══════════════════════════════════════════════════
   2. THEME CONTROLLER & 7 PRESETS
   ═══════════════════════════════════════════════════ */
function initTheme() {
  const config = window.TRIP_CONFIG;
  const preset = (config && config.theme && config.theme.preset) ? config.theme.preset : 'midnight-navy';
  const defaultTheme = (config && config.theme && config.theme.defaultTheme) ? config.theme.defaultTheme : 'light';

  // Apply Theme Preset
  document.documentElement.setAttribute('data-theme-preset', preset);

  // Apply Dark/Light Mode
  const savedTheme = localStorage.getItem('user-theme') || defaultTheme;
  applyTheme(savedTheme);

  // Theme Toggle Button
  const toggleBtns = document.querySelectorAll('.theme-toggle, #theme-toggle-btn');
  toggleBtns.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });
}

function applyTheme(theme) {
  document.body.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('user-theme', theme);

  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));

  setTimeout(() => {
    document.body.classList.remove('theme-transitioning');
  }, 350);
}

/* ═══════════════════════════════════════════════════
   3. ITINERARY ACCORDION & REGION FILTER TABS
   ═══════════════════════════════════════════════════ */
function toggleDayAccordion(dayId) {
  const card = document.getElementById(dayId);
  if (!card) return;

  const isOpen = card.classList.contains('open');
  card.classList.toggle('open', !isOpen);

  if (!isOpen && typeof initDayMiniMap === 'function') {
    // Lazy initialize minimap upon first expand
    setTimeout(() => {
      initDayMiniMap(dayId);
    }, 150);
  }
}

function initDayFilters() {
  const itinerary = window.ITINERARY_DATA || [];
  const filtersContainer = document.getElementById('day-filters-container') || document.getElementById('day-filters');
  if (!filtersContainer || itinerary.length === 0) return;

  // Comprehensive Region display labels dictionary
  const regionLabels = {
    'all': { en: `All Days (${itinerary.length} Days)`, zh: `全部行程（${itinerary.length}天）` },
    // 01 Switzerland & Italy
    'zurich-lucerne': { en: 'Zurich & Lucerne', zh: '蘇黎世與琉森' },
    'interlaken-jungfrau': { en: 'Interlaken & Jungfrau', zh: '因特拉肯與少女峰' },
    'zermatt-matterhorn': { en: 'Zermatt & Matterhorn', zh: '策馬特與馬特洪峰' },
    'lake-como-milan': { en: 'Lake Como & Milan', zh: '科莫湖與米蘭' },
    // 02 Japan Golden Route
    'tokyo': { en: 'Tokyo Metropolis', zh: '東京都會' },
    'tokyo-hakone': { en: 'Tokyo & Hakone', zh: '東京與箱根' },
    'hakone': { en: 'Hakone Hot Springs', zh: '箱根溫泉' },
    'hakone-kyoto': { en: 'Hakone & Kyoto', zh: '箱根與京都' },
    'kyoto-osaka': { en: 'Kyoto & Osaka', zh: '京都與大阪' },
    'osaka-departure': { en: 'Osaka Departure', zh: '大阪離境' },
    // 03 UK & Scotland
    'london': { en: 'London & Royal Heritage', zh: '倫敦與皇家歷史' },
    'windsor': { en: 'Windsor Castle', zh: '溫莎城堡' },
    'bath-cotswolds': { en: 'Bath & Cotswolds', zh: '巴斯與科茲窩' },
    'york': { en: 'Medieval York', zh: '中世紀約克' },
    'edinburgh': { en: 'Edinburgh', zh: '愛丁堡' },
    'highlands': { en: 'Scottish Highlands', zh: '蘇格蘭高地' },
    'edinburgh-departure': { en: 'Edinburgh Departure', zh: '愛丁堡離境' },
    // 04 Hong Kong
    'kowloon-harbour': { en: 'Kowloon & Victoria Harbour', zh: '九龍與維港' },
    'central-peak': { en: 'Central & Victoria Peak', zh: '中環與太平山頂' },
    'lantau': { en: 'Lantau Island & Big Buddha', zh: '大嶼山與天壇大佛' },
    'hong-kong-island': { en: 'Hong Kong Island', zh: '香港島精華' },
    'kowloon-local': { en: 'Kowloon Street Food', zh: '九龍地道美食' },
    'sai-kung': { en: 'Sai Kung Geopark', zh: '西貢地質公園' },
    'central-departure': { en: 'Central Departure', zh: '中環機場快綫離境' },
    // 05 US New England
    'boston': { en: 'Boston Freedom Trail', zh: '波士頓自由之路' },
    'boston-cambridge': { en: 'Boston & Cambridge', zh: '波士頓與劍橋' },
    'new-hampshire': { en: 'White Mountains NH', zh: '新罕布夏白山' },
    'kancamagus': { en: 'Kancamagus Highway', zh: '康卡馬格斯楓葉公路' },
    'vermont': { en: 'Stowe Vermont', zh: '佛蒙特與斯托' },
    'vermont-woodstock': { en: 'Vermont & Woodstock', zh: '佛蒙特與伍德斯托克' },
    'maine-acadia': { en: 'Maine & Acadia', zh: '緬因海岸與阿卡迪亞' },
    'acadia-national-park': { en: 'Acadia National Park', zh: '阿卡迪亞國家公園' },
    'acadia-jordan-pond': { en: 'Jordan Pond & Cliffs', zh: '阿卡迪亞喬丹池' },
    'maine-portland': { en: 'Portland Head Light', zh: '緬因波特蘭海岸' },
    'newport-rhode-island': { en: 'Newport Mansions', zh: '羅德島紐波特古堡' },
    'nyc-manhattan': { en: 'NYC Manhattan', zh: '紐約曼哈頓中城' },
    'nyc-central-park': { en: 'NYC Central Park', zh: '紐約中央公園' },
    'nyc-departure': { en: 'NYC Departure', zh: '紐約市離境' }
  };

  const regionsMap = new Map();
  regionsMap.set('all', regionLabels['all']);

  itinerary.forEach(d => {
    if (d.region && !regionsMap.has(d.region)) {
      const rawName = d.region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const lbl = d.regionLabel || regionLabels[d.region] || { en: rawName, zh: rawName };
      regionsMap.set(d.region, lbl);
    }
  });

  filtersContainer.innerHTML = Array.from(regionsMap.entries()).map(([r, lbl]) => `
    <button class="day-tab${r === 'all' ? ' active' : ''}" data-filter="${r}">
      ${renderBilingualText(lbl)}
    </button>
  `).join('');

  filtersContainer.querySelectorAll('.day-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const filter = e.currentTarget.dataset.filter;
      filtersContainer.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');

      document.querySelectorAll('.day-card').forEach(card => {
        if (filter === 'all' || card.dataset.region === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════
   4. STICKY NAVIGATION & SCROLL SPY
   ═══════════════════════════════════════════════════ */
function initNavigation() {
  const navbar = document.querySelector('.nav-bar');
  const toggle = document.querySelector('.nav-toggle') || document.getElementById('nav-toggle-btn');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }

  // Scroll Reveal Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════
   5. HERO PARTICLES GENERATOR
   ═══════════════════════════════════════════════════ */
function initHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const count = 24;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(particle);
  }
}

/* ═══════════════════════════════════════════════════
   6. HOTEL SEARCH FORM HANDLER (Booking.com Direct)
   ═══════════════════════════════════════════════════ */
function initHotelSearch() {
  // Quick Leg Pills
  const container = document.getElementById('hotel-quick-legs-container');
  if (container) {
    container.addEventListener('click', (e) => {
      const pill = e.target.closest('.quick-leg-pill');
      if (!pill) return;

      container.querySelectorAll('.quick-leg-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const destInput = document.getElementById('hotel-dest');
      const inInput = document.getElementById('hotel-checkin');
      const outInput = document.getElementById('hotel-checkout');

      if (destInput && pill.dataset.dest) destInput.value = pill.dataset.dest;
      if (inInput && pill.dataset.checkin) inInput.value = pill.dataset.checkin;
      if (outInput && pill.dataset.checkout) outInput.value = pill.dataset.checkout;
    });
  }

  // Form Submit
  const form = document.getElementById('hotel-search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = document.getElementById('hotel-dest')?.value || '';
      const checkin = document.getElementById('hotel-checkin')?.value || '';
      const checkout = document.getElementById('hotel-checkout')?.value || '';
      const guests = document.getElementById('hotel-guests')?.value || '2';

      const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}&checkin=${checkin}&checkout=${checkout}&group_adults=${guests}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
}
