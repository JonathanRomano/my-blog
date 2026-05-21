# Blog — Jonathan Romano

## Project Overview
Personal minimalist blog built with Next.js App Router.
Focus on performance, clean typography, and developer experience.
Topics: technology, language learning (German), software development.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Content:** MDX (local files in /content/posts)
- **Comments:** Giscus (GitHub-based)
- **Analytics:** Vercel Analytics
- **Deploy:** Vercel

## Project Structure
```
/app                  → Next.js App Router pages
/content/posts        → MDX blog posts
/components           → Reusable React components
/lib                  → Utilities and helpers
/public               → Static assets
```

## Commands
- `npm run dev` — start dev server on port 3000
- `npm run build` — production build
- `npm run lint` — run ESLint

## Code Conventions
- Language: English (variables, comments, commits)
- Components: PascalCase
- Files: kebab-case
- Prefer server components by default
- Use "use client" only when strictly necessary
- No unnecessary dependencies — keep it lean

## Design Principles
- Minimalist — whitespace over decoration
- Typography-first — readable on all screen sizes
- Dark/light mode via next-themes
- Perfect Core Web Vitals (LCP, CLS, FID)
- Optimized images via next/image
- OG images via next/og for each post

## Content
- Posts written in MDX inside /content/posts
- Each post has frontmatter: title, date, description, tags
- No CMS — git-based workflow (write → commit → auto deploy)

## What to Avoid
- No unnecessary animations
- No heavy UI libraries
- No client-side data fetching unless required
- No inline styles
