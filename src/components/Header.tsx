'use client'
import { useState } from 'react'
import Link from 'next/link'

const buildings = [
  { name: 'Turnberry Place', href: '/buildings/turnberry-place' },
  { name: 'Palms Place', href: '/buildings/palms-place' },
  { name: 'Panorama Towers', href: '/buildings/panorama-towers' },
  { name: 'One Las Vegas', href: '/buildings/one-las-vegas' },
  { name: 'Waldorf Astoria Residences', href: '/buildings/waldorf-astoria-residences' },
  { name: 'The Martin', href: '/buildings/the-martin' },
  { name: 'Veer Towers', href: '/buildings/veer-towers' },
  { name: 'Trump International', href: '/buildings/trump-international' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-yellow-900/30 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg leading-tight">
          <span className="text-yellow-400">Las Vegas</span>
          <span className="text-white"> Strip Highrises</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <div className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
            <button className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition">
              Buildings <span className="text-xs">▾</span>
            </button>
            {dropOpen && (
              <div className="absolute top-full left-0 w-60 bg-gray-900 border border-yellow-900/40 rounded-lg shadow-xl py-2 mt-1">
                {buildings.map((b) => (
                  <Link key={b.href} href={b.href} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition">
                    {b.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition">About</Link>
          <Link href="/blog" className="text-gray-300 hover:text-yellow-400 transition">Market News</Link>
          <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition">Contact</Link>
          <a href="tel:7022996607" className="bg-yellow-500 text-gray-950 font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition text-sm">
            702-299-6607
          </a>
        </nav>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className="block w-5 h-0.5 bg-yellow-400 mb-1" />
          <span className="block w-5 h-0.5 bg-yellow-400 mb-1" />
          <span className="block w-5 h-0.5 bg-yellow-400" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-yellow-900/30 px-4 py-4 space-y-3 text-sm">
          <p className="font-semibold text-gray-500 uppercase text-xs tracking-wide">Buildings</p>
          {buildings.map((b) => (
            <Link key={b.href} href={b.href} className="block text-gray-300 hover:text-yellow-400 pl-2" onClick={() => setMobileOpen(false)}>{b.name}</Link>
          ))}
          <hr className="border-gray-700" />
          <Link href="/about" className="block text-gray-300 hover:text-yellow-400" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/blog" className="block text-gray-300 hover:text-yellow-400" onClick={() => setMobileOpen(false)}>Market News</Link>
          <Link href="/contact" className="block text-gray-300 hover:text-yellow-400" onClick={() => setMobileOpen(false)}>Contact</Link>
          <a href="tel:7022996607" className="block bg-yellow-500 text-gray-950 font-bold text-center py-2 rounded-lg">702-299-6607</a>
        </div>
      )}
    </header>
  )
}
