/** Calendly events by page intent (scheduling_url values from the Calendly API). */
export const CALENDLY_EVENTS = {
  tour: 'https://calendly.com/drjanduffy/showing',
  seller: 'https://calendly.com/drjanduffy/listing-consultation',
} as const

/**
 * Calendly URL tagged with UTM. utm_source is the bare domain so the
 * Calendly → FUB Worker can map the booking to this site.
 */
export function calendlyUrl(event: keyof typeof CALENDLY_EVENTS, medium: string, campaign: string): string {
  const url = new URL(CALENDLY_EVENTS[event])
  url.searchParams.set('hide_gdpr_banner', '1')
  url.searchParams.set('utm_source', 'lasvegasstriphighrises.com')
  url.searchParams.set('utm_medium', medium)
  url.searchParams.set('utm_campaign', campaign)
  return url.toString()
}
