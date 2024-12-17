"use client";

import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { createReservation } from "@/app/Reservations/actions";
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

export function ItemCard({ item }: { item: Item }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(""); // For displaying error messages

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
      await createReservation(formData);
      alert("Reservation created successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Now TypeScript knows `err` is an instance of `Error`, so you can access `message`.
        setError(
          err.message || "An error occurred while creating the reservation."
        );
      } else {
        // Fallback in case the error is not an instance of `Error`.
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
            <DialogTitle>Reserve {item.name}</DialogTitle>
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
