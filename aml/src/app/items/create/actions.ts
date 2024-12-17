"use server";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { error } from "console";
import { revalidatePath } from "next/cache";

export async function createItem(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unaaauthorized");
  }

  const Price = formData.get("Price") as string;
  const priceAsCents = parseFloat(Price) * 100;

  await database.insert(items).values({
    name: formData.get("name") as string,
    Price: priceAsCents,
    userId: user.id,
  });
  revalidatePath("/");
}
