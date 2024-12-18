"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { createOrUpdateReservation } from "@/app/Reservations/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ItemCard({
  item,
  existingReservation,
}: {
  item: Item;
  existingReservation: { startDate: string; endDate: string } | null;
}) {
  const [startDate, setStartDate] = useState(
    existingReservation?.startDate || ""
  );
  const [endDate, setEndDate] = useState(existingReservation?.endDate || "");
  const [error, setError] = useState(""); // For displaying error messages

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert the date strings to Date objects for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the End Date is after the Start Date
    if (end <= start) {
      setError("End Date must be after Start Date.");
      return; // Stop the form submission if the dates are invalid
    }

    setError(""); // Clear any previous errors

    const formData = new FormData();
    formData.append("itemId", String(item.id)); // Pass the item's ID
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    try {
      await createOrUpdateReservation(formData);
      alert("Reservation updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message || "An error occurred while creating the reservation."
        );
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const imgUrl = item.image ?? "/not-found.svg";

  return (
    <div key={item.id} className="border p-8 rounded-xl space-y-2">
      <Image src={imgUrl} alt="Item Image" width="200" height="200" />
      <h2 className="text-xl font-bold">{item.name}</h2>

      {/* Dialog Box */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Reserve</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {existingReservation ? "Update Reservation" : "Reserve"}{" "}
              {item.name}
            </DialogTitle>
            <DialogDescription>
              Enter the reservation details below.
            </DialogDescription>
          </DialogHeader>

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={today} // Prevent selecting a date before today
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || today} // Prevent selecting a date before the start date
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <DialogFooter className="sm:justify-end mt-4 space-x-2">
              <Button type="submit">Submit</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
  +