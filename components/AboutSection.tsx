"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const credentials = [
  { emoji: "🎓", text: "תואר שני בעבודה סוציאלית (MSW) — אוניברסיטת אריאל (בתהליך)" },
  { emoji: "🏛️", text: "פסיכותרפיה אינטגרטיבית — מכון אבולעפיה, אוניברסיטת חיפה" },
  { emoji: "🌿", text: "שיטת ימימה — למעלה מ-10 שנות לימוד ועיסוק" },
  { emoji: "🪖", text: "סדנאות טיפול ועיבוד מיוחדות לחיילים" },
  { emoji: "🏡", text: "גר בכפר תפוח, שומרון. נשוי ואב לשישה" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-bone">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative">
              <div className="relative h-[480px] rounded-[2rem] overflow-hidden">
                <Image
                  src="/images/daniel-about.jpg"
                  alt="דניאל וסטפריד"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating quote card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -start-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-[220px] border border-warm-100"
              >
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  &ldquo;הריפוי מתהווה מתוך קבלה עצמית, חום ואהבה פנימיים&rdquo;
                </p>
              </motion.div>
            </div>
            {/* Bench photo */}
            <div className="relative h-40 rounded-2xl overflow-hidden mt-10">
              <Image
                src="/images/daniel-bench.jpg"
                alt="דניאל וסטפריד"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-earth text-sm font-semibold tracking-widest uppercase">
              אודותי
            </span>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mt-3 mb-6">
              שמי דניאל וסטפריד
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                בחרתי לעסוק בתחום הטיפול מתוך{" "}
                <strong className="text-gray-800">שליחות</strong> ואמונה גדולה
                ביכולת האדם להתפתח, להשתנות ולקחת אחריות על חייו.
              </p>
              <p>
                כמו כן, אני בלימודי התואר השני בעבודה סוציאלית (MSW) באוניברסיטת אריאל.
              </p>
              <p>
                במהלך עבודתי החינוכית נחשפתי להרבה קשיים, טראומות ומצבי נפש
                לא פשוטים של נערים ובוגרים — וראיתי כמה הם זקוקים להכוונה
                אל מול אתגרי החיים.
              </p>
              <p>
                למדתי שיטות מגוונות וכלים רבים, ואני מאמין שכל אדם נושא
                בתוכו את הכוח לצאת מהתקיעות — כשיש ליווי מקצועי ומכיל.
              </p>
            </div>

            <div className="space-y-3">
              {credentials.map((c, i) => (
                <motion.div
                  key={c.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 bg-warm-50 rounded-xl px-4 py-3"
                >
                  <span className="text-lg">{c.emoji}</span>
                  <span className="text-sm text-gray-700">{c.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
