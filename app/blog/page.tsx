import type { Metadata } from "next";
import { sanityClient, readingTime, extractPlainText } from "@/lib/sanity";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "בלוג | דניאל ווסטפריד",
  description:
    "מאמרים על פסיכותרפיה, שיטת ימימה, גוף-נפש ובריאות הנפש מאת דניאל ווסטפריד.",
};

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  body,
  mainImage{asset->{url}}
}`;

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body?: Array<{ children?: Array<{ text: string }> }>;
  mainImage?: { asset: { url: string } };
}

export default async function BlogPage() {
  let posts: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    readingTime: number;
    mainImageUrl?: string;
  }[] = [];

  try {
    const sanityPosts: SanityPost[] = await sanityClient.fetch(
      POSTS_QUERY,
      {},
      { next: { revalidate: 0 } }
    );
    posts = sanityPosts.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      publishedAt: p.publishedAt,
      excerpt: extractPlainText(p.body ?? []).slice(0, 200),
      readingTime: readingTime(p.body ?? []),
      mainImageUrl: p.mainImage?.asset?.url,
    }));
  } catch {
    // If Sanity is unreachable, show empty state
  }

  return <BlogClient posts={posts} />;
}
