import { auth } from "@/auth";
import { ItemCard } from "../item-card";
import { items } from "@/db/schema";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";
import { EmptyState } from "./empty-state";
import { pageTitleStyles } from "@/styles";

export default async function AccountPage() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauth");
  }
  if (!session.user) {
    throw new Error("Unauth");
  }
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Add Item</h1>

      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
