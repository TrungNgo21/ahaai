import { pgTable, real, text, uuid, varchar } from "drizzle-orm/pg-core"

export const menuItem = pgTable("menuItem", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  dishName: varchar().notNull(),
  size: varchar(),
  price: real().notNull(),
  cookingMethods: text().array(),
  ingredients: text().array(),
})
