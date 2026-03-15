import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../components/Dashboard";

const mockCities = [
  { name: "Plano", country: "USA", localTime: "2:30 PM", temperature: 28, currencyName: "US Dollar", exchangeRate: 1.0 },
  { name: "Hyderabad", country: "India", localTime: "1:00 AM", temperature: 32, currencyName: "Indian Rupee", exchangeRate: 83.5 },
  { name: "London", country: "UK", localTime: "8:30 PM", temperature: 15, currencyName: "British Pound", exchangeRate: 0.79 },
  { name: "Tokyo", country: "Japan", localTime: "4:30 AM", temperature: 20, currencyName: "Japanese Yen", exchangeRate: 149.8 },
  { name: "Singapore", country: "Singapore", localTime: "3:30 AM", temperature: 30, currencyName: "Singapore Dollar", exchangeRate: 1.34 },
];

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("Dashboard", () => {
  test("displays loading state while data is being fetched", () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    render(<Dashboard />);
    expect(screen.getByText("Loading city data...")).toBeInTheDocument();
  });

  test("renders all 5 city cards after data loads", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ cities: mockCities, lastUpdated: new Date().toISOString() }),
    });

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
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ cities: mockCities, lastUpdated: new Date().toISOString() }),
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    // Check first city's details
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("2:30 PM")).toBeInTheDocument();
    expect(screen.getByText("28°C")).toBeInTheDocument();
    expect(screen.getByText("US Dollar")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 1")).toBeInTheDocument();
  });

  test("displays error state when API call fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  test("renders responsive grid classes", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ cities: mockCities, lastUpdated: new Date().toISOString() }),
    });

    const { container } = render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Plano")).toBeInTheDocument();
    });

    const grid = container.firstElementChild;
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-2");
  });
});
