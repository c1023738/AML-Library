import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import Link from "next/link";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="">
      <h2 className="text-xl font-bold">{item.name}</h2>
      <Button asChild>
        <Link href={`/items/${item.id}`}>Reserve</Link>
      </Button>
    </div>
  );
}
