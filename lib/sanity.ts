import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "3zyocf76",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

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
