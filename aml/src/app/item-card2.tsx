"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// New action to delete items
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item } from "@/db/schema";
import { deleteItemAction } from "./Admin/actions";

export function ItemCard2({ item }: { item: Item }) {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("itemId", String(item.id));

    try {
      await deleteItemAction(formData); // Call delete action
      alert("Item deleted successfully!");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message || "An error occurred while deleting the item."
          : "An unknown error occurred."
      );
    }
  };

  const imgUrl = item.image ?? "/not-found.svg";

  return (
    <div className="border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-white max-h-96">
      <Image
        src={imgUrl}
        alt="Item Image"
        width={200}
        height={200}
        className="rounded-lg mx-auto"
      />
      <h2 className="text-xl font-semibold mt-4 text-gray-800 text-center">
        {item.name}
      </h2>
      <p className="text-center text-gray-600">
        ${(item.price / 100).toFixed(2)}
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 w-full">
            Delete
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              Delete {item.name}
            </DialogTitle>
          </DialogHeader>

          <div className="text-center my-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <DialogFooter className="sm:justify-end mt-4 space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
