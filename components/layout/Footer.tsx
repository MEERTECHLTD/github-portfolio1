import Link from 'next/link'
import { Github, Linkedin, Twitter, Globe, Mail } from 'lucide-react'
import { site, nav } from '@/lib/site'
import { BrandMark } from './BrandMark'

const socials = [
  { icon: Github, href: site.links.github, label: 'GitHub' },
  { icon: Linkedin, href: site.links.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: site.links.twitter, label: 'X' },
  { icon: Globe, href: site.links.website, label: 'Meertech' },
  { icon: Mail, href: site.links.email, label: 'Email' },
]

export function Footer() {
  const year = 2026
  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      <div className="container-px">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark />
              <span className="text-sm font-medium text-zinc-200">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {site.role} building production AI, energy, and fintech systems from {site.location}.
            </p>
          </div>

          <div className="flex gap-14">
            <nav className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-xs uppercase tracking-widest text-zinc-600">Navigate</span>
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-zinc-400 transition-colors hover:text-zinc-100">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-xs uppercase tracking-widest text-zinc-600">Connect</span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center">
          <p>
            © {year} {site.fullName}. Founder of{' '}
            <a href={site.companyUrl} className="text-zinc-400 hover:text-zinc-200">
              {site.company}
            </a>
            .
          </p>
          <p className="font-mono">Built with Next.js · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
