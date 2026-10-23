import Script from 'next/script'
import { CalendlyButton } from '@/components/Calendly'
import { calendlyUrl } from '@/lib/calendly'

/**
 * RealScout office listings (condos and high-rises, $500K+), with the MLS
 * attribution and a showing button right after the listings.
 */
export function RealScoutListings({ campaign, title = 'Strip high-rise condos for sale now' }: { campaign: string; title?: string }) {
  return (
    <section className="py-14 px-4 bg-gray-900 border-y border-gray-800" aria-labelledby="realscout-listings-heading">
      <Script
        id="realscout-web-components"
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
        type="module"
        strategy="afterInteractive"
      />
      <div className="max-w-5xl mx-auto">
        <h2 id="realscout-listings-heading" className="text-3xl font-bold text-white text-center mb-3">
          {title}
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Live office listings from the GLVAR MLS, newest first.
        </p>
        <div
          className="min-h-[280px] rounded-xl bg-white p-4"
          dangerouslySetInnerHTML={{
            __html:
              '<realscout-office-listings agent-encoded-id="QWdlbnQtMjI1MDUw" sort-order="NEWEST" listing-status="For Sale" property-types=",TC" price-min="500000"></realscout-office-listings>',
          }}
        />
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Listing data is provided by the Greater Las Vegas Association of REALTORS® MLS (GLVAR) and is
          deemed reliable but not guaranteed. © {new Date().getFullYear()} GLVAR. All rights reserved.
          Information is for consumers’ personal, non-commercial use. Dr. Jan Duffy, Berkshire Hathaway
          HomeServices Nevada Properties, License S.0197614.LLC.
        </p>
        <div className="mt-8 text-center">
          <CalendlyButton
            url={calendlyUrl('tour', 'after-listings', campaign)}
            className="inline-block bg-yellow-500 text-gray-950 font-bold px-7 py-3 rounded-lg hover:bg-yellow-400 transition"
          >
            Book a showing
          </CalendlyButton>
        </div>
      </div>
    </section>
  )
}
