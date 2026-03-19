"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin } from "lucide-react";

type Area = "personal" | "soldier" | "workshop" | "";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState<Area>("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const areaLabel =
      area === "personal"
        ? "טיפול אישי"
        : area === "soldier"
        ? "חייל/מילואימניק"
        : area === "workshop"
        ? "סדנה קבוצתית"
        : "כללי";
    const msg = `שלום, שמי ${name}. מספר טלפון: ${phone}. תחום עניין: ${areaLabel}.`;
    window.open(
      `https://wa.me/972509591974?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-light text-sm font-semibold tracking-widest uppercase">
              יצירת קשר
            </span>
            <h2 className="font-serif text-4xl font-bold text-blue-deep mt-3 mb-6">
              מוכן לצאת לדרך?
            </h2>
            <p className="text-text-mid leading-relaxed mb-8">
              הצעד הראשון הוא לפנות. שיחת היכרות קצרה, ללא התחייבות —
              להבין אם אנחנו מתאימים לעבוד יחד.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-cream-dark rounded-2xl p-4">
                <div className="w-10 h-10 bg-blue-deep/10 rounded-xl flex items-center justify-center">
                  <Phone size={18} className="text-blue-deep" />
                </div>
                <div>
                  <p className="text-xs text-text-light">טלפון / WhatsApp</p>
                  <a
                    href="tel:0509591974"
                    className="font-bold text-text-dark hover:text-blue-mid transition-colors"
                    dir="ltr"
                  >
                    050-959-1974
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-cream-dark rounded-2xl p-4">
                <div className="w-10 h-10 bg-blue-deep/10 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-blue-deep" />
                </div>
                <div>
                  <p className="text-xs text-text-light">אזורי פעילות</p>
                  <p className="font-bold text-text-dark">רמת גן | אריאל | שומרון</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm border border-cream-deeper rounded-3xl p-8 shadow-sm"
          >
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-xl text-text-dark mb-2">
                  תודה! נשלחת ל-WhatsApp
                </h3>
                <p className="text-text-light">אחזור אליך בהקדם.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-bold text-xl text-text-dark mb-6">
                  השאר פרטים ואחזור אליך
                </h3>

                <div>
                  <label className="block text-sm font-medium text-text-mid mb-1">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="הכנס שם..."
                    className="w-full bg-cream-dark border border-cream-deeper rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-light/30 focus:border-blue-mid transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-mid mb-1">
                    טלפון
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05x-xxxxxxx"
                    dir="ltr"
                    className="w-full bg-cream-dark border border-cream-deeper rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-light/30 focus:border-blue-mid transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-mid mb-1">
                    תחום עניין
                  </label>
                  <select
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value as Area)}
                    className="w-full bg-cream-dark border border-cream-deeper rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-light/30 focus:border-blue-mid transition-all appearance-none"
                  >
                    <option value="" disabled>
                      בחר/י...
                    </option>
                    <option value="personal">טיפול אישי</option>
                    <option value="soldier">חייל / מילואימניק</option>
                    <option value="workshop">סדנה קבוצתית</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-deep text-white font-bold py-3.5 rounded-full hover:bg-blue-mid transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  שלח ב-WhatsApp
                </button>

                <p className="text-xs text-text-light text-center">
                  הפרטים שלך לא יועברו לגורם שלישי
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
