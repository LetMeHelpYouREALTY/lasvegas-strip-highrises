'use client'
import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'lasvegasstriphighrises.com',
          sourceUrl: window.location.href,
        }),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') return (
    <div className="bg-yellow-950 border border-yellow-700 rounded-xl p-6 text-center">
      <p className="text-yellow-400 font-bold text-lg mb-2">Got it — I&apos;ll be in touch shortly.</p>
      <p className="text-gray-300 text-sm">Or call direct: <a href="tel:7022996607" className="text-yellow-400 font-semibold">702-299-6607</a></p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: false },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-medium text-gray-400 mb-1">{f.label}{f.required && ' *'}</label>
          <input name={f.name} type={f.type} required={f.required}
            className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500 text-sm" />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Interested In</label>
        <select name="interest" className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500">
          <option value="">Select a building...</option>
          {['Turnberry Place','Palms Place','Panorama Towers','One Las Vegas','Waldorf Astoria Residences','The Martin','Veer Towers','Trump International','Multiple / Not Sure'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
        <textarea name="message" rows={3}
          className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500" />
      </div>
      {state === 'error' && (
        <p className="text-red-400 text-sm">
          Sorry, something went wrong sending your message. Please call or text Dr. Jan Duffy at{' '}
          <a href="tel:7022996607" className="underline font-semibold">702-299-6607</a>.
        </p>
      )}
      <button type="submit" disabled={state === 'loading'}
        className="w-full bg-yellow-500 text-gray-950 font-bold py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-60">
        {state === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
