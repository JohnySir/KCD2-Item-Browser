import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'
import path from 'node:path'

let dbPath: string

// In CJS, we can use require directly or conditional import
if (process.versions.electron) {
  const { app } = require('electron')
  const isProd = app.isPackaged
  dbPath = isProd 
    ? path.join(app.getPath('userData'), 'database.sqlite')
    : 'database.sqlite'
} else {
  // Fallback for tests
  dbPath = 'database-test.sqlite'
}

const sqlite = new Database(dbPath)

// Create table if not exists
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    item_id TEXT NOT NULL UNIQUE,
    stats TEXT,
    category TEXT,
    metadata TEXT
  )
`)

export const db = drizzle(sqlite, { schema })
