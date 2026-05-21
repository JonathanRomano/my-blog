import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/posts/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
  }));

  return [{ url: site.url, lastModified: new Date() }, ...posts];
}
