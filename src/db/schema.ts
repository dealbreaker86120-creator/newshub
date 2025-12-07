import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';

export const imageTags = sqliteTable('image_tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  imageUrl: text('image_url').notNull().unique(),
  imageHash: text('image_hash').notNull().unique(),
  objects: text('objects', { mode: 'json' }),
  people: text('people', { mode: 'json' }),
  themes: text('themes', { mode: 'json' }),
  emotions: text('emotions', { mode: 'json' }),
  colors: text('colors', { mode: 'json' }),
  concepts: text('concepts', { mode: 'json' }),
  description: text('description'),
  articleTitle: text('article_title'),
  articleUrl: text('article_url'),
  cached: integer('cached', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  lastAccessed: text('last_accessed').notNull(),
  accessCount: integer('access_count').default(1),
}, (table) => ({
  imageHashIdx: index('image_hash_idx').on(table.imageHash),
  imageUrlIdx: index('image_url_idx').on(table.imageUrl),
  createdAtIdx: index('created_at_idx').on(table.createdAt),
}));