import { Zap, BrainCircuit, CircleDollarSign, Boxes, Wrench } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import type { Pillar } from '@/content/types'

const icons: Record<string, typeof Zap> = {
  energy: Zap,
  ai: BrainCircuit,
  fintech: CircleDollarSign,
  platforms: Boxes,
  tooling: Wrench,
}

export function Focus({ intro, pillars }: { intro: string; pillars: Pillar[] }) {
  return (
    <section id="focus" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-px w-7 bg-gradient-to-r from-accent-teal/0 via-accent-teal to-accent-indigo" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-teal/90">
                  The founder
                </span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl">
                Building intelligent infrastructure for the real world.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-400">{intro}</p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {pillars.map((p, i) => {
              const Icon = icons[p.key] ?? Boxes
              return (
                <Reveal key={p.key} delay={i * 0.06}>
                  <SpotlightCard>
                    <div className="flex gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Icon className="h-5 w-5 text-accent-teal" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-zinc-50">{p.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{p.description}</p>
                        {p.signals.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {p.signals.map((s) => (
                              <span key={s} className="chip text-[11px]">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
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
