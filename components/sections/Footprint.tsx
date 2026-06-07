import { Reveal } from '@/components/ui/Reveal'
import { footprint, type GitHubProfile } from '@/lib/github'

export function Footprint({ profile }: { profile: GitHubProfile }) {
  const stats = [
    { value: `${footprint.originalRepos}+`, label: 'Original repositories' },
    { value: '5', label: 'Engineering domains' },
    { value: `${profile.publicRepos}`, label: 'Public on GitHub' },
    { value: 'TS · PY', label: 'Primary languages' },
  ]

  return (
    <section className="relative border-y border-white/[0.06] py-16">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* stats */}
          <Reveal>
            <div>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Engineering footprint
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-semibold text-gradient sm:text-4xl">{s.value}</p>
                    <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* language mix */}
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <p className="mb-4 text-sm text-zinc-400">
                Language distribution across all original repositories
              </p>
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {footprint.languageMix.map((l) => (
                  <div
                    key={l.name}
                    style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                    title={`${l.name} ${l.pct}%`}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {footprint.languageMix.map((l) => (
                  <div key={l.name} className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                    {l.name} <span className="font-mono text-zinc-600">{l.pct}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
                {footprint.domains.map((d) => (
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
