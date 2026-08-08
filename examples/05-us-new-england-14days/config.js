/**
 * @file config.js
 * @description MASTER CONFIGURATION — New England & NYC 14-Day Autumn Foliage Roadtrip
 */

const TRIP_CONFIG = {
  languages: {
    primary: { code: "en", label: "EN", name: "English" },
    secondary: { code: "zh", label: "繁中", name: "繁體中文" },
    default: "en"
  },

  trip: {
    title: {
      en: "New England Autumn Foliage & NYC Grand Roadtrip",
      zh: "美東新英格蘭賞楓自駕與紐約 14 天秋色壯遊"
    },
    year: "2026",
    eyebrow: {
      en: "🍁 Iconic Fall Foliage & Coastal Lighthouses",
      zh: "🍁 絕美秋楓公路、緬因龍蝦與紐約都會"
    },
    destination: {
      en: "Massachusetts, New Hampshire, Vermont, Maine, Rhode Island & NYC",
      zh: "麻省、新罕布什爾、佛蒙特、緬因州、羅德島及紐約市"
    },
    subtitle: {
      en: "Oct 01 — Oct 14 · Boston Freedom Trail → Kancamagus Highway → Acadia National Park → Newport → NYC",
      zh: "10月1日 — 10月14日 · 波士頓自由之路 → 白山景觀公路 → 阿卡迪亞國家公園 → 紐波特莊園 → 紐約曼哈頓"
    },
    dates: {
      start: "2026-10-01",
      end: "2026-10-14",
      display: {
        en: "Oct 01 – Oct 14, 2026",
        zh: "2026年10月1日 — 10月14日"
      }
    },
    durationDays: 14,
    heroBadges: [
      { icon: "🍁", text: { en: "14 Days Fall Foliage", zh: "14天秋楓自駕" } },
      { icon: "🦞", text: { en: "Fresh Maine Lobster", zh: "緬因州新鮮活龍蝦" } },
      { icon: "🗽", text: { en: "NYC & Broadway", zh: "紐約曼哈頓與百老匯" } }
    ]
  },

  party: {
    size: 4,
    type: "family",
    label: {
      en: "Family of 4 (4 Adults)",
      zh: "4人家庭同行（4位成人）"
    },
    members: [
      {
        name: "Lead Driver",
        role: { en: "Primary Roadtrip Driver & Route Planner", zh: "主要自駕司機與路線策劃" },
        passport: "US / British Citizen"
      },
      {
        name: "Co-Pilot",
        role: { en: "Co-Driver & National Park Navigator", zh: "副駕駛與國家公園導航" },
        passport: "British Citizen / HKSAR"
      },
      {
        name: "Family Member A",
        role: { en: "Photographer & Lobster Scout", zh: "秋楓攝影與龍蝦美食探索" },
        passport: "HKSAR / BN(O)"
      },
      {
        name: "Family Member B",
        role: { en: "Culture & Museum Enthusiast", zh: "歷史文化與紐約博物館愛好者" },
        passport: "HKSAR / BN(O)"
      }
    ],
    vehicleRecommendation: {
      category: "Full-Size SUV (AWD / 4x4)",
      models: "Chevrolet Tahoe / Ford Explorer / Jeep Grand Cherokee",
      bootCapacity: {
        en: "4 Large Suitcases (28\") + 4 Carry-ons comfortably",
        zh: "輕鬆容納 4 個 28 吋大行李箱及 4 個隨身旅行袋"
      },
      why: {
        en: "Spacious comfort for mountain scenic byways, heated seats for crisp autumn mornings, and rugged all-weather AWD capability.",
        zh: "全輪驅動應對山區秋季氣候，座椅加熱與寬敞座艙確保全家长途公路旅行極致舒適。"
      }
    }
  },

  origin: {
    country: { en: "United Kingdom & Hong Kong", zh: "英國及香港" },
    residence: "UK / HK",
    passportsHeld: ["British Citizen", "BN(O)", "HKSAR", "US"],
    visaSummary: {
      en: "UK / BN(O) / HKSAR travelers apply for US ESTA or B1/B2 tourist visa prior to flight departure. US Citizens travel freely.",
      zh: "英國公民持 ESTA 電子許可直接入境；特區護照及其他持有人需備妥有效美簽 (B1/B2)；美籍成員直接通關。"
    },
    drivingRequirements: {
      en: "Valid UK / HK / International Driving Permit with rental full insurance (CDW/LIS) and EZ-Pass toll transponder.",
      zh: "持有原居地正式駕照及國際駕照，租車包含全額車險並配備美東 EZ-Pass 高速公路電子收費標籤。"
    }
  },

  currency: {
    base: {
      code: "USD",
      symbol: "$",
      name: "US Dollar"
    },
    targets: [
      { code: "hkd", symbol: "HK$", name: "HKD ($)", fallbackRate: 7.80 },
      { code: "gbp", symbol: "£", name: "GBP (£)", fallbackRate: 0.78 },
      { code: "cad", symbol: "C$", name: "CAD ($)", fallbackRate: 1.36 },
      { code: "eur", symbol: "€", name: "EUR (€)", fallbackRate: 0.92 }
    ],
    defaultTarget: "hkd"
  },

  theme: {
    preset: "sunset-terracotta",
    defaultTheme: "light"
  },

  routeBoardStyle: "new-york-subway",

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
