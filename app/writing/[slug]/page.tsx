import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatusBadge } from '@/components/work/StatusBadge'
import { JsonLd } from '@/components/seo/JsonLd'
import { article, pageMeta } from '@/lib/seo'
import { formatDate, getNote, getNotes, type Note } from '@/lib/writing'
import { bySlug } from '@/content/projects'
import { site } from '@/lib/site'

export const dynamicParams = false
export const generateStaticParams = () => getNotes().map((n) => ({ slug: n.slug }))

function seo(n: Note) {
  const long = `${n.title} | Mahmud Sani Madobi`
  return { title: long.length <= 70 ? long : n.title, description: n.description, path: `/writing/${n.slug}` }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = getNote((await params).slug)
  return n ? pageMeta({ ...seo(n), ogType: 'article', published: n.date }) : {}
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const n = getNote((await params).slug)
  if (!n) notFound()

  const { title, description, path } = seo(n)
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Writing', href: '/writing' },
    { name: n.title, href: path },
  ]
  const systems = n.systems.map((s) => bySlug[s]).filter((p) => p !== undefined)

  return (
    <>
      <JsonLd
        path={path}
        title={title}
        description={description}
        crumbs={crumbs}
        schema={[article({ path, title: n.title, description: n.description, date: n.date, words: n.words })]}
      />

      <PageHeader
        narrow
        crumbs={[crumbs[0]!, crumbs[1]!, { name: n.category, href: path }]}
        title={n.title}
        lead={n.description}
      >
        <p className="mt-6 font-mono text-xs text-zinc-500">
          {site.fullName} · <time dateTime={n.date}>{formatDate(n.date)}</time> · {n.minutes} min read
        </p>
      </PageHeader>

      <article className="relative py-14 pb-24 sm:py-16 sm:pb-32">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-12">
              <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h2:text-zinc-50 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-zinc-300 prose-a:text-accent-indigo prose-strong:text-zinc-100 prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:text-accent-teal prose-code:before:content-none prose-code:after:content-none prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-white/[0.08] prose-pre:bg-ink-50 prose-pre:text-[13px] prose-pre:leading-relaxed prose-li:text-zinc-300 prose-li:marker:text-accent-teal [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{n.body}</ReactMarkdown>
              </div>
            </div>

            {systems.length > 0 && (
              <aside className="mt-10" aria-labelledby="systems-h">
                <h2 id="systems-h" className="mb-4 font-mono text-xs font-normal uppercase tracking-[0.2em] text-zinc-500">
                  Systems mentioned
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {systems.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/work/${p.slug}`}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.018] px-5 py-4 text-sm font-medium text-zinc-100 transition-colors hover:border-white/[0.16]"
                      >
                        {p.name}
                        <StatusBadge status={p.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <Link
              href="/writing"
              className="mt-10 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" /> All writing
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
