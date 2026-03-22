"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "אודות" },
  { href: "#method", label: "שיטת הטיפול" },
  { href: "#articles", label: "מאמרים" },
  { href: "#services", label: "שירותים" },
  { href: "#soldiers", label: "לחיילים" },
  { href: "#contact", label: "צור קשר" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="דניאל וסטפריד"
            width={44}
            height={44}
            className="rounded-full object-contain"
          />
          <span className="hidden sm:block text-sage font-semibold text-sm">
            דניאל וסטפריד
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-700 hover:text-sage transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%95%D7%A2%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%99%D7%9B%D7%A8%D7%95%D7%AA."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sage text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-sage-dark transition-colors"
          >
            לתיאום שיחה
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-sage"
          aria-label="תפריט"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-warm-100 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-700 font-medium py-2 border-b border-warm-100 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/972509591974"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-sage text-white text-center font-medium px-4 py-3 rounded-full"
          >
            לתיאום שיחה
          </a>
        </div>
      )}
    </header>
  );
}
