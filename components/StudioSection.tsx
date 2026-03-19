"use client";

import { motion } from "framer-motion";

export default function StudioSection() {
  return (
    <section className="relative h-[70vh] min-h-[400px] overflow-hidden">
      {/* Background image - parallax on desktop */}
      <div
        className="absolute inset-0 bg-center bg-cover md:bg-fixed"
        style={{
          backgroundImage: "url('/images/תמונה דניאל 2.jpg')",
          filter: "brightness(0.9) saturate(0.8) sepia(0.1)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-deep/70 via-blue-deep/20 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-end pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <p className="text-sand-light text-sm font-semibold mb-3 tracking-widest uppercase">
              המרחב הטיפולי
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              לפעמים, הריפוי זקוק למעגל
            </h2>
            <p className="text-white/80 leading-relaxed">
              מרחב מכיל, חם ובטוח — שבו הנפש יכולה להרגיש מספיק בנוח
              כדי לפתוח שערים שהיו סגורים.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
