import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Privacy Policy | Las Vegas Strip Highrises',
  robots: { index: false },
}
export default function PrivacyPage() {
  return (
    <main className="bg-gray-950 min-h-screen max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-10">Last updated: May 12, 2026</p>
      <div className="prose">
        <p>lasvegasstriphighrises.com is operated by Dr. Jan Duffy, NV License #S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.</p>
        <h2>Information We Collect</h2>
        <p>Contact form submissions collect name, email, phone, and message. Standard server logs collect IP and browser type via Vercel.</p>
        <h2>Use</h2>
        <p>To respond to your inquiry. We do not sell your information to third parties.</p>
        <h2>Contact</h2>
        <p>Dr. Jan Duffy · 7475 W Sahara Ave Suite 100, Las Vegas NV 89117 · 702-500-1955 · janet.duffy@bhhsnv.com</p>
      </div>
    </main>
  )
}
