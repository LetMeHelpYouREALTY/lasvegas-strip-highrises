import { NextRequest, NextResponse } from 'next/server'

import { saveContactLead, type ContactLeadInput } from '@/lib/contact/lead'

export const dynamic = 'force-dynamic'

const FRIENDLY_ERROR =
  'We could not save your message right now. Please call 702-299-6607 or email janet.duffy@bhhsnv.com and we will help you right away.'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, interest, message, source } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const lead: ContactLeadInput = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      interest: interest ? String(interest).trim() : null,
      message: message ? String(message).trim() : null,
      source: source ? String(source).trim() : 'lasvegasstriphighrises.com',
    }

    const result = await saveContactLead(lead)

    if (!result.ok) {
      return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 503 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected handler error:', err)
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 503 })
  }
}
