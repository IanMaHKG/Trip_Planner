/**
 * @file itinerary-data.js
 * @description DATA SOURCE — Hong Kong 7-Day Island, Skyline & Culture Explorer
 */

const ITINERARY_DATA = [
  /* ════ DAY 1 ════ */
  {
    id: "day-1",
    dayNum: "01",
    date: "Oct 18",
    region: "kowloon-harbour",
    title: {
      en: "Arrival, Airport Express & Victoria Harbour Sunset Cruise",
      zh: "抵達香港 — 機場快綫直通市區與維多利亞港夕陽遊船"
    },
    tags: [
      { type: "city", text: "🏙️ Victoria Harbour (維多利亞港)" },
      { type: "pace", en: "✨ Iconic Welcome", zh: "✨ 璀璨地標" }
    ],
    blocks: [
      {
        time: { en: "🌅 Afternoon", zh: "🌅 下午" },
        activity: {
          title: { en: "Arrive at HKG & Airport Express 24-Min Dash to Central", zh: "抵達香港國際機場乘搭機場快綫 24 分鐘直達中環" },
          desc: {
            en: "Land at world-ranked HKG. Tap Apple Wallet Octopus directly onto Airport Express train to Kowloon / Central, then check into harbour hotel.",
            zh: "使用手機八達通感應乘搭機場快綫，24 分鐘極速直達市中心，辦理維港景觀酒店入住手續。"
          }
        },
        location: { name: "Hong Kong International Airport", lat: 22.3080, lng: 113.9185 },
        transport: { icon: "🚆", text: { en: "Airport Express (24m)", zh: "機場快綫約 24 分鐘" } }
      },
      {
        time: { en: "🌇 Evening", zh: "🌇 傍晚" },
        activity: {
          title: { en: "Star Ferry Crossing & Avenue of Stars Night Skyline", zh: "天星小輪橫渡維港與星光大道璀璨夜景" },
          desc: {
            en: "Hop on the historic green Star Ferry for a panoramic sunset crossing, followed by an evening stroll along Avenue of Stars overlooking the glittering skyline.",
            zh: "乘搭百年歷史天星小輪飽覽黃金日落維港海景，漫步尖沙咀星光大道欣賞全球最壯麗摩天大樓幻彩天際線。"
          }
        },
        location: { name: "Star Ferry Pier Central", lat: 22.2871, lng: 114.1602 },
        transport: { icon: "🚢", text: { en: "Star Ferry (7m)", zh: "天星小輪約 7 分鐘" } }
      }
    ]
  },

  /* ════ DAY 2 ════ */
  {
    id: "day-2",
    dayNum: "02",
    date: "Oct 19",
    region: "central-peak",
    title: {
      en: "Central Heritage, Michelin Dim Sum & The Peak Tram",
      zh: "中環古蹟散策、米芝蓮星級點心與百年山頂纜車"
    },
    tags: [
      { type: "city", text: "🚡 Victoria Peak & Central" },
      { type: "pace", en: "👑 Heritage & Skyline", zh: "👑 歷史與山頂全景" }
    ],
    blocks: [
      {
        time: { en: "🥟 Morning", zh: "🥟 早上" },
        activity: {
          title: { en: "Traditional Yum Cha Dim Sum & Mid-Levels Escalator", zh: "經典飲茶點心早午餐與中環半山扶手電梯" },
          desc: {
            en: "Feast on steaming Har Gow (shrimp dumplings) and Siu Mai. Ride the world's longest outdoor covered escalator system through Soho and Tai Kwun heritage compound.",
            zh: "品嚐晶瑩蝦餃與蟹黃燒賣，搭乘世界最長半山手扶梯穿梭於蘇豪區，參觀大館古蹟藝術館。"
          }
        },
        location: { name: "Tai Kwun Central", lat: 22.2818, lng: 114.1543 },
        transport: { icon: "🚶", text: { en: "Walk via Central escalators", zh: "半山扶梯步行" } }
      },
      {
        time: { en: "🚡 Afternoon & Sunset", zh: "🚡 傍晚日落" },
        activity: {
          title: { en: "Peak Tram to Sky Terrace 428 & Lugard Road Panorama", zh: "乘搭第六代山頂纜車登頂凌霄閣與盧吉道秘境遠眺" },
          desc: {
            en: "Climb steeply through greenery aboard the state-of-the-art Peak Tram. Walk along cliffside Lugard Road for the finest bird's-eye view of Hong Kong.",
            zh: "搭乘全新第六代綠色山頂纜車斜衝登頂，於盧吉道懸崖步道拍攝世界級 360 度香港全景日落。"
          }
        },
        location: { name: "Victoria Peak", lat: 22.2712, lng: 114.1500 },
        transport: { icon: "🚡", text: { en: "Peak Tram (6m)", zh: "山頂纜車約 6 分鐘" } }
      }
    ]
  },

  /* ════ DAY 3 ════ */
  {
    id: "day-3",
    dayNum: "03",
    date: "Oct 20",
    region: "lantau",
    title: {
      en: "Ngong Ping 360 Glass Cable Car, Big Buddha & Tai O Fishery",
      zh: "昂坪360全景水晶纜車、天壇大佛與大澳水鄉棚屋"
    },
    tags: [
      { type: "city", text: "🪷 Lantau Island (大嶼山)" },
      { type: "pace", en: "🌿 Island Serenity", zh: "🌿 禪意海島" }
    ],
    blocks: [
      {
        time: { en: "🚡 Morning", zh: "🚡 早上" },
        activity: {
          title: { en: "Ngong Ping 360 Crystal+ Glass Cable Car & Tian Tan Buddha", zh: "昂坪 360 全景水晶纜車與天壇大佛朝聖" },
          desc: {
            en: "Glide over mountains and South China Sea in glass-bottom cable car. Climb 268 steps to the magnificent seated bronze Buddha at Po Lin Monastery.",
            zh: "搭乘全透明水晶纜車凌空飛越北大嶼山郊野公園與蔚藍大海，登上 268 級石階參拜寶蓮禪寺天壇大佛。"
          }
        },
        location: { name: "Ngong Ping 360 & Big Buddha", lat: 22.2540, lng: 113.9050 },
        transport: { icon: "🚡", text: { en: "Cable Car (25m)", zh: "昂坪纜車約 25 分鐘" } }
      },
      {
        time: { en: "🛶 Afternoon", zh: "🛶 下午" },
        activity: {
          title: { en: "Tai O Stilt Fishing Village & Chinese White Dolphin Boat", zh: "大澳漁村傳統水上棚屋與觀賞粉紅海豚" },
          desc: {
            en: "Explore Hong Kong's Venice of the East with wooden stilt houses over tidal flats. Take a local boat to spot rare wild pink dolphins.",
            zh: "漫步大澳百年水上棚屋木棧道，品嚐現烤大魚蛋與沙翁甜品，乘搭小艇出海尋找中華白海豚蹤影。"
          }
        },
        location: { name: "Tai O Fishing Village", lat: 22.2536, lng: 113.8625 },
        transport: { icon: "🚌", text: { en: "New Lantao Bus (15m)", zh: "新大嶼山巴士約 15 分鐘" } }
      }
    ]
  },

  /* ════ DAY 4 ════ */
  {
    id: "day-4",
    dayNum: "04",
    date: "Oct 21",
    region: "hong-kong-island",
    title: {
      en: "Ding Ding Tram, Wan Chai Blue House & Typhoon Shelter Feast",
      zh: "百年叮叮電車、灣仔藍屋古蹟與避風塘炒辣蟹"
    },
    tags: [
      { type: "city", text: "🚃 Ding Ding & Causeway Bay" },
      { type: "pace", en: "🦀 Local Gastronomy", zh: "🦀 懷舊滋味" }
    ],
    blocks: [
      {
        time: { en: "🚃 Morning", zh: "🚃 早上" },
        activity: {
          title: { en: "Vintage Ding Ding Tram Ride & Wan Chai Heritage Trail", zh: "搭乘百年雙層叮叮電車與探索灣仔藍屋建築群" },
          desc: {
            en: "Sit on upper deck of double-decker tram watching Hong Kong street life unfold for just HK$3. Visit UNESCO-awarded Blue House cultural hub.",
            zh: "坐在雙層電車上層吹著微風穿梭香港繁華街角，造訪榮獲聯合國文化遺產保護獎的灣仔藍屋活化聚落。"
          }
        },
        location: { name: "Blue House Wan Chai", lat: 22.2743, lng: 114.1738 },
        transport: { icon: "🚃", text: { en: "HK Tramways (15m)", zh: "香港電車約 15 分鐘" } }
      },
      {
        time: { en: "🦀 Evening", zh: "🦀 晚上" },
        activity: {
          title: { en: "Under Bridge Spicy Crab & Causeway Bay Shopping", zh: "橋底辣蟹海鮮盛宴與銅鑼灣時代廣場購物" },
          desc: {
            en: "Savor signature fragrant garlic chili typhoon shelter crabs and razor clams, followed by late-night shopping at Sogo and Times Square.",
            zh: "享用香脆避風塘金蒜炒大肉蟹與清蒸蟶子皇，隨後於銅鑼灣時代廣場與希慎廣場盡情購物。"
          }
        },
        location: { name: "Causeway Bay Times Square", lat: 22.2783, lng: 114.1822 },
        transport: { icon: "🚶", text: { en: "Walk in Causeway Bay", zh: "銅鑼灣商圈步行" } }
      }
    ]
  },

  /* ════ DAY 5 ════ */
  {
    id: "day-5",
    dayNum: "05",
    date: "Oct 22",
    region: "kowloon-local",
    title: {
      en: "Sham Shui Po Tech & Vintage, Mong Kok & Temple Street",
      zh: "深水埗數碼與古着小店、旺角金魚街與廟街夜市煲仔飯"
    },
    tags: [
      { type: "city", text: "🏮 Sham Shui Po & Mong Kok" },
      { type: "pace", en: "🍜 Street Food Trail", zh: "🍜 市井街頭" }
    ],
    blocks: [
      {
        time: { en: "📷 Afternoon", zh: "📷 下午" },
        activity: {
          title: { en: "Sham Shui Po Electronics Market & Café Culture", zh: "深水埗鴨寮街數碼街與大南街文青咖啡館" },
          desc: {
            en: "Browse vintage cameras and gadgets along Apliu Street, then relax at artisanal specialty coffee roasters along Tai Nan Street.",
            zh: "尋訪鴨寮街復古相機與科技零件，隨後在大南街文青皮革小店與精品咖啡館享受悠閒午後。"
          }
        },
        location: { name: "Sham Shui Po Apliu St", lat: 22.3312, lng: 114.1610 },
        transport: { icon: "🚇", text: { en: "MTR Tsuen Wan Line (10m)", zh: "港鐵荃灣綫約 10 分鐘" } }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: { en: "Temple Street Night Market & Sizzling Claypot Rice", zh: "廟街夜市懷舊風情與炭火四季煲仔飯" },
          desc: {
            en: "Immerse in neon-lit night market stalls, fortune tellers, and piping hot charcoal-cooked claypot rice with crispy crust.",
            zh: "漫步熱鬧非凡的廟街夜市，品嚐熱辣焦香的臘味滑雞煲仔飯與現炸蠔餅。"
          }
        },
        location: { name: "Temple Street Night Market", lat: 22.3089, lng: 114.1694 },
        transport: { icon: "🚶", text: { en: "Walk 10m from Jordan Stn", zh: "佐敦站步行 10 分鐘" } }
      }
    ]
  },

  /* ════ DAY 6 ════ */
  {
    id: "day-6",
    dayNum: "06",
    date: "Oct 23",
    region: "sai-kung",
    title: {
      en: "Sai Kung UNESCO Geopark & Waterfront Fresh Seafood Feast",
      zh: "西貢聯合國地質公園六角火山岩柱與海鮮街現撈盛宴"
    },
    tags: [
      { type: "city", text: "🌊 Sai Kung Geopark" },
      { type: "pace", en: "⛵ Wild Sea Nature", zh: "⛵ 地質奇觀" }
    ],
    blocks: [
      {
        time: { en: "⛵ Morning & Midday", zh: "⛵ 早午間" },
        activity: {
          title: { en: "Speedboat to High Island UNESCO Hexagonal Columns", zh: "乘快艇探索糧船灣六角形火山岩柱與萬宜水庫東壩" },
          desc: {
            en: "Charter a speedboat from Sai Kung pier to marvel at 140-million-year-old giant volcanic hexagonal columnar joints and sea caves.",
            zh: "由西貢碼頭出海，近距離欣賞 1.4 億年前超級火山爆發形成、高達數十米的巨型六角形柱狀節理與海蝕洞奇觀。"
          }
        },
        location: { name: "Sai Kung Geopark", lat: 22.3814, lng: 114.2744 },
        transport: { icon: "⛵", text: { en: "Charter Speedboat", zh: "專屬快艇出海" } }
      },
      {
        time: { en: "🦞 Evening", zh: "🦞 晚上" },
        activity: {
          title: { en: "Michelin-Recommended Seafood Banquet on Sai Kung Waterfront", zh: "西貢海旁米芝蓮推薦海鮮酒家盛宴" },
          desc: {
            en: "Select live lobster, mantis shrimp, and sea bass directly from overflowing harbour tanks cooked to perfection with garlic and chili.",
            zh: "在海景露天餐廳品嚐即撈即煮的芝士焗龍蝦、避風塘椒鹽瀨尿蝦與清蒸游水石斑魚。"
          }
        },
        location: { name: "Sai Kung Seafood Street", lat: 22.3820, lng: 114.2730 },
        transport: { icon: "🚶", text: { en: "Waterfront promenade", zh: "西貢海旁步行" } }
      }
    ]
  },

  /* ════ DAY 7 ════ */
  {
    id: "day-7",
    dayNum: "07",
    date: "Oct 24",
    region: "central-departure",
    title: {
      en: "Luk Yu Historic Tea House, Souvenir Shopping & HKG Departure",
      zh: "陸羽茶室傳統品茗、中環伴手禮採購與機場快綫順利返程"
    },
    tags: [
      { type: "city", text: "✈️ Central & Airport" },
      { type: "pace", en: "🛍️ Souvenirs & Farewells", zh: "🛍️ 伴手禮與返程" }
    ],
    blocks: [
      {
        time: { en: "🫖 Morning", zh: "🫖 早上" },
        activity: {
          title: { en: "Historic Luk Yu Tea House Morning Yum Cha", zh: "百年陸羽茶室品茗懷舊點心" },
          desc: {
            en: "Step back into 1930s colonial Hong Kong with stained glass and carved rosewood booths, tasting classic liver siu mai and egg tarts.",
            zh: "走進 1930 年代古典嶺南風格茶室，在彩繪玻璃與酸枝木椅間品嚐豬肝燒賣與現焗酥皮蛋撻。"
          }
        },
        location: { name: "Luk Yu Tea House", lat: 22.2825, lng: 114.1558 },
        transport: { icon: "🚶", text: { en: "Walk from Central MTR", zh: "中環站步行" } }
      },
      {
        time: { en: "🛍️ Midday", zh: "🛍️ 中午" },
        activity: {
          title: { en: "Bakehouse Egg Tarts & In-Town Check-in at Hong Kong Station", zh: "Bakehouse 爆紅酸種蛋撻與香港站市區預辦登機" },
          desc: {
            en: "Pick up famous artisanal sourdough egg tarts and Jenny Bakery cookies, then check your luggage at Hong Kong Station for hands-free fun.",
            zh: "採買超人氣 Bakehouse 焦糖酸種蛋撻與珍妮曲奇小熊餅乾，於香港站輕鬆預辦登機託運行李。"
          }
        },
        location: { name: "Hong Kong Station", lat: 22.2847, lng: 114.1581 },
        transport: { icon: "🚶", text: { en: "Direct connection", zh: "直通車站" } }
      },
      {
        time: { en: "✈️ Afternoon / Evening", zh: "✈️ 傍晚" },
        activity: {
          title: { en: "Airport Express to HKG & Return Flight", zh: "乘搭機場快綫直達機場航廈圓滿返程" },
          desc: {
            en: "Glide effortlessly to Hong Kong International Airport, visit duty-free shopping, and board your flight home after 7 unforgettable days!",
            zh: "乘搭機場快綫直達航廈，辦理安檢出境與免稅品採購，圓滿結束兼具繁華天際線與自然地質奇觀的 7 天香港深度之旅！"
          }
        },
        location: { name: "Hong Kong International Airport", lat: 22.3080, lng: 113.9185 },
        transport: { icon: "🚆", text: { en: "Airport Express (24m)", zh: "機場快綫約 24 分鐘" } }
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ITINERARY_DATA = ITINERARY_DATA;
}
