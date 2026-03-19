import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityClient, extractPlainText } from "@/lib/sanity";
import ArticlePage from "./ArticlePage";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
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
  body: Array<{
    _type: string;
    _key?: string;
    children?: Array<{ text: string; _type: string; marks?: string[] }>;
    style?: string;
    listItem?: string;
    markDefs?: Array<{ _key: string; _type: string; href?: string }>;
    asset?: { url: string };
  }>;
  publishedAt: string;
  mainImage?: { asset: { url: string } };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post: SanityPost | null = await sanityClient.fetch(
      POST_QUERY,
      { slug },
      { next: { revalidate: 0 } }
    );

    if (!post) return { title: "מאמר לא נמצא" };

    const description = extractPlainText(post.body).slice(0, 160);

    return {
      title: `${post.title} | דניאל ווסטפריד`,
      description,
      openGraph: {
        title: post.title,
        description,
        type: "article",
        locale: "he_IL",
        ...(post.mainImage?.asset?.url && {
          images: [{ url: post.mainImage.asset.url }],
        }),
      },
    };
  } catch {
    return { title: "מאמר | דניאל ווסטפריד" };
  }
}

export default async function ArticlePageRoute({ params }: Props) {
  const { slug } = await params;

  let post: SanityPost | null = null;
  try {
    post = await sanityClient.fetch(
      POST_QUERY,
      { slug },
      { next: { revalidate: 0 } }
    );
  } catch {
    notFound();
  }

  if (!post) notFound();

  return <ArticlePage post={post} />;
}
