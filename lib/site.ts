/**
 * Central site configuration — identity, contact, and social links.
 * Single source of truth used across metadata, nav, footer, and contact.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://sm.meertech.tech'

export const site = {
  name: 'Mahmud Madobi',
  fullName: 'Sani Mahmud Madobi',
  initials: 'MM',
  role: 'AI Systems Engineer & Founder',
  company: 'Meertech Ltd',
  companyUrl: 'https://meertech.tech',
  location: 'Abuja, Nigeria',
  url: siteUrl,
  githubUser: 'MEERTECHLTD',
  email: 'sanimahmudmadobi@gmail.com',
  phone: '+234 902 441 9077',
  phoneHref: 'tel:+2349024419077',
  telegram: 'https://t.me/xcorp01',
  links: {
    github: 'https://github.com/MEERTECHLTD',
    linkedin: 'https://www.linkedin.com/in/mahmud-madobi',
    twitter: 'https://x.com/MEERTECHLtd',
    website: 'https://meertech.tech',
    email: 'mailto:sanimahmudmadobi@gmail.com',
  },
} as const

export const nav = [
  { label: 'Focus', href: '#focus' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Path', href: '#path' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
] as const
