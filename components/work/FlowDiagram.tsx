import { ArrowRight, ArrowDown } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

/** A system drawn as a pipeline of steps: a wrapping row on wide screens, a column on narrow ones. */
export function FlowDiagram({ name, flow }: { name: string; flow: { stage: string; detail: string }[] }) {
  return (
    <figure>
      <ol className="grid gap-x-3 gap-y-7 lg:grid-cols-3">
        {flow.map((f, i) => (
          <li key={f.stage} className="relative h-full">
            <Reveal delay={(i % 3) * 0.05} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.018] p-5 transition-colors hover:border-accent-teal/40">
                <span className="font-mono text-xs text-accent-teal/90">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-base font-semibold text-zinc-50">{f.stage}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{f.detail}</p>
              </div>
            </Reveal>
            {i < flow.length - 1 && (
              <span
                aria-hidden
                className="absolute -bottom-[22px] left-6 z-10 grid h-4 w-4 place-items-center text-accent-teal lg:-right-[14px] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2"
              >
                <ArrowDown className="h-4 w-4 lg:hidden" />
                <ArrowRight className={i % 3 === 2 ? 'hidden' : 'hidden h-4 w-4 lg:block'} />
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 font-mono text-xs text-zinc-600">
        {name}, as a pipeline. Components as built. No measured values are shown.
      </figcaption>
    </figure>
  )
}
