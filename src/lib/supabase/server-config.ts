/**
 * Read Supabase credentials at request time.
 *
 * Vercel "Sensitive" env vars are only injected at runtime, not during `next build`.
 * Next.js can inline `process.env.SUPABASE_URL` as undefined when the name is a static
 * string; dynamic `process.env[key]` lookups are resolved when the route runs.
 */
export type SupabaseServerConfig = {
  url: string
  serviceKey: string
}

const URL_KEYS = ['SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL'] as const
const SERVICE_KEY_KEYS = [
  'SUPABASE_SERVICE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SECRET_KEY',
] as const

function readRuntimeEnv(keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim()
    if (value) return value
  }
  return undefined
}

export function getSupabaseServerConfig(): SupabaseServerConfig | null {
  const url = readRuntimeEnv(URL_KEYS)
  const serviceKey = readRuntimeEnv(SERVICE_KEY_KEYS)

  if (!url || !serviceKey) {
    return null
  }

  return { url, serviceKey }
}

export function missingSupabaseConfigFields(): string[] {
  const missing: string[] = []
  if (!readRuntimeEnv(URL_KEYS)) missing.push('SUPABASE_URL')
  if (!readRuntimeEnv(SERVICE_KEY_KEYS)) missing.push('SUPABASE_SERVICE_KEY')
  return missing
}
