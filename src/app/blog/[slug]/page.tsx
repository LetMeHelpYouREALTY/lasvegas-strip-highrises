import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getKcmPosts, getKcmPost } from '@/lib/kcm'

export const revalidate = 3600
interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getKcmPosts()
  return posts.filter((p) => p.approved).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getKcmPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://lasvegasstriphighrises.com/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getKcmPost(slug)
  if (!post || !post.approved) notFound()

  return (
    <main className="bg-gray-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-14">
        <p className="text-yellow-500 font-semibold text-sm mb-2">{post.category}</p>
        <h1 className="text-3xl font-bold text-white mb-3">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        {post.localContext && (
          <div className="border-l-4 border-yellow-500 bg-yellow-950/30 p-4 mb-8 rounded-r-lg">
            <p className="text-xs font-bold text-yellow-400 uppercase mb-1">Dr. Jan&apos;s Strip Take</p>
            <p className="text-yellow-100 text-sm">{post.localContext}</p>
          </div>
        )}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-10 bg-black border border-yellow-900/40 rounded-xl p-6 text-center">
          <p className="font-bold text-white text-lg mb-2">Questions about what this means for Strip condos?</p>
          <p className="text-gray-400 text-sm mb-4">Market shifts hit high-rise inventory differently. Call me for the building-level view.</p>
          <a href="tel:7022996607" className="inline-block bg-yellow-500 text-gray-950 font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
            Call Dr. Jan · 702-299-6607
          </a>
        </div>
      </div>
    </main>
  )
}
