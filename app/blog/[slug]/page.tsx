import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Footer from "@/components/Footer";
import { samplePosts, categoryLabels } from "@/lib/blogData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return samplePosts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = samplePosts.find((p) => p.slug.current === slug);
  if (!post) return {};
  return {
    title: `${post.title} | דניאל ווסטפריד`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = samplePosts.find((p) => p.slug.current === slug);

  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="min-h-screen bg-bone pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sage text-sm font-medium mb-8 hover:gap-3 transition-all"
          >
            <ArrowRight size={16} />
            חזרה לבלוג
          </Link>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs bg-sage/10 text-sage px-3 py-1 rounded-full font-medium"
              >
                {categoryLabels[cat] ?? cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-5 text-sm text-gray-400 mb-8 pb-8 border-b border-warm-200">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} דק׳ קריאה
            </span>
          </div>

          {/* Body */}
          <div className="prose prose-lg prose-gray max-w-none leading-relaxed text-gray-700">
            {post.body
              ? post.body.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-6">
                    {paragraph}
                  </p>
                ))
              : <p>{post.excerpt}</p>
            }
          </div>

          {/* CTA */}
          <div className="mt-12 bg-sage/5 border border-sage/20 rounded-3xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              רוצה להמשיך את השיחה?
            </h2>
            <p className="text-gray-600 mb-6">
              אשמח לדבר איתך על מה שעלה בקריאה ועל האפשרות לצאת לתהליך יחד.
            </p>
            <a
              href="https://wa.me/972509591974"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sage text-white font-bold px-8 py-3.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              שלח הודעה ב-WhatsApp
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
