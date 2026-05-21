import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getPreferredLang } from "@/lib/posts";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getPreferredLang();
  const description = site.description[lang];
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: `%s — ${site.name}`,
    },
    description,
    authors: [{ name: site.author }],
    openGraph: {
      type: "website",
      locale: site.locale,
      url: site.url,
      title: site.title,
      description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={site.locale} suppressHydrationWarning>
      <body
        className="min-h-dvh bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
