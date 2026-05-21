import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <section className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {site.name}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          {site.description}
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
          Writing
        </h2>
        {posts.length === 0 ? (
          <p className="text-neutral-600 dark:text-neutral-400">
            No posts yet. Add an MDX file to <code>/content/posts</code>.
          </p>
        ) : (
          <ul className="flex flex-col gap-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
