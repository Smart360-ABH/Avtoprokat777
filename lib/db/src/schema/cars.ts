import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const carsTable = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  pricePerDay: integer("price_per_day").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  seats: integer("seats"),
  transmission: text("transmission"),
  year: integer("year"),
  popular: boolean("popular").notNull().default(false),
  available: boolean("available").notNull().default(true),
});

export const insertCarSchema = createInsertSchema(carsTable).omit({ id: true });
export type InsertCar = z.infer<typeof insertCarSchema>;
export type Car = typeof carsTable.$inferSelect;
