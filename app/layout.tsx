import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "דניאל ווסטפריד | פסיכותרפיסט גוף-נפש",
  description:
    "דניאל ווסטפריד, פסיכותרפיסט ומטפל גוף-נפש. שיטת ימימה, טיפול דינאמי וכלי גוף-נפש. ליווי אישי וקבוצתי ברמת גן ובשומרון.",
  keywords: [
    "פסיכותרפיסט",
    "טיפול נפשי",
    "שיטת ימימה",
    "גוף נפש",
    "דניאל ווסטפריד",
  ],
  openGraph: {
    title: "דניאל ווסטפריד | פסיכותרפיסט גוף-נפש",
    description:
      "מפגש של האדם עם ההווה. ריפוי מתוך קבלה עצמית, חום ואהבה פנימיים.",
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
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        {children}
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
