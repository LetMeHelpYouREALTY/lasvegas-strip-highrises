import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import {
  getSupabaseServerConfig,
  missingSupabaseConfigFields,
} from '@/lib/supabase/server-config'

export type ContactLeadInput = {
  name: string
  email: string
  phone?: string | null
  interest?: string | null
  message?: string | null
  source?: string | null
}

export type SaveLeadResult =
  | { ok: true; storage: 'supabase' }
  | { ok: false; reason: 'missing_config' | 'insert_failed'; detail?: string }

function createSupabaseAdminClient(): SupabaseClient | null {
  const config = getSupabaseServerConfig()
  if (!config) return null
  return createClient(config.url, config.serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

function maskEmail(email: string | null | undefined): string | null {
  if (!email) return null
  const [user, domain] = email.split('@')
  if (!domain) return '***'
  return `${user.slice(0, 1)}***@${domain}`
}

function maskPhone(phone: string | null | undefined): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 4 ? `***${digits.slice(-4)}` : '***'
}

/**
 * Note a backup-store problem without writing the lead's name, email, phone
 * or message into the logs. This only runs after Follow Up Boss accepted the
 * lead, so the full record is already safe there.
 */
export function logLeadForManualRecovery(
  reason: string,
  lead: ContactLeadInput
): void {
  console.error(
    '[contact-lead-fallback]',
    JSON.stringify({
      reason,
      receivedAt: new Date().toISOString(),
      lead: {
        email: maskEmail(lead.email),
        phone: maskPhone(lead.phone),
        interest: lead.interest ?? null,
        source: lead.source ?? null,
      },
    })
  )
}

export async function saveContactLead(
  lead: ContactLeadInput
): Promise<SaveLeadResult> {
  const supabase = createSupabaseAdminClient()
  if (!supabase) {
    const missing = missingSupabaseConfigFields()
    console.warn(
      '[contact] Supabase backup not set up (lead is in Follow Up Boss); missing env:',
      missing.join(', ')
    )
    return { ok: false, reason: 'missing_config' }
  }

  const { error } = await supabase.from('leads').insert({
    name: lead.name,
    email: lead.email,
    phone: lead.phone || null,
    interest: lead.interest || null,
    message: lead.message || null,
    source: lead.source || 'lasvegasstriphighrises.com',
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[contact] Supabase insert failed:', error.message)
    logLeadForManualRecovery(`supabase_insert_failed: ${error.message}`, lead)
    return { ok: false, reason: 'insert_failed', detail: error.message }
  }

  return { ok: true, storage: 'supabase' }
}
