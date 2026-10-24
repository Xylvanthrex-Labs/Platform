import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Storage. One SQLite file, no ORM, no native dependency beyond Node itself.
 * The lab site stores exactly one kind of record: a waitlist entry. No
 * analytics, no tracking, no fingerprinting.
 */
const dataDir = resolve(process.cwd(), 'data')
mkdirSync(dataDir, { recursive: true })

export const db = new DatabaseSync(resolve(dataDir, 'xylvanthrex.sqlite'))

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS waitlist (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT    NOT NULL,
    venture    TEXT    NOT NULL,
    note       TEXT    NOT NULL DEFAULT '',
    source     TEXT    NOT NULL DEFAULT 'lab',
    created_at TEXT    NOT NULL
  );

  CREATE INDEX IF NOT EXISTS waitlist_venture_idx ON waitlist (venture);
  CREATE INDEX IF NOT EXISTS waitlist_created_idx ON waitlist (created_at);
`)

export interface WaitlistEntry {
  email: string
  venture: string
  note: string
  source: string
}

export function addWaitlistEntry(entry: WaitlistEntry): number {
  const statement = db.prepare(`
    INSERT INTO waitlist (email, venture, note, source, created_at)
    VALUES (?, ?, ?, ?, ?)
  `)
  const result = statement.run(
    entry.email,
    entry.venture,
    entry.note,
    entry.source,
    new Date().toISOString(),
  )
  return Number(result.lastInsertRowid)
}

export function waitlistCount(): number {
  const row = db.prepare('SELECT COUNT(*) AS count FROM waitlist').get() as
    | { count: number }
    | undefined
  return row?.count ?? 0
}
