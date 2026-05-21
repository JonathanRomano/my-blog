import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl px-6 py-12 text-sm text-neutral-500 dark:text-neutral-500">
      <p>
        © {new Date().getFullYear()} {site.author}.
      </p>
    </footer>
  );
}
