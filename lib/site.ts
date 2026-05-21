export const site = {
  name: "Jonathan Romano",
  title: "Jonathan Romano — Blog",
  description: {
    en: "AI does the work. I just take the credit.",
    pt: "A IA faz o trabalho. Eu só fico com os créditos.",
    de: "Die KI macht die Arbeit, ich kassiere nur den Ruhm.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "Jonathan Romano",
  email: "jjonathanromano@gmail.com",
  locale: "en",
  giscus: {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "",
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "",
  },
} as const;
