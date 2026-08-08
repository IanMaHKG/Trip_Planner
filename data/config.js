/**
 * @file config.js
 * @description MASTER CONFIGURATION — Trip Planner template.
 *
 * ╔════════════════════════════════════════════════════════════╗
 * ║  SINGLE SOURCE OF TRUTH — AGENTS READ THIS FIRST          ║
 * ╚════════════════════════════════════════════════════════════╝
 *
 * This is the ONLY file you need to edit to customize the app for a new trip.
 * All other JS files (render.js, ui.js, map.js, currency.js) read from this
 * object at runtime. Do NOT duplicate these values anywhere else.
 *
 * Architecture rules:
 *   • Any text, label, or string that appears in the UI must trace back to
 *     this file, site-data.js, or itinerary-data.js. Never hardcode in HTML/JS.
 *   • Feature flags (features.show*): set to false to hide a section entirely.
 *     The renderer checks these before calling each renderXxx() function.
 *   • Language codes must be valid BCP-47 language subtag codes (e.g. 'en',
 *     'zh', 'fr', 'ja'). They are used as CSS class names by ui.js and
 *     as keys in multilingual data objects throughout site-data.js and
 *     itinerary-data.js.
 *   • Theme preset key: must match one of the 7 presets defined in
 *     css/palette.css. See palette.css for the full list.
 *   • Currency codes: must be valid ISO 4217 codes. The base code must match
 *     the values used in site-data.js budget.items[].min / .max fields.
 *   • Party members: use role descriptions, NOT real names. PII (real names,
 *     home address) must never appear in any data file.
 *
 * After editing this file:
 *   • Bump CACHE_NAME in sw.js to clear the service worker cache.
 *   • Verify the app in both light and dark modes.
 *   • Test language switching if secondary language code was changed.
 *
 * @see data/site-data.js      — Trip content (overview, tips, budget, hotels).
 * @see data/itinerary-data.js — Day-by-day schedule.
 * @see js/render.js           — Reads this config to gate and render sections.
 * @see js/ui.js               — Reads language + theme settings.
 * @see AGENTS.md              — Full architecture and data-driven pattern rules.
 */

const TRIP_CONFIG = {
  /* ══════════════════════════════════════════════════
     1. LANGUAGE SETTINGS (i18n)
     ══════════════════════════════════════════════════ */
  languages: {
    // Primary language (default view)
    primary: {
      code: "en",
      label: "EN",
      name: "English"
    },
    // Secondary language (optional: set to null for single-language mode)
    secondary: {
      code: "zh",
      label: "繁中",
      name: "繁體中文"
    },
    // Default active language code ('en' or 'zh')
    default: "en"
  },

  /* ══════════════════════════════════════════════════
     2. TRIP PROFILE & METADATA
     ══════════════════════════════════════════════════ */
  trip: {
    title: {
      en: "Alpine & Lakes Grand Tour",
      zh: "瑞士湖光山色阿爾卑斯之旅"
    },
    year: "2026",
    eyebrow: {
      en: "🏔️ Europe Adventure",
      zh: "🏔️ 歐洲壯麗漫遊"
    },
    destination: {
      en: "Switzerland & Northern Italy",
      zh: "瑞士及北意大利"
    },
    subtitle: {
      en: "Sep 10 — Sep 22 · Zurich → Lucerne → Interlaken → Zermatt → Lake Como → Milan",
      zh: "9月10日 — 9月22日 · 蘇黎世 → 琉森 → 因特拉肯 → 策馬特 → 科莫湖 → 米蘭"
    },
    dates: {
      start: "2026-09-10",
      end: "2026-09-22",
      display: {
        en: "Sep 10 – Sep 22, 2026",
        zh: "2026年9月10日 — 9月22日"
      }
    },
    durationDays: 13,
    heroBadges: [
      {
        icon: "🏔️",
        text: { en: "13 Days", zh: "13天行程" }
      },
      {
        icon: "👨‍👩‍👧",
        text: { en: "Family of 3", zh: "3人家庭同行" }
      },
      {
        icon: "🚆",
        text: { en: "Scenic Rail + Drive", zh: "景觀鐵路 + 自駕" }
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     3. PARTY MEMBERS & TRAVELER PROFILE
     ══════════════════════════════════════════════════ */
  party: {
    size: 3,
    type: "family", // "family" | "couple" | "friends" | "solo" | "group"
    label: {
      en: "Family of 3 (3 Adults)",
      zh: "3人家庭（3位成人）"
    },
    members: [
      {
        name: "Ian",
        role: { en: "Lead Planner & Driver", zh: "領隊及主要司機" },
        passport: "UK / HKSAR"
      },
      {
        name: "Parent A",
        role: { en: "Traveler", zh: "同行長輩" },
        notes: { en: "Prefers step-free access & gentle strolls", zh: "偏好平緩步道與電梯設施" }
      },
      {
        name: "Parent B",
        role: { en: "Traveler", zh: "同行長輩" },
        notes: { en: "Scenic viewpoints & local gastronomy", zh: "喜愛風景攝影與地道美食" }
      }
    ],
    vehicleRecommendation: {
      category: "Midsize Station Wagon / SUV",
      models: "Volkswagen Passat Variant / BMW 3 Touring / Volvo XC60",
      bootCapacity: {
        en: "3 Large Suitcases (28\") + 2 Soft Carry-ons",
        zh: "3個28吋大行李箱 + 2個軟身隨身包"
      },
      why: {
        en: "Generous boot capacity and smooth mountain highway comfort for long scenic drives.",
        zh: "尾箱空間充裕，山路行駛穩定舒適，適合家庭長途旅行。"
      }
    }
  },

  /* ══════════════════════════════════════════════════
     4. ORIGIN COUNTRY, PASSPORT & ENTRY RULES
     ══════════════════════════════════════════════════ */
  origin: {
    country: {
      en: "United Kingdom & Hong Kong",
      zh: "英國及香港"
    },
    residence: "UK / HK",
    passportsHeld: ["British Citizen", "BN(O)", "HKSAR", "Portuguese"],
    visaSummary: {
      en: "90-day visa-free for Schengen Area & Switzerland. Passports must have at least 3 months validity beyond departure date.",
      zh: "申根區及瑞士享 90 天免簽證待遇。護照須具備出境後至少 3 個月有效期。"
    },
    drivingRequirements: {
      en: "UK Photocard Licence + 1968 Vienna Convention IDP for driving in Italy and Switzerland.",
      zh: "持英國正式駕照 + 1968年維也納公約國際駕駛執照 (IDP)。"
    }
  },

  /* ══════════════════════════════════════════════════
     5. CURRENCY & EXCHANGE RATES
     ══════════════════════════════════════════════════ */
  currency: {
    // The base currency used at the destination
    base: {
      code: "EUR",
      symbol: "€",
      name: "Euro"
    },
    // Currencies used by party members for live conversion
    targets: [
      {
        code: "usd",
        symbol: "$",
        name: "USD ($)",
        fallbackRate: 1.08
      },
      {
        code: "gbp",
        symbol: "£",
        name: "GBP (£)",
        fallbackRate: 0.85
      },
      {
        code: "hkd",
        symbol: "HK$",
        name: "HKD ($)",
        fallbackRate: 8.45
      },
      {
        code: "eur",
        symbol: "€",
        name: "EUR (€)",
        fallbackRate: 1.00
      }
    ],
    defaultTarget: "usd"
  },

  /* ══════════════════════════════════════════════════
     6. THEME & VISUAL PALETTE PRESETS
     Available presets:
       - "midnight-navy"       (BA Midnight Navy & Gold) [Default]
       - "nordic-aurora"       (Deep Slate & Aurora Teal)
       - "mediterranean-warm"  (Terracotta, Coral & Deep Sea)
       - "sakura-rose"         (Plum, Blossom Pink & Rose Gold)
       - "alpine-emerald"      (Swiss Pine, Glacial Blue & Gold)
       - "cyber-dark"          (Obsidian & Electric Violet)
       - "sunset-terracotta"   (Sedona Rust & Ochre)
     ══════════════════════════════════════════════════ */
  theme: {
    preset: "alpine-emerald",
    defaultTheme: "light" // "light" or "dark"
  },

  /* ══════════════════════════════════════════════════
     7. TRANSIT ROUTE BOARD STYLE PRESET
     Available styles:
       - "swiss-train"         (SBB CFF FFS Swiss Federal Railways precision) [Default for Swiss tour]
       - "jr-rail"             (JR Japan Railways Station Sign 駅名標 style)
       - "london-underground"  (TfL London Tube & Roundel Harry Beck style)
       - "hong-kong-mtr"       (Hong Kong MTR bilingual line style)
       - "new-york-subway"     (NYC MTA Subway black band & colored bullet style)
     ══════════════════════════════════════════════════ */
  routeBoardStyle: "swiss-train",

  /* ══════════════════════════════════════════════════
     8. FEATURE FLAGS (Toggle sections on/off)
     ══════════════════════════════════════════════════ */
  features: {
    showOverview: true,
    showMilestoneBoard: true,
    showMap: true,
    showTips: true,
    showItinerary: true,
    showPacking: true,
    showBudget: true,
    showHotels: true,
    showTransit: true
  }
};

// Export to global scope for browser execution
if (typeof window !== 'undefined') {
  window.TRIP_CONFIG = TRIP_CONFIG;
}
