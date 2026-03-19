import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lq81li32";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder for optimized Sanity images
const builder = createImageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

export function readingTime(
  body: Array<{ children?: Array<{ text: string }> }>
): number {
  const words =
    body
      ?.flatMap((b) => b.children?.map((c) => c.text) ?? [])
      .join(" ")
      .split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

export function extractPlainText(
  body: Array<{ children?: Array<{ text: string }> }>
): string {
  return (
    body
      ?.flatMap((b) => b.children?.map((c) => c.text) ?? [])
      .join(" ") ?? ""
  );
}

/**
 * Format date in Israeli format (e.g., "15 במרץ 2025")
 */
export function formatHebrewDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
