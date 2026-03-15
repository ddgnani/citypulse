# Project Vision

## Problem Statement
Tourists visiting or planning trips to multiple cities need a quick way to check essential local information — time, weather, and currency — without juggling multiple apps or websites. CityPulse solves this by providing a single, mobile-friendly dashboard that shows real-time local info for a curated list of cities.

## Target Users
Tourists and travelers who want at-a-glance information about cities they are visiting or plan to visit. They are typically on mobile devices, need fast answers, and don't want to create accounts or configure anything.

## Goals & Key Outcomes
- Users can view local time, weather, currency name, and USD exchange rate for any city on the list in real time
- The app is mobile-first and loads quickly on phone browsers
- Zero configuration required — works out of the box with a predefined city list

## Constraints
- Use only free public APIs (no paid tiers)
- Deploy on Vercel free tier
- Keep the tech stack and architecture simple
- City list is manually provided (hardcoded) for v1

## Timeline
No hard deadline specified. Ship when ready.

## Success Criteria
- Dashboard loads and displays accurate, real-time data for all configured cities
- Mobile-friendly layout that works well on phone-sized screens
- All API data (time, weather, currency) refreshes without manual page reload or with minimal user action
- Deployable to Vercel free tier with no additional infrastructure

## Out of Scope
- Multi-user experience (accounts, personalization, saved preferences) — deferred to a future version
- User-managed city lists (adding/removing cities dynamically) — deferred to a future version
- Native mobile app — web only
- Offline mode
