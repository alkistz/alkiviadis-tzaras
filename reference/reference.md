# tzaras.dev: design and build reference

Reference for rebuilding the "Terminal" homepage mockup as a real site in SvelteKit. Hand this file to Claude Code as the spec. It covers the design tokens, the homepage layout, the components, the motion, the project structure, and the rules for inner pages.

Guiding principle: the homepage is a shell session that introduces one person. Four prompts, a cursor, six links. Everything else (CV, project write-ups, writing) lives on inner pages. When in doubt, remove.

## 1. Stack

- SvelteKit (latest stable), Svelte 5 runes syntax.
- `@sveltejs/adapter-static` with prerendering on for every route. The site is fully static; no server routes.
- Plain CSS with custom properties. No Tailwind, no component library. The whole site is small enough that a single `app.css` plus scoped component styles is the simplest thing that works.
- Content in Markdown via `mdsvex` for `/writing` and project pages.
- Fonts: JetBrains Mono, self-hosted via `@fontsource-variable/jetbrains-mono` (no Google Fonts request at runtime). Load weights 400 and 500 only.
- No analytics scripts by default. If wanted later, a privacy-respecting one (Plausible or Umami) added as a single `<script>` in `+layout.svelte`.
- Deploy: Cloudflare Pages, Netlify or GitHub Pages, whichever is already at hand. All three serve the static `build/` output.

## 2. Design tokens

Define these once in `src/app.css` on `:root`. Every component reads from them; no hard-coded colours or sizes elsewhere.

### Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0b0d0c` | Page background. Near-black with a hint of green. |
| `--fg` | `#d6dbd4` | Default body text. |
| `--fg-strong` | `#ffffff` | The name, and any headline. |
| `--fg-muted` | `#8a948a` | Secondary text, nav links, the prompt commands. |
| `--fg-faint` | `#5c665b` | The `$` sigil, footer labels, working-directory line. |
| `--accent` | `#c8ff3d` | Links, the cursor. Chartreuse. Use sparingly: links and the cursor only. |
| `--rule` | `#263028` | Hairlines, borders on inner pages. |
| `--selection` | `rgba(200, 255, 61, 0.25)` | `::selection` background. |

The site is dark-only. Do not add a light theme; it is a deliberate choice, not an omission. Set `color-scheme: dark` on `:root` so form controls and scrollbars match.

### Typography

| Token | Value |
|---|---|
| `--font-mono` | `'JetBrains Mono Variable', 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace` |
| `--text-xs` | `13px` (nav, footer, metadata) |
| `--text-base` | `17px` (body on the homepage, prompts and output) |
| `--text-lg` | `22px` (inner-page headings) |
| `--text-display` | `48px` (the name on the homepage only) |
| `--leading` | `1.6` (body) |
| `--leading-tight` | `1.1` (display) |
| `--tracking-display` | `-0.02em` (display only) |

One font family for everything. Weight 400 everywhere except the name (500) and inner-page headings (500). No bold 700, no italics.

Inner-page body copy (blog posts, project write-ups) may drop to `16px` with `line-height: 1.7` and a `max-width: 68ch` measure for readability.

### Spacing

Base unit is 8px. Named steps:

| Token | Value |
|---|---|
| `--space-1` | `8px` |
| `--space-2` | `16px` |
| `--space-3` | `28px` (gap between links in a row) |
| `--space-4` | `32px` (gap between nav links) |
| `--space-5` | `40px` (page padding, top and bottom) |
| `--space-6` | `56px` (page padding, left and right on desktop) |
| `--block-gap` | `30px` (gap between prompt blocks on the homepage) |
| `--measure` | `760px` (max width of the homepage prompt column) |

On viewports under 720px, horizontal page padding drops to `24px` and `--text-display` to `36px`.

### Motion

| Token | Value |
|---|---|
| `--blink` | `1s steps(1) infinite` |
| `--reveal-duration` | `0.5s` |
| `--reveal-stagger` | `0.5s` |

Wrap all animation in `@media (prefers-reduced-motion: no-preference)`. With reduced motion, everything is simply visible and the cursor is a static block.

## 3. Homepage layout

Full-viewport page, `min-height: 100dvh`, a three-row column with `justify-content: space-between`:

1. Top bar. Left: `~/alkis` in `--fg-faint`, 13px. Right: three nav links `work`, `writing`, `about` in `--fg-muted`, 13px, gap `--space-4`.
2. Session. A column of prompt blocks, max width `--measure`, gap `--block-gap`, vertically centred by the space-between layout.
3. Bottom bar. Left: `Brussels` in `--fg-faint`. Right: `github`, `linkedin`, `email` in `--fg-muted`, gap `--space-3`.

Padding: `--space-5` top and bottom, `--space-6` left and right.

The session content, in order:

```
$ whoami
Alkis Tzaras                          <- 48px, weight 500, --fg-strong

$ cat role
Backend & AI engineer. Economist underneath.
                                      <- first sentence --fg, second --fg-muted

$ ls projects
kiden/   iera-polis/   [more]/        <- links in --accent; a placeholder in --fg-muted until real

$ █                                   <- blinking cursor in --accent
```

Rules for the prompt line: the `$ ` sigil is `--fg-faint`, the command text is `--fg-muted`. Output sits directly under the command with no extra gap. Nothing else appears on this page: no stack chips, no bio paragraph, no project blurbs, no photo.

Mobile (under 720px): same structure; nav gap shrinks to `--space-2`; project links wrap onto multiple lines with the same gap.

## 4. Components

Keep to these six. Each is a `.svelte` file under `src/lib/components/`.

`Prompt.svelte`
Props: `command: string`, `delay?: number` (seconds, for the reveal stagger). Renders the `$ command` line and a default slot for the output. Applies the reveal animation with `animation-delay: {delay}s`.

`Cursor.svelte`
No props. A 9px by 18px block in `--accent`, `vertical-align: -3px`, blinking with `--blink`. Marked `aria-hidden="true"`.

`LinkRow.svelte`
Props: `links: {label: string, href: string, muted?: boolean}[]`, `gap?: 'nav' | 'row'`. Flex row with the right gap token. Used for the nav, the project list and the footer.

`TopBar.svelte` and `BottomBar.svelte`
Thin wrappers around `LinkRow` with the left-hand label. On inner pages the top bar is the same component so navigation is identical everywhere; the left label becomes the current path (`~/alkis/writing`).

`Page.svelte`
Layout shell for inner pages: top bar, a content column with `max-width: 68ch`, bottom bar. Heading in `--text-lg`, weight 500, `--fg-strong`. Body in `--fg`.

Links: `color: var(--accent)`, no underline at rest, underline on hover and focus with `text-underline-offset: 4px`. Focus-visible gets a 1px `--accent` outline with 2px offset. Nav and footer links use `--fg-muted` at rest and `--fg-strong` on hover.

## 5. Motion spec

Reveal: each prompt block starts at `opacity: 0` and fades to `1` over `--reveal-duration`, with `animation-fill-mode: both`. Delays: 0.1s, 0.6s, 1.1s, 1.6s for the four blocks. Fade only, no vertical movement.

Cursor: `@keyframes blink { 50% { opacity: 0 } }` with `--blink`.

Nothing else moves. No hover transforms, no scroll effects, no page transitions beyond the browser default.

## 6. Project structure

```
src/
  app.css                 tokens, reset, base type, link styles, reduced-motion rules
  app.html                lang="en", color-scheme meta, favicon links
  routes/
    +layout.svelte        imports app.css and the font; renders <slot/>
    +layout.ts            export const prerender = true
    +page.svelte          the homepage (terminal)
    work/+page.svelte     list of projects, one line each: name, one sentence, link
    work/[slug]/+page.svelte   project write-up from markdown
    writing/+page.svelte  list of posts, date and title only
    writing/[slug]/+page.svelte
    about/+page.svelte    short bio, CV link, contact
  lib/
    components/           the six components above
    content/
      projects/*.md       frontmatter: title, summary, url, repo, stack, status, date
      posts/*.md          frontmatter: title, date, summary
    site.ts               name, tagline, links (github, linkedin, email), location
static/
  favicon.svg             a single `$` or `_` glyph in --accent on --bg
  cv.pdf
  robots.txt
```

`site.ts` is the one place for personal strings. Nothing personal is hard-coded in components.

## 7. Inner pages

Same tokens, same bars, same font. Inner pages may use `--rule` hairlines to separate list items and a `max-width: 68ch` measure. Lists are text rows, not cards: name on the left, one sentence, a link on the right. No images on list pages. Project write-ups may include one screenshot at most, full width of the measure, no border radius, 1px `--rule` border.

The `work` page format, one row per project:

```
kiden          Personalised children's stories.          live ↗
iera-polis     Tower defence, Mesolonghi 1826. Godot 4.  wip
```

Keep the writing page to date and title. No reading-time badges, no tags, no excerpts on the index.

## 8. Content to fill in

- Real project list and URLs (replace `[more]/`).
- Domain (mockups used `tzaras.dev` as a placeholder).
- GitHub and LinkedIn URLs, email: `atzaras@pm.me`, `github.com/alkistz`, `linkedin.com/in/alkiviadis-tzaras` per the CV.
- `cv.pdf` in `static/`.
- Short bio for `/about`. Two or three sentences. The bartending line belongs here, not on the homepage.

## 9. Quality bar

- Lighthouse 100 on performance, accessibility, best practices, SEO for the homepage.
- HTML validates; no console errors.
- Contrast: `--fg-muted` on `--bg` is about 5.4:1 and `--fg-faint` on `--bg` is about 3.2:1, so `--fg-faint` is for decorative labels only, never for text someone needs to read. Nav and footer links stay on `--fg-muted`.
- Keyboard: every link reachable, visible focus ring, skip link not needed on the homepage (six links), but add one on inner pages before the content column.
- `<title>` per page: `Alkis Tzaras`, `Work · Alkis Tzaras`, and so on. One `<meta name="description">` per page. Open Graph title and description; an OG image is optional and can be a rendered PNG of the homepage.
- Favicon present. `robots.txt` allows all. Sitemap generated at build.
- Total transfer for the homepage under 100 KB including the font.

## 10. Prompt to hand Claude Code

"Build this site in SvelteKit following tzaras-site-reference.md exactly. Start with app.css tokens, then the six components, then the homepage. Show me the homepage before doing inner pages. Do not add anything the reference does not list."