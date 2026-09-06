# 🧭 Trip Planner — Universal Travel Itinerary & Handbook Template

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?logo=github)](https://ianmahkg.github.io/Trip_Planner/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Multi-Language](https://img.shields.io/badge/i18n-Bilingual%20%7C%20Single-emerald)](https://ianmahkg.github.io/Trip_Planner/)
[![MapLibre](https://img.shields.io/badge/Maps-MapLibre%20GL%20%2B%20OpenFreeMap-purple)](https://maplibre.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-orange)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

**Trip Planner** is a state-of-the-art, fully responsive, modular travel planner and interactive itinerary handbook designed for **GitHub Pages**.

🔗 **Live Portal Hub:** [https://ianmahkg.github.io/Trip_Planner/](https://ianmahkg.github.io/Trip_Planner/)

It is engineered to work seamlessly for **any destination worldwide**, in **any language combination**, for **any travel party size**, using **any currency**, and styled with **7 luxury color palettes**.

The repository is built from the ground up to pair with **AI Copilots** (*Claude, GitHub Copilot, Antigravity, ChatGPT, Cursor*). Simply fork the repository, run the prompt template, and your personalized trip website is ready to publish!

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🌍 **Universal & Modular** | Fully decoupled architecture. Zero hardcoded destinations — customize everything via 3 clean data files. |
| 🎨 **7 Luxury Theme Presets** | Built-in presets (*Midnight Navy, Nordic Aurora, Mediterranean Warm, Sakura Rose, Alpine Emerald, Cyber Dark, Sunset Terracotta*) + full Dark/Light mode. |
| 🌐 **Multi-Lingual Parity (i18n)** | Always-visible language switcher supporting bilingual or trilingual (Primary, Secondary, and Tertiary e.g. English, Traditional Chinese, Simplified Chinese) modes. |
| ✈️ **Confirmed Flight Cards** | Beautiful flight cards with airline badge, flight number, departure/arrival terminals, baggage allowances, and direct ground connection links. |
| 🍽️ **Food & Gastronomy Map** | Interactive MapLibre GL dining map with category filter pills (*Street Food, Historic, Waterfront, Brewery, Coffee*), dish specialties, and card-to-map cross-highlighting. |
| 🌦️ **Live Weather Widget** | Integrated Open-Meteo live forecast widget displaying temperature, wind, humidity, precipitation, and seasonal packing advisories. |
| 🚨 **Essentials & Emergency Support** | 24/7 direct-dial emergency hotlines, consular protection, and destination phrases with Web Speech API audio TTS pronunciation. |
| 🚕 **Driver Taxi Flashcard** | Mobile-friendly driver destination modal showing local-language hotel and airport addresses with one-tap copy and Google Maps navigation. |
| 📅 **RFC 5545 iCalendar Export** | One-click `.ics` calendar export with 24-hour alarm reminders for every day's scheduled activities. |
| 📊 **Dynamic Reading Progress** | Glassmorphic scroll-depth progress bar, active "Today" pill, and 5-thumb-target mobile bottom navigation. |
| 💱 **Live Multi-Currency Converter** | Real-time exchange rate engine powered by Open Exchange Rates API with automatic offline fallbacks. |
| 🗺️ **Lazy-Loaded Vector Maps** | Powered by MapLibre GL JS + OpenFreeMap tiles. Loaded dynamically via `IntersectionObserver` when scrolled into view. |
| 🚆 **5 Railway Milestone Styles** | Choose from iconic transit styles: *Swiss Train (SBB), JR Rail (Japan 駅名標), London Underground (TfL), Hong Kong MTR, NYC Subway (MTA)* pre-defined via configuration. |
| 🧳 **Interactive Packing Checklist** | Categorized checklist with real-time percentage progress bar and persistent browser `localStorage`. |
| 🏨 **Booking.com Hotel Finder** | Quick-leg destination pills with pre-filled check-in, check-out, and traveler party sizes. |
| 📱 **Network-First PWA** | Service Worker with Network-First strategy ensuring instant updates on deployment while providing offline caching during travel. |
| 🧪 **CDP Runtime Verification** | Turnkey automated test suite running in headless Microsoft Edge via Chrome DevTools Protocol to guarantee zero JS crashes and zero horizontal overflow. |
| 🚀 **Zero-Config Deployment** | Includes automated GitHub Actions workflow for instant deployment to GitHub Pages upon push. |

---

## 🚀 Quick Start (Fork & Customize in 3 Steps)

### Step 1: Fork This Repository
Click the **Fork** button at the top right of this repository to create your own copy on your GitHub account.

### Step 2: Generate Your Trip Data with AI Copilot
1. Open [`prompts/trip-planner-prompt.md`](prompts/trip-planner-prompt.md).
2. Copy the prompt into **Claude**, **GitHub Copilot**, **Antigravity**, or **ChatGPT**.
3. Fill in your trip details (destination, dates, party, budget, preferred theme preset, languages).
4. Replace the 3 files in your repository with the generated code:
   - `data/config.js` (Master configuration, party, theme, currency, feature flags)
   - `data/site-data.js` (Overview cards, flights, food, essentials, tips, packing list, budget, hotels)
   - `data/itinerary-data.js` (Day-by-day timeline, activities, meal recommendations, mini-maps)

### Step 3: Enable GitHub Pages
1. Go to your repository **Settings** ➔ **Pages**.
2. Under **Build and deployment** ➔ **Source**, select **GitHub Actions** (or select **Deploy from a branch** ➔ `main` ➔ `/root`).
3. Your travel website will be live at `https://<your-username>.github.io/<your-repo-name>/`! 🎉

---

## 📂 Project Architecture

```text
Trip_Planner/
├── .agents/
│   └── AGENTS.md               # AI agent rules, architecture constraints & verification checklist
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── assets/
│   └── favicon.svg             # Universal travel compass icon
├── css/
│   ├── palette.css             # Design tokens & 7 luxury theme presets
│   ├── base.css                # Typography, resets & layout containers (zero horizontal overflow)
│   ├── components.css          # Navigation, buttons, badges, accordions, modals, audio TTS
│   ├── sections.css            # Hero, overview, flights, map, food, timeline, essentials, budget, hotels
│   ├── responsive.css          # Breakpoints (Mobile, Tablet, Desktop) & Print rules
│   └── style.css               # Master stylesheet import loader
├── data/
│   ├── config.js               # Master trip config, languages, party, theme, currency, feature flags
│   ├── site-data.js            # Structured overview, flights, food, essentials, tips, packing, budget, hotels
│   └── itinerary-data.js       # Day-by-day schedule with GPS points & meals
├── examples/
│   ├── README.md               # Quick-switch guide for all 5 example plans
│   ├── 01-switzerland-italy-13days/ # 🇨🇭 🇮🇹 Swiss Alpine & Northern Italy (13 Days)
│   ├── 02-japan-tokyo-kyoto-5days/  # 🇯🇵 Japan Golden Route Express (5 Days)
│   ├── 03-uk-london-scotland-10days/# 🇬🇧 UK & Scotland Heritage Tour (10 Days)
│   ├── 04-hong-kong-7days/          # 🇭🇰 Hong Kong Islands & Skyline (7 Days)
│   └── 05-us-new-england-14days/    # 🇺🇸 US New England Autumn Roadtrip (14 Days)
├── js/
│   ├── currency.js             # Live exchange rate fetcher & currency converter
│   ├── map.js                  # MapLibre GL lazy loader, route map & interactive food map
│   ├── render.js               # Core DOM render engine with multi-lingual injection & guarded renders
│   ├── ui.js                   # Language switch, dark mode, swipe gestures, TTS audio, .ics export
│   └── script.js               # Application bootstrap & Network-First Service Worker registration
├── prompts/
│   └── trip-planner-prompt.md  # Copy-paste AI Copilot prompt template
├── tests/
│   └── pre_deployment_check.py # Automated Headless Edge + CDP runtime verification suite
├── _config.yml                 # Jekyll configuration (bypasses Jekyll build)
├── .gitignore                  # Git ignore rules
├── index.html                  # Semantic HTML shell & UI mount points
├── manifest.json               # Progressive Web App manifest
├── showcase.html               # Live interactive showcase of all themes & transit styles
├── sw.js                       # Service worker with Network-First strategy
└── README.md                   # Project documentation & user guide
```

> **🤖 For AI Agents & Copilots:** Before editing any file, read [`.agents/AGENTS.md`](.agents/AGENTS.md).
> It contains architecture constraints, data-driven pattern rules, CSS token rules, transit style
> extension guides, PII rules, and a verification checklist. Agents that skip it risk breaking
> language switching, theme presets, or the config-driven data architecture.

---

## 🗺️ 5 Production-Ready Example Plans

Explore the 5 complete, ready-to-use live trip plans hosted on GitHub Pages:

| # | Plan | Highlights | Duration | Theme | Railway Style | Live Link |
|---|---|---|---|---|---|---|
| **1** | [🇨🇭 🇮🇹 Switzerland & Italy](examples/01-switzerland-italy-13days/) | Zurich, Lucerne, Interlaken, Zermatt, Como, Milan | 13 Days | `alpine-emerald` | `swiss-train` | [🚀 Launch Demo](https://ianmahkg.github.io/Trip_Planner/examples/01-switzerland-italy-13days/index.html) |
| **2** | [🇯🇵 Japan Golden Route](examples/02-japan-tokyo-kyoto-5days/) | Tokyo, Hakone Onsen, Kyoto Momiji, Osaka Dotonbori | 5 Days | `sakura-rose` | `jr-rail` | [🚀 Launch Demo](https://ianmahkg.github.io/Trip_Planner/examples/02-japan-tokyo-kyoto-5days/index.html) |
| **3** | [🇬🇧 UK & Scotland Tour](examples/03-uk-london-scotland-10days/) | London Tube, Windsor, Bath & Cotswolds, York, Edinburgh | 10 Days | `midnight-navy` | `london-underground` | [🚀 Launch Demo](https://ianmahkg.github.io/Trip_Planner/examples/03-uk-london-scotland-10days/index.html) |
| **4** | [🇭🇰 Hong Kong Explorer](examples/04-hong-kong-7days/) | Victoria Peak, Star Ferry, Big Buddha, Sai Kung Geopark | 7 Days | `cyber-dark` | `hong-kong-mtr` | [🚀 Launch Demo](https://ianmahkg.github.io/Trip_Planner/examples/04-hong-kong-7days/index.html) |
| **5** | [🇺🇸 US New England Fall](examples/05-us-new-england-14days/) | Boston, Kancamagus (NH), Vermont, Acadia (ME), NYC | 14 Days | `sunset-terracotta` | `new-york-subway` | [🚀 Launch Demo](https://ianmahkg.github.io/Trip_Planner/examples/05-us-new-england-14days/index.html) |

*To test or deploy any example, simply copy the 3 `.js` files from the example folder into `data/` and refresh `index.html`!*

---

## 🎨 7 Luxury Theme Presets

> 💡 **Live Visual Showcase:** Open [`showcase.html`](showcase.html) in your browser to interactively test all 7 themes and all 5 railway milestone styles side-by-side with instant Light/Dark switching!

Choose from 7 built-in luxury themes in `data/config.js` (`TRIP_CONFIG.theme.preset`). Every theme dynamically styles buttons, hero badges, interactive maps, progress bars, timeline accents, and hotel search pills in both **Light** and **Dark** modes:

```javascript
// In data/config.js:
theme: {
  preset: "alpine-emerald", // Set your preferred theme preset here
  defaultTheme: "light"     // "light" or "dark"
}
```

### Theme Palette Showcase

| Preset Key | Destination & Trip Vibe | Primary & Accent Colors | Dark Mode Tone |
| :--- | :--- | :--- | :--- |
| **`midnight-navy`** *(Default)* | ✈️ **Luxury Aviation & City Breaks**<br>London, New York, Tokyo, Luxury Escapes | `Navy #0B2545` · `Azure #134074` · `Gold #C9A227` | Deep Midnight Obsidian (`#07101E`) |
| **`nordic-aurora`** | 🌌 **Glaciers, Fjords & Northern Lights**<br>Iceland, Norway, Finland, Alaska, Patagonia | `Fjord #0F2A38` · `Teal #0D9488` · `Cyan #06B6D4` | Arctic Slate Night (`#081219`) |
| **`mediterranean-warm`** | ☀️ **Sun-Drenched Coastal Getaways**<br>Amalfi Coast, Greece, Côte d'Azur, Spain | `Terracotta #7C2D12` · `Rust #C2410C` · `Coral #F97316` | Warm Espresso Charcoal (`#1C0D08`) |
| **`sakura-rose`** | 🌸 **Spring Blossoms & Romantic Honeymoons**<br>Kyoto, Paris, Provence, Vienna | `Plum #4A154B` · `Rose #9D174D` · `Pink #DB2777` | Mulberry Velvet (`#190618`) |
| **`alpine-emerald`** *(Active)* | 🏔️ **Alpine Peaks, Lakes & Road Trips**<br>Switzerland, Dolomites, New Zealand, Rockies | `Pine #064E3B` · `Emerald #0D9488` · `Gold #D97706` | Deep Forest Slate (`#041611`) |
| **`cyber-dark`** | ⚡ **Neon Metropolises & Night Tours**<br>Shibuya, Seoul, Hong Kong, Las Vegas | `Indigo #312E81` · `Violet #7C3AED` · `Neon #06B6D4` | Pitch OLED Black (`#050811`) |
| **`sunset-terracotta`** | 🏜️ **Desert Canyons, Oases & Kasbahs**<br>Sedona, Grand Canyon, Morocco, Jordan, Egypt | `Clay #78350F` · `Rust #B45309` · `Amber #D97706` | Sedona Red Earth (`#180C05`) |

---

## 🚆 5 Railway Milestone Styles

The Journey Milestone Board transforms your itinerary's key stops into an authentic transit map. Pre-define your favorite system in `data/config.js` (`TRIP_CONFIG.routeBoardStyle`):

```javascript
// In data/config.js:
routeBoardStyle: "swiss-train", // "swiss-train" | "jr-rail" | "london-underground" | "hong-kong-mtr" | "new-york-subway"
```

### Visual Style Showcase

#### 1. 🇨🇭 Swiss Train (`swiss-train`) — *Default for European Tours*
- **Inspiration**: SBB CFF FFS (Swiss Federal Railways) precision design.
- **Header Badge**: Red rectangular badge `🇨🇭 SBB · CFF · FFS`.
- **Station Code**: Clean 3-letter alpine airport/station pill (`ZRH`, `LUC`, `INT`).
- **Station Dot**: Precision SBB clock ring dot with center colored core.
- **Direction**: `Bound for Milan ➔` (European direction sign).

```text
 ┌──────────────┐
 │ 🇨🇭 SBB · FFS │  Alpine & Lakes Scenic Route                     Bound for Milan ➔
 └──────────────┘
       ( ZRH )             ( LUC )             ( INT )             ( ZMT )
    ──────●───────────────────●───────────────────●───────────────────●──────
       Zürich              Luzern             Interlaken           Zermatt
       Zurich              Lucerne            Jungfrau             Matterhorn
     [Days 1–2]          [Days 2–4]          [Days 4–7]          [Days 7–9]
```

---

#### 2. 🇯🇵 JR Rail (`jr-rail`) — *Tokaido Bullet Train & Golden Route*
- **Inspiration**: JR Japan Railways authentic Station Signboard (駅名標).
- **Header Badge**: Green JR line badge `🇯🇵 JR · LINE`.
- **Station Code**: Distinctive dual-box code `[ TYO | 01 ]`, `[ KTO | 04 ]` with colored border.
- **Station Dot**: Classic JR white-centered circular node on the line color track.
- **Direction**: `Bound for Osaka 方面 ➔` (authentic Japanese directional sign).

```text
 ┌────────────┐
 │ 🇯🇵 JR LINE │  東海道新幹線・ゴールデンルート                 Bound for Osaka 方面 ➔
 └────────────┘
     ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐
     │ TYO │ 01 │        │ HKN │ 02 │        │ KTO │ 04 │        │ OSA │ 06 │
     └──────────┘        └──────────┘        └──────────┘        └──────────┘
    ──────◎───────────────────◎───────────────────◎───────────────────◎──────
        東京                箱根                京都                大阪
        Tokyo              Hakone              Kyoto               Osaka
      [第 1–3 天]         [第 3–5 天]         [第 6–9 天]        [第 10–13 天]
```

---

#### 3. 🇬🇧 London Underground (`london-underground`) — *London & UK Heritage Trail*
- **Inspiration**: Transport for London (TfL) iconic Tube map & Johnston typography.
- **Header Badge**: Tube Roundel badge `🔴 UNDERGROUND` with red ring shadow.
- **Station Code**: Solid rectangular colored station block `[LHR]`, `[KXX]`, `[WIN]`.
- **Station Dot**: Iconic **hollow interchange circle ring** matching the line color.
- **Direction**: `Westbound to Oxford ➔` (Tube cardinal direction banner).

```text
 ┌─────────────────┐
 │ 🔴 UNDERGROUND  │  Piccadilly & Western Heritage Trail          Westbound to Oxford ➔
 └─────────────────┘
       ┌─────┐             ┌─────┐             ┌─────┐             ┌─────┐
       │ LHR │             │ KXX │             │ WIN │             │ OXF │
       └─────┘             └─────┘             └─────┘             └─────┘
    ──────○───────────────────○───────────────────○───────────────────○──────
       Heathrow          King's Cross          Windsor             Oxford
      Terminal 5          St Pancras         Eton Central       City Centre
      [Zone 6]             [Zone 1]            [Zone 4]          [Zone 8]
```

---

#### 4. 🇭🇰 Hong Kong MTR (`hong-kong-mtr`) — *Bilingual Line Map (Hong Kong Island & Lantau)*
- **Inspiration**: MTR Corporation dual-curve emblem and bilingual Chinese/English layout.
- **Header Badge**: MTR dark red emblem `Ж MTR`.
- **Station Code**: Rounded capsule pill with vibrant line color fill.
- **Station Dot**: MTR interchange capsule node with smooth glowing drop shadow.
- **Direction**: `往 柴灣 / 西貢 To Chai Wan & Sai Kung ➔`.

```text
 ┌────────┐
 │ Ж MTR  │  機場快綫・港島・大嶼山精華線                        往 西貢 To Sai Kung ➔
 └────────┘
       ( AIR )             ( TSY )             ( HOK )             ( SKG )
    ──────●───────────────────●───────────────────●───────────────────●──────
     機場 Airport        青衣 Tsing Yi      中環 Central        西貢 Sai Kung
       [第 1 天]          [第 1–2 天]         [第 2–4 天]         [第 8–10 天]
```

---

#### 5. 🇺🇸 NYC Subway & MTA (`new-york-subway`) — *New York & New England Corridor*
- **Inspiration**: NYC MTA Subway black station signage band & bold white Helvetica.
- **Header Badge**: MTA Subway badge `MTA SUBWAY` on solid black backdrop.
- **Station Code**: Circular colored subway bullet `( A )`, `( 1 )`, `( 4 )`, `( N )`, `( B )`.
- **Station Dot**: NYC Subway express track node.
- **Direction**: `Northbound to Boston ➔` (NYC / Northeast Corridor indicator).

```text
 ┌────────────┐
 │ MTA SUBWAY │  NEW YORK TO NEW ENGLAND CORRIDOR               Northbound to Boston ➔
 └────────────┘
        (A)                 (1)                 (N)                 (B)
    ──────●───────────────────●───────────────────●───────────────────●──────
    JFK AIRPORT         TIMES SQUARE         NEW HAVEN            BOSTON
  Jamaica Terminal    Manhattan Midtown      Yale Univ, CT    Back Bay & Trail
     [DAYS 1-2]          [DAYS 2-4]          [DAYS 6-8]          [DAYS 10-13]
```

---

## 💱 Multi-Currency Engine

Configure the base destination currency and any conversion currencies in `data/config.js`:

```javascript
currency: {
  base: { code: "EUR", symbol: "€", name: "Euro" },
  targets: [
    { code: "usd", symbol: "$", name: "USD ($)", fallbackRate: 1.08 },
    { code: "gbp", symbol: "£", name: "GBP (£)", fallbackRate: 0.85 },
    { code: "hkd", symbol: "HK$", name: "HKD ($)", fallbackRate: 8.45 },
    { code: "eur", symbol: "€", name: "EUR (€)", fallbackRate: 1.00 }
  ],
  defaultTarget: "usd"
}
```

The system automatically queries `https://open.er-api.com/v6/latest/{BASE}` to update rates in real time, with seamless offline fallback support.

---

## 🌐 Language Customization

### Bilingual Mode (Default)
Set both `primary` and `secondary` languages in `data/config.js`:
```javascript
languages: {
  primary: { code: "en", label: "EN", name: "English" },
  secondary: { code: "zh", label: "繁中", name: "繁體中文" },
  default: "en"
}
```

### Single Language Mode
Set `secondary: null` to disable the language toggle and display only your chosen language:
```javascript
languages: {
  primary: { code: "en", label: "EN", name: "English" },
  secondary: null,
  default: "en"
}
```

---

## 🧪 Automated Pre-Deployment Verification

Trip Planner includes an automated runtime verification suite using **Headless Microsoft Edge** and the **Chrome DevTools Protocol (CDP)** located at `tests/pre_deployment_check.py`.

The suite automatically:
1. Verifies `sw.js` cache versioning (`trip-planner-v2`) and Network-First caching strategy.
2. Auto-spawns and health-checks a background HTTP server on port 8000.
3. Launches Headless Edge in isolated test profile with devtools protocol port 9222.
4. Validates **Portal Hub Mode** (`http://localhost:8000/index.html`):
   - Zero uncaught JavaScript exceptions (`Runtime.exceptionThrown`).
   - Zero console errors.
   - All 5 pre-built plan cards rendered.
   - Zero horizontal overflow (`scrollWidth <= clientWidth`).
5. Validates **Plan Mode** (`examples/01-switzerland-italy-13days/index.html`):
   - Zero uncaught JavaScript exceptions.
   - Zero console errors.
   - All 13 day cards, overview cards, milestone board, packing items, budget rows, hotels, and transit rendered.
   - Zero horizontal overflow across all responsive viewports.

### Running the Test Suite
```bash
python tests/pre_deployment_check.py
```
If any component fails to render, or if a single JavaScript runtime exception or horizontal scrollbar is detected, the script exits with code `1` and prints the exact offending element or stack trace.

---

## 🤝 Contributing & Feedback

Feel free to open issues or submit pull requests with improvements, new theme presets, or localization additions.

---

## 📄 License

Distributed under the **MIT License**. Free for personal and commercial trip planning.
