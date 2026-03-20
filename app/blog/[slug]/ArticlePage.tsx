"use client";

import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
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
      <h2>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3>{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4>{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em>{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span style={{ textDecoration: "underline" }}>{children}</span>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol>{children}</ol>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(800).quality(80).url();
      return (
        <figure>
          <div className="article-main-image">
            <Image
              src={imageUrl}
              alt={value.alt || "תמונה מתוך המאמר"}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
          {value.alt && <figcaption>{value.alt}</figcaption>}
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
      <div className="article-page" dir="rtl">
        <div className="article-page__inner">
          {/* Back button */}
          <Link href="/blog" className="article-back">
            ← חזרה לבלוג
          </Link>

          {/* Article header */}
          <header className="article-header">
            <h1 className="article-header__title">{post.title}</h1>
            <div className="article-header__meta">
              <span>דניאל ווסטפריד</span>
              {post.publishedAt && (
                <span>{formatHebrewDate(post.publishedAt)}</span>
              )}
            </div>
          </header>

          {/* Main Image */}
          {post.mainImage?.asset?.url && (
            <div className="article-main-image">
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />
            </div>
          )}

          {/* Divider */}
          <div className="article-divider" />

          {/* Article body */}
          <div className="article-body">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>

          {/* Share section */}
          <div className="article-share">
            <div className="article-share__card">
              <p className="article-share__text">
                נהנית מהמאמר? שתף עם מישהו שזה יכול לעזור לו
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share__btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                שתף בוואטסאפ
              </a>
            </div>
          </div>

          {/* Bottom back button */}
          <div className="article-bottom-back">
            <Link href="/blog" className="article-back article-back--outline">
              ← חזרה לכל המאמרים
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
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
