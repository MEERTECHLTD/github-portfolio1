import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { GraduationCap, Award, Users, ArrowRight } from 'lucide-react'
import type { Role } from '@/content/site'

interface Entry {
  what: string
  where: string
  when: string
}

interface ExperienceProps {
  roles: Role[]
  education: readonly Entry[]
  credentials: readonly Entry[]
  leadership: readonly { role: string; org: string; when: string }[]
  eyebrow: string
  title: string
  intro: string
}

function EntryList({ entries }: { entries: readonly Entry[] }) {
  return (
    <div className="space-y-3">
      {entries.map((e) => (
        <div key={`${e.what}-${e.where}`} className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-zinc-100">{e.what}</p>
            <p className="text-xs text-zinc-500">{e.where}</p>
          </div>
          <span className="shrink-0 font-mono text-xs text-zinc-600">{e.when}</span>
        </div>
      ))}
    </div>
  )
}

export function Experience({ roles, education, credentials, leadership, eyebrow, title, intro }: ExperienceProps) {
  return (
    <Section id="path" eyebrow={eyebrow} title={title} intro={intro}>
      {/* The live site links to this section as /#experience. */}
      <span id="experience" className="absolute -top-24" aria-hidden />
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
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">{role.when}</p>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-50">{role.role}</h3>
                  <p className="text-sm text-accent-indigo first-letter:uppercase">
                    {role.org}
                    {role.where ? <span className="text-zinc-500"> · {role.where}</span> : null}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{role.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/resume"
              className="group mt-10 inline-flex items-center gap-2 pl-8 text-sm font-medium text-zinc-200 transition-colors hover:text-white"
            >
              Résumé
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Education, credentials, leadership */}
        <div className="space-y-8">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6">
              <div className="mb-4 flex items-center gap-2 text-zinc-300">
                <GraduationCap className="h-4 w-4 text-accent-teal" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Education</h3>
              </div>
              <EntryList entries={education} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6">
              <div className="mb-4 flex items-center gap-2 text-zinc-300">
                <Award className="h-4 w-4 text-accent-indigo" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Credentials and memberships</h3>
              </div>
              <EntryList entries={credentials} />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6">
              <div className="mb-4 flex items-center gap-2 text-zinc-300">
                <Users className="h-4 w-4 text-accent-fuchsia" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Leadership</h3>
              </div>
              <EntryList entries={leadership.map((l) => ({ what: l.role, where: l.org, when: l.when }))} />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
