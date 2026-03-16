import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "3zyocf76",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token:
    "skGZovL1UT1UV5qR2OlxHxu1IOPg5LXikvQHIZQxlPEGpNR12QdmCw4jfe8I4lhKsfRgFLhBL8vYsg5I9JuG2rak7cgUgE04WGQjZBNA6MH3QagrvtroTbewLHN6cmIJztHKA094LugM6XqWD9GqQO3s8XA6o1wfcRAN77SxcP9QMbd8Dklo",
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
