/** Shared content types. Data files in /content conform to these. */

export type ProjectCategory =
  | 'Energy & Climate Infrastructure'
  | 'Applied AI & Agents'
  | 'Fintech & Payments'
  | 'Developer Tooling & Productivity'
  | 'Platforms & SaaS'

export type DepthAssessment = 'substantial-system' | 'solid-product' | 'functional-app' | 'early-scaffold'

export interface Project {
  slug: string
  name: string
  repoName?: string
  tagline: string
  category: ProjectCategory
  /** Detail fields are intentionally omitted from the public data file for client confidentiality. */
  problem?: string
  whatItDoes?: string
  architecture?: string
  stack: string[]
  aiCapabilities: string[]
  observedSignals: string[]
  highlights?: string[]
  depthAssessment: DepthAssessment
  isPrivate: boolean
  repoUrl: string | null
  demoUrl: string | null
  confidence: 'high' | 'medium' | 'low'
  featured?: boolean
}

export interface Bio {
  heroTagline: string
  heroSubhead: string
  oneLiner: string
  shortBio: string
  founderBio: string
  technicalBio: string
}

export interface SkillCategory {
  name: string
  skills: string[]
  rationale: string
}

export interface ResumeVariant {
  key: 'founder' | 'ai-engineer' | 'research' | 'recruiter-concise'
  title: string
  audience: string
  markdown: string
}

export interface ResearchInterest {
  title: string
  blurb: string
}

export interface Narrative {
  engineeringPhilosophy: string
  researchInterests: ResearchInterest[]
  aiSafetyStatement: string
  sectionIntros: Record<string, string>
}

export interface ExperienceRole {
  title: string
  org: string
  period: string
  location?: string
  bullets: string[]
}

export interface Pillar {
  key: string
  title: string
  description: string
  signals: string[]
}
