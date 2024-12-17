import { database } from "@/db/database";
import { reservations as reservationsSchema } from "@/db/schema";

export default async function HomePage() {
  const reservations = await database.query.reservations.findMany();
  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(reservationsSchema).values({});
        }}
      >
        <input name="reserve" placeholder="Reserve" />
        <button type="submit">Place a Reservation</button>
      </form>

      {reservations.map((reservation) => (
        <div key={reservation.id}>{reservation.id}</div>
      ))}
    </main>
  );
}
