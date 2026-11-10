import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, PenLine } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMeta } from '@/lib/seo'
import { formatDate, getNotes } from '@/lib/writing'

const title = 'Writing: engineering notes by Mahmud Sani Madobi'
const description =
  'Engineering notes on agentic AI, financial infrastructure, offline-first systems and secure design, drawn from systems that shipped.'
const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Writing', href: '/writing' },
]
const topics = [
  'Agentic AI',
  'AI safety',
  'Backend architecture',
  'Distributed systems',
  'Financial engineering',
  'Energy infrastructure',
  'IoT and edge',
  'GIS and agricultural intelligence',
  'Offline-first engineering',
  'Secure system design',
]

export const metadata: Metadata = pageMeta({ title, description, path: '/writing' })

export default function WritingPage() {
  const notes = getNotes()
  return (
    <>
      <JsonLd path="/writing" title={title} description={description} pageType="CollectionPage" crumbs={crumbs} />

      <PageHeader
        crumbs={crumbs}
        title={
          <>
            Notes from systems that <span className="text-gradient">shipped.</span>
          </>
        }
        lead="I write about decisions I have had to live with in production. No invented results, no borrowed citations: where a note mentions a system, it is one on this site."
      />

      <section className="relative py-16 pb-24 sm:py-20 sm:pb-32">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <ol className="grid gap-4">
              {notes.map((n, i) => (
                <li key={n.slug}>
                  <Reveal delay={i * 0.06}>
                    <article className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 transition-colors hover:border-white/[0.14] sm:p-8">
                      <PenLine className="mb-3 h-4 w-4 text-accent-fuchsia" />
                      <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                        {n.category} · <time dateTime={n.date}>{formatDate(n.date)}</time> · {n.minutes} min
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                        <Link href={`/writing/${n.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                          {n.title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{n.description}</p>
                      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200">
                        Read the note
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.1}>
              <aside className="glass rounded-2xl p-6">
                <h2 className="font-mono text-xs font-normal uppercase tracking-[0.2em] text-zinc-500">What I write about</h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {topics.map((t) => (
                    <li key={t} className="chip text-[11px]">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/[0.06] pt-5 text-sm leading-relaxed text-zinc-400">
                  MeerTech&apos;s engineering team also publishes field notes on reporting absence, forecasting against
                  persistence and verifiable AI at{' '}
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
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
