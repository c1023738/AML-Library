"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { items, reservations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createReservation(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthenticated");
  }

  // Get the itemId and ensure it's a number
  const itemId = formData.get("itemId") as string;
  const itemIdNumber = Number(itemId); // Convert itemId to a number

  if (isNaN(itemIdNumber)) {
    throw new Error("Invalid item ID");
  }

  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  // Check if the item is already reserved for the given dates
  const existingReservation = await database.query.reservations.findFirst({
    where: eq(reservations.itemId, itemIdNumber), // Use the number here
  });

  // If there is an existing reservation, check if it conflicts with the new reservation
  if (existingReservation) {
    const existingStartDate = new Date(existingReservation.startDate);
    const existingEndDate = new Date(existingReservation.endDate);

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    // Check if the new reservation overlaps with the existing one
    if (
      (newStartDate >= existingStartDate && newStartDate < existingEndDate) ||
      (newEndDate > existingStartDate && newEndDate <= existingEndDate) ||
      (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
    ) {
      throw new Error(
        "This item is already reserved during the selected dates."
      );
    }
  }

  // Insert the new reservation if no conflicts
  await database.insert(reservations).values({
    itemId: itemIdNumber, // Use the number here
    userId: user.id,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  redirect("/"); // Redirect after successful reservation
}
