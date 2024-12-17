import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import Link from "next/link";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="border p-8 rounded-xl gap-8 space-y-2">
      <h2 className="" text-xl font-bold>
        {item.name}
      </h2>
      <p className="text-lg">Price: £{item.startingPrice / 100}</p>

      <Button asChild>
        <Link href={`/items/${item.id}`}>Place Reservation</Link>
      </Button>
    </div>
  );
}
