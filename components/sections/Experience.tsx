import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { GraduationCap, Award } from 'lucide-react'
import type { ExperienceRole } from '@/content/types'

interface ExperienceProps {
  roles: ExperienceRole[]
  education: { title: string; org: string; period: string }[]
  certifications: { name: string; issuer: string; year: string }[]
  eyebrow: string
  title: string
  intro: string
}

export function Experience({ roles, education, certifications, eyebrow, title, intro }: ExperienceProps) {
  return (
    <Section id="path" eyebrow={eyebrow} title={title} intro={intro}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Timeline */}
        <div className="relative">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent-teal/40 via-white/10 to-transparent" />
          <div className="space-y-9">
            {roles.map((role, i) => (
              <Reveal key={`${role.org}-${i}`} delay={i * 0.05}>
                <div className="relative pl-8">
                  <span className="absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-accent-teal/50 bg-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">{role.period}</p>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-50">{role.title}</h3>
                  <p className="text-sm text-accent-indigo">
                    {role.org}
                    {role.location ? <span className="text-zinc-500"> · {role.location}</span> : null}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {role.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education + certs */}
        <div className="space-y-8">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6">
              <div className="mb-4 flex items-center gap-2 text-zinc-300">
                <GraduationCap className="h-4 w-4 text-accent-teal" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((e) => (
                  <div key={e.title}>
                    <p className="text-sm font-medium text-zinc-100">{e.title}</p>
                    <p className="text-sm text-zinc-500">{e.org}</p>
                    <p className="font-mono text-xs text-zinc-600">{e.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6">
              <div className="mb-4 flex items-center gap-2 text-zinc-300">
                <Award className="h-4 w-4 text-accent-indigo" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div key={c.name} className="flex items-baseline justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-zinc-100">{c.name}</p>
                      <p className="text-xs text-zinc-500">{c.issuer}</p>
                    </div>
                    <span className="font-mono text-xs text-zinc-600">{c.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
