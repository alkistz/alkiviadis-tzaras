# alkiviadis-tzaras

Personal website. A fully static SvelteKit site: every route is prerendered at build time and no JavaScript is shipped to the browser.

The design spec lives in [reference/reference.md](reference/reference.md); the original mockup is [reference/Terminal.dc.html](reference/Terminal.dc.html).

## Commands

```sh
npm install
npm run dev        # dev server with hot reload
npm run build      # static output in build/
npm run preview    # serve build/ locally
npm run check      # svelte-check (types)
npm run lint       # prettier + eslint
npm run format     # prettier --write
npm run test:e2e   # playwright against the production build
```

## Structure

```
src/
  app.css                  design tokens, reset, base type, link styles, reduced-motion
  app.html                 document shell, favicon, colour-scheme meta
  lib/
    site.ts                every personal string: name, links, location, CV path
    content/
      index.ts             loads markdown via import.meta.glob, sorts by date
      projects/*.md        frontmatter: title, summary, url, repo, stack, status, date
      posts/*.md           frontmatter: title, date, summary, draft
    components/
      Prompt.svelte        `$ command` line plus its output; handles the reveal stagger
      Cursor.svelte        the blinking block
      LinkRow.svelte       flex row of links; nav, project list, footer
      TopBar.svelte        working directory + site nav
      BottomBar.svelte     location + github / linkedin / email
      Page.svelte          inner-page shell: head tags, skip link, bars, 68ch measure
  routes/
    +layout.ts             prerender = true, csr = false (no client JS)
    +page.svelte           the homepage (terminal session)
    work/                  project list and write-ups
    writing/               post list and posts
    about/                 bio and contact
    404/                   rendered to 404.html for static hosts
    sitemap.xml/           generated at build from the content index
static/
  favicon.svg  robots.txt  (cv.pdf goes here)
```

## Content

- **Projects**: add a file under `src/lib/content/projects/`. The filename is the slug. It appears on `/work`, on the homepage (three newest) and in the sitemap automatically.
- **Posts**: add a file under `src/lib/content/posts/`. Set `draft: true` to keep it out of the build.
- **CV**: drop `cv.pdf` into `static/` and set `cv: '/cv.pdf'` in `src/lib/site.ts`. The link on `/about` appears only when `cv` is set.
- **Domain**: `site.url` in `src/lib/site.ts` and the `Sitemap:` line in `static/robots.txt`.

## Deploy

`npm run build` writes plain HTML to `build/`. Point Cloudflare Pages, Netlify or GitHub Pages at it. Unknown paths are served from `404.html`.
