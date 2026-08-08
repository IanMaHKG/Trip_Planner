/**
 * @file site-data.js
 * @description DATA SOURCE — Japan 5-Day Express (Tokyo, Hakone, Kyoto, Osaka)
 */

const SITE_DATA = {
  /* ══════════════════════════════════════════════════
     1. OVERVIEW CARDS & ROUTE BOARD
     ══════════════════════════════════════════════════ */
  overview: {
    cards: [
      {
        id: "overview-pace",
        icon: "🚅",
        title: { en: "Pace & Rhythm", zh: "步調節奏" },
        desc: {
          en: "Fast-paced Golden Route express. Connects Tokyo's metropolis, Hakone hot springs, and Kyoto's historic temples via 300 km/h Shinkansen.",
          zh: "高效經典黃金路線。乘搭時速 300 公里東海道新幹線，無縫連接東京繁華都會、箱根溫泉仙境與京都千年古都。"
        }
      },
      {
        id: "overview-transport",
        icon: "💳",
        title: { en: "Transport & Passes", zh: "交通與票券" },
        desc: {
          en: "Tokaido Shinkansen (Nozomi bullet train) for intercity travel + Hakone Freepass + Apple Wallet Digital Suica/ICOCA for local subways.",
          zh: "城際搭乘東海道新幹線（Nozomi 希望號）+ 箱根周遊券 + iPhone Apple Wallet 綁定 Suica/ICOCA 乘搭市區地鐵。"
        }
      },
      {
        id: "overview-weather",
        icon: "🍁",
        title: { en: "Autumn Climate", zh: "秋季氣候" },
        desc: {
          en: "Crisp autumn weather (10–18°C). Vibrant red Momiji foliage peak in Kyoto. Light jacket and comfortable walking shoes essential.",
          zh: "秋高氣爽，氣溫約 10–18°C，正值京都紅葉見頃期。建議備妥輕便外套、層次穿搭與舒適防滑步行鞋。"
        }
      },
      {
        id: "overview-dining",
        icon: "🍣",
        title: { en: "Gastronomy", zh: "美食饗宴" },
        desc: {
          en: "Tsukiji sushi, Hakone Kaiseki banquet, Kyoto Matcha sweets & Yudofu, and Osaka Dotonbori street delicacies.",
          zh: "築地海鮮壽司、箱根傳統懷石料理、京都抹茶甜品與湯豆腐、大阪道頓堀章魚燒與居酒屋。"
        }
      }
    ],

    routeBoard: {
      type: "rail",
      style: "jr-rail",
      badge: "🇯🇵 JR · 新幹線",
      lineTitle: {
        en: "東海道新幹線・ゴールデンルート · Tokaido Golden Route",
        zh: "東海道新幹線・秋季黃金精華路線"
      },
      direction: {
        en: "Bound for Osaka 方面 ➔",
        zh: "往 大阪方面 ➔"
      }
    },

    routeStops: [
      {
        code: "01",
        label: "TYO",
        number: "01",
        nameNative: "東京",
        nameRomaji: "Tokyo (Shibuya & Asakusa)",
        name: { en: "Tokyo", zh: "東京" },
        days: { en: "Days 1–2", zh: "第 1–2 天" },
        desc: { en: "Shibuya Sky, Tsukiji Outer Market & Asakusa Senso-ji.", zh: "澀谷天空展望台、築地場外市場及淺草寺參拜。" },
        lat: 35.6812,
        lng: 139.7671,
        color: "#008000"
      },
      {
        code: "02",
        label: "HKN",
        number: "02",
        nameNative: "箱根",
        nameRomaji: "Hakone (Onsen & Mt. Fuji)",
        name: { en: "Hakone", zh: "箱根" },
        days: { en: "Days 2–3", zh: "第 2–3 天" },
        desc: { en: "Lake Ashi Pirate Ship, Owakudani volcanic ropeway & Onsen Ryokan.", zh: "蘆之湖海賊船、大涌谷纜車及傳統一泊二食溫泉旅館。" },
        lat: 35.2323,
        lng: 139.1069,
        color: "#0098A6"
      },
      {
        code: "03",
        label: "KTO",
        number: "03",
        nameNative: "京都",
        nameRomaji: "Kyoto (Arashiyama & Gion)",
        name: { en: "Kyoto", zh: "京都" },
        days: { en: "Days 3–4", zh: "第 3–4 天" },
        desc: { en: "Fushimi Inari 10,000 torii, Kiyomizu-dera & Arashiyama Bamboo Grove.", zh: "伏見稻荷千本鳥居、清水寺懸崖舞台及嵐山竹林小徑。" },
        lat: 35.0037,
        lng: 135.7681,
        color: "#E60012"
      },
      {
        code: "04",
        label: "OSA",
        number: "04",
        nameNative: "大阪",
        nameRomaji: "Osaka (Dotonbori & KIX)",
        name: { en: "Osaka", zh: "大阪" },
        days: { en: "Days 4–5", zh: "第 4–5 天" },
        desc: { en: "Dotonbori Glico sign, Kuromon Market street eats & Kansai Airport departure.", zh: "道頓堀固力果跑人地標、黑門市場美饌及關西機場回程。" },
        lat: 34.6687,
        lng: 135.5013,
        color: "#0072BC"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     2. EMERGENCY CONTACTS
     ══════════════════════════════════════════════════ */
  emergency: {
    contacts: [
      {
        label: { en: "Police Emergency", zh: "警察局 (報案)" },
        number: "110",
        notes: { en: "English translation support available", zh: "全日本警察通用緊急報案電話" }
      },
      {
        label: { en: "Ambulance & Fire", zh: "救護車及消防" },
        number: "119",
        notes: { en: "Immediate medical emergency & rescue", zh: "醫療急救與火警緊急專線" }
      },
      {
        label: { en: "Japan Visitor Hotline (JNTO)", zh: "JNTO 日本國家旅遊局熱線" },
        number: "+81 50 3816 2720",
        notes: { en: "24/7 Multilingual assistance (EN/ZH/JA)", zh: "24小時多語言旅客支援服務" }
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     3. PRACTICAL TIPS
     ══════════════════════════════════════════════════ */
  tips: [
    {
      id: "tech-transit",
      icon: "📱",
      title: { en: "Digital Transit & Payment", zh: "智能交通與支付" },
      items: [
        {
          title: { en: "Apple Wallet Digital Suica / ICOCA", zh: "Apple Wallet 數位交通卡" },
          desc: {
            en: "Add Suica or ICOCA directly to Apple Wallet. Top up seamlessly with Apple Pay credit card for trains, buses, and convenience stores.",
            zh: "直接在 iPhone 錢包加入 Suica 或 ICOCA，隨時用信用卡增值，一拍即過閘機，亦適用於所有便利店消費。"
          }
        },
        {
          title: { en: "Shinkansen SmartEX Reservation", zh: "新幹線 SmartEX 線上預訂" },
          desc: {
            en: "Book Tokaido Shinkansen reserved seats and oversize baggage spaces in advance via the SmartEX app and link to your IC card.",
            zh: "出發前使用 SmartEX App 預約新幹線指定席與特大行李放置席，更可直接綁定至 IC 交通卡進站。"
          }
        }
      ]
    },
    {
      id: "culture-etiquette",
      icon: "♨️",
      title: { en: "Culture & Etiquette", zh: "文化與溫泉禮儀" },
      items: [
        {
          title: { en: "Onsen Etiquette in Hakone", zh: "箱根溫泉入浴須知" },
          desc: {
            en: "Wash thoroughly before entering thermal pools. No swimwear allowed in traditional public baths. Small towels must not touch bath water.",
            zh: "進入溫泉池前必須在沖洗區徹底洗淨身體；傳統溫泉禁止穿泳衣入池；小毛巾不可浸入溫泉水中。"
          }
        },
        {
          title: { en: "Tax-Free Shopping with Passport", zh: "持實體護照辦理退稅" },
          desc: {
            en: "Always carry your physical passport for instant 10% tax-free at Don Quijote, Bic Camera, and department stores on purchases over ¥5,000.",
            zh: "隨身攜帶實體護照，於各大百貨、Bic Camera 及唐吉訶德單日消費滿 5,000 日圓即享 10% 免稅優惠。"
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
      id: "pack-docs",
      icon: "🛂",
      title: { en: "Documents & Currency", zh: "證件與金融卡" },
      items: [
        { id: "jp-passport", en: "Passport (valid 6+ months)", zh: "實體護照（需有6個月以上有效期）" },
        { id: "jp-vjw", en: "Visit Japan Web QR Code saved offline", zh: "Visit Japan Web 入境申報 QR Code 截圖" },
        { id: "jp-suica", en: "Suica / ICOCA added to Apple Wallet", zh: "手機錢包已加入 Suica/ICOCA 交通卡" },
        { id: "jp-cash", en: "JPY Cash (¥30,000 for shrines & food stalls)", zh: "日圓現金（約3萬円供寺廟御守與小吃）" }
      ]
    },
    {
      id: "pack-electronics",
      icon: "⚡",
      title: { en: "Electronics & Tech", zh: "電子用品與上網" },
      items: [
        { id: "jp-esim", en: "Japan 5G eSIM / Roaming Activated", zh: "日本 5G eSIM / 漫遊數據已啟用" },
        { id: "jp-powerbank", en: "High-capacity MagSafe Power Bank", zh: "高容量行動電源（需隨身攜帶上機）" },
        { id: "jp-adapter", en: "US/Japan 2-pin flat plug adapters", zh: "日本雙平腳插頭轉換器" }
      ]
    },
    {
      id: "pack-apparel",
      icon: "👟",
      title: { en: "Clothing & Footwear", zh: "服飾與必備品" },
      items: [
        { id: "jp-shoes", en: "Comfortable slip-on walking shoes (for shrines)", zh: "好穿脫防滑步行鞋（方便進出寺廟脫鞋）" },
        { id: "jp-jacket", en: "Light warm jacket & windbreaker", zh: "輕便保暖防風外套（早晚溫差大）" },
        { id: "jp-heattech", en: "Heattech thermal base layers", zh: "保暖發熱衣" }
      ]
    }
  ],

  /* ══════════════════════════════════════════════════
     5. BUDGET ESTIMATES
     ══════════════════════════════════════════════════ */
  budget: {
    items: [
      {
        category: { en: "Accommodation (Hotels & Ryokan)", zh: "精選酒店與箱根一泊二食溫泉" },
        baseAmount: "¥140,000",
        min: 930,
        max: 1050,
        notes: { en: "4 nights total: 1N Tokyo + 1N Hakone Ryokan + 2N Kyoto", zh: "共4晚：1晚東京市區 + 1晚箱根溫泉旅館 + 2晚京都" }
      },
      {
        category: { en: "Transport (Shinkansen & Local)", zh: "新幹線及市內交通" },
        baseAmount: "¥65,000",
        min: 430,
        max: 480,
        notes: { en: "Tokaido Shinkansen reserved seats + Hakone Freepass + Metro", zh: "東海道新幹線指定席 + 箱根周遊券 + 市區地鐵" }
      },
      {
        category: { en: "Dining & Culinary Experiences", zh: "餐飲與美食饗宴" },
        baseAmount: "¥75,000",
        min: 500,
        max: 560,
        notes: { en: "Tsukiji sushi, Kaiseki dinner, Matcha sweets & Dotonbori eats", zh: "築地壽司、溫泉懷石料理、宇治抹茶與大阪道頓堀美食" }
      },
      {
        category: { en: "Sightseeing & Experiences", zh: "景點門票與文化體驗" },
        baseAmount: "¥40,000",
        min: 260,
        max: 300,
        notes: { en: "Shibuya Sky, teamLab, Temple entries, and souvenirs", zh: "澀谷天空展望台、寺廟門票及伴手禮" }
      }
    ],
    total: {
      category: { en: "Total Estimated Trip Budget", zh: "預計總開支預算" },
      baseAmount: "¥320,000",
      min: 2120,
      max: 2390,
      notes: { en: "Estimated for 2 adults (excl. flights)", zh: "2位成人預估總開支（不含國際機票）" }
    }
  },

  /* ══════════════════════════════════════════════════
     6. HOTELS & STAYS
     ══════════════════════════════════════════════════ */
  hotels: {
    quickLegs: [
      { label: { en: "Tokyo (Shibuya)", zh: "東京（澀谷）" }, dest: "Tokyo, Japan", checkin: "2026-11-14", checkout: "2026-11-15", active: true },
      { label: { en: "Hakone (Onsen)", zh: "箱根（溫泉）" }, dest: "Hakone, Japan", checkin: "2026-11-15", checkout: "2026-11-16", active: false },
      { label: { en: "Kyoto (Gion)", zh: "京都（祇園）" }, dest: "Kyoto, Japan", checkin: "2026-11-16", checkout: "2026-11-18", active: false }
    ],
    legs: [
      {
        legNum: "Stop 1",
        nights: { en: "1 Night", zh: "1 晚" },
        dates: "Nov 14 – Nov 15",
        title: { en: "Tokyo: Shibuya & Shinjuku Sky", zh: "東京：澀谷與新宿天際線" },
        desc: {
          en: "Stay near Shibuya or Shinjuku station for quick Shinkansen departures and vibrant nightlife.",
          zh: "入住澀谷或新宿站旁精品酒店，盡享高空夜景與便利的新幹線交通。"
        },
        tags: ["Tokyo", "Shibuya", "Skyline"],
        dest: "Tokyo, Japan",
        checkin: "2026-11-14",
        checkout: "2026-11-15"
      },
      {
        legNum: "Stop 2",
        nights: { en: "1 Night", zh: "1 晚" },
        dates: "Nov 15 – Nov 16",
        title: { en: "Hakone: Traditional Hot Spring Ryokan", zh: "箱根：傳統一泊二食溫泉旅館" },
        desc: {
          en: "Authentic Tatami ryokan experience with private outdoor Onsen and seasonal Kaiseki dinner.",
          zh: "體驗純日式榻榻米客房、露天風呂溫泉與主廚旬彩懷石料理。"
        },
        tags: ["Hakone", "Onsen", "Kaiseki"],
        dest: "Hakone, Japan",
        checkin: "2026-11-15",
        checkout: "2026-11-16"
      },
      {
        legNum: "Stop 3",
        nights: { en: "2 Nights", zh: "2 晚" },
        dates: "Nov 16 – Nov 18",
        title: { en: "Kyoto: Gion & Kawaramachi Heritage", zh: "京都：祇園與四條河原町古風住宿" },
        desc: {
          en: "Walk to Gion teahouses, Yasaka Shrine, and early morning Fushimi Inari torii paths.",
          zh: "漫步可達花見小路茶屋、八坂神社與清晨伏見稻荷千本鳥居。"
        },
        tags: ["Kyoto", "Gion", "Heritage"],
        dest: "Kyoto, Japan",
        checkin: "2026-11-16",
        checkout: "2026-11-18"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     7. TRANSIT RECOMMENDATIONS
     ══════════════════════════════════════════════════ */
  transit: {
    cards: [
      {
        id: "transit-shinkansen",
        icon: "🚅",
        title: { en: "Tokaido Shinkansen (Nozomi Express)", zh: "東海道新幹線（Nozomi 希望號）" },
        details: {
          en: "Tokyo to Kyoto in just 2 hrs 15 mins at 300 km/h. Reserve SmartEX seats on the right side (Row E) for Mt. Fuji views.",
          zh: "時速 300 公里，東京至京都僅需 2 小時 15 分鐘。預約 SmartEX 指定席時請選擇右側 E 席以眺望富士山。"
        }
      },
      {
        id: "transit-hakone",
        icon: "🚡",
        title: { en: "Hakone Freepass & Romancecar", zh: "箱根周遊券與小田急浪漫特快" },
        details: {
          en: "Unlimited rides on Hakone Tozan Train, Cable Car, Ropeway, and Lake Ashi Sightseeing Cruise with one seamless digital pass.",
          zh: "一張周遊券暢乘箱根登山鐵道、登山纜車、空中纜車及蘆之湖海賊觀光船。"
        }
      },
      {
        id: "transit-ic",
        icon: "💳",
        title: { en: "Apple Wallet Suica / ICOCA Tap-to-Pay", zh: "Apple Wallet 數位交通卡感應乘車" },
        details: {
          en: "Tap your iPhone or Apple Watch on all Tokyo Metro, Kyoto city buses, Osaka subways, and convenience stores nationwide.",
          zh: "以 iPhone 或 Apple Watch 感應乘搭東京地鐵、京都巴士、大阪地鐵，並支援全國便利店免觸消費。"
        }
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.SITE_DATA = SITE_DATA;
}
