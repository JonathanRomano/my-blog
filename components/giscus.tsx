"use client";

import GiscusReact from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Giscus() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!site.giscus.repo || !site.giscus.repoId || !site.giscus.categoryId) {
    return null;
  }

  return (
    <div className="mt-16">
      <GiscusReact
        id="comments"
        repo={site.giscus.repo as `${string}/${string}`}
        repoId={site.giscus.repoId}
        category={site.giscus.category}
        categoryId={site.giscus.categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
