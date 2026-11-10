import Link from 'next/link'
import { Zap, BrainCircuit, CircleDollarSign, Boxes, Wrench, Map } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { DOMAINS, projects, sorted, type Domain } from '@/content/projects'

const icons: Record<Domain, typeof Zap> = {
  energy: Zap,
  finance: CircleDollarSign,
  ai: BrainCircuit,
  data: Map,
  tooling: Wrench,
}

interface FocusProps {
  eyebrow: string
  title: string
  lead: string
  body: string
}

export function Focus({ eyebrow, title, lead, body }: FocusProps) {
  const domains = Object.keys(DOMAINS) as Domain[]
  return (
    <section id="focus" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-px w-7 bg-gradient-to-r from-accent-teal/0 via-accent-teal to-accent-indigo" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-teal/90">{eyebrow}</span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl">{title}</h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-300">{lead}</p>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">{body}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-zinc-600">
                {projects.length} systems across {domains.length} domains
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {domains.map((d, i) => {
              const Icon = icons[d] ?? Boxes
              const systems = sorted.filter((p) => p.domains.includes(d))
              return (
                <Reveal key={d} delay={i * 0.06}>
                  <SpotlightCard>
                    <div className="flex gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Icon className="h-5 w-5 text-accent-teal" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-zinc-50">{DOMAINS[d].label}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{DOMAINS[d].line}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {systems.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/work/${p.slug}`}
                              className="chip text-[11px] transition-colors hover:border-white/25 hover:text-white"
                            >
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
