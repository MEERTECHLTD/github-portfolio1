import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { StatusBadge } from '@/components/work/StatusBadge'
import { JsonLd } from '@/components/seo/JsonLd'
import { abs, pageMeta } from '@/lib/seo'
import { DOMAINS, STATUS, countBy, projects, sorted, type Domain, type Status } from '@/content/projects'

const title = 'Work: systems built by Mahmud Sani Madobi'
const description =
  'Seventeen systems in energy, finance, AI and data, each classified from evidence as production, substantial, functional or prototype, with its architecture.'
const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
]

export const metadata: Metadata = pageMeta({ title, description, path: '/work' })

export default function WorkPage() {
  const list = {
    '@type': 'ItemList',
    '@id': `${abs('/work')}#list`,
    itemListElement: sorted.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: abs(`/work/${p.slug}`) })),
  }
  const statuses = Object.keys(STATUS) as Status[]
  const domains = Object.keys(DOMAINS) as Domain[]

  return (
    <>
      <JsonLd path="/work" title={title} description={description} pageType="CollectionPage" crumbs={crumbs} schema={[list]} />

      <PageHeader
        crumbs={crumbs}
        title={
          <>
            The work, and how far each piece <span className="text-gradient">got.</span>
          </>
        }
        lead={`${projects.length} systems. Each is classified from evidence I can point to: a live product, a client deployment recorded by MeerTech, a repository's history. A prototype is called a prototype.`}
      />

      <section className="relative py-14 sm:py-20" aria-labelledby="legend-h">
        <div className="container-px">
          <h2 id="legend-h" className="mb-6 font-mono text-xs font-normal uppercase tracking-[0.2em] text-zinc-500">
            How each status is defined
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statuses.map((s, i) => (
              <Reveal key={s} delay={i * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5">
                  <dt className="flex items-center justify-between gap-3">
                    <StatusBadge status={s} />
                    <span className="text-3xl font-semibold text-gradient">{countBy(s)}</span>
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-zinc-400">{STATUS[s].def}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500">
            <span className="text-zinc-300">Source.</span> &quot;Private source&quot; means the code belongs to a product
            or client and cannot be published. Open systems link to their repository.
          </p>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32" aria-label="All systems">
        <div className="container-px">
          <ProjectsGrid
            domains={domains.map((d) => ({ id: d, label: DOMAINS[d].label }))}
            statuses={statuses.map((s) => ({ id: s, label: STATUS[s].label }))}
            items={sorted.map((p) => ({ slug: p.slug, domains: p.domains, status: p.status, card: <ProjectCard project={p} /> }))}
          />
        </div>
      </section>
    </>
  )
}
