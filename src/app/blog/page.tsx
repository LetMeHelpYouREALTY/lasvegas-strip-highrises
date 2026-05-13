import type { Metadata } from 'next'
import Link from 'next/link'
import { getKcmPosts } from '@/lib/kcm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Market News | Las Vegas Strip High-Rise Condos',
  description: 'Las Vegas high-rise condo market updates — rates, inventory, and Strip tower news curated by Dr. Jan Duffy.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com/blog' },
}

export default async function BlogPage() {
  const posts = await getKcmPosts()
  const approved = posts.filter((p) => p.approved)

  return (
    <main className="bg-gray-950 min-h-screen">
      <section className="py-12 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Market News</h1>
          <p className="text-gray-400">High-rise condo market updates curated for Strip buyers and sellers.</p>
        </div>
      </section>
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          {approved.length === 0 ? (
            <p className="text-gray-500 text-center py-10">Market updates coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approved.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group border border-gray-800 rounded-xl p-5 hover:border-yellow-500 hover:bg-gray-900 transition"
                >
                  <p className="text-yellow-500 text-xs font-semibold mb-2">{post.category}</p>
                  <h2 className="font-bold text-white group-hover:text-yellow-400 mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
                  <p className="text-xs text-gray-600 mt-3">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
