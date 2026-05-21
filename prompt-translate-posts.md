# Task: Translate Missing Blog Posts

## Overview
Read all posts in `/content/posts/` and check which translations are missing.
For each missing translation, translate the post yourself — do not call any external API.

---

## File naming convention
```
/content/posts/my-post.mdx        ← original (Portuguese)
/content/posts/my-post.en.mdx     ← English translation
/content/posts/my-post.de.mdx     ← German translation
```

---

## Step 1 — Audit
1. List all `.mdx` files in `/content/posts/`
2. For each base post (files without a language suffix), check if `.en.mdx` and `.de.mdx` exist
3. Print a summary of what's missing before doing anything

---

## Step 2 — Translate
For each missing translation:

1. Read the original `.mdx` file completely
2. Translate it to the target language
3. Save the translated file with the correct suffix

### Translation rules
- Translate: post body, `title` and `description` fields in the frontmatter
- Do NOT translate: `date`, `tags`, `cover`, file paths, URLs
- Preserve ALL markdown formatting exactly: headings (`##`), bold (`**`), italic (`*`), lists, code blocks, inline code
- Preserve ALL MDX components and JSX tags exactly as they are — do not touch them
- Preserve emoji as-is
- Keep the same tone, humor, and personality of the original — do not make it formal if the original is casual
- If the original uses profanity or slang, find the natural equivalent in the target language — do not sanitize

### For English translations
- Use natural, conversational English
- Match the casual, self-deprecating, humorous tone of the original
- Do not use overly formal or corporate language

### For German translations
- Use natural, conversational German (informal "du" register, not "Sie")
- Match the casual tone of the original
- Do not use overly formal language

---

## Step 3 — Verify
After translating:
1. List all files in `/content/posts/` showing what now exists
2. Confirm every base post now has both `.en.mdx` and `.de.mdx` versions
