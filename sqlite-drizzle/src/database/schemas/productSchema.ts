import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const product = sqliteTable('products', {
  id: integer("id").primaryKey(),
  title: text("title").notNull()
})