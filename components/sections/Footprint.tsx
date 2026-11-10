import { Reveal } from '@/components/ui/Reveal'
import type { GitHubFootprint } from '@/lib/github'
import { formatDate } from '@/lib/writing'

const languageColor: Record<string, string> = {
  TypeScript: '#3178c6',
  Python: '#ffd343',
  JavaScript: '#f0db4f',
  HTML: '#e34c26',
  CSS: '#8b5cf6',
  Go: '#5eead4',
}

interface FootprintProps {
  github: GitHubFootprint
  /** Counts from this site's project records. */
  counts: { production: number; substantial: number }
  domains: string[]
}

export function Footprint({ github, counts, domains }: FootprintProps) {
  const stats = [
    { value: `${counts.production}`, label: 'Systems in production' },
    { value: `${counts.substantial}`, label: 'Substantial systems, not yet in production' },
    { value: `${github.originals}`, label: 'Public repositories, original' },
    { value: `${github.forks}`, label: 'Public repositories, forks' },
  ]
  const languages = github.languages.slice(0, 6)

  return (
    <section className="relative border-y border-white/[0.06] py-16" aria-labelledby="footprint-h">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* stats */}
          <Reveal>
            <div>
              <h2 id="footprint-h" className="mb-6 font-mono text-xs font-normal uppercase tracking-[0.2em] text-zinc-500">
                Engineering footprint
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-semibold text-gradient sm:text-4xl">{s.value}</p>
                    <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500">
                The first two figures are from this site&apos;s project records. The GitHub figures are read from the
                public API; they cover public repositories only, and forks are counted as forks. Most of my production
                work is in private repositories and is not counted here.
              </p>
              <p className="mt-3 font-mono text-xs text-zinc-600">
                GitHub read {formatDate(github.measuredAt)} ·{' '}
                <a
                  href={github.profile}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  {github.account}
                </a>
              </p>
            </div>
          </Reveal>

          {/* language mix */}
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <p className="mb-4 text-sm text-zinc-400">
                Languages across public original repositories, by bytes, measured{' '}
                {formatDate(github.languagesMeasuredAt)}
              </p>
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {languages.map((l) => (
                  <div
                    key={l.name}
                    style={{ width: `${l.share}%`, backgroundColor: languageColor[l.name] ?? '#a1a1aa' }}
                    title={`${l.name} ${l.share}%`}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {languages.map((l) => (
                  <div key={l.name} className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor[l.name] ?? '#a1a1aa' }} />
                    {l.name} <span className="font-mono text-zinc-600">{l.share}%</span>
                  </div>
                ))}
              </div>

              {github.recent.length > 0 && (
                <div className="mt-5 border-t border-white/[0.06] pt-5">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                    Recently active public repositories
                  </p>
                  <ul>
                    {github.recent.map((r) => (
                      <li key={r.name} className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-w-0 truncate text-zinc-300 transition-colors hover:text-white"
                        >
                          {r.name}
                        </a>
                        <span className="shrink-0 font-mono text-[11px] text-zinc-600">
                          {r.language ?? 'n/a'} · {r.pushedAt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
                {domains.map((d) => (
                  <span key={d} className="chip text-[11px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
