import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postSchema } from "@/sanity/schemas/post";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lq81li32",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "דניאל ווסטפריד — ניהול תוכן",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [postSchema],
  },
});
