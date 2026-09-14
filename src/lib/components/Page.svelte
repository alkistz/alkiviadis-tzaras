<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { site } from '$lib/site';
	import BottomBar from './BottomBar.svelte';
	import TopBar from './TopBar.svelte';

	interface Props {
		/** Page heading; also becomes `Title · Alkis Tzaras` in the tab. */
		title: string;
		/** One sentence for the meta description. */
		description: string;
		/** Optional metadata line under the heading (dates, stack, links). */
		meta?: Snippet;
		children: Snippet;
	}

	let { title, description, meta, children }: Props = $props();

	const fullTitle = $derived(`${title} · ${site.name}`);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content={site.name} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip" href="#content">Skip to content</a>

<div class="page">
	<TopBar />

	<main id="content" class="content">
		<header class="heading">
			<h1>{title}</h1>
			{#if meta}
				<p class="meta">{@render meta()}</p>
			{/if}
		</header>
		<div class="prose">
			{@render children()}
		</div>
	</main>

	<BottomBar />
</div>

<style>
	.skip {
		position: absolute;
		left: var(--page-padding-x);
		top: var(--space-1);
		padding: var(--space-1) var(--space-2);
		background: var(--bg);
		font-size: var(--text-xs);
		transform: translateY(-200%);
	}

	.skip:focus {
		transform: none;
	}

	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		min-height: 100dvh;
		padding: var(--page-padding-y) var(--page-padding-x);
	}

	.content {
		flex: 1;
		width: 100%;
		max-width: 68ch;
		font-size: 16px;
		line-height: 1.7;
	}

	.heading {
		margin-bottom: var(--space-4);
	}

	h1 {
		font-size: var(--text-lg);
		font-weight: 500;
		line-height: var(--leading-tight);
		color: var(--fg-strong);
	}

	.meta {
		margin-top: var(--space-1);
		font-size: var(--text-xs);
		color: var(--fg-muted);
	}

	/* Markdown output from mdsvex lands here, so its elements are styled globally within .prose. */
	.prose :global {
		:where(p, ul, ol, pre, blockquote, figure) + * {
			margin-top: var(--space-2);
		}

		:where(h2, h3) {
			font-size: var(--text-base);
			font-weight: 500;
			color: var(--fg-strong);
			margin-top: var(--space-4);
			margin-bottom: var(--space-1);
		}

		ul,
		ol {
			padding-left: 3ch;
			list-style: revert;
		}

		code {
			font-family: inherit;
			font-size: 0.95em;
			color: var(--fg-strong);
		}

		pre {
			padding: var(--space-2);
			border: 1px solid var(--rule);
			overflow-x: auto;
		}

		blockquote {
			margin: 0;
			padding-left: var(--space-2);
			border-left: 1px solid var(--rule);
			color: var(--fg-muted);
		}

		hr {
			border: 0;
			border-top: 1px solid var(--rule);
			margin: var(--space-4) 0;
		}

		img {
			border: 1px solid var(--rule);
		}
	}
</style>
