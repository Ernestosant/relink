import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const links = sqliteTable('links', {
  id: text('id').primaryKey(),
  shortCode: text('short_code').notNull().unique(),
  originalUrl: text('original_url').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const clicks = sqliteTable('clicks', {
  id: text('id').primaryKey(),
  linkId: text('link_id').notNull().references(() => links.id),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  country: text('country'),
  city: text('city'),
  browser: text('browser'),
  os: text('os'),
  device: text('device'),
  referrer: text('referrer'),
  ip: text('ip')
}); 