/**
 * @file itinerary-data.js
 * @description DATA SOURCE — New England Autumn Foliage & NYC 14-Day Roadtrip
 */

const ITINERARY_DATA = [
  /* ════ DAY 1 ════ */
  {
    id: "day-1",
    dayNum: "01",
    date: "Oct 01",
    region: "boston",
    title: {
      en: "Arrive in Boston — Pick Up AWD SUV & Beacon Hill Cobblestones",
      zh: "抵達波士頓 — 提取全驅自駕 SUV 與燈塔山紅磚小巷漫步"
    },
    tags: [
      { type: "city", text: "🏙️ Boston (麻省波士頓)" },
      { type: "pace", en: "🍁 Autumn Arrival", zh: "🍁 愜意初秋" }
    ],
    blocks: [
      {
        time: { en: "🌅 Afternoon", zh: "🌅 下午" },
        activity: {
          title: { en: "Arrive at Boston Logan (BOS) & Pick Up Rental Full-Size SUV", zh: "抵達波士頓洛根機場辦理手續提取大型全驅 SUV" },
          desc: {
            en: "Land at BOS, collect vehicle equipped with EZ-Pass transponder, and check into boutique hotel in historic Back Bay.",
            zh: "順利抵達波士頓，領取配備全輪驅動與 EZ-Pass 電子標籤之豪華 SUV，入住後灣區精品酒店。"
          }
        },
        location: { name: "Boston Logan Airport", lat: 42.3656, lng: -71.0096 },
        transport: { icon: "🚙", text: { en: "Rental Car Shuttle (15m)", zh: "租車接駁車約 15 分鐘" } }
      },
      {
        time: { en: "🌇 Evening", zh: "🌇 傍晚" },
        activity: {
          title: { en: "Acorn Street Beacon Hill & Boston Common Stroll", zh: "全美最上鏡橡子街 (Acorn St) 與波士頓公園秋景" },
          desc: {
            en: "Walk down gas-lit Acorn Street with historic 19th-century brownstones framed by golden autumn leaves and Boston Public Garden.",
            zh: "漫步於煤氣路燈點綴的歷史紅磚石階小巷，在波士頓公共花園天鵝湖畔欣賞初秋落葉美景。"
          }
        },
        location: { name: "Boston Common", lat: 42.3550, lng: -71.0656 },
        transport: { icon: "🚶", text: { en: "Walking in Beacon Hill", zh: "燈塔山歷史街區徒步" } }
      }
    ]
  },

  /* ════ DAY 2 ════ */
  {
    id: "day-2",
    dayNum: "02",
    date: "Oct 02",
    region: "boston-cambridge",
    title: {
      en: "Freedom Trail, Quincy Market Chowder & Harvard Yard",
      zh: "波士頓自由之路、昆西市場熱蛤蜊濃湯與哈佛大學校園"
    },
    tags: [
      { type: "city", text: "🎓 Harvard & Freedom Trail" },
      { type: "pace", en: "📜 Historic Walk", zh: "📜 歷史人文" }
    ],
    blocks: [
      {
        time: { en: "📜 Morning", zh: "📜 早上" },
        activity: {
          title: { en: "The Freedom Trail & Quincy Market Clam Chowder Feast", zh: "沿紅磚自由之路探尋獨立歷史與昆西市場海鮮濃湯" },
          desc: {
            en: "Follow the 2.5-mile red-brick trail connecting Paul Revere's House and Old North Church. Taste creamy New England clam chowder in a sourdough bread bowl.",
            zh: "沿 2.5 英里紅磚古蹟步道探訪美國獨立發源地，於熱鬧的昆西市場享用熱騰騰的天然酸種麵包盅海鮮蛤蜊濃湯。"
          }
        },
        location: { name: "Quincy Market", lat: 42.3600, lng: -71.0547 },
        transport: { icon: "🚶", text: { en: "2.5-mile historic walk", zh: "紅磚步道漫步" } }
      },
      {
        time: { en: "🎓 Afternoon", zh: "🎓 下午" },
        activity: {
          title: { en: "Harvard University Yard & Charles River Autumn Reflections", zh: "劍橋哈佛大學歷史紅磚庭園與查爾斯河秋楓倒影" },
          desc: {
            en: "Cross the Charles River to Harvard Yard, touch the bronze shoe of John Harvard statue for good luck, and stroll historic Cambridge.",
            zh: "跨越查爾斯河參觀頂尖學府哈佛大學校園，觸摸約翰·哈佛銅像鞋尖祈福，漫步充滿書香氣息的劍橋小鎮。"
          }
        },
        location: { name: "Harvard Yard", lat: 42.3744, lng: -71.1172 },
        transport: { icon: "🚙", text: { en: "Short drive (15m)", zh: "短途車程 15 分鐘" } }
      }
    ]
  },

  /* ════ DAY 3 ════ */
  {
    id: "day-3",
    dayNum: "03",
    date: "Oct 03",
    region: "new-hampshire",
    title: {
      en: "Drive North to New Hampshire — Lake Winnipesaukee to White Mountains",
      zh: "自駕北上新罕布什爾 — 溫尼珀索基湖與白山國家森林"
    },
    tags: [
      { type: "city", text: "⛰️ White Mountains (NH)" },
      { type: "pace", en: "🚗 Scenic Drive", zh: "🚗 壯麗自駕" }
    ],
    blocks: [
      {
        time: { en: "🚙 Morning", zh: "🚙 早上" },
        activity: {
          title: { en: "Scenic Drive Past Lake Winnipesaukee into North Conway", zh: "沿溫尼珀索基湖畔自駕進入北康威群山門戶" },
          desc: {
            en: "Drive north along Route 16 through picturesque lakeside towns as foliage transitions into brilliant fiery oranges and reds.",
            zh: "駕車向北駛入新罕布什爾州，沿途湖泊倒映著漫山遍野金黃與緋紅交織的秋葉。"
          }
        },
        location: { name: "Lake Winnipesaukee", lat: 43.6062, lng: -71.3411 },
        transport: { icon: "🚙", text: { en: "Scenic Highway (2h 15m)", zh: "景觀公路約 2 小時 15 分" } }
      },
      {
        time: { en: "🏡 Evening", zh: "🏡 晚上" },
        activity: {
          title: { en: "Check into Historic Mountain Lodge & Hearthside Dinner", zh: "入住白山景觀渡假木屋酒店與爐火溫馨晚餐" },
          desc: {
            en: "Unwind at a cozy New England mountain resort surrounded by vibrant maple forest, enjoying local craft beer by the open stone fireplace.",
            zh: "入住四周被楓林環抱的傳統木屋渡假村，在溫暖壁爐旁品嚐新罕布什爾地道精釀啤酒與爐烤牛扒。"
          }
        },
        location: { name: "North Conway", lat: 44.0537, lng: -71.1284 },
        transport: { icon: "🚙", text: { en: "Arrival", zh: "抵達渡假村" } }
      }
    ]
  },

  /* ════ DAY 4 ════ */
  {
    id: "day-4",
    dayNum: "04",
    date: "Oct 04",
    region: "kancamagus",
    title: {
      en: "Kancamagus Scenic Byway Peak Foliage & Flume Gorge",
      zh: "全美最美秋季公路 Kancamagus Highway 與 Flume Gorge 峽谷"
    },
    tags: [
      { type: "city", text: "🍁 The Kanc & Franconia" },
      { type: "pace", en: "📸 Peak Foliage", zh: "📸 紅葉巔峰" }
    ],
    blocks: [
      {
        time: { en: "🍁 Morning & Midday", zh: "🍁 早午間" },
        activity: {
          title: { en: "Drive Route 112 (The Kancamagus Highway) & Swift River", zh: "自駕 112 號堪卡馬格斯景觀公路與激流瀑布" },
          desc: {
            en: "Traverse 34 miles of protected National Forest at peak autumn foliage. Stop at Sugar Hill Overlook, CL Graham Solar Vista, and Rocky Gorge.",
            zh: "穿行於無廣告看板、被評為全美第一賞楓公路的 34 英里山道，於多個制高點俯瞰漫山赤紅壯麗雲海。"
          }
        },
        location: { name: "Kancamagus Highway", lat: 44.0200, lng: -71.5000 },
        transport: { icon: "🚙", text: { en: "National Scenic Byway", zh: "國家景觀公路自駕" } }
      },
      {
        time: { en: "🌲 Afternoon", zh: "🌲 下午" },
        activity: {
          title: { en: "Flume Gorge Boardwalk & Historic Covered Bridges", zh: "Franconia Notch 州立公園 Flume Gorge 木棧道與百年廊橋" },
          desc: {
            en: "Walk through a breathtaking 800-foot natural granite gorge framed by waterfalls, moss-covered walls, and red historic wooden covered bridges.",
            zh: "步行於 800 英尺高的天然花崗岩峽谷木棧道，穿過經典的紅色木造「吻橋」(Covered Bridge) 拍攝瀑布絕景。"
          }
        },
        location: { name: "Flume Gorge", lat: 44.0984, lng: -71.6811 },
        transport: { icon: "🚶", text: { en: "2-mile scenic loop trail", zh: "2英里環形步道" } }
      }
    ]
  },

  /* ════ DAY 5 ════ */
  {
    id: "day-5",
    dayNum: "05",
    date: "Oct 05",
    region: "vermont",
    title: {
      en: "Cross into Vermont — Cold Hollow Cider Mill & Stowe Village",
      zh: "駛入佛蒙特州 — 漫山楓糖蘋果酒作坊與童話斯托小鎮"
    },
    tags: [
      { type: "city", text: "🥞 Stowe & Green Mts (VT)" },
      { type: "pace", en: "🌿 Artisan Countryside", zh: "🌿 鄉村手作" }
    ],
    blocks: [
      {
        time: { en: "🍩 Morning", zh: "🍩 早上" },
        activity: {
          title: { en: "Cold Hollow Cider Mill Fresh Hot Cider Donuts & Pure Maple Syrup", zh: "Cold Hollow 磨坊品嚐現炸肉桂蘋果酒冬甩與頂級純楓糖漿" },
          desc: {
            en: "Watch fresh apple pressing in action, taste world-famous hot apple cider donuts, and sample Grade A amber pure Vermont maple syrup.",
            zh: "親眼參觀古老木壓榨機榨取新鮮蘋果原汁，品嚐外脆內軟熱騰騰的蘋果酒冬甩與純正天然楓糖。"
          }
        },
        location: { name: "Cold Hollow Cider Mill", lat: 44.3875, lng: -72.7483 },
        transport: { icon: "🚙", text: { en: "Cross-State Drive (1h 45m)", zh: "跨州車程約 1 小時 45 分" } }
      },
      {
        time: { en: "⛪ Afternoon", zh: "⛪ 下午" },
        activity: {
          title: { en: "Stowe Village White Church Spire & Smugglers' Notch Pass", zh: "斯托標誌性白教堂尖頂拍照與走私者峽谷自駕" },
          desc: {
            en: "Photograph Stowe's iconic Community Church spire rising above autumn foliage, then navigate the winding boulder-strewn Smugglers' Notch pass.",
            zh: "拍攝佛蒙特明信片代表作——純白教堂尖頂與背後萬紫千紅楓林，隨後駕車挑戰曲折幽深的走私者峽谷。"
          }
        },
        location: { name: "Stowe Village", lat: 44.4654, lng: -72.6874 },
        transport: { icon: "🚙", text: { en: "Scenic mountain pass", zh: "高山峽谷自駕" } }
      }
    ]
  },

  /* ════ DAY 6 ════ */
  {
    id: "day-6",
    dayNum: "06",
    date: "Oct 06",
    region: "vermont-woodstock",
    title: {
      en: "Woodstock Vermont, Billings Farm & Middle Covered Bridge",
      zh: "全美最迷人鄉村伍德斯托克 — 百年農場與木造廊橋"
    },
    tags: [
      { type: "city", text: "🏡 Woodstock (VT)" },
      { type: "pace", en: "🧀 Country Charm", zh: "🧀 典雅田園" }
    ],
    blocks: [
      {
        time: { en: "🧀 Morning", zh: "🧀 早上" },
        activity: {
          title: { en: "Billings Farm & Museum Artisan Cheddar Cheese Tasting", zh: "Billings 百年歷史農場與佛蒙特香濃切達芝士品嚐" },
          desc: {
            en: "Tour an active 1871 Jersey dairy farm and taste world-championship aged Vermont white cheddar cheeses.",
            zh: "參觀建於 1871 年的歷史高山牧場，親手品嚐屢獲世界金獎的佛蒙特熟成白切達芝士。"
          }
        },
        location: { name: "Billings Farm", lat: 43.6295, lng: -72.5159 },
        transport: { icon: "🚙", text: { en: "Scenic Route 100 (1h 15m)", zh: "100號景觀公路約 1 小時 15 分" } }
      },
      {
        time: { en: "🌉 Afternoon", zh: "🌉 下午" },
        activity: {
          title: { en: "Middle Covered Bridge & Woodstock Historic Green Stroll", zh: "漫步伍德斯托克中央木廊橋與歷史綠地街區" },
          desc: {
            en: "Stroll past Federal-style heritage mansions and independent bookstores in what is often voted America's prettiest small town.",
            zh: "漫步於被評為全美最美小鎮的中央綠地，欣賞經典聯邦風格宅邸與橫跨清澈溪流的木製廊橋。"
          }
        },
        location: { name: "Woodstock VT", lat: 43.6242, lng: -72.5181 },
        transport: { icon: "🚶", text: { en: "Village stroll", zh: "小鎮悠閒漫步" } }
      }
    ]
  },

  /* ════ DAY 7 ════ */
  {
    id: "day-7",
    dayNum: "07",
    date: "Oct 07",
    region: "maine-acadia",
    title: {
      en: "Drive to Coastal Maine — Welcome Whole Steamed Lobster Feast",
      zh: "駛向緬因海岸巴港 — 傳統大鍋現蒸活龍蝦盛宴迎賓"
    },
    tags: [
      { type: "city", text: "🦞 Bar Harbor & Acadia" },
      { type: "pace", en: "🌊 Ocean Coast", zh: "🌊 海洋國家公園" }
    ],
    blocks: [
      {
        time: { en: "🚙 Morning & Midday", zh: "🚙 早午間" },
        activity: {
          title: { en: "Drive East to Mount Desert Island & Bar Harbor Gateway", zh: "橫貫新英格蘭駛抵沙漠山島與巴港海濱" },
          desc: {
            en: "Enjoy the scenic drive across Maine woods arriving onto Mount Desert Island, home of magnificent Acadia National Park.",
            zh: "驅車穿越緬因州壯麗森林，越過跨海大橋抵達阿卡迪亞國家公園所在的沙漠山島 (Mount Desert Island)。"
          }
        },
        location: { name: "Bar Harbor Gateway", lat: 44.3876, lng: -68.2039 },
        transport: { icon: "🚙", text: { en: "Highway drive (3h 30m)", zh: "公路自駕約 3 小時 30 分" } }
      },
      {
        time: { en: "🦞 Evening", zh: "🦞 晚上" },
        activity: {
          title: { en: "Authentic Maine Lobster Pound Traditional Ocean Feast", zh: "海邊正宗木棚大鍋現蒸緬因活龍蝦大餐" },
          desc: {
            en: "Feast on freshly harvested 2-lb whole Maine lobsters served with sweet drawn butter, steamed clams, corn on the cob, and blueberry pie.",
            zh: "品嚐剛從大西洋捕撈的兩磅重整隻現蒸鮮甜龍蝦，佐以熱融融黃油、蒸鮮蛤蜊、甜粟米及緬因野生藍莓派。"
          }
        },
        location: { name: "Trenton Bridge Lobster Pound", lat: 44.4373, lng: -68.3683 },
        transport: { icon: "🚙", text: { en: "Waterfront dining", zh: "海旁餐廳" } }
      }
    ]
  },

  /* ════ DAY 8 ════ */
  {
    id: "day-8",
    dayNum: "08",
    date: "Oct 08",
    region: "acadia-national-park",
    title: {
      en: "Acadia National Park — Cadillac Mtn Sunrise & Thunder Hole",
      zh: "阿卡迪亞國家公園 — 凱迪拉克山全美第一道日出與雷鳴洞"
    },
    tags: [
      { type: "city", text: "🌅 Cadillac Mtn Sunrise" },
      { type: "pace", en: "🌲 National Park Adventure", zh: "🌲 國家公園奇景" }
    ],
    blocks: [
      {
        time: { en: "🌅 Dawn (05:45)", zh: "🌅 清晨曙光" },
        activity: {
          title: { en: "Cadillac Mountain Sunrise: First Light in the Continental USA", zh: "凱迪拉克山頂迎接美國本土清晨第一縷陽光" },
          desc: {
            en: "Drive up the summit at 1,530 ft with timed reservation to watch the golden sunrise illuminate the Atlantic Ocean and autumn-colored archipelago.",
            zh: "憑預約證登上海拔 1,530 英尺頂峰，在金光破曉之際俯瞰大西洋群島被晨曦與秋彩染紅的震撼全景。"
          }
        },
        location: { name: "Cadillac Mountain", lat: 44.3526, lng: -68.2251 },
        transport: { icon: "🚙", text: { en: "Timed vehicle permit drive", zh: "預約車輛自駕上山" } }
      },
      {
        time: { en: "🌊 Afternoon", zh: "🌊 下午" },
        activity: {
          title: { en: "Park Loop Road: Thunder Hole & Ocean Path Granite Cliffs", zh: "景觀環園路自駕：雷鳴洞海浪與 Ocean Path 懸崖步道" },
          desc: {
            en: "Drive the iconic 27-mile Park Loop Road. Feel crashing ocean waves boom through the granite cavern at Thunder Hole.",
            zh: "自駕 27 英里公園景觀環路，沿著粉紅花崗岩懸崖步道前進，感受海浪拍擊雷鳴洞岩穴時激起數丈巨浪的壯觀氣勢。"
          }
        },
        location: { name: "Thunder Hole Acadia", lat: 44.3214, lng: -68.1887 },
        transport: { icon: "🚙", text: { en: "Park Loop Road", zh: "環園景觀公路" } }
      }
    ]
  },

  /* ════ DAY 9 ════ */
  {
    id: "day-9",
    dayNum: "09",
    date: "Oct 09",
    region: "acadia-jordan-pond",
    title: {
      en: "Jordan Pond Popovers & Bass Harbor Head Lighthouse Sunset",
      zh: "佐敦池傳統熱泡芙下午茶與巴斯港燈塔夕陽剪影"
    },
    tags: [
      { type: "city", text: "💡 Historic Lighthouses" },
      { type: "pace", en: "📸 Iconic Postcards", zh: "📸 明信片絕景" }
    ],
    blocks: [
      {
        time: { en: "🫖 Midday", zh: "🫖 中午" },
        activity: {
          title: { en: "Jordan Pond House Traditional Popovers & Tea by the Lake", zh: "Jordan Pond 湖畔露天草坪享用百年傳統現烤 Popover 泡芙" },
          desc: {
            en: "Savor steaming-hot puffy popovers with strawberry jam and butter on pristine lawns overlooking the iconic twin glacial peaks 'The Bubbles'.",
            zh: "坐在清澈見底的冰川湖畔草坪，享用自 1890 年代傳承至今的香脆熱泡芙配士多啤梨果醬與香濃紅茶。"
          }
        },
        location: { name: "Jordan Pond House", lat: 44.3218, lng: -68.2536 },
        transport: { icon: "🚙", text: { en: "Park drive", zh: "園區自駕" } }
      },
      {
        time: { en: "💡 Sunset", zh: "💡 傍晚日落" },
        activity: {
          title: { en: "Bass Harbor Head Light Cliffside Golden Hour Sunset", zh: "巴斯港燈塔 (Bass Harbor Head Light) 懸崖夕陽拍照" },
          desc: {
            en: "Climb down the granite ledge path to capture the most iconic, photographed lighthouse in Maine as crimson skies reflect off sea spray.",
            zh: "沿花崗岩階梯下行至海蝕礁石上，在落日餘暉映照下捕捉緬因州最負盛名、印在國家公園年票上的燈塔剪影。"
          }
        },
        location: { name: "Bass Harbor Head Light", lat: 44.2219, lng: -68.3372 },
        transport: { icon: "🚙", text: { en: "Short drive to Quiet Side (25m)", zh: "西岸車程約 25 分鐘" } }
      }
    ]
  },

  /* ════ DAY 10 ════ */
  {
    id: "day-10",
    dayNum: "10",
    date: "Oct 10",
    region: "maine-portland",
    title: {
      en: "Camden Schooners, Portland Head Light & Eventide Oyster Feast",
      zh: "卡姆登雙桅帆船海港、波特蘭燈塔與 Eventide 頂級生蠔"
    },
    tags: [
      { type: "city", text: "⚓ Coastal Maine & Portland" },
      { type: "pace", en: "🦪 Gourmet Seafood", zh: "🦪 生蠔海鮮" }
    ],
    blocks: [
      {
        time: { en: "💡 Afternoon", zh: "💡 下午" },
        activity: {
          title: { en: "Portland Head Light at Fort Williams Park (Cape Elizabeth)", zh: "參觀全美最古老波特蘭頭燈塔 (Portland Head Light)" },
          desc: {
            en: "Commissioned by George Washington in 1791, admire this pristine white beacon standing proudly against the crashing waves of the Atlantic.",
            zh: "參觀由喬治·華盛頓總統於 1791 年親自批准建立的古老白色燈塔，遠眺壯闊大西洋波濤洶湧。"
          }
        },
        location: { name: "Portland Head Light", lat: 43.6231, lng: -70.2079 },
        transport: { icon: "🚙", text: { en: "Coastal Route 1 (2h 45m)", zh: "1號海岸公路約 2 小時 45 分" } }
      },
      {
        time: { en: "🦪 Evening", zh: "🦪 晚上" },
        activity: {
          title: { en: "Eventide Oyster Co Brown Butter Lobster Roll & Old Port Stroll", zh: "Eventide 焦化奶油熱龍蝦卷與老港區鵝卵石步道" },
          desc: {
            en: "Taste James Beard award-winning brown butter steamed bao lobster roll and dozen freshly shucked Maine oysters in Portland Old Port.",
            zh: "於波特蘭老港區品嚐獲得詹姆斯·比爾德美食大獎的焦化牛油刈包龍蝦卷與極品現開緬因生蠔。"
          }
        },
        location: { name: "Portland Old Port", lat: 43.6577, lng: -70.2520 },
        transport: { icon: "🚶", text: { en: "Walk in Old Port", zh: "老港區步行" } }
      }
    ]
  },

  /* ════ DAY 11 ════ */
  {
    id: "day-11",
    dayNum: "11",
    date: "Oct 11",
    region: "newport-rhode-island",
    title: {
      en: "Newport Rhode Island — Gilded Age The Breakers & Cliff Walk",
      zh: "羅德島紐波特 — 鍍金時代范德比爾特 The Breakers 豪宅與 Cliff Walk 峭壁步道"
    },
    tags: [
      { type: "city", text: "👑 Newport Mansions (RI)" },
      { type: "pace", en: "🏛️ Gilded Age Opulence", zh: "🏛️ 奢華莊園" }
    ],
    blocks: [
      {
        time: { en: "👑 Morning & Midday", zh: "👑 早午間" },
        activity: {
          title: { en: "The Breakers: Vanderbilt Gilded Age 70-Room Oceanfront Palace", zh: "參觀范德比爾特家族 70 房間文藝復興海景宮殿 The Breakers" },
          desc: {
            en: "Step into America's most opulent Gilded Age summer cottage, built with Italian marble, 22-karat gold leaf, and panoramic ocean terraces.",
            zh: "走進鍍金時代全美最富豪家族的夏日避暑莊園，驚嘆於義大利進口大理石、22K 真金箔穹頂與無敵大西洋海景。"
          }
        },
        location: { name: "The Breakers Newport", lat: 41.4698, lng: -71.2983 },
        transport: { icon: "🚙", text: { en: "Drive south (2h 30m)", zh: "南下車程約 2 小時 30 分" } }
      },
      {
        time: { en: "🌊 Afternoon", zh: "🌊 下午" },
        activity: {
          title: { en: "Newport Cliff Walk 3.5-Mile Ocean & Mansion Trail", zh: "紐波特 Cliff Walk 3.5 英里海邊峭壁豪宅步道" },
          desc: {
            en: "Walk along the National Recreation Trail combining the natural beauty of the rocky shoreline with architectural splendor.",
            zh: "漫步於左手邊是拍岸驚濤、右手邊是宏偉世紀豪宅莊園的國家級景觀步道。"
          }
        },
        location: { name: "Newport Cliff Walk", lat: 41.4740, lng: -71.2990 },
        transport: { icon: "🚶", text: { en: "Scenic seaside hike", zh: "海濱步道健行" } }
      }
    ]
  },

  /* ════ DAY 12 ════ */
  {
    id: "day-12",
    dayNum: "12",
    date: "Oct 12",
    region: "nyc-manhattan",
    title: {
      en: "Drive to New York City — Return SUV & Broadway Musical Night",
      zh: "南下抵達紐約曼哈頓 — 順利交還租車與時代廣場百老匯歌劇之夜"
    },
    tags: [
      { type: "city", text: "🗽 New York City (紐約)" },
      { type: "pace", en: "🎭 Broadway & Lights", zh: "🎭 歌劇都會" }
    ],
    blocks: [
      {
        time: { en: "🚆 Afternoon", zh: "🚆 下午" },
        activity: {
          title: { en: "Return SUV at Airport / Station & Subway into Manhattan", zh: "順利交還租用車輛乘搭鐵路直抵曼哈頓中城酒店" },
          desc: {
            en: "Return car seamlessly avoiding Manhattan traffic. Tap OMNY onto subway/train into central hotel in Midtown near Central Park.",
            zh: "於紐約市郊或機場租車中心還車，使用感應支付搭乘地鐵輕鬆直達曼哈頓中城酒店入住。"
          }
        },
        location: { name: "Grand Central Terminal", lat: 40.7527, lng: -73.9772 },
        transport: { icon: "🚇", text: { en: "Subway OMNY (20m)", zh: "地鐵感應支付約 20 分鐘" } }
      },
      {
        time: { en: "🎭 Evening", zh: "🎭 晚上" },
        activity: {
          title: { en: "Times Square Neon Glitz & Broadway Musical (Wicked / Hamilton)", zh: "時代廣場霓虹璀璨與百老匯殿堂音樂劇《女巫前傳》" },
          desc: {
            en: "Immerse in the pulsating heart of Broadway. Watch an acclaimed musical and enjoy late-night NYC style pizza by the slice.",
            zh: "站在世界十字路口時代廣場感受霓虹燈海，走進百老匯經典劇院觀賞頂級名劇，品嚐熱氣騰騰的紐約薄餅。"
          }
        },
        location: { name: "Times Square", lat: 40.7580, lng: -73.9855 },
        transport: { icon: "🚶", text: { en: "Theatre District Walk", zh: "劇院區步行" } }
      }
    ]
  },

  /* ════ DAY 13 ════ */
  {
    id: "day-13",
    dayNum: "13",
    date: "Oct 13",
    region: "nyc-central-park",
    title: {
      en: "Central Park Golden Elm Trees, The Met & Summit One Sunset",
      zh: "中央公園金黃林蔭步道、大都會藝術博物館與 Summit 鏡面日落"
    },
    tags: [
      { type: "city", text: "🎨 The Met & Central Park" },
      { type: "pace", en: "📸 NYC Golden Hour", zh: "📸 頂級藝術與天際線" }
    ],
    blocks: [
      {
        time: { en: "🍁 Morning", zh: "🍁 早上" },
        activity: {
          title: { en: "Central Park The Mall, Bethesda Terrace & Bow Bridge", zh: "中央公園林蔭大道 (The Mall)、畢士大噴泉與弓橋秋色" },
          desc: {
            en: "Walk beneath a towering golden canopy of American elms, watching rowboats on the lake against Manhattan skyscraper backdrops.",
            zh: "漫步在被參天美洲榆樹染成金黃色的林蔭大道上，在經典弓橋前拍攝摩天大樓與秋葉倒影。"
          }
        },
        location: { name: "Central Park Bow Bridge", lat: 40.7758, lng: -73.9716 },
        transport: { icon: "🚶", text: { en: "Stroll through Central Park", zh: "中央公園漫步" } }
      },
      {
        time: { en: "🏛️ Afternoon", zh: "🏛️ 下午" },
        activity: {
          title: { en: "The Metropolitan Museum of Art (The Met) Egyptian & European Masters", zh: "大都會藝術博物館 (The Met) 埃及神廟與文藝復興名畫" },
          desc: {
            en: "Explore the ancient Temple of Dendur basking in natural light, followed by Monet, Van Gogh, and Rembrandt masterpieces.",
            zh: "參觀壯觀的丹鐸神廟玻璃展廳，欣賞莫奈、梵高與倫勃朗傳世藝術珍品。"
          }
        },
        location: { name: "The Metropolitan Museum of Art", lat: 40.7794, lng: -73.9632 },
        transport: { icon: "🚶", text: { en: "Direct access from park", zh: "公園直達" } }
      },
      {
        time: { en: "🌇 Sunset", zh: "🌇 傍晚" },
        activity: {
          title: { en: "SUMMIT One Vanderbilt Mirror Immersion 360° Sunset", zh: "SUMMIT 范德堡一號高空全鏡面沈浸式日落觀景台" },
          desc: {
            en: "Step into infinite reflective glass chambers 1,000 ft above Manhattan with front-row views of the Empire State Building and Chrysler Building.",
            zh: "登上 1,000 英尺高空全玻璃鏡面空間，在夕陽與燈光倒影中將帝國大廈與克萊斯勒大廈盡收眼底。"
          }
        },
        location: { name: "SUMMIT One Vanderbilt", lat: 40.7529, lng: -73.9786 },
        transport: { icon: "🚇", text: { en: "Subway 4/5/6 Line (8m)", zh: "地鐵 4/5/6 綫約 8 分鐘" } }
      }
    ]
  },

  /* ════ DAY 14 ════ */
  {
    id: "day-14",
    dayNum: "14",
    date: "Oct 14",
    region: "nyc-departure",
    title: {
      en: "High Line, Brooklyn Bridge Skyline & JFK Departure",
      zh: "高架花園步道、布魯克林大橋天際線與甘迺迪機場返程"
    },
    tags: [
      { type: "city", text: "🌉 Brooklyn Bridge & JFK" },
      { type: "pace", en: "🛍️ Grand Finale", zh: "🛍️ 圓滿收官" }
    ],
    blocks: [
      {
        time: { en: "🌿 Morning", zh: "🌿 早上" },
        activity: {
          title: { en: "The High Line Elevated Park & Chelsea Market Bites", zh: "曼哈頓高架鐵道空中花園步道與雀兒喜市場小食" },
          desc: {
            en: "Stroll along repurposed historic rail line adorned with wildflowers, ending at Chelsea Market for warm brownies and hot cider.",
            zh: "漫步於由廢棄高架鐵路改建的綠植步道，走進雀兒喜市場品嚐現烤布朗尼與濃郁咖啡。"
          }
        },
        location: { name: "The High Line", lat: 40.7480, lng: -74.0048 },
        transport: { icon: "🚶", text: { en: "Elevated park walk", zh: "高架公園步行" } }
      },
      {
        time: { en: "🌉 Midday", zh: "🌉 中午" },
        activity: {
          title: { en: "Walk the Historic Wooden Brooklyn Bridge & DUMBO Photo", zh: "漫步布魯克林大橋木棧道與 DUMBO 曼哈頓大橋經典機位" },
          desc: {
            en: "Walk across the 1883 gothic suspension bridge, taking the iconic photo framed between red-brick DUMBO warehouses.",
            zh: "走過 1883 年落成的哥德式雙塔懸索橋，於 DUMBO 經典紅磚倉庫巷弄拍攝曼哈頓大橋與帝國大廈絕美合影。"
          }
        },
        location: { name: "Brooklyn Bridge DUMBO", lat: 40.7033, lng: -73.9890 },
        transport: { icon: "🚇", text: { en: "Subway A/C to High St", zh: "地鐵 A/C 綫直達" } }
      },
      {
        time: { en: "✈️ Afternoon / Evening", zh: "✈️ 傍晚" },
        activity: {
          title: { en: "LIRR / AirTrain to JFK International Airport Departure", zh: "搭乘長島鐵路及 AirTrain 直達紐約 JFK 機場順利返程" },
          desc: {
            en: "Take the fast Long Island Rail Road to Jamaica and transfer to JFK AirTrain terminal for departure after 14 days of unforgettable autumn roadtripping!",
            zh: "搭乘 LIRR 特快列車直通牙買加站轉乘 JFK 機場輕軌，圓滿結束涵蓋新英格蘭秋楓、山嵐、龍蝦與紐約曼哈頓的 14 天美東壯遊！"
          }
        },
        location: { name: "JFK International Airport", lat: 40.6413, lng: -73.7781 },
        transport: { icon: "🚆", text: { en: "LIRR + AirTrain (35m)", zh: "特快鐵路約 35 分鐘" } }
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ITINERARY_DATA = ITINERARY_DATA;
}
