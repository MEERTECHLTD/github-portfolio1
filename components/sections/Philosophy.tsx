import { Reveal } from '@/components/ui/Reveal'

export function Philosophy({ text }: { text: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-px">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-teal/90">
              Engineering philosophy
            </span>
            <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight text-zinc-200 sm:text-3xl">
              <span className="text-gradient">“</span>
              {text}
              <span className="text-gradient">”</span>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
