// "use server";

// import { revalidatePath } from "next/cache";
// import { database } from "@/db/database";
// import { items } from "@/db/schema";
// import { auth } from "@/auth";
// export async function createReservationAction(formData: FormData) {
//   const session = await auth();

//   if (!session) {
//     throw new Error("");
//   }
//   const user = session.user;
//   if (!session.user) {
//     throw new Error("");
//   }
//   await database.insert(items).values({
//     name: formData.get("name") as string,
//     userId: user.id,
//   });
// }
