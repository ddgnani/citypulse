// Mock next/server before importing the route
jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown) => ({
      status: 200,
      json: async () => body,
    }),
  },
}));

// Mock the helper modules
jest.mock("../lib/weather", () => ({
  fetchTemperature: jest.fn(),
}));
jest.mock("../lib/currency", () => ({
  fetchExchangeRates: jest.fn(),
}));
jest.mock("../lib/time", () => ({
  getLocalTime: jest.fn(),
}));

import { GET } from "../app/api/cities/route";
import { fetchTemperature } from "../lib/weather";
import { fetchExchangeRates } from "../lib/currency";
import { getLocalTime } from "../lib/time";

const mockFetchTemp = fetchTemperature as jest.MockedFunction<typeof fetchTemperature>;
const mockFetchRates = fetchExchangeRates as jest.MockedFunction<typeof fetchExchangeRates>;
const mockGetLocalTime = getLocalTime as jest.MockedFunction<typeof getLocalTime>;

beforeEach(() => {
  mockFetchTemp.mockResolvedValue(25);
  mockFetchRates.mockResolvedValue({
    USD: 1,
    INR: 83.5,
    GBP: 0.79,
    JPY: 149.8,
    SGD: 1.34,
  });
  mockGetLocalTime.mockReturnValue("2:30 PM");
});

describe("GET /api/cities", () => {
  test("returns 200 with valid JSON", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("cities");
    expect(data).toHaveProperty("lastUpdated");
  });

  test("response contains exactly 5 cities", async () => {
    const res = await GET();
    const data = await res.json();
    expect(data.cities).toHaveLength(5);
  });

  test("each city has name, country, localTime, temperature, currencyName, exchangeRate fields", async () => {
    const res = await GET();
    const data = await res.json();

    for (const city of data.cities) {
      expect(city).toHaveProperty("name");
      expect(city).toHaveProperty("country");
      expect(city).toHaveProperty("localTime");
      expect(city).toHaveProperty("temperature");
      expect(city).toHaveProperty("currencyName");
      expect(city).toHaveProperty("exchangeRate");
    }
  });

  test("handles external API failures gracefully (returns null values)", async () => {
    mockFetchTemp.mockResolvedValue(null);
    mockFetchRates.mockResolvedValue(null);

    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.cities).toHaveLength(5);

    for (const city of data.cities) {
      expect(city.temperature).toBeNull();
      expect(city.exchangeRate).toBeNull();
    }
  });
});
