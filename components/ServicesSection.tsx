"use client";

import { motion } from "framer-motion";
import { Heart, Leaf, Wind, Users, Sparkles, Brain } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "טיפול אישי",
    desc: "מרחב בטוח ומכיל לבחינת הקשיים, הכאב והדפוסים. תהליך אישי עמוק לשינוי מתמשך.",
    color: "bg-rose-50 text-rose-500",
  },
  {
    icon: Leaf,
    title: "שיטת ימימה",
    desc: "מפגש עם ההווה. בניית הכרה עצמית, הבנת דפוסי חשיבה, וריפוי מתוך קבלה ואהבה פנימית.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: Brain,
    title: "טיפול דינאמי",
    desc: "עבודה עם שכבות עמוקות של הנפש. הבנת מקורות הכאב ושינוי שמחזיק לאורך זמן.",
    color: "bg-blue-pale text-blue-deep",
  },
  {
    icon: Sparkles,
    title: "שיטת המסע",
    desc: "כלי גוף-נפש עוצמתי לשחרור חסמים רגשיים ולהתגברות על מקומות קשים שהמילים לבדן אינן מגיעות.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Wind,
    title: "נשימות מעגליות",
    desc: "טכניקות נשימה שמשחררות מתח גופני ומאפשרות גישה לשכבות עמוקות של הנפש.",
    color: "bg-sky-50 text-sky-500",
  },
  {
    icon: Users,
    title: "ליווי קבוצתי",
    desc: "קבוצות תהליך בשיטת ימימה. מרחב של צמיחה משותפת, חיבור ותמיכה.",
    color: "bg-purple-50 text-purple-500",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-light text-sm font-semibold tracking-widest uppercase">
            ארגז הכלים שלי
          </span>
          <h2 className="font-serif text-4xl font-bold text-blue-deep mt-3 mb-4">
            שיטות הטיפול
          </h2>
          <p className="text-text-mid max-w-xl mx-auto">
            שילוב ייחודי של גישות מבוססות-מחקר עם עומק רוחני. כל כלי נבחר
            בקפידה להתאמה אישית לתהליך שלך.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="bg-white/70 backdrop-blur-sm border border-cream-deeper rounded-3xl p-6 hover:shadow-md transition-shadow group"
            >
              <div className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center mb-4`}>
                <s.icon size={22} />
              </div>
              <h3 className="font-semibold text-lg text-text-dark mb-2">{s.title}</h3>
              <p className="text-text-mid text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
