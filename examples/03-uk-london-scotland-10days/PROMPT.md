# 🇬🇧 AI Prompt: Great Britain Heritage Tour (London, Bath & Edinburgh 10 Days)

Use this exact prompt with any AI Assistant (Claude, ChatGPT, GitHub Copilot, Antigravity) to recreate or customize the Great Britain 10-day itinerary data files.

---

```markdown
You are an expert travel concierge and front-end data architect. I have forked the **Trip Planner** GitHub Pages template repository and want you to generate the 3 data files for my customized trip:
1. `data/config.js`
2. `data/site-data.js`
3. `data/itinerary-data.js`

Here are the details for my trip:
--------------------------------------------------
- **Destination(s):** United Kingdom (London, Windsor, Bath & Cotswolds, Medieval York, Edinburgh & Scottish Highlands)
- **Trip Dates & Duration:** June 12 to June 21, 2026 (10 Days)
- **Travel Party:** Family of 3 Adults (Lead planner, museum enthusiast, landscape photographer)
- **Country of Residence / Passports:** Hong Kong & United Kingdom (British Citizen, BN(O), HKSAR passports)
- **Driving & Transit:**
  - London Underground & Elizabeth Line via Contactless/Apple Pay (daily fare cap)
  - Intercity LNER Azuma 125 mph high-speed trains (East Coast line)
  - GWR train to Bath Spa + short Cotswolds countryside drive
- **Currency:**
  - Destination Base Currency: GBP (£)
  - Home / Conversion Currencies: HKD (HK$), USD ($), EUR (€), GBP (£)
  - Default Active Target: HKD
- **Languages:**
  - Primary: English (`en`)
  - Secondary: Traditional Chinese (`zh` / 繁體中文)
  - Default view: `en`
- **Style & Palette Theme:**
  - Preset: "midnight-navy" (British Airways Midnight Navy & Warm Gold)
  - Mode: "light" default with Dark Mode toggle
- **Railway & Transit Milestone Board Style:**
  - Style: "london-underground" (🇬🇧 TfL London Tube & Roundel Harry Beck style)
- **Special Interests / Pace:**
  - Balanced cultural, royal heritage, and scenic countryside pace.
  - Highlights: Westminster Abbey & Big Ben, British Museum Rosetta Stone, Fortnum & Mason royal afternoon tea, West End theatre musical, Tower of London Crown Jewels, Borough Market, Windsor Castle, Roman Baths, Castle Combe honey-stone village, York Minster & The Shambles (Harry Potter Diagon Alley), LNER North Sea coast train, Edinburgh Castle, Victoria Street, Calton Hill sunset, Loch Lomond Highlands boat cruise, Arthur's Seat hike.
--------------------------------------------------

### Output Requirements:
Generate complete, valid ES6 JavaScript files defining:
1. `window.TRIP_CONFIG` in `config.js`
2. `window.SITE_DATA` in `site-data.js` (including overview cards, emergency contacts 999/111, tube contactless & museum booking tips, packing checklist, budget breakdown in GBP, hotel search links, and 6-stop London Underground milestone route board)
3. `window.ITINERARY_DATA` in `itinerary-data.js` (complete 10-day itinerary with morning/afternoon/evening schedule blocks, bilingual descriptions, transport times, tags, and exact London/Bath/York/Edinburgh GPS coordinates)
```
