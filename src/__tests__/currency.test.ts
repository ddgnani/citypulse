import { fetchExchangeRates } from "../lib/currency";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("fetchExchangeRates", () => {
  test("returns exchange rates for USD, INR, GBP, JPY, SGD", async () => {
    const mockRates = {
      USD: 1,
      INR: 83.5,
      GBP: 0.79,
      JPY: 149.8,
      SGD: 1.34,
    };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ rates: mockRates }),
    });

    const rates = await fetchExchangeRates();
    expect(rates).not.toBeNull();
    expect(rates!.USD).toBe(1);
    expect(rates!.INR).toBe(83.5);
    expect(rates!.GBP).toBe(0.79);
    expect(rates!.JPY).toBe(149.8);
    expect(rates!.SGD).toBe(1.34);
  });

  test("returns null when API returns non-ok status", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
    });

    const rates = await fetchExchangeRates();
    expect(rates).toBeNull();
  });

  test("returns null when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const rates = await fetchExchangeRates();
    expect(rates).toBeNull();
  });
});
