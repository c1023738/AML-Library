import { eq } from "drizzle-orm";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { pageTitleStyles } from "@/styles";
export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  if (!item) {
    return (
      <div>
        <h1 className={pageTitleStyles}>Item Not Found</h1>
      </div>
    );
  }
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1>{item?.name}</h1>
    </main>
  );
}
