import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";

import { revalidatePath } from "next/cache";

import { pageTitleStyles } from "@/styles";
import { ItemCard } from "../item-card";

export default async function HomePage() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Add Item</h1>

      <div className="grid grid-cols-4">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
