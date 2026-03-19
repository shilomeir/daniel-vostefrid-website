import { sanityClient, extractPlainText } from "@/lib/sanity";
import ArticlesSection from "./ArticlesSection";

const ARTICLES_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  body,
  publishedAt,
  mainImage{asset->{url}}
}`;

interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  body?: Array<{ children?: Array<{ text: string }> }>;
  publishedAt: string;
  mainImage?: { asset: { url: string } };
}

export default async function ArticlesSectionServer() {
  let articles: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    mainImageUrl?: string;
  }[] = [];

  try {
    const posts: SanityPost[] = await sanityClient.fetch(
      ARTICLES_QUERY,
      {},
      { next: { revalidate: 0 } }
    );
    articles = posts.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      excerpt: extractPlainText(p.body ?? []).slice(0, 300),
      publishedAt: p.publishedAt,
      mainImageUrl: p.mainImage?.asset?.url,
    }));
  } catch {
    // If Sanity is unreachable, show nothing
  }

  return <ArticlesSection articles={articles} />;
}
