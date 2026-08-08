# 🧭 AI Copilot Prompt Template for Trip Planner

> **How to Use:** Copy the prompt below into your preferred AI assistant (such as **Claude, GitHub Copilot, Antigravity, ChatGPT, or Cursor**). Fill in the bracketed variables `[...]` with your trip details. The AI will generate the 3 complete, drop-in data files (`data/config.js`, `data/site-data.js`, `data/itinerary-data.js`) ready to publish on GitHub Pages!

---

```markdown
You are an expert travel concierge and front-end data architect. I have forked the **Trip Planner** GitHub Pages template repository and want you to generate the 3 data files for my customized trip:
1. `data/config.js`
2. `data/site-data.js`
3. `data/itinerary-data.js`

Here are the details for my trip:
--------------------------------------------------
- **Destination(s):** [e.g., Tokyo, Kyoto, Osaka & Hakone, Japan / Iceland Ring Road / Amalfi Coast & Sicily / New Zealand South Island]
- **Trip Dates & Duration:** [e.g., October 12 to October 25, 2026 (14 Days)]
- **Travel Party:** [e.g., Family of 4 (2 Adults, 1 Teenager, 1 Elderly parent) / Couple / Solo / 6 Friends]
- **Country of Residence / Passports:** [e.g., Hong Kong (HKSAR / BN(O)) / United Kingdom / USA / Canada]
- **Driving Requirements:** [e.g., Self-drive road trip with rental MPV / Scenic rail & bullet train only / Mix of trains and rental SUV]
- **Currency:**
  - Destination Base Currency: [e.g., JPY (¥) / EUR (€) / USD ($) / ISK / GBP]
  - Home / Conversion Currencies: [e.g., HKD, USD, GBP, EUR]
- **Languages:**
  - Primary Language: [e.g., English (en)]
  - Secondary Language: [e.g., Traditional Chinese (繁體中文, zh) / Simplified Chinese (zh-cn) / Japanese (ja) / Spanish (es) / None (Single language mode)]
- **Style & Palette Theme:**
  - Choose one of the 7 built-in presets:
    1. "midnight-navy"       (BA Midnight Navy & Gold)
    2. "nordic-aurora"       (Deep Slate & Aurora Teal)
    3. "mediterranean-warm"  (Terracotta, Coral & Deep Sea)
    4. "sakura-rose"         (Plum, Blossom Pink & Rose Gold)
    5. "alpine-emerald"      (Swiss Pine, Glacial Blue & Gold)
    6. "cyber-dark"          (Obsidian & Electric Violet)
    7. "sunset-terracotta"   (Sedona Rust & Ochre)
- **Railway & Transit Milestone Board Style:**
  - Choose one of the 5 iconic railway styles:
    1. "swiss-train"         (🇨🇭 SBB CFF FFS Swiss Federal Railways precision)
    2. "jr-rail"             (🇯🇵 JR Japan Railways Station Sign 駅名標 style)
    3. "london-underground"  (🇬🇧 TfL London Tube & Roundel Harry Beck style)
    4. "hong-kong-mtr"       (🇭🇰 Hong Kong MTR dual-language line style)
    5. "new-york-subway"     (🇺🇸 NYC MTA Subway black band & colored bullets)
- **Special Interests / Pace:** [e.g., Relaxed culinary tour, scenic photography, historic temples, Michelin dining, kid-friendly theme parks, hot spring onsens]
--------------------------------------------------

### Output Requirements:
1. **`data/config.js`**:
   - Master configuration object `TRIP_CONFIG` with `languages`, `trip`, `party`, `origin`, `currency`, `theme`, and `features`.
   - Include sensible `heroBadges`, party member roles, visa summary for the specified passports, and vehicle recommendations if driving.

2. **`data/site-data.js`**:
   - `SITE_DATA.overview.cards`: 4 structured overview cards (Pace, Transport, Weather, Travelers & Entry).
   - `SITE_DATA.overview.routeBoard`: Complete transit line milestone board with stop codes, native names, romaji/english names, coordinates (`lat`, `lng`), and days.
   - `SITE_DATA.tips`: 4 practical, actionable travel advice cards (transit cards, advance bookings, seasonal attire, driving/local customs).
   - `SITE_DATA.packing`: 3 category checklist cards (Clothing, Electronics, Documents) with unique IDs.
   - `SITE_DATA.budget`: Categorized realistic budget line items (Flights, Accommodation, Transport, Food, Sightseeing) with minimum and maximum numerical values in base currency.
   - `SITE_DATA.hotels`: Quick-search leg pills with dates, destinations, and curated stay cards linking to Booking.com with `group_adults` prefilled.
   - `SITE_DATA.transit`: Comparative breakdown of transport options (trains, rental car boot capacity, regional passes).

3. **`data/itinerary-data.js`**:
   - A complete day-by-day array `ITINERARY_DATA` matching the exact number of trip days.
   - Each day must include: `id`, `dayNum`, `date`, `region` (for category filter tabs), `title` (bilingual), `tags` (with icons), `blocks` (Morning, Afternoon, Evening with activity titles, descriptions, curated meal recommendations with icons, and GPS coordinates array for interactive mini-maps), and a helpful `tip`.

Please generate clean, syntactically valid JavaScript code blocks for each file that I can immediately replace in my repository.
```
