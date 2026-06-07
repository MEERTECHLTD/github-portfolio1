import data from './data.json'
import type { Bio, ExperienceRole, Narrative, Pillar, Project, ResumeVariant, SkillCategory } from './types'

/** Generated content (evidence-grounded from real repo analysis). */
export const projects = data.projects as Project[]
export const bio = data.bio as Bio
export const skills = data.skills as SkillCategory[]
export const narrative = data.narrative as Narrative
export const experience = data.experience as ExperienceRole[]
export const resumes = data.resumes as ResumeVariant[]
export const seo = data.seo as {
  title: string
  description: string
  keywords: string[]
  ogTitle: string
  ogDescription: string
  twitterCard: string
}

/** Featured (substantial / shipped) projects, in curated order. */
export const featuredProjects = projects.filter((p) => p.featured)

/** Hero title chips. */
export const heroTitles = [
  'AI Systems Engineer',
  'Software Architect',
  'Backend Engineer',
  'Applied AI',
  'AI Safety & Security',
]

/** Curated tech marquee — the stack actually shipped with. */
export const marquee = [
  'TypeScript',
  'Python',
  'FastAPI',
  'Next.js',
  'PostgreSQL',
  'Supabase',
  'React Native · Expo',
  'Anthropic Claude',
  'PostGIS',
  'Redis · Celery',
  'Docker',
  'GitHub Actions',
  'Solana',
  'Prometheus · Grafana',
  'SQLAlchemy',
  'Prisma',
  'RLS · pgTAP',
  'WebSockets',
]

/** Education & certifications (stable CV facts). */
export const education = [
  {
    title: 'BSc, Computer Science & Information Technology',
    org: 'Federal University Dutsin-Ma',
    period: '2024',
  },
  { title: 'Software Engineering Programme', org: 'ALX Africa', period: '2025' },
  { title: 'Java Programming Certification', org: 'Aptech Computer Education', period: '2022' },
]

export const certifications = [
  { name: 'HCIA-AI', issuer: 'Huawei', year: '2024' },
  { name: 'HCIA-Datacom', issuer: 'Huawei', year: '2023' },
  { name: 'Java Programming', issuer: 'Aptech', year: '2022' },
]

/** Engineering pillars — the founder's three core domains, grounded in the portfolio. */
export const pillars: Pillar[] = [
  {
    key: 'energy',
    title: 'Energy-access infrastructure',
    description:
      'The largest cluster of the portfolio: ERP and monitoring for mini-grid deployments, STS prepaid-token vending for Nigerian meters, and edge telemetry pipelines — the full stack of rural electrification, from hardware to payment rails.',
    signals: ['Mini-grid ERP', 'STS token vending', 'Victron · TBB telemetry', 'Field verification'],
  },
  {
    key: 'fintech',
    title: 'Fintech & payment rails',
    description:
      'Multi-tenant payment platforms engineered at the systems layer: atomic double-entry ledgers that refuse unbalanced journals, idempotent replay-safe vend flows, and BaaS / virtual-account integrations behind pluggable, circuit-breaking provider abstractions.',
    signals: ['Double-entry ledger', 'Idempotent vend/fund', 'Schema-per-tenant', 'BaaS integrations'],
  },
  {
    key: 'ai',
    title: 'Applied AI & agents',
    description:
      'AI treated as a component inside a deterministic envelope: CNN crop-disease detection, RAG and Claude/Gemini assistants, government-scale agronomic intelligence, and autonomous on-chain agents — every model decision validated by hard, post-hoc safety gates.',
    signals: ['CNN inference', 'RAG · MCP', 'LLM safety gates', 'Autonomous agents'],
  },
  {
    key: 'tooling',
    title: 'Offline-first & secure-by-construction',
    description:
      'Software for intermittent power and unreliable networks: local-first SQLite with exponential-backoff sync, deny-by-default RLS, append-only audit logs, and SHA-256 evidence integrity — systems where invalid states are unrepresentable.',
    signals: ['Local-first sync', 'Deny-by-default RLS', 'Append-only audit', 'Evidence integrity'],
  },
]
