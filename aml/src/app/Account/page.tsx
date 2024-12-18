import { auth } from "@/auth";
import { database } from "@/db/database";
import { reservations, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ItemCard } from "../item-card";
import { EmptyState } from "./empty-state";
import { pageTitleStyles } from "@/styles";

export default async function AccountPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  // Fetch the reservations for the logged-in user
  const userReservations = await database.query.reservations.findMany({
    where: eq(reservations.userId, session.user.id),
    with: {
      item: true, // Join with the items table to fetch item details
    },
  });

  const hasReservations = userReservations.length > 0;

  return (
    <div className="space-y-8">
      <title>Account</title>
      <h1 className={pageTitleStyles}>My Reservations</h1>

      {hasReservations ? (
        <div className="grid grid-cols-4 gap-8">
          {userReservations.map((reservation) => (
            <ItemCard key={reservation.id} item={reservation.item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
