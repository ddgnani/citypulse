"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CityCard, { CityData } from "./CityCard";

const REFRESH_INTERVAL_MS = 60_000;

interface ApiResponse {
  cities: CityData[];
  lastUpdated: string;
}

export default function Dashboard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchCities = useCallback(async (isInitial: boolean) => {
    if (isInitial) setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cities");
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json: ApiResponse = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities(true);
    intervalRef.current = setInterval(() => fetchCities(false), REFRESH_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchCities]);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading city data...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  const lastUpdated = new Date(data.lastUpdated);
  const timeString = lastUpdated.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          Refresh failed: {error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.cities.map((city) => (
          <CityCard key={city.name} city={city} />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        Last updated: {timeString}
      </p>
    </div>
  );
}
