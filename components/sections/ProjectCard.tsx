import { Lock, ArrowUpRight, Cpu, GitBranch } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/types'

const depthLabel: Record<Project['depthAssessment'], string> = {
  'substantial-system': 'Substantial system',
  'solid-product': 'Shipped product',
  'functional-app': 'Functional app',
  'early-scaffold': 'Early build',
}

const categoryAccent: Record<string, string> = {
  'Energy & Climate Infrastructure': 'text-accent-teal',
  'Applied AI & Agents': 'text-accent-indigo',
  'Fintech & Payments': 'text-accent-amber',
  'Developer Tooling & Productivity': 'text-accent-fuchsia',
  'Platforms & SaaS': 'text-zinc-300',
}

export function ProjectCard({ project }: { project: Project }) {
  const accent = categoryAccent[project.category] ?? 'text-zinc-300'
  const hasAI = project.aiCapabilities.length > 0

  return (
    <SpotlightCard as="article" className="h-full">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className={cn('font-mono text-[11px] uppercase tracking-wider', accent)}>
            {project.category.split(' ')[0]}
          </span>
          {project.isPrivate ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
              <Lock className="h-2.5 w-2.5" /> Private
            </span>
          ) : project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-300 transition-colors hover:border-accent-indigo/40 hover:text-white"
            >
              Code <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          ) : null}
        </div>

        <h3 className="text-lg font-semibold text-zinc-50">{project.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{project.tagline}</p>

        {project.observedSignals.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {project.observedSignals.slice(0, 3).map((s) => (
              <li key={s} className="flex gap-2 text-[13px] leading-snug text-zinc-400">
                <GitBranch className="mt-0.5 h-3 w-3 shrink-0 text-zinc-600" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5">
          {hasAI && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/25 bg-accent-indigo/10 px-2.5 py-1 text-[11px] font-medium text-accent-indigo">
              <Cpu className="h-3 w-3" />
              {project.aiCapabilities[0]}
            </div>
          )}
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
          <p className="mt-4 border-t border-white/[0.05] pt-3 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
            {depthLabel[project.depthAssessment]}
          </p>
        </div>
      </div>
    </SpotlightCard>
  )
}
