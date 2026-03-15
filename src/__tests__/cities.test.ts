import { cities, City } from "../config/cities";

describe("City configuration", () => {
  test("exports an array of exactly 5 cities", () => {
    expect(Array.isArray(cities)).toBe(true);
    expect(cities).toHaveLength(5);
  });

  test("each city has all required fields with correct types", () => {
    const requiredFields: { key: keyof City; type: string }[] = [
      { key: "name", type: "string" },
      { key: "country", type: "string" },
      { key: "timezone", type: "string" },
      { key: "lat", type: "number" },
      { key: "lon", type: "number" },
      { key: "currencyCode", type: "string" },
      { key: "currencyName", type: "string" },
    ];

    for (const city of cities) {
      for (const { key, type } of requiredFields) {
        expect(city).toHaveProperty(key);
        expect(typeof city[key]).toBe(type);
      }
    }
  });

  test("each city has a valid IANA timezone", () => {
    for (const city of cities) {
      expect(() => {
        Intl.DateTimeFormat(undefined, { timeZone: city.timezone });
      }).not.toThrow();
    }
  });

  test("latitudes and longitudes are within valid ranges", () => {
    for (const city of cities) {
      expect(city.lat).toBeGreaterThanOrEqual(-90);
      expect(city.lat).toBeLessThanOrEqual(90);
      expect(city.lon).toBeGreaterThanOrEqual(-180);
      expect(city.lon).toBeLessThanOrEqual(180);
    }
  });

  test("contains the expected 5 cities", () => {
    const names = cities.map((c) => c.name);
    expect(names).toEqual(
      expect.arrayContaining(["Plano", "Hyderabad", "London", "Tokyo", "Singapore"])
    );
  });
});
