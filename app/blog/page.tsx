import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "בלוג | דניאל ווסטפריד",
  description:
    "מאמרים על פסיכותרפיה, שיטת ימימה, גוף-נפש ובריאות הנפש מאת דניאל ווסטפריד.",
};

// Fallback posts while Sanity is not configured
const samplePosts = [
  {
    _id: "1",
    title: "מה זה שלום פנימי? מבוא לשיטת ימימה",
    slug: { current: "shalom-pnimi" },
    publishedAt: "2025-03-01",
    excerpt:
      "שיטת ימימה מדברת הרבה על 'שלום פנימי' — אבל מה זה אומר בפועל? מאמר זה מנסה להסביר את המושג בצורה פשוטה ומעשית.",
    categories: ["yemima"],
    readingTime: 5,
  },
  {
    _id: "2",
    title: "חזרה מהמילואים: למה קשה לחזור לשגרה?",
    slug: { current: "return-from-reserves" },
    publishedAt: "2025-02-14",
    excerpt:
      "אחרי שבועות או חודשים בשירות, החזרה הביתה לא תמיד קלה. הגוף חוזר — אבל הראש עוד שם. מה קורה ומה אפשר לעשות?",
    categories: ["soldiers"],
    readingTime: 4,
  },
  {
    _id: "3",
    title: "מגע עם ההווה: כלי פשוט לרגיעה מיידית",
    slug: { current: "present-moment" },
    publishedAt: "2025-01-20",
    excerpt:
      "רובנו חיים רוב הזמן בעבר או בעתיד. הנה תרגיל אחד פשוט שיעזור לך להתחבר להווה ולהרגיש יותר שלם.",
    categories: ["mindbody"],
    readingTime: 3,
  },
];

const categoryLabels: Record<string, string> = {
  yemima: "שיטת ימימה",
  personal: "טיפול אישי",
  mindbody: "גוף-נפש",
  soldiers: "מילואים וחיילים",
  parenting: "הורות",
};

export default function BlogPage() {
  return <BlogClient posts={samplePosts} categoryLabels={categoryLabels} />;
}
