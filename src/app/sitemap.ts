import { MetadataRoute } from 'next'
import { buildings } from '@/lib/buildings'

const BASE = 'https://lasvegasstriphighrises.com'
const lastmod = process.env.BUILD_DATE_ISO ?? new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages = ['', '/about', '/contact', '/blog', '/buildings', '/amenities', '/privacy-policy'].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: lastmod,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1.0 : 0.8,
  }))
  const building_pages = buildings.map((b) => ({
    url: `${BASE}/buildings/${b.slug}`,
    lastModified: lastmod,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
  return [...static_pages, ...building_pages]
}
