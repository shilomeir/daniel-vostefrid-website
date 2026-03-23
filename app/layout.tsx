import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "דניאל וסטפריד | פסיכותרפיסט גוף-נפש",
  description:
    "דניאל וסטפריד, פסיכותרפיסט ומטפל גוף-נפש. שיטת ימימה, טיפול דינאמי וכלי גוף-נפש. ליווי אישי וקבוצתי ברמת גן ובשומרון.",
  keywords: ["פסיכותרפיסט", "טיפול נפשי", "שיטת ימימה", "גוף נפש", "דניאל וסטפריד"],
  openGraph: {
    title: "דניאל וסטפריד | פסיכותרפיסט גוף-נפש",
    description: "מפגש של האדם עם ההווה. ריפוי מתוך קבלה עצמית, חום ואהבה פנימיים.",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;700;900&family=Heebo:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </head>
      <body className="font-sans bg-bone antialiased">
        <Navbar />
        <main>{children}</main>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
