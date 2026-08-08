/**
 * @file site-data.js
 * @description DATA SOURCE — UK & Scotland 10-Day Heritage Tour
 */

const SITE_DATA = {
  /* ══════════════════════════════════════════════════
     1. OVERVIEW CARDS & ROUTE BOARD
     ══════════════════════════════════════════════════ */
  overview: {
    cards: [
      {
        id: "overview-pace",
        icon: "🏰",
        title: { en: "Pace & Rhythm", zh: "步調節奏" },
        desc: {
          en: "Balanced cultural & heritage pace. 4 nights in London, 2 nights in Bath & Cotswolds, 1 night in medieval York, and 3 nights in Scottish capital Edinburgh.",
          zh: "深度歷史與自然漫遊。倫敦停留 4 晚，巴斯及科茲窩 2 晚，中世紀約克 1 晚，蘇格蘭首府愛丁堡 3 晚。"
        }
      },
      {
        id: "overview-transport",
        icon: "🚆",
        title: { en: "Rail & Tube", zh: "高鐵與地鐵" },
        desc: {
          en: "Contactless payment on London Underground (daily cap applies) + LNER Azuma 125 mph high-speed trains connecting England and Scotland.",
          zh: "倫敦地鐵使用感應式信用卡（享有每日票價上限）+ 乘搭時速 200 公里的 LNER Azuma 東海岸特快列車貫通英蘇兩國。"
        }
      },
      {
        id: "overview-weather",
        icon: "⛅",
        title: { en: "British Summer Weather", zh: "英倫初夏氣候" },
        desc: {
          en: "Comfortable early summer (14–22°C in South, 11–18°C in Scotland). Long daylight hours until 22:00. Layering and compact umbrella essential.",
          zh: "氣候宜人（英格蘭南部約 14–22°C，蘇格蘭約 11–18°C），夏至前後日照長達晚上 10 點。備妥防風防雨薄外套及便攜雨傘。"
        }
      },
      {
        id: "overview-culture",
        icon: "🫖",
        title: { en: "Dining & Pubs", zh: "英倫美食與酒吧" },
        desc: {
          en: "Traditional Afternoon Tea at Fortnum & Mason, Sunday Roast in historic Cotswold inns, fresh Scottish seafood, and Speyside single malt whisky.",
          zh: "Fortnum & Mason 正統英式下午茶、科茲窩百年石屋酒館週日烤肉 (Sunday Roast)、蘇格蘭新鮮海鮮與單一麥芽威士忌。"
        }
      }
    ],

    routeBoard: {
      type: "rail",
      style: "london-underground",
      badge: "🔴 UNDERGROUND",
      lineTitle: {
        en: "Piccadilly, GWR & East Coast Heritage Line",
        zh: "倫敦地鐵・大西部鐵路與東海岸古堡縱貫線"
      },
      direction: {
        en: "Northbound to Edinburgh ➔",
        zh: "往 愛丁堡方向 ➔"
      }
    },

    routeStops: [
      {
        code: "01",
        label: "LHR",
        nameNative: "Heathrow",
        nameRomaji: "Heathrow (Terminal 2/3)",
        name: { en: "Heathrow Airport", zh: "希斯路機場" },
        days: { en: "Day 1", zh: "第 1 天" },
        desc: { en: "Arrival via Elizabeth Line / Piccadilly Line to Central London.", zh: "抵達英國，乘搭伊利沙伯線或皮卡迪利線直達倫敦市中心。" },
        lat: 51.4700,
        lng: -0.4543,
        color: "#0019A8"
      },
      {
        code: "02",
        label: "LON",
        nameNative: "London",
        nameRomaji: "London (West End & Tower)",
        name: { en: "Central London", zh: "倫敦市中心" },
        days: { en: "Days 1–4", zh: "第 1–4 天" },
        desc: { en: "British Museum, Westminster Abbey, Tower Bridge & West End musicals.", zh: "大英博物館、西敏寺、倫敦塔橋及西區經典音樂劇。" },
        lat: 51.5074,
        lng: -0.1278,
        color: "#E32017"
      },
      {
        code: "03",
        label: "BAT",
        nameNative: "Bath",
        nameRomaji: "Bath & Cotswolds",
        name: { en: "Bath & Cotswolds", zh: "巴斯與科茲窩" },
        days: { en: "Days 4–6", zh: "第 4–6 天" },
        desc: { en: "Ancient Roman Baths, Royal Crescent & fairytale stone villages Castle Combe.", zh: "古羅馬浴場、皇家新月樓及科茲窩童話石屋小鎮。" },
        lat: 51.3811,
        lng: -2.3598,
        color: "#00843D"
      },
      {
        code: "04",
        label: "YRK",
        nameNative: "York",
        nameRomaji: "York Minster",
        name: { en: "York", zh: "約克" },
        days: { en: "Days 6–7", zh: "第 6–7 天" },
        desc: { en: "Gothic York Minster Cathedral, medieval Shambles & City Walls.", zh: "中世紀哥德式約克大教堂、哈利波特斜角巷原型肉鋪街與古城牆。" },
        lat: 53.9623,
        lng: -1.0819,
        color: "#D97706"
      },
      {
        code: "05",
        label: "EDB",
        nameNative: "Edinburgh",
        nameRomaji: "Edinburgh Castle",
        name: { en: "Edinburgh", zh: "愛丁堡" },
        days: { en: "Days 7–10", zh: "第 7–10 天" },
        desc: { en: "Edinburgh Castle perched on volcanic rock, Royal Mile & Arthur's Seat sunset.", zh: "火山岩上的愛丁堡城堡、皇家一英里大道及亞瑟王座壯麗日落。" },
        lat: 55.9533,
        lng: -3.1883,
        color: "#002B49"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     2. EMERGENCY CONTACTS
     ══════════════════════════════════════════════════ */
  emergency: {
    contacts: [
      {
        label: { en: "Emergency (Police / Ambulance / Fire)", zh: "英國緊急求助熱線（警察/救護/消防）" },
        number: "999",
        notes: { en: "Nationwide emergency number (or 112 from EU mobiles)", zh: "全英通用免費緊急報案電話" }
      },
      {
        label: { en: "NHS Non-Emergency Health Advice", zh: "NHS 國民保健非緊急醫療諮詢" },
        number: "111",
        notes: { en: "24/7 Medical assessment and pharmacy assistance", zh: "24小時非緊急醫療指導與值班診所轉介" }
      },
      {
        label: { en: "Police Non-Emergency", zh: "非緊急警方報案熱線" },
        number: "101",
        notes: { en: "For minor theft, lost property, or non-urgent inquiries", zh: "適用於財物遺失、一般報案或非即時求助" }
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     3. PRACTICAL TIPS
     ══════════════════════════════════════════════════ */
  tips: [
    {
      id: "transit-ticketing",
      icon: "💳",
      title: { en: "Underground & Rail Ticketing", zh: "地鐵乘車與鐵路票券" },
      items: [
        {
          title: { en: "Contactless Tap-to-Pay on TfL", zh: "倫敦交通感應信用卡直接拍卡" },
          desc: {
            en: "No Oyster card needed. Tap your phone or contactless card for automatic daily fare capping across Tube, buses, DLR, and Elizabeth Line.",
            zh: "無須購買 Oyster 實體卡，直接使用手機或感應式信用卡進出閘機，系統自動計算每日票價上限。"
          }
        },
        {
          title: { en: "Advance Rail Tickets on LNER & GWR", zh: "提早購買早鳥火車票" },
          desc: {
            en: "Book intercity high-speed train tickets 8–12 weeks in advance on the LNER or Trainline app for up to 60% savings on London–York–Edinburgh routes.",
            zh: "提前 8 至 12 週於官網預訂 LNER 及 GWR 早鳥優惠票 (Advance Tickets)，票價可節省高達 60%。"
          }
        }
      ]
    },
    {
      id: "museums-attractions",
      icon: "🏛️",
      title: { en: "Museums & Castles Bookings", zh: "博物館與古堡預約" },
      items: [
        {
          title: { en: "Free London National Museums", zh: "倫敦國家級博物館免費參觀" },
          desc: {
            en: "British Museum, National Gallery, V&A, and Natural History Museum offer free general admission. Book free timed-entry slots online.",
            zh: "大英博物館、國家美術館、V&A 及自然歷史博物館常設展皆免費開放，建議提前於官網預約免費定時入場時段。"
          }
        },
        {
          title: { en: "Historic Royal Palaces & Castle Passes", zh: "皇家古堡門票提前預約" },
          desc: {
            en: "Tower of London, Windsor Castle, and Edinburgh Castle have strictly capped capacities; reserve your timed tickets online in advance.",
            zh: "倫敦塔、溫莎城堡及愛丁堡城堡每日名額有限，務必出發前在官方網站預購指定時段入場門票。"
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
      title: { en: "Documents & Cards", zh: "證件與金融卡" },
      items: [
        { id: "uk-passport", en: "Passport (valid 6+ months)", zh: "有效護照（需有6個月以上有效期）" },
        { id: "uk-rail", en: "LNER e-Tickets saved in Apple Wallet", zh: "LNER 火車電子票存入手機錢包" },
        { id: "uk-contactless", en: "Contactless payment cards (Apple Pay / Google Wallet)", zh: "感應式信用卡 / 手機支付（倫敦交通必備）" }
      ]
    },
    {
      id: "pack-tech",
      icon: "🔌",
      title: { en: "Electronics & Adapters", zh: "電器與英規插頭" },
      items: [
        { id: "uk-adapter", en: "UK 3-pin rectangular plug adapters (Type G)", zh: "英國標準三腳扁型插頭轉換器 (Type G)" },
        { id: "uk-powerbank", en: "High-capacity MagSafe Power Bank", zh: "大容量行動電源（全日外出必備）" },
        { id: "uk-sim", en: "UK/Europe 5G eSIM with generous data", zh: "英國及歐洲通用 5G 高速上網卡" }
      ]
    },
    {
      id: "pack-weather",
      icon: "🧥",
      title: { en: "British Weather Essentials", zh: "英倫氣候與服飾" },
      items: [
        { id: "uk-umbrella", en: "Windproof compact umbrella & trench coat", zh: "防風折疊雨傘與經典乾濕風衣" },
        { id: "uk-shoes", en: "Comfortable waterproof walking shoes for cobblestones", zh: "舒適防潑水步行鞋（適合古鎮石磚路）" },
        { id: "uk-knitwear", en: "Light merino wool sweater for Scottish evenings", zh: "輕便羊毛保暖衫（蘇格蘭早晚偏涼）" }
      ]
    }
  ],

  /* ══════════════════════════════════════════════════
     5. BUDGET ESTIMATES
     ══════════════════════════════════════════════════ */
  budget: {
    items: [
      {
        category: { en: "Accommodation (London, Bath & Edinburgh)", zh: "精品酒店與歷史莊園住宿" },
        baseAmount: "£1,950",
        min: 2450,
        max: 2700,
        notes: { en: "9 nights total: 4N London + 2N Bath + 1N York + 2N Edinburgh", zh: "共9晚：4晚倫敦 + 2晚巴斯 + 1晚約克 + 2晚愛丁堡" }
      },
      {
        category: { en: "Transport (LNER Azuma & Underground)", zh: "城際高鐵與地鐵交通" },
        baseAmount: "£650",
        min: 820,
        max: 900,
        notes: { en: "London–Bath GWR, London–York–Edinburgh LNER Azuma + TfL", zh: "大西部鐵路、東海岸特快列車與倫敦市區交通" }
      },
      {
        category: { en: "Dining, Afternoon Tea & Pubs", zh: "傳統英式餐飲、下午茶與小酒館" },
        baseAmount: "£1,100",
        min: 1380,
        max: 1520,
        notes: { en: "Fortnum & Mason Tea, Cotswold Sunday Roast & Scottish seafood", zh: "百年貴族下午茶、鄉村酒館烤肉與蘇格蘭威士忌美饌" }
      },
      {
        category: { en: "Royal Castles & Musical Tickets", zh: "古堡門票與西區音樂劇" },
        baseAmount: "£500",
        min: 630,
        max: 700,
        notes: { en: "Tower of London, Windsor Castle, Edinburgh Castle & West End show", zh: "倫敦塔、溫莎城堡、愛丁堡城堡及倫敦西區音樂劇" }
      }
    ],
    total: {
      category: { en: "Total Estimated Trip Budget", zh: "預計總開支預算" },
      baseAmount: "£4,200",
      min: 5280,
      max: 5820,
      notes: { en: "Estimated for 2 adults (excl. flights)", zh: "2位成人預估總開支（不含國際機票）" }
    }
  },

  /* ══════════════════════════════════════════════════
     6. HOTELS & STAYS
     ══════════════════════════════════════════════════ */
  hotels: {
    quickLegs: [
      { label: { en: "London (West End)", zh: "倫敦（西區）" }, dest: "London, United Kingdom", checkin: "2026-06-10", checkout: "2026-06-14", active: true },
      { label: { en: "Bath (Heritage)", zh: "巴斯（古城）" }, dest: "Bath, United Kingdom", checkin: "2026-06-14", checkout: "2026-06-16", active: false },
      { label: { en: "Edinburgh (Old Town)", zh: "愛丁堡（舊城）" }, dest: "Edinburgh, United Kingdom", checkin: "2026-06-17", checkout: "2026-06-20", active: false }
    ],
    legs: [
      {
        legNum: "Stop 1",
        nights: { en: "4 Nights", zh: "4 晚" },
        dates: "Jun 10 – Jun 14",
        title: { en: "London: West End & South Bank", zh: "倫敦：西區劇院與泰晤士河南岸" },
        desc: {
          en: "Centrally located boutique hotel walking distance to Covent Garden, Soho, and Thames promenade.",
          zh: "入住科芬園或泰晤士河南岸精品酒店，步行可達各大劇院與美術館。"
        },
        tags: ["London", "West End", "Covent Garden"],
        dest: "London, United Kingdom",
        checkin: "2026-06-10",
        checkout: "2026-06-14"
      },
      {
        legNum: "Stop 2",
        nights: { en: "2 Nights", zh: "2 晚" },
        dates: "Jun 14 – Jun 16",
        title: { en: "Bath & Cotswolds: Georgian Townhouse", zh: "巴斯與科茲窩：喬治亞風古典聯排酒店" },
        desc: {
          en: "Georgian stone residence in central Bath with direct access to Roman Baths and day trips to Cotswold villages.",
          zh: "巴斯市中心古典石造宅邸酒店，鄰近古羅馬浴場與科茲窩鄉村。"
        },
        tags: ["Bath", "Cotswolds", "Georgian"],
        dest: "Bath, United Kingdom",
        checkin: "2026-06-14",
        checkout: "2026-06-16"
      },
      {
        legNum: "Stop 3",
        nights: { en: "3 Nights", zh: "3 晚" },
        dates: "Jun 17 – Jun 20",
        title: { en: "Edinburgh: Royal Mile & Castle View", zh: "愛丁堡：皇家一英里與城堡景觀酒店" },
        desc: {
          en: "Historic Victorian hotel along Princes Street offering panoramic views of Edinburgh Castle.",
          zh: "王子街維多利亞風格歷史酒店，坐擁愛丁堡古堡全景與舊城古道。"
        },
        tags: ["Edinburgh", "Old Town", "Castle View"],
        dest: "Edinburgh, United Kingdom",
        checkin: "2026-06-17",
        checkout: "2026-06-20"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     7. TRANSIT RECOMMENDATIONS
     ══════════════════════════════════════════════════ */
  transit: {
    cards: [
      {
        id: "transit-tfl",
        icon: "🚇",
        title: { en: "London Underground & Elizabeth Line", zh: "倫敦地鐵與伊利沙伯線" },
        details: {
          en: "TfL network covers all central zones. Contactless tap-to-pay provides automatic daily capping (£8.50 in Zones 1–2).",
          zh: "感應式信用卡直接過閘，享受自動每日票價上限（Zone 1–2 每日封頂約 £8.50）。"
        }
      },
      {
        id: "transit-lner",
        icon: "🚄",
        title: { en: "LNER Azuma High-Speed Rail", zh: "LNER Azuma 東海岸特快高鐵" },
        details: {
          en: "Scenic journey from London King's Cross to York (1h 50m) and Edinburgh Waverley (4h 20m) with onboard Wi-Fi and power outlets.",
          zh: "時速 200 公里，由倫敦國王十字直達約克及愛丁堡，車廂配備高速無線網絡與充電插座。"
        }
      },
      {
        id: "transit-gwr",
        icon: "🚆",
        title: { en: "Great Western Railway (GWR)", zh: "大西部鐵路 (GWR)" },
        details: {
          en: "Direct trains from London Paddington to Bath Spa (1h 20m) connecting to Cotswold regional buses and guided tours.",
          zh: "由倫敦帕丁頓車站出發直達巴斯溫泉站（約 1 小時 20 分鐘），輕鬆銜接科茲窩鄉村遊覽。"
        }
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.SITE_DATA = SITE_DATA;
}
