import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

import { ItemCard } from "../item-card";
import { pageTitleStyles } from "@/styles";

export default async function HomePage() {
  const session = await auth();

  // Check if the items already exist in the database
  const existingItems = await database.query.items.findMany();
  if (existingItems.length === 0) {
    // Only insert if no items exist
    await database.insert(items).values([
      {
        name: "The Great Gatsby",
        price: 1500, // Price in cents
        image: "https://example.com/images/great-gatsby.jpg",
        type: "book",
        author: "F. Scott Fitzgerald",
        publisher: "Scribner",
        releaseDate: new Date("1925-04-10"),
        description: "A novel set in the Jazz Age of the 1920s.",
      },
      {
        name: "The Last of Us Part II",
        price: 5999,
        image: "https://example.com/images/last-of-us-2.jpg",
        type: "game",
        publisher: "Naughty Dog",
        releaseDate: new Date("2020-06-19"),
        description: "A survival action game for PlayStation.",
      },
      {
        name: "Inception",
        price: 1999,
        image: "https://example.com/images/inception.jpg",
        type: "dvd",
        publisher: "Warner Bros",
        releaseDate: new Date("2010-07-16"),
        description: "A sci-fi thriller directed by Christopher Nolan.",
      },
      {
        name: "Abbey Road",
        price: 1299,
        image: "https://example.com/images/abbey-road.jpg",
        type: "cd",
        publisher: "Apple Records",
        releaseDate: new Date("1969-09-26"),
        description: "The iconic album by The Beatles.",
      },
    ]);
  }

  // Fetch all items to display
  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8">
      <title>Explore</title>
      <h1 className={pageTitleStyles}>Items List</h1>

      <div className="grid grid-cols-4 gap-4">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
