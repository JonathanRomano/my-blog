import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = "Post cover image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return getAllPosts().map((p) => ({ id: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? site.title;
  const date = post ? formatDate(post.frontmatter.date) : "";
  const tags = post?.frontmatter.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#737373",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {date && (
            <div style={{ fontSize: 22, color: "#737373" }}>{date}</div>
          )}
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {title}
          </div>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 20,
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: "#f5f5f5",
                    color: "#525252",
                    display: "flex",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#a3a3a3",
          }}
        >
          <span>{new URL(site.url).host}</span>
          <span>Essay</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
