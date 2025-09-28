import { pgTable, uuid, timestamp, decimal, varchar } from "drizzle-orm/pg-core"

export const locations = pgTable(
  "location",
  {
    id: uuid("id").defaultRandom().primaryKey(), // matches gen_random_uuid()
    date: timestamp("date", { withTimezone: true }).notNull(),
    latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
    longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
    city: varchar("city", { length: 255 }), // match SQL VARCHAR(255)
    state: varchar("state", { length: 255 }),
    country: varchar("country", { length: 255 }),
  }
)

export type LocationType = typeof locations.$inferSelect
