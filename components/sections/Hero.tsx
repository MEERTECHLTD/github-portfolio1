import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Github, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Marquee } from '@/components/ui/Marquee'
import { site } from '@/lib/site'

interface HeroProps {
  /** Headline in two parts; the accent part takes the animated gradient. */
  headline: { lead: string; accent: string }
  subhead: string
  titles: string[]
  marquee: string[]
  stats: { value: string; label: string }[]
}

export function Hero({ headline, subhead, titles, marquee, stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: copy */}
          <div>
            <Reveal>
              <div className="chip mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
                </span>
                {site.title}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
                {headline.lead}
                <br />
                <span className="text-gradient-animated">{headline.accent}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">{subhead}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Main capabilities">
                {titles.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 rounded-full bg-zinc-50 px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-100"
                >
                  Explore my work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.07]"
                >
                  <Sparkles className="h-4 w-4 text-accent-teal" />
                  Résumé
                </Link>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-zinc-300 transition-colors hover:bg-white/[0.07] hover:text-white"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: portrait + floating stats */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="border-gradient relative aspect-[4/5] overflow-hidden rounded-3xl glass">
                <Image
                  src="/mahmud.jpg"
                  alt={`Portrait of ${site.fullName}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 400px"
                  className="object-cover object-top opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl glass-strong px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-50">{site.fullName}</p>
                    <p className="text-xs text-zinc-300">{site.role}</p>
                    <p className="mt-0.5 font-mono text-xs text-zinc-400">{site.location}</p>
                  </div>
                  <span className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-accent-teal to-accent-indigo opacity-90" />
                </div>
              </div>

              {/* floating stat chips */}
              <div className="absolute -left-4 top-8 hidden animate-float rounded-2xl glass-strong px-4 py-3 sm:block">
                <p className="text-xl font-semibold text-gradient">{stats[0]?.value}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{stats[0]?.label}</p>
              </div>
              <div
                className="absolute -right-4 bottom-32 hidden animate-float rounded-2xl glass-strong px-4 py-3 sm:block"
                style={{ animationDelay: '-3s' }}
              >
                <p className="text-xl font-semibold text-gradient">{stats[1]?.value}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{stats[1]?.label}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* tech marquee */}
      <div className="mt-20 border-y border-white/[0.06] py-5">
        <Marquee items={marquee} />
      </div>
    </section>
  )
}
