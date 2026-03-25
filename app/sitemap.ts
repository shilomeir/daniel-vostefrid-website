import { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";

const BASE_URL = "https://westipul.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic blog post routes from Sanity
  try {
    const posts = await sanityClient.fetch<Array<{ slug: string; _updatedAt: string }>>(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      {},
      { next: { revalidate: 3600 } }
    );

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
