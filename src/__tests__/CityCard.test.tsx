import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CityCard, { CityData } from "../components/CityCard";

const mockCity: CityData = {
  name: "Plano",
  country: "USA",
  localTime: "2:30 PM",
  temperature: 28,
  currencyName: "US Dollar",
  exchangeRate: 1.0,
};

describe("CityCard", () => {
  test("renders city name and country", () => {
    render(<CityCard city={mockCity} />);
    expect(screen.getByText("Plano")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
  });

  test("shows local time, temperature, currency name, and exchange rate", () => {
    render(<CityCard city={mockCity} />);
    expect(screen.getByText("2:30 PM")).toBeInTheDocument();
    expect(screen.getByText("28°C")).toBeInTheDocument();
    expect(screen.getByText("US Dollar")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 1")).toBeInTheDocument();
  });

  test("shows dash when temperature is null", () => {
    render(<CityCard city={{ ...mockCity, temperature: null }} />);
    const tempValue = screen.getAllByText("—");
    expect(tempValue.length).toBeGreaterThanOrEqual(1);
  });

  test("shows dash when exchangeRate is null", () => {
    render(<CityCard city={{ ...mockCity, exchangeRate: null }} />);
    const dashValues = screen.getAllByText("—");
    expect(dashValues.length).toBeGreaterThanOrEqual(1);
  });
});
