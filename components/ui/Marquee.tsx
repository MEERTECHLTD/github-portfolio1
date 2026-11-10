import { cn } from '@/lib/utils'

/** Infinite horizontal marquee. Duplicates content for a seamless loop. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('group relative flex overflow-hidden mask-fade-r', className)}>
      <div className="flex shrink-0 animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <Pill key={`a-${i}`}>{t}</Pill>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused]"
      >
        {items.map((t, i) => (
          <Pill key={`b-${i}`}>{t}</Pill>
        ))}
      </div>
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-1.5 font-mono text-sm text-zinc-400">
      {children}
    </span>
  )
}
