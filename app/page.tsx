import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Footprint } from '@/components/sections/Footprint'
import { Focus } from '@/components/sections/Focus'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Research } from '@/components/sections/Research'
import { Philosophy } from '@/components/sections/Philosophy'
import { Contact } from '@/components/sections/Contact'
import { JsonLd } from '@/components/seo/JsonLd'
import { getGitHubFootprint } from '@/lib/github'
import { getNotes } from '@/lib/writing'
import { pageMeta } from '@/lib/seo'
import { SITE, PRINCIPLES, EXPERIENCE, LEADERSHIP, EDUCATION, CREDENTIALS, STACK } from '@/content/site'
import { DOMAINS, countBy, featured, projects } from '@/content/projects'

const title = 'Mahmud Sani Madobi: AI systems engineer and software architect'
const description =
  'AI systems engineer, software architect and founder of MeerTech Ltd in Abuja, Nigeria. Production systems for energy, finance and data, built for real-world constraints.'

export const metadata: Metadata = pageMeta({ title, description, path: '/', ogType: 'profile' })

const capabilities = [
  'AI systems and agents',
  'Backend and distributed systems',
  'Financial infrastructure',
  'Energy and IoT',
  'Geospatial intelligence',
  'Offline-first architecture',
]

export default async function Home() {
  const github = await getGitHubFootprint()
  const notes = getNotes()

  return (
    <>
      <JsonLd path="/" title={title} description={description} pageType="ProfilePage" />

      <Hero
        headline={{ lead: 'Building intelligent systems for the', accent: 'real world.' }}
        subhead={`I'm ${SITE.name}, an AI systems engineer and software architect. I design, build and run software for energy, finance and data: systems that have to stay correct when the power, the network and the inputs do not.`}
        titles={capabilities}
        marquee={STACK.flatMap((g) => g.items.map((i) => i.name))}
        stats={[
          { value: `${countBy('production')}`, label: 'Systems in production' },
          { value: `${projects.length}`, label: 'Systems documented' },
        ]}
      />

      <Footprint
        github={github}
        counts={{ production: countBy('production'), substantial: countBy('substantial') }}
        domains={Object.values(DOMAINS).map((d) => d.label)}
      />

      <Focus
        eyebrow="Engineering identity"
        title="I build for the environments most software ignores."
        lead="Intermittent power, unreliable networks, and users who cannot afford a system that loses their money or their data. That constraint shapes every decision I make as an engineer and as a founder."
        body="I founded MeerTech Ltd to build and operate that kind of software. Today the company runs systems in production for mini-grid operators, exporters, a state agriculture programme and a national statistics agency, and I am responsible for how each one is designed."
      />

      <Projects
        projects={featured}
        total={projects.length}
        eyebrow="Selected work"
        title="Six systems, each stated by status"
        intro="Production means someone depends on it today. Anything else is called what it is."
      />

      <Skills
        groups={STACK}
        eyebrow="The stack"
        title="A stack with receipts"
        intro="Every technology below is tied to a system on this site that uses it. Nothing is listed on the strength of a tutorial."
      />

      <Experience
        roles={EXPERIENCE}
        education={EDUCATION}
        credentials={CREDENTIALS}
        leadership={LEADERSHIP}
        eyebrow="The path"
        title="Experience and credentials"
        intro="Roles as I list them on LinkedIn. One employer is described instead of named."
      />

      <Research
        notes={notes}
        eyebrow="Research and writing"
        title="Notes from systems that shipped"
        intro="I write about engineering decisions I have had to live with."
        interests="My research interests are deterministic boundaries for AI agents, ledgers for unreliable networks, offline-first sync, and geospatial decision support."
      />

      <Philosophy
        quote={{
          lead: 'A system is not reliable because it rarely fails. It is reliable because, when it fails, it fails',
          accent: 'in a way you chose.',
        }}
        paragraphs={[
          'So I choose the failures first. A payment that is retried must find its own earlier result. A device that was offline for days must sync without overwriting newer truth. A model that is unsure must be refused by code that is not. A figure with no basis must be reported as missing.',
          'I ship fast, with AI assistance, and then I earn the right to keep what I shipped: migrations, tests, continuous integration, and a status label that says exactly how far each system has got.',
        ]}
        principles={PRINCIPLES}
      />

      <Contact intro="I am open to engineering roles and collaborations, AI research partnerships, speaking invitations, technical consulting and enterprise work through MeerTech." />
    </>
  )
}
