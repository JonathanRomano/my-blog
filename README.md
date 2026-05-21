# Blog — Jonathan Romano

Personal minimalist blog built with Next.js App Router. Topics: technology, language learning (German), and software development.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Content:** MDX (local files in `/content/posts`)
- **Comments:** Giscus (GitHub-based)
- **Analytics:** Vercel Analytics
- **Deploy:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Commands

- `npm run dev` — start dev server on port 3000
- `npm run build` — production build
- `npm run lint` — run ESLint

## Project Structure

```
/app                  → Next.js App Router pages
/content/posts        → MDX blog posts
/components           → Reusable React components
/lib                  → Utilities and helpers
/public               → Static assets
```

## License

This project uses two separate licenses:

- **Code** (everything except the contents of `/content/posts`) is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code, provided the copyright notice is preserved.
- **Blog posts and written content** (everything in `/content/posts`, including text, images, and other media authored for the blog) are licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You are free to share and adapt this content for any purpose, including commercially, as long as you give appropriate credit to **Jonathan Romano** and indicate if changes were made.
