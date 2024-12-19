import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountPage from "@/components/AccountPage";
import { database } from "@/db/database";
import { auth } from "@/auth";

// Mock modules
jest.mock("@/auth");
jest.mock("@/db/database");

describe("AccountPage Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders without crashing", async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "user1", name: "Test User" },
    });
    (database.query.reservations.findMany as jest.Mock).mockResolvedValue([]);

    render(<AccountPage />);

    expect(await screen.findByText("My Reservations")).toBeInTheDocument();
  });

  it("displays reservations correctly", async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "user1", name: "Test User" },
    });
    (database.query.reservations.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        itemId: 101,
        startDate: "2024-12-01T00:00:00Z",
        endDate: "2024-12-08T00:00:00Z",
        item: { id: 101, name: "Test Item", price: 100 },
      },
    ]);

    render(<AccountPage />);

    expect(await screen.findByText("Test Item")).toBeInTheDocument();
    expect(
      screen.getByText("Reserved from: 12/1/2024 to 12/8/2024")
    ).toBeInTheDocument();
  });

  it("handles unauthorized access", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    render(<AccountPage />);

    await waitFor(() =>
      expect(screen.queryByText("My Reservations")).not.toBeInTheDocument()
    );
  });

  it("handles reservation button click", async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "user1", name: "Test User" },
    });
    (database.query.reservations.findMany as jest.Mock).mockResolvedValue([]);
    (database.insert.reservations as jest.Mock).mockResolvedValue({
      id: 2,
      itemId: 101,
      startDate: "2024-12-01T00:00:00Z",
      endDate: "2024-12-08T00:00:00Z",
    });
    (database.query.items.findFirst as jest.Mock).mockResolvedValue({
      id: 101,
      name: "New Item",
      price: 150,
    });

    render(<AccountPage />);
    const reserveButton = await screen.findByText("Reserve Item");
    fireEvent.click(reserveButton);

    expect(await screen.findByText("New Item")).toBeInTheDocument();
    expect(
      screen.getByText("Reserved from: 12/1/2024 to 12/8/2024")
    ).toBeInTheDocument();
  });
});
