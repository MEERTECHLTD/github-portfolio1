'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

const ALL = 'all'

export interface GridItem {
  slug: string
  domains: string[]
  status: string
  card: ReactNode
}
export interface FilterOption {
  id: string
  label: string
}

interface ProjectsGridProps {
  items: GridItem[]
  domains: FilterOption[]
  /** When given, a second row of filters by status is shown. */
  statuses?: FilterOption[]
}

/** Filterable card grid. Cards are rendered on the server and passed in. */
export function ProjectsGrid({ items, domains, statuses }: ProjectsGridProps) {
  const [domain, setDomain] = useState<string>(ALL)
  const [status, setStatus] = useState<string>(ALL)

  const filtered = items.filter(
    (p) => (domain === ALL || p.domains.includes(domain)) && (status === ALL || p.status === status),
  )

  const row = (label: string, options: FilterOption[], active: string, set: (v: string) => void) => (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={`Filter by ${label}`}>
      {[{ id: ALL, label: 'All' }, ...options].map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => set(o.id)}
          aria-pressed={active === o.id}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm transition-all',
            active === o.id
              ? 'border-white/20 bg-white/[0.08] text-zinc-50'
              : 'border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:text-zinc-200',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <Reveal delay={0.05}>
        <div className="mb-10 space-y-3">
          {row('domain', domains, domain, setDomain)}
          {statuses && row('status', statuses, status, setStatus)}
          {statuses && (
            <p className="pt-1 font-mono text-xs text-zinc-600" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'system' : 'systems'}
            </p>
          )}
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
              {p.card}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <p className="text-sm text-zinc-500">No systems match both filters.</p>}
    </>
  )
}
