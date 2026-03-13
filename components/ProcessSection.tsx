"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "שיחת היכרות",
    desc: "שיחת טלפון של 20 דק' להכיר, לשאול ולהבין מה מתאים לך",
    icon: "📞",
  },
  {
    num: "02",
    title: "פגישה ראשונה",
    desc: "מפגש ראשוני להכרות מעמיקה ולהתאמת דרך העבודה",
    icon: "🌱",
  },
  {
    num: "03",
    title: "תהליך אישי",
    desc: "ליווי שוטף, מותאם אישית, עם כלים מגוונים ועומק טיפולי",
    icon: "🛤️",
  },
  {
    num: "04",
    title: "שינוי מתמשך",
    desc: "שינוי שמחזיק לאורך זמן — בחיים, בקשרים, בתוך עצמך",
    icon: "✨",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-warm-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-earth text-sm font-semibold tracking-widest uppercase">
            איך מתחילים?
          </span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-3">
            תהליך ההצטרפות
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative bg-white/80 backdrop-blur-sm border border-warm-200 rounded-3xl p-6 text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <span className="text-earth text-sm font-bold">{step.num}</span>
              <h3 className="font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -end-3 w-6 h-0.5 bg-earth/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
