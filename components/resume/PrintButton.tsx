'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/[0.07]"
    >
      <Printer className="h-4 w-4" /> Print
    </button>
  )
}
