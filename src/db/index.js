import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

// Initialize the database
const sqlite = new Database('relink.db');
export const db = drizzle(sqlite, { schema });

// Initialize tables if they don't exist
const initDb = () => {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS links (
      id TEXT PRIMARY KEY,
      short_code TEXT UNIQUE NOT NULL,
      original_url TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS clicks (
      id TEXT PRIMARY KEY,
      link_id TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      country TEXT,
      city TEXT,
      browser TEXT,
      os TEXT,
      device TEXT,
      referrer TEXT,
      ip TEXT,
      FOREIGN KEY (link_id) REFERENCES links (id)
    );
  `);
};

initDb(); 