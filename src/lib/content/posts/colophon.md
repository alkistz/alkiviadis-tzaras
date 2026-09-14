---
title: Colophon
date: 2026-09-14
summary: How this site is built and why it looks like a shell session.
---

This site is a static build of a small SvelteKit app. Every page is rendered to HTML at
build time and no JavaScript is shipped to the browser; the only motion is the cursor
and a fade-in, both plain CSS and both switched off when the visitor prefers reduced
motion.

The typeface is JetBrains Mono, self-hosted. Colours and spacing are a handful of CSS
custom properties defined once. Posts and project write-ups are Markdown files compiled
with mdsvex.

The homepage is a shell session that introduces one person: four prompts, a cursor and
six links. Everything else lives on the inner pages.
