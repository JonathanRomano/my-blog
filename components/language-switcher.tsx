"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Lang = "pt" | "en" | "de";

type LangMeta = {
  code: Lang;
  iso: string;
  fullName: string;
};

const LANGS: LangMeta[] = [
  { code: "pt", iso: "br", fullName: "Português" },
  { code: "en", iso: "gb", fullName: "English" },
  { code: "de", iso: "de", fullName: "Deutsch" },
];

const STORAGE_KEY = "preferred-lang";
const DEFAULT_LANG: Lang = "pt";

function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "pt" || raw === "en" || raw === "de") return raw;
  return null;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlLang = searchParams.get("lang");
  const currentFromUrl: Lang =
    urlLang === "en" || urlLang === "de" || urlLang === "pt"
      ? urlLang
      : DEFAULT_LANG;

  const [active, setActive] = useState<Lang>(currentFromUrl);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // On first mount, reconcile the URL with the stored preference. If the user
  // arrived without an explicit ?lang= but had previously chosen one, apply it.
  useEffect(() => {
    setMounted(true);
    const stored = readStoredLang();
    if (!stored) {
      setActive(currentFromUrl);
      return;
    }
    setActive(stored);
    if (stored !== currentFromUrl && !urlLang) {
      const params = new URLSearchParams(searchParams.toString());
      if (stored === DEFAULT_LANG) {
        params.delete("lang");
      } else {
        params.set("lang", stored);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep internal state aligned when the URL changes via back/forward, etc.
  useEffect(() => {
    if (mounted) setActive(currentFromUrl);
  }, [currentFromUrl, mounted]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLang(lang: Lang) {
    setOpen(false);
    if (lang === active) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
    setActive(lang);
    const params = new URLSearchParams(searchParams.toString());
    if (lang === DEFAULT_LANG) {
      params.delete("lang");
    } else {
      params.set("lang", lang);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
    router.refresh();
  }

  const activeMeta = LANGS.find((l) => l.code === active) ?? LANGS[0];
  const others = LANGS.filter((l) => l.code !== active);

  function flagButtonClasses(isActive: boolean) {
    return [
      "group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-[2.25rem] transition-opacity duration-200",
      isActive
        ? "opacity-100 ring-2 ring-neutral-900 ring-offset-2 ring-offset-white dark:ring-neutral-100 dark:ring-offset-neutral-950"
        : "opacity-60 hover:opacity-100",
    ].join(" ");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${activeMeta.fullName}`}
        title={activeMeta.fullName}
        className={flagButtonClasses(mounted)}
      >
        <span
          aria-hidden="true"
          className={`fi fi-${activeMeta.iso} fis`}
        />
        <span className="sr-only">{activeMeta.fullName}</span>
      </button>

      <div
        role="listbox"
        aria-label="Language"
        aria-hidden={!open}
        className={[
          "absolute right-0 top-full z-50 mt-2 flex flex-col gap-1 transition duration-200 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        ].join(" ")}
      >
        {others.map((l, i) => (
          <button
            key={l.code}
            type="button"
            role="option"
            aria-selected={false}
            tabIndex={open ? 0 : -1}
            onClick={() => selectLang(l.code)}
            aria-label={l.fullName}
            title={l.fullName}
            className={[
              flagButtonClasses(false),
              "shadow-md transition-[transform,opacity] duration-200",
              open ? "translate-y-0 opacity-60" : "-translate-y-2 opacity-0",
              i === 0 ? "delay-[60ms]" : "delay-[120ms]",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={`fi fi-${l.iso} fis`}
            />
            <span className="sr-only">{l.fullName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
