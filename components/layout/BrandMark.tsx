import Image from 'next/image'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Brand tile showing Mahmud's photo (replaces the MM monogram). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]',
        className,
      )}
    >
      <Image
        src="/mahmud.jpg"
        alt={site.fullName}
        fill
        sizes="32px"
        className="object-cover object-top"
      />
    </span>
  )
}
