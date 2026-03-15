/**
 * Fetches current temperature from Open-Meteo API for given coordinates.
 * Returns temperature in Celsius or null if the request fails.
 */
export async function fetchTemperature(
  lat: number,
  lon: number
): Promise<number | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Open-Meteo error: ${res.status} for (${lat}, ${lon})`);
      return null;
    }
    const data = await res.json();
    return data.current_weather?.temperature ?? null;
  } catch (err) {
    console.error(`Open-Meteo fetch failed for (${lat}, ${lon}):`, err);
    return null;
  }
}
