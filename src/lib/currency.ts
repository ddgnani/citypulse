/**
 * Fetches USD exchange rates from ExchangeRate-API.
 * Returns a map of currency code → rate (1 USD = X), or null on failure.
 */
export async function fetchExchangeRates(): Promise<Record<string, number> | null> {
  const url = "https://open.er-api.com/v6/latest/USD";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`ExchangeRate-API error: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data.rates ?? null;
  } catch (err) {
    console.error("ExchangeRate-API fetch failed:", err);
    return null;
  }
}
