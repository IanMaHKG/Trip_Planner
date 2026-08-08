/**
 * @file site-data.js
 * @description DATA SOURCE — Hong Kong 7-Day Island & Urban Journey
 */

const SITE_DATA = {
  /* ══════════════════════════════════════════════════
     1. OVERVIEW CARDS & ROUTE BOARD
     ══════════════════════════════════════════════════ */
  overview: {
    cards: [
      {
        id: "overview-pace",
        icon: "🏙️",
        title: { en: "Pace & Rhythm", zh: "步調節奏" },
        desc: {
          en: "Dynamic metropolis contrasts with serene nature. Explore Central skyscrapers, historic Victoria Peak, Lantau Giant Buddha, and Sai Kung volcanic geoparks.",
          zh: "繁華摩天都市與寧靜海島自然交織。深度遊覽中環高樓、太平山頂夜景、大嶼山天壇大佛與西貢地質公園。"
        }
      },
      {
        id: "overview-transport",
        icon: "💳",
        title: { en: "MTR & Octopus", zh: "港鐵與八達通" },
        desc: {
          en: "Add Mobile Octopus to Apple Wallet for one-tap payments on Airport Express, MTR, vintage double-decker Ding Ding trams, and Star Ferry.",
          zh: "將八達通加入 iPhone Apple Wallet，一拍即搭機場快綫、港鐵、百年叮叮電車、天星小輪及全港便利店。"
        }
      },
      {
        id: "overview-weather",
        icon: "☀️",
        title: { en: "Autumn / Winter Climate", zh: "秋冬怡人氣候" },
        desc: {
          en: "Sunny and dry pleasant season (18–24°C). Ideal for coastal hiking trails like Dragon's Back and rooftop sunset dining.",
          zh: "天晴乾燥、舒適宜人（氣溫約 18–24°C），最適合遠足行山（如龍脊行山徑）及露天觀景台賞夜景。"
        }
      },
      {
        id: "overview-food",
        icon: "🥟",
        title: { en: "World Capital of Dim Sum", zh: "環球美食與點心" },
        desc: {
          en: "Michelin-starred Tim Ho Wan dim sum, Kam's Roast Goose, authentic Cha Chaan Teng milk tea, and freshly caught Sai Kung seafood banquets.",
          zh: "添好運米芝蓮點心、甘牌燒鵝、正宗茶餐廳絲襪奶茶與西多士，以及西貢海鮮街現撈海鮮饗宴。"
        }
      }
    ],

    routeBoard: {
      type: "rail",
      style: "hk-mtr",
      badge: "🇭🇰 MTR · 港鐵",
      lineTitle: {
        en: "機場快綫・港島・大嶼山精華線 · MTR & Island Scenic Line",
        zh: "港鐵機場快綫・港島線・大嶼山與海島精華路線"
      },
      direction: {
        en: "往 西貢 / 柴灣 To Sai Kung & Chai Wan ➔",
        zh: "往 西貢 / 柴灣 方面 ➔"
      }
    },

    routeStops: [
      {
        code: "01",
        label: "AIR",
        number: "01",
        nameNative: "機場",
        nameRomaji: "Airport (Terminal 1)",
        name: { en: "HK International Airport", zh: "香港國際機場" },
        days: { en: "Day 1", zh: "第 1 天" },
        desc: { en: "Airport Express 24-min high-speed non-stop train to Central.", zh: "乘搭機場快綫 24 分鐘直達中環市中心。" },
        lat: 22.3080,
        lng: 113.9185,
        color: "#007078"
      },
      {
        code: "02",
        label: "CEN",
        number: "02",
        nameNative: "中環",
        nameRomaji: "Central & Victoria Peak",
        name: { en: "Central & Peak", zh: "中環與太平山頂" },
        days: { en: "Days 1–3", zh: "第 1–3 天" },
        desc: { en: "Historic Peak Tram, Tai Kwun Heritage & Central escalators.", zh: "百年山頂纜車俯瞰維港天際線、大館古蹟及中環半山扶手電梯。" },
        lat: 22.2819,
        lng: 114.1581,
        color: "#0071CE"
      },
      {
        code: "03",
        label: "TST",
        number: "03",
        nameNative: "尖沙咀",
        nameRomaji: "Tsim Sha Tsui & Star Ferry",
        name: { en: "Tsim Sha Tsui", zh: "尖沙咀與維港" },
        days: { en: "Days 3–4", zh: "第 3–4 天" },
        desc: { en: "Star Ferry crossing, Avenue of Stars & Symphony of Lights.", zh: "天星小輪渡海、星光大道及幻彩詠香江燈光匯演。" },
        lat: 22.2988,
        lng: 114.1722,
        color: "#E2231A"
      },
      {
        code: "04",
        label: "LAN",
        number: "04",
        nameNative: "大嶼山",
        nameRomaji: "Lantau & Big Buddha",
        name: { en: "Lantau Island", zh: "大嶼山與昂坪" },
        days: { en: "Days 4–5", zh: "第 4–5 天" },
        desc: { en: "Ngong Ping 360 Crystal Cable Car & Tai O Stilt Fishing Village.", zh: "昂坪360全景水晶纜車、天壇大佛及大澳棚屋水鄉。" },
        lat: 22.2540,
        lng: 113.9050,
        color: "#F58220"
      },
      {
        code: "05",
        label: "SKG",
        number: "05",
        nameNative: "西貢",
        nameRomaji: "Sai Kung Geopark",
        name: { en: "Sai Kung Geopark", zh: "西貢地質公園" },
        days: { en: "Days 6–7", zh: "第 6–7 天" },
        desc: { en: "UNESCO Hexagonal Volcanic Rock Columns, coastal boat cruise & seafood street.", zh: "聯合國教科文組織六角形火山岩柱、跳島遊船與海鮮街美饌。" },
        lat: 22.3814,
        lng: 114.2744,
        color: "#00843D"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     2. EMERGENCY CONTACTS
     ══════════════════════════════════════════════════ */
  emergency: {
    contacts: [
      {
        label: { en: "Emergency Services (Police / Ambulance / Fire)", zh: "香港緊急求助專線（報案/救護/火警）" },
        number: "999",
        notes: { en: "Toll-free emergency hotline across Hong Kong", zh: "全港通用免費緊急報案專線" }
      },
      {
        label: { en: "Hong Kong Tourism Board Hotline (HKTB)", zh: "香港旅遊發展局旅客熱線" },
        number: "+852 2508 1234",
        notes: { en: "9am - 6pm Daily multilingual travel advice", zh: "每日上午9時至下午6時多語言旅客諮詢服務" }
      },
      {
        label: { en: "Hong Kong Airport 24-hr Enquiry", zh: "香港國際機場 24 小時查詢專線" },
        number: "+852 2181 8888",
        notes: { en: "Flight schedules and terminal assistance", zh: "航班動態與客運大樓支援熱線" }
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     3. PRACTICAL TIPS
     ══════════════════════════════════════════════════ */
  tips: [
    {
      id: "transit-octopus",
      icon: "💳",
      title: { en: "Octopus Card & Cashless Pay", zh: "手機八達通與支付指引" },
      items: [
        {
          title: { en: "Apple Wallet Mobile Octopus", zh: "Apple Wallet 快速加入手機八達通" },
          desc: {
            en: "No physical card required. Add Mobile Octopus via Apple Wallet app and top up directly with Visa/Mastercard without transaction fees.",
            zh: "無需排隊買實體卡，直接於 iPhone 錢包開立手機八達通，隨時用信用卡免手續費增值，一拍即搭各類交通。"
          }
        },
        {
          title: { en: "Airport Express Same-Day Return / Free MTR Connections", zh: "機場快綫同日來回及免費港鐵轉乘" },
          desc: {
            en: "Passengers using Octopus card enjoy free MTR connections to/from Airport Express stations within one hour.",
            zh: "使用八達通乘搭機場快綫，即享免費港鐵接駁轉乘優惠，行程更省心省錢。"
          }
        }
      ]
    },
    {
      id: "foodie-tips",
      icon: "🍜",
      title: { en: "Dining Secrets & Etiquette", zh: "地道餐飲與茶餐廳文化" },
      items: [
        {
          title: { en: "Cha Chaan Teng Culture (Table Sharing)", zh: "茶餐廳搭枱與點餐常識" },
          desc: {
            en: "During lunch peaks, table sharing ('Daap Toi') is standard. Try 'Yuenyeung' (coffee + milk tea) and French Toast. Take the receipt bill to cashier to pay.",
            zh: "午市高峰期「搭枱」屬地道常態；必試「鴛鴦」（咖啡混合絲襪奶茶）與西多士，結帳時將小單據帶到收銀台即可。"
          }
        },
        {
          title: { en: "Sai Kung Live Seafood Buying", zh: "西貢海鮮街現挑現煮" },
          desc: {
            en: "Pick live seafood directly from tanks along the promenade, agree on cooking style (steamed or garlic butter), and confirm preparation fee.",
            zh: "於海旁海鮮缸親自挑選新鮮海產，與海鮮餐廳確認烹調方法（清蒸、豉椒炒或蒜蓉開邊）及加工費。"
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
      id: "pack-cards",
      icon: "💳",
      title: { en: "Essential Cards & Apps", zh: "必備卡片與手機設定" },
      items: [
        { id: "hk-octopus", en: "Mobile Octopus loaded on iPhone / Apple Watch", zh: "手機 Apple Wallet 已加入八達通並充值" },
        { id: "hk-openrice", en: "OpenRice App downloaded for food discovery", zh: "下載 OpenRice 開飯喇美食 App 查看餐廳評價" },
        { id: "hk-pass", en: "Passport (and HKID if applicable)", zh: "有效護照（及香港身份證）" }
      ]
    },
    {
      id: "pack-gear",
      icon: "👟",
      title: { en: "Apparel & Outdoor Gear", zh: "服飾與遠足防護" },
      items: [
        { id: "hk-shoes", en: "Comfortable hiking/walking trainers for stairs & peaks", zh: "抓地防滑健行運動鞋（香港階梯與山路多）" },
        { id: "hk-sun", en: "UV Sunscreen, sunglasses & light cap", zh: "防曬乳液、太陽眼鏡與遮陽帽" },
        { id: "hk-aircon", en: "Light cardigan for indoor high AC", zh: "薄開胸衫/外套（商場與地鐵冷氣強勁必備）" }
      ]
    },
    {
      id: "pack-tech",
      icon: "🔋",
      title: { en: "Power & Connectivity", zh: "電子與充電" },
      items: [
        { id: "hk-adapter", en: "UK 3-pin Type G plug adapters", zh: "英規三腳扁型插頭 (Type G)" },
        { id: "hk-powerbank", en: "MagSafe / 10,000mAh Power Bank", zh: "隨身行動電源（打卡拍照耗電必備）" }
      ]
    }
  ],

  /* ══════════════════════════════════════════════════
     5. BUDGET ESTIMATES
     ══════════════════════════════════════════════════ */
  budget: {
    items: [
      {
        category: { en: "Harbourfront Boutique Hotels", zh: "中環 / 尖沙咀海景精品酒店" },
        baseAmount: "HK$9,500",
        min: 1220,
        max: 1350,
        notes: { en: "6 nights total: 3N Central + 2N TST + 1N Sai Kung", zh: "共6晚：3晚港島中環 + 2晚尖沙咀 + 1晚西貢度假酒店" }
      },
      {
        category: { en: "Michelin Dining & Seafood Banquets", zh: "米芝蓮早茶、燒鵝與海鮮大餐" },
        baseAmount: "HK$4,800",
        min: 615,
        max: 680,
        notes: { en: "Tim Ho Wan, Kam's Goose, Tai O snacks & Sai Kung seafood feast", zh: "添好運點心、甘牌燒鵝、大澳水鄉小吃與西貢海鮮宴" }
      },
      {
        category: { en: "Transit (Airport Express, MTR & Taxis)", zh: "機場快綫、港鐵、天星小輪與的士" },
        baseAmount: "HK$1,800",
        min: 230,
        max: 260,
        notes: { en: "Airport Express return + unlimited MTR rides + Peak Tram + Ding Ding", zh: "機場快綫來回 + 港鐵無限乘搭 + 山頂纜車 + 叮叮電車" }
      },
      {
        category: { en: "Sightseeing, Cable Cars & Boat Charters", zh: "昂坪纜車門票、天際100與西貢遊船" },
        baseAmount: "HK$2,400",
        min: 310,
        max: 340,
        notes: { en: "Ngong Ping Crystal Cabin, Sky100, and UNESCO Geopark boat charter", zh: "昂坪水晶車廂纜車、天際100觀景台及西貢地質公園跳島包船" }
      }
    ],
    total: {
      category: { en: "Total Estimated Trip Budget", zh: "預計總開支預算" },
      baseAmount: "HK$18,500",
      min: 2375,
      max: 2630,
      notes: { en: "Estimated for 2 adults (excl. flights)", zh: "2位成人預估總開支（不含國際機票）" }
    }
  },

  /* ══════════════════════════════════════════════════
     6. HOTELS & STAYS
     ══════════════════════════════════════════════════ */
  hotels: {
    quickLegs: [
      { label: { en: "Hong Kong Central", zh: "香港島（中環）" }, dest: "Hong Kong Central, Hong Kong", checkin: "2026-10-18", checkout: "2026-10-21", active: true },
      { label: { en: "Tsim Sha Tsui", zh: "九龍（尖沙咀）" }, dest: "Tsim Sha Tsui, Hong Kong", checkin: "2026-10-21", checkout: "2026-10-23", active: false },
      { label: { en: "Sai Kung Waterfront", zh: "新界（西貢度假）" }, dest: "Sai Kung, Hong Kong", checkin: "2026-10-23", checkout: "2026-10-24", active: false }
    ],
    legs: [
      {
        legNum: "Stop 1",
        nights: { en: "3 Nights", zh: "3 晚" },
        dates: "Oct 18 – Oct 21",
        title: { en: "Hong Kong Island: Central & Soho Boutique", zh: "香港島：中環與蘇豪區精品酒店" },
        desc: {
          en: "Stylish high-rise hotel within walking distance to Central escalators, Michelin dining, and Peak Tram.",
          zh: "入住中環蘇豪區時尚精品高層酒店，漫步可達半山扶手電梯、米芝蓮食府及山頂纜車站。"
        },
        tags: ["Central", "Soho", "Skyline"],
        dest: "Hong Kong Central, Hong Kong",
        checkin: "2026-10-18",
        checkout: "2026-10-21"
      },
      {
        legNum: "Stop 2",
        nights: { en: "2 Nights", zh: "2 晚" },
        dates: "Oct 21 – Oct 23",
        title: { en: "Kowloon: Victoria Harbour View in TST", zh: "九龍：尖沙咀維多利亞港無敵海景酒店" },
        desc: {
          en: "Iconic waterfront property with panoramic views of Victoria Harbour and nightly Symphony of Lights.",
          zh: "尖沙咀海旁標誌性酒店，坐擁維多利亞港壯麗天際線與每晚幻彩詠香江盛景。"
        },
        tags: ["Tsim Sha Tsui", "Harbour View", "Symphony of Lights"],
        dest: "Tsim Sha Tsui, Hong Kong",
        checkin: "2026-10-21",
        checkout: "2026-10-23"
      },
      {
        legNum: "Stop 3",
        nights: { en: "1 Night", zh: "1 晚" },
        dates: "Oct 23 – Oct 24",
        title: { en: "New Territories: Sai Kung Waterfront Resort", zh: "新界：西貢海濱度假悠閒酒店" },
        desc: {
          en: "Relaxing seaside stay overlooking the tranquil marina, ready for early morning Geopark boat adventures.",
          zh: "悠閒海邊度假酒店，俯瞰寧靜遊艇碼頭，方便翌日清晨乘船出海探訪六角形地質岩柱。"
        },
        tags: ["Sai Kung", "Waterfront Resort", "Geopark"],
        dest: "Sai Kung, Hong Kong",
        checkin: "2026-10-23",
        checkout: "2026-10-24"
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     7. TRANSIT RECOMMENDATIONS
     ══════════════════════════════════════════════════ */
  transit: {
    cards: [
      {
        id: "transit-airport-express",
        icon: "🚄",
        title: { en: "Airport Express 24-min High Speed Link", zh: "機場快綫 24 分鐘直達中環" },
        details: {
          en: "Travel from HKG Airport to Central in only 24 minutes with in-train charging outlets and free high-speed Wi-Fi.",
          zh: "由香港國際機場直達香港站（中環）僅需 24 分鐘，車廂配備 USB 充電與免費高速 Wi-Fi。"
        }
      },
      {
        id: "transit-mtr-octopus",
        icon: "🚇",
        title: { en: "MTR Network & Apple Wallet Octopus", zh: "港鐵全綫與 Apple Wallet 八達通" },
        details: {
          en: "Clean, air-conditioned, and punctual rapid transit spanning Hong Kong Island, Kowloon, and New Territories.",
          zh: "準時可靠且冷氣充足的地下鐵路網，全面覆蓋港島、九龍與新界各大熱門景點。"
        }
      },
      {
        id: "transit-tram-ferry",
        icon: "🚋",
        title: { en: "Historic Ding Ding Trams & Star Ferry", zh: "百年叮叮電車與天星小輪" },
        details: {
          en: "Vintage double-decker trams (HK$3 flat fare) and the legendary Star Ferry cross-harbour voyage since 1888.",
          zh: "百年雙層叮叮電車（單程僅 HK$3）及 1888 年啟航的天星小輪，細味老香港情懷。"
        }
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.SITE_DATA = SITE_DATA;
}
