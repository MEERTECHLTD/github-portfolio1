/* Articles in content/writing, read at build time. Frontmatter is a flat block
   of `key: value` lines whose values are JSON (strings or arrays). */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = join(process.cwd(), 'content', 'writing')

export interface Note {
  slug: string
  title: string
  description: string
  /** ISO date, YYYY-MM-DD. */
  date: string
  category: string
  systems: string[]
  body: string
  words: number
  minutes: number
}

function parse(slug: string, raw: string): Note {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) throw new Error(`writing/${slug}: missing frontmatter`)
  const data: Record<string, unknown> = {}
  for (const line of m[1]!.split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i < 1) continue
    const value = line.slice(i + 1).trim()
    try {
      data[line.slice(0, i).trim()] = JSON.parse(value)
    } catch {
      data[line.slice(0, i).trim()] = value
    }
  }
  for (const key of ['title', 'description', 'date', 'category']) {
    if (typeof data[key] !== 'string' || !data[key]) throw new Error(`writing/${slug}: missing ${key}`)
  }
  const body = m[2]!.trim()
  const words = body.split(/\s+/).length
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: new Date(data.date as string).toISOString().slice(0, 10),
    category: data.category as string,
    systems: Array.isArray(data.systems) ? (data.systems as string[]) : [],
    body,
    words,
    minutes: Math.max(2, Math.round(words / 220)),
  }
}

/** All articles, newest first. */
export function getNotes(): Note[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parse(f.replace(/\.md$/, ''), readFileSync(join(DIR, f), 'utf8')))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
}

export const getNote = (slug: string) => getNotes().find((n) => n.slug === slug)

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' })
