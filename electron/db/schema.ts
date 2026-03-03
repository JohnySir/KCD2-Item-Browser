import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const items = sqliteTable('items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  itemId: text('item_id').notNull().unique(),
  stats: text('stats'),
  category: text('category'),
  metadata: text('metadata'),
})

export type Item = typeof items.$inferSelect
export type NewItem = typeof items.$inferInsert
