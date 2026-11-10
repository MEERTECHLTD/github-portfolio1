import type { MetadataRoute } from 'next'
import { SITE } from '@/content/site'
import { projects } from '@/content/projects'
import { getNotes } from '@/lib/writing'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.origin}/` },
    { url: `${SITE.origin}/work` },
    { url: `${SITE.origin}/writing` },
    { url: `${SITE.origin}/resume` },
    ...projects.map((p) => ({ url: `${SITE.origin}/work/${p.slug}` })),
    ...getNotes().map((n) => ({ url: `${SITE.origin}/writing/${n.slug}`, lastModified: n.date })),
  ]
}
