/**
 * @file config.js
 * @description MASTER CONFIGURATION — United Kingdom & Scotland 10-Day Heritage Tour
 */

const TRIP_CONFIG = {
  languages: {
    primary: { code: "en", label: "EN", name: "English" },
    secondary: { code: "zh", label: "繁中", name: "繁體中文" },
    default: "en"
  },

  trip: {
    title: {
      en: "Best of Great Britain: London to Edinburgh Grand Tour",
      zh: "英國經典精華遊：倫敦、巴斯、約克至愛丁堡 10 天古堡與高地之旅"
    },
    year: "2026",
    eyebrow: {
      en: "🇬🇧 Royal Castles & Scottish Highlands",
      zh: "🇬🇧 皇家城堡與蘇格蘭高地巡禮"
    },
    destination: {
      en: "London, Bath, Cotswolds, York & Edinburgh, UK",
      zh: "英國 倫敦、巴斯、科茲窩、約克、愛丁堡"
    },
    subtitle: {
      en: "Jun 12 — Jun 21 · London Tube & West End → Roman Baths → Medieval York → Edinburgh Castle",
      zh: "6月12日 — 6月21日 · 倫敦地鐵與西區歌劇 → 羅馬古浴場 → 中世紀約克 → 愛丁堡古堡"
    },
    dates: {
      start: "2026-06-12",
      end: "2026-06-21",
      display: {
        en: "Jun 12 – Jun 21, 2026",
        zh: "2026年6月12日 — 6月21日"
      }
    },
    durationDays: 10,
    heroBadges: [
      { icon: "🏰", text: { en: "10 Days Heritage", zh: "10天英倫遺產" } },
      { icon: "🚆", text: { en: "LNER East Coast Rail", zh: "LNER 東海岸特急鐵道" } },
      { icon: "🎭", text: { en: "West End Musical", zh: "倫敦西區經典音樂劇" } }
    ]
  },

  party: {
    size: 3,
    type: "family",
    label: {
      en: "Family of 3 (3 Adults)",
      zh: "3人家庭同行"
    },
    members: [
      {
        name: "Planner & Driver",
        role: { en: "Lead Navigator & Train Booker", zh: "行程統籌與火車預訂" },
        passport: "British Citizen / HKSAR"
      },
      {
        name: "Family Member A",
        role: { en: "Museum & Afternoon Tea Enthusiast", zh: "博物館與英式下午茶愛好者" },
        passport: "British Citizen / BN(O)"
      },
      {
        name: "Family Member B",
        role: { en: "Landscape Photographer", zh: "自然風景與城堡攝影" },
        passport: "British Citizen / BN(O)"
      }
    ]
  },

  origin: {
    country: { en: "Hong Kong & United Kingdom", zh: "香港及英國" },
    residence: "HK / UK",
    passportsHeld: ["British Citizen", "BN(O)", "HKSAR"],
    visaSummary: {
      en: "6-month visa-free for HKSAR / BN(O) holders in the UK. British Citizens use domestic rights.",
      zh: "持香港特區護照或 BN(O) 入境英國享 6 個月免簽證待遇；持英國公民護照直接通關。"
    },
    drivingRequirements: {
      en: "London & Edinburgh via Tube and high-speed rail. Short Cotswolds day-trip via rental car (UK Licence).",
      zh: "倫敦與愛丁堡之間全程乘搭高鐵與地鐵；科茲窩田園一日遊可選擇租車自駕（持英國或國際駕照）。"
    }
  },

  currency: {
    base: {
      code: "GBP",
      symbol: "£",
      name: "British Pound"
    },
    targets: [
      { code: "usd", symbol: "$", name: "USD ($)", fallbackRate: 1.28 },
      { code: "hkd", symbol: "HK$", name: "HKD ($)", fallbackRate: 9.95 },
      { code: "eur", symbol: "€", name: "EUR (€)", fallbackRate: 1.18 },
      { code: "gbp", symbol: "£", name: "GBP (£)", fallbackRate: 1.00 }
    ],
    defaultTarget: "hkd"
  },

  theme: {
    preset: "midnight-navy",
    defaultTheme: "light"
  },

  routeBoardStyle: "london-underground",

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
