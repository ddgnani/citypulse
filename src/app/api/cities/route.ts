import { NextResponse } from "next/server";
import { cities } from "@/config/cities";
import { fetchTemperature } from "@/lib/weather";
import { fetchExchangeRates } from "@/lib/currency";
import { getLocalTime } from "@/lib/time";

export const dynamic = "force-dynamic";

export async function GET() {
  const [temperatures, rates] = await Promise.all([
    Promise.all(cities.map((city) => fetchTemperature(city.lat, city.lon))),
    fetchExchangeRates(),
  ]);

  const cityData = cities.map((city, i) => ({
    name: city.name,
    country: city.country,
    localTime: getLocalTime(city.timezone),
    temperature: temperatures[i],
    currencyName: city.currencyName,
    exchangeRate: rates?.[city.currencyCode] ?? null,
  }));

  return NextResponse.json({
    cities: cityData,
    lastUpdated: new Date().toISOString(),
  });
}
