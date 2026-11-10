import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Mahmud Sani Madobi' },
  description:
    'That page does not exist on sm.meertech.tech. Start from the home page, the work index or the writing index instead.',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center pt-32">
      <div className="container-px">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-teal/90">404</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl">
          Nothing is <span className="text-gradient">here.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          This address does not exist, or it moved when the site was rebuilt.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.07]"
          >
            Work
          </Link>
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.07]"
          >
            Writing
          </Link>
        </div>
      </div>
    </section>
  )
}
