"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Share2 } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Footer from "@/components/Footer";
import { formatHebrewDate, urlFor } from "@/lib/sanity";

interface Post {
  _id: string;
  title: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  publishedAt: string;
  mainImage?: { asset: { url: string } };
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl font-bold text-blue-deep mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl font-bold text-blue-deep mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="font-serif text-lg font-bold text-blue-deep mt-5 mb-2">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-text-mid leading-relaxed mb-4 text-base">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-r-4 border-sand pr-4 my-6 text-text-mid italic font-serif text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-text-dark">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline decoration-sand/50 underline-offset-2">{children}</span>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-mid underline hover:text-blue-deep transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-text-mid mr-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-text-mid mr-4">{children}</ol>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(800).quality(80).url();
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || "תמונה מתוך המאמר"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-sm text-text-light mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function ArticlePage({ post }: { post: Post }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${post.title}\n${shareUrl}`
  )}`;

  return (
    <>
      <div className="min-h-screen bg-cream pt-24 pb-16" dir="rtl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-blue-deep text-white font-semibold px-5 py-2.5 rounded-full hover:bg-blue-mid transition-colors shadow-sm"
            >
              <ArrowRight size={16} />
              חזרה לבלוג
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-deep leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-light">
              <span>דניאל ווסטפריד</span>
              {post.publishedAt && <span>{formatHebrewDate(post.publishedAt)}</span>}
            </div>
          </motion.header>

          {/* Main Image */}
          {post.mainImage?.asset?.url && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full aspect-video rounded-3xl overflow-hidden mb-10"
            >
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />
            </motion.div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-l from-transparent via-sand/30 to-transparent mb-10" />

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
            className="mt-12 pt-8 border-t border-cream-deeper"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-cream-deeper rounded-3xl p-8 text-center">
              <p className="text-text-mid mb-4 font-medium">נהנית מהמאמר? שתף עם מישהו שזה יכול לעזור לו</p>
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
              href="/blog"
              className="inline-flex items-center gap-2 border border-blue-deep/40 text-blue-deep font-semibold px-6 py-3 rounded-full hover:bg-blue-deep/5 transition-colors"
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
