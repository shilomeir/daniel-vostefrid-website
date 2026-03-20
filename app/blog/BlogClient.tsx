"use client";

import Link from "next/link";
import Image from "next/image";
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

export default function BlogClient({ posts }: Props) {
  return (
    <>
      <div className="blog-page">
        <div className="blog-page__inner">
          {/* Header */}
          <div className="blog-page__header">
            <span className="blog-page__label">מחשבות ותובנות</span>
            <h1 className="blog-page__title">הבלוג</h1>
            <p className="blog-page__desc">
              מאמרים על פסיכותרפיה, שיטת ימימה, גוף-נפש ובריאות הנפש.
            </p>
          </div>

          {/* Grid */}
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <article key={post._id} className="blog-card">
                  {post.mainImageUrl && (
                    <div className="blog-card__image-wrap">
                      <Image
                        src={post.mainImageUrl}
                        alt={post.title}
                        fill
                        className="blog-card__img"
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="blog-card__body">
                    <span className="blog-card__date">
                      {formatHebrewDate(post.publishedAt)}
                    </span>
                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <div className="blog-card__footer">
                      <span className="blog-card__reading-time">
                        {post.readingTime} דק׳ קריאה
                      </span>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="blog-card__link"
                      >
                        קרא עוד ←
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <p>עדיין אין מאמרים. מאמרים חדשים יופיעו כאן בקרוב!</p>
            </div>
          )}
        </div>
      </div>

      {/* Simple footer matching the site */}
      <footer className="footer">
        <div className="footer__inner">
          <a href="/" className="footer__logo">
            <img src="/images/logo.png" alt="דניאל ווסטפריד" />
          </a>
          <nav className="footer__nav" aria-label="ניווט תחתון">
            <a href="/#about">אודות</a>
            <a href="/#method">שיטת הטיפול</a>
            <a href="/#soldiers">לחיילים</a>
            <a href="/#services">שירותים</a>
            <a href="/blog">בלוג</a>
            <a href="/#contact">צור קשר</a>
          </nav>
          <p className="footer__copy">© 2026 שילה מאיר | כל הזכויות שמורות</p>
        </div>
      </footer>
    </>
  );
}
