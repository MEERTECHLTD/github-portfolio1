/* A plain-text profile for language-model crawlers, generated from the same
   data as the pages. An optional aid; the HTML is the source of truth. */
import { SITE, EXPERIENCE, EDUCATION, CREDENTIALS, PRINCIPLES } from '@/content/site'
import { sorted, STATUS, DOMAINS } from '@/content/projects'
import { getNotes } from '@/lib/writing'

export const dynamic = 'force-static'

export function GET() {
  const notes = getNotes()
  const u = (p: string) => SITE.origin + p
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Also written: Mahmud Madobi, Sani Mahmud Madobi. Role: ${SITE.role}; ${SITE.title}. Location: ${SITE.location}. Languages: English, Hausa.`,
    '',
    'Specialisations: AI systems and agents, backend and distributed systems, financial infrastructure (double-entry ledgers, idempotent APIs), energy and IoT software, geospatial intelligence, offline-first architecture, secure multi-tenant systems.',
    '',
    '## Engineering principles',
    ...PRINCIPLES.map((p) => `- ${p.name}: ${p.text}`),
    '',
    `## Systems (status vocabulary: ${Object.values(STATUS)
      .map((s) => `${s.label} = ${s.def}`)
      .join(' ')})`,
    ...sorted.map(
      (p) =>
        `- [${p.name}](${u(`/work/${p.slug}`)}) (${STATUS[p.status].label}; ${p.domains.map((d) => DOMAINS[d].label).join(', ')}): ${p.summary}`,
    ),
    '',
    '## Experience',
    ...EXPERIENCE.map((r) => `- ${r.role}, ${r.org} (${r.when})`),
    '',
    '## Education and credentials',
    ...EDUCATION.map((e) => `- ${e.what}, ${e.where} (${e.when})`),
    ...CREDENTIALS.map((e) => `- ${e.what}, ${e.where} (${e.when})`),
    '',
    '## Writing',
    ...notes.map((n) => `- [${n.title}](${u(`/writing/${n.slug}`)}): ${n.description}`),
    '',
    '## Links',
    `- Portfolio: ${SITE.origin}`,
    `- Résumé: ${u('/resume')}`,
    `- Company: ${SITE.company}`,
    `- GitHub: ${SITE.github}`,
    `- LinkedIn: ${SITE.linkedin}`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
