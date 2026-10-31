import assert from 'node:assert/strict'
import { test } from 'node:test'

import { checkSpam, looksRandomName, MIN_FILL_MS, verifyTurnstile } from './spam'

const now = 1_800_000_000_000
const human = { name: 'Maria Lopez', startedAt: now - 20_000, now }

test('a normal person passes', () => {
  assert.equal(checkSpam(human), null)
})

test('filled honeypot is spam', () => {
  assert.equal(checkSpam({ ...human, honeypot: 'https://x.example' }), 'honeypot')
})

test('direct API post with no start time is spam', () => {
  assert.equal(checkSpam({ ...human, startedAt: undefined }), 'missing_started_at')
  assert.equal(checkSpam({ ...human, startedAt: 'abc' }), 'missing_started_at')
})

test('form sent faster than a person can type is spam', () => {
  assert.equal(checkSpam({ ...human, startedAt: now - (MIN_FILL_MS - 1) }), 'too_fast')
})

test('random-string names from real bot leads are caught', () => {
  for (const name of [
    'GPplRSiOJfBjZPhxd',
    'TUoRVncuzZdAWxFuhZy ELxiNKPibbVYXWWz',
    'WUYjMUeVwDBOtePOWuB CeJeacjHofOHbsLaGLB',
  ]) {
    assert.equal(looksRandomName(name), true, name)
  }
})

test('real names with inner capitals are kept', () => {
  for (const name of [
    'Ronald McDonald',
    "Siobhan O'Brien-McNamara",
    'DeAngelo VanDerBeek',
    'Jean-Luc LaFontaine',
    'Edward Sweks',
  ]) {
    assert.equal(looksRandomName(name), false, name)
  }
})

test('turnstile is skipped when no secret is configured', async () => {
  assert.equal(await verifyTurnstile(undefined, { secret: '' }), true)
})

test('turnstile rejects a missing token when configured', async () => {
  assert.equal(await verifyTurnstile('', { secret: 's' }), false)
})

test('turnstile follows the siteverify answer', async () => {
  const ok = (async () => new Response(JSON.stringify({ success: true }))) as typeof fetch
  const bad = (async () => new Response(JSON.stringify({ success: false }))) as typeof fetch
  assert.equal(await verifyTurnstile('t', { secret: 's', fetchFn: ok }), true)
  assert.equal(await verifyTurnstile('t', { secret: 's', fetchFn: bad }), false)
})
