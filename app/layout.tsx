import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://westipul.com"),
  title: "דניאל וסטפריד | פסיכותרפיסט גוף-נפש",
  description:
    "דניאל וסטפריד, פסיכותרפיסט ומטפל גוף-נפש. שיטת ימימה, טיפול דינאמי וכלי גוף-נפש. ליווי אישי וקבוצתי ברמת גן ובשומרון.",
  keywords: [
    "פסיכותרפיסט",
    "טיפול נפשי",
    "שיטת ימימה",
    "גוף נפש",
    "דניאל וסטפריד",
  ],
  alternates: {
    canonical: "https://westipul.com",
  },
  openGraph: {
    title: "דניאל וסטפריד | פסיכותרפיסט גוף-נפש",
    description:
      "מפגש של האדם עם ההווה. ריפוי מתוך קבלה עצמית, חום ואהבה פנימיים.",
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
