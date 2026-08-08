/**
 * @file config.js
 * @description MASTER CONFIGURATION — Hong Kong 7-Day Island, Skyline & Culture Explorer
 */

const TRIP_CONFIG = {
  languages: {
    primary: { code: "en", label: "EN", name: "English" },
    secondary: { code: "zh", label: "繁中", name: "繁體中文" },
    default: "zh"
  },

  trip: {
    title: {
      en: "Hong Kong Horizon: 7-Day Urban, Islands & Michelin Feast",
      zh: "璀璨香江：香港 7 天都會天際線、大嶼山與地質海島探索之旅"
    },
    year: "2026",
    eyebrow: {
      en: "🇭🇰 Asia's World City & Hidden Nature",
      zh: "🇭🇰 亞洲國際都會與隱世自然海島"
    },
    destination: {
      en: "Hong Kong Island, Kowloon, Lantau & Sai Kung",
      zh: "香港島、九龍半島、大嶼山及西貢地質公園"
    },
    subtitle: {
      en: "Oct 18 — Oct 24 · Victoria Peak Tram → Star Ferry & Dim Sum → Ngong Ping 360 → Sai Kung UNESCO Geopark",
      zh: "10月18日 — 10月24日 · 山頂纜車 → 天星小輪與經典早茶 → 昂坪360大佛 → 西貢地質公園海鮮"
    },
    dates: {
      start: "2026-10-18",
      end: "2026-10-24",
      display: {
        en: "Oct 18 – Oct 24, 2026",
        zh: "2026年10月18日 — 10月24日"
      }
    },
    durationDays: 7,
    heroBadges: [
      { icon: "🚡", text: { en: "7 Days City & Islands", zh: "7天山海精華" } },
      { icon: "🥟", text: { en: "Michelin Dim Sum", zh: "米芝蓮星級早茶" } },
      { icon: "🚢", text: { en: "Star Ferry & Victoria Harbour", zh: "天星小輪維港夜景" } }
    ]
  },

  party: {
    size: 2,
    type: "couple",
    label: {
      en: "Couple / 2 Explorers",
      zh: "2人同行（深度探索）"
    },
    members: [
      {
        name: "Alex",
        role: { en: "Photography & Skyline Scout", zh: "天際線攝影與行程策劃" },
        passport: "British Citizen / HKSAR"
      },
      {
        name: "Taylor",
        role: { en: "Gastronomy & Nature Hiker", zh: "米芝蓮地道美食與行山嚮導" },
        passport: "HKSAR / BN(O)"
      }
    ]
  },

  origin: {
    country: { en: "United Kingdom & Global", zh: "英國及全球各地" },
    residence: "UK / International",
    passportsHeld: ["British Citizen", "BN(O)", "HKSAR", "US"],
    visaSummary: {
      en: "Visa-free entry for up to 90–180 days for UK, US, EU, and Canadian passport holders. HKSAR residents enter freely.",
      zh: "英國公民享 180 天免簽證，歐美加護照享 90 天免簽證；特區護照及香港身份證持有人直接進出。"
    },
    drivingRequirements: {
      en: "Zero driving needed. World-renowned MTR metro, iconic Star Ferry, Ding Ding Tram, and ubiquitous red taxis.",
      zh: "無需租車自駕。全港覆蓋世界級港鐵系統、天星小輪、百年叮叮電車與便利紅色的士。"
    }
  },

  currency: {
    base: {
      code: "HKD",
      symbol: "HK$",
      name: "Hong Kong Dollar"
    },
    targets: [
      { code: "usd", symbol: "$", name: "USD ($)", fallbackRate: 0.128 },
      { code: "gbp", symbol: "£", name: "GBP (£)", fallbackRate: 0.101 },
      { code: "eur", symbol: "€", name: "EUR (€)", fallbackRate: 0.118 },
      { code: "cny", symbol: "¥", name: "CNY (¥)", fallbackRate: 0.92 }
    ],
    defaultTarget: "usd"
  },

  theme: {
    preset: "cyber-dark",
    defaultTheme: "dark"
  },

  routeBoardStyle: "hong-kong-mtr",

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

if (typeof window !== 'undefined') {
  window.TRIP_CONFIG = TRIP_CONFIG;
}
