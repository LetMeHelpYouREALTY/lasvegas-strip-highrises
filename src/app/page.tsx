import type { Metadata } from 'next'
import Link from 'next/link'
import { buildings } from '@/lib/buildings'

export const metadata: Metadata = {
  title: 'Las Vegas Strip High-Rise Condos For Sale | Expert Buyer Guide',
  description: 'Las Vegas Strip high-rise condo expert — Turnberry Place, Palms Place, Panorama Towers, CityCenter, Waldorf Astoria & more. Dr. Jan Duffy, BHHS Nevada · 702-299-6607.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Dr. Jan Duffy — Las Vegas Strip High-Rise Specialist',
  url: 'https://lasvegasstriphighrises.com',
  telephone: '702-299-6607',
  description: 'Las Vegas Strip high-rise condo specialist. Turnberry Place, Palms Place, Panorama Towers, CityCenter, Veer, Waldorf Astoria, Trump International.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7475 W Sahara Ave, Suite 100',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89117',
    addressCountry: 'US',
  },
  areaServed: 'Las Vegas Strip, NV',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        {/* Hero — dark luxury */}
        <section className="relative bg-gray-950 text-white py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-yellow-950 opacity-80" />
          <div className="relative max-w-5xl mx-auto">
            <p className="text-yellow-400 text-sm font-semibold mb-3 uppercase tracking-widest">
              Las Vegas Strip · High-Rise Condos
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Live Above<br />
              <span className="text-yellow-400">The Strip</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              8 iconic buildings. Penthouse views. Expert guidance on every floor plan,
              HOA fee, and rental program from a 35-year Las Vegas specialist.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/buildings" className="bg-yellow-500 text-gray-950 font-bold px-7 py-3 rounded-lg hover:bg-yellow-400 transition">
                Browse Buildings
              </a>
              <a href="tel:7022996607" className="border-2 border-yellow-500 text-yellow-400 font-semibold px-7 py-3 rounded-lg hover:bg-yellow-950 transition">
                Call 702-299-6607
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-yellow-500 py-6 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: '8', label: 'Iconic Buildings' },
              { n: '35+', label: 'Years Las Vegas' },
              { n: '$500K–$5M+', label: 'Price Range' },
              { n: '702-299-6607', label: 'Call Direct' },
            ].map((s) => (
              <div key={s.n}>
                <div className="text-2xl font-bold text-gray-950">{s.n}</div>
                <div className="text-yellow-900 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Buildings Grid */}
        <section className="py-16 px-4 bg-gray-950">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-3">
              Las Vegas Strip High-Rise Buildings
            </h2>
            <p className="text-center text-gray-400 mb-10">
              From ultra-luxury branded residences to investment-friendly hotel-condos.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {buildings.map((b) => (
                <Link key={b.slug} href={`/buildings/${b.slug}`}
                  className="group border border-gray-800 rounded-xl p-5 hover:border-yellow-500 hover:bg-gray-900 transition"
                >
                  <h3 className="font-bold text-white group-hover:text-yellow-400 mb-1 transition">{b.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{b.tagline}</p>
                  <p className="text-yellow-400 font-bold text-sm">{b.priceRange}</p>
                  <p className="text-gray-600 text-xs mt-1">{b.stories} stories · {b.yearBuilt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why High-Rise */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                High-Rise Buying Is Different.<br />
                <span className="text-yellow-400">So Is My Expertise.</span>
              </h2>
              <p className="text-gray-400 mb-4">
                Strip high-rise transactions involve hotel rental programs, HOA transfer fees,
                special assessment history, view corridor protections, and rental restriction nuances
                that most agents never encounter. I&apos;ve worked these buildings for 35+ years.
              </p>
              <p className="text-gray-400 mb-6">
                Whether you&apos;re buying a pied-à-terre, a full-time luxury residence, or a
                cash-flowing rental unit, I can tell you which buildings deliver — and which come
                with hidden costs.
              </p>
              <a href="/contact" className="inline-block bg-yellow-500 text-gray-950 font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
                Get Expert High-Rise Guidance →
              </a>
            </div>
            <div className="border border-yellow-900/40 rounded-xl p-6 bg-gray-950">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">What I Help You Navigate</h3>
              {[
                'Hotel rental program ROI — actual numbers, not projections',
                'HOA fees, transfer fees & capital reserves',
                'View corridor risk — will a new building block your view?',
                'Special assessment history per building',
                'Which floor & orientation maximizes value on resale',
                'Buyer broker agreement & 3% commission structure',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 mb-3 text-sm text-gray-300">
                  <span className="text-yellow-500 mt-0.5">✦</span>
                  <span>{item}</span>
                </div>
              ))}
              <a href="tel:7022996607" className="block mt-5 bg-yellow-500 text-gray-950 font-bold text-center py-3 rounded-lg hover:bg-yellow-400 transition">
                Call 702-299-6607
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black border-t border-yellow-900/30 py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Ready to Find Your Strip High-Rise?
            </h2>
            <p className="text-gray-400 mb-6">
              Tell me your budget, lifestyle goals, and whether you want rental income —
              I&apos;ll match you to the right building and the right floor.
            </p>
            <a href="/contact" className="inline-block bg-yellow-500 text-gray-950 font-bold px-8 py-4 rounded-lg hover:bg-yellow-400 transition text-lg">
              Start Your High-Rise Search
            </a>
            <p className="text-gray-500 text-sm mt-4">Or call/text: 702-299-6607 · Dr. Jan Duffy</p>
          </div>
        </section>
      </main>
    </>
  )
}
