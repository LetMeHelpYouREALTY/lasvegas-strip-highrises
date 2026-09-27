import { NextRequest, NextResponse } from 'next/server'

import { submitToFollowUpBoss } from '@/lib/contact/fub'
import { saveContactLead, type ContactLeadInput } from '@/lib/contact/lead'

export const dynamic = 'force-dynamic'

const CONTACT_PHONE = '702-299-6607'

export const FRIENDLY_ERROR =
  `Sorry, something went wrong sending your message. Please call or text Dr. Jan Duffy at ${CONTACT_PHONE}.`

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return validationError('Invalid JSON body')
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return validationError('Name and email or phone are required')
  }

  const name = body.name != null ? String(body.name).trim() : ''
  const email = body.email != null ? String(body.email).trim() : ''
  const phone = body.phone != null ? String(body.phone).trim() : ''

  if (!name || (!email && !phone)) {
    return validationError('Name and email or phone are required')
  }

  const interest =
    body.interest != null ? String(body.interest).trim() : null
  const message =
    body.message != null ? String(body.message).trim() : null
  const source =
    body.source != null
      ? String(body.source).trim()
      : 'lasvegasstriphighrises.com'

  const referer = req.headers.get('referer')
  const sourceUrl =
    body.sourceUrl != null
      ? String(body.sourceUrl).trim()
      : referer?.trim() || null

  const lead: ContactLeadInput = {
    name,
    email: email || '',
    phone: phone || null,
    interest: interest || null,
    message: message || null,
    source,
  }

  if (!process.env.FOLLOW_UP_BOSS_API_KEY?.trim()) {
    console.error(
      '[contact] FOLLOW_UP_BOSS_API_KEY is not configured; cannot send lead to Follow Up Boss'
    )
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 503 })
  }

  const fubResult = await submitToFollowUpBoss({
    name: lead.name,
    email: lead.email || null,
    phone: lead.phone,
    interest: lead.interest,
    message: lead.message,
    sourceUrl,
  })

  if (!fubResult.ok) {
    if (fubResult.reason === 'fub_rejected') {
      console.error(
        '[contact] Follow Up Boss rejected event with HTTP status:',
        fubResult.status
      )
    } else {
      console.error('[contact] Follow Up Boss request failed:', fubResult.reason)
    }
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 })
  }

  const supabaseResult = await saveContactLead(lead)
  if (!supabaseResult.ok) {
    console.error(
      '[contact] Supabase secondary store failed after FUB success:',
      supabaseResult.reason,
      supabaseResult.detail ?? ''
    )
  }

  return NextResponse.json({ success: true })
}
