# Requirements

## Version 1 — MVP

### Functional Requirements
- FR-1: Display a dashboard with cards for 5 hardcoded cities: Plano (TX, USA), London (UK), Hyderabad (India), Tokyo (Japan), Singapore
- FR-2: Each city card shows the current local time, updated every minute
- FR-3: Each city card shows the current temperature (°C or °F — no other weather details)
- FR-4: Each city card shows the local currency name and its exchange rate to USD
- FR-5: All data (time, temperature, currency) auto-refreshes every 60 seconds without user action
- FR-6: City cards are displayed in a responsive grid/list layout optimized for mobile screens

### Non-Functional Requirements
- NFR-1: Page initial load completes within 3 seconds on a 4G mobile connection
- NFR-2: Only free-tier public APIs are used (no paid keys or subscriptions)
- NFR-3: Deployable to Vercel free tier with zero additional infrastructure
- NFR-4: Mobile-first responsive design — usable on screens as small as 320px wide

### Acceptance Criteria
- [x] Dashboard loads and displays all 5 cities with correct local time, temperature, and currency info
- [x] Data refreshes automatically every 60 seconds without page reload
- [x] Layout is usable and readable on a mobile phone (375px viewport)
- [x] All APIs used are free tier with no paid credentials required
- [x] App deploys successfully to Vercel free tier

---

## Version 2 (TBD)

### Functional Requirements
- FR-1: Users can add and remove cities from their personal list
- FR-2: Search functionality to find cities by name
- FR-3: Favorite cities pinned to the top of the dashboard
- FR-4: Dark mode toggle

### Non-Functional Requirements
- NFR-1: User preferences persisted in local storage (no backend accounts needed)

### Acceptance Criteria
- [ ] Users can search for, add, and remove cities
- [ ] Favorites persist across page reloads
- [ ] Dark mode renders correctly across all components

---

## Version 3 (TBD)

### Functional Requirements
- FR-1: Mini currency converter — user enters an amount in USD and sees equivalent in each city's currency
- FR-2: Multi-currency comparison view
- FR-3: Extended weather details (humidity, wind, forecast)

### Non-Functional Requirements
- NFR-1: Converter calculations are client-side with no additional API calls

### Acceptance Criteria
- [ ] Currency converter produces correct results for all listed currencies
- [ ] Extended weather data displays correctly
