import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Check, Code2, Lock } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { FlowDiagram } from '@/components/work/FlowDiagram'
import { StatusBadge } from '@/components/work/StatusBadge'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMeta, projectSchema } from '@/lib/seo'
import { DOMAINS, STATUS, bySlug, projects, type Project } from '@/content/projects'

export const dynamicParams = false
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }))

function seo(p: Project) {
  const long = `${p.name}: architecture and decisions | Mahmud Sani Madobi`
  const mid = `${p.name}: architecture and engineering decisions`
  const title = long.length <= 64 ? long : mid.length <= 70 ? mid : `${p.name}: architecture and decisions`
  const description = `${p.summary} Status: ${STATUS[p.status].label.toLowerCase()}.`.slice(0, 168)
  return { title, description, path: `/work/${p.slug}` }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug[(await params).slug]
  return p ? pageMeta(seo(p)) : {}
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug[(await params).slug]
  if (!p) notFound()

  const { title, description, path } = seo(p)
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: p.name, href: path },
  ]
  const i = projects.indexOf(p)
  const next = projects[(i + 1) % projects.length]!
  const related = projects.filter((q) => q.slug !== p.slug && q.domains[0] === p.domains[0]).slice(0, 3)
  const isPrivate = p.visibility === 'Private source'
  const facts = [
    { term: 'Built for', value: p.builtFor },
    { term: 'Status', value: `${STATUS[p.status].label}. ${STATUS[p.status].def}` },
    { term: 'Evidence', value: p.evidence },
    ...(p.boundary ? [{ term: 'Boundary', value: p.boundary }] : []),
    {
      term: 'Source',
      value: isPrivate
        ? 'Private source. The code belongs to a product or client and cannot be published.'
        : 'Public source. The repository is linked from this page.',
    },
  ]

  return (
    <>
      <JsonLd path={path} title={title} description={description} pageType="ItemPage" crumbs={crumbs} schema={[projectSchema(p, path)]} />

      <PageHeader crumbs={crumbs} title={p.name} lead={p.tagline}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <StatusBadge status={p.status} />
          {p.domains.map((d) => (
            <span key={d} className="chip">
              {DOMAINS[d].label}
            </span>
          ))}
          <span className="chip">
            {isPrivate ? <Lock className="h-3 w-3 text-zinc-500" /> : <Code2 className="h-3 w-3 text-accent-teal" />}
            {p.visibility}
          </span>
        </div>
        {p.links && p.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.links.map((l, k) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  k === 0
                    ? 'inline-flex items-center gap-2 rounded-full bg-zinc-50 px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-100'
                    : 'inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.07]'
                }
              >
                {l.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </PageHeader>

      {/* Summary and problem */}
      <section className="relative py-20 sm:py-28" aria-labelledby="summary-h">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="h-px w-7 bg-gradient-to-r from-accent-teal/0 via-accent-teal to-accent-indigo" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-teal/90">Summary</span>
                </div>
                <h2 id="summary-h" className="text-2xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl">
                  {p.summary}
                </h2>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">The problem</h3>
                <p className="mt-4 text-lg leading-relaxed text-zinc-300">{p.problem}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <dl className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.018] px-6">
                  {facts.map((f) => (
                    <div
                      key={f.term}
                      className="grid gap-1 border-b border-white/[0.06] py-4 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-6"
                    >
                      <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500 sm:pt-0.5">{f.term}</dt>
                      <dd className="text-sm leading-relaxed text-zinc-300">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <Section
        eyebrow="Architecture"
        title="How it fits together"
        intro="The system as a pipeline, in the order a request or a record moves through it."
        className="border-y border-white/[0.06]"
      >
        <FlowDiagram name={p.name} flow={p.flow} />
        <Reveal>
          <div className="mt-10">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Stack</h3>
            <ul className="flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-zinc-400"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Decisions */}
      <Section eyebrow="Decisions" title="The decisions that shaped it">
        <ol className="grid gap-4 lg:grid-cols-3">
          {p.decisions.map((d, k) => (
            <li key={d.title} className="h-full">
              <Reveal delay={(k % 3) * 0.06} className="h-full">
                <SpotlightCard className="h-full">
                  <span className="font-mono text-xs text-accent-teal/90">{String(k + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-base font-semibold text-zinc-50">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{d.text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Security and data */}
      <section className="relative border-y border-white/[0.06] py-20 sm:py-28">
        <div className="container-px">
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 sm:p-8">
                <h2 className="font-mono text-xs font-normal uppercase tracking-[0.2em] text-accent-teal/90">Security</h2>
                {p.security.length > 0 ? (
                  <ul className="mt-5 space-y-3">
                    {p.security.map((s) => (
                      <li key={s} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                    A research model with no deployment has no security surface worth describing. Saying so is better
                    than inventing one.
                  </p>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 sm:p-8">
                <h2 className="font-mono text-xs font-normal uppercase tracking-[0.2em] text-accent-teal/90">Data</h2>
                <p className="mt-5 text-lg leading-relaxed text-zinc-300">{p.data}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related and next */}
      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          {related.length > 0 && (
            <>
              <h2 className="mb-6 font-mono text-xs font-normal uppercase tracking-[0.2em] text-zinc-500">Related systems</h2>
              <ul className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((q) => (
                  <li key={q.slug} className="h-full">
                    <SpotlightCard className="h-full">
                      <StatusBadge status={q.status} />
                      <h3 className="mt-3 text-base font-semibold text-zinc-50">
                        <Link href={`/work/${q.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                          {q.name}
                        </Link>
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{q.tagline}</p>
                    </SpotlightCard>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link
            href={`/work/${next.slug}`}
            className="border-gradient group relative flex flex-col gap-2 overflow-hidden rounded-3xl glass px-6 py-8 sm:px-10 sm:py-10"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Next system</span>
            <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              {next.name}
              <ArrowRight className="h-6 w-6 shrink-0 text-accent-teal transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-sm text-zinc-400">{next.tagline}</span>
          </Link>
        </div>
      </section>
    </>
  )
}
