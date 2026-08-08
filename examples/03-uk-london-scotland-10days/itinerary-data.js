/**
 * @file itinerary-data.js
 * @description DATA SOURCE — UK & Scotland 10-Day Heritage Tour
 */

const ITINERARY_DATA = [
  /* ════ DAY 1 ════ */
  {
    id: "day-1",
    dayNum: "01",
    date: "Jun 12",
    region: "london",
    title: {
      en: "Arrive in London — Elizabeth Line & Westminster Sunset",
      zh: "抵達倫敦 — 伊利沙伯綫直達市中心與西敏寺夕陽"
    },
    tags: [
      { type: "city", text: "🏙️ London (倫敦)" },
      { type: "pace", en: "🧘 Gentle Arrival", zh: "🧘 輕鬆抵達" }
    ],
    blocks: [
      {
        time: { en: "🌅 Afternoon", zh: "🌅 下午" },
        activity: {
          title: { en: "Arrive Heathrow (LHR) & Elizabeth Line to Central London", zh: "抵達希斯路機場乘搭伊利沙伯綫直達市區" },
          desc: {
            en: "Land at Heathrow T2/T3, tap contactless card onto high-speed Elizabeth Line (30 mins to Paddington/Tottenham Court Rd), and check into hotel.",
            zh: "抵達倫敦希斯路機場，使用感應式信用卡直接乘搭嶄新伊利沙伯綫，30 分鐘直達市中心並入住酒店。"
          }
        },
        location: { name: "Heathrow Airport", lat: 51.4700, lng: -0.4543 },
        transport: { icon: "🚆", text: { en: "Elizabeth Line (30m)", zh: "伊利沙伯綫約 30 分鐘" } }
      },
      {
        time: { en: "🌇 Evening", zh: "🌇 傍晚" },
        activity: {
          title: { en: "Westminster Abbey, Big Ben & Thames River Golden Hour", zh: "西敏寺、大笨鐘與泰晤士河畔黃金日落漫步" },
          desc: {
            en: "Stroll across Westminster Bridge for world-famous views of the illuminated Elizabeth Tower (Big Ben), Houses of Parliament, and London Eye.",
            zh: "漫步橫跨西敏橋，欣賞亮燈的大笨鐘（伊利沙伯塔）、英國國會大廈與倫敦眼璀璨夕陽景致。"
          }
        },
        location: { name: "Big Ben & Westminster", lat: 51.5007, lng: -0.1246 },
        transport: { icon: "🚶", text: { en: "Walk along River Thames", zh: "泰晤士河畔步道" } }
      }
    ]
  },

  /* ════ DAY 2 ════ */
  {
    id: "day-2",
    dayNum: "02",
    date: "Jun 13",
    region: "london",
    title: {
      en: "British Museum, Royal Afternoon Tea & West End Musical",
      zh: "大英博物館古文明巡禮、英式頂級下午茶與西區音樂劇"
    },
    tags: [
      { type: "city", text: "🎭 West End & Bloomsbury" },
      { type: "pace", en: "👑 Royal & Cultural", zh: "👑 藝術與歌劇" }
    ],
    blocks: [
      {
        time: { en: "🏛️ Morning", zh: "🏛️ 早上" },
        activity: {
          title: { en: "The British Museum Great Court & Treasures", zh: "大英博物館大中庭與世界文明珍寶" },
          desc: {
            en: "Explore the Rosetta Stone, Egyptian mummies, Parthenon Sculptures under the iconic Norman Foster glass dome.",
            zh: "參觀羅塞塔石碑、古埃及木乃伊與巴特農神殿雕塑，沉浸於壯麗的玻璃天幕大中庭之中。"
          }
        },
        location: { name: "British Museum", lat: 51.5194, lng: -0.1270 },
        transport: { icon: "🚇", text: { en: "Tube Central Line (8m)", zh: "地鐵中央綫約 8 分鐘" } }
      },
      {
        time: { en: "🫖 Afternoon", zh: "🫖 下午" },
        activity: {
          title: { en: "Fortnum & Mason Diamond Jubilee Tea Salon", zh: "英國皇室御用 Fortnum & Mason 正統英式下午茶" },
          desc: {
            en: "Indulge in royal tiered scones with clotted cream, finger sandwiches, and bespoke loose-leaf teas in Piccadilly.",
            zh: "於 Piccadilly 旗艦店品嚐三層架現烤鬆餅佐濃縮奶油、精緻三文治與皇家特調紅茶。"
          }
        },
        location: { name: "Fortnum & Mason", lat: 51.5081, lng: -0.1384 },
        transport: { icon: "🚶", text: { en: "Walk through Covent Garden", zh: "途經柯芬園步行" } }
      },
      {
        time: { en: "🎭 Evening", zh: "🎭 晚上" },
        activity: {
          title: { en: "West End Musical Spectacular in Shaftesbury Avenue", zh: "倫敦西區劇院觀賞頂級音樂劇" },
          desc: {
            en: "Experience world-class theatre in London's West End (The Phantom of the Opera / Les Misérables / The Lion King).",
            zh: "在倫敦西區歷史悠久的劇院欣賞殿堂級音樂劇《歌劇魅影》或《孤星淚》，感受震撼視聽盛宴。"
          }
        },
        location: { name: "West End Theatres", lat: 51.5128, lng: -0.1310 },
        transport: { icon: "🚶", text: { en: "Walk in Soho / Theatreland", zh: "蘇豪劇院區步行" } }
      }
    ]
  },

  /* ════ DAY 3 ════ */
  {
    id: "day-3",
    dayNum: "03",
    date: "Jun 14",
    region: "london",
    title: {
      en: "Tower of London, Tower Bridge & Borough Market Feast",
      zh: "倫敦塔皇家珠寶、倫敦塔橋天空步道與波羅市集美食"
    },
    tags: [
      { type: "city", text: "🌉 City of London" },
      { type: "pace", en: "📸 Iconic Landmarks", zh: "📸 經典地標" }
    ],
    blocks: [
      {
        time: { en: "👑 Morning", zh: "👑 早上" },
        activity: {
          title: { en: "Tower of London & British Crown Jewels", zh: "倫敦塔千年古堡與璀璨皇家珠寶" },
          desc: {
            en: "Hear captivating tales from the Yeoman Warders (Beefeaters) and see the sparkling Cullinan and Koh-i-Noor diamonds in the Jewel House.",
            zh: "由皇家衛士導覽近千年中世紀堡壘歷史，親睹皇家皇冠與重逾數百克拉的璀璨鑽石珠寶。"
          }
        },
        location: { name: "Tower of London", lat: 51.5081, lng: -0.0759 },
        transport: { icon: "🚇", text: { en: "District / Circle Line (12m)", zh: "區域綫/環綫約 12 分鐘" } }
      },
      {
        time: { en: "🧀 Midday", zh: "🧀 中午" },
        activity: {
          title: { en: "Walk Tower Bridge Glass Floor & Borough Market", zh: "漫步倫敦塔橋高空玻璃廊橋與波羅市集美食" },
          desc: {
            en: "Cross Tower Bridge's high-level glass walkway over the Thames, then taste artisan cheeses, oysters, and hot salt beef bagels at Borough Market.",
            zh: "走過塔橋上方透明玻璃廊道俯瞰泰晤士河，再前往倫敦最古老波羅市集品嚐生蠔、松露意粉與熱鹽牛肉貝果。"
          }
        },
        location: { name: "Borough Market", lat: 51.5055, lng: -0.0906 },
        transport: { icon: "🚶", text: { en: "Walk 10m over bridge", zh: "步行過橋約 10 分鐘" } }
      },
      {
        time: { en: "🌇 Evening", zh: "🌇 傍晚" },
        activity: {
          title: { en: "Sky Garden 360° London Sunset Skyline", zh: "空中花園 (Sky Garden) 360 度倫敦天際線日落" },
          desc: {
            en: "Sip sunset cocktails amid lush indoor tropical gardens at the top of 20 Fenchurch Street overlooking The Shard and St Paul's.",
            zh: "在 35 樓全景空中花園綠植環繞中品味雞尾酒，眺望碎片大廈 (The Shard) 與聖保羅大教堂日落全景。"
          }
        },
        location: { name: "Sky Garden", lat: 51.5113, lng: -0.0836 },
        transport: { icon: "🚶", text: { en: "Walk across London Bridge", zh: "步行過倫敦橋" } }
      }
    ]
  },

  /* ════ DAY 4 ════ */
  {
    id: "day-4",
    dayNum: "04",
    date: "Jun 15",
    region: "windsor",
    title: {
      en: "Royal Windsor Castle, St George's Chapel & Eton College",
      zh: "皇家溫莎城堡、聖喬治禮拜堂與伊頓公學小鎮"
    },
    tags: [
      { type: "city", text: "🏰 Royal Windsor" },
      { type: "pace", en: "👑 Royal Day-Trip", zh: "👑 皇室近郊遊" }
    ],
    blocks: [
      {
        time: { en: "🏰 Morning & Midday", zh: "🏰 早午間" },
        activity: {
          title: { en: "Windsor Castle State Apartments & Queen Mary's Dolls' House", zh: "溫莎城堡國事廳、瑪麗皇后玩偶屋與國王居所" },
          desc: {
            en: "Tour the world's oldest and largest occupied castle. Visit St George's Chapel, the resting place of Queen Elizabeth II.",
            zh: "參觀世界現存最古老且仍在使用中的皇室城堡，瞻仰聖喬治禮拜堂與歷代君主安息之地。"
          }
        },
        location: { name: "Windsor Castle", lat: 51.4839, lng: -0.6044 },
        transport: { icon: "🚆", text: { en: "GWR from Paddington (28m)", zh: "帕丁頓出發約 28 分鐘" } }
      },
      {
        time: { en: "🦢 Afternoon", zh: "🦢 下午" },
        activity: {
          title: { en: "Eton College Riverside Walk & Traditional Pub Dinner", zh: "漫步伊頓公學泰晤士河畔與歷史酒館晚餐" },
          desc: {
            en: "Walk across the pedestrian bridge to picturesque Eton village, famed for its prestigious 1440 historic public school.",
            zh: "跨過行人橋來到充滿英國傳統精英氣息的伊頓公學校區與河畔草坪，享用傳統英式烤牛肉晚餐。"
          }
        },
        location: { name: "Eton College", lat: 51.4920, lng: -0.6080 },
        transport: { icon: "🚶", text: { en: "Walk over Thames footbridge", zh: "步行過泰晤士河橋" } }
      }
    ]
  },

  /* ════ DAY 5 ════ */
  {
    id: "day-5",
    dayNum: "05",
    date: "Jun 16",
    region: "bath-cotswolds",
    title: {
      en: "Great Western Rail to Bath Spa — Roman Baths & Castle Combe",
      zh: "大西部鐵道奔向巴斯溫泉 — 古羅馬浴場與科茲窩最美童話村"
    },
    tags: [
      { type: "city", text: "🏛️ Bath & Cotswolds" },
      { type: "pace", en: "🌿 Countryside Charm", zh: "🌿 鄉村童話" }
    ],
    blocks: [
      {
        time: { en: "🚆 Morning", zh: "🚆 早上" },
        activity: {
          title: { en: "GWR High-Speed Train to Bath Spa & Roman Baths Museum", zh: "搭乘大西部高鐵抵達巴斯及參觀古羅馬溫泉浴場" },
          desc: {
            en: "Board 125 mph train to UNESCO Bath. Explore 2,000-year-old steaming natural mineral thermal pools built by the Romans.",
            zh: "從倫敦帕丁頓搭乘高鐵直達巴斯，探索擁有兩千年歷史、至今仍冒著溫熱泉水的古羅馬浴場。"
          }
        },
        location: { name: "Roman Baths, Bath", lat: 51.3811, lng: -2.3598 },
        transport: { icon: "🚆", text: { en: "GWR Train (80m)", zh: "GWR 列車約 80 分鐘" } }
      },
      {
        time: { en: "🏡 Afternoon", zh: "🏡 下午" },
        activity: {
          title: { en: "Castle Combe & Cotswold Honey-Stone Cottage Villages", zh: "探訪科茲窩 Castle Combe 蜜糖色石屋童話村落" },
          desc: {
            en: "Drive or short transfer to Castle Combe, often named England's prettiest village with quaint stone bridges and streams.",
            zh: "前往被譽為英格蘭最美村莊的 Castle Combe，漫步於流水潺潺與保存完好的中世紀石造小屋之間。"
          }
        },
        location: { name: "Castle Combe", lat: 51.4931, lng: -2.2289 },
        transport: { icon: "🚗", text: { en: "Scenic drive (25m)", zh: "鄉村自駕約 25 分鐘" } }
      }
    ]
  },

  /* ════ DAY 6 ════ */
  {
    id: "day-6",
    dayNum: "06",
    date: "Jun 17",
    region: "york",
    title: {
      en: "Medieval York — York Minster & The Shambles Diagon Alley",
      zh: "中世紀古城約克 — 約克大教堂與哈利波特斜角巷原型肉鋪街"
    },
    tags: [
      { type: "city", text: "⛪ York (約克)" },
      { type: "pace", en: "🕯️ Medieval Legends", zh: "🕯️ 中世紀傳奇" }
    ],
    blocks: [
      {
        time: { en: "⛪ Morning & Midday", zh: "⛪ 早午間" },
        activity: {
          title: { en: "York Minster Gothic Cathedral & City Walls Walk", zh: "約克大教堂哥德式建築與羅馬古城牆漫步" },
          desc: {
            en: "Marvel at Northern Europe's largest medieval Gothic cathedral and its Great East Window, then stroll atop 13th-century stone ramparts.",
            zh: "參觀北歐最大哥德式大教堂與壯觀彩繪玻璃，登上保存最完整的 13 世紀中世紀石砌古城牆遠眺。"
          }
        },
        location: { name: "York Minster", lat: 53.9623, lng: -1.0819 },
        transport: { icon: "🚆", text: { en: "CrossCountry Rail", zh: "城際列車抵達" } }
      },
      {
        time: { en: "🧙 Afternoon & Evening", zh: "🧙 下午及晚上" },
        activity: {
          title: { en: "The Shambles Cobblestone Street & Ghost Walk Pub Tour", zh: "漫步中世紀肉鋪街與約克古老酒館品飲" },
          desc: {
            en: "Walk through timber-framed overhanging 14th-century shops that inspired Diagon Alley in Harry Potter. Enjoy local Yorkshire ales.",
            zh: "探索《哈利波特》斜角巷靈感來源的中世紀木造建築街，造訪數百年歷史的約克古老酒館品嚐地道 Yorkshire 啤酒。"
          }
        },
        location: { name: "The Shambles", lat: 53.9596, lng: -1.0803 },
        transport: { icon: "🚶", text: { en: "Walk in historic centre", zh: "古城區步行" } }
      }
    ]
  },

  /* ════ DAY 7 ════ */
  {
    id: "day-7",
    dayNum: "07",
    date: "Jun 18",
    region: "edinburgh",
    title: {
      en: "LNER Coast Express to Edinburgh — Royal Mile Welcome",
      zh: "LNER 東海岸海景高鐵抵達愛丁堡 — 皇家哩大道初相遇"
    },
    tags: [
      { type: "city", text: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Edinburgh (愛丁堡)" },
      { type: "pace", en: "🌊 Scenic Train", zh: "🌊 海景鐵道" }
    ],
    blocks: [
      {
        time: { en: "🚆 Morning", zh: "🚆 早上" },
        activity: {
          title: { en: "LNER Azuma Scenic Coast Rail to Edinburgh Waverley", zh: "搭乘 LNER Azuma 特急列車沿北海壯麗海岸線直達愛丁堡" },
          desc: {
            en: "Enjoy spectacular cliffside views of the North Sea arriving right into Edinburgh Waverley in the shadow of the volcanic castle rock.",
            zh: "坐在舒適高鐵上欣賞英蘇邊界懸崖與北海海天一色，列車直達建於火山岩古堡下方的威瓦利車站。"
          }
        },
        location: { name: "Edinburgh Waverley", lat: 55.9520, lng: -3.1890 },
        transport: { icon: "🚆", text: { en: "LNER High-Speed (2h 20m)", zh: "LNER 高鐵約 2 小時 20 分" } }
      },
      {
        time: { en: "🏰 Afternoon", zh: "🏰 下午" },
        activity: {
          title: { en: "Check-in Old Town & St Giles' Cathedral Stroll", zh: "入住舊城區古雅酒店與聖吉爾斯大教堂漫步" },
          desc: {
            en: "Check into hotel along the Royal Mile. Admire the iconic crown spire of St Giles' Cathedral and historic cobblestone closes.",
            zh: "入住皇家哩大道旁典雅酒店，參拜標誌性皇冠尖頂的聖吉爾斯大教堂，穿梭於幽靜的蘇格蘭歷史石巷 (Closes)。"
          }
        },
        location: { name: "Royal Mile", lat: 55.9497, lng: -3.1909 },
        transport: { icon: "🚶", text: { en: "Walk 5m from station", zh: "車站步行 5 分鐘" } }
      }
    ]
  },

  /* ════ DAY 8 ════ */
  {
    id: "day-8",
    dayNum: "08",
    date: "Jun 19",
    region: "edinburgh",
    title: {
      en: "Edinburgh Castle, Victoria Street & Calton Hill Golden Sunset",
      zh: "愛丁堡古堡皇室之冠、彩虹維多利亞街與卡爾頓山日落"
    },
    tags: [
      { type: "city", text: "👑 Edinburgh Castles" },
      { type: "pace", en: "📸 Panoramic Views", zh: "📸 全景視角" }
    ],
    blocks: [
      {
        time: { en: "🏰 Morning", zh: "🏰 早上" },
        activity: {
          title: { en: "Edinburgh Castle & The Honours of Scotland", zh: "愛丁堡城堡參拜與蘇格蘭命運之石" },
          desc: {
            en: "Perched atop an extinct volcano, explore the Great Hall, St Margaret's Chapel, the Scottish Crown Jewels, and witness the One o'Clock Gun.",
            zh: "登上死火山岩頂端的雄偉城堡，參觀蘇格蘭皇冠寶石、命運之石，並親身感受鳴響百年的下午一點禮炮。"
          }
        },
        location: { name: "Edinburgh Castle", lat: 55.9486, lng: -3.1999 },
        transport: { icon: "🚶", text: { en: "Walk up Royal Mile", zh: "沿皇家大道徒步" } }
      },
      {
        time: { en: "🛍️ Afternoon", zh: "🛍️ 下午" },
        activity: {
          title: { en: "Victoria Street Colorful Boutiques & Whisky Tasting", zh: "維多利亞街彩色店鋪拍照與蘇格蘭單一麥芽威士忌品酩" },
          desc: {
            en: "Photograph the curved multi-colored shopfronts of Victoria Street and taste single malt Scotch at The Scotch Whisky Experience.",
            zh: "在夢幻色彩交織的維多利亞弧形街道打卡拍照，於威士忌體驗中心品鑑蘇格蘭各產區極品單一麥芽威士忌。"
          }
        },
        location: { name: "Victoria Street", lat: 55.9482, lng: -3.1932 },
        transport: { icon: "🚶", text: { en: "Walking distance", zh: "步行可達" } }
      },
      {
        time: { en: "🌇 Evening", zh: "🌇 傍晚" },
        activity: {
          title: { en: "Calton Hill Panoramic Sunset & National Monument", zh: "登上卡爾頓山 (Calton Hill) 俯瞰愛丁堡暮色天際線" },
          desc: {
            en: "A short climb reveals the defining postcard view of Edinburgh Old and New Towns set against the Firth of Forth under pastel skies.",
            zh: "輕鬆步行登頂卡爾頓山，在希臘神殿式國家紀念碑前，將整座愛丁堡新舊城與福斯灣晚霞盡收眼底。"
          }
        },
        location: { name: "Calton Hill", lat: 55.9554, lng: -3.1827 },
        transport: { icon: "🚶", text: { en: "15m gentle uphill stroll", zh: "緩坡步行 15 分鐘" } }
      }
    ]
  },

  /* ════ DAY 9 ════ */
  {
    id: "day-9",
    dayNum: "09",
    date: "Jun 20",
    region: "highlands",
    title: {
      en: "Scottish Highlands Excursion — Loch Lomond & Stirling Castle",
      zh: "蘇格蘭高地秘境一日遊 — 羅夢湖遊船與史特靈傳奇古堡"
    },
    tags: [
      { type: "city", text: "⛰️ Scottish Highlands" },
      { type: "pace", en: "🌲 Wild Nature", zh: "🌲 壯麗自然" }
    ],
    blocks: [
      {
        time: { en: "⛵ Morning", zh: "⛵ 早上" },
        activity: {
          title: { en: "Loch Lomond & The Trossachs National Park Boat Cruise", zh: "羅夢湖與朝聖特羅薩克斯國家公園遊船" },
          desc: {
            en: "Cruise across the largest inland body of water in Great Britain, surrounded by mist-shrouded mountain peaks and heather glens.",
            zh: "搭乘景觀遊船航行於英倫最大的羅夢湖上，感受蘇格蘭高地群山倒影與壯闊自然景致。"
          }
        },
        location: { name: "Loch Lomond", lat: 56.0965, lng: -4.5828 },
        transport: { icon: "🚌", text: { en: "Highland Tour Coach", zh: "高地專屬觀光巴士" } }
      },
      {
        time: { en: "🏰 Afternoon", zh: "🏰 下午" },
        activity: {
          title: { en: "Stirling Castle — Fortress of William Wallace & Robert the Bruce", zh: "史特靈城堡 — 勇敢的心與蘇格蘭獨立傳奇" },
          desc: {
            en: "Explore the strategically positioned royal fortress guarding the Highlands, featuring the restored Renaissance Royal Palace.",
            zh: "探訪扼守高地門戶的史特靈古堡，參觀華麗的文藝復興皇家宮殿與威廉·華萊士紀念地。"
          }
        },
        location: { name: "Stirling Castle", lat: 56.1245, lng: -3.9472 },
        transport: { icon: "🚌", text: { en: "Coach Transfer", zh: "巴士轉乘" } }
      }
    ]
  },

  /* ════ DAY 10 ════ */
  {
    id: "day-10",
    dayNum: "10",
    date: "Jun 21",
    region: "edinburgh-departure",
    title: {
      en: "Arthur's Seat Panorama, Princes St Shopping & Departure",
      zh: "亞瑟王座火山遠眺、王子街英倫購物與圓滿回程"
    },
    tags: [
      { type: "city", text: "✈️ Edinburgh & Departure" },
      { type: "pace", en: "🛍️ Souvenirs & Farewells", zh: "🛍️ 伴手禮與返程" }
    ],
    blocks: [
      {
        time: { en: "🌄 Morning", zh: "🌄 早上" },
        activity: {
          title: { en: "Holyrood Park & Arthur's Seat Morning Hike", zh: "荷里路德公園與亞瑟王座晨光遠足" },
          desc: {
            en: "Breathe in crisp Scottish air with a scenic morning walk around the ancient volcano offering panoramic views of the city.",
            zh: "在清晨登上古老的亞瑟王座火山草甸，遠眺整座愛丁堡城堡天際線與北海碧波。"
          }
        },
        location: { name: "Arthur's Seat", lat: 55.9441, lng: -3.1618 },
        transport: { icon: "🚶", text: { en: "Gentle nature walk", zh: "自然步道健行" } }
      },
      {
        time: { en: "🛍️ Midday", zh: "🛍️ 中午" },
        activity: {
          title: { en: "Princes Street & Scottish Cashmere / Shortbread Souvenirs", zh: "王子街最後衝刺：正宗蘇格蘭羊絨圍巾與牛油餅乾" },
          desc: {
            en: "Pick up world-renowned Scottish cashmere scarves, Walkers shortbread, and bespoke single malt whiskies before departure.",
            zh: "於王子街精品店選購頂級蘇格蘭羊絨 (Cashmere) 圍巾、傳統奶油酥餅與限量威士忌禮盒。"
          }
        },
        location: { name: "Princes Street", lat: 55.9520, lng: -3.1970 },
        transport: { icon: "🚶", text: { en: "Walking distance", zh: "步行可達" } }
      },
      {
        time: { en: "✈️ Afternoon", zh: "✈️ 傍晚" },
        activity: {
          title: { en: "Edinburgh Airport Tram / Express to EDI for Departure", zh: "搭乘愛丁堡機場輕軌直達 EDI 機場順利返程" },
          desc: {
            en: "Take the direct Edinburgh Tram from city center to EDI terminal, complete VAT tax refund, and board your flight home.",
            zh: "搭乘愛丁堡輕軌直達機場航廈，辦理登機手續與免稅退稅，為 10 天精彩絕倫的英倫與蘇格蘭古堡遺產之旅畫上完美句點！"
          }
        },
        location: { name: "Edinburgh Airport (EDI)", lat: 55.9508, lng: -3.3615 },
        transport: { icon: "🚊", text: { en: "Edinburgh Tram (30m)", zh: "機場輕軌約 30 分鐘" } }
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ITINERARY_DATA = ITINERARY_DATA;
}
