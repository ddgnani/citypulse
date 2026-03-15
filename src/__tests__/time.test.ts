import { getLocalTime } from "../lib/time";

describe("getLocalTime", () => {
  test("returns a formatted time string for each timezone", () => {
    const timezones = [
      "America/Chicago",
      "Asia/Kolkata",
      "Europe/London",
      "Asia/Tokyo",
      "Asia/Singapore",
    ];

    for (const tz of timezones) {
      const result = getLocalTime(tz);
      expect(typeof result).toBe("string");
      // Should match pattern like "2:30 PM" or "12:05 AM"
      expect(result).toMatch(/^\d{1,2}:\d{2}\s[AP]M$/);
    }
  });

  test("throws for an invalid timezone", () => {
    expect(() => getLocalTime("Invalid/Timezone")).toThrow();
  });
});
