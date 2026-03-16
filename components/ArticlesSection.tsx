"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
}

interface Props {
  articles: Article[];
}

export default function ArticlesSection({ articles }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (articles.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const truncate = (text: string, wordCount: number) => {
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return { preview: text, hasMore: false };
    return {
      preview: words.slice(0, wordCount).join(" ") + "...",
      hasMore: true,
    };
  };

  return (
    <section id="articles" className="py-24 bg-warm-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-earth text-sm font-semibold tracking-widest uppercase">
            <BookOpen size={16} />
            מאמרים ותובנות
          </span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-3 mb-4">
            מאמרים אחרונים
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            מחשבות, כלים ותובנות מעולם הטיפול — לקריאה חופשית
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => {
            const isExpanded = expandedId === article._id;
            const { preview, hasMore } = truncate(article.excerpt, 50);

            const shareUrl =
              typeof window !== "undefined"
                ? `${window.location.origin}/blog/${article.slug}`
                : `/blog/${article.slug}`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
              `${article.title}\n${shareUrl}`
            )}`;

            return (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-warm-200 shadow-sm flex flex-col overflow-hidden"
              >
                {/* Decorative top bar */}
                <div className="h-1.5 bg-gradient-to-l from-sage via-earth to-sage-light" />

                <div className="p-7 flex flex-col flex-1" dir="rtl">
                  {/* Date */}
                  <span className="text-xs text-gray-400 mb-3">
                    {formatDate(article.publishedAt)}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                    {article.title}
                  </h3>

                  {/* Content */}
                  <div className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.p
                          key="full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {article.excerpt}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="preview"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {preview}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-warm-100 space-y-3">
                    {hasMore && !isExpanded && (
                      <button
                        onClick={() => setExpandedId(article._id)}
                        className="w-full bg-sage/10 text-sage font-semibold py-2.5 rounded-full hover:bg-sage/20 transition-colors text-sm"
                      >
                        להמשך המאמר
                      </button>
                    )}

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <Link
                          href={`/blog/${article.slug}`}
                          className="w-full bg-sage text-white font-semibold py-2.5 rounded-full hover:bg-sage-dark transition-colors text-sm text-center flex items-center justify-center gap-2"
                        >
                          למאמר המלא
                          <ArrowLeft size={14} />
                        </Link>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#25D366] text-white font-semibold py-2.5 rounded-full hover:bg-[#1fb855] transition-colors text-sm text-center flex items-center justify-center gap-2"
                        >
                          <Share2 size={14} />
                          שתף בוואטסאפ
                        </a>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          סגור
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
