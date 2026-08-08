/**
 * @file site-data.js
 * @description DATA SOURCE — US New England Autumn Roadtrip (14 Days)
 */

const SITE_DATA = {
  /* ══════════════════════════════════════════════════
     1. OVERVIEW CARDS & ROUTE BOARD
     ══════════════════════════════════════════════════ */
  overview: {
    cards: [
      {
        id: "overview-pace",
        icon: "🚗",
        title: { en: "Pace & Rhythm", zh: "步調節奏" },
        desc: {
          en: "Epic 14-day scenic road trip spanning Massachusetts, New Hampshire, Vermont, Maine, and ending in New York City. Moderate driving of 2–3 hours per leg.",
          zh: "14天經典公路自駕之旅。穿梭麻省、新罕布夏、佛蒙特、緬因海岸，最終抵達紐約曼哈頓。平均每日自駕約 2–3 小時。"
        }
      },
      {
        id: "overview-transport",
        icon: "🚙",
        title: { en: "Vehicle & Navigation", zh: "車輛與交通" },
        desc: {
          en: "AWD SUV with E-ZPass transponder for tollways. Return rental before NYC and utilize OMNY contactless tap for the Subway.",
          zh: "配備 E-ZPass 電子收費的全驅 SUV 租車。抵達紐約前交還租車，市內轉用 OMNY 信用卡感應乘搭紐約地鐵。"
        }
      },
      {
        id: "overview-weather",
        icon: "🍁",
        title: { en: "Fall Foliage Peak", zh: "秋楓高峰氣候" },
        desc: {
          en: "Peak fall colors (5–16°C). Cool crisp mountain air, warm sunny afternoons, and occasional brisk coastal sea breezes in Maine.",
          zh: "全美最壯麗紅葉見頃期（氣溫約 5–16°C）。山區清晨乾涼清新，午後陽光溫暖，緬因海邊略有涼意。"
        }
      },
      {
        id: "overview-dining",
        icon: "🦞",
        title: { en: "New England Gastronomy", zh: "龍蝦與在地美饌" },
        desc: {
          en: "Fresh steamed Maine lobster rolls with warm butter, clam chowder, cider donuts, Vermont maple syrup, and classic NYC bagels.",
          zh: "緬因現蒸熱牛油龍蝦卷、新英格蘭周打蜆湯、現炸蘋果肉桂冬甩、佛蒙特純楓糖漿及紐約經典貝果。"
        }
      }
    ],

    routeBoard: {
      type: "rail",
      style: "nyc-subway",
      badge: "🗽 MTA · SUBWAY & CORRIDOR",
      lineTitle: {
        en: "NEW YORK & NEW ENGLAND AUTUMN CORRIDOR",
        zh: "美東新英格蘭賞楓景觀縱貫路線"
      },
      direction: {
        en: "Southbound to NYC Manhattan ➔",
        zh: "往 紐約曼哈頓 ➔"
      }
    },

    routeStops: [
      {
        code: "A",
        label: "A",
        number: "A",
        nameNative: "BOSTON",
        nameRomaji: "Freedom Trail & Beacon Hill",
        name: { en: "Boston, MA", zh: "波士頓（麻省）" },
        days: { en: "Days 1–2", zh: "第 1–2 天" },
        desc: { en: "Freedom Trail, Beacon Hill brownstones & Harvard Yard.", zh: "自由之路、畢肯山紅磚歷史街區與哈佛大學校園。" },
        lat: 42.3601,
        lng: -71.0589,
        color: "#0039A6"
      },
      {
        code: "1",
        label: "1",
        number: "1",
        nameNative: "WHITE MOUNTAINS",
        nameRomaji: "Kancamagus Highway (NH)",
        name: { en: "White Mountains, NH", zh: "白山國家森林（新罕布夏）" },
        days: { en: "Days 3–4", zh: "第 3–4 天" },
        desc: { en: "Kancamagus Highway autumn foliage canopy & Flume Gorge.", zh: "全美最美景觀公路賞楓、弗盧姆峽谷自然奇景。" },
        lat: 44.0200,
        lng: -71.5000,
        color: "#EE352E"
      },
      {
        code: "2",
        label: "2",
        number: "2",
        nameNative: "STOWE & SMUGGLERS",
        nameRomaji: "Green Mountains (VT)",
        name: { en: "Stowe & Green Mtns, VT", zh: "斯托與綠山（佛蒙特）" },
        days: { en: "Days 5–6", zh: "第 5–6 天" },
        desc: { en: "Smugglers' Notch scenic gap road, cider mills & Von Trapp Lodge.", zh: "走私者峽谷楓葉盤山公路、傳統楓糖莊園及音樂之聲家庭農莊。" },
        lat: 44.4654,
        lng: -72.6874,
        color: "#00933C"
      },
      {
        code: "4",
        label: "4",
        number: "4",
        nameNative: "ACADIA NATL PARK",
        nameRomaji: "Bar Harbor & Cadillac Mtn (ME)",
        name: { en: "Acadia & Bar Harbor, ME", zh: "阿卡迪亞國家公園（緬因）" },
        days: { en: "Days 7–9", zh: "第 7–9 天" },
        desc: { en: "First sunrise at Cadillac Mountain, Ocean Path cliffs & fresh lobster pounds.", zh: "卡迪拉克山全美第一道日出、海濱花崗岩懸崖步道與海邊龍蝦排檔。" },
        lat: 44.3526,
        lng: -68.2251,
        color: "#FF6319"
      },
      {
        code: "N",
        label: "N",
        number: "N",
        nameNative: "NEWPORT",
        nameRomaji: "Gilded Age Mansions (RI)",
        name: { en: "Newport, RI", zh: "紐波特（羅德島）" },
        days: { en: "Day 10", zh: "第 10 天" },
        desc: { en: "The Breakers Vanderbilt mansion & ocean cliff walk.", zh: "范德比爾特鍍金時代奢華海邊古堡與海景步道。" },
        lat: 41.4698,
        lng: -71.2983,
        color: "#FCCC0A"
      },
      {
        code: "B",
        label: "B",
        number: "B",
        nameNative: "NEW YORK CITY",
        nameRomaji: "Central Park & Broadway",
        name: { en: "New York City, NY", zh: "紐約市（曼哈頓）" },
        days: { en: "Days 11–14", zh: "第 11–14 天" },
        desc: { en: "Central Park autumn colors, Top of the Rock, Broadway & High Line.", zh: "中央公園金黃榆樹大道、洛克斐勒中心觀景台、百老匯音樂劇與高線公園。" },
        lat: 40.7580,
        lng: -73.9855,
        color: "#FF6319"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     2. EMERGENCY CONTACTS
     ══════════════════════════════════════════════════ */
  emergency: {
    contacts: [
      {
        label: { en: "Emergency (Police / Fire / Ambulance)", zh: "美國全國緊急專線（報案/救護/消防）" },
        number: "911",
        notes: { en: "Toll-free nationwide emergency assistance", zh: "全美通用免付費緊急救援電話" }
      },
      {
        label: { en: "AAA Roadside Assistance", zh: "AAA 全美道路救援服務" },
        number: "1-800-222-4357",
        notes: { en: "Towing, flat tyre, jump-start, and lockout support", zh: "拖車、爆胎更換、電瓶搭電與開鎖救援" }
      },
      {
        label: { en: "Acadia Park Ranger Station", zh: "阿卡迪亞國家公園巡警中心" },
        number: "+1 207-288-3338",
        notes: { en: "Trail conditions, weather warnings & park rescue", zh: "步道路況通報、天氣警報與山區救援" }
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     3. PRACTICAL TIPS
     ══════════════════════════════════════════════════ */
  tips: [
    {
      id: "roadtrip-tips",
      icon: "🚙",
      title: { en: "Roadtrip & Toll Logistics", zh: "公路自駕與高速收費須知" },
      items: [
        {
          title: { en: "E-ZPass Transponder for Tollways", zh: "租車配備 E-ZPass 電子收費" },
          desc: {
            en: "Request an E-ZPass device with your rental car. Most turnpikes across MA, NH, ME, and NY are fully cashless cashless overhead gantries.",
            zh: "取車時務必租用 E-ZPass 應答器，美東大部分收費公路均已轉為全自動電子感應扣款。"
          }
        },
        {
          title: { en: "Drop Off Car Before NYC Manhattan", zh: "進入曼哈頓前交還租車" },
          desc: {
            en: "Avoid astronomical Manhattan overnight parking ($80–$100/night). Drop off rental car at LGA/JFK or New Haven and take train into Grand Central.",
            zh: "曼哈頓泊車費每晚高達 80–100 美元且交通擁堵，建議於機場交還租車，轉乘地鐵或火車輕鬆進城。"
          }
        }
      ]
    },
    {
      id: "park-permits",
      icon: "🌲",
      title: { en: "Park Passes & Mountain Sunrise", zh: "國家公園通行證與日出預約" },
      items: [
        {
          title: { en: "Cadillac Summit Sunrise Vehicle Pass", zh: "卡迪拉克山日出車輛通行證" },
          desc: {
            en: "Driving up Cadillac Mountain in Acadia for sunrise requires a timed vehicle reservation ($6) on Recreation.gov released 90 days in advance.",
            zh: "阿卡迪亞卡迪拉克山日出自駕時段必須提前於 Recreation.gov 網站預約指定車輛入場證。"
          }
        },
        {
          title: { en: "America the Beautiful Annual Pass", zh: "全美景觀公園年票" },
          desc: {
            en: "Purchase an America the Beautiful Pass ($80) covering entry to Acadia and all federal recreation sites for the whole vehicle.",
            zh: "購買 80 美元全美景觀公園年票，全車乘客均可免費進入阿卡迪亞國家公園。"
          }
        }
      ]
    }
  ],

  /* ══════════════════════════════════════════════════
     4. PACKING CHECKLIST
     ══════════════════════════════════════════════════ */
  packing: [
    {
      id: "pack-apparel",
      icon: "🧥",
      title: { en: "Autumn Layering Apparel", zh: "秋楓多層次穿搭" },
      items: [
        { id: "us-fleece", en: "Windproof fleece jacket / lightweight down vest", zh: "防風抓絨外套 / 輕量羽絨背心" },
        { id: "us-boots", en: "Waterproof hiking boots (Acadia & mountain trails)", zh: "防水防滑健行鞋（阿卡迪亞步道必備）" },
        { id: "us-beanie", en: "Thermal knit beanie & touch-screen gloves", zh: "保暖毛帽與觸控手套（清晨拍日出防寒）" }
      ]
    },
    {
      id: "pack-roadtrip",
      icon: "🚙",
      title: { en: "Roadtrip Gear & Tech", zh: "自駕裝備與攝影" },
      items: [
        { id: "us-cpolarizer", en: "Circular Polarizer (CPL) filter for vibrant autumn foliage", zh: "相機偏光鏡 (CPL) 強化紅葉與藍天色彩" },
        { id: "us-mount", en: "Car dashboard phone mount & fast 12V USB charger", zh: "車用手機支架與 12V 快速車充" },
        { id: "us-thermos", en: "Insulated thermos bottle for hot coffee on scenic drives", zh: "保溫瓶（公路自駕隨時享用熱咖啡）" }
      ]
    },
    {
      id: "pack-docs",
      icon: "🛂",
      title: { en: "Passports, ESTA & Permits", zh: "證件與國家公園通行證" },
      items: [
        { id: "us-passport", en: "Passport + Approved US ESTA / US Visa", zh: "有效護照與已核准之 ESTA 電子旅行授權" },
        { id: "us-license", en: "Physical Driver's Licence + IDP", zh: "原居地正式駕照及國際駕駛執照 (IDP)" },
        { id: "us-america-pass", en: "America the Beautiful National Parks Pass", zh: "全美國家公園年票（涵蓋阿卡迪亞門票）" }
      ]
    }
  ],

  /* ══════════════════════════════════════════════════
     5. BUDGET ESTIMATES
     ══════════════════════════════════════════════════ */
  budget: {
    items: [
      {
        category: { en: "Lodging (Scenic Inns & NYC Manhattan)", zh: "特色景觀木屋民宿與紐約酒店" },
        baseAmount: "$3,400",
        min: 3400,
        max: 3750,
        notes: { en: "13 nights total: Boston, White Mtns, Stowe, Bar Harbor, Newport & NYC", zh: "共13晚：波士頓、白山木屋、佛蒙特莊園、緬因海濱、紐波特及曼哈頓" }
      },
      {
        category: { en: "Full-Size AWD SUV Rental, Fuel & Tolls", zh: "SUV 全驅租車、保險、油費與路費" },
        baseAmount: "$1,350",
        min: 1350,
        max: 1500,
        notes: { en: "10 days SUV rental with full insurance + E-ZPass + gas", zh: "10天全尺寸 AWD SUV 租金、全險、E-ZPass 電子路費及全程油費" }
      },
      {
        category: { en: "Dining, Lobster Pounds & Cider Mills", zh: "緬因龍蝦盛宴、蘋果酒莊與特色美饌" },
        baseAmount: "$1,600",
        min: 1600,
        max: 1800,
        notes: { en: "Fresh lobster pounds, Vermont farm-to-table & NYC dining", zh: "現撈現煮緬因龍蝦、佛蒙特農場料理及紐約米芝蓮餐廳" }
      },
      {
        category: { en: "National Parks, Mansions & Broadway", zh: "國家公園、古堡門票與百老匯音樂劇" },
        baseAmount: "$850",
        min: 850,
        max: 950,
        notes: { en: "Acadia Park Pass, Breakers Mansion & Broadway top-tier musical", zh: "阿卡迪亞國家公園年票、羅德島古堡與百老匯經典音樂劇" }
      }
    ],
    total: {
      category: { en: "Total Estimated Trip Budget", zh: "預計總開支預算" },
      baseAmount: "$7,200",
      min: 7200,
      max: 8000,
      notes: { en: "Estimated for 2 adults (excl. flights)", zh: "2位成人預估總開支（不含國際機票）" }
    }
  },

  /* ══════════════════════════════════════════════════
     6. HOTELS & STAYS
     ══════════════════════════════════════════════════ */
  hotels: {
    quickLegs: [
      { label: { en: "Boston (Back Bay)", zh: "波士頓（後灣區）" }, dest: "Boston, Massachusetts", checkin: "2026-10-01", checkout: "2026-10-03", active: true },
      { label: { en: "White Mountains (NH)", zh: "白山森林渡假木屋" }, dest: "North Conway, New Hampshire", checkin: "2026-10-03", checkout: "2026-10-05", active: false },
      { label: { en: "Bar Harbor (Maine)", zh: "緬因阿卡迪亞海景" }, dest: "Bar Harbor, Maine", checkin: "2026-10-07", checkout: "2026-10-10", active: false },
      { label: { en: "New York (Manhattan)", zh: "紐約曼哈頓中城" }, dest: "New York, New York", checkin: "2026-10-11", checkout: "2026-10-15", active: false }
    ],
    legs: [
      {
        legNum: "Stop 1",
        nights: { en: "2 Nights", zh: "2 晚" },
        dates: "Oct 1 – Oct 3",
        title: { en: "Boston: Back Bay & Freedom Trail", zh: "波士頓：後灣區與自由之路歷史酒店" },
        desc: {
          en: "Historic Victorian brownstone boutique hotel walking distance to Boston Common and Newbury Street.",
          zh: "入住波士頓後灣區維多利亞風格精品酒店，步行可達波士頓公園與紐伯里街精品大道。"
        },
        tags: ["Boston", "Back Bay", "Freedom Trail"],
        dest: "Boston, Massachusetts",
        checkin: "2026-10-01",
        checkout: "2026-10-03"
      },
      {
        legNum: "Stop 2",
        nights: { en: "2 Nights", zh: "2 晚" },
        dates: "Oct 3 – Oct 5",
        title: { en: "White Mountains: Mountain View Lodge", zh: "白山國家森林：秋楓全景渡假木屋" },
        desc: {
          en: "Cozy timber mountain lodge with fireplace and panoramic views along Kancamagus Highway.",
          zh: "坐落於康卡馬格斯公路旁的全景木屋旅館，設有壁爐並享有絕美秋楓山景。"
        },
        tags: ["White Mountains", "Fall Foliage", "Timber Lodge"],
        dest: "North Conway, New Hampshire",
        checkin: "2026-10-03",
        checkout: "2026-10-05"
      },
      {
        legNum: "Stop 3",
        nights: { en: "3 Nights", zh: "3 晚" },
        dates: "Oct 7 – Oct 10",
        title: { en: "Acadia: Bar Harbor Oceanfront Inn", zh: "阿卡迪亞：巴港海濱景觀旅館" },
        desc: {
          en: "Charming oceanfront resort overlooking Frenchman Bay, 5 minutes from Acadia National Park entrance.",
          zh: "俯瞰法國人灣的迷人海邊渡假村，距離阿卡迪亞國家公園入口僅 5 分鐘車程。"
        },
        tags: ["Bar Harbor", "Acadia", "Oceanfront"],
        dest: "Bar Harbor, Maine",
        checkin: "2026-10-07",
        checkout: "2026-10-10"
      },
      {
        legNum: "Stop 4",
        nights: { en: "4 Nights", zh: "4 晚" },
        dates: "Oct 11 – Oct 15",
        title: { en: "New York: Midtown Manhattan Skyline", zh: "紐約：曼哈頓中城天際線景觀酒店" },
        desc: {
          en: "Sleek modern hotel near Central Park South and Broadway, ideal for theatre and dining.",
          zh: "鄰近中央公園南側與百老匯劇院區的現代精品高層酒店，交通四通八達。"
        },
        tags: ["New York City", "Manhattan", "Central Park"],
        dest: "New York, New York",
        checkin: "2026-10-11",
        checkout: "2026-10-15"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     7. TRANSIT RECOMMENDATIONS
     ══════════════════════════════════════════════════ */
  transit: {
    cards: [
      {
        id: "transit-suv",
        icon: "🚙",
        title: { en: "AWD SUV Rental & E-ZPass Tollways", zh: "全驅 SUV 自駕與 E-ZPass 自動過路" },
        details: {
          en: "Opt for an All-Wheel-Drive SUV for mountain gap roads in Vermont and Maine, equipped with an E-ZPass transponder.",
          zh: "建議租用 AWD 全驅 SUV 輕鬆征服佛蒙特與緬因山路，並配備 E-ZPass 電子收費設備。"
        }
      },
      {
        id: "transit-mta-omny",
        icon: "🚇",
        title: { en: "NYC Subway & OMNY Tap-to-Pay", zh: "紐約地鐵與 OMNY 感應式支付" },
        details: {
          en: "Tap your contactless credit card or Apple Pay on OMNY subway readers. Auto weekly fare capping after 12 rides.",
          zh: "直接在閘機感應信用卡或 Apple Pay 乘搭紐約地鐵，每週滿 12 程後享有自動封頂優惠。"
        }
      },
      {
        id: "transit-amtrak",
        icon: "🚆",
        title: { en: "Amtrak Northeast Regional / Acela Express", zh: "Amtrak 美東東北走廊高速火車" },
        details: {
          en: "Fast and scenic rail link connecting Boston, Providence, New Haven, and NYC Pennsylvania Station.",
          zh: "連接波士頓、普羅維登斯、紐黑文與紐約賓州車站的便捷景觀鐵路走廊。"
        }
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.SITE_DATA = SITE_DATA;
}
