import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { FlaskConical, PenLine, ArrowRight, ArrowUpRight } from 'lucide-react'
import { formatDate, type Note } from '@/lib/writing'

interface ResearchProps {
  notes: Note[]
  eyebrow: string
  title: string
  intro: string
  interests: string
}

/** The old "Research" section, now listing writing. Linked as /#research and /#writing. */
export function Research({ notes, eyebrow, title, intro, interests }: ResearchProps) {
  return (
    <Section id="research" eyebrow={eyebrow} title={title} intro={intro}>
      <span id="writing" className="absolute -top-24" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((n, i) => (
          <Reveal key={n.slug} delay={(i % 2) * 0.06}>
            <article className="group relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 transition-colors hover:border-white/[0.14]">
              <PenLine className="mb-3 h-4 w-4 text-accent-fuchsia" />
              <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                {n.category} · {formatDate(n.date, { month: 'long', year: 'numeric' })} · {n.minutes} min
              </p>
              <h3 className="mt-2 text-base font-semibold text-zinc-50">
                <Link href={`/writing/${n.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                  {n.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{n.description}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200">
                Read the note
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="border-gradient relative mt-5 overflow-hidden rounded-2xl glass p-7 sm:p-9">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent-teal/10 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-teal/25 bg-accent-teal/10">
              <FlaskConical className="h-5 w-5 text-accent-teal" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-50">Research interests</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">{interests}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                MeerTech also publishes field notes on reporting absence, forecasting and verifiable AI:{' '}
                <a
                  href="https://www.meertech.tech/research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-accent-indigo hover:underline"
                >
                  meertech.tech/research
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                .
              </p>
              <Link
                href="/writing"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-100 transition-colors hover:text-white"
              >
                All writing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
