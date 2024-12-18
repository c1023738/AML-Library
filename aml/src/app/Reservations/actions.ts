"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { items, reservations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createOrUpdateReservation(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthenticated");
  }


  const itemId = formData.get("itemId") as string;
  const itemIdNumber = Number(itemId); 

  if (isNaN(itemIdNumber)) {
    throw new Error("Invalid item ID");
  }

  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;


  const existingReservation = await database.query.reservations.findFirst({
    where:
      eq(reservations.itemId, itemIdNumber) && eq(reservations.userId, user.id),
  });


  if (existingReservation) {
    const existingStartDate = new Date(existingReservation.startDate);
    const existingEndDate = new Date(existingReservation.endDate);

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);


    if (
      (newStartDate >= existingStartDate && newStartDate < existingEndDate) ||
      (newEndDate > existingStartDate && newEndDate <= existingEndDate) ||
      (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
    ) {
      throw new Error(
        "This item is already reserved during the selected dates."
      );
    }


    await database
      .update(reservations)
      .set({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
      .where(eq(reservations.id, existingReservation.id));
  } else {

    await database.insert(reservations).values({
      itemId: itemIdNumber, 
      userId: user.id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
  }

  redirect("/");
}
