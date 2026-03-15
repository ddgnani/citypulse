"use client";

import { useEffect, useState } from "react";
import CityCard, { CityData } from "./CityCard";

interface ApiResponse {
  cities: CityData[];
  lastUpdated: string;
}

export default function Dashboard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/cities");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json: ApiResponse = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading city data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.cities.map((city) => (
        <CityCard key={city.name} city={city} />
      ))}
    </div>
  );
}
