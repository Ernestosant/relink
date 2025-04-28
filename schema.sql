-- Schema for Cloudflare D1 Database

-- Links table
CREATE TABLE IF NOT EXISTS links (
  id TEXT PRIMARY KEY,
  shortCode TEXT UNIQUE NOT NULL,
  originalUrl TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

-- Clicks table
CREATE TABLE IF NOT EXISTS clicks (
  id TEXT PRIMARY KEY,
  linkId TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  browser TEXT,
  os TEXT,
  device TEXT,
  ip TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  FOREIGN KEY (linkId) REFERENCES links(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_links_shortCode ON links(shortCode);
CREATE INDEX IF NOT EXISTS idx_clicks_linkId ON clicks(linkId); 