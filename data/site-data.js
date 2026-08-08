/**
 * @file site-data.js
 * @description DATA SOURCE — All non-itinerary structured content for the trip.
 * Sets window.SITE_DATA for consumption by render.js and map.js.
 */

const SITE_DATA = {
  /* ══════════════════════════════════════════════════
     1. OVERVIEW CARDS
     ══════════════════════════════════════════════════ */
  overview: {
    cards: [
      {
        id: "overview-pace",
        icon: "🧘",
        title: { en: "Pace & Rhythm", zh: "步調節奏" },
        desc: {
          en: "Relaxed alpine pace. 2–3 highlights per day, designed with comfortable transfers and ample rest time for parents.",
          zh: "悠閒阿爾卑斯步調。每日精選 2 至 3 個主要景點，預留充裕休息與景觀列車觀景時間。"
        }
      },
      {
        id: "overview-transport",
        icon: "🚆",
        title: { en: "Transport", zh: "交通方式" },
        desc: {
          en: "Scenic panoramic trains (GoldenPass & Glacier Express routes) paired with a rental station wagon for the Italian Lakes.",
          zh: "瑞士境內搭乘全景景觀列車（黃金快車及冰川列車路段），意大利湖區段安排自駕旅行。"
        }
      },
      {
        id: "overview-weather",
        icon: "☀️",
        title: { en: "Weather & Climate", zh: "氣候與溫度" },
        desc: {
          en: "Pleasant autumn days (15–22°C in valleys, 5–12°C in mountain peaks like Gornergrat). Onion layering recommended.",
          zh: "秋高氣爽（平原及湖區 15–22°C，高山峰頂如 Gornergrat 5–12°C）。建議採用洋蔥式保暖穿搭法。"
        }
      },
      {
        id: "overview-travelers",
        icon: "🛂",
        title: { en: "Party & Entry", zh: "同行成員與入境" },
        desc: {
          en: "3 Adults. Passports held: British Citizen, BN(O), HKSAR & Portuguese — <strong>all 90-day visa-free for Schengen</strong>. UK Driving Licences + IDP ready.",
          zh: "3 位成人。持有護照：英國公民、BN(O)、香港特區護照及葡萄牙護照 — <strong>全部享申根區 90 天免簽</strong>。持英國駕照及國際駕照。"
        }
      }
    ],

    /* ── Journey Milestone Route Board & Global Map Stops ── */
    routeBoard: {
      type: "rail", // "rail" | "roadtrip" | "flight" | "cruise" | "multimodal"
      style: "swiss-train", // "swiss-train" | "jr-rail" | "london-underground" | "hong-kong-mtr" | "new-york-subway"
      badge: "SBB · CFF · FFS",
      lineTitle: {
        en: "Alpine & Lakes Scenic Route · Autumn 2026",
        zh: "阿爾卑斯湖光山色景觀線 · 2026 秋"
      },
      direction: {
        en: "Bound for Milan",
        zh: "往 米蘭 方向"
      }
    },

    routeStops: [
      {
        code: "01",
        label: "ZRH",
        nameNative: "Zürich",
        nameRomaji: "Zurich",
        dotClass: "zurich",
        name: { en: "Zurich (蘇黎世)", zh: "蘇黎世" },
        days: { en: "Days 1–2", zh: "第 1–2 天" },
        desc: { en: "Old Town, Lake Promenade & Swiss National Museum.", zh: "舊城區漫步、蘇黎世湖畔及瑞士國家博物館。" },
        lat: 47.3769,
        lng: 8.5417,
        color: "#075AAA"
      },
      {
        code: "02",
        label: "LUC",
        nameNative: "Luzern",
        nameRomaji: "Lucerne",
        dotClass: "lucerne",
        name: { en: "Lucerne (琉森)", zh: "琉森" },
        days: { en: "Days 2–4", zh: "第 2–4 天" },
        desc: { en: "Chapel Bridge, Lion Monument & Mount Pilatus / Rigi excursion.", zh: "卡貝爾木橋、垂死獅子像及皮拉圖斯山/瑞吉山遊覽。" },
        lat: 47.0502,
        lng: 8.3093,
        color: "#0D9488"
      },
      {
        code: "03",
        label: "INT",
        nameNative: "Interlaken",
        nameRomaji: "Interlaken & Jungfrau",
        dotClass: "interlaken",
        name: { en: "Interlaken & Grindelwald (因特拉肯)", zh: "因特拉肯與格林德瓦" },
        days: { en: "Days 4–7", zh: "第 4–7 天" },
        desc: { en: "Jungfraujoch Top of Europe, Lauterbrunnen waterfalls & First Cliff Walk.", zh: "少女峰歐洲之巔、瀑布小鎮勞特布龍嫩與 First 懸崖步道。" },
        lat: 46.6863,
        lng: 7.8632,
        color: "#D97706"
      },
      {
        code: "04",
        label: "ZMT",
        nameNative: "Zermatt",
        nameRomaji: "Zermatt Matterhorn",
        dotClass: "zermatt",
        name: { en: "Zermatt (策馬特)", zh: "策馬特與馬特洪峰" },
        days: { en: "Days 7–9", zh: "第 7–9 天" },
        desc: { en: "Gornergrat railway, iconic Matterhorn views & car-free alpine village.", zh: "Gornergrat 齒軌登山火車、馬特洪峰倒影與無車環保山城。" },
        lat: 45.9763,
        lng: 7.7491,
        color: "#DC2626"
      },
      {
        code: "05",
        label: "CMO",
        nameNative: "Lago di Como",
        nameRomaji: "Lake Como",
        dotClass: "como",
        name: { en: "Lake Como & Bellagio (科莫湖)", zh: "科莫湖與貝拉焦" },
        days: { en: "Days 9–11", zh: "第 9–11 天" },
        desc: { en: "Villa Balbianello, scenic lake ferry & picturesque pastel villages.", zh: "巴爾比亞內洛別墅、湖區渡輪遊覽與絕美湖畔彩色小鎮。" },
        lat: 45.9868,
        lng: 9.2625,
        color: "#0284C7"
      },
      {
        code: "06",
        label: "MIL",
        nameNative: "Milano",
        nameRomaji: "Milan",
        dotClass: "milan",
        name: { en: "Milan (米蘭)", zh: "米蘭" },
        days: { en: "Days 11–13", zh: "第 11–13 天" },
        desc: { en: "Duomo di Milano rooftop, Galleria Vittorio Emanuele II & departure.", zh: "米蘭大教堂登頂俯瞰、艾曼紐二世拱廊街與回程航班。" },
        lat: 45.4642,
        lng: 9.1900,
        color: "#C9A96E"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     2. PRACTICAL TIPS
     ══════════════════════════════════════════════════ */
  tips: [
    {
      id: "tip-rail-passes",
      icon: "🎫",
      title: { en: "Swiss Rail Passes & Tickets", zh: "瑞士通行證與交通券" },
      items: [
        {
          en: "<strong>Swiss Half Fare Card</strong> (CHF 120) provides 50% discount on almost all Swiss trains, boats, and mountain railways (including Jungfrau and Gornergrat).",
          zh: "<strong>瑞士半價卡 (Swiss Half Fare Card)</strong>（120 瑞士法郎）可在瑞士全境火車、遊船及高山纜車/登山鐵路（包括少女峰與 Gornergrat）享 50% 半價優惠。"
        },
        {
          en: "Download the <strong>SBB Mobile App</strong> for real-time train platform numbers, seat occupancies, and instant digital ticketing.",
          zh: "建議出發前下載 <strong>SBB Mobile App</strong>，隨時查詢實時月台編號、列車擁擠度並直接出示電子乘車碼。"
        }
      ]
    },
    {
      id: "tip-reservations",
      icon: "📅",
      title: { en: "Advance Reservations", zh: "必備預約與門票" },
      items: [
        {
          en: "<strong>Jungfraujoch & Gornergrat:</strong> Monitor live webcams in the morning before ascending to ensure crystal-clear mountain views.",
          zh: "<strong>少女峰與 Gornergrat：</strong> 建議當天清晨先透過官方 Livecam 查看峰頂實時天氣與雲霧情況再行購票登頂。"
        },
        {
          en: "<strong>Duomo di Milano Rooftop & The Last Supper:</strong> Book official time-slot tickets at least 6–8 weeks in advance.",
          zh: "<strong>米蘭大教堂登頂與《最後的晚餐》：</strong> 須提前 6 至 8 週於官方網站預約指定入場場次。"
        }
      ]
    },
    {
      id: "tip-mountain-gear",
      icon: "🧥",
      title: { en: "Mountain Weather & Clothing", zh: "山區氣候與穿著建議" },
      items: [
        {
          en: "Mountain summit temperatures can drop close to freezing even in autumn. Bring windproof jackets, thermal base layers, and UV sunglasses.",
          zh: "高山峰頂氣溫即使在秋季亦可能接近冰點。請務必攜帶防風防水外套、保暖內層及抗 UV 太陽眼鏡。"
        },
        {
          en: "Comfortable, non-slip walking shoes with good ankle support are essential for cobblestone streets and alpine trails.",
          zh: "歐洲石磚路面及阿爾卑斯步道需長時間步行，請準備舒適且防滑抓地力佳的健行運動鞋。"
        }
      ]
    },
    {
      id: "tip-driving",
      icon: "🚗",
      title: { en: "Driving & Italian ZTL Zones", zh: "自駕與意大利 ZTL 限行區" },
      items: [
        {
          en: "Switzerland requires an annual highway vignette sticker (or e-vignette). Rental cars picked up in Switzerland usually have this included.",
          zh: "瑞士高速公路通行需具備 Vignette 電子通行證（於瑞士境內取車通常已包含）。"
        },
        {
          en: "<strong>Beware of Italian ZTL (Zona a Traffico Limitato):</strong> Do not drive into historic city centers (Milan, Como center) without hotel registration to avoid automatic camera fines.",
          zh: "<strong>注意意大利 ZTL 限行區：</strong> 切勿將車輛駛入歷史市中心（如米蘭老城區），否則將被自動相機處以高額罰款。"
        }
      ]
    }
  ],

  /* ══════════════════════════════════════════════════
     3. PACKING ESSENTIALS CHECKLIST
     ══════════════════════════════════════════════════ */
  packing: [
    {
      id: "pack-clothing",
      icon: "🧥",
      title: { en: "Clothing & Mountain Layers", zh: "服飾與高山保暖層" },
      items: [
        { id: "p1", en: "Windproof & waterproof Gore-Tex / shell jacket", zh: "防風防水 Gore-Tex 外套 / 衝鋒衣" },
        { id: "p2", en: "Lightweight packable down jacket or fleece", zh: "輕量便攜羽絨外套或保暖抓絨衣" },
        { id: "p3", en: "Comfortable, sturdy walking / hiking shoes", zh: "防滑舒適健行運動鞋" },
        { id: "p4", en: "Thermal base layers (Uniqlo Heattech)", zh: "保暖發熱內衣褲" },
        { id: "p5", en: "UV sunglasses & protective sun hat (high-altitude sun)", zh: "抗 UV 太陽眼鏡與防曬帽（高山紫外線強烈）" }
      ]
    },
    {
      id: "pack-electronics",
      icon: "🔌",
      title: { en: "Electronics & Travel Tech", zh: "電子用品與實用裝備" },
      items: [
        { id: "p6", en: "Swiss Type J & European Type C plug adapters", zh: "瑞士 3 圓孔 (Type J) 及歐洲雙圓孔 (Type C) 轉接插頭" },
        { id: "p7", en: "High-capacity power bank (cold drains batteries faster)", zh: "大容量便攜充電寶（低溫耗電較快）" },
        { id: "p8", en: "eSIM or Europe multi-country roaming data SIM", zh: "歐洲多國通用 eSIM 或實體上網漫遊卡" },
        { id: "p9", en: "Camera with extra memory cards & batteries", zh: "相機、充足記憶卡與備用電池" }
      ]
    },
    {
      id: "pack-documents",
      icon: "🛂",
      title: { en: "Documents & Health", zh: "重要證件與隨身藥品" },
      items: [
        { id: "p10", en: "Passports (valid for 6+ months) + printed copies", zh: "有效護照（出境後至少 6 個月有效）及紙本備份" },
        { id: "p11", en: "Driving Licence + 1968 / 1949 International Driving Permit (IDP)", zh: "本國正式駕照及國際駕駛執照 (IDP)" },
        { id: "p12", en: "Comprehensive Europe travel insurance policies", zh: "包含高山活動與醫療救援之歐洲旅遊保險單據" },
        { id: "p13", en: "Personal prescription meds, motion sickness & altitude care", zh: "個人常備藥物、暈車船藥及高山適應護理品" }
      ]
    }
  ],

  /* ══════════════════════════════════════════════════
     4. BUDGET ESTIMATES (Base Currency: EUR)
     ══════════════════════════════════════════════════ */
  budget: {
    items: [
      {
        category: { en: "Flights & International Transit", zh: "國際航班機票" },
        baseAmount: "€2,400 – €3,000",
        min: 2400,
        max: 3000,
        notes: {
          en: "3 Return flights (UK / HKG ↔ Zurich / Milan open-jaw)",
          zh: "三人來回機票（英國/香港 ↔ 蘇黎世進、米蘭出 開口機票）"
        }
      },
      {
        category: { en: "Accommodations (12 Nights)", zh: "酒店與湖區景觀住宿 (12 晚)" },
        baseAmount: "€3,200 – €4,200",
        min: 3200,
        max: 4200,
        notes: {
          en: "Comfortable 4-star hotels & alpine chalets (average €280–€350/night for family room / triple)",
          zh: "精選 4 星級酒店及阿爾卑斯木屋（家庭三人房平均每晚約 €280–€350）"
        }
      },
      {
        category: { en: "Swiss Rail Passes & Lake Como Car Rental", zh: "瑞士通行證、高山鐵路與租車" },
        baseAmount: "€1,200 – €1,600",
        min: 1200,
        max: 1600,
        notes: {
          en: "3x Swiss Half Fare Cards, Jungfrau/Gornergrat tickets, 4-day car hire + fuel/tolls",
          zh: "3張瑞士半價卡、少女峰/Gornergrat 登山票、意大利湖區 4 天租車及油費過路費"
        }
      },
      {
        category: { en: "Dining, Restaurants & Cafés", zh: "餐飲、特色美食與咖啡館" },
        baseAmount: "€1,800 – €2,400",
        min: 1800,
        max: 2400,
        notes: {
          en: "Swiss fondue, alpine mountain lunches, lakeside dining in Como, and Milanese dinners",
          zh: "瑞士起司火鍋、高山景觀午餐、科莫湖畔浪漫晚餐及米蘭經典意式料理"
        }
      },
      {
        category: { en: "Activities, Excursions & Sightseeing", zh: "景點門票、遊船與活動" },
        baseAmount: "€600 – €900",
        min: 600,
        max: 900,
        notes: {
          en: "Lake Lucerne paddle steamer, Lake Como ferry passes, Duomo Milan fast-track",
          zh: "琉森湖古典蒸汽遊船、科莫湖全日渡輪通票、米蘭大教堂登頂特快門票"
        }
      }
    ],
    total: {
      category: { en: "Total Estimated Budget (3 Persons)", zh: "總預算估算（3人同行）" },
      baseAmount: "€9,200 – €12,100",
      min: 9200,
      max: 12100,
      notes: {
        en: "Approx. €3,060 – €4,030 per person for an all-inclusive 13-day luxury journey",
        zh: "13 天全包式高品質假期，每人平均約 €3,060 至 €4,030"
      }
    }
  },

  /* ══════════════════════════════════════════════════
     5. HOTEL FINDER & CURATED ACCOMMODATION LEGS
     ══════════════════════════════════════════════════ */
  hotels: {
    quickLegs: [
      {
        active: true,
        dest: "Zurich, Switzerland",
        checkin: "2026-09-10",
        checkout: "2026-09-12",
        label: { en: "1. Zurich (2N)", zh: "1. 蘇黎世 (2晚)" }
      },
      {
        active: false,
        dest: "Lucerne, Switzerland",
        checkin: "2026-09-12",
        checkout: "2026-09-14",
        label: { en: "2. Lucerne (2N)", zh: "2. 琉森 (2晚)" }
      },
      {
        active: false,
        dest: "Interlaken, Switzerland",
        checkin: "2026-09-14",
        checkout: "2026-09-17",
        label: { en: "3. Interlaken / Grindelwald (3N)", zh: "3. 因特拉肯 (3晚)" }
      },
      {
        active: false,
        dest: "Zermatt, Switzerland",
        checkin: "2026-09-17",
        checkout: "2026-09-19",
        label: { en: "4. Zermatt (2N)", zh: "4. 策馬特 (2晚)" }
      },
      {
        active: false,
        dest: "Lake Como, Italy",
        checkin: "2026-09-19",
        checkout: "2026-09-21",
        label: { en: "5. Lake Como (2N)", zh: "5. 科莫湖 (2晚)" }
      },
      {
        active: false,
        dest: "Milan, Italy",
        checkin: "2026-09-21",
        checkout: "2026-09-22",
        label: { en: "6. Milan (1N)", zh: "6. 米蘭 (1晚)" }
      }
    ],

    legs: [
      {
        legNum: "Leg 01",
        nights: { en: "2 Nights", zh: "2 晚" },
        title: { en: "Zurich Old Town & Lakefront", zh: "蘇黎世舊城區與湖畔" },
        dates: "Sep 10 – Sep 12",
        desc: {
          en: "Stay near the Limmat river or Central Station for seamless airport connection and evening strolls in Lindenhof.",
          zh: "建議入住利馬特河畔或中央車站周邊，方便機場快速接駁與傍晚漫步林登霍夫山丘。"
        },
        tags: ["🏙️ City Center", "🚶 Walkable", "🚆 SBB Station"],
        dest: "Zurich, Switzerland",
        checkin: "2026-09-10",
        checkout: "2026-09-12"
      },
      {
        legNum: "Leg 02",
        nights: { en: "2 Nights", zh: "2 晚" },
        title: { en: "Lucerne Lakeside & Mount Pilatus", zh: "琉森湖畔與皮拉圖斯山" },
        dates: "Sep 12 – Sep 14",
        desc: {
          en: "Lakeside hotel with views of the Chapel Bridge and easy access to paddle steamer piers for Rigi & Pilatus.",
          zh: "選擇能眺望卡貝爾木橋之湖畔酒店，步行即可到達遊船碼頭前往瑞吉山與皮拉圖斯山。"
        },
        tags: ["🌊 Lake View", "🏔️ Mountain Excursion", "🚢 Ferry Pier"],
        dest: "Lucerne, Switzerland",
        checkin: "2026-09-12",
        checkout: "2026-09-14"
      },
      {
        legNum: "Leg 03",
        nights: { en: "3 Nights", zh: "3 晚" },
        title: { en: "Grindelwald / Interlaken Alpine Valley", zh: "格林德瓦 / 因特拉肯山谷" },
        dates: "Sep 14 – Sep 17",
        desc: {
          en: "Traditional Swiss alpine chalet facing the iconic Eiger North Face. Prime base for Jungfraujoch and First.",
          zh: "正對艾格峰北壁的傳統瑞士阿爾卑斯木屋酒店，探索少女峰與 First 懸崖步道的絕佳基地。"
        },
        tags: ["🏔️ Eiger View", "🚠 Cable Car Proximity", "🧀 Alpine Dining"],
        dest: "Grindelwald, Switzerland",
        checkin: "2026-09-14",
        checkout: "2026-09-17"
      },
      {
        legNum: "Leg 04",
        nights: { en: "2 Nights", zh: "2 晚" },
        title: { en: "Zermatt Matterhorn Village", zh: "策馬特馬特洪峰環保山城" },
        dates: "Sep 17 – Sep 19",
        desc: {
          en: "Car-free village stay with private balcony views of the Matterhorn sunrise (golden hour glow).",
          zh: "無車環保山城精品住宿，設有私人觀景陽台，清晨可欣賞馬特洪峰著名的日出金頂奇景。"
        },
        tags: ["⭐ Matterhorn View", "🚫 Car-free Town", "♨️ Alpine Spa"],
        dest: "Zermatt, Switzerland",
        checkin: "2026-09-17",
        checkout: "2026-09-19"
      },
      {
        legNum: "Leg 05",
        nights: { en: "2 Nights", zh: "2 晚" },
        title: { en: "Lake Como Lakeside Villa (Bellagio / Varenna)", zh: "科莫湖畔度假別墅（貝拉焦 / 瓦倫納）" },
        dates: "Sep 19 – Sep 21",
        desc: {
          en: "Picturesque Italian lakeside retreat with private terraces, garden courtyards, and sunset views over the water.",
          zh: "充滿意式風情的湖畔度假酒店，享受私人露台、浪漫庭院花園與波光粼粼的湖上日落。"
        },
        tags: ["🍷 Italian Dining", "⛴️ Lake Ferry", "🌿 Historic Villa"],
        dest: "Bellagio, Italy",
        checkin: "2026-09-19",
        checkout: "2026-09-21"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     6. TRANSIT & TRANSPORT COMPARISON
     ══════════════════════════════════════════════════ */
  transit: {
    cards: [
      {
        id: "transit-rail",
        icon: "🚆",
        title: { en: "Swiss Scenic Rail Network", zh: "瑞士景觀火車網絡" },
        details: {
          en: "World-class punctuality, panoramic glass windows, and effortless luggage handling. The GoldenPass Line between Lucerne and Interlaken offers breathtaking mountain pass vistas.",
          zh: "全球頂級準點率，全景大片玻璃觀景車窗，轉乘輕鬆省心。琉森至因特拉肯的黃金快車路段更可盡覽湖山絕景。"
        }
      },
      {
        id: "transit-car",
        icon: "🚗",
        title: { en: "Lake Como Car Rental Segment", zh: "科莫湖區自駕路段" },
        details: {
          en: "Picked up in Lugano (Switzerland/Italy border) and driven along the scenic lake roads to Bellagio. Provides maximum freedom to explore secluded lake villas and viewpoints.",
          zh: "於盧加諾（瑞意邊境）取車並沿湖畔公路前往貝拉焦，靈活遊覽隱世湖畔莊園與絕美觀景點。"
        }
      },
      {
        id: "transit-ferry",
        icon: "⛴️",
        title: { en: "Lake Ferries & Mountain Funiculars", zh: "湖區渡輪與登山齒軌列車" },
        details: {
          en: "Effortless car and passenger ferries across Lake Como, plus historical rack railways ascending Mount Pilatus and Gornergrat.",
          zh: "乘搭渡輪輕鬆往返科莫湖兩岸城鎮，並搭乘歷史悠久的登山齒軌火車登上皮拉圖斯山與 Gornergrat。"
        }
      }
    ]
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.SITE_DATA = SITE_DATA;
}
