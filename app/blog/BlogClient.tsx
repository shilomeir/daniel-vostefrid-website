"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { formatHebrewDate } from "@/lib/sanity";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  readingTime: number;
  mainImageUrl?: string;
}

interface Props {
  posts: Post[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogClient({ posts }: Props) {
  return (
    <>
      <div className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-blue-light text-sm font-semibold tracking-widest uppercase">
              מחשבות ותובנות
            </span>
            <h1 className="font-serif text-5xl font-bold text-blue-deep mt-3 mb-4">
              הבלוג
            </h1>
            <p className="text-text-mid max-w-xl mx-auto">
              מאמרים על פסיכותרפיה, שיטת ימימה, גוף-נפש ובריאות הנפש.
            </p>
          </motion.div>

          {/* Grid */}
          {posts.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post) => (
                <motion.article
                  key={post._id}
                  variants={item}
                  className="bg-white/80 backdrop-blur-sm border border-cream-deeper rounded-3xl overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* Main Image */}
                  {post.mainImageUrl && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={post.mainImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col h-full">
                    {/* Date */}
                    <span className="text-xs text-text-light mb-2">
                      {formatHebrewDate(post.publishedAt)}
                    </span>

                    <h2 className="font-bold text-lg text-text-dark mb-3 group-hover:text-blue-mid transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-text-mid text-sm leading-relaxed flex-1 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-cream-dark">
                      <div className="flex items-center gap-1.5 text-xs text-text-light">
                        <Clock size={12} />
                        <span>{post.readingTime} דק׳ קריאה</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="flex items-center gap-1 text-sm font-semibold text-blue-deep hover:gap-2 transition-all"
                      >
                        קרא עוד
                        <ArrowLeft size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-light text-lg">
                עדיין אין מאמרים. מאמרים חדשים יופיעו כאן בקרוב!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
