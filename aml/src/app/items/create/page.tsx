import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";

import { revalidatePath } from "next/cache";
import { createItem } from "./actions";

export default async function CreatePage() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Add Item</h1>
      <form
        className=" flex flex-col border p-8 rounded-xl space-y-4 max-w-md"
        action={createItem}
      >
        <Input
          required
          className="max-w-md"
          name="name"
          placeholder="Name Your Item"
        />
        <Input
          required
          className="max-w-md"
          name="Price"
          type="number"
          step="0.1"
          placeholder="Name Your Item"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
