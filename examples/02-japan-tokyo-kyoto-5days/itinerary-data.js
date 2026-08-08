/**
 * @file itinerary-data.js
 * @description DATA SOURCE — 5-Day Japan Golden Route Itinerary
 */

const ITINERARY_DATA = [
  /* ════ DAY 1 ════ */
  {
    id: "day-1",
    dayNum: "01",
    date: "Nov 14",
    region: "tokyo",
    title: {
      en: "Arrive in Tokyo — Shibuya Sky Sunset & Neon Shinjuku",
      zh: "抵達東京 — 澀谷 Sky 日落全景與新宿不夜城"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "⚡ Energetic", zh: "⚡ 繁華都會" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning / Midday", zh: "🌅 早午間" },
        activity: {
          title: { en: "Arrive at Tokyo Haneda/Narita & Keikyu/N'EX Express", zh: "抵達東京羽田/成田機場乘搭特急進入市區" },
          desc: {
            en: "Land in Tokyo, clear customs with Visit Japan Web QR code, tap into train with Apple Wallet Suica, and check into hotel in Shibuya/Shinjuku.",
            zh: "順利通關，使用手機錢包 Suica 乘搭鐵路直達市區，辦理澀谷或新宿精選酒店入住手續。"
          }
        },
        location: { name: "Tokyo Station / Shibuya", lat: 35.6812, lng: 139.7671 },
        transport: { icon: "🚆", text: { en: "N'EX / Keikyu (35m)", zh: "機場特急約 35 分鐘" } }
      },
      {
        time: { en: "🌇 Afternoon & Sunset", zh: "🌇 傍晚日落" },
        activity: {
          title: { en: "Shibuya Sky 360° Observation Deck & Shibuya Crossing", zh: "澀谷 SKY 360 度頂樓展望台與十字路口" },
          desc: {
            en: "Ascend to 229m open-air rooftop of Shibuya Scramble Square for panoramic golden-hour views of Tokyo Tower and Mt. Fuji silhouette.",
            zh: "登上 229 米高的露天展望台，俯瞰標誌性十字路口人潮、東京鐵塔與遠方富士山日落剪影。"
          }
        },
        location: { name: "Shibuya Sky", lat: 35.6585, lng: 139.7013 },
        transport: { icon: "🚶", text: { en: "Walk 2m from Shibuya Stn", zh: "澀谷站直達" } }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: { en: "Yakitori Dinner at Omoide Yokocho & Kabukicho", zh: "新宿回憶橫丁居酒屋燒鳥晚餐" },
          desc: {
            en: "Immerse in classic Showa-era atmosphere with charcoal-grilled yakitori skewers and draft Sapporo beer under vintage lanterns.",
            zh: "漫步充滿懷舊氛圍的昭和風情小巷，品嚐炭火現烤雞肉串與地道生啤酒。"
          }
        },
        location: { name: "Omoide Yokocho", lat: 35.6931, lng: 139.6994 },
        transport: { icon: "🚇", text: { en: "JR Yamanote Line (7m)", zh: "山手線約 7 分鐘" } }
      }
    ]
  },

  /* ════ DAY 2 ════ */
  {
    id: "day-2",
    dayNum: "02",
    date: "Nov 15",
    region: "tokyo-hakone",
    title: {
      en: "Asakusa Sensoji to Hakone Onsen — Mt. Fuji Ryokan Experience",
      zh: "淺草寺巡禮至箱根溫泉 — 富士山景觀與一泊二食"
    },
    tags: [
      { type: "city", text: "♨️ Hakone (箱根)" },
      { type: "pace", en: "🧘 Relaxed Onsen", zh: "🧘 溫泉療癒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: { en: "Asakusa Senso-ji Temple & Nakamise Dori Street", zh: "淺草寺雷門參拜與仲見世通商店街" },
          desc: {
            en: "Visit Tokyo's oldest Buddhist temple beneath the giant red Kaminarimon lantern. Enjoy freshly baked Ningyo-yaki pastries.",
            zh: "參訪東京最古老地標淺草寺，在巨大雷門紅燈籠下拍照，品嚐熱騰騰的人形燒與抹茶小食。"
          }
        },
        location: { name: "Senso-ji Temple", lat: 35.7147, lng: 139.7966 },
        transport: { icon: "🚇", text: { en: "Ginza Subway Line (15m)", zh: "銀座線約 15 分鐘" } }
      },
      {
        time: { en: "🚆 Afternoon", zh: "🚆 下午" },
        activity: {
          title: { en: "Odakyu Romancecar to Hakone & Lake Ashi Pirate Cruise", zh: "小田急浪漫特快前往箱根及蘆之湖海盜船" },
          desc: {
            en: "Board the panoramic Romancecar from Shinjuku to Hakone-Yumoto. Cruise on Lake Ashi past the floating vermilion Torii gate.",
            zh: "從新宿搭乘小田急浪漫特快直達箱根湯本，轉乘登山纜車與蘆之湖海盜船，遠眺水上鳥居與富士山絕景。"
          }
        },
        location: { name: "Lake Ashi Torii", lat: 35.2048, lng: 139.0253 },
        transport: { icon: "🚆", text: { en: "Romancecar GSE (85m)", zh: "浪漫特快約 85 分鐘" } }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: { en: "Hakone Traditional Ryokan, Private Onsen & Kaiseki Banquet", zh: "箱根傳統溫泉旅館、露天風呂與懷石晚宴" },
          desc: {
            en: "Check into authentic Japanese ryokan. Soak in mineral-rich thermal waters and savor multi-course seasonal autumn Kaiseki dinner.",
            zh: "入住極致溫泉旅館，享受富含礦物質的露天溫泉消除疲勞，享用當季食材精製之極上懷石料理。"
          }
        },
        location: { name: "Hakone Yumoto", lat: 35.2323, lng: 139.1069 },
        transport: { icon: "♨️", text: { en: "Ryokan Shuttle", zh: "旅館專車接送" } }
      }
    ]
  },

  /* ════ DAY 3 ════ */
  {
    id: "day-3",
    dayNum: "03",
    date: "Nov 16",
    region: "hakone-kyoto",
    title: {
      en: "Shinkansen Nozomi to Kyoto — Fushimi Inari & Gion Evening",
      zh: "東海道新幹線奔馳至京都 — 伏見稻荷千本鳥居與祇園夜色"
    },
    tags: [
      { type: "city", text: "⛩️ Kyoto (京都)" },
      { type: "pace", en: "🍁 Cultural & Scenic", zh: "🍁 千年古都" }
    ],
    blocks: [
      {
        time: { en: "🚅 Morning", zh: "🚅 早上" },
        activity: {
          title: { en: "Hakone Open-Air Museum & Shinkansen Bullet Train to Kyoto", zh: "箱根雕刻之森美術館及新幹線急速前往京都" },
          desc: {
            en: "Walk through outdoor sculpture park nestled in mountains, then board Tokaido Shinkansen Nozomi bullet train (speed: 285 km/h) to Kyoto Station.",
            zh: "漫步箱根雕刻之森露天藝術園區，隨後於小田原站登上新幹線希望號，時速近 300 公里飛馳抵達京都。"
          }
        },
        location: { name: "Hakone Open Air Museum", lat: 35.2442, lng: 139.0511 },
        transport: { icon: "🚅", text: { en: "Shinkansen Nozomi (120m)", zh: "新幹線極速約 2 小時" } }
      },
      {
        time: { en: "⛩️ Afternoon", zh: "⛩️ 下午" },
        activity: {
          title: { en: "Fushimi Inari-Taisha 10,000 Vermilion Torii Path", zh: "伏見稻荷大社千本鳥居與紅葉秘境" },
          desc: {
            en: "Walk beneath the breathtaking tunnels of endless vermilion torii gates winding through sacred mountain forest amidst autumn foliage.",
            zh: "穿梭於依山而建、壯觀無比的萬座朱紅色鳥居隧道之中，感受京都秋日神聖光影交錯。"
          }
        },
        location: { name: "Fushimi Inari", lat: 34.9671, lng: 135.7727 },
        transport: { icon: "🚆", text: { en: "JR Nara Line (5m)", zh: "JR 奈良線約 5 分鐘" } }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: { en: "Gion Hanamikoji Stroll & Kyoto Yudofu Dinner", zh: "祇園花見小路夜遊與京都名物湯豆腐" },
          desc: {
            en: "Stroll preserved cobblestone alleys lined with traditional teahouses. Savor smooth artisanal Kyoto Yudofu hot pot.",
            zh: "夜遊典雅的祇園花見小路木造茶屋街，品嚐甘醇滑嫩的京都傳統湯豆腐與精緻御膳。"
          }
        },
        location: { name: "Gion Hanamikoji", lat: 35.0037, lng: 135.7753 },
        transport: { icon: "🚌", text: { en: "Kyoto City Bus (15m)", zh: "京都市巴士約 15 分鐘" } }
      }
    ]
  },

  /* ════ DAY 4 ════ */
  {
    id: "day-4",
    dayNum: "04",
    date: "Nov 17",
    region: "kyoto-osaka",
    title: {
      en: "Arashiyama Bamboo Grove & Golden Pavilion to Dotonbori Osaka",
      zh: "嵐山竹林紅葉與金閣寺 — 轉往大阪道頓堀美食盛宴"
    },
    tags: [
      { type: "city", text: "🎋 Arashiyama & Osaka" },
      { type: "pace", en: "📸 Photo Highlights", zh: "📸 名勝打卡" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: { en: "Arashiyama Bamboo Grove & Tenryu-ji Sogenchi Garden", zh: "嵐山幽靜竹林小徑與天龍寺曹源池庭園" },
          desc: {
            en: "Early morning serenity in towering bamboo forest and UNESCO World Heritage Zen garden with reflections of autumn maple leaves.",
            zh: "清晨漫步於參天翠綠的竹林小徑，參拜世界遺產天龍寺，欣賞借景嵐山的紅葉名庭。"
          }
        },
        location: { name: "Arashiyama Bamboo Grove", lat: 35.0169, lng: 135.6713 },
        transport: { icon: "🚆", text: { en: "JR Sagano Line (18m)", zh: "JR 嵯峨野線約 18 分鐘" } }
      },
      {
        time: { en: "✨ Afternoon", zh: "✨ 下午" },
        activity: {
          title: { en: "Kinkaku-ji (Golden Pavilion) & Rapid Train to Osaka", zh: "金閣寺閃耀金箔殿堂及新快速列車抵達大阪" },
          desc: {
            en: "Admire the top two floors covered in pure gold leaf shimmering over Mirror Pond, then take 30-min JR Special Rapid to Osaka.",
            zh: "參觀金碧輝煌的金閣寺在鏡湖池中的絕美倒影，午後搭乘 JR 新快速列車僅需 30 分鐘直達大阪市中心。"
          }
        },
        location: { name: "Kinkaku-ji", lat: 35.0394, lng: 135.7292 },
        transport: { icon: "🚆", text: { en: "JR Special Rapid (29m)", zh: "JR 新快速約 29 分鐘" } }
      },
      {
        time: { en: "🐙 Evening", zh: "🐙 晚上" },
        activity: {
          title: { en: "Dotonbori Neon Glico Sign & Takoyaki Street Food Safari", zh: "道頓堀固力果跑步人招牌與章魚燒街頭美食" },
          desc: {
            en: "Experience Osaka's famous 'Eat until you drop' culture: authentic piping-hot Takoyaki, Kushikatsu skewers, and Okonomiyaki.",
            zh: "在閃耀巨型霓虹招牌下合照，體驗大阪「吃到破產」的美食狂歡：現烤章魚燒、炸串及大阪燒。"
          }
        },
        location: { name: "Dotonbori", lat: 34.6687, lng: 135.5013 },
        transport: { icon: "🚶", text: { en: "Walk in Namba District", zh: "難波心齋橋徒步區" } }
      }
    ]
  },

  /* ════ DAY 5 ════ */
  {
    id: "day-5",
    dayNum: "05",
    date: "Nov 18",
    region: "osaka-departure",
    title: {
      en: "Osaka Castle, Shinsaibashi Shopping & Kansai Airport Departure",
      zh: "大阪城天守閣、心齋橋藥妝採購與關西機場返程"
    },
    tags: [
      { type: "city", text: "🏯 Osaka Castle & KIX" },
      { type: "pace", en: "🛍️ Shopping & Return", zh: "🛍️ 伴手禮與回程" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: { en: "Osaka Castle Park & Panoramic Tower Observation", zh: "大阪城天守閣公園散策與登頂遠眺" },
          desc: {
            en: "Explore majestic stone moats and historic castle grounds, taking in 360-degree cityscape vistas from the top observation tier.",
            zh: "參觀雄偉的護城河與歷史名城，登上天守閣展望台 360 度俯瞰大阪都會天際線。"
          }
        },
        location: { name: "Osaka Castle", lat: 34.6873, lng: 135.5262 },
        transport: { icon: "🚇", text: { en: "Osaka Metro (12m)", zh: "大阪地鐵約 12 分鐘" } }
      },
      {
        time: { en: "🛍️ Midday", zh: "🛍️ 中午" },
        activity: {
          title: { en: "Shinsaibashi Souvenir Shopping & Kuromon Market Lunch", zh: "心齋橋免稅藥妝伴手禮最後衝刺與黑門市場海鮮午餐" },
          desc: {
            en: "Pick up Tokyo Banana, Matcha treats, and Japanese skincare at Tax-Free outlets. Fresh grilled Kobe beef and sashimi at Kuromon.",
            zh: "於心齋橋免稅店採買日本伴手禮、美妝及電器，於黑門市場享用現烤和牛與新鮮生魚片。"
          }
        },
        location: { name: "Kuromon Market", lat: 34.6653, lng: 135.5069 },
        transport: { icon: "🚶", text: { en: "Walking distance", zh: "步行可達" } }
      },
      {
        time: { en: "✈️ Afternoon / Evening", zh: "✈️ 傍晚" },
        activity: {
          title: { en: "Haruka Express to Kansai International Airport (KIX) Departure", zh: "乘搭關空特急 Haruka 直達關西國際機場 (KIX) 順利回程" },
          desc: {
            en: "Board the Hello Kitty Haruka express from Tennoji/Shin-Osaka direct to KIX for tax-free collection and pleasant flight home.",
            zh: "乘搭關空特急 Haruka 列車直通關西國際機場，辦理出境登機與免稅品提貨，圓滿結束充實難忘的 5 日日本黃金精華之旅！"
          }
        },
        location: { name: "Kansai Airport (KIX)", lat: 34.4320, lng: 135.2304 },
        transport: { icon: "🚆", text: { en: "Haruka Express (45m)", zh: "關空特急約 45 分鐘" } }
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ITINERARY_DATA = ITINERARY_DATA;
}
