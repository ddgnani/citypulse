import { fetchTemperature } from "../lib/weather";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("fetchTemperature", () => {
  test("returns numeric temperature for valid coordinates", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        current_weather: { temperature: 25.3 },
      }),
    });

    const temp = await fetchTemperature(33.0198, -96.6989);
    expect(typeof temp).toBe("number");
    expect(temp).toBe(25.3);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("latitude=33.0198")
    );
  });

  test("returns null when API returns non-ok status", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    const temp = await fetchTemperature(0, 0);
    expect(temp).toBeNull();
  });

  test("returns null when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const temp = await fetchTemperature(0, 0);
    expect(temp).toBeNull();
  });

  test("returns null when current_weather is missing", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const temp = await fetchTemperature(0, 0);
    expect(temp).toBeNull();
  });
});
