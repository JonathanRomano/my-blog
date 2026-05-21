import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post;
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:shadow-black/40">
      <Link href={`/posts/${slug}`} className="block">
        {frontmatter.cover && (
          <div className="relative aspect-[2/1] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={frontmatter.cover}
              alt=""
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 p-5 sm:p-6">
          <time
            dateTime={frontmatter.date}
            className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-500"
          >
            {formatDate(frontmatter.date)}
          </time>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-400">
            {frontmatter.title}
          </h2>
          {frontmatter.description && (
            <p className="text-neutral-600 dark:text-neutral-400">
              {frontmatter.description}
            </p>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}
