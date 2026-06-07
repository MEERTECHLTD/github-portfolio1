import type { Metadata } from 'next'
import { ResumeView } from '@/components/resume/ResumeView'
import { resumes } from '@/content'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Résumé',
  description: `Tailored résumé editions for ${site.fullName} — founder, AI systems engineer, applied-AI/R&D, and a one-page recruiter scan.`,
}

export default function ResumePage() {
  return <ResumeView variants={resumes} />
}
