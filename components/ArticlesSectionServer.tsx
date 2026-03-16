import { sanityClient, extractPlainText } from "@/lib/sanity";
import ArticlesSection from "./ArticlesSection";

const ARTICLES_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt
}`;

interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: Array<{ children?: Array<{ text: string }> }>;
  publishedAt: string;
}

export default async function ArticlesSectionServer() {
  let articles: { _id: string; title: string; slug: string; excerpt: string; publishedAt: string }[] = [];

  try {
    const posts: SanityPost[] = await sanityClient.fetch(ARTICLES_QUERY, {}, { next: { revalidate: 0 } });
    articles = posts.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || extractPlainText(p.body ?? []),
      publishedAt: p.publishedAt,
    }));
  } catch {
    // If Sanity is unreachable, show nothing
  }

  return <ArticlesSection articles={articles} />;
}
