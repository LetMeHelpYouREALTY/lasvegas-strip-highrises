import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendlyButton, CalendlyInline } from '@/components/Calendly'
import { breadcrumbListJsonLd } from '@/lib/seo/breadcrumbs'
import { JsonLd } from '@/lib/seo/json-ld'
import { calendlyUrl } from '@/lib/calendly'

const SELL_PATH = '/sell-your-las-vegas-strip-high-rise-condo'
const SITE = 'https://lasvegasstriphighrises.com'

export const metadata: Metadata = {
  title: {
    absolute: 'Sell Your Las Vegas Strip High-Rise Condo with Dr. Jan Duffy',
  },
  description:
    'Listing strategy for Strip high-rise condos — pricing, prep, marketing, and negotiation. Schedule a listing consultation with Dr. Jan Duffy, REALTOR® · 702-299-6607.',
  alternates: { canonical: `${SITE}${SELL_PATH}` },
}

const sellerAgentJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE}/#agent`,
  name: 'Dr. Jan Duffy',
  url: SITE,
  telephone: '702-299-6607',
  description:
    'Las Vegas Strip high-rise condo listing specialist — pricing, preparation, marketing, and negotiation for tower residences.',
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
      '@type': 'City',
      name: 'Las Vegas',
      containedInPlace: {
        '@type': 'State',
        name: 'Nevada',
      },
    },
  },
}

const breadcrumbs = breadcrumbListJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Sell Your Strip High-Rise Condo', path: SELL_PATH },
])

const sellerCalendly = calendlyUrl('seller', 'website', 'sell-strip-highrise')

export default function SellStripHighRisePage() {
  return (
    <>
      <JsonLd data={[sellerAgentJsonLd, breadcrumbs]} />
      <main className="bg-gray-950 min-h-screen">
        <section className="py-16 px-4 bg-black border-b border-yellow-900/30">
          <div className="max-w-4xl mx-auto">
            <p className="text-yellow-400 text-sm font-semibold mb-3 uppercase tracking-widest">
              Las Vegas Strip · Sellers
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Sell Your Las Vegas Strip High-Rise Condo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Tower listings need a different playbook — HOA packages, rental-program rules, view premiums, and buyer pools
              that rarely shop single-family homes. Dr. Jan Duffy markets Strip high-rise condos with that lens.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <CalendlyButton
                url={sellerCalendly}
                className="bg-yellow-500 text-gray-950 font-bold px-7 py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Book a Listing Consultation
              </CalendlyButton>
              <a
                href="tel:7022996607"
                className="border-2 border-yellow-500 text-yellow-400 font-semibold px-7 py-3 rounded-lg hover:bg-yellow-950 transition"
              >
                Call 702-299-6607
              </a>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8 text-gray-300">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Pricing that reflects the tower</h2>
                <p className="leading-relaxed">
                  Strip high-rise values hinge on floor height, orientation, renovation level, parking, storage, and whether
                  a unit participates in a hotel rental program. Dr. Jan Duffy reviews recent closed sales in your building and
                  comparable towers before recommending a list price and net sheet.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Preparation buyers expect</h2>
                <p className="leading-relaxed">
                  Buyers ask for HOA budgets, reserve studies, rental restrictions, and transfer fees up front. You get a
                  prep checklist tailored to your building so disclosures, photography, and staging highlight view corridors
                  and finishes — without surprises at escrow.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Marketing beyond a yard sign</h2>
                <p className="leading-relaxed">
                  Listings go to the MLS with professional media, targeted outreach to relocation and second-home buyers, and
                  messaging that explains what makes your tower distinct. Dr. Jan Duffy has marketed Las Vegas high-rise
                  residences since the corridor started building vertically.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Negotiation through closing</h2>
                <p className="leading-relaxed">
                  Offers on condo towers often include HOA transfer reviews, rental-program assignments, and tight inspection
                  windows. Dr. Jan Duffy negotiates credits, timelines, and documentation so you reach closing with clear
                  numbers.
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="border border-yellow-900/40 rounded-xl p-6 bg-black">
                <h2 className="text-xl font-bold text-yellow-400 mb-3">What&apos;s my condo worth?</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Start with a listing consultation. Bring your latest HOA statement, floor plan, and any rental-program
                  paperwork — Dr. Jan Duffy will outline pricing scenarios and a marketing timeline for your unit.
                </p>
                <CalendlyButton
                  url={sellerCalendly}
                  className="block w-full bg-yellow-500 text-gray-950 font-bold text-center py-3 rounded-lg hover:bg-yellow-400 transition"
                >
                  Schedule Listing Consultation
                </CalendlyButton>
              </div>
              <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50 text-sm text-gray-400">
                <p className="mb-2">
                  Dr. Jan Duffy, REALTOR® · Berkshire Hathaway HomeServices Nevada Properties · License S.0197614.LLC
                </p>
                <p>
                  MLS listings are deemed reliable but not guaranteed. All measurements and square footage are approximate.
                  Buyer to verify all information.
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Buying instead?{' '}
                <Link href="/" className="text-yellow-400 hover:underline">
                  Browse Strip high-rise condos for sale
                </Link>
                .
              </p>
            </aside>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-900 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Pick a time for your consultation</h2>
            <CalendlyInline url={sellerCalendly} height={720} />
          </div>
        </section>
      </main>
    </>
  )
}
