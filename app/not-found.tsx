import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-wide text-neutral-500">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        Back home
      </Link>
    </div>
  );
}
