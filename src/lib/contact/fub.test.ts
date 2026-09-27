import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'

import {
  buildFubEventBody,
  submitToFollowUpBoss,
  type FubLeadInput,
} from './fub'

describe('buildFubEventBody', () => {
  it('maps contact fields to FUB General Inquiry event shape', () => {
    const lead: FubLeadInput = {
      name: 'Jane Buyer',
      email: 'jane@example.com',
      phone: '7025551212',
      interest: 'Turnberry Place',
      message: 'Looking for a 2BR',
      sourceUrl: 'https://lasvegasstriphighrises.com/contact',
    }

    const body = buildFubEventBody(lead)

    assert.equal(body.type, 'General Inquiry')
    assert.equal(body.source, 'lasvegasstriphighrises.com')
    assert.deepEqual(body.person, {
      firstName: 'Jane',
      lastName: 'Buyer',
      emails: [{ value: 'jane@example.com' }],
      phones: [{ value: '7025551212' }],
      tags: ['lasvegasstriphighrises.com', 'Contact Form'],
    })
    assert.match(String(body.message), /Looking for a 2BR/)
    assert.match(String(body.message), /Turnberry Place/)
  })
})

describe('submitToFollowUpBoss', () => {
  it('POSTs to FUB events API with Basic auth when fetch succeeds', async () => {
    const fetchMock = mock.fn(async (url: string, init?: RequestInit) => {
      assert.equal(url, 'https://api.followupboss.com/v1/events')
      assert.equal(init?.method, 'POST')
      const headers = init?.headers as Record<string, string>
      assert.match(headers.Authorization, /^Basic /)
      assert.equal(headers['Content-Type'], 'application/json')
      return new Response(null, { status: 201 })
    })

    const result = await submitToFollowUpBoss(
      { name: 'Test User', email: 'test@example.com' },
      { apiKey: 'test-key-not-real', fetchFn: fetchMock as typeof fetch }
    )

    assert.equal(result.ok, true)
    assert.equal(fetchMock.mock.callCount(), 1)
  })

  it('returns fub_rejected when response is not 2xx', async () => {
    const fetchMock = mock.fn(async () => new Response('nope', { status: 403 }))

    const result = await submitToFollowUpBoss(
      { name: 'Test User', email: 'test@example.com' },
      { apiKey: 'test-key-not-real', fetchFn: fetchMock as typeof fetch }
    )

    assert.equal(result.ok, false)
    if (!result.ok) {
      assert.equal(result.reason, 'fub_rejected')
      assert.equal(result.status, 403)
    }
  })
})
