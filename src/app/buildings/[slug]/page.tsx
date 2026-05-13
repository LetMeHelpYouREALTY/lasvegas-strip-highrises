import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildings, getBuilding } from '@/lib/buildings'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return buildings.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const b = getBuilding(slug)
  if (!b) return {}
  return {
    title: `${b.name} Condos For Sale | Las Vegas Strip High-Rise`,
    description: `${b.name} Las Vegas — ${b.tagline}. ${b.priceRange}. ${b.stories} stories. Dr. Jan Duffy · 702-299-6607.`,
    alternates: { canonical: `https://lasvegasstriphighrises.com/buildings/${slug}` },
  }
}

export default async function BuildingPage({ params }: Props) {
  const { slug } = await params
  const b = getBuilding(slug)
  if (!b) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Dr. Jan Duffy',
    url: `https://lasvegasstriphighrises.com/buildings/${slug}`,
    telephone: '702-299-6607',
    areaServed: b.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7475 W Sahara Ave, Suite 100',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89117',
      addressCountry: 'US',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="bg-gray-950 min-h-screen">
        <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-5xl mx-auto">
            <p className="text-yellow-500 text-sm font-semibold uppercase mb-2">{b.location}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{b.name}</h1>
            <p className="text-gray-300 text-xl mb-2">{b.tagline}</p>
            <p className="text-3xl font-bold text-yellow-400">{b.priceRange}</p>
          </div>
        </section>

        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 prose">
              <h2>About {b.name}</h2>
              <p>{b.description}</p>
              <h2>Building Features</h2>
              <ul>{b.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <h2>Quick Facts</h2>
              <ul>
                <li><strong>Stories:</strong> {b.stories}</li>
                <li><strong>Total Units:</strong> {b.units}</li>
                <li><strong>Year Built:</strong> {b.yearBuilt}</li>
                <li><strong>Location:</strong> {b.location}</li>
                <li><strong>ZIP:</strong> {b.zip}</li>
              </ul>
            </div>
            <aside>
              <div className="bg-black border border-yellow-900/40 rounded-xl p-6 sticky top-24">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">Interested in {b.name}?</h3>
                <p className="text-gray-400 text-sm mb-5">
                  I track every listing and closed sale in this building. Let me pull current
                  availability and give you honest intel before you visit.
                </p>
                <a href="tel:7022996607" className="block w-full bg-yellow-500 text-gray-950 font-bold text-center py-3 rounded-lg hover:bg-yellow-400 transition mb-3">
                  Call 702-299-6607
                </a>
                <a href="/contact" className="block w-full border border-yellow-500 text-yellow-400 font-semibold text-center py-3 rounded-lg hover:bg-gray-900 transition">
                  Request Building Report
                </a>
                <p className="text-gray-600 text-xs text-center mt-4">
                  Dr. Jan Duffy · NV #S.0197614.LLC<br />BHHS Nevada Properties
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-gray-800 py-8 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/buildings" className="text-yellow-500 hover:underline font-medium">← All Buildings</a>
            <a href="/contact" className="bg-yellow-500 text-gray-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 transition text-sm">
              Get Expert Guidance
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
