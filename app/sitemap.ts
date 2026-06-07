import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-06-07')
  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/resume`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
