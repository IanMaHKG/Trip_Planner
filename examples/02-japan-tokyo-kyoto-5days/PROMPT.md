# 🇯🇵 AI Prompt: Japan Golden Route (Tokyo, Hakone & Kyoto 5 Days)

Use this exact prompt with any AI Assistant (Claude, ChatGPT, GitHub Copilot, Antigravity) to recreate or customize the Japan 5-day express itinerary.

---

```markdown
You are an expert travel concierge and front-end data architect. I have forked the **Trip Planner** GitHub Pages template repository and want you to generate the 3 data files for my customized trip:
1. `data/config.js`
2. `data/site-data.js`
3. `data/itinerary-data.js`

Here are the details for my trip:
--------------------------------------------------
- **Destination(s):** Japan Golden Route (Tokyo, Hakone Mt. Fuji Onsen, Kyoto, Osaka)
- **Trip Dates & Duration:** November 14 to November 18, 2026 (5 Days)
- **Travel Party:** Couple (2 Travelers)
- **Country of Residence / Passports:** Hong Kong & United Kingdom (HKSAR, BN(O), British Citizen)
- **Driving & Transit:**
  - High-speed Tokaido Shinkansen (Nozomi bullet train)
  - Odakyu Romancecar to Hakone
  - Local subways via Apple Wallet Digital Suica / ICOCA
  - No car rental needed
- **Currency:**
  - Destination Base Currency: JPY (¥)
  - Home / Conversion Currencies: HKD (HK$), USD ($), GBP (£), EUR (€)
  - Default Active Target: HKD
- **Languages:**
  - Primary: English (`en`)
  - Secondary: Traditional Chinese (`zh` / 繁體中文)
  - Default view: `zh`
- **Style & Palette Theme:**
  - Preset: "sakura-rose" (Kyoto Plum, Cherry Blossom Pink & Rose Gold)
  - Mode: "light" default with Dark Mode toggle
- **Railway & Transit Milestone Board Style:**
  - Style: "jr-rail" (🇯🇵 JR Japan Railways Station Sign 駅名標 style)
- **Special Interests / Pace:**
  - Fast-paced autumn foliage (Momiji) highlights & photography.
  - Highlights: Shibuya Sky sunset, Asakusa Sensoji, Hakone ryokan onsen with multi-course Kaiseki dinner, Lake Ashi pirate boat & floating Torii gate, Shinkansen bullet train at 285 km/h, Fushimi Inari 10,000 torii gates, Arashiyama bamboo grove, Kinkakuji Golden Pavilion, Osaka Dotonbori street food (Takoyaki).
--------------------------------------------------

### Output Requirements:
Generate complete, valid ES6 JavaScript files defining:
1. `window.TRIP_CONFIG` in `config.js`
2. `window.SITE_DATA` in `site-data.js` (including overview cards, emergency contacts 110/119/JNTO, digital transit & onsen etiquette tips, packing checklist, budget breakdown in JPY, booking hotel quick-links, and 4-stop JR Rail milestone route board)
3. `window.ITINERARY_DATA` in `itinerary-data.js` (complete 5-day itinerary with morning/afternoon/evening schedule blocks, bilingual descriptions, transport times, tags, and exact Tokyo/Hakone/Kyoto/Osaka GPS coordinates)
```
