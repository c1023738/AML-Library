import { pgTable, serial } from "drizzle-orm/pg-core";

export const reservations = pgTable("aml_reservations", {
  id: serial("id").primaryKey(),
});
