import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  crumbs: { name: string; href: string }[]
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  narrow?: boolean
}

/** Header for inner pages: breadcrumb, page title and lead, in the home page's type scale. */
export function PageHeader({ crumbs, title, lead, children, narrow }: PageHeaderProps) {
  return (
    <section className="relative pt-32 sm:pt-40">
      <div className="container-px">
        <div className={cn(narrow && 'mx-auto max-w-3xl')}>
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="mb-6 flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-500">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="h-3 w-3 text-zinc-700" aria-hidden />}
                    {i < crumbs.length - 1 ? (
                      <Link href={c.href} className="transition-colors hover:text-zinc-200">
                        {c.name}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-accent-teal/90">
                        {c.name}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">{lead}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.15}>{children}</Reveal>}
        </div>
      </div>
    </section>
  )
}
