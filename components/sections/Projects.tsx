import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { ProjectsGrid } from './ProjectsGrid'
import { Reveal } from '@/components/ui/Reveal'
import { DOMAINS, type Domain, type Project } from '@/content/projects'

interface ProjectsProps {
  projects: Project[]
  total: number
  eyebrow: string
  title: string
  intro: string
}

export function Projects({ projects, total, eyebrow, title, intro }: ProjectsProps) {
  const present = new Set(projects.flatMap((p) => p.domains))
  const domains = (Object.keys(DOMAINS) as Domain[]).filter((d) => present.has(d)).map((d) => ({ id: d, label: DOMAINS[d].label }))

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-px">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-px w-7 bg-gradient-to-r from-accent-teal/0 via-accent-teal to-accent-indigo" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-teal/90">{eyebrow}</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">{intro}</p>
          </div>
        </Reveal>

        <ProjectsGrid
          domains={domains}
          items={projects.map((p) => ({ slug: p.slug, domains: p.domains, status: p.status, card: <ProjectCard project={p} /> }))}
        />

        <Reveal>
          <div className="mt-10">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.07]"
            >
              All {total} systems, with their evidence
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
