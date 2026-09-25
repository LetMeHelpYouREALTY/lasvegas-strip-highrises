import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-900/30 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3 text-yellow-400">Las Vegas Strip Highrises</h3>
          <p className="text-gray-400 text-sm mb-4">
            Expert guidance on Las Vegas Strip high-rise condos — luxury residences above the world&apos;s most iconic skyline.
          </p>
          <p className="text-gray-500 text-xs">
            Dr. Jan Duffy | NV License #S.0197614.LLC<br />
            Berkshire Hathaway HomeServices Nevada Properties
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-400 text-sm uppercase tracking-wide">Buildings</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              ['Turnberry Place', '/buildings/turnberry-place'],
              ['Palms Place', '/buildings/palms-place'],
              ['Panorama Towers', '/buildings/panorama-towers'],
              ['One Las Vegas', '/buildings/one-las-vegas'],
              ['Waldorf Astoria Residences', '/buildings/waldorf-astoria-residences'],
              ['The Martin', '/buildings/the-martin'],
              ['Veer Towers', '/buildings/veer-towers'],
              ['Trump International', '/buildings/trump-international'],
            ].map(([name, href]) => (
              <li key={href}><Link href={href} className="hover:text-yellow-400 transition">{name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-400 text-sm uppercase tracking-wide">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="tel:7022996607" className="hover:text-yellow-400 transition">📞 702-299-6607</a></li>
            <li><a href="sms:7022221964" className="hover:text-yellow-400 transition">💬 Text 702-222-1964</a></li>
            <li><a href="mailto:janet.duffy@bhhsnv.com" className="hover:text-yellow-400 transition">✉️ janet.duffy@bhhsnv.com</a></li>
          </ul>
          <div className="mt-4 text-xs text-gray-500">
            <p>7475 W Sahara Ave, Suite 100</p>
            <p>Las Vegas, NV 89117</p>
            <p className="mt-2">Hours: Mon–Sun 8:00 AM–8:00 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-900 py-4 px-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Las Vegas Strip Highrises · Dr. Jan Duffy · BHHS Nevada Properties ·{' '}
        <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
      </div>
    </footer>
  )
}
