import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import { PrintButton } from '@/components/resume/PrintButton'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMeta } from '@/lib/seo'
import { SITE, EXPERIENCE, EDUCATION, CREDENTIALS, LEADERSHIP, STACK } from '@/content/site'
import { STATUS, sorted } from '@/content/projects'

const title = 'Résumé: Mahmud Sani Madobi, AI systems engineer'
const description =
  'Résumé of Mahmud Sani Madobi: AI systems engineer, software architect and founder of MeerTech Ltd. Experience, selected systems, stack, education and credentials.'
const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Résumé', href: '/resume' },
]

export const metadata: Metadata = pageMeta({ title, description, path: '/resume' })

const h2 =
  'mb-4 mt-10 border-b border-white/[0.08] pb-2 text-sm font-semibold uppercase tracking-wider text-accent-teal print:border-zinc-300 print:text-black'
const body = 'text-[15px] leading-relaxed text-zinc-400 print:text-zinc-800'
const strong = 'font-semibold text-zinc-100 print:text-black'
const meta = 'font-mono text-xs text-zinc-500 print:text-zinc-600'

export default function ResumePage() {
  const top = sorted.filter((p) => p.status === 'production' || p.status === 'substantial').slice(0, 9)
  const contact = [
    { label: SITE.email, href: `mailto:${SITE.email}` },
    { label: 'sm.meertech.tech', href: SITE.origin },
    { label: 'github.com/MEERTECHLTD', href: SITE.github },
    { label: 'linkedin.com/in/mahmud-madobi', href: SITE.linkedin },
  ]

  return (
    <div className="pt-28">
      <JsonLd path="/resume" title={title} description={description} crumbs={crumbs} />
      <div className="container-px">
        {/* header and controls */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-col gap-5 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/mahmud-sani-madobi-resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
              <PrintButton />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-accent-teal" />
            <p className="text-sm text-zinc-500">Résumé, generated from the same records as the rest of this site.</p>
          </div>
        </div>

        {/* paper */}
        <article className="resume-prose mx-auto mb-24 max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.015] p-7 sm:p-12 print:border-0 print:bg-white print:p-0 print:text-black">
          <header>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 print:text-black">{SITE.name}</h1>
            <p className="mt-1 text-base text-zinc-300 print:text-zinc-800">
              {SITE.role} · {SITE.title}
            </p>
            <p className={`mt-3 leading-loose [overflow-wrap:anywhere] ${meta}`}>
              {SITE.location}
              {contact.map((c) => (
                <span key={c.href}>
                  {' · '}
                  <a href={c.href} className="text-zinc-400 underline decoration-white/20 underline-offset-2 hover:text-zinc-200 print:text-zinc-700">
                    {c.label}
                  </a>
                </span>
              ))}
            </p>
          </header>

          <section>
            <h2 className={h2}>Profile</h2>
            <p className={body}>
              I design, build and run production systems for energy, finance and data, for places where the power, the
              network and the inputs are unreliable. I work at the systems layer: double-entry ledgers with idempotent
              writes, offline-first sync, row-level security, and AI kept inside deterministic boundaries. As founder
              of MeerTech Ltd I am responsible for the architecture of its products and client systems and for keeping
              them running.
            </p>
          </section>

          <section>
            <h2 className={h2}>Experience</h2>
            <div className="space-y-5">
              {EXPERIENCE.map((r) => (
                <div key={`${r.role}-${r.org}`} className="break-inside-avoid">
                  <div className="flex flex-col justify-between gap-x-4 sm:flex-row sm:items-baseline">
                    <h3 className={`text-base ${strong}`}>
                      {r.role}, {r.org}
                    </h3>
                    <span className={`shrink-0 whitespace-nowrap ${meta}`}>{r.when}</span>
                  </div>
                  <p className={`mt-1 ${body}`}>{r.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={h2}>Selected systems</h2>
            <ul className="space-y-2.5">
              {top.map((p) => (
                <li key={p.slug} className={`break-inside-avoid ${body}`}>
                  <Link href={`/work/${p.slug}`} className={`${strong} hover:underline`}>
                    {p.name}
                  </Link>{' '}
                  <span className={meta}>({STATUS[p.status].label.toLowerCase()})</span>. {p.summary}{' '}
                  <span className="text-zinc-500 print:text-zinc-600">{p.stack.slice(0, 5).join(', ')}.</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-zinc-500 print:text-zinc-600">
              Statuses are stated from evidence. Architecture and decisions for each: sm.meertech.tech/work
            </p>
          </section>

          <section>
            <h2 className={h2}>Technical stack</h2>
            <dl className="space-y-2">
              {STACK.map((g) => (
                <div key={g.group} className="grid gap-x-4 gap-y-0.5 break-inside-avoid sm:grid-cols-[190px_1fr]">
                  <dt className={`text-[15px] ${strong}`}>{g.group}</dt>
                  <dd className={body}>{g.items.map((i) => i.name).join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="grid gap-x-10 sm:grid-cols-2">
            <div>
              <h2 className={h2}>Education</h2>
              <ul className="space-y-2">
                {EDUCATION.map((e) => (
                  <li key={`${e.what}-${e.where}`} className={body}>
                    <span className={strong}>{e.what}</span>, {e.where} <span className={meta}>{e.when}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={h2}>Credentials and memberships</h2>
              <ul className="space-y-2">
                {CREDENTIALS.map((e) => (
                  <li key={`${e.what}-${e.where}`} className={body}>
                    <span className={strong}>{e.what}</span>, {e.where} <span className={meta}>{e.when}</span>
                  </li>
                ))}
                {LEADERSHIP.map((e) => (
                  <li key={e.role} className={body}>
                    <span className={strong}>{e.role}</span>, {e.org} <span className={meta}>{e.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className={h2}>Languages</h2>
            <p className={body}>English and Hausa.</p>
          </section>
        </article>
      </div>
    </div>
  )
}
