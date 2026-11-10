import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { bySlug } from '@/content/projects'
import type { STACK } from '@/content/site'

interface SkillsProps {
  groups: typeof STACK
  eyebrow: string
  title: string
  intro: string
}

export function Skills({ groups, eyebrow, title, intro }: SkillsProps) {
  return (
    <Section id="stack" eyebrow={eyebrow} title={title} intro={intro}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.05}>
            <div className="group h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 transition-colors hover:border-white/[0.14]">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                <h3 className="text-sm font-semibold tracking-tight text-zinc-100">{group.group}</h3>
              </div>
              <p className="mb-4 text-[13px] leading-snug text-zinc-500">{group.line}</p>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className="inline-block rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors group-hover:text-zinc-300">
                      {item.name}
                    </span>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">
                      <span className="sr-only">Used in </span>
                      {item.used.map((slug, k) => (
                        <span key={slug}>
                          {k > 0 && ', '}
                          <Link href={`/work/${slug}`} className="text-zinc-500 transition-colors hover:text-zinc-200">
                            {bySlug[slug]?.name ?? slug}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
