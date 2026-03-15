# Work Plan

## Version 1 — MVP

### Unit 1: Project Setup & City Configuration
- **Addresses**: NFR-3, NFR-4
- **Description**: Initialize the Next.js 14 project with Tailwind CSS, configure the app structure, and define the hardcoded city data configuration.
- **Inputs**: None (first unit).
- **Outputs**: Working Next.js project skeleton with Tailwind configured, city config file with all 5 cities.
- **Dependencies**: None
- **Files to Create/Modify**:
  - `package.json`
  - `next.config.js`
  - `tailwind.config.js`
  - `postcss.config.js`
  - `src/app/layout.tsx`
  - `src/app/globals.css`
  - `src/config/cities.ts`
  - `tsconfig.json`
- **Test Plan**:
  - [ ] Next.js dev server starts without errors
  - [ ] Tailwind CSS classes render correctly
  - [ ] City config exports an array of 5 cities with correct fields (name, country, timezone, lat, lon, currencyCode, currencyName)

---

### Unit 2: Backend API Route
- **Addresses**: FR-1, FR-2, FR-3, FR-4
- **Description**: Create the `/api/cities` route handler that fetches weather data from Open-Meteo and currency rates from ExchangeRate-API, combines with timezone-based local time, and returns a normalized JSON response.
- **Inputs**: City config from Unit 1, external API responses.
- **Outputs**: `GET /api/cities` endpoint returning aggregated city data.
- **Dependencies**: Unit 1
- **Files to Create/Modify**:
  - `src/app/api/cities/route.ts`
  - `src/lib/weather.ts` (Open-Meteo fetch helper)
  - `src/lib/currency.ts` (ExchangeRate-API fetch helper)
  - `src/lib/time.ts` (Intl.DateTimeFormat helper)
- **Test Plan**:
  - [ ] `/api/cities` returns 200 with valid JSON
  - [ ] Response contains exactly 5 cities
  - [ ] Each city has name, country, localTime, temperature, currencyName, exchangeRate fields
  - [ ] Weather helper returns numeric temperature for valid coordinates
  - [ ] Currency helper returns exchange rates for USD, INR, GBP, JPY, SGD
  - [ ] Time helper returns formatted time string for each timezone
  - [ ] API handles external API failures gracefully (returns error or partial data)

---

### Unit 3: Dashboard UI — CityCard Component
- **Addresses**: FR-1, FR-2, FR-3, FR-4, FR-6, NFR-4
- **Description**: Build the CityCard component that displays a single city's data (time, temperature, currency) and the dashboard page that renders all 5 cards in a responsive grid.
- **Inputs**: CityData from `/api/cities` response.
- **Outputs**: Dashboard page with 5 city cards, responsive layout.
- **Dependencies**: Unit 2
- **Files to Create/Modify**:
  - `src/app/page.tsx`
  - `src/components/CityCard.tsx`
  - `src/components/Dashboard.tsx`
- **Test Plan**:
  - [ ] Dashboard page renders without errors
  - [ ] All 5 city cards are displayed
  - [ ] Each card shows city name, country, local time, temperature, currency name, and exchange rate
  - [ ] Layout is responsive — single column on mobile (< 640px), multi-column on larger screens
  - [ ] Loading state is displayed while data is being fetched

---

### Unit 4: Auto-Refresh & Polish
- **Addresses**: FR-5, NFR-1, NFR-4
- **Description**: Implement 60-second auto-refresh of city data, add loading/error states, and polish the mobile UI (typography, spacing, colors).
- **Inputs**: Dashboard and API route from Units 2–3.
- **Outputs**: Auto-refreshing dashboard with polished mobile-first UI.
- **Dependencies**: Unit 3
- **Files to Create/Modify**:
  - `src/components/Dashboard.tsx` (add refresh logic)
  - `src/app/page.tsx` (polish)
  - `src/app/globals.css` (any global style tweaks)
- **Test Plan**:
  - [ ] Data refreshes automatically every 60 seconds without page reload
  - [ ] Last-updated timestamp is displayed and updates on each refresh
  - [ ] Error state is shown if API call fails
  - [ ] Page loads within 3 seconds on simulated 4G (Lighthouse check)
  - [ ] UI is usable at 375px viewport width

---

## Requirements Coverage Matrix

### Version 1

| Requirement | Description | Unit(s) | Status |
|-------------|-------------|---------|--------|
| FR-1 | Dashboard with 5 hardcoded cities | Unit 2, Unit 3 | ✅ |
| FR-2 | Each card shows current local time | Unit 2, Unit 3 | ✅ |
| FR-3 | Each card shows current temperature | Unit 2, Unit 3 | ✅ |
| FR-4 | Each card shows currency name + USD rate | Unit 2, Unit 3 | ✅ |
| FR-5 | Auto-refresh every 60 seconds | Unit 4 | ✅ |
| FR-6 | Responsive grid/list layout for mobile | Unit 3 | ✅ |
| NFR-1 | Page loads within 3 seconds on 4G | Unit 4 | ✅ |
| NFR-2 | Only free-tier APIs used | Unit 2 | ✅ |
| NFR-3 | Deployable to Vercel free tier | Unit 1 | ✅ |
| NFR-4 | Mobile-first responsive design (320px+) | Unit 1, Unit 3, Unit 4 | ✅ |
