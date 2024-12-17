import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items, reservations as reservationsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Add Item</h1>

      <div className="grid grid-cols-4">
        {allItems.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl gap-8">
            {item.name}
            Price: £{item.Price / 100}
          </div>
        ))}
      </div>
    </main>
  );
}
