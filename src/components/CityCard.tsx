"use client";

export interface CityData {
  name: string;
  country: string;
  localTime: string;
  temperature: number | null;
  currencyName: string;
  exchangeRate: number | null;
}

export default function CityCard({ city }: { city: CityData }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {city.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {city.country}
        </p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Local Time</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {city.localTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Temperature</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {city.temperature !== null ? `${city.temperature}°C` : "—"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            {city.currencyName}
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {city.exchangeRate !== null
              ? `1 USD = ${city.exchangeRate}`
              : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
