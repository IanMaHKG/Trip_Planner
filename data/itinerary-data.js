/**
 * @file itinerary-data.js
 * @description DATA SOURCE — Day-by-Day schedule for the entire journey.
 * Sets window.ITINERARY_DATA for consumption by render.js and map.js.
 *
 * AGENTS — Day object schema reference:
 * ──────────────────────────────────────────────
 * ITINERARY_DATA = Array<DayObject>
 *
 * DayObject = {
 *   id:     string,                // REQUIRED. DOM id (e.g. "day-1").
 *   dayNum: string,                // REQUIRED. Numeric label (e.g. "01", "02").
 *   date:   string,                // REQUIRED. Display date (e.g. "Sep 10").
 *   region: string,                // REQUIRED. Slug for region filter tabs
 *                                  //   (e.g. "zurich-lucerne"). Used as
 *                                  //   data-region attr on the day card.
 *   title:  BilingualObj,          // REQUIRED. Day headline.
 *
 *   tags: Array<{                  // Optional. Displayed as colored pills.
 *     type:  string,               //   CSS class suffix: city|nature|culture|pace
 *     text:  BilingualObj | string //   Pill label
 *     en?:   string,               //   Legacy shorthand (use text instead)
 *     zh?:   string
 *   }>,
 *
 *   blocks: Array<{                // REQUIRED. Time slots for the day.
 *     time: BilingualObj,          //   e.g. { en: "🌅 Morning", zh: "🌅 早上" }
 *     activity: {
 *       title:  BilingualObj,      // REQUIRED.
 *       desc:   BilingualObj,      // REQUIRED.
 *       meal?: {                   // Optional. Displayed below the description.
 *         icon: emoji,
 *         en:   string,            // May contain safe inline HTML (<strong>, <em>)
 *         zh:   string
 *       },
 *       locations?: Array<{        // Optional. Plotted on day mini-map by map.js.
 *         lat: number,
 *         lng: number,
 *         label: BilingualObj
 *       }>
 *     },
 *     location?: {                 // Optional. Shown as a meta pill below desc.
 *       name: BilingualObj
 *     },
 *     transport?: {                // Optional. Shown as a meta pill below desc.
 *       icon: emoji,
 *       text: BilingualObj
 *     }
 *   }>,
 *
 *   tip?: BilingualObj             // Optional. "Pro Tip" callout at day bottom.
 * }
 *
 * BilingualObj = { [primaryCode]: string, [secondaryCode]: string }
 *   where codes match TRIP_CONFIG.languages.primary.code / secondary.code.
 *
 * AGENTS rules:
 *   • Every day MUST have a unique id, dayNum, date, and at least one block.
 *   • Day 1 (index 0) is auto-expanded; all others start collapsed.
 *   • The region slug must match one of the entries in SITE_DATA.overview.routeStops
 *     (or be a new valid slug — the filter tab auto-generates a label for it).
 *   • meal.en / meal.zh may contain safe HTML (<strong>, <em>) for emphasis.
 *     Never inject <script>, event attributes, or external links there.
 *   • locations[] coordinates are plotted as-is by map.js with no validation;
 *     ensure they are valid WGS-84 decimal degrees (lat: −90–90, lng: −180–180).
 *
 * @see data/config.js   — Language codes for BilingualObj keys.
 * @see data/site-data.js — Non-itinerary content (overview, tips, budget, hotels).
 * @see js/render.js     — renderItinerary() consumes this array.
 * @see js/map.js        — initDayMiniMap() consumes locations[] arrays.
 * @see AGENTS.md        — Data-driven pattern rules.
 */

const ITINERARY_DATA = [
  /* ════ DAY 1 ════ */
  {
    id: "day-1",
    dayNum: "01",
    date: "Sep 10",
    region: "zurich-lucerne",
    title: {
      en: "Arrival in Zurich (蘇黎世) — Old Town & Limmat River Cruise",
      zh: "抵達蘇黎世 — 舊城漫步與利馬特河遊船"
    },
    tags: [
      { type: "city", text: "🏙️ Zurich (蘇黎世)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Arrive at Zurich Airport (ZRH) & SBB Transfer",
            zh: "抵達蘇黎世國際機場 (ZRH) 及乘搭瑞士國鐵進入市區"
          },
          desc: {
            en: "Clear customs and board the direct 10-minute SBB train to Zurich Hauptbahnhof (HB). Check in to your hotel and refresh after the flight.",
            zh: "辦理入境手續，於機場地下車站搭乘 10 分鐘直達火車前往蘇黎世中央車站。辦理酒店 Check-in 稍作休息。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Brunch:</strong> Enjoy fresh Swiss croissants and specialty coffee at <em>Café Schober</em> in the historic Old Town.",
            zh: "<strong>早午餐：</strong> 在舊城區百年名店 <em>Café Schober</em> 品嚐新鮮可頌牛角包與香濃瑞士咖啡。"
          },
          locations: [
            { lat: 47.4582, lng: 8.5555, label: { en: "Zurich Airport", zh: "蘇黎世機場" } },
            { lat: 47.3779, lng: 8.5402, label: { en: "Zurich HB Station", zh: "蘇黎世中央車站" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Lindenhof Hill & Lake Zurich Promenade",
            zh: "林登霍夫山丘俯瞰與蘇黎世湖畔漫步"
          },
          desc: {
            en: "Stroll up to the peaceful tree-lined Lindenhof viewpoint for panoramic vistas over the Limmat river and Grossmünster towers.",
            zh: "漫步登上綠樹成蔭的林登霍夫古山丘，俯瞰利馬特河與雙塔大教堂的經典全景。"
          },
          meal: {
            icon: "🍽️",
            en: "<strong>Lunch:</strong> <em>Zeughauskeller</em> — Authentic Swiss sausages and rösti in a historic 15th-century armory hall.",
            zh: "<strong>午餐：</strong> <em>軍械庫餐廳 (Zeughauskeller)</em> — 在15世紀歷史軍械庫內品嚐傳統瑞士香腸與香脆馬鈴薯煎餅 (Rösti)。"
          },
          locations: [
            { lat: 47.3725, lng: 8.5411, label: { en: "Lindenhof Viewpoint", zh: "林登霍夫觀景點" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Limmat River Boat & Lakefront Sunset",
            zh: "利馬特河水上巴士觀光與湖畔日落"
          },
          desc: {
            en: "Hop on a glass-topped river boat from the National Museum down to Bürkliplatz and enjoy the tranquil lake atmosphere.",
            zh: "搭乘全玻璃頂利馬特河船，自國家博物館順流至布爾克利廣場，欣賞湖畔落日餘暉。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>Haus Hiltl</em> — The world's oldest vegetarian restaurant (established 1898), celebrated for its rich gourmet buffet.",
            zh: "<strong>晚餐：</strong> <em>Haus Hiltl</em> — 金氏世界紀錄認證全球最古老素食餐廳（創於1898年），供應精緻豐富的美食自助餐。"
          },
          locations: [
            { lat: 47.3670, lng: 8.5414, label: { en: "Bürkliplatz Pier", zh: "布爾克利碼頭" } }
          ]
        }
      }
    ],
    tip: {
      en: "Zurich tram and bus networks are fully integrated. Keep your SBB digital pass handy on your mobile phone.",
      zh: "蘇黎世市區電車與巴士網絡極為發達，搭乘時只需出示 SBB 電子票券即可。"
    }
  },

  /* ════ DAY 2 ════ */
  {
    id: "day-2",
    dayNum: "02",
    date: "Sep 11",
    region: "zurich-lucerne",
    title: {
      en: "Zurich to Lucerne (琉森) — Chapel Bridge & Lake Steamer",
      zh: "蘇黎世前往琉森 — 漫步卡貝爾木橋與古典蒸汽遊船"
    },
    tags: [
      { type: "city", text: "🌊 Lucerne (琉森)" },
      { type: "transport", text: "🚆 SBB Scenic Train" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Panoramic Train to Lucerne (45 mins)",
            zh: "搭乘景觀列車前往琉森（車程約 45 分鐘）"
          },
          desc: {
            en: "Board the morning train along Lake Zug to Lucerne. Drop luggage at your hotel right beside Lake Lucerne.",
            zh: "搭乘沿楚格湖畔行駛的晨間列車抵達琉森，將行李存放於琉森湖畔酒店。"
          },
          meal: {
            icon: "🥐",
            en: "<strong>Morning Coffee:</strong> <em>Confiserie Bachmann</em> on Schwanenplatz for Swiss pralines and freshly baked pastries.",
            zh: "<strong>晨間咖啡：</strong> 位於天鵝廣場的 <em>Bachmann</em> 享用瑞士手工巧克力與現烤酥點。"
          },
          locations: [
            { lat: 47.0502, lng: 8.3093, label: { en: "Lucerne Station", zh: "琉森火車站" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Kapellbrücke (Chapel Bridge) & Lion Monument",
            zh: "卡貝爾木橋、八角水塔與垂死獅子紀念碑"
          },
          desc: {
            en: "Walk across Europe's oldest covered wooden footbridge adorned with 17th-century paintings, then visit Mark Twain's 'most mournful piece of stone'.",
            zh: "漫步於歐洲最古老木造廊橋欣賞17世紀三角彩繪，隨後參訪馬克·吐溫筆下「世界上最令人哀傷的石雕」垂死獅子像。"
          },
          meal: {
            icon: "🧀",
            en: "<strong>Lunch:</strong> <em>Wirtshaus Galliker</em> — A beloved family tavern serving traditional Lucerne cheese dishes and Chügelipastete.",
            zh: "<strong>午餐：</strong> <em>Galliker 傳統酒館</em> — 當地家庭世代經營的老店，品嚐琉森特色奶油肉餡餅 (Chügelipastete)。"
          },
          locations: [
            { lat: 47.0516, lng: 8.3075, label: { en: "Chapel Bridge", zh: "卡貝爾木橋" } },
            { lat: 47.0583, lng: 8.3108, label: { en: "Lion Monument", zh: "垂死獅子像" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Historic Paddle Steamer Lake Cruise",
            zh: "乘搭歷史百年蒸汽遊船暢遊琉森湖"
          },
          desc: {
            en: "Board a historic Belle Époque paddle steamer for a 1-hour relaxing cruise surrounded by alpine peaks.",
            zh: "登上百年前建造的美好年代蒸汽明輪船，在群山環抱中享受一小時愜意巡航。"
          },
          meal: {
            icon: "🐟",
            en: "<strong>Dinner:</strong> <em>Restaurant Balances</em> — Fine lakeside dining overlooking the Reuss River with fresh lake trout.",
            zh: "<strong>晚餐：</strong> <em>Balances 湖畔景觀餐廳</em> — 坐擁羅伊斯河美景，品嚐新鮮烤湖魚與瑞士葡萄酒。"
          },
          locations: [
            { lat: 47.0520, lng: 8.3115, label: { en: "Lucerne Ferry Pier", zh: "琉森遊船碼頭" } }
          ]
        }
      }
    ],
    tip: {
      en: "Lake Lucerne boat cruises are 100% free with the Swiss Travel Pass or 50% off with Half Fare Card.",
      zh: "持有瑞士旅行通行證可免費搭乘琉森湖遊船，持半價卡享半價優惠。"
    }
  },

  /* ════ DAY 3 ════ */
  {
    id: "day-3",
    dayNum: "03",
    date: "Sep 12",
    region: "zurich-lucerne",
    title: {
      en: "Mount Pilatus Golden Round Trip (皮拉圖斯山)",
      zh: "皮拉圖斯山金色環遊 — 齒軌登山火車與高空全景纜車"
    },
    tags: [
      { type: "nature", text: "🏔️ Mount Pilatus" },
      { type: "pace", en: "✨ Highlight", zh: "✨ 亮點行程" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "World's Steepest Cogwheel Railway to Pilatus Kulm",
            zh: "搭乘全球最陡齒軌鐵路登頂 Pilatus Kulm (48% 坡度)"
          },
          desc: {
            en: "Take the boat to Alpnachstad and board the legendary red cogwheel train climbing up sheer cliff faces to 2,132 meters.",
            zh: "自琉森搭船至 Alpnachstad，轉乘傳奇紅色齒軌登山火車，以高達 48% 坡度攀升至海拔 2,132 米的峰頂。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Peak Coffee:</strong> Hot chocolate and alpine strudel at <em>Hotel Pilatus-Kulm</em> panoramic terrace.",
            zh: "<strong>峰頂茶歇：</strong> 於 <em>Pilatus-Kulm 觀景飯店露台</em> 享用瑞士熱可可與蘋果派。"
          },
          locations: [
            { lat: 46.9798, lng: 8.2536, label: { en: "Pilatus Kulm", zh: "皮拉圖斯峰頂" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Dragon Path Walk & Aerial Cableway Descent",
            zh: "巨龍岩洞步道漫步與高空「巨龍快線」纜車下山"
          },
          desc: {
            en: "Walk through the sheltered rock galleries of the Dragon Path with 360° views across 73 Alpine peaks, then descend via the Dragon Ride cableway to Kriens.",
            zh: "漫步於穿透岩壁的巨龍迴廊，俯瞰 73 座阿爾卑斯雪山，隨後搭乘全景巨龍纜車平穩下山至 Kriens。"
          },
          meal: {
            icon: "🍲",
            en: "<strong>Lunch:</strong> <em>Bellevue Panoramic Restaurant</em> — Hearty Swiss beef goulash and fondue.",
            zh: "<strong>午餐：</strong> <em>Bellevue 全景餐廳</em> — 享用經典瑞士燉牛肉與濃郁芝士火鍋。"
          },
          locations: [
            { lat: 46.9930, lng: 8.2700, label: { en: "Dragon Ride Cableway", zh: "巨龍纜車" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Lucerne Musegg Wall & Sunset Walk",
            zh: "漫步穆塞格古城牆與守望塔"
          },
          desc: {
            en: "Explore the medieval ramparts of the Musegg Wall and see the oldest clock in Lucerne that chimes one minute before all others.",
            zh: "參觀保存完好的中世紀穆塞格城牆，觀賞琉森最古老且比其他時鐘早一分鐘報時的歷史大鐘。"
          },
          meal: {
            icon: "🍝",
            en: "<strong>Dinner:</strong> <em>Grottino 1313</em> — Candlelit multi-course chef tasting menu in a charming converted barn.",
            zh: "<strong>晚餐：</strong> <em>Grottino 1313</em> — 在溫馨典雅的石造古建築中享受無菜單主廚精選料理。"
          },
          locations: [
            { lat: 47.0545, lng: 8.3050, label: { en: "Musegg Wall", zh: "穆塞格城牆" } }
          ]
        }
      }
    ],
    tip: {
      en: "Always check the morning peak webcam at hotel reception before taking the cogwheel train.",
      zh: "出發前可於酒店櫃檯確認峰頂即時影像，確保視野晴朗無霧。"
    }
  },

  /* ════ DAY 4 ════ */
  {
    id: "day-4",
    dayNum: "04",
    date: "Sep 13",
    region: "interlaken-jungfrau",
    title: {
      en: "GoldenPass Line to Interlaken & Lauterbrunnen Waterfalls",
      zh: "黃金快車前往因特拉肯與勞特布龍嫩瀑布仙境"
    },
    tags: [
      { type: "city", text: "🏔️ Interlaken (因特拉肯)" },
      { type: "nature", text: "💧 72 Waterfalls" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "GoldenPass Scenic Express: Lucerne → Interlaken",
            zh: "搭乘黃金快車景觀列車：琉森至因特拉肯"
          },
          desc: {
            en: "Glide past emerald lakes (Lake Sarnen & Lake Lungern) and climb over the Brünig Pass with floor-to-ceiling panoramic windows.",
            zh: "透過大片全景玻璃車窗，沿途飽覽薩爾嫩湖與龍疆湖的碧綠湖水，翻越布呂尼格山口。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Onboard Breakfast:</strong> Swiss cheese platter and croissants served in the bistro coach.",
            zh: "<strong>車上早餐：</strong> 在景觀餐車享用瑞士精選乳酪拼盤與熱咖啡。"
          },
          locations: [
            { lat: 46.7760, lng: 8.1360, label: { en: "Brünig Pass", zh: "布呂尼格山口" } },
            { lat: 46.6863, lng: 7.8632, label: { en: "Interlaken Ost", zh: "因特拉肯東站" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Lauterbrunnen Valley of 72 Waterfalls & Staubbach Falls",
            zh: "勞特布龍嫩 72 道瀑布之谷與施陶河瀑布 (Staubbach)"
          },
          desc: {
            en: "Visit the dramatic valley that inspired Tolkien's Rivendell. Walk right behind the mist of the 300-meter Staubbach Falls.",
            zh: "走訪啟發《魔戒》瑞文戴爾精靈之谷的夢幻仙境，沿步道直達近300米高的施陶河瀑布後方水幕。"
          },
          meal: {
            icon: "🥞",
            en: "<strong>Lunch:</strong> <em>Airtime Café</em> (Lauterbrunnen) — Delicious homemade savoury quiches, carrot cake, and artisan coffee.",
            zh: "<strong>午餐：</strong> <em>Airtime Café</em> — 享受現烤法式鹹派、招牌胡蘿蔔蛋糕與精品咖啡。"
          },
          locations: [
            { lat: 46.5935, lng: 7.9077, label: { en: "Lauterbrunnen Staubbach", zh: "施陶河瀑布" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Check-in at Grindelwald Alpine Chalet Hotel",
            zh: "入住格林德瓦阿爾卑斯木屋度假酒店"
          },
          desc: {
            en: "Arrive in Grindelwald village and check in. Sit on your balcony watching the sunset turn the Eiger North Face into golden amber.",
            zh: "抵達夢幻山坡小鎮格林德瓦辦理入住。於客房私人陽台靜賞夕陽將艾格峰北壁染成金黃色澤。"
          },
          meal: {
            icon: "🧀",
            en: "<strong>Dinner:</strong> <em>Barry's Restaurant</em> (Grindelwald) — Legendary rustic Swiss fondue and grilled meats on hot stones.",
            zh: "<strong>晚餐：</strong> <em>Barry's 瑞士木屋餐廳</em> — 著名熱石炙烤牛排與濃郁阿爾卑斯芝士鍋。"
          },
          locations: [
            { lat: 46.6242, lng: 8.0414, label: { en: "Grindelwald Village", zh: "格林德瓦小鎮" } }
          ]
        }
      }
    ],
    tip: {
      en: "Grindelwald guest cards provided at hotel check-in offer free local valley bus rides.",
      zh: "入住格林德瓦酒店領取的遊客卡可免費搭乘山谷內所有當地公車。"
    }
  },

  /* ════ DAY 5 ════ */
  {
    id: "day-5",
    dayNum: "05",
    date: "Sep 14",
    region: "interlaken-jungfrau",
    title: {
      en: "Jungfraujoch — Top of Europe (少女峰歐洲之巔)",
      zh: "少女峰歐洲之巔 — 艾格快線三索纜車與阿萊奇冰川"
    },
    tags: [
      { type: "nature", text: "❄️ 3,454m Glacier" },
      { type: "special", en: "⭐ UNESCO Heritage", zh: "⭐ 世界自然遺產" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Eiger Express Tricable Gondola & Cogwheel Ascent",
            zh: "搭乘「艾格快線」三索全景纜車直通峰頂鐵路"
          },
          desc: {
            en: "Take the ultramodern Eiger Express from Grindelwald Terminal to Eigergletscher in just 15 minutes, then board the cogwheel train through the mountain rock to 3,454 meters.",
            zh: "從格林德瓦航站搭乘最新艾格快線全景纜車，僅需15分鐘直達艾格冰川站，轉乘齒軌火車登上海拔3,454米。"
          },
          meal: {
            icon: "🍫",
            en: "<strong>Treat:</strong> Fresh Swiss pralines at <em>Lindt Swiss Chocolate Heaven</em> on the summit.",
            zh: "<strong>甜點：</strong> 在峰頂 <em>瑞士蓮巧克力天堂 (Lindt Heaven)</em> 品嚐新鮮手工製作巧克力。"
          },
          locations: [
            { lat: 46.5475, lng: 7.9826, label: { en: "Jungfraujoch Sphinx", zh: "斯芬克斯觀景台" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Sphinx Observatory, Ice Palace & Aletsch Glacier",
            zh: "斯芬克斯觀景台、阿萊奇萬年冰川與冰宮冰雕"
          },
          desc: {
            en: "Step out onto the Sphinx terrace for jaw-dropping views of the Great Aletsch Glacier (the longest in the Alps at 23 km), and walk inside the subterranean Ice Palace.",
            zh: "登上斯芬克斯戶外觀景平台俯瞰長達23公里的阿爾卑斯最大阿萊奇冰川，走入萬年藍冰雕琢的地下冰宮。"
          },
          meal: {
            icon: "🍲",
            en: "<strong>Lunch:</strong> <em>Crystal Restaurant</em> (Jungfraujoch) — Dine above the clouds with panoramic glacier views.",
            zh: "<strong>午餐：</strong> <em>Crystal 景觀餐廳</em> — 在萬年冰川雲端之上享用精緻瑞士熱餐。"
          },
          locations: [
            { lat: 46.5480, lng: 7.9830, label: { en: "Ice Palace", zh: "少女峰冰宮" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Kleine Scheidegg Walk & Return to Grindelwald",
            zh: "小夏戴克高山草甸漫步與返回格林德瓦"
          },
          desc: {
            en: "Stop at Kleine Scheidegg on the way down for gentle photos against the famous Eiger, Mönch, and Jungfrau trio.",
            zh: "回程停留於小夏戴克高山平原，以艾格、僧侶、少女峰三座名峰為背景留下全家合影。"
          },
          meal: {
            icon: "🥩",
            en: "<strong>Dinner:</strong> <em>Restaurant Glacier</em> (Grindelwald) — Award-winning seasonal farm-to-table cuisine.",
            zh: "<strong>晚餐：</strong> <em>Glacier 精品景觀餐廳</em> — 享用瑞士米其林指南推薦之在地有機農場四季美饌。"
          },
          locations: [
            { lat: 46.5852, lng: 7.9608, label: { en: "Kleine Scheidegg", zh: "小夏戴克" } }
          ]
        }
      }
    ],
    tip: {
      en: "Take it slow at 3,454m altitude. Drink plenty of water and wear your sunglasses to prevent snow glare.",
      zh: "高海拔活動請放慢腳步，多補充水分並全程配戴太陽眼鏡防止雪地強光反彈。"
    }
  },

  /* ════ DAY 6 ════ */
  {
    id: "day-6",
    dayNum: "06",
    date: "Sep 15",
    region: "interlaken-jungfrau",
    title: {
      en: "Grindelwald First Cliff Walk & Lake Bachalpsee",
      zh: "First 懸崖天空步道與巴克普湖倒影健行"
    },
    tags: [
      { type: "nature", text: "🌁 First Cliff Walk" },
      { type: "pace", en: "🏔️ Panoramic", zh: "🏔️ 壯麗絕景" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Grindelwald-First Gondola & Tissot Cliff Walk",
            zh: "搭乘纜車登 First 峰與天梭懸崖天空步道"
          },
          desc: {
            en: "Ride the 6-seater gondola up to First (2,168m) and walk the suspended single-rope metal bridge wrapping around the sheer rock face.",
            zh: "搭乘六人纜車直上海拔2,168米的 First 峰，挑戰依附於懸崖峭壁之上的金屬懸空步道與觀景挑台。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Coffee:</strong> <em>Berggasthaus First</em> terrace overlooking the Wetterhorn peak.",
            zh: "<strong>咖啡：</strong> 在 <em>First 山頂木屋露台</em> 眺望維特霍恩名峰。"
          },
          locations: [
            { lat: 46.6596, lng: 8.0538, label: { en: "First Cliff Walk", zh: "First 懸崖步道" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Gentle Hike to Lake Bachalpsee",
            zh: "平緩健行至阿爾卑斯明珠 — 巴克普湖 (Bachalpsee)"
          },
          desc: {
            en: "An easy 50-minute family stroll along wide gravel trails to the crystal-clear alpine lake reflecting the Schreckhorn peaks.",
            zh: "沿寬敞平緩碎石步道漫步約50分鐘，抵達宛如藍寶石般倒映著雪山倒影的巴克普高山湖泊。"
          },
          meal: {
            icon: "🥪",
            en: "<strong>Picnic Lunch:</strong> Pack artisan Swiss cheeses, bread, and fruits from Grindelwald village for a scenic lakeside picnic.",
            zh: "<strong>野餐午餐：</strong> 在湖畔長椅上品嚐自小鎮準備的瑞士硬質乳酪、法棍與鮮甜水果。"
          },
          locations: [
            { lat: 46.6685, lng: 8.0205, label: { en: "Lake Bachalpsee", zh: "巴克普湖" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Lake Brienz Sunset Promenade in Interlaken",
            zh: "因特拉肯布里恩茨湖畔漫步與日落"
          },
          desc: {
            en: "Relaxed stroll along the turquoise waters of Lake Brienz and browse Swiss watches along the Höheweg promenade.",
            zh: "漫步於蒂芬妮藍色調的布里恩茨湖畔，在何維克大道欣賞因特拉肯滑翔傘降落點。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>Restaurant Taverne</em> (Interlaken) — Traditional Swiss beef fillets and Lake Thun fish.",
            zh: "<strong>晚餐：</strong> <em>Taverne 傳統景觀餐廳</em> — 享用經典瑞士香煎牛排與圖恩湖時令鮮魚。"
          },
          locations: [
            { lat: 46.6850, lng: 7.8580, label: { en: "Höheweg Interlaken", zh: "何維克大道" } }
          ]
        }
      }
    ],
    tip: {
      en: "The trail to Bachalpsee is graded easy and suitable for all ages with proper walking shoes.",
      zh: "前往巴克普湖之步道極為平緩寬敞，適合各年齡層長輩輕鬆漫步。"
    }
  },

  /* ════ DAY 7 ════ */
  {
    id: "day-7",
    dayNum: "07",
    date: "Sep 16",
    region: "zermatt-matterhorn",
    title: {
      en: "Scenic Train to Zermatt (策馬特) & Matterhorn Sunset",
      zh: "景觀列車前往策馬特 — 無車環保山城與馬特洪峰夕照"
    },
    tags: [
      { type: "city", text: "⭐ Zermatt (策馬特)" },
      { type: "transport", text: "🚆 Glacier Route Rail" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Scenic Train Journey via Spiez & Visp to Zermatt",
            zh: "經由施皮茨與菲斯普前往策馬特"
          },
          desc: {
            en: "Board the train heading south into the Valais canton, changing at Visp onto the narrow-gauge Matterhorn Gotthard Bahn.",
            zh: "搭乘列車南行進入瓦萊州，在菲斯普轉乘著名的馬特洪哥達窄軌登山火車蜿蜒入山。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Coffee Break:</strong> <em>Bäckerei Fuchs</em> (Zermatt) — Famous Matterhorn-shaped chocolate and freshly baked Valais rye bread.",
            zh: "<strong>下午茶歇：</strong> <em>Fuchs 百年烘焙坊</em> — 品嚐經典馬特洪峰造型巧克力與瓦萊黑麥麵包。"
          },
          locations: [
            { lat: 45.9763, lng: 7.7491, label: { en: "Zermatt Station", zh: "策馬特火車站" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Hinterdorf Old Wooden Chalets & Kirchbrücke Viewpoint",
            zh: "辛特多夫百年木造古建築區與教堂橋觀景點"
          },
          desc: {
            en: "Wander through the preserved 16th-century wooden barns raised on circular stilt stones (Mäuseplatten), and scout the Kirchbrücke viewpoint.",
            zh: "漫步於辛特多夫保存完好的16世紀傳統蘑菇石防鼠高腳木造糧倉，並前往教堂橋確認馬特洪峰日出拍攝點。"
          },
          meal: {
            icon: "🧀",
            en: "<strong>Lunch:</strong> <em>Restaurant Schäferstube</em> — Warm alpine raclette scraped directly from the cheese wheel onto roasted potatoes.",
            zh: "<strong>午餐：</strong> <em>Schäferstube 瑞士老店</em> — 現烤熱融瑞士 Raclette 芝士淋在香熱馬鈴薯上。"
          },
          locations: [
            { lat: 46.0195, lng: 7.7460, label: { en: "Kirchbrücke Viewpoint", zh: "教堂橋觀景點" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Sunset Glow over the Matterhorn",
            zh: "馬特洪峰落日晚霞與星空"
          },
          desc: {
            en: "Watch the famous pyramid peak transition from brilliant white to burning orange at dusk.",
            zh: "在小鎮觀景露台靜待夕陽餘暉將金字塔形狀的馬特洪峰峰頂染成絢麗橘紅。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>Chez Vrony</em> (or village location) — Gourmet alpine lamb and organic mountain cheeses.",
            zh: "<strong>晚餐：</strong> <em>Chez Vrony</em> — 享用鮮嫩阿爾卑斯高山烤羊排與在地有機乳酪。"
          },
          locations: [
            { lat: 46.0180, lng: 7.7490, label: { en: "Matterhorn View Deck", zh: "馬特洪峰觀景露台" } }
          ]
        }
      }
    ],
    tip: {
      en: "Zermatt is completely car-free. Only quiet electric taxis and horse-drawn carriages operate in the village.",
      zh: "策馬特為全區禁止燃油車輛通行的環保小鎮，鎮內僅有靜音電動車與復古馬車行駛。"
    }
  },

  /* ════ DAY 8 ════ */
  {
    id: "day-8",
    dayNum: "08",
    date: "Sep 17",
    region: "zermatt-matterhorn",
    title: {
      en: "Gornergrat Cogwheel Railway & Riffelsee Reflection",
      zh: "Gornergrat 齒軌登山火車與利菲爾湖馬特洪峰倒影"
    },
    tags: [
      { type: "nature", text: "🏔️ 3,089m Gornergrat" },
      { type: "special", en: "📸 Iconic Reflection", zh: "📸 經典倒影" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Historic Gornergrat Cogwheel Train to 3,089m",
            zh: "搭乘瑞士第一條電氣化齒軌火車直達海拔 3,089 米"
          },
          desc: {
            en: "Take the 33-minute scenic train ascending past stone bridges and pine forests to the summit of Gornergrat, surrounded by 29 four-thousand-meter peaks.",
            zh: "搭乘33分鐘景觀齒軌列車穿越松林與古石橋，抵達海拔3,089米的 Gornergrat 觀景台，盡覽29座4,000米以上雪山巨峰。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Peak Coffee:</strong> <em>3100 Kulmhotel Gornergrat</em> — Europe's highest hotel café.",
            zh: "<strong>峰頂咖啡：</strong> 在全歐洲海拔最高飯店 <em>3100 Kulmhotel</em> 觀景露台品嚐熱咖啡。"
          },
          locations: [
            { lat: 45.9832, lng: 7.7845, label: { en: "Gornergrat Kulm", zh: "Gornergrat 觀景台" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Riffelsee Lake & Iconic Matterhorn Reflection Walk",
            zh: "利菲爾湖 (Riffelsee) 漫步與經典馬特洪峰水中倒影"
          },
          desc: {
            en: "Hop off at Rotenboden station for a gentle 10-minute downhill stroll to Lake Riffelsee to witness the mirror-like reflection of the Matterhorn on the calm alpine water.",
            zh: "在 Rotenboden 車站下車，輕鬆緩步10分鐘抵達利菲爾湖畔，捕捉馬特洪峰倒映在清澈湖水中的明信片經典畫面。"
          },
          meal: {
            icon: "🍲",
            en: "<strong>Lunch:</strong> <em>Restaurant Riffelhaus 1853</em> — Historic alpine lodge serving traditional barley soup and rosti.",
            zh: "<strong>午餐：</strong> <em>Riffelhaus 1853 歷史旅館餐廳</em> — 享用熱騰騰的瑞士傳統大麥濃湯與煎薯餅。"
          },
          locations: [
            { lat: 45.9830, lng: 7.7770, label: { en: "Lake Riffelsee", zh: "利菲爾湖" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Matterhorn Museum & Village Evening Walk",
            zh: "馬特洪峰博物館參訪與策馬特小鎮夜遊"
          },
          desc: {
            en: "Visit Zermatlantis (the underground museum) to learn the dramatic story of the first ascent of the Matterhorn in 1865 by Edward Whymper.",
            zh: "參觀地下馬特洪峰博物館，深入了解1865年人類首次成功登頂馬特洪峰的壯烈歷史與傳奇。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>GramPi's</em> — Famous thin-crust Italian pizzas and pasta in central Zermatt.",
            zh: "<strong>晚餐：</strong> <em>GramPi's</em> — 策馬特最受歡迎的現烤薄脆意式披薩與手工義大利麵。"
          },
          locations: [
            { lat: 46.0200, lng: 7.7485, label: { en: "Matterhorn Museum", zh: "馬特洪峰博物館" } }
          ]
        }
      }
    ],
    tip: {
      en: "Morning light between 9:00 AM and 11:30 AM offers the calmest water and best reflection at Riffelsee.",
      zh: "上午 9:00 至 11:30 間湖面風力最微弱，是拍攝利菲爾湖完美倒影的最佳時段。"
    }
  },

  /* ════ DAY 9 ════ */
  {
    id: "day-9",
    dayNum: "09",
    date: "Sep 18",
    region: "lake-como-milan",
    title: {
      en: "Zermatt to Lake Como (科莫湖) via Lugano & Bellagio",
      zh: "策馬特經盧加諾前往科莫湖 — 抵達美麗珍珠貝拉焦"
    },
    tags: [
      { type: "city", text: "🌊 Lake Como (科莫湖)" },
      { type: "transport", text: "🚗 Car Rental Pickup" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Train through Centovalli / Lugano & Pick up Rental Car",
            zh: "乘火車抵達盧加諾取車，開啟意大利湖區自駕"
          },
          desc: {
            en: "Travel from Zermatt via Domodossola to Lugano. Pick up your spacious rental station wagon / SUV at Lugano station.",
            zh: "搭車前往盧加諾車站取車，辦理租車手續並裝載行李，開啟科莫湖區自駕之旅。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Espresso:</strong> First Italian espresso and cannoli at <em>Grand Café Al Porto</em> in Lugano.",
            zh: "<strong>意式咖啡：</strong> 於盧加諾老城名店享用第一杯地道濃縮咖啡與西西里奶酪卷 (Cannoli)。"
          },
          locations: [
            { lat: 46.0037, lng: 8.9511, label: { en: "Lugano Station", zh: "盧加諾車站" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Scenic Lake Drive & Car Ferry to Bellagio",
            zh: "湖畔景觀公路自駕與搭乘汽車渡輪抵達貝拉焦"
          },
          desc: {
            en: "Drive along the winding shore of Lake Como to Cadenabbia, and take the 15-minute car ferry across the water to Bellagio.",
            zh: "沿科莫湖畔公路駕駛至 Cadenabbia 渡輪口，搭乘15分鐘汽車渡輪橫渡湖面抵達貝拉焦。"
          },
          meal: {
            icon: "🍝",
            en: "<strong>Lunch:</strong> <em>Ristorante Bilacus</em> (Bellagio) — Homemade tagliolini with black truffles in a charming garden courtyard.",
            zh: "<strong>午餐：</strong> <em>Bilacus 花園餐廳</em> — 在優雅露天庭院品嚐新鮮手工黑松露義大利麵。"
          },
          locations: [
            { lat: 45.9868, lng: 9.2625, label: { en: "Bellagio Waterfront", zh: "貝拉焦湖畔碼頭" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Sunset Aperitivo at Punta Spartivento",
            zh: "Punta Spartivento 湖角日落餐前酒 (Aperitivo)"
          },
          desc: {
            en: "Walk to the northernmost tip of the Bellagio peninsula where the three arms of Lake Como meet with magnificent mountain backdrops.",
            zh: "步行至貝拉焦半島最北端之 Punta Spartivento，在此科莫湖三大湖臂交會處欣賞日落晚霞。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>Ristorante La Punta</em> — Fresh lake perch risotto and chilled Franciacorta sparkling wine.",
            zh: "<strong>晚餐：</strong> <em>La Punta 湖角景觀餐廳</em> — 享用科莫湖招牌鱸魚燉飯 (Risotto al Pesce Persico)。"
          },
          locations: [
            { lat: 45.9920, lng: 9.2640, label: { en: "Punta Spartivento", zh: "科莫湖角" } }
          ]
        }
      }
    ],
    tip: {
      en: "Car ferry tickets on Lake Como are purchased directly at the dock before boarding.",
      zh: "科莫湖汽車渡輪車票可於碼頭售票亭隨到隨買，排隊依序登船極為便利。"
    }
  },

  /* ════ DAY 10 ════ */
  {
    id: "day-10",
    dayNum: "10",
    date: "Sep 19",
    region: "lake-como-milan",
    title: {
      en: "Villa Balbianello & Pastel Village of Varenna",
      zh: "巴爾比亞內洛別墅與彩色小鎮瓦倫納 (Varenna)"
    },
    tags: [
      { type: "culture", text: "🌿 Star Wars Villa" },
      { type: "nature", text: "⛴️ Lake Ferry" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Villa del Balbianello Historic Gardens",
            zh: "巴爾比亞內洛別墅 (Villa del Balbianello) 歷史花園"
          },
          desc: {
            en: "Take a taxi boat to the world-famous peninsula villa featured in Star Wars and James Bond 007 Casino Royale, with cascading terraced gardens.",
            zh: "搭乘水上木船前往《星際大戰》及《007皇家夜總會》拍攝地，欣賞修剪如藝術品般的湖畔階梯花園與古樹。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Coffee:</strong> Espresso and gelato on the lakefront terrace at Lenno harbor.",
            zh: "<strong>咖啡：</strong> 在 Lenno 湖港邊露天咖啡座享用意大利濃縮咖啡與手工 Gelato。"
          },
          locations: [
            { lat: 45.9658, lng: 9.2025, label: { en: "Villa Balbianello", zh: "巴爾比亞內洛別墅" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Passenger Ferry to Varenna & Villa Monastero",
            zh: "搭乘渡輪前往彩虹小鎮瓦倫納與莫納斯特羅別墅花園"
          },
          desc: {
            en: "Explore the cobblestone stairways of Varenna and stroll the 2-km lakeside botanical promenade of Villa Monastero.",
            zh: "穿梭於瓦倫納古樸彩色石梯巷弄，漫步於莫納斯特羅別墅長達 2 公里的湖畔珍稀植物花園長廊。"
          },
          meal: {
            icon: "🍕",
            en: "<strong>Lunch:</strong> <em>Al Prato Ristorante</em> (Varenna) — Authentic Italian antipasti, seafood pasta, and tiramisu.",
            zh: "<strong>午餐：</strong> <em>Al Prato 瓦倫納老店</em> — 精緻意式冷盤、時令海鮮麵與招牌提拉米蘇。"
          },
          locations: [
            { lat: 46.0105, lng: 9.2835, label: { en: "Varenna Waterfront", zh: "瓦倫納水岸" } },
            { lat: 46.0062, lng: 9.2860, label: { en: "Villa Monastero", zh: "莫納斯特羅別墅" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Return Ferry & Sunset Gelato in Bellagio",
            zh: "搭船返回貝拉焦與品嚐意大利手工冰淇淋"
          },
          desc: {
            en: "Catch the sunset ferry back across the lake and stroll along Bellagio's Via Giuseppe Garibaldi boutiques.",
            zh: "乘傍晚渡輪返回貝拉焦，於加里波底精品石階街挑選科莫絲綢工藝品。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>Ristorante Silvio</em> — Historic family restaurant established 1919, renowned for wild lake fish risotto.",
            zh: "<strong>晚餐：</strong> <em>Silvio 湖魚名店</em> — 創立於1919年的百年老字號，品嚐傳承四代的鮮嫩湖魚料理。"
          },
          locations: [
            { lat: 45.9810, lng: 9.2590, label: { en: "Silvio Restaurant", zh: "Silvio 餐廳" } }
          ]
        }
      }
    ],
    tip: {
      en: "Pre-book your Villa Balbianello garden tickets online to skip the main admission lines.",
      zh: "巴爾比亞內洛別墅花園門票建議提前線上預約以避開現場排隊購票人潮。"
    }
  },

  /* ════ DAY 11 ════ */
  {
    id: "day-11",
    dayNum: "11",
    date: "Sep 20",
    region: "lake-como-milan",
    title: {
      en: "Drive to Milan (米蘭) — Duomo Rooftop & Galleria",
      zh: "自駕前往米蘭 — 漫步米蘭大教堂屋頂與艾曼紐二世拱廊"
    },
    tags: [
      { type: "city", text: "🏛️ Milan (米蘭)" },
      { type: "culture", text: "👑 Duomo di Milano" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Scenic Drive to Milan & Return Rental Car",
            zh: "驅車前往米蘭市區，歸還租賃車輛"
          },
          desc: {
            en: "Drive 1 hour south from Lake Como to Milan Central Station area, return your rental car, and check in to your central Milan hotel.",
            zh: "沿高速公路南下約1小時抵達米蘭中央車站歸還車輛，入住市中心高級飯店。"
          },
          meal: {
            icon: "🥐",
            en: "<strong>Breakfast / Coffee:</strong> <em>Pasticceria Marchesi</em> (Galleria) — Iconic green velvet salon with legendary Milanese pastries.",
            zh: "<strong>經典早茶：</strong> 拱廊街內的 <em>Pasticceria Marchesi</em> 百年甜點名店品嚐精緻千層酥與卡布奇諾。"
          },
          locations: [
            { lat: 45.4850, lng: 9.2040, label: { en: "Milan Centrale", zh: "米蘭中央車站" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Duomo di Milano Rooftop Terraces & Cathedral Interior",
            zh: "米蘭大教堂大理石屋頂漫步與大教堂內部參訪"
          },
          desc: {
            en: "Take the lift to the rooftop of the world's largest Gothic cathedral, walking among 135 delicate marble spires overlooking the Milan skyline.",
            zh: "搭乘電梯直達世界最大哥德式大教堂頂層，穿梭於135座精緻大理石尖塔之間，俯瞰米蘭現代與古典交融的天際線。"
          },
          meal: {
            icon: "🥩",
            en: "<strong>Lunch:</strong> <em>Ristorante Al Cantinone</em> — Classic Veal Milanese (Cotoletta alla Milanese) with saffron risotto.",
            zh: "<strong>午餐：</strong> <em>Al Cantinone 傳統餐館</em> — 品嚐外酥內嫩的米蘭炸小牛排與金黃番紅花燉飯 (Risotto alla Milanese)。"
          },
          locations: [
            { lat: 45.4642, lng: 9.1900, label: { en: "Duomo di Milano", zh: "米蘭大教堂" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Galleria Vittorio Emanuele II & La Scala Square",
            zh: "艾曼紐二世拱廊街漫步與斯卡拉歌劇院廣場"
          },
          desc: {
            en: "Stroll under the grand glass dome of Italy's oldest active shopping arcade, and spin your heel on the famous Turin Bull mosaic for good luck.",
            zh: "在宏偉玻璃穹頂下漫步於意大利最古老奢華拱廊街，並依傳統在金牛座馬賽克鑲嵌畫上旋轉腳跟祈求好運。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>Giacomo Arengario</em> — Spectacular dining room with floor-to-ceiling glass windows directly facing the lit-up Duomo.",
            zh: "<strong>晚餐：</strong> <em>Giacomo Arengario</em> — 坐擁正對夜晚亮燈米蘭大教堂的無敵落地玻璃全景。"
          },
          locations: [
            { lat: 45.4658, lng: 9.1895, label: { en: "Galleria Vittorio Emanuele II", zh: "艾曼紐二世拱廊街" } }
          ]
        }
      }
    ],
    tip: {
      en: "Duomo entry requires modest attire covering shoulders and knees for all visitors.",
      zh: "進入米蘭大教堂內部參觀須著遮蓋肩膀與膝蓋之合宜服裝。"
    }
  },

  /* ════ DAY 12 ════ */
  {
    id: "day-12",
    dayNum: "12",
    date: "Sep 21",
    region: "lake-como-milan",
    title: {
      en: "Brera Art District, Sforza Castle & Farewell Dinner",
      zh: "布雷拉藝術街區、斯福爾扎古堡與歡送盛宴"
    },
    tags: [
      { type: "culture", text: "🎨 Brera District" },
      { type: "pace", en: "🍷 Farewell", zh: "🍷 圓滿歡聚" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Brera Art District & Pinacoteca di Brera",
            zh: "布雷拉文藝街區漫步與布雷拉美術館"
          },
          desc: {
            en: "Wander the bohemian cobblestone alleys of Brera filled with independent art galleries, perfume ateliers, and café terraces.",
            zh: "漫步於布雷拉文藝氣息濃厚的石板街道，探訪獨立藝術畫廊、高級香氛工坊與街角露天咖啡館。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Coffee:</strong> <em>Caffè Fernanda</em> inside the Brera Museum courtyard.",
            zh: "<strong>咖啡：</strong> 在布雷拉美術館中庭 <em>Caffè Fernanda</em> 享用晨間咖啡。"
          },
          locations: [
            { lat: 45.4719, lng: 9.1878, label: { en: "Pinacoteca di Brera", zh: "布雷拉美術館" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Castello Sforzesco & Parco Sempione Stroll",
            zh: "斯福爾扎古堡 (Castello Sforzesco) 與森皮奧內公園"
          },
          desc: {
            en: "Visit the massive Renaissance brick fortress designed by Leonardo da Vinci, then relax in the shaded green lawns of Parco Sempione.",
            zh: "參觀由達文西參與防禦工事設計的文藝復興紅磚古堡，隨後在森皮奧內皇家公園綠蔭下悠閒小憩。"
          },
          meal: {
            icon: "🍝",
            en: "<strong>Lunch:</strong> <em>Trattoria Torre di Pisa</em> (Brera) — Classic Tuscan and Milanese handmade pastas in a lively atmosphere.",
            zh: "<strong>午餐：</strong> <em>Torre di Pisa 傳統餐廳</em> — 品嚐充滿歡樂氣氛的經典手工松露麵與特製意式甜點。"
          },
          locations: [
            { lat: 45.4705, lng: 9.1794, label: { en: "Castello Sforzesco", zh: "斯福爾扎古堡" } }
          ]
        }
      },
      {
        time: { en: "🌙 Evening", zh: "🌙 晚上" },
        activity: {
          title: {
            en: "Grand Farewell Family Dinner & Navigli Canal Walk",
            zh: "旅程圓滿歡送晚宴與納維利運河夜景漫步"
          },
          desc: {
            en: "Celebrate the end of an unforgettable 13-day Grand Tour with a multi-course celebratory Italian feast along the historic Navigli canal.",
            zh: "在達文西設計船閘的納維利運河畔享用豐盛的意式多道式慶祝盛宴，為難忘的13天阿爾卑斯湖光山色之旅畫下完美句點。"
          },
          meal: {
            icon: "🍷",
            en: "<strong>Dinner:</strong> <em>Ratanà</em> — Contemporary Lombardy cuisine and exceptional Barolo wine pairings.",
            zh: "<strong>晚餐：</strong> <em>Ratanà 米蘭頂級餐館</em> — 享受頂級倫巴第傳統料理與巴羅洛名酒搭配。"
          },
          locations: [
            { lat: 45.4520, lng: 9.1760, label: { en: "Navigli Canal", zh: "納維利運河" } }
          ]
        }
      }
    ],
    tip: {
      en: "Pack your suitcases and keep tax-free shopping receipts organized for airport customs tomorrow.",
      zh: "今晚可提前整理行李，並將退稅單據與購物發票集中存放以備明日機場海關蓋章。"
    }
  },

  /* ════ DAY 13 ════ */
  {
    id: "day-13",
    dayNum: "13",
    date: "Sep 22",
    region: "lake-como-milan",
    title: {
      en: "Milan Malpensa (MXP) Airport Departure — Safe Travels Home!",
      zh: "前往米蘭馬爾彭薩機場 (MXP) 搭機返程 — 祝旅途平安！"
    },
    tags: [
      { type: "transport", text: "✈️ Malpensa Express" },
      { type: "pace", en: "🏡 Safe Flight", zh: "🏡 平安返家" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Malpensa Express Train & Airport Check-in",
            zh: "搭乘馬爾彭薩特快火車 (Malpensa Express) 直達機場"
          },
          desc: {
            en: "Board the direct 50-minute Malpensa Express train from Milan Cadorna / Centrale to Terminal 1. Complete VAT tax refund and board your flight home.",
            zh: "自米蘭市中心搭乘直達馬爾彭薩特快抵達第一航廈，辦理退稅手續、行李托運並搭乘班機平安返家。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Airport Snack:</strong> Fresh Italian pastries and espresso before boarding.",
            zh: "<strong>登機前簡餐：</strong> 於候機室享用最後的地道意式咖啡與烘焙點心。"
          },
          locations: [
            { lat: 45.6300, lng: 8.7230, label: { en: "Milan Malpensa Airport", zh: "米蘭馬爾彭薩機場" } }
          ]
        }
      }
    ],
    tip: {
      en: "Arrive at Milan Malpensa Airport 3 hours prior to departure for international flights and VAT refund processing.",
      zh: "國際長途航班及辦理海關退稅建議提前 3 小時抵達米蘭機場。"
    }
  }
];

// Global export
if (typeof window !== 'undefined') {
  window.ITINERARY_DATA = ITINERARY_DATA;
}
