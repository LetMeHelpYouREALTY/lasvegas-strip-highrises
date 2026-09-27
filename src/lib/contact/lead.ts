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

/** Server-side fallback when DB persistence is unavailable — do not lose the lead silently. */
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
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? null,
        interest: lead.interest ?? null,
        message: lead.message ?? null,
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
    console.error(
      '[contact] Supabase config missing at runtime; expected env:',
      missing.join(', ')
    )
    logLeadForManualRecovery('missing_supabase_config', lead)
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
    console.error('[contact] Supabase insert failed:', error.message, error)
    logLeadForManualRecovery(`supabase_insert_failed: ${error.message}`, lead)
    return { ok: false, reason: 'insert_failed', detail: error.message }
  }

  return { ok: true, storage: 'supabase' }
}
