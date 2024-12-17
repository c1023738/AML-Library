"use server";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createItem(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unaaauthorized");
  }

  const startingPrice = formData.get("startingPrice") as string;
  const priceAsCents = Math.floor(parseFloat(startingPrice) * 100);
  await database.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: priceAsCents,
    userId: user.id,
  });
  redirect("/");
}
