import { pageTitleStyles } from "@/styles";
import { createItemAction } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function CreatePage() {
  return (
    <main>
      <h1 className={pageTitleStyles}>Add Item</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-md"
        action={createItemAction}
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
          name="price"
          type="number"
          placeholder="Name Your Item"
        />
        <Button className="self-end" type="submit">
          Add Item
        </Button>
      </form>
    </main>
  );
}
