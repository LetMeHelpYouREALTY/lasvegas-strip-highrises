/**
 * Bot checks for the contact form, run before a lead is sent to Follow Up Boss.
 *
 * Bot leads seen in FUB (Oct 2026): random-string names such as
 * "GPplRSiOJfBjZPhxd", dotted Gmail addresses, and posts made straight to
 * /api/contact without loading the page.
 */

export const HONEYPOT_FIELD = 'company_website'
export const STARTED_AT_FIELD = 'formStartedAt'
export const MIN_FILL_MS = 3000

export type SpamReason =
  | 'honeypot'
  | 'missing_started_at'
  | 'too_fast'
  | 'random_name'
  | 'turnstile_failed'

export type SpamCheckInput = {
  honeypot?: unknown
  startedAt?: unknown
  name: string
  now?: number
}

/**
 * A name token looks machine-made when it is long and has capitals scattered
 * through it, e.g. "GPplRSiOJfBjZPhxd" or "ELxiNKPibbVYXWWz". Real names
 * ("McDonald", "DeAngelo", "O'Brien-Smith") have at most a couple of inner capitals.
 */
export function looksRandomName(name: string): boolean {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .some((token) => {
      if (token.length < 10) return false
      const innerCaps = token.slice(1).replace(/[^A-Z]/g, '').length
      return innerCaps >= 4
    })
}

export function checkSpam(input: SpamCheckInput): SpamReason | null {
  const honeypot = input.honeypot != null ? String(input.honeypot).trim() : ''
  if (honeypot) return 'honeypot'

  const startedAt = Number(input.startedAt)
  if (!Number.isFinite(startedAt) || startedAt <= 0) return 'missing_started_at'

  const now = input.now ?? Date.now()
  if (now - startedAt < MIN_FILL_MS) return 'too_fast'

  if (looksRandomName(input.name)) return 'random_name'

  return null
}

type FetchFn = typeof fetch

/**
 * Cloudflare Turnstile server check. Only runs when TURNSTILE_SECRET_KEY is set,
 * so the form keeps working until the keys are added in Vercel.
 */
export async function verifyTurnstile(
  token: unknown,
  options?: { secret?: string; fetchFn?: FetchFn; remoteIp?: string | null }
): Promise<boolean> {
  const secret = options?.secret ?? process.env.TURNSTILE_SECRET_KEY
  if (!secret?.trim()) return true

  const value = token != null ? String(token).trim() : ''
  if (!value) return false

  const fetchFn = options?.fetchFn ?? fetch
  const form = new URLSearchParams({ secret, response: value })
  if (options?.remoteIp) form.set('remoteip', options.remoteIp)

  try {
    const res = await fetchFn('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}
