import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { Giscus } from "@/components/giscus";
import { mdxComponents } from "@/components/mdx-components";
import {
  DEFAULT_LANG,
  formatDate,
  getAllPosts,
  getPostBySlug,
  isLang,
  type Lang,
} from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { slug: string };
type SearchParams = { lang?: string | string[] };

const FALLBACK_NOTICE: Record<Exclude<Lang, "pt">, string> = {
  en: "This post is not yet available in English. Showing the original version.",
  de: "Dieser Beitrag ist noch nicht auf Deutsch verfügbar. Die Originalversion wird angezeigt.",
};

function resolveLang(value: string | string[] | undefined): Lang {
  const v = Array.isArray(value) ? value[0] : value;
  return isLang(v) ? v : DEFAULT_LANG;
}

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const post = getPostBySlug(slug, resolveLang(lang));
  if (!post) return {};

  const url = `${site.url}/posts/${slug}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

const prettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
} as const;

export default async function PostPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const requestedLang = resolveLang(lang);
  const post = getPostBySlug(slug, requestedLang);
  if (!post) notFound();
  const fallbackMessage =
    post.fallback && post.requestedLang !== DEFAULT_LANG
      ? FALLBACK_NOTICE[post.requestedLang as Exclude<Lang, "pt">]
      : null;

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-8">
      <header className="mb-10">
        <time
          dateTime={post.frontmatter.date}
          className="text-xs uppercase tracking-wide text-neutral-500"
        >
          {formatDate(post.frontmatter.date)}
        </time>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description && (
          <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
            {post.frontmatter.description}
          </p>
        )}
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {post.frontmatter.cover && (
          <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={post.frontmatter.cover}
              alt=""
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        {fallbackMessage && (
          <p
            role="note"
            className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-200"
          >
            <span aria-hidden="true">⚠️ </span>
            {fallbackMessage}
          </p>
        )}
      </header>

      <div className="prose">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, prettyCodeOptions],
              ],
            },
          }}
        />
      </div>

      <nav className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <Link
          href="/"
          className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Back to all posts
        </Link>
      </nav>

      <Giscus />
    </article>
  );
}
