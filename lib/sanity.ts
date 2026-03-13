import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export function readingTime(body: Array<{ children?: Array<{ text: string }> }>): number {
  const words = body
    ?.flatMap((b) => b.children?.map((c) => c.text) ?? [])
    .join(" ")
    .split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}
