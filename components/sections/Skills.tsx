import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import type { SkillCategory } from '@/content/types'

export function Skills({ categories, eyebrow, title, intro }: { categories: SkillCategory[]; eyebrow: string; title: string; intro: string }) {
  return (
    <Section id="stack" eyebrow={eyebrow} title={title} intro={intro}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.name} delay={(i % 3) * 0.05}>
            <div className="group h-full rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 transition-colors hover:border-white/[0.14]">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                <h3 className="text-sm font-semibold tracking-tight text-zinc-100">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors group-hover:text-zinc-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
