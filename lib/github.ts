import { site } from './site'

/**
 * Curated engineering footprint. These figures come from a real audit of the
 * GitHub account (91 original, non-fork repos analyzed) — not a live feed, which
 * under-represents work that is mostly in private repositories.
 */
export const footprint = {
  originalRepos: 90,
  languageMix: [
    { name: 'TypeScript', pct: 60.5, color: '#3178c6' },
    { name: 'Python', pct: 26.5, color: '#ffd343' },
    { name: 'HTML', pct: 7.2, color: '#e34c26' },
    { name: 'JavaScript', pct: 3.4, color: '#f0db4f' },
    { name: 'PostgreSQL', pct: 1.3, color: '#5eead4' },
    { name: 'Other', pct: 1.1, color: '#a1a1aa' },
  ],
  domains: ['Energy access', 'Fintech & payments', 'Applied AI', 'Agritech', 'Developer tooling'],
}

export interface GitHubProfile {
  publicRepos: number
  followers: number
  following: number
  createdAt: string
}

const FALLBACK: GitHubProfile = {
  publicRepos: 52,
  followers: 17,
  following: 72,
  createdAt: '2024-11-15T00:00:00Z',
}

/** Best-effort live public profile stats. Cached 6h; never throws. */
export async function getGitHubProfile(): Promise<GitHubProfile> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const res = await fetch(`https://api.github.com/users/${site.githubUser}`, {
      headers,
      next: { revalidate: 60 * 60 * 6 },
    })
    if (!res.ok) return FALLBACK
    const d = await res.json()
    return {
      publicRepos: d.public_repos ?? FALLBACK.publicRepos,
      followers: d.followers ?? FALLBACK.followers,
      following: d.following ?? FALLBACK.following,
      createdAt: d.created_at ?? FALLBACK.createdAt,
    }
  } catch {
    return FALLBACK
  }
}
