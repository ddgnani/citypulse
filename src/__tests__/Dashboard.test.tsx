import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../components/Dashboard";

const mockCities = [
  { name: "Plano", country: "USA", localTime: "2:30 PM", temperature: 28, currencyName: "US Dollar", exchangeRate: 1.0 },
  { name: "Hyderabad", country: "India", localTime: "1:00 AM", temperature: 32, currencyName: "Indian Rupee", exchangeRate: 83.5 },
  { name: "London", country: "UK", localTime: "8:30 PM", temperature: 15, currencyName: "British Pound", exchangeRate: 0.79 },
  { name: "Tokyo", country: "Japan", localTime: "4:30 AM", temperature: 20, currencyName: "Japanese Yen", exchangeRate: 149.8 },
  { name: "Singapore", country: "Singapore", localTime: "3:30 AM", temperature: 30, currencyName: "Singapore Dollar", exchangeRate: 1.34 },
];

const makeResponse = (overrides?: Partial<{ cities: typeof mockCities; lastUpdated: string }>) => ({
  ok: true,
  json: async () => ({
    cities: mockCities,
    lastUpdated: new Date().toISOString(),
    ...overrides,
  }),
});

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Dashboard", () => {
  test("displays loading state while data is being fetched", () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    render(<Dashboard />);
    expect(screen.getByText("Loading city data...")).toBeInTheDocument();
  });

  test("renders all 5 city cards after data loads", async () => {
    mockFetch.mockResolvedValue(makeResponse());
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    expect(screen.getByText("Hyderabad")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getAllByText("Singapore").length).toBeGreaterThanOrEqual(1);
  });

  test("each card shows city name, country, local time, temperature, currency name, and exchange rate", async () => {
    mockFetch.mockResolvedValue(makeResponse());
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("2:30 PM")).toBeInTheDocument();
    expect(screen.getByText("28°C")).toBeInTheDocument();
    expect(screen.getByText("US Dollar")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 1")).toBeInTheDocument();
  });

  test("displays error state when initial API call fails", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  test("renders responsive grid classes", async () => {
    mockFetch.mockResolvedValue(makeResponse());
    const { container } = render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-2");
  });

  test("displays last-updated timestamp", async () => {
    mockFetch.mockResolvedValue(makeResponse());
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    });
  });

  test("auto-refreshes data every 60 seconds without page reload", async () => {
    mockFetch.mockResolvedValue(makeResponse());
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Advance 60 seconds — should trigger a refresh
    await act(async () => {
      jest.advanceTimersByTime(60_000);
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);

    // Advance another 60 seconds
    await act(async () => {
      jest.advanceTimersByTime(60_000);
    });

    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  test("shows refresh error banner but keeps stale data visible", async () => {
    // First call succeeds
    mockFetch.mockResolvedValueOnce(makeResponse());
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    // Next call fails
    mockFetch.mockResolvedValueOnce({ ok: false, status: 503 });

    await act(async () => {
      jest.advanceTimersByTime(60_000);
    });

    // Error banner shown
    await waitFor(() => {
      expect(screen.getByText(/Refresh failed:/)).toBeInTheDocument();
    });

    // Data still visible
    expect(screen.getByText("Plano")).toBeInTheDocument();
  });

  test("page is usable at 375px viewport width (mobile layout classes)", async () => {
    mockFetch.mockResolvedValue(makeResponse());
    const { container } = render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    // At 375px, only grid-cols-1 applies (sm: and lg: are inactive)
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("gap-4");
  });
});
