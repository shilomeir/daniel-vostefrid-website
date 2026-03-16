"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Share2 } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import Footer from "@/components/Footer";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  publishedAt: string;
  author?: string;
  categories?: string[];
}

const categoryLabels: Record<string, string> = {
  yemima: "שיטת ימימה",
  personal: "טיפול אישי",
  mindbody: "גוף-נפש",
  soldiers: "מילואים וחיילים",
  parenting: "הורות",
};

const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="font-serif text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-4 text-base">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-r-4 border-earth pr-4 my-6 text-gray-600 italic font-serif text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sage underline hover:text-sage-dark transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 mr-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 mr-4">{children}</ol>
    ),
  },
};

export default function ArticlePage({ post }: { post: Post }) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${post.title}\n${shareUrl}`
  )}`;

  return (
    <>
      <div className="min-h-screen bg-bone pt-24 pb-16" dir="rtl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/#articles"
              className="inline-flex items-center gap-2 bg-sage text-white font-semibold px-5 py-2.5 rounded-full hover:bg-sage-dark transition-colors shadow-sm"
            >
              <ArrowRight size={16} />
              חזרה לדף הבית
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            {post.categories && post.categories.length > 0 && (
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
            )}

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              {post.author && <span>{post.author}</span>}
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </motion.header>

          {/* Divider */}
          <div className="h-px bg-gradient-to-l from-transparent via-earth/30 to-transparent mb-10" />

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose-custom"
          >
            <PortableText value={post.body} components={portableTextComponents} />
          </motion.div>

          {/* Share section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-warm-200"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-warm-200 rounded-3xl p-8 text-center">
              <p className="text-gray-600 mb-4 font-medium">נהנית מהמאמר? שתף עם מישהו שזה יכול לעזור לו</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1fb855] transition-colors shadow-sm"
              >
                <Share2 size={16} />
                שתף בוואטסאפ
              </a>
            </div>
          </motion.div>

          {/* Bottom back button */}
          <div className="mt-10 text-center">
            <Link
              href="/#articles"
              className="inline-flex items-center gap-2 border border-sage/40 text-sage font-semibold px-6 py-3 rounded-full hover:bg-sage/5 transition-colors"
            >
              <ArrowRight size={16} />
              חזרה לכל המאמרים
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
