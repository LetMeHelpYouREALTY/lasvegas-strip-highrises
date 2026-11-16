import type { Metadata } from 'next'
import Link from 'next/link'
import { buildings } from '@/lib/buildings'
import { breadcrumbListJsonLd } from '@/lib/seo/breadcrumbs'
import { faqPageJsonLd } from '@/lib/seo/faq'
import { JsonLd } from '@/lib/seo/json-ld'
import { calendlyUrl } from '@/lib/calendly'

const GUIDE_PATH = '/buying-a-las-vegas-strip-high-rise-condo'
const SITE = 'https://lasvegasstriphighrises.com'

export const metadata: Metadata = {
  title: { absolute: 'Buy a Las Vegas Strip High-Rise Condo | Buyer Guide' },
  description:
    'How buying a Las Vegas Strip high-rise condo works: residential vs condo-hotel towers, the Nevada resale package, HOA questions and private tours.',
  alternates: { canonical: `${SITE}${GUIDE_PATH}` },
}

const buyerAgentJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE}/#agent`,
  name: 'Dr. Jan Duffy',
  url: SITE,
  telephone: '702-299-6607',
  description:
    'Las Vegas Strip high-rise condo buying specialist — HOA resale packages, rental-program rules, and private tower tours.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7475 W Sahara Ave, Suite 100',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89117',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'Place',
    name: 'Las Vegas Strip high-rise corridor',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Clark County',
      containedInPlace: {
        '@type': 'State',
        name: 'Nevada',
      },
    },
  },
}

const guideFaqs = [
  {
    question: 'How long do I have to cancel after receiving the HOA resale package in Nevada?',
    answer:
      'For condominiums governed by NRS chapter 116, Nevada law generally gives buyers five calendar days after receipt of the required resale package to cancel the purchase contract without penalty (NRS 116.4109). For condominium hotels under NRS chapter 116B, the same five-calendar-day right applies, but cancellation must be delivered by hand delivery or U.S. mail as described in NRS 116B.760. Always confirm the exact delivery rules and documents with your agent and attorney before the five-day period ends.',
  },
  {
    question: 'How does a residential Strip tower differ from a condo-hotel unit?',
    answer:
      'Residential high-rise condos are intended for owner occupancy, with rental limits set in the HOA declaration and house rules. Condo-hotel units are often tied to a hotel operator and may allow participation in a rental pool when programs are active. Insurance and day-to-day use can differ between the two. Review the declaration, resale disclosures, and any hotel or rental agreements for the specific unit before you rely on a rental strategy.',
  },
] as const

const breadcrumbs = breadcrumbListJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Buying a Strip High-Rise Condo', path: GUIDE_PATH },
])

const buyerCalendly = calendlyUrl('buyer', 'website', 'buyer-guide')

export default function BuyingStripHighRiseGuidePage() {
  return (
    <>
      <JsonLd data={[buyerAgentJsonLd, breadcrumbs, faqPageJsonLd([...guideFaqs])]} />
      <main className="bg-gray-950 min-h-screen">
        <section className="py-16 px-4 bg-black border-b border-yellow-900/30">
          <div className="max-w-4xl mx-auto">
            <p className="text-yellow-400 text-sm font-semibold mb-3 uppercase tracking-widest">
              Las Vegas Strip · Buyers
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Buying a Las Vegas Strip high-rise condo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Strip towers share an address, but not the same ownership rules. This guide walks through the resale
              package, HOA documents, rental-program questions, and how to compare buildings before you tour.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={buyerCalendly}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 text-gray-950 font-bold px-7 py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Book a buyer consultation
                <span className="sr-only"> (opens Calendly in a new tab)</span>
              </a>
              <Link
                href="/sell-your-las-vegas-strip-high-rise-condo"
                className="border-2 border-yellow-500 text-yellow-400 font-semibold px-7 py-3 rounded-lg hover:bg-yellow-950 transition"
              >
                What&apos;s my condo worth?
              </Link>
              <a
                href="tel:7022996607"
                className="border-2 border-yellow-500 text-yellow-400 font-semibold px-7 py-3 rounded-lg hover:bg-yellow-950 transition"
              >
                Call 702-299-6607
              </a>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 max-w-4xl mx-auto text-gray-300 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Residential towers vs condo-hotel units</h2>
            <p className="leading-relaxed">
              Some Strip high-rises are built for full-time owners; others are structured as condo-hotels with optional
              hotel rental programs. The recorded declaration, house rules, and any hotel agreements—not the marketing
              name—define how you can occupy the unit, rent it, and what fees apply. Your agent should request those
              documents for every building on your short list before you write an offer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">The Nevada resale package</h2>
            <p className="leading-relaxed mb-3">
              Sellers must provide a resale package that includes governing documents and a summary of reserves as
              required by Nevada law (NRS 116.4109(1) for condominiums). Buyers typically receive budgets, rules, and
              information about pending litigation or special assessments. Read the package before your inspection
              contingency expires.
            </p>
            <p className="leading-relaxed">
              Nevada generally gives buyers five calendar days after receipt of the required resale package to cancel
              without penalty (NRS 116.4109). Condominium hotels follow NRS 116B.760, which includes the same
              five-calendar-day window with specific hand-delivery or U.S. mail requirements for cancellation. Confirm
              timing and delivery methods in writing with your agent and escrow officer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">HOA budgets, reserves, and assessments</h2>
            <p className="leading-relaxed">
              Compare current-year HOA budgets, the reserve summary, and any disclosed special assessments. Ask when the
              board last studied long-term repair costs and whether transfer or move-in fees apply in your building.
              Parking assignments, storage lockers, and pet rules also live in the HOA documents—not in the MLS remarks.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Rental programs and house rules</h2>
            <p className="leading-relaxed">
              Minimum lease terms, transient-use limits, and hotel-pool participation vary by tower. If rental income
              matters to your purchase, verify the current rules in the declaration and any active hotel or rental
              management agreement. Rules can change after a board vote, so rely on recorded documents rather than
              prior listings or anecdotes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Tours and building-specific research</h2>
            <p className="leading-relaxed mb-4">
              Strip high-rise tours usually require appointment access through the front desk or listing agent, plus
              elevator and parking coordination. Dr. Jan Duffy schedules private showings and can request HOA resale
              paperwork while you compare floor plans and view corridors.
            </p>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Strip high-rise buildings on this site</h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {buildings.map((b) => (
                <li key={b.slug}>
                  <Link href={`/buildings/${b.slug}`} className="text-yellow-400 hover:underline">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              Need the full index?{' '}
              <Link href="/buildings" className="text-yellow-400 hover:underline">
                Browse all Strip high-rise buildings
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-14 px-4 bg-gray-900 border-t border-gray-800" id="faq">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Buyer FAQ</h2>
            <dl className="space-y-6">
              {guideFaqs.map((faq) => (
                <div key={faq.question} className="border border-gray-800 rounded-xl p-5 bg-gray-950/80">
                  <dt className="font-semibold text-yellow-400 mb-2">{faq.question}</dt>
                  <dd className="text-gray-300 text-sm leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-12 px-4 bg-black border-t border-yellow-900/30">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              Dr. Jan Duffy, REALTOR® · Berkshire Hathaway HomeServices Nevada Properties · 702-299-6607
            </p>
            <a
              href={buyerCalendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 text-gray-950 font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Schedule a buyer consultation
              <span className="sr-only"> (opens Calendly in a new tab)</span>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}