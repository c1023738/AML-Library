"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { reservations } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReservation(formData: FormData) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const itemId = Number(formData.get("itemId")); // Parse itemId as a number
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);

  // Insert the reservation into the database
  await database.insert(reservations).values({
    itemId,
    userId,
    startDate,
    endDate,
  });

  // Revalidate the page and redirect to the home page
  revalidatePath("/");
  redirect("/");
}
