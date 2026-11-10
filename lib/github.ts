import snapshot from '@/content/github.json'
import { site } from './site'

/**
 * Public GitHub footprint. Counts and the recent list are read live from the
 * public REST API (public repositories only). Language shares come from the
 * measured snapshot in content/github.json. If GitHub is unreachable or rate
 * limited, the whole snapshot is used and its date is shown. Nothing is estimated.
 */
export interface GitHubFootprint {
  account: string
  profile: string
  originals: number
  forks: number
  recent: { name: string; url: string; language: string | null; pushedAt: string }[]
  languages: { name: string; share: number }[]
  /** ISO date the counts were read. */
  measuredAt: string
  /** ISO date the language shares were measured. */
  languagesMeasuredAt: string
  live: boolean
}

/* Left out of the recent list: this site's own source, profile and empty
   repositories, and one that is under review. */
const SKIP = new Set([
  'github-portfolio',
  'github-portfolio1',
  'meertechnology01',
  'Nigeria-Music-Analytics-System-NMAS',
  'mids',
  'midspro',
  'Jules',
])

const FALLBACK: GitHubFootprint = {
  account: snapshot.account,
  profile: snapshot.profile,
  originals: snapshot.originals,
  forks: snapshot.forks,
  recent: snapshot.recent,
  languages: snapshot.languages,
  measuredAt: snapshot.measuredAt,
  languagesMeasuredAt: snapshot.measuredAt,
  live: false,
}

interface Repo {
  name: string
  html_url: string
  language: string | null
  pushed_at: string
  fork: boolean
  private: boolean
  size: number
}

/** Best-effort live footprint. Cached for six hours. Never throws. */
export async function getGitHubFootprint(): Promise<GitHubFootprint> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-build' }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const res = await fetch(
      `https://api.github.com/users/${site.githubUser}/repos?per_page=100&type=owner&sort=pushed`,
      { headers, next: { revalidate: 60 * 60 * 6 }, signal: AbortSignal.timeout(12000) },
    )
    if (!res.ok) return FALLBACK
    const data: unknown = await res.json()
    if (!Array.isArray(data) || data.length === 0) return FALLBACK
    const repos = (data as Repo[]).filter((r) => !r.private)
    const originals = repos.filter((r) => !r.fork)
    return {
      ...FALLBACK,
      originals: originals.length,
      forks: repos.length - originals.length,
      recent: originals
        .filter((r) => r.size > 0 && !SKIP.has(r.name))
        .slice(0, 6)
        .map((r) => ({ name: r.name, url: r.html_url, language: r.language, pushedAt: r.pushed_at.slice(0, 10) })),
      measuredAt: new Date().toISOString().slice(0, 10),
      live: true,
    }
  } catch {
    return FALLBACK
  }
}
