import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { samplePosts, categoryLabels } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "בלוג | דניאל ווסטפריד",
  description:
    "מאמרים על פסיכותרפיה, שיטת ימימה, גוף-נפש ובריאות הנפש מאת דניאל ווסטפריד.",
};

export default function BlogPage() {
  return <BlogClient posts={samplePosts} categoryLabels={categoryLabels} />;
}
