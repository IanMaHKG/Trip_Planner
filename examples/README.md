# 📂 Trip Planner Example Plans Library

This directory contains **5 complete, production-ready example trip plans** covering various destinations, trip durations, traveler profiles, currencies, themes, and railway styles.

Each sub-folder contains:
1. `config.js` — Master configuration, trip profile, theme, currencies, and party details.
2. `site-data.js` — Overview cards, emergency numbers, practical tips, transit milestone route board, GPS map pins, packing checklist, budget charts, and hotel links.
3. `itinerary-data.js` — Complete day-by-day itinerary schedule with bilingual activity cards, transportation badges, tags, and timeline nodes.
4. `PROMPT.md` — The exact AI copilot prompt used to generate the plan.

---

## 🗺️ The 5 Example Plans

Every example includes a standalone `index.html` file so anyone browsing your GitHub Pages can view each plan directly in their browser without changing any code:

| # | Live Preview | Destination | Duration | Theme | Railway Style | Currency | AI Prompt |
|---|---|---|---|---|---|---|---|
| **1** | [🇨🇭 🇮🇹 **Launch Switzerland & Italy**](./01-switzerland-italy-13days/index.html) | Switzerland & Northern Italy | 13 Days | `alpine-emerald` | `swiss-train` (SBB CFF FFS) | EUR (€) / CHF | [`PROMPT.md`](./01-switzerland-italy-13days/PROMPT.md) |
| **2** | [🇯🇵 **Launch Japan 5-Day**](./02-japan-tokyo-kyoto-5days/index.html) | Japan (Tokyo, Hakone, Kyoto, Osaka) | 5 Days | `sakura-rose` | `jr-rail` (JR Shinkansen) | JPY (¥) | [`PROMPT.md`](./02-japan-tokyo-kyoto-5days/PROMPT.md) |
| **3** | [🇬🇧 **Launch UK 10-Day**](./03-uk-london-scotland-10days/index.html) | UK (London, Bath, York, Edinburgh) | 10 Days | `midnight-navy` | `london-underground` (TfL Tube) | GBP (£) | [`PROMPT.md`](./03-uk-london-scotland-10days/PROMPT.md) |
| **4** | [🇭🇰 **Launch Hong Kong 7-Day**](./04-hong-kong-7days/index.html) | Hong Kong (Central, Lantau, Sai Kung) | 7 Days | `cyber-dark` | `hong-kong-mtr` (MTR Line) | HKD (HK$) | [`PROMPT.md`](./04-hong-kong-7days/PROMPT.md) |
| **5** | [🇺🇸 **Launch New England 14-Day**](./05-us-new-england-14days/index.html) | USA (New England Autumn & NYC) | 14 Days | `sunset-terracotta` | `new-york-subway` (MTA Subway) | USD ($) | [`PROMPT.md`](./05-us-new-england-14days/PROMPT.md) |

---

## ⚡ How to Switch to an Example Plan

To preview or use any example plan in your live `index.html`:

### Option A: Via Command Line / Terminal
Simply copy the 3 data files from your desired example into the `data/` folder:

```bash
# Example: Switch to the Japan 5-Day Express Plan
cp examples/02-japan-tokyo-kyoto-5days/*.js data/

# Example: Switch to the UK 10-Day Heritage Tour
cp examples/03-uk-london-scotland-10days/*.js data/

# Example: Switch to the Hong Kong 7-Day Explorer
cp examples/04-hong-kong-7days/*.js data/

# Example: Switch to the US New England 14-Day Roadtrip
cp examples/05-us-new-england-14days/*.js data/

# Example: Switch back to the Switzerland & Italy 13-Day Plan
cp examples/01-switzerland-italy-13days/*.js data/
```

### Option B: Via File Explorer
1. Open the example folder (e.g. `examples/02-japan-tokyo-kyoto-5days/`).
2. Copy `config.js`, `site-data.js`, and `itinerary-data.js`.
3. Paste and replace the files in the `data/` folder.
4. Refresh your browser on `index.html`!

---

## 🤖 Generating Your Own Trip with AI
Open [`prompts/trip-planner-prompt.md`](../prompts/trip-planner-prompt.md) or any of the `PROMPT.md` files inside the example folders, customize your trip details, and paste into Claude, ChatGPT, GitHub Copilot, or Antigravity!
