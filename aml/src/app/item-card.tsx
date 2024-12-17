"use client";

import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { createReservation } from "@/app/Reservations/actions";

export function ItemCard({ item }: { item: Item }) {
  const [startDate1, setStartDate1] = useState("");
  const [endDate1, setEndDate1] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemId", String(item.id)); // Pass the item's ID
    formData.append("startDate", startDate1);
    formData.append("endDate", endDate1);

    await createReservation(formData);
  };
  const imgUrl = item.image ?? "/not-found.svg";
  return (
    <div key={item.id} className="border p-8 rounded-xl space-y-2">
      <Image src={imgUrl} alt="Item Image" width="200" height="200" />
      <h2 className="text-xl font-bold">{item.name}</h2>
    </div>

    // {/* <Dialog>
    //   <DialogTrigger asChild>
    //     <Button variant="outline">Reserve</Button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-md">
    //     <DialogHeader>
    //       <DialogTitle>{item.name}</DialogTitle>
    //       <DialogDescription>
    //         Select the start and end dates for the reservation.
    //       </DialogDescription>
    //     </DialogHeader>

    //     <form onSubmit={handleSubmit} className="space-y-4">

    //       <div className="grid gap-2">
    //         <Label htmlFor="start-date">Start Date</Label>
    //         <Input
    //           id="start-date"
    //           type="date"
    //           value={startDate1}
    //           onChange={(e) => setStartDate1(e.target.value)}
    //         />
    //       </div>

    //       <div className="grid gap-2">
    //         <Label htmlFor="end-date">End Date</Label>
    //         <Input
    //           id="end-date"
    //           type="date"
    //           value={endDate1}
    //           onChange={(e) => setEndDate1(e.target.value)}
    //         />
    //       </div>

    //       <DialogFooter className="sm:justify-start mt-4 space-x-2">
    //         <Button type="submit">Submit</Button>
    //         <DialogClose asChild>
    //           <Button type="button" variant="secondary">
    //             Close
    //           </Button>
    //         </DialogClose>
    //       </DialogFooter>
    //     </form>
    //   </DialogContent>
    // </Dialog> */}
  );
}
