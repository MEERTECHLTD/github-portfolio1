import { STATUS, type Status } from '@/content/projects'
import { cn } from '@/lib/utils'

const tone: Record<Status, { dot: string; text: string; border: string }> = {
  production: { dot: 'bg-accent-teal', text: 'text-accent-teal', border: 'border-accent-teal/25 bg-accent-teal/10' },
  substantial: { dot: 'bg-accent-indigo', text: 'text-accent-indigo', border: 'border-accent-indigo/25 bg-accent-indigo/10' },
  functional: { dot: 'bg-accent-amber', text: 'text-accent-amber', border: 'border-accent-amber/25 bg-accent-amber/10' },
  prototype: { dot: 'bg-zinc-400', text: 'text-zinc-300', border: 'border-white/10 bg-white/[0.03]' },
}

/** Status label for a system. `pill` is the bordered chip; `plain` is the quiet mono line used in card footers. */
export function StatusBadge({ status, variant = 'pill', className }: { status: Status; variant?: 'pill' | 'plain'; className?: string }) {
  const t = tone[status]
  if (variant === 'plain') {
    return (
      <span className={cn('inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500', className)}>
        <span className={cn('h-1.5 w-1.5 rounded-full', t.dot)} />
        {STATUS[status].label}
      </span>
    )
  }
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium',
        t.border,
        t.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', t.dot)} />
      {STATUS[status].label}
    </span>
  )
}
