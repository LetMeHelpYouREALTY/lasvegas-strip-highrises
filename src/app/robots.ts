import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },
    ],
    sitemap: 'https://lasvegasstriphighrises.com/sitemap.xml',
  }
}
