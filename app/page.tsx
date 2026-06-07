import { Hero } from '@/components/sections/Hero'
import { Footprint } from '@/components/sections/Footprint'
import { Focus } from '@/components/sections/Focus'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Research } from '@/components/sections/Research'
import { Philosophy } from '@/components/sections/Philosophy'
import { Contact } from '@/components/sections/Contact'
import { getGitHubProfile } from '@/lib/github'
import {
  bio,
  pillars,
  projects,
  skills,
  experience,
  education,
  certifications,
  narrative,
  heroTitles,
  marquee,
} from '@/content'

export default async function Home() {
  const profile = await getGitHubProfile()

  return (
    <>
      <Hero
        bio={bio}
        titles={heroTitles}
        marquee={marquee}
        stats={[
          { value: '90+', label: 'Repos engineered' },
          { value: '5+', label: 'Domains shipped' },
        ]}
      />

      <Footprint profile={profile} />

      <Focus intro={bio.founderBio} pillars={pillars} />

      <Projects
        projects={projects}
        eyebrow="Selected work"
        title="Systems, shipped"
        intro={narrative.sectionIntros?.projects ?? ''}
      />

      <Skills
        categories={skills}
        eyebrow="The stack"
        title="Engineering stack"
        intro={narrative.sectionIntros?.skills ?? ''}
      />

      <Experience
        roles={experience}
        education={education}
        certifications={certifications}
        eyebrow="The path"
        title="Experience & credentials"
        intro={narrative.sectionIntros?.experience ?? ''}
      />

      <Research
        interests={narrative.researchInterests}
        aiSafetyStatement={narrative.aiSafetyStatement}
        eyebrow="Research"
        title="Research interests"
        intro="Where I point my attention — the problems worth building deep systems around."
      />

      <Philosophy text={narrative.engineeringPhilosophy} />

      <Contact intro={narrative.sectionIntros?.contact ?? ''} />
    </>
  )
}
