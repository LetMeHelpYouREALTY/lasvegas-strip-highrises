import type { Metadata } from 'next'
import { breadcrumbListJsonLd } from '@/lib/seo/breadcrumbs'
import { JsonLd } from '@/lib/seo/json-ld'

export const metadata: Metadata = {
  title: 'About Dr. Jan Duffy | Las Vegas Strip High-Rise Specialist',
  description: '35+ years Las Vegas real estate. Strip high-rise condo expert. 500+ families, $127M+ sales. Dr. Jan Duffy, BHHS Nevada Properties · 702-299-6607.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com/about' },
}

const breadcrumbs = breadcrumbListJsonLd([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
])

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
    <main className="bg-gray-950 min-h-screen">
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">About Dr. Jan Duffy</h1>
          <p className="text-yellow-400 text-xl">Las Vegas Strip High-Rise Specialist · BHHS Nevada Properties</p>
        </div>
      </section>
      <section className="py-14 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 prose">
            <h2>35+ Years Above the Strip</h2>
            <p>Dr. Jan Duffy has watched Las Vegas evolve from a low-rise casino town into a vertical luxury market. She&apos;s been selling Strip high-rise condos since the first towers went up and understands these buildings at a level that general agents simply don&apos;t reach.</p>
            <h2>What &quot;Specialist&quot; Actually Means</h2>
            <p>Strip high-rise transactions have layers: hotel rental agreements, HOA reserve studies, view corridor assessments, and resale restrictions that vary building by building. Dr. Jan has navigated hundreds of these deals — she knows where the surprises hide and how to protect buyers from them.</p>
            <h2>Berkshire Hathaway HomeServices Nevada Properties</h2>
            <p>With BHHS Nevada Properties&apos; marketing reach and Dr. Jan&apos;s 35+ years of Strip relationships, clients get both the most recognized brand in residential real estate and a specialist who knows every building from lobby to penthouse.</p>
          </div>
          <aside>
            <div className="border border-yellow-900/40 rounded-xl p-6 bg-black sticky top-24">
              <h3 className="font-bold text-yellow-400 text-lg mb-4">By the Numbers</h3>
              {[
                { n: '35+', l: 'Years Las Vegas' },
                { n: '500+', l: 'Families Helped' },
                { n: '$127M+', l: 'Career Sales' },
                { n: '8', l: 'Strip Buildings' },
              ].map((s) => (
                <div key={s.n} className="border-b border-gray-800 pb-3 mb-3">
                  <div className="text-3xl font-bold text-yellow-400">{s.n}</div>
                  <div className="text-gray-400 text-sm">{s.l}</div>
                </div>
              ))}
              <a href="tel:7022996607" className="block w-full bg-yellow-500 text-gray-950 font-bold text-center py-3 rounded-lg hover:bg-yellow-400 transition mt-4">
                Call 702-299-6607
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
    </>
  )
}
