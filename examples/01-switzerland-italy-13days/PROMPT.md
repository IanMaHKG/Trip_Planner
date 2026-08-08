# 🏔️ AI Prompt: Switzerland & Northern Italy (13 Days)

Use this exact prompt with any AI Assistant (Claude, ChatGPT, GitHub Copilot, Antigravity) to recreate or customize the Switzerland & Northern Italy 13-day itinerary data files.

---

```markdown
You are an expert travel concierge and front-end data architect. I have forked the **Trip Planner** GitHub Pages template repository and want you to generate the 3 data files for my customized trip:
1. `data/config.js`
2. `data/site-data.js`
3. `data/itinerary-data.js`

Here are the details for my trip:
--------------------------------------------------
- **Destination(s):** Switzerland (Zurich, Lucerne, Interlaken, Zermatt) & Northern Italy (Lake Como, Milan)
- **Trip Dates & Duration:** September 10 to September 22, 2026 (13 Days)
- **Travel Party:** Family of 3 Adults (Ian as lead planner/driver, Parent A, Parent B)
- **Country of Residence / Passports:** United Kingdom & Hong Kong (British Citizen, BN(O), HKSAR, Portuguese passports held)
- **Driving & Transit:**
  - Swiss segment: Panoramic scenic rail (GoldenPass & SBB)
  - Italian Lakes segment: Rental Midsize Station Wagon / SUV (Volkswagen Passat Variant / BMW 3 Touring)
- **Currency:**
  - Destination Base Currency: EUR (€) & CHF
  - Home / Conversion Currencies: USD ($), GBP (£), HKD (HK$), EUR (€)
  - Default Active Target: USD
- **Languages:**
  - Primary: English (`en`)
  - Secondary: Traditional Chinese (`zh` / 繁體中文)
- **Style & Palette Theme:**
  - Preset: "alpine-emerald" (Swiss Pine, Glacial Emerald & Alpine Gold)
  - Mode: "light" default with Dark Mode toggle
- **Railway & Transit Milestone Board Style:**
  - Style: "swiss-train" (🇨🇭 SBB CFF FFS Swiss Federal Railways precision)
- **Special Interests / Pace:**
  - Relaxed alpine pace tailored for parents (step-free cable cars, gentle promenade strolls, panoramic lakeside dining).
  - Highlights: Mt. Pilatus Golden Round Trip, Jungfraujoch Top of Europe, Gornergrat Matterhorn Viewpoint, Lake Como Bellagio ferry cruise, Milan Duomo rooftop.
--------------------------------------------------

### Output Requirements:
Generate complete, valid ES6 JavaScript files defining:
1. `window.TRIP_CONFIG` in `config.js`
2. `window.SITE_DATA` in `site-data.js` (including overview cards, emergency contacts, practical tips, packing checklist with categories, budget breakdown with visual chart data, hotel quick-links, and 6-stop Swiss SBB route milestone board)
3. `window.ITINERARY_DATA` in `itinerary-data.js` (complete 13-day itinerary with morning/afternoon/evening schedule blocks, bilingual titles, transport badges, tags, and MapLibre GPS coordinates)
```
