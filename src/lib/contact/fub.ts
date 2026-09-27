const SITE = 'lasvegasstriphighrises.com'
const FORM_NAME = 'Contact Form'

export type FubLeadInput = {
  name: string
  email?: string | null
  phone?: string | null
  interest?: string | null
  message?: string | null
  sourceUrl?: string | null
}

export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: '', lastName: '' }
  if (parts.length === 1) return { firstName: parts[0], lastName: '' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

export function buildFubEventBody(lead: FubLeadInput): Record<string, unknown> {
  const { firstName, lastName } = splitName(lead.name)
  const summaryParts: string[] = []
  if (lead.interest?.trim()) summaryParts.push(`Interested in: ${lead.interest.trim()}`)

  const visitorMessage = lead.message?.trim() ?? ''
  const message =
    [visitorMessage, ...summaryParts].filter(Boolean).join('\n\n') ||
    'Contact form submission (no message field)'

  const sourceUrl =
    lead.sourceUrl?.trim() || `https://${SITE}/contact`

  const emails = lead.email?.trim() ? [{ value: lead.email.trim() }] : []
  const phones = lead.phone?.trim() ? [{ value: lead.phone.trim() }] : []

  return {
    source: SITE,
    system: SITE,
    type: 'General Inquiry',
    message,
    description: `${FORM_NAME} — ${sourceUrl}`,
    sourceUrl,
    person: {
      firstName,
      lastName,
      emails,
      phones,
      tags: [SITE, FORM_NAME],
    },
  }
}

export type FubSubmitResult =
  | { ok: true }
  | { ok: false; reason: 'missing_api_key' | 'fub_rejected' | 'fetch_failed'; status?: number }

type SubmitOptions = {
  apiKey?: string
  fetchFn?: typeof fetch
}

export async function submitToFollowUpBoss(
  lead: FubLeadInput,
  options?: SubmitOptions
): Promise<FubSubmitResult> {
  const apiKey = options?.apiKey ?? process.env.FOLLOW_UP_BOSS_API_KEY
  if (!apiKey?.trim()) {
    return { ok: false, reason: 'missing_api_key' }
  }

  const fetchFn = options?.fetchFn ?? fetch
  const authorization = `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`
  const body = buildFubEventBody(lead)

  try {
    const res = await fetchFn('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
      return { ok: false, reason: 'fub_rejected', status: res.status }
    }

    return { ok: true }
  } catch {
    return { ok: false, reason: 'fetch_failed' }
  }
}
