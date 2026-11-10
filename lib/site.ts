/**
 * Central site configuration. Identity and contact details are read from
 * content/site.ts, the single source of truth for facts on this site.
 */
import { SITE } from '@/content/site'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || SITE.origin

export const site = {
  name: SITE.short,
  fullName: SITE.name,
  role: SITE.role,
  title: SITE.title,
  company: 'MeerTech Ltd',
  companyUrl: SITE.company,
  location: SITE.location,
  tagline: SITE.tagline,
  description: SITE.description,
  url: siteUrl,
  githubUser: SITE.github.replace('https://github.com/', ''),
  email: SITE.email,
  links: {
    github: SITE.github,
    linkedin: SITE.linkedin,
    website: SITE.company,
    email: `mailto:${SITE.email}`,
  },
} as const

/** Primary navigation. Anchors are absolute so they work from every page. */
export const nav = [
  { label: 'Focus', href: '/#focus' },
  { label: 'Work', href: '/work' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Path', href: '/#path' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/#contact' },
] as const
