"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, Calendar, Clock, Phone } from "lucide-react";

const challenges = [
  "חזרת הביתה אבל לא מרגיש כמו הבית",
  "פלאשבקים, קשיי שינה, ריחוק רגשי",
  "קושי במעבר בין חיי מילואים לחיים האזרחיים",
  "כעסים, עצבנות וחרדה שלא מרפים",
];

export default function SoldiersSection() {
  const waMessage =
    "שלום, אני חייל/מילואימניק ואשמח לפרטים על הסדנה להרפיה ושחרור";
  const waHref = `https://wa.me/972509591974?text=${encodeURIComponent(waMessage)}`;

  return (
    <section id="soldiers" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-blue-pale text-blue-deep text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Shield size={14} />
            לחיילים ומילואימניקים
          </span>
          <h2 className="font-serif text-4xl font-bold text-blue-deep mb-4">
            גיבור, נתת בשביל המדינה —<br />
            זה הזמן לתת לך בחזרה
          </h2>
          <p className="text-text-mid max-w-2xl mx-auto">
            במהלך שנות עבודתי פיתחתי סדנאות טיפול מיוחדות לחיילים בסדיר ומילואים.
            מרחב לעיבוד, לשחרור, ולחזרה לעצמך.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Challenges card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm border border-cream-deeper rounded-3xl p-8"
          >
            <h3 className="font-bold text-xl text-text-dark mb-6">
              מכיר את התחושות האלה?
            </h3>
            <ul className="space-y-4">
              {challenges.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-sand mt-2 flex-shrink-0" />
                  <span className="text-text-mid">{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-cream-dark">
              <p className="text-text-mid leading-relaxed">
                אני רוצה להכיר אותך ולהציע לך כלים לתהליך.{" "}
                <strong className="text-blue-mid">
                  בהחזר מלא מקרן הסיוע למילואים!
                </strong>
              </p>
            </div>
          </motion.div>

          {/* Workshop card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-deep text-white rounded-3xl p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs">סדנת טיפול ועיבוד</p>
                <h3 className="font-bold text-lg">סדנה להרפיה ושחרור</h3>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed mb-6">
              סדנאות מיוחדות לחיילים הגיבורים שלנו. נתנסה במספר כלים טיפוליים
              שיעזרו לנו לשחרר את מה שיושב לנו בבטן.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <Calendar size={16} className="text-sand-light" />
                <span className="text-sm">הזדמנויות שניה — בקרוב</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <MapPin size={16} className="text-sand-light" />
                <span className="text-sm">אריאל, מכון לוז (מרכז אלמוג)</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <Clock size={16} className="text-sand-light" />
                <span className="text-sm">מספר מקומות מוגבל</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <Phone size={16} className="text-sand-light" />
                <span className="text-sm font-bold">הסדנה בחינם — בשבילך!</span>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-blue-deep font-bold text-center py-3 rounded-full hover:bg-cream-dark transition-colors"
              >
                להרשמה ופרטים נוספים
              </a>
              <a
                href="tel:0509591974"
                className="block w-full border border-white/30 text-white font-medium text-center py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                050-959-1974
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
