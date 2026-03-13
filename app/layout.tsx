import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "דניאל ווסטפריד | פסיכותרפיסט גוף-נפש",
  description:
    "דניאל ווסטפריד, פסיכותרפיסט ומטפל גוף-נפש. שיטת ימימה, טיפול דינאמי וכלי גוף-נפש. ליווי אישי וקבוצתי ברמת גן ובשומרון.",
  keywords: ["פסיכותרפיסט", "טיפול נפשי", "שיטת ימימה", "גוף נפש", "דניאל ווסטפריד"],
  openGraph: {
    title: "דניאל ווסטפריד | פסיכותרפיסט גוף-נפש",
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
      <body className="font-sans bg-bone antialiased">
        <Navbar />
        <main>{children}</main>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
