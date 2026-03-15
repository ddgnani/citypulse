export interface City {
  name: string;
  country: string;
  timezone: string;
  lat: number;
  lon: number;
  currencyCode: string;
  currencyName: string;
}

export const cities: City[] = [
  {
    name: "Plano",
    country: "USA",
    timezone: "America/Chicago",
    lat: 33.0198,
    lon: -96.6989,
    currencyCode: "USD",
    currencyName: "US Dollar",
  },
  {
    name: "Hyderabad",
    country: "India",
    timezone: "Asia/Kolkata",
    lat: 17.385,
    lon: 78.4867,
    currencyCode: "INR",
    currencyName: "Indian Rupee",
  },
  {
    name: "London",
    country: "UK",
    timezone: "Europe/London",
    lat: 51.5074,
    lon: -0.1278,
    currencyCode: "GBP",
    currencyName: "British Pound",
  },
  {
    name: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    lat: 35.6762,
    lon: 139.6503,
    currencyCode: "JPY",
    currencyName: "Japanese Yen",
  },
  {
    name: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
    lat: 1.3521,
    lon: 103.8198,
    currencyCode: "SGD",
    currencyName: "Singapore Dollar",
  },
];
