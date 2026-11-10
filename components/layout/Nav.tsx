'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nav, site } from '@/lib/site'
import { BrandMark } from './BrandMark'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto mt-3 flex max-w-content items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5',
          'mx-3 sm:mx-auto',
          scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'border border-transparent',
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <BrandMark className="transition-colors group-hover:border-accent-indigo/40" />
          <span className="hidden text-sm font-medium text-zinc-200 sm:block">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-100',
                isActive(item.href) && 'bg-white/[0.04] text-zinc-100',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/resume"
            className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-zinc-100 transition-all hover:border-accent-indigo/40 hover:bg-white/[0.06] sm:inline-flex sm:items-center sm:gap-1"
          >
            Résumé
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet. The header itself has no backdrop-filter or transform, so
          this fixed layer is sized by the viewport. The height is also set in
          viewport units so it cannot collapse if an ancestor becomes a
          containing block. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[64px] z-30 h-[calc(100dvh-64px)] animate-fade-up overflow-y-auto bg-ink/80 pb-6 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="container-px">
            <div className="glass-strong rounded-2xl p-3" onClick={(e) => e.stopPropagation()}>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base text-zinc-200 transition-colors hover:bg-white/[0.05]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between rounded-xl bg-white/[0.06] px-4 py-3 text-base font-medium text-zinc-50"
              >
                Résumé <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
