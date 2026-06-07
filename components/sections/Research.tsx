import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ShieldCheck, FlaskConical } from 'lucide-react'
import type { ResearchInterest } from '@/content/types'

export function Research({
  interests,
  aiSafetyStatement,
  eyebrow,
  title,
  intro,
}: {
  interests: ResearchInterest[]
  aiSafetyStatement: string
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <Section id="research" eyebrow={eyebrow} title={title} intro={intro}>
      <div className="grid gap-4 sm:grid-cols-2">
        {interests.map((r, i) => (
          <Reveal key={r.title} delay={(i % 2) * 0.06}>
            <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 transition-colors hover:border-white/[0.14]">
              <FlaskConical className="mb-3 h-4 w-4 text-accent-fuchsia" />
              <h3 className="text-base font-semibold text-zinc-50">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{r.blurb}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="border-gradient relative mt-5 overflow-hidden rounded-2xl glass p-7 sm:p-9">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent-teal/10 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-teal/25 bg-accent-teal/10">
              <ShieldCheck className="h-5 w-5 text-accent-teal" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-50">Trustworthy &amp; safe AI</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">{aiSafetyStatement}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
