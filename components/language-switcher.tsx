"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

const COOKIE_NAME = "preferred-lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function LanguageSwitcher({ initialLang }: { initialLang: Lang }) {
  const router = useRouter();
  const [active, setActive] = useState<Lang>(initialLang);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setActive(lang);
    document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
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
        className={flagButtonClasses(true)}
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
