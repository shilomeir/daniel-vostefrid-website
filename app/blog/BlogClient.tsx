"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  categories: string[];
  readingTime: number;
}

interface Props {
  posts: Post[];
  categoryLabels: Record<string, string>;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogClient({ posts, categoryLabels }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allCategories = ["all", ...Array.from(new Set(posts.flatMap((p) => p.categories)))];

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.categories.includes(activeCategory));

  return (
    <>
      <div className="min-h-screen bg-bone pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-earth text-sm font-semibold tracking-widest uppercase">
              מחשבות ותובנות
            </span>
            <h1 className="font-serif text-5xl font-bold text-gray-900 mt-3 mb-4">
              הבלוג
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              מאמרים על פסיכותרפיה, שיטת ימימה, גוף-נפש ובריאות הנפש.
            </p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-sage text-white shadow-sm"
                    : "bg-white border border-warm-200 text-gray-600 hover:border-sage/40"
                }`}
              >
                {cat === "all" ? "הכל" : categoryLabels[cat] ?? cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post) => (
              <motion.article
                key={post._id}
                variants={item}
                className="bg-white/80 backdrop-blur-sm border border-warm-200 rounded-3xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Category tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-sage/10 text-sage px-2 py-0.5 rounded-full"
                      >
                        {categoryLabels[cat] ?? cat}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-sage transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-warm-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock size={12} />
                      <span>{post.readingTime} דק׳ קריאה</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="flex items-center gap-1 text-sm font-semibold text-sage hover:gap-2 transition-all"
                    >
                      קרא עוד
                      <ArrowLeft size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              אין פוסטים בקטגוריה זו עדיין.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
