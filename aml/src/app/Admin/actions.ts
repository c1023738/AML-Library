"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function deleteItemAction(formData: FormData) {
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

  // Delete item from the database
  await database.delete(items).where(eq(items.id, itemIdNumber));

  redirect("/");
}
