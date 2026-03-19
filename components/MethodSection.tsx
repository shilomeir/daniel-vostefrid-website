"use client";

import { motion } from "framer-motion";

const methods = [
  {
    num: "01",
    title: "שיטת ימימה",
    body: "מפגש של האדם עם ההווה, עם מה שמאתגר אותו כאן ועכשיו. מתוך כך נבנית <strong>הכרה</strong> והבנה הקושרת אל העבר, אל המקום בו התקבעו ההתנהגויות ודפוסי החשיבה.",
    footer: "הריפוי מתהווה מתוך קבלה עצמית, חום ואהבה פנימיים.",
  },
  {
    num: "02",
    title: "טיפול דינאמי",
    body: "עבודה עם שכבות עמוקות של הנפש: הבנת מקורות הכאב, הדפוסים הפנימיים, ומה שמניע את ההתנהגות שלנו.",
    footer: "שיטה המאפשרת שינוי עמוק ומתמשך, שמחזיק לאורך זמן.",
  },
  {
    num: "03",
    title: "כלי גוף-נפש",
    body: "שיטת <strong>המסע</strong>, <strong>התמקדות</strong>, ו<strong>נשימות מעגליות</strong>: כלים גופניים המאפשרים גמישות טיפולית.",
    footer: "מצליחים לקדם את התהליך במקומות הקשים ביותר, שם המילים לבדן אינן מספיקות.",
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="py-24 bg-blue-deep/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-light text-sm font-semibold tracking-widest uppercase">
            הגישה הטיפולית
          </span>
          <h2 className="font-serif text-4xl font-bold text-blue-deep mt-3 mb-4">
            שיטת הטיפול
          </h2>
          <p className="text-text-mid max-w-2xl mx-auto">
            שילוב ייחודי של עומק רוחני ועומק פסיכולוגי. הבסיס הוא שיטת ימימה,
            ועמה — טיפול דינאמי וכלי גוף-נפש.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {methods.map((m, i) => (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-7 border border-cream-deeper shadow-sm"
            >
              <span className="text-6xl font-bold text-sand/20 font-serif absolute top-4 start-6">
                {m.num}
              </span>
              <div className="relative mt-8">
                <h3 className="text-xl font-bold text-text-dark mb-3">{m.title}</h3>
                <p
                  className="text-text-mid text-sm leading-relaxed mb-3"
                  dangerouslySetInnerHTML={{ __html: m.body }}
                />
                <p className="text-sand-dark text-sm font-medium">{m.footer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-blue-deep text-white rounded-3xl p-10 text-center"
        >
          <svg
            className="w-10 h-8 text-sand/60 mx-auto mb-4"
            viewBox="0 0 60 45"
            fill="none"
          >
            <path
              d="M0 45V27C0 19.8 2.4 13.8 7.2 9C12 4.2 18.6 1.2 27 0L30 6C24 7.2 19.2 9.6 15.6 13.2C12 16.8 10.2 21 10.2 25.8H18V45H0ZM30 45V27C30 19.8 32.4 13.8 37.2 9C42 4.2 48.6 1.2 57 0L60 6C54 7.2 49.2 9.6 45.6 13.2C42 16.8 40.2 21 40.2 25.8H48V45H30Z"
              fill="currentColor"
            />
          </svg>
          <p className="font-serif text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">
            כאשר יש{" "}
            <em className="text-sand-light not-italic font-bold">שלום פנימי</em>{" "}
            בין כל החלקים, מתאפשר לנפש לצאת{" "}
            <em className="text-sand-light not-italic font-bold">מהתקיעות</em>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
