import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postSchema } from "@/sanity/schemas/post";

export default defineConfig({
  projectId: "3zyocf76",
  dataset: "production",
  title: "דניאל ווסטפריד — ניהול תוכן",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [postSchema],
  },
});
