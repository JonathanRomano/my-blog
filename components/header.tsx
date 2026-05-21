import { Suspense } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/60 dark:bg-neutral-950/80 dark:supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight text-neutral-900 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-400"
      >
        {site.name}
      </Link>
      <nav className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
        <ThemeToggle />
        <Suspense fallback={<div className="h-9 w-9" aria-hidden />}>
          <LanguageSwitcher />
        </Suspense>
      </nav>
      </div>
    </header>
  );
}
