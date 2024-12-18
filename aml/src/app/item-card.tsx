"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Item } from "@/db/schema";

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
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setError("End Date must be after Start Date.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("itemId", String(item.id));
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    try {
      await createOrUpdateReservation(formData);
      alert("Reservation updated successfully!");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message || "An error occurred while creating the reservation."
          : "An unknown error occurred."
      );
    }
  };

  const imgUrl = item.image ?? "/not-found.svg";

  return (
    <div className="border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-white max-h-96">
      <Image
        src={imgUrl}
        alt="Item Image"
        width={200}
        height={200}
        className="rounded-lg mx-auto"
      />
      <h2 className="text-xl font-semibold mt-4 text-gray-800 text-center">
        {item.name}
      </h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 w-full">
            {existingReservation ? "Update Reservation" : "Reserve"}
          </Button>
        </DialogTrigger>

        {/* Reservation Dialog */}
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              {existingReservation ? "Update Reservation" : "Reserve"}{" "}
              {item.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-center leading-tight">
              View the item and enter reservation details below.
            </DialogDescription>
          </DialogHeader>

          {/* Image */}
          <div className="flex justify-center my-2">
            <Image
              src={imgUrl}
              alt="Item Image"
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>

          {/* Item Details */}
          <div className="space-y-1 text-sm text-gray-700 mb-2 leading-tight">
            <p className="mb-1">
              <span className="font-medium">Type:</span> {item.type}
            </p>
            {item.author && (
              <p className="mb-1">
                <span className="font-medium">Author:</span>{" "}
                <span className="font-semibold">{item.author}</span>
              </p>
            )}
            <p className="mb-1">
              <span className="font-medium">Publisher:</span>{" "}
              <span className="font-semibold">{item.publisher}</span>
            </p>
            <p className="mb-1">
              <span className="font-medium">Release Date:</span>{" "}
              <span className="font-semibold">
                {item.releaseDate
                  ? new Date(item.releaseDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
            <p className="mb-1">
              <span className="font-medium">Price:</span>{" "}
              <span className="font-semibold">
                ${(item.price / 100).toFixed(2)}
              </span>
            </p>
          </div>

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={today}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || today}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <DialogFooter className="sm:justify-end mt-2 space-x-2">
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
