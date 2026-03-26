import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://westipul.com"),
  title: "דניאל וסטפריד | פסיכותרפיסט גוף - נפש",
  description:
    "דניאל וסטפריד – פסיכותרפיסט גופני המציע טיפול רגשי ממוקד גוף-נפש. מומחה בטיפול בטראומה ופוסט-טראומה (PTSD), ליווי חיילי מילואים ומשוחררים, והתמודדות עם חרדה, משברי חיים ואובדן. קליניקה ברמת גן ובשומרון, וגם באונליין.",
  keywords: [
    "פסיכותרפיסט גופני",
    "טיפול רגשי גוף נפש",
    "דניאל וסטפריד",
    "שיטת ימימה",
    "טיפול בטראומה",
    "פוסט טראומה PTSD",
    "טיפול חיילים מילואים",
    "ליווי נפשי חיילים משוחררים",
    "סיוע נפשי נפגעי מלחמה",
    "חרדה לחץ שחיקה",
    "התפתחות אישית",
    "טיפול גברים",
    "משבר חיים אבל ואובדן",
    "מערכות יחסים תקשורת",
    "דימוי עצמי ביטחון עצמי",
    "פסיכותרפיסט רמת גן",
    "פסיכותרפיסט שומרון",
    "טיפול נפשי אונליין",
  ],
  alternates: {
    canonical: "https://westipul.com",
  },
  openGraph: {
    title: "דניאל וסטפריד | פסיכותרפיסט גופני – טיפול בטראומה וגוף-נפש",
    description:
      "טיפול רגשי ממוקד גוף-נפש. מומחה בטראומה, ליווי חיילים ומילואימניקים, והתמודדות עם חרדה ומשברי חיים.",
    url: "https://westipul.com",
    siteName: "דניאל וסטפריד",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;700;900&family=Heebo:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="2G--KPBFXzHnz-iLuue6qMHw3qnBMab62FGRVOVRp2I" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "דניאל וסטפריד",
              url: "https://westipul.com",
              image: "https://westipul.com/images/daniel-about.jpg",
              jobTitle: "פסיכותרפיסט גופני",
              description:
                "פסיכותרפיסט גופני המתמחה בטיפול רגשי ממוקד גוף-נפש, טיפול בטראומה ופוסט-טראומה, ליווי חיילי מילואים ומשוחררים, והתמודדות עם חרדה ומשברי חיים.",
              knowsAbout: [
                "פסיכותרפיה גופנית",
                "טיפול בטראומה ופוסט-טראומה",
                "שיטת ימימה",
                "ליווי חיילים ומילואימניקים",
                "התמודדות עם חרדה ולחץ",
                "משברי חיים ואובדן",
                "התפתחות אישית",
              ],
              worksFor: {
                "@type": "LocalBusiness",
                name: "דניאל וסטפריד – פסיכותרפיה גופנית",
                url: "https://westipul.com",
                telephone: "+972-58-489-0101",
                address: [
                  {
                    "@type": "PostalAddress",
                    addressLocality: "רמת גן",
                    addressCountry: "IL",
                  },
                  {
                    "@type": "PostalAddress",
                    addressLocality: "שומרון",
                    addressCountry: "IL",
                  },
                ],
                priceRange: "$$",
                availableLanguage: "Hebrew",
              },
              sameAs: ["https://westipul.com"],
            }),
          }}
        />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        {children}
        <Script src="/script.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
