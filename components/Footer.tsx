import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-sage text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="דניאל ווסטפריד"
              width={40}
              height={40}
              className="rounded-full opacity-90"
            />
            <div>
              <p className="font-bold">דניאל ווסטפריד</p>
              <p className="text-white/60 text-sm">פסיכותרפיסט ומטפל גוף-נפש</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <a href="#about" className="hover:text-white transition-colors">אודות</a>
            <a href="#method" className="hover:text-white transition-colors">שיטת הטיפול</a>
            <a href="#services" className="hover:text-white transition-colors">שירותים</a>
            <a href="#soldiers" className="hover:text-white transition-colors">לחיילים</a>
            <a href="#contact" className="hover:text-white transition-colors">צור קשר</a>
            <a href="/blog" className="hover:text-white transition-colors">בלוג</a>
          </div>

          <div className="text-sm text-white/60 text-center">
            <a href="tel:0509591974" className="hover:text-white transition-colors" dir="ltr">
              050-959-1974
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} דניאל ווסטפריד. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
