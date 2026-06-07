'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Printer, ArrowLeft, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'
import type { ResumeVariant } from '@/content/types'

export function ResumeView({ variants }: { variants: ResumeVariant[] }) {
  const [active, setActive] = useState(0)
  const current = variants[active]

  return (
    <div className="pt-28">
      <div className="container-px">
        {/* header / controls */}
        <div className="mb-8 flex flex-col gap-5 print:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/[0.07]"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <FileText className="h-4 w-4 text-accent-teal" />
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">Résumé</h1>
            </div>
            <p className="text-sm text-zinc-500">
              Tailored editions of {site.fullName}&apos;s résumé. Choose the lens that fits your context.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={v.key}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full border px-4 py-2 text-left text-sm transition-all',
                  active === i
                    ? 'border-white/20 bg-white/[0.08] text-zinc-50'
                    : 'border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:text-zinc-200',
                )}
              >
                <span className="font-medium">{v.title}</span>
                <span className="ml-2 hidden text-xs text-zinc-500 sm:inline">{v.audience}</span>
              </button>
            ))}
          </div>
        </div>

        {/* paper */}
        <article className="mx-auto mb-24 max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.015] p-7 sm:p-12 print:border-0 print:bg-white print:p-0 print:text-black">
          <div className="resume-prose prose prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mb-1 prose-h2:mt-8 prose-h2:text-base prose-h2:font-semibold prose-h2:uppercase prose-h2:tracking-wider prose-h2:text-accent-teal prose-h3:text-base prose-h3:mb-0 prose-p:text-zinc-400 prose-li:text-zinc-400 prose-strong:text-zinc-100 prose-a:text-accent-indigo print:prose-headings:text-black print:prose-h2:text-black print:prose-p:text-zinc-800 print:prose-li:text-zinc-800 print:prose-strong:text-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{current.markdown}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}
