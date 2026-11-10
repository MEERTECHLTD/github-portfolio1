import Link from 'next/link'
import { Lock, Code2, GitBranch, ArrowUpRight } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { StatusBadge } from '@/components/work/StatusBadge'
import { cn } from '@/lib/utils'
import { DOMAINS, type Domain, type Project } from '@/content/projects'

const domainAccent: Record<Domain, string> = {
  energy: 'text-accent-teal',
  ai: 'text-accent-indigo',
  finance: 'text-accent-amber',
  tooling: 'text-accent-fuchsia',
  data: 'text-zinc-300',
}

export function ProjectCard({ project }: { project: Project }) {
  const primary = project.domains[0]!
  const isPrivate = project.visibility === 'Private source'

  return (
    <SpotlightCard as="article" className="h-full">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className={cn('font-mono text-[11px] uppercase tracking-wider', domainAccent[primary])}>
            {DOMAINS[primary].label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
            {isPrivate ? <Lock className="h-2.5 w-2.5" /> : <Code2 className="h-2.5 w-2.5" />}
            {project.visibility}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-zinc-50">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1 outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-accent-indigo"
          >
            {project.name}
            <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-accent-indigo" />
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{project.tagline}</p>

        {project.decisions.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {project.decisions.slice(0, 3).map((d) => (
              <li key={d.title} className="flex gap-2 text-[13px] leading-snug text-zinc-400">
                <GitBranch className="mt-0.5 h-3 w-3 shrink-0 text-zinc-600" />
                <span>{d.title}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-zinc-500"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 border-t border-white/[0.05] pt-3">
            <StatusBadge status={project.status} variant="plain" />
          </p>
        </div>
      </div>
    </SpotlightCard>
  )
}
