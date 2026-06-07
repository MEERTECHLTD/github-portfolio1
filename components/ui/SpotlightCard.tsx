'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
}

/** Glass card with a cursor-following radial highlight. Pure CSS vars — no re-renders. */
export function SpotlightCard({ children, className, as = 'div' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const Comp = as

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Comp
      ref={ref as never}
      onMouseMove={onMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.018] p-px transition-colors duration-300 hover:border-white/[0.16]',
        className,
      )}
    >
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(129,140,248,0.12), transparent 45%)',
        }}
      />
      <div className="relative h-full rounded-[15px] p-6">{children}</div>
    </Comp>
  )
}
