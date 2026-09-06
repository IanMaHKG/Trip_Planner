# Trip Planner — Agent Rules
# ──────────────────────────────────────────────────────────────────────
# These rules apply to ALL AI-assisted work on this repository.
# Read and follow them before writing or editing any content.
# ──────────────────────────────────────────────────────────────────────

## Who Is This For?

This repository is a **universal, fork-ready template** for anyone to create
their own travel itinerary website. The target user is **any developer or
traveler worldwide** who has forked this repo. Rules in this file reflect that
universal-audience purpose — no personal family conventions, no region-specific
language mandates.

---

## Documentation Integrity & Anti-Drift Rule (CRITICAL)

- **Mandatory Review on Every Change:** Whenever ANY code, architecture,
  directory structure, data schema, styling token, or feature change is made,
  the agent **MUST** immediately review and update all relevant files:
  - `README.md`
  - `.agents/AGENTS.md`
  - Any active planning artifacts / walkthroughs
- **Zero Documentation Drift:** Documentation must always strictly match the
  living code. Never allow file paths, architectural diagrams, feature
  descriptions, or design token references to become outdated.
- **Prompt Template Reminder:** If a change modifies the `TRIP_CONFIG` schema
  or any data file structure, flag `prompts/trip-planner-prompt.md` for the
  user to review and update — do **not** auto-modify it without explicit user
  approval.

---

## Language Style Rules

### English

- **No spelling variant is enforced.** This repo targets a global audience of
  fork users. Agents may write in American or British English — **be consistent
  within a single file or PR** and do not mix spellings arbitrarily.
- CSS property names (`color`, `center`, etc.) and JavaScript identifiers are
  code — leave them exactly as-is regardless of English variant.
- Dates in documentation: use an unambiguous format such as `10 Sep 2026` or
  `Sep 10, 2026` — never `9/10` or similar locale-ambiguous shorthand.

### i18n Content (Bilingual / Multilingual Data)

- Every user-facing string in `data/site-data.js` and `data/itinerary-data.js`
  **must** provide values for every language code configured in
  `TRIP_CONFIG.languages` (e.g., `{ en: "...", zh: "..." }`).
- If `TRIP_CONFIG.languages.secondary` is `null` (single-language mode), only
  the `primary` language key is required; omitting unused language keys is fine.
- Agents must **never** guess or invent secondary-language translations. If a
  translation is needed and unavailable, insert a clear `// TODO: translate`
  comment and inform the user.

---

## Architecture & Content Rules

### Modular File Structure

```
Trip_Planner/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── assets/
│   └── favicon.svg             # Universal travel compass icon
├── css/
│   ├── palette.css             # Design tokens & 7 luxury theme presets
│   ├── base.css                # Typography, resets & layout containers
│   ├── components.css          # Navigation, buttons, badges, accordions
│   ├── sections.css            # Hero, overview, map, timeline, budget, hotels
│   ├── responsive.css          # Breakpoints (Mobile, Tablet, Desktop) & Print
│   └── style.css               # Master stylesheet import loader
├── data/
│   ├── config.js               # Master trip config, languages, party, theme, currency
│   ├── site-data.js            # Structured overview, tips, packing, budget, hotels
│   └── itinerary-data.js       # Day-by-day schedule with GPS points & meals
├── examples/
│   ├── README.md               # Quick-switch guide for all 5 example plans
│   ├── 01-switzerland-italy-13days/
│   ├── 02-japan-tokyo-kyoto-5days/
│   ├── 03-uk-london-scotland-10days/
│   ├── 04-hong-kong-7days/
│   └── 05-us-new-england-14days/
├── js/
│   ├── currency.js             # Live exchange rate fetcher & currency converter
│   ├── map.js                  # MapLibre GL JS vector map renderer & mini-maps
│   ├── render.js               # Core DOM render engine with bilingual injection
│   ├── ui.js                   # Language switch, dark mode, filters, accordions
│   └── script.js               # Application bootstrap & Service Worker registration
├── prompts/
│   └── trip-planner-prompt.md  # Copy-paste AI Copilot prompt template
├── _config.yml
├── .gitignore
├── index.html                  # Semantic HTML shell & UI mount points
├── manifest.json               # Progressive Web App manifest
├── showcase.html               # Live interactive showcase of all themes & transit styles
├── sw.js                       # Service worker for offline asset caching
└── README.md
```

### Data-Driven Pattern (CRITICAL)

- **All** user-visible text content must live in the three data files:
  - `data/config.js` — trip identity, party, theme, currency, language config
  - `data/site-data.js` — overview, tips, packing, budget, car rental, hotels
  - `data/itinerary-data.js` — day-by-day schedule, activities, GPS points, meals
- **Never** hardcode displayed text, city names, dates, currency symbols, or
  trip-specific values in `index.html`, `js/render.js`, or `js/ui.js`.
  `index.html` may contain only structural labels that do not require i18n
  (e.g., semantic landmark ARIA labels).
- `js/render.js` reads from the data files and injects HTML into placeholder
  IDs — it must remain trip-agnostic.

### config.js Is the Single Source of Truth

- `data/config.js` (`TRIP_CONFIG`) is the **only** place to define trip
  identity: title, dates, destination, party details, theme preset, currency,
  language settings, and feature flags.
- `render.js` and `ui.js` **must read** from `TRIP_CONFIG` — they must never
  duplicate or re-declare values that already exist in `config.js`.
- If a new top-level key is added to `TRIP_CONFIG`, update `README.md` and flag
  `prompts/trip-planner-prompt.md` for user review.

### Feature Flag Pattern

- Respect `TRIP_CONFIG.features.show*` flags. If a flag is `false`, do not
  render that section, and do not add references to it in generated output.
- When adding a new toggleable section, add a corresponding `show*` key to the
  `features` block in `config.js` and honour it in `render.js`.

### Privacy & PII Protection

- Do **not** include real personal names, specific family member roles
  ("Mother", "Father", "Son"), home cities, personal phone numbers, or passport
  numbers in any rendered website output.
- Party member names in `config.js` are illustrative placeholders (e.g., "Ian",
  "Parent A"); they are config-level data only and should not be surfaced
  verbatim in the main UI unless the user explicitly intends public display.
- State passport and visa information strictly by **document type**
  (e.g., "British Citizen passport", "HKSAR travel document") — never link it
  to a named individual in public-facing text.

---

## Theme & Styling Rules

### CSS Custom Properties Only

- **Never** hardcode color values, spacing tokens, or font sizes as inline
  styles or within JS strings.
- All visual values must flow through CSS custom properties defined in
  `css/palette.css`. If a new token is needed, define it there first.

### Adding a New Theme Preset

1. Add the new preset block inside `css/palette.css` following the existing
   pattern (`:root[data-theme="my-new-preset"]`).
2. The block **must** include both light mode and dark mode variable sets.
3. Register the preset key in `data/config.js` comments (the `theme.preset`
   option list) so fork users can discover it.
4. Add the new preset to `showcase.html` and update the theme table in
   `README.md`. A preset is **not** complete until it appears in both.
5. **Never remove or rename** an existing preset key — only add new ones.
   Existing forks depend on backward compatibility.

### After Any palette.css or Theme-Related JS Change

- Verify all **7 theme presets** visually in `showcase.html` (both light and
  dark modes) before considering the change done.

---

## Railway / Transit Board Style Rules

### Adding a New Railway Style

1. Add the new `routeBoardStyle` key to the options comment block in
   `data/config.js`.
2. Add the corresponding `case` branch in the `render.js` route-board render
   switch.
3. Add the new style to `showcase.html` and document it in `README.md`.
4. **Never rename or remove** an existing style key (`swiss-train`, `jr-rail`,
   `london-underground`, `hong-kong-mtr`, `new-york-subway`). Existing forks
   set these values in their `config.js` and must not break.

### After Any CSS / JS Change Affecting Transit Styles

- Verify all **5 railway board styles** render correctly in `showcase.html`
  (both light and dark modes) before considering the change done.

---

## Responsive Design & Zero Horizontal Overflow Guarantee (CRITICAL)

### Root Viewport & Layout Guards
- **Zero Horizontal Overflow**: `html` and `body` must maintain `overflow-x: hidden; max-width: 100%; width: 100%;`. `#trip-content`, `#trip-onepager`, and `.section` must have `max-width: 100%; overflow-x: hidden; box-sizing: border-box;`.
- **No `100vw` in Stylesheets**: Always use `100%` or `calc(100% - ...)` instead of `100vw` to prevent the 17px vertical scrollbar gutter bug on desktop and Windows browsers.
- **Media Reset**: All `img, video, canvas, iframe` must have `max-width: 100%; height: auto; display: block;` and `svg { max-width: 100%; }`.

### Fluid Auto-Fit Grids (No Empty Whitespace or Mobile Blowout)
- **Always `auto-fit`, NEVER `auto-fill`**:
  ```css
  /* ✅ CORRECT: Cards expand dynamically to fill container width without ghost tracks */
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));

  /* ❌ INCORRECT: Leaves empty placeholder tracks on right when items < columns */
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  ```
- **Every column track must be bounded**: Always wrap pixel minimums with `min(Xpx, 100%)` (e.g. `minmax(min(280px, 100%), 1fr)`) so narrow mobile screens (<400px like iPhone 16 Pro / SE) never overflow.
- **Clean Touch Scrolls**: Horizontal scrolling pill rows (`.food-filter-pills`, `.phrase-tabs-row`, `.day-filters`) must have `scrollbar-width: none !important;` and webkit scrollbars hidden to eliminate grey scrollbar rails.

---

## Service Worker & PWA Rules (Network-First Invariant)

- **Network-First for Local Assets**: `sw.js` must serve local application shell assets (`.`, `index.html`, `css/*`, `js/*`, `data/*`) using a Network-First strategy with Cache Fallback for offline. This guarantees visitors always receive fresh deployments instantly while preserving 100% offline travel functionality.
- **Immediate SW Update Check**: `js/script.js` must call `reg.update()` upon registration.
- **Mandatory Cache Version Bump**: After **any** change to `js/`, `css/`, `data/`, or `index.html`, **bump the cache version constant** in `sw.js` (e.g., `CACHE_NAME = 'trip-planner-v2'`).
- Do not remove the service worker or manifest without explicit user instruction.

---

## Pre-Deployment Runtime Verification Check (CDP Suite)

Whenever ANY HTML, CSS, JS, or data files are modified, run the automated pre-deployment check before committing or pushing to `main`:

```bash
python tests/pre_deployment_check.py
```

This headless browser test suite uses Chrome DevTools Protocol (CDP) to strictly verify:
1. **Zero Runtime Exceptions**: `Runtime.exceptionThrown` must report 0 unhandled exceptions.
2. **Zero Console Errors**: `console.error` during bootstrap and hydration must be 0.
3. **Full Component Hydration**: All core sections render past the HTML skeleton.
4. **Zero Horizontal Overflow**: `scrollWidth <= clientWidth` on document root element.
5. **PWA Cache Bump**: `CACHE_NAME` in `sw.js` is updated.

---

## Examples Folder Rules

- `examples/` contains 5 complete, standalone trip plans that are live-linked
  in `README.md`.
- After any **structural** change (new data schema key, renamed render function,
  altered CSS class used across all plans), check all 5 example `config.js` /
  `site-data.js` / `itinerary-data.js` files for breakage and note any
  incompatibilities to the user.
- Do **not** silently modify example data content without user approval — treat
  example data as user-owned reference content.

---

## Verification Checklist (Run After Any Significant Change)

Before marking a task complete, confirm:

- [ ] All data changes are in the 3 data files only (not in HTML or JS logic).
- [ ] `TRIP_CONFIG` in `config.js` is the sole source for trip identity values.
- [ ] Any modified feature has its `show*` flag respected.
- [ ] Grids use `repeat(auto-fit, minmax(min(Xpx, 100%), 1fr))` with zero horizontal overflow.
- [ ] `sw.js` uses Network-First for local assets and `CACHE_NAME` is bumped.
- [ ] `python tests/pre_deployment_check.py` passes with 0 exceptions, 0 console errors, and full hydration.
- [ ] If palette or themes were touched: all 7 presets verified in `showcase.html`.
- [ ] If transit styles were touched: all 5 board styles verified in `showcase.html`.
- [ ] No PII or personal data has been introduced into rendered output.
- [ ] `README.md` and active documentation artifacts reflect the current code without drift.
- [ ] Any new `TRIP_CONFIG` schema key is documented in `README.md` and flagged
      for `prompts/trip-planner-prompt.md` review.
- [ ] All 5 examples in `examples/` checked for structural compatibility.
