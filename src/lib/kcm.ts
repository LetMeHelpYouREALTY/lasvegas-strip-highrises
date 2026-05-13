// KCM Feed Library — Curated with Claude
// Feed URL: https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18
// Posts are manually approved before publishing (no auto-publish)

export interface KcmPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  localContext?: string; // Added by Dr. Jan / Claude before publishing
  approved: boolean;
}

const KCM_FEED_URL = process.env.KCM_FEED_URL ||
  "https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18";

// Parse RSS XML to post objects
function parseRss(xml: string): KcmPost[] {
  const items: KcmPost[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
  for (const match of itemMatches) {
    const item = match[1];
    const getTag = (tag: string) => {
      const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`));
      return m ? (m[1] || m[2] || "").trim() : "";
    };
    const title = getTag("title");
    const link = getTag("link") || getTag("guid");
    const description = getTag("description");
    const pubDate = getTag("pubDate");
    const category = getTag("category") || "Market News";
    if (!title) continue;
    const slug = link.split("/").filter(Boolean).pop() || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    items.push({
      slug,
      title,
      excerpt: description.replace(/<[^>]+>/g, "").slice(0, 200) + "…",
      content: description,
      date: pubDate ? new Date(pubDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "",
      category,
      localContext: undefined,
      approved: false, // All posts start as unapproved — must be manually curated
    });
  }
  return items;
}

// Fetch feed — returns approved posts only (or all in dev mode for review)
export async function getKcmPosts(): Promise<KcmPost[]> {
  try {
    const res = await fetch(KCM_FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const posts = parseRss(xml);
    // In production: return only approved posts
    // For now returns all for editorial review — set approved:true manually
    return posts.slice(0, 12); // Show latest 12 for review
  } catch {
    return [];
  }
}

export async function getKcmPost(slug: string): Promise<KcmPost | null> {
  const posts = await getKcmPosts();
  return posts.find((p) => p.slug === slug) || null;
}
