import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function Section({ id, eyebrow, title, intro, children, className, align = 'left' }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-20 sm:py-28', className)}>
      <div className="container-px">
        {(eyebrow || title || intro) && (
          <Reveal>
            <div className={cn('mb-12 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
              {eyebrow && (
                <div className={cn('mb-4 flex items-center gap-2.5', align === 'center' && 'justify-center')}>
                  <span className="h-px w-7 bg-gradient-to-r from-accent-teal/0 via-accent-teal to-accent-indigo" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-teal/90">
                    {eyebrow}
                  </span>
                </div>
              )}
              {title && (
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  {title}
                </h2>
              )}
              {intro && <p className="mt-4 text-base leading-relaxed text-zinc-400">{intro}</p>}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
