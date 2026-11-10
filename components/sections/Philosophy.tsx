import { Reveal } from '@/components/ui/Reveal'

interface PhilosophyProps {
  /** The quote in two parts; the accent part takes the gradient. */
  quote: { lead: string; accent: string }
  paragraphs: string[]
  principles: readonly { name: string; text: string }[]
}

export function Philosophy({ quote, paragraphs, principles }: PhilosophyProps) {
  return (
    <section id="philosophy" className="relative scroll-mt-24 py-20 sm:py-28" aria-labelledby="philosophy-h">
      <div className="container-px">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="philosophy-h" className="font-mono text-xs font-normal uppercase tracking-[0.2em] text-accent-teal/90">
              Engineering philosophy
            </h2>
            <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight text-zinc-200 sm:text-3xl">
              <span className="text-gradient">“</span>
              {quote.lead} <span className="text-gradient">{quote.accent}</span>
              <span className="text-gradient">”</span>
            </blockquote>
            <div className="mx-auto mt-8 max-w-2xl space-y-4 text-left text-base leading-relaxed text-zinc-400 sm:text-center">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.name} className="h-full">
              <Reveal delay={(i % 3) * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 transition-colors hover:border-white/[0.14]">
                  <span className="font-mono text-xs text-accent-teal/90">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-base font-semibold text-zinc-50">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
