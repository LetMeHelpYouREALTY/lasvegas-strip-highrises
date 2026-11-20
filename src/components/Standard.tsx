import Image from 'next/image'
import { CalendlyButton } from '@/components/Calendly'
import { calendlyUrl } from '@/lib/calendly'
import { AREA_FACTS, FACTS_RETRIEVED } from '@/lib/areaFacts'
import { faqPageJsonLd, type FaqItem } from '@/lib/seo/faq'
import { JsonLd } from '@/lib/seo/json-ld'

const btn = 'inline-block bg-yellow-500 text-gray-950 font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition'

/** Dated, sourced corridor facts. */
export function AreaFacts({ campaign, ids }: { campaign: string; ids?: string[] }) {
  const facts = ids ? AREA_FACTS.filter((f) => ids.includes(f.id)) : AREA_FACTS
  return (
    <section className="py-16 px-4 bg-gray-950 border-t border-gray-800" aria-labelledby={`facts-${campaign}`}>
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2">The numbers</p>
        <h2 id={`facts-${campaign}`} className="font-serif text-3xl md:text-4xl text-white mb-4">
          What Strip high-rises sell for, tower by tower
        </h2>
        <p className="text-gray-400 mb-10 max-w-3xl">
          The tower matters more than the corridor average. Each figure below carries its source and date.
        </p>
        <dl className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {facts.map((f) => (
            <div key={f.id} className="border-t border-gray-800 pt-5">
              <dt className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.15em] mb-2">{f.label}</dt>
              <dd className="text-gray-200 leading-relaxed">
                {f.text}
                <span className="block mt-2 text-sm text-gray-500">
                  Source:{' '}
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
                    {f.source}
                  </a>
                  , {f.asOf}.
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-gray-600 mt-8">Retrieved {FACTS_RETRIEVED}. Figures change; confirm before you write an offer.</p>
        <div className="mt-8">
          <CalendlyButton url={calendlyUrl('buyer', 'facts', campaign)} className={btn}>
            Go over a tower&apos;s numbers with Dr. Jan
          </CalendlyButton>
        </div>
      </div>
    </section>
  )
}

/** Visible Q&A plus FAQPage markup built from the same items. */
export function QABlock({ items, campaign, heading = 'Questions buyers and sellers ask' }: { items: FaqItem[]; campaign: string; heading?: string }) {
  return (
    <section className="py-16 px-4 bg-black border-t border-gray-800" aria-labelledby={`qa-${campaign}`} id="faq">
      <JsonLd data={faqPageJsonLd(items)} />
      <div className="max-w-3xl mx-auto">
        <h2 id={`qa-${campaign}`} className="font-serif text-3xl md:text-4xl text-white mb-8">{heading}</h2>
        <div className="divide-y divide-gray-800">
          {items.map((f) => (
            <div key={f.question} className="py-6">
              <h3 className="font-serif text-xl text-yellow-400 mb-2">{f.question}</h3>
              <p className="text-gray-300 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <CalendlyButton url={calendlyUrl('buyer', 'qa', campaign)} className={btn}>Ask Dr. Jan your question</CalendlyButton>
        </div>
      </div>
    </section>
  )
}

/** About strip with headshot. */
export function MeetDrJan({ campaign }: { campaign: string }) {
  return (
    <section className="py-16 px-4 bg-gray-900 border-t border-gray-800" aria-labelledby={`meet-${campaign}`}>
      <div className="max-w-4xl mx-auto grid md:grid-cols-[160px_1fr] gap-8 items-center">
        <Image src="/dr-jan-duffy-headshot.jpg" alt="Dr. Jan Duffy" width={160} height={160} className="rounded-full mx-auto" />
        <div>
          <h2 id={`meet-${campaign}`} className="font-serif text-3xl text-white mb-3">Buy or sell a Strip high-rise with Dr. Jan</h2>
          <p className="text-gray-300 mb-6">
            Dr. Jan Duffy works with buyers and sellers in the Strip towers. She pulls each building&apos;s recent
            closings, reads the association budget and rental rules with you, and prices a unit against its own stack
            and floor. Call 702-299-6607 or book a time.
          </p>
          <div className="flex flex-wrap gap-4">
            <CalendlyButton url={calendlyUrl('buyer', 'meet', campaign)} className={btn}>Book a buyer consultation</CalendlyButton>
            <CalendlyButton
              url={calendlyUrl('seller', 'meet', campaign)}
              className="inline-block border border-yellow-500 text-yellow-400 font-semibold px-6 py-3 rounded-full hover:bg-gray-950 transition"
            >
              Book a listing consultation
            </CalendlyButton>
          </div>
        </div>
      </div>
    </section>
  )
}
