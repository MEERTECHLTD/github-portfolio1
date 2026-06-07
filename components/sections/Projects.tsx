'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/types'

const ALL = 'All'

export function Projects({ projects, eyebrow, title, intro }: { projects: Project[]; eyebrow: string; title: string; intro: string }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category))
    return [ALL, ...Array.from(set)]
  }, [projects])

  const [active, setActive] = useState<string>(ALL)

  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active)

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

        <Reveal delay={0.05}>
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm transition-all',
                  active === c
                    ? 'border-white/20 bg-white/[0.08] text-zinc-50'
                    : 'border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:text-zinc-200',
                )}
              >
                {c === ALL ? c : c.replace(' & ', ' / ').split(' / ')[0]}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
