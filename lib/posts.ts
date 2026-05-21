import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cookies } from "next/headers";

export type Lang = "pt" | "en" | "de";

export const LANGS: Lang[] = ["pt", "en", "de"];
export const DEFAULT_LANG: Lang = "pt";
export const LANG_COOKIE = "preferred-lang";

export function isLang(value: unknown): value is Lang {
  return value === "pt" || value === "en" || value === "de";
}

export async function getPreferredLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
};

export type LocalizedPost = Post & {
  lang: Lang;
  requestedLang: Lang;
  fallback: boolean;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostFile(filename: string, slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) return null;

  return {
    slug,
    content,
    frontmatter: {
      title: String(data.title),
      date: String(data.date),
      description: String(data.description ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: data.cover ? String(data.cover) : undefined,
      draft: Boolean(data.draft),
    },
  };
}

function defaultFilename(slug: string): string | null {
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const md = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(mdx)) return `${slug}.mdx`;
  if (fs.existsSync(md)) return `${slug}.md`;
  return null;
}

function translatedFilename(slug: string, lang: Lang): string | null {
  if (lang === DEFAULT_LANG) return null;
  const mdx = path.join(POSTS_DIR, `${slug}.${lang}.mdx`);
  const md = path.join(POSTS_DIR, `${slug}.${lang}.md`);
  if (fs.existsSync(mdx)) return `${slug}.${lang}.mdx`;
  if (fs.existsSync(md)) return `${slug}.${lang}.md`;
  return null;
}

export function getAllPosts(lang: Lang = DEFAULT_LANG): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));

  // Only list canonical (default-language) posts — files like `slug.en.mdx`
  // are translations of an existing default post and shouldn't appear twice.
  const canonical = files.filter((f) => {
    const base = f.replace(/\.mdx?$/, "");
    return !/\.(en|de)$/.test(base);
  });

  const posts = canonical
    .map((f) => {
      const slug = f.replace(/\.mdx?$/, "");
      const translated = translatedFilename(slug, lang);
      return readPostFile(translated ?? f, slug);
    })
    .filter((p): p is Post => p !== null)
    .filter(
      (p) => process.env.NODE_ENV === "development" || !p.frontmatter.draft,
    );

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(
  slug: string,
  lang: Lang = DEFAULT_LANG,
): LocalizedPost | null {
  const translated = translatedFilename(slug, lang);
  if (translated) {
    const post = readPostFile(translated, slug);
    if (post)
      return { ...post, lang, requestedLang: lang, fallback: false };
  }

  const fallback = defaultFilename(slug);
  if (!fallback) return null;
  const post = readPostFile(fallback, slug);
  if (!post) return null;

  return {
    ...post,
    lang: DEFAULT_LANG,
    requestedLang: lang,
    fallback: lang !== DEFAULT_LANG,
  };
}

export function formatDate(iso: string, locale = "en-US"): string {
  return new Date(iso).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
