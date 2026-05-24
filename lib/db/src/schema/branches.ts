import { pgTable, text, serial, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const branchesTable = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  workingHours: text("working_hours"),
  mapUrl: text("map_url"),
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
});

export const insertBranchSchema = createInsertSchema(branchesTable).omit({ id: true });
export type InsertBranch = z.infer<typeof insertBranchSchema>;
export type Branch = typeof branchesTable.$inferSelect;
