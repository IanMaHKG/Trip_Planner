/**
 * @file config.js
 * @description MASTER CONFIGURATION — Japan Golden Route 5-Day Express
 */

const TRIP_CONFIG = {
  languages: {
    primary: { code: "en", label: "EN", name: "English" },
    secondary: { code: "zh", label: "繁中", name: "繁體中文" },
    default: "zh"
  },

  trip: {
    title: {
      en: "Japan Autumn Highlights: Tokyo to Kyoto Express",
      zh: "日本秋季黃金精華遊：東京至京都 5 天快閃之旅"
    },
    year: "2026",
    eyebrow: {
      en: "🇯🇵 Shinkansen & Onsen Getaway",
      zh: "🇯🇵 新幹線與溫泉秋楓精華"
    },
    destination: {
      en: "Tokyo, Hakone, Kyoto & Osaka, Japan",
      zh: "日本 東京、箱根、京都、大阪"
    },
    subtitle: {
      en: "Nov 14 — Nov 18 · Tokyo → Mt. Fuji/Hakone → Kyoto Arashiyama → Osaka Dotonbori",
      zh: "11月14日 — 11月18日 · 東京 → 箱根富士山溫泉 → 京都嵐山紅葉 → 大阪道頓堀"
    },
    dates: {
      start: "2026-11-14",
      end: "2026-11-18",
      display: {
        en: "Nov 14 – Nov 18, 2026",
        zh: "2026年11月14日 — 11月18日"
      }
    },
    durationDays: 5,
    heroBadges: [
      { icon: "🚅", text: { en: "5 Days Shinkansen", zh: "5天新幹線精華" } },
      { icon: "♨️", text: { en: "Hakone Ryokan & Onsen", zh: "箱根一泊二食溫泉" } },
      { icon: "🍁", text: { en: "Autumn Foliage Peak", zh: "京都紅葉見頃" } }
    ]
  },

  party: {
    size: 2,
    type: "couple",
    label: {
      en: "Couple (2 Travelers)",
      zh: "2人同行（情侶/好友）"
    },
    members: [
      {
        name: "Traveler A",
        role: { en: "Lead Navigator & Gourmet Planner", zh: "主要行程規劃與美食擔當" },
        passport: "HKSAR / British Citizen"
      },
      {
        name: "Traveler B",
        role: { en: "Photographer & Café Explorer", zh: "攝影愛好者與咖啡店探索" },
        passport: "HKSAR / BN(O)"
      }
    ]
  },

  origin: {
    country: { en: "Hong Kong & United Kingdom", zh: "香港及英國" },
    residence: "Hong Kong / UK",
    passportsHeld: ["HKSAR", "BN(O)", "British Citizen"],
    visaSummary: {
      en: "90-day visa-free for tourism in Japan. Complete Visit Japan Web digital QR code prior to arrival.",
      zh: "享 90 天免簽證觀光待遇。入境前需預先於 Visit Japan Web 填寫入境及海關電子申報 QR Code。"
    },
    drivingRequirements: {
      en: "Transit is primarily via Shinkansen & JR Pass / Suica IC Card. No car rental required.",
      zh: "全程主要搭乘東海道新幹線及使用 Suica/ICOCA 交通卡，市內地鐵四通八達，無需自駕。"
    }
  },

  currency: {
    base: {
      code: "JPY",
      symbol: "¥",
      name: "Japanese Yen"
    },
    targets: [
      { code: "hkd", symbol: "HK$", name: "HKD ($)", fallbackRate: 0.052 },
      { code: "usd", symbol: "$", name: "USD ($)", fallbackRate: 0.0067 },
      { code: "gbp", symbol: "£", name: "GBP (£)", fallbackRate: 0.0053 },
      { code: "eur", symbol: "€", name: "EUR (€)", fallbackRate: 0.0062 }
    ],
    defaultTarget: "hkd"
  },

  theme: {
    preset: "sakura-rose",
    defaultTheme: "light"
  },

  routeBoardStyle: "jr-rail",

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
