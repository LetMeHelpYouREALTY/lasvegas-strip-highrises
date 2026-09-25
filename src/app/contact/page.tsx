import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Dr. Jan Duffy | Las Vegas Strip High-Rise Expert',
  description: 'Contact Las Vegas Strip high-rise condo expert Dr. Jan Duffy. Turnberry Place, Palms Place, Panorama, CityCenter specialists. Call 702-299-6607.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com/contact' },
}

export default function ContactPage() {
  return (
    <main className="bg-gray-950 min-h-screen">
      <section className="py-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Start Your High-Rise Search</h1>
          <p className="text-gray-400">Tell me which buildings interest you — I&apos;ll pull current listings and give you the real story on each one.</p>
        </div>
      </section>
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <ContactForm />
          <aside className="space-y-6">
            <div>
              <h3 className="font-bold text-yellow-400 mb-3">Direct Contact</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="tel:7022996607" className="text-yellow-400 hover:underline font-semibold">📞 702-299-6607</a></li>
                <li><a href="sms:7022221964" className="text-gray-400 hover:text-yellow-400">💬 Text 702-222-1964</a></li>
                <li><a href="mailto:janet.duffy@bhhsnv.com" className="text-gray-400 hover:text-yellow-400">✉️ janet.duffy@bhhsnv.com</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">Office</h3>
              <address className="not-italic text-sm text-gray-500">
                7475 W Sahara Ave, Suite 100<br />Las Vegas, NV 89117
              </address>
              <p className="mt-2 text-sm text-gray-500">Hours: Monday–Sunday, 8:00 AM–8:00 PM</p>
            </div>
            <div className="border border-yellow-900/40 rounded-xl p-4 text-sm">
              <p className="text-yellow-400 font-bold mb-2">Good Questions to Ask Me:</p>
              <ul className="space-y-1 text-gray-400">
                <li>✦ Which buildings allow short-term rentals?</li>
                <li>✦ What are the real HOA fees all-in?</li>
                <li>✦ Which floors have unobstructed Strip views?</li>
                <li>✦ Hotel rental program — what&apos;s the actual ROI?</li>
                <li>✦ Which buildings have the best resale history?</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
