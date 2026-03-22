"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LeadMagnet() {
  return (
    <section className="py-16 bg-earth/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-earth/20 text-earth-dark text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} />
            מתנה בחינם
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
            מדריך לשלום פנימי
          </h2>
          <p className="text-gray-600 mb-8">
            קבל/י מדריך חינמי עם 5 כלים מעשיים לטיפוח שלום פנימי בחיי היומיום —
            מגישת שיטת ימימה.
          </p>

          <a
            href="https://danielw.ravpage.co.il/guide.takeoff"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-earth text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-earth-dark transition-colors shadow-md"
          >
            שלחו לי את המדריך
          </a>
        </motion.div>
      </div>
    </section>
  );
}
