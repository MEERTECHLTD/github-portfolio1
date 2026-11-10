import { Mail, Linkedin, Github, Globe, ArrowUpRight, MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { site } from '@/lib/site'

const channels = [
  { icon: Mail, label: 'Email', value: site.email, href: site.links.email, rel: undefined },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/mahmud-madobi', href: site.links.linkedin, rel: 'me noopener noreferrer' },
  { icon: Github, label: 'GitHub', value: site.githubUser, href: site.links.github, rel: 'me noopener noreferrer' },
  { icon: Globe, label: 'Company projects', value: 'meertech.tech/contact', href: 'https://www.meertech.tech/contact', rel: 'noopener noreferrer' },
]

export function Contact({ intro }: { intro: string }) {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <Reveal>
          <div className="border-gradient relative overflow-hidden rounded-4xl glass-strong px-6 py-14 sm:px-12 sm:py-20">
            <div className="absolute -left-10 top-0 h-60 w-60 rounded-full bg-accent-indigo/20 blur-[100px]" />
            <div className="absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-accent-teal/15 blur-[100px]" />

            <div className="relative mx-auto max-w-2xl text-center">
              <div className="chip mx-auto mb-6">
                <MapPin className="h-3 w-3 text-accent-teal" />
                {site.location} · Working with teams worldwide
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                Let&apos;s build something that has to <span className="text-gradient">work</span>.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">{intro}</p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={`${site.links.email}?subject=${encodeURIComponent('Hello Mahmud')}`}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.07]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.rel ? '_blank' : undefined}
                    rel={c.rel}
                    className="group flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.16]"
                  >
                    <c.icon className="h-5 w-5 text-zinc-300" />
                    <span className="text-xs font-medium text-zinc-300">{c.label}</span>
                    <span className="flex max-w-full items-center gap-0.5 font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400">
                      <span className="min-w-0 break-all">{c.value}</span>
                      <ArrowUpRight className="h-2.5 w-2.5 shrink-0" />
                    </span>
                  </a>
                ))}
              </div>

              <p className="mt-8 font-mono text-xs text-zinc-600">Languages: English and Hausa</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
