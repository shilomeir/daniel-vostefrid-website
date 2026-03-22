"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen } from "lucide-react";

const trustItems = [
  { label: "אוניברסיטת אריאל", sub: "MSW — בתהליך" },
  { label: "אוניברסיטת חיפה", sub: "פסיכותרפיה אינטגרטיבית" },
  { label: "שיטת ימימה", sub: "למעלה מ-10 שנים" },
  { label: "סדנאות טיפול ועיבוד מיוחדות לחיילים", sub: "מילואים ובסדיר" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-bone"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, #C2A88820 0%, transparent 50%), radial-gradient(circle at 20% 80%, #5F6F6215 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Right: Text (RTL = this appears first) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-earth/20 text-earth-dark text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              פסיכותרפיסט ומטפל גוף-נפש
            </motion.span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              כשיש{" "}
              <span className="text-sage">שלום פנימי</span>{" "}
              <br className="hidden sm:block" />
              בין כל החלקים —
              <br />
              <span className="text-earth">הנפש מתחילה לנשום</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
              אני דניאל וסטפריד. מאמין גדול ביכולת של האדם להשתנות, לצמוח
              ולקחת אחריות על חייו. עם הכלים הנכונים — הריפוי מתהווה מתוך פנים.
            </p>

            <div className="flex flex-wrap gap-4 mb-5">
              <a
                href="#contact"
                className="bg-sage text-white font-semibold px-6 py-3 rounded-full hover:bg-sage-dark transition-colors shadow-md"
              >
                לתיאום שיחת היכרות
              </a>
              <a
                href="#method"
                className="border border-sage/40 text-sage font-semibold px-6 py-3 rounded-full hover:bg-sage/5 transition-colors"
              >
                על שיטת הטיפול
              </a>
            </div>

            {/* Articles banner */}
            <motion.a
              href="#articles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-earth/15 border border-earth/30 text-earth-dark font-semibold px-5 py-2.5 rounded-full hover:bg-earth/25 transition-colors text-sm mb-12"
            >
              <BookOpen size={15} />
              מאמרים חדשים בבלוג
            </motion.a>

            {/* Trust Ribbon */}
            <div className="grid grid-cols-2 gap-3">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm border border-warm-200 rounded-2xl p-3"
                >
                  <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[520px]">
              {/* Decorative blob */}
              <div className="absolute inset-4 bg-earth/20 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] -z-10" />
              <Image
                src="/images/daniel-hero.jpg"
                alt="דניאל וסטפריד, פסיכותרפיסט"
                fill
                priority
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover rounded-[2rem] shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-gray-400">גלול למטה</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-earth to-transparent rounded-full" />
      </motion.div>
    </section>
  );
}
