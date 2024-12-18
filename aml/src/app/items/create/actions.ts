"use server";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }


  const name = formData.get("name") as string | null;
  const price = formData.get("price") as string | null;
  const image = formData.get("image") as string | null;
  const type = formData.get("type") as string | null;
  const author = formData.get("author") as string | null;
  const publisher = formData.get("publisher") as string | null;
  const releaseDate = formData.get("releaseDate") as string | null;
  const description = formData.get("description") as string | null;


  if (!name || !price || !image || !type || !publisher || !releaseDate || !description) {
    throw new Error("All required fields must be provided.");
  }


  const priceAsCents = Math.floor(parseFloat(price) * 100);

  
  await database.insert(items).values({
    name,
    price: priceAsCents,
    image,
    type,
    author, 
    publisher,
    releaseDate: new Date(releaseDate),
    description,
  });


  revalidatePath("/");
  redirect("/");
}
