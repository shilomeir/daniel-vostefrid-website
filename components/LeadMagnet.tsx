"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `שלום, אני מעוניין/ת לקבל את המדריך "שלום פנימי". כתובת האימייל שלי: ${email}`;
    window.open(
      `https://wa.me/972509591974?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setDone(true);
  };

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

          {done ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-200">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-bold text-gray-900">תודה! המדריך בדרך אליך.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="כתובת אימייל"
                className="flex-1 bg-white border border-warm-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 text-center sm:text-right"
              />
              <button
                type="submit"
                className="bg-earth text-white font-bold px-6 py-3 rounded-full hover:bg-earth-dark transition-colors whitespace-nowrap"
              >
                שלחו לי את המדריך
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
